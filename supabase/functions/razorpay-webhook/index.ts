import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase.ts";

async function verifySignature(body: string, signature: string | null, secret: string) {
    if (!signature) {
        return false;
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const digestBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const digest = Array.from(new Uint8Array(digestBuffer))
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("");

    return digest === signature;
}

function unixToIso(value?: number | null) {
    return value ? new Date(value * 1000).toISOString() : null;
}

Deno.serve(async (request) => {
    if (request.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed." }, { status: 405, headers: corsHeaders });
    }

    try {
        const webhookSecret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");
        if (!webhookSecret) {
            throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured.");
        }

        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature");
        if (!(await verifySignature(body, signature, webhookSecret))) {
            return Response.json({ error: "Invalid webhook signature." }, { status: 401, headers: corsHeaders });
        }

        const payload = JSON.parse(body);
        const event = payload.event as string;
        const subscription = payload.payload?.subscription?.entity;
        const payment = payload.payload?.payment?.entity;

        if (!subscription?.id) {
            return Response.json({ ok: true }, { headers: corsHeaders });
        }

        const admin = createServiceClient();
        const { data: subscriptionRow, error: subscriptionLookupError } = await admin
            .from("subscriptions")
            .select("id, user_id")
            .eq("gateway_subscription_id", subscription.id)
            .maybeSingle();

        if (subscriptionLookupError) {
            throw subscriptionLookupError;
        }

        if (!subscriptionRow) {
            return Response.json(
                { error: "Subscription record not found for webhook event." },
                { status: 404, headers: corsHeaders }
            );
        }

        const { error: subscriptionUpdateError } = await admin
            .from("subscriptions")
            .update({
                status: subscription.status ?? "pending",
                gateway_customer_id: subscription.customer_id ?? null,
                current_period_start: unixToIso(subscription.current_start),
                current_period_end: unixToIso(subscription.current_end),
                cancel_at_period_end: Boolean(subscription.cancel_at_cycle_end ?? false),
                metadata: payload
            })
            .eq("id", subscriptionRow.id);

        if (subscriptionUpdateError) {
            throw subscriptionUpdateError;
        }

        if (payment?.id) {
            const { error: paymentError } = await admin.from("payments").upsert({
                user_id: subscriptionRow.user_id,
                subscription_id: subscriptionRow.id,
                gateway: "razorpay",
                gateway_payment_id: payment.id,
                gateway_invoice_id: payment.invoice_id ?? null,
                amount: payment.amount ?? 0,
                currency: payment.currency ?? "INR",
                status: payment.status ?? event,
                paid_at: unixToIso(payment.created_at),
                raw_payload: payload
            }, {
                onConflict: "gateway_payment_id"
            });

            if (paymentError) {
                throw paymentError;
            }
        }

        await admin.from("audit_logs").insert({
            actor_user_id: null,
            target_user_id: subscriptionRow.user_id,
            action: `razorpay_${event}`,
            details: {
                subscription_id: subscription.id,
                payment_id: payment?.id ?? null
            }
        });

        return Response.json({ ok: true }, { headers: corsHeaders });
    } catch (error) {
        return Response.json(
            {
                error: error instanceof Error ? error.message : "Unexpected webhook error."
            },
            { status: 500, headers: corsHeaders }
        );
    }
});
