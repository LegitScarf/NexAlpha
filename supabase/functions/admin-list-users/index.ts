import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient, getAuthenticatedUser } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
    if (request.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    if (request.method !== "GET") {
        return Response.json({ error: "Method not allowed." }, { status: 405, headers: corsHeaders });
    }

    try {
        const authHeader = request.headers.get("Authorization");
        const actor = await getAuthenticatedUser(authHeader);

        if (!actor) {
            return Response.json({ error: "Unauthorized." }, { status: 401, headers: corsHeaders });
        }

        const admin = createServiceClient();
        const { data: actorProfile, error: actorError } = await admin
            .from("profiles")
            .select("role")
            .eq("id", actor.id)
            .maybeSingle();

        if (actorError) {
            throw actorError;
        }

        if (actorProfile?.role !== "admin") {
            return Response.json({ error: "Admin role required." }, { status: 403, headers: corsHeaders });
        }

        const { data: users, error: usersError } = await admin
            .from("profiles")
            .select("id, email, full_name, approval_status, role, is_email_verified, created_at")
            .order("created_at", { ascending: false });

        if (usersError) {
            throw usersError;
        }

        const enrichedUsers = [];
        for (const user of users ?? []) {
            const { data: stateRows, error: stateError } = await admin.rpc("account_state_for_user", {
                target_user_id: user.id
            });

            if (stateError) {
                throw stateError;
            }

            const state = stateRows?.[0];
            enrichedUsers.push({
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                approvalStatus: user.approval_status,
                role: user.role,
                isEmailVerified: user.is_email_verified,
                createdAt: user.created_at,
                state: state?.state ?? "unknown",
                subscriptionStatus: state?.subscription_status ?? null
            });
        }

        return Response.json({ users: enrichedUsers }, { headers: corsHeaders });
    } catch (error) {
        return Response.json(
            {
                error: error instanceof Error ? error.message : "Unexpected error loading admin users."
            },
            { status: 500, headers: corsHeaders }
        );
    }
});
