const rawConfig = window.NEXALPHA_CONFIG ?? {};

function normalizeString(value) {
    return typeof value === "string" ? value.trim() : "";
}

function trimTrailingSlash(value) {
    return value.replace(/\/+$/, "");
}

function deriveBaseUrl(explicitValue, fallbackValue) {
    const normalizedExplicit = normalizeString(explicitValue);
    if (normalizedExplicit) {
        return trimTrailingSlash(normalizedExplicit);
    }

    const normalizedFallback = normalizeString(fallbackValue);
    return normalizedFallback ? trimTrailingSlash(normalizedFallback) : "";
}

const browserOrigin = window.location.origin && window.location.origin !== "null" ? window.location.origin : "";
const appBaseUrl = deriveBaseUrl(rawConfig.appBaseUrl, browserOrigin);

const config = Object.freeze({
    ...rawConfig,
    appBaseUrl,
    apiBaseUrl: deriveBaseUrl(rawConfig.apiBaseUrl, appBaseUrl ? `${appBaseUrl}/api` : "")
});

export function getConfig() {
    return config;
}

export function isConfigured() {
    return Boolean(config.apiBaseUrl);
}

export function getApiBaseUrl() {
    return config.apiBaseUrl;
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
        "FastAPI is not configured yet. Update assets/js/config.js with apiBaseUrl if your frontend and backend run on different origins."
    );
    return false;
}

function formatApiError(payload) {
    if (typeof payload?.detail === "string" && payload.detail.trim()) {
        return payload.detail;
    }

    if (Array.isArray(payload?.detail) && payload.detail.length > 0) {
        return payload.detail.map((item) => {
            const location = Array.isArray(item?.loc) ? item.loc.join(".") : "request";
            const message = typeof item?.msg === "string" ? item.msg : "Invalid value.";
            return `${location}: ${message}`;
        }).join(" ");
    }

    if (typeof payload?.error === "string" && payload.error.trim()) {
        return payload.error;
    }

    return "Request failed.";
}

export async function apiRequest(path, options = {}) {
    const { method = "GET", body, headers = {}, timeoutMs = 15000 } = options;

    if (!isConfigured()) {
        throw new Error("FastAPI is not configured.");
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    let response;
    try {
        response = await fetch(`${getApiBaseUrl()}${path}`, {
            method,
            credentials: "include",
            headers: {
                ...(body ? { "Content-Type": "application/json" } : {}),
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal
        });
    } catch (error) {
        if (error?.name === "AbortError") {
            throw new Error("The request took too long. Please try again. If this keeps happening, check the email delivery settings on the server.");
        }
        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(formatApiError(payload));
    }

    return payload;
}

export async function getSession() {
    return apiRequest("/auth/session");
}

export async function registerAccount(payload) {
    return apiRequest("/auth/register", {
        method: "POST",
        body: payload
    });
}

export async function signIn(payload) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: payload
    });
}

export async function signOut() {
    return apiRequest("/auth/logout", {
        method: "POST"
    });
}

export async function fetchStatus() {
    return apiRequest("/account/status");
}

export async function createSubscription() {
    return apiRequest("/billing/create-subscription", {
        method: "POST"
    });
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
    if (session.authenticated) {
        redirectTo(getRedirectTarget(defaultTarget));
    }
}

export async function requireAuthPage(messageNode) {
    if (!requireConfigured(messageNode)) {
        return null;
    }

    const session = await getSession();
    if (!session.authenticated) {
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
