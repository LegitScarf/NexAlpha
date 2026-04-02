create extension if not exists pgcrypto;

do $$
begin
    if not exists (select 1 from pg_type where typname = 'approval_status') then
        create type public.approval_status as enum ('pending', 'approved', 'rejected');
    end if;

    if not exists (select 1 from pg_type where typname = 'subscription_status') then
        create type public.subscription_status as enum (
            'pending',
            'created',
            'authenticated',
            'active',
            'past_due',
            'halted',
            'cancelled',
            'completed',
            'expired'
        );
    end if;

    if not exists (select 1 from pg_type where typname = 'app_role') then
        create type public.app_role as enum ('user', 'admin');
    end if;
end $$;

create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    email text not null unique,
    full_name text,
    approval_status public.approval_status not null default 'pending',
    role public.app_role not null default 'user',
    is_email_verified boolean not null default false,
    approved_at timestamptz,
    approved_by uuid references auth.users (id),
    rejected_reason text,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    gateway text not null default 'razorpay',
    gateway_customer_id text,
    gateway_subscription_id text unique,
    gateway_plan_id text,
    status public.subscription_status not null default 'pending',
    amount_inr integer not null default 500,
    currency text not null default 'INR',
    current_period_start timestamptz,
    current_period_end timestamptz,
    cancel_at_period_end boolean not null default false,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

create table if not exists public.payments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    subscription_id uuid references public.subscriptions (id) on delete set null,
    gateway text not null default 'razorpay',
    gateway_payment_id text unique,
    gateway_invoice_id text,
    amount integer not null default 0,
    currency text not null default 'INR',
    status text not null,
    paid_at timestamptz,
    raw_payload jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.audit_logs (
    id uuid primary key default gen_random_uuid(),
    actor_user_id uuid references public.profiles (id) on delete set null,
    target_user_id uuid references public.profiles (id) on delete set null,
    action text not null,
    details jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (
        id,
        email,
        full_name,
        is_email_verified
    )
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data ->> 'full_name', ''),
        new.email_confirmed_at is not null
    )
    on conflict (id) do update
    set
        email = excluded.email,
        full_name = excluded.full_name,
        is_email_verified = excluded.is_email_verified,
        updated_at = timezone('utc', now());

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.sync_profile_email_verification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    update public.profiles
    set
        email = new.email,
        is_email_verified = new.email_confirmed_at is not null,
        updated_at = timezone('utc', now())
    where id = new.id;

    return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update on auth.users
for each row execute procedure public.sync_profile_email_verification();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc', now());
    return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute procedure public.touch_updated_at();

drop trigger if exists subscriptions_touch_updated_at on public.subscriptions;
create trigger subscriptions_touch_updated_at
before update on public.subscriptions
for each row execute procedure public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
on public.subscriptions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "payments_select_own" on public.payments;
create policy "payments_select_own"
on public.payments
for select
to authenticated
using (auth.uid() = user_id);

create or replace function public.account_state_for_user(target_user_id uuid)
returns table (
    state text,
    approval_status public.approval_status,
    role public.app_role,
    can_access_apps boolean,
    email text,
    full_name text,
    subscription_status public.subscription_status,
    current_period_end timestamptz
)
language sql
security definer
set search_path = public
as $$
    with profile_row as (
        select *
        from public.profiles
        where id = target_user_id
    ),
    latest_subscription as (
        select *
        from public.subscriptions
        where user_id = target_user_id
        order by created_at desc
        limit 1
    )
    select
        case
            when pr.id is null then 'guest'
            when coalesce(pr.is_email_verified, false) = false then 'registered_unverified'
            when pr.approval_status = 'pending' then 'verified_pending_approval'
            when pr.approval_status = 'rejected' then 'suspended'
            when pr.approval_status = 'approved' and ls.id is null then 'approved_unsubscribed'
            when coalesce(ls.status, 'pending'::public.subscription_status) in ('pending', 'created', 'authenticated') then 'approved_subscription_pending'
            when ls.status = 'active'
                and coalesce(ls.current_period_end, timezone('utc', now()) + interval '1 day') > timezone('utc', now())
                then 'active'
            when pr.approval_status = 'approved' and ls.status in ('cancelled', 'completed', 'expired', 'halted', 'past_due') then 'suspended'
            when pr.approval_status = 'approved' then 'approved_unsubscribed'
            else 'guest'
        end as state,
        pr.approval_status,
        pr.role,
        (
            pr.approval_status = 'approved'
            and pr.is_email_verified = true
            and ls.status = 'active'
            and coalesce(ls.current_period_end, timezone('utc', now()) + interval '1 day') > timezone('utc', now())
        ) as can_access_apps,
        pr.email,
        pr.full_name,
        ls.status as subscription_status,
        ls.current_period_end
    from profile_row pr
    left join latest_subscription ls on true;
$$;
