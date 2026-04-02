import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient, getAuthenticatedUser } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
    if (request.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const authHeader = request.headers.get("Authorization");
        const user = await getAuthenticatedUser(authHeader);

        if (!user) {
            return Response.json(
                {
                    state: "guest",
                    canAccessApps: false
                },
                { headers: corsHeaders }
            );
        }

        const admin = createServiceClient();
        const { data, error } = await admin.rpc("account_state_for_user", {
            target_user_id: user.id
        });

        if (error) {
            throw error;
        }

        const row = data?.[0];
        if (!row) {
            return Response.json(
                {
                    state: "registered_unverified",
                    canAccessApps: false,
                    email: user.email
                },
                { headers: corsHeaders }
            );
        }

        return Response.json(
            {
                state: row.state,
                approvalStatus: row.approval_status,
                role: row.role,
                canAccessApps: row.can_access_apps,
                email: row.email,
                fullName: row.full_name,
                subscription: {
                    status: row.subscription_status,
                    currentPeriodEnd: row.current_period_end
                }
            },
            { headers: corsHeaders }
        );
    } catch (error) {
        return Response.json(
            {
                error: error instanceof Error ? error.message : "Unexpected error fetching status."
            },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }
});
