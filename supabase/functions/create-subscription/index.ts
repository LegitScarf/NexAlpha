import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient, getAuthenticatedUser } from "../_shared/supabase.ts";

type RazorpaySubscriptionResponse = {
    id: string;
    status: string;
    current_start?: number | null;
    current_end?: number | null;
    short_url?: string | null;
    customer_id?: string | null;
    plan_id?: string | null;
};

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
        const authHeader = request.headers.get("Authorization");
        const user = await getAuthenticatedUser(authHeader);

        if (!user) {
            return Response.json({ error: "Unauthorized." }, { status: 401, headers: corsHeaders });
        }

        const admin = createServiceClient();
        const { data: statusRows, error: statusError } = await admin.rpc("account_state_for_user", {
            target_user_id: user.id
        });

        if (statusError) {
            throw statusError;
        }

        const status = statusRows?.[0];
        if (!status || status.approval_status !== "approved") {
            return Response.json(
                { error: "Your account must be approved before you can subscribe." },
                { status: 403, headers: corsHeaders }
            );
        }

        if (status.subscription_status === "active") {
            return Response.json(
                { error: "This account already has an active subscription." },
                { status: 409, headers: corsHeaders }
            );
        }

        const keyId = Deno.env.get("RAZORPAY_KEY_ID");
        const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
        const planId = Deno.env.get("RAZORPAY_PLAN_ID");

        if (!keyId || !keySecret || !planId) {
            return Response.json(
                {
                    error: "Razorpay is not configured yet. Add RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, and RAZORPAY_PLAN_ID."
                },
                { status: 500, headers: corsHeaders }
            );
        }

        const payload = {
            plan_id: planId,
            total_count: 1200,
            quantity: 1,
            customer_notify: true,
            notes: {
                source: "nexalpha",
                user_id: user.id
            }
        };

        const auth = btoa(`${keyId}:${keySecret}`);
        const razorpayResponse = await fetch("https://api.razorpay.com/v1/subscriptions", {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const razorpayData = await razorpayResponse.json() as RazorpaySubscriptionResponse & { error?: { description?: string } };
        if (!razorpayResponse.ok) {
            return Response.json(
                {
                    error: razorpayData.error?.description ?? "Unable to create Razorpay subscription."
                },
                { status: razorpayResponse.status, headers: corsHeaders }
            );
        }

        const { error: upsertError } = await admin.from("subscriptions").upsert({
            user_id: user.id,
            gateway: "razorpay",
            gateway_customer_id: razorpayData.customer_id ?? null,
            gateway_subscription_id: razorpayData.id,
            gateway_plan_id: razorpayData.plan_id ?? planId,
            status: razorpayData.status ?? "created",
            amount_inr: 500,
            currency: "INR",
            current_period_start: unixToIso(razorpayData.current_start),
            current_period_end: unixToIso(razorpayData.current_end),
            metadata: payload
        }, {
            onConflict: "gateway_subscription_id"
        });

        if (upsertError) {
            throw upsertError;
        }

        return Response.json(
            {
                checkoutUrl: razorpayData.short_url ?? null,
                subscriptionId: razorpayData.id,
                status: razorpayData.status
            },
            { headers: corsHeaders }
        );
    } catch (error) {
        return Response.json(
            {
                error: error instanceof Error ? error.message : "Unexpected error creating subscription."
            },
            { status: 500, headers: corsHeaders }
        );
    }
});
