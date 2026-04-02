<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:020507,50:00ff88,100:ffb800&height=200&section=header&text=NEXALPHA&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Intelligent%20Market%20Systems%20-%20India&descAlignY=58&descSize=16" width="100%"/>

![Status](https://img.shields.io/badge/STATUS-GATED_BETA-00ff88?style=for-the-badge&labelColor=020507&color=00ff88)
![Products](https://img.shields.io/badge/PRODUCTS-2_ACTIVE-ffb800?style=for-the-badge&labelColor=020507&color=ffb800)
![Auth](https://img.shields.io/badge/AUTH-SUPABASE-00d4ff?style=for-the-badge&labelColor=020507&color=00d4ff)
![Billing](https://img.shields.io/badge/BILLING-RAZORPAY-ff3b5c?style=for-the-badge&labelColor=020507&color=ff3b5c)

</div>

---

## Overview

NexAlpha is the product brand for a suite of multi-agent AI systems built for the Indian financial markets.

This repository now contains:

- the public GitHub Pages landing page
- static login, registration, account, and access-check pages
- Supabase schema for auth, approvals, subscriptions, and payments
- Supabase Edge Function scaffolding for status, approvals, subscription creation, and Razorpay webhooks

The intended access rule is:

```text
logged in + email verified + admin approved + subscription active = access granted
```

One `Rs 500/month` subscription unlocks both OptiTrade and BharatAlpha.

---

## Current User Flow

1. User registers publicly on `register.html`
2. User verifies email
3. Admin approves the account
4. Approved user starts the Razorpay subscription
5. Razorpay webhook marks the subscription active
6. User can launch both apps through `access.html`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Hosting | GitHub Pages |
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| Backend | Supabase Edge Functions |
| Billing | Razorpay Subscriptions |
| Product Apps | Streamlit |

---

## Repository Structure

```text
nexalpha/
├── index.html
├── login.html
├── register.html
├── account.html
├── access.html
├── admin.html
├── assets/
│   ├── css/
│   │   └── portal.css
│   └── js/
│       ├── config.js
│       ├── auth-client.js
│       ├── login.js
│       ├── register.js
│       ├── account.js
│       ├── access.js
│       └── admin.js
├── supabase/
│   ├── migrations/
│   │   └── 20260402_auth_billing.sql
│   └── functions/
│       ├── _shared/
│       ├── me-status/
│       ├── create-subscription/
│       ├── admin-list-users/
│       ├── admin-approve-user/
│       └── razorpay-webhook/
└── README.md
```

---

## Local Development

```bash
# from the repo root
python -m http.server 5500

# then open
http://localhost:5500
```

You should use a local HTTP server rather than opening the files directly, because Supabase auth flows and redirects behave more reliably over HTTP.

---

## Frontend Setup

Update `assets/js/config.js` before using the auth flow:

```js
window.NEXALPHA_CONFIG = Object.freeze({
  supabaseUrl: "https://YOUR_PROJECT_ID.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  functionsBaseUrl: "https://YOUR_PROJECT_ID.supabase.co/functions/v1",
  billing: {
    amountInr: 500,
    interval: "month"
  },
  products: {
    optitrade: {
      name: "OptiTrade",
      appUrl: "https://optitrade-nexalpha.streamlit.app/"
    },
    bharatalpha: {
      name: "BharatAlpha",
      appUrl: "https://bharatalpha-nexalpha.streamlit.app/"
    }
  }
});
```

The Supabase anon key is safe to expose in the browser. Do not put service role keys in this repository.

---

## Supabase Setup

Run the SQL in:

- `supabase/migrations/20260402_auth_billing.sql`

This creates:

- `profiles`
- `subscriptions`
- `payments`
- `audit_logs`
- triggers for new-user profile creation
- RLS policies for user-owned reads
- `account_state_for_user(...)` RPC logic

Required Supabase function secrets:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_PLAN_ID
RAZORPAY_WEBHOOK_SECRET
```

Deploy these functions:

- `me-status`
- `create-subscription`
- `admin-approve-user`
- `razorpay-webhook`

---

## What Each Page Does

- `index.html`: public marketing site and launch entrypoint
- `register.html`: public signup page
- `login.html`: sign-in page
- `account.html`: shows approval, billing, and access state
- `access.html`: checks entitlement before redirecting to a product app
- `admin.html`: lightweight admin queue for approvals and billing review

---

## What Each Function Does

- `me-status`: returns the current effective access state for the signed-in user
- `create-subscription`: creates a Razorpay subscription for approved users
- `admin-list-users`: returns the current approval queue and subscription summary
- `admin-approve-user`: approves or rejects pending users
- `razorpay-webhook`: verifies webhook signatures and syncs subscription/payment state into Supabase

---

## Product URL Configuration

App URLs are now configured in:

- `assets/js/config.js`

Update these values whenever OptiTrade or BharatAlpha move to a new endpoint.

---

## Important Boundary

This repo now handles the landing page, auth pages, and backend scaffolding.

Direct product URLs are not fully protected until the Streamlit apps themselves enforce NexAlpha entitlement before rendering. That still needs to be added inside the OptiTrade and BharatAlpha codebases.

---

## Deployment Notes

The static pages can continue to deploy through GitHub Pages.

The secure parts must be deployed separately:

- database and auth in Supabase
- edge functions in Supabase
- product-app entitlement checks inside each Streamlit app

---

## Disclaimer

The content on this website is for informational purposes only and does not constitute financial advice. Trading in Futures and Options involves significant risk of loss. Users should conduct their own research and consult a SEBI-registered financial advisor before making investment decisions.
