import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createServiceClient, getAuthenticatedUser } from "../_shared/supabase.ts";

type ApprovalDecision = "approved" | "rejected";

type ApprovalRequestBody = {
    targetUserId?: unknown;
    decision?: unknown;
    rejectedReason?: unknown;
};

type ProfileUpdatePayload = {
    approval_status: ApprovalDecision;
    approved_at: string | null;
    approved_by: string;
    rejected_reason: string | null;
};

function isApprovalDecision(value: unknown): value is ApprovalDecision {
    return value === "approved" || value === "rejected";
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

        const body = await request.json() as ApprovalRequestBody;
        const targetUserId = typeof body.targetUserId === "string" ? body.targetUserId.trim() : "";
        const decision = body.decision;
        const rejectedReason = typeof body.rejectedReason === "string" ? body.rejectedReason.trim() : "";

        if (!targetUserId || !isApprovalDecision(decision)) {
            return Response.json({ error: "Invalid approval payload." }, { status: 400, headers: corsHeaders });
        }

        const updatePayload: ProfileUpdatePayload = decision === "approved"
            ? {
                approval_status: "approved",
                approved_at: new Date().toISOString(),
                approved_by: actor.id,
                rejected_reason: null
            }
            : {
                approval_status: "rejected",
                approved_at: null,
                approved_by: actor.id,
                rejected_reason: rejectedReason || "Rejected by admin"
            };

        const { data: updatedProfile, error: updateError } = await admin
            .from("profiles")
            .update(updatePayload)
            .eq("id", targetUserId)
            .select("id")
            .maybeSingle();

        if (updateError) {
            throw updateError;
        }

        if (!updatedProfile) {
            return Response.json({ error: "Target user not found." }, { status: 404, headers: corsHeaders });
        }

        await admin.from("audit_logs").insert({
            actor_user_id: actor.id,
            target_user_id: targetUserId,
            action: `user_${decision}`,
            details: decision === "rejected" ? { rejectedReason: rejectedReason || "Rejected by admin" } : {}
        });

        return Response.json({ ok: true }, { headers: corsHeaders });
    } catch (error) {
        return Response.json(
            {
                error: error instanceof Error ? error.message : "Unexpected error approving user."
            },
            { status: 500, headers: corsHeaders }
        );
    }
});
