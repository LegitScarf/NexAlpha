import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const rawConfig = window.NEXALPHA_CONFIG ?? {};

function normalizeString(value) {
    return typeof value === "string" ? value.trim() : "";
}

function isPlaceholder(value, placeholder) {
    return value.includes(placeholder);
}

function deriveFunctionsBaseUrl(supabaseUrl, explicitBaseUrl) {
    const normalizedBaseUrl = normalizeString(explicitBaseUrl);
    if (normalizedBaseUrl && !isPlaceholder(normalizedBaseUrl, "YOUR_PROJECT_ID")) {
        return normalizedBaseUrl.replace(/\/+$/, "");
    }

    if (!supabaseUrl) {
        return "";
    }

    return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1`;
}

const config = Object.freeze({
    ...rawConfig,
    supabaseUrl: normalizeString(rawConfig.supabaseUrl),
    supabaseAnonKey: normalizeString(rawConfig.supabaseAnonKey),
    functionsBaseUrl: deriveFunctionsBaseUrl(
        normalizeString(rawConfig.supabaseUrl),
        rawConfig.functionsBaseUrl
    )
});

function hasRealConfig() {
    return Boolean(
        config.supabaseUrl &&
        config.supabaseAnonKey &&
        !isPlaceholder(config.supabaseUrl, "YOUR_PROJECT_ID") &&
        !isPlaceholder(config.supabaseAnonKey, "YOUR_SUPABASE_ANON_KEY")
    );
}

export function getConfig() {
    return config;
}

export function isConfigured() {
    return hasRealConfig();
}

export function getFunctionsBaseUrl() {
    if (!hasRealConfig()) {
        return "";
    }

    return config.functionsBaseUrl;
}

let supabaseClient = null;

export function getSupabase() {
    if (!hasRealConfig()) {
        return null;
    }

    if (!supabaseClient) {
        supabaseClient = createClient(config.supabaseUrl, config.supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    }

    return supabaseClient;
}

export function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

export function setMessage(node, tone, text) {
    if (!node) {
        return;
    }

    node.className = `message is-visible ${tone}`;
    node.textContent = text;
}

export function clearMessage(node) {
    if (!node) {
        return;
    }

    node.className = "message";
    node.textContent = "";
}

export function requireConfigured(messageNode) {
    if (isConfigured()) {
        return true;
    }

    setMessage(
        messageNode,
        "warning",
        "Supabase is not configured yet. Update assets/js/config.js with your real supabaseUrl and supabaseAnonKey before using auth."
    );
    return false;
}

export async function getSession() {
    const supabase = getSupabase();
    if (!supabase) {
        return null;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw error;
    }

    return data.session;
}

export async function signOut() {
    const supabase = getSupabase();
    if (!supabase) {
        return;
    }

    await supabase.auth.signOut();
}

export async function fetchStatus() {
    const supabase = getSupabase();
    if (!supabase) {
        throw new Error("Supabase is not configured.");
    }

    const session = await getSession();
    if (!session?.access_token) {
        return {
            state: "guest",
            canAccessApps: false
        };
    }

    const response = await fetch(`${getFunctionsBaseUrl()}/me-status`, {
        headers: {
            Authorization: `Bearer ${session.access_token}`
        }
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(payload.error ?? "Unable to fetch account status.");
    }

    return payload;
}

export async function createSubscription() {
    const supabase = getSupabase();
    if (!supabase) {
        throw new Error("Supabase is not configured.");
    }

    const session = await getSession();
    if (!session?.access_token) {
        throw new Error("Please sign in before starting a subscription.");
    }

    const response = await fetch(`${getFunctionsBaseUrl()}/create-subscription`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`
        }
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(payload.error ?? "Unable to create the subscription.");
    }

    return payload;
}

export function getProduct(productCode) {
    return config.products?.[productCode] ?? null;
}

export function getRedirectTarget(defaultTarget = "account.html") {
    return getQueryParam("redirect") ?? defaultTarget;
}

export function redirectTo(path) {
    window.location.href = path;
}

export async function bounceIfAuthenticated(defaultTarget = "account.html") {
    const session = await getSession();
    if (session?.user) {
        redirectTo(getRedirectTarget(defaultTarget));
    }
}

export async function requireAuthPage(messageNode) {
    if (!requireConfigured(messageNode)) {
        return null;
    }

    const session = await getSession();
    if (!session?.user) {
        const redirect = encodeURIComponent(window.location.pathname.split("/").pop() || "account.html");
        redirectTo(`login.html?redirect=${redirect}`);
        return null;
    }

    return session;
}

export function renderUserEmail(node, email) {
    if (node) {
        node.textContent = email ?? "Not signed in";
    }
}
