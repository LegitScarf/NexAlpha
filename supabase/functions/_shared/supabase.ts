import { createClient } from "npm:@supabase/supabase-js@2";

export function createAnonClient(authHeader?: string | null) {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be configured.");
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: authHeader ? { Authorization: authHeader } : {}
        }
    });
}

export function createServiceClient() {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.");
    }

    return createClient(supabaseUrl, serviceRoleKey);
}

export async function getAuthenticatedUser(authHeader?: string | null) {
    if (!authHeader) {
        return null;
    }

    const anon = createAnonClient(authHeader);
    const { data, error } = await anon.auth.getUser();

    if (error) {
        throw error;
    }

    return data.user ?? null;
}
