import { bounceIfAuthenticated, clearMessage, getRedirectTarget, getSupabase, redirectTo, requireConfigured, setMessage } from "./auth-client.js";

const form = document.querySelector("[data-login-form]");
const message = document.querySelector("[data-form-message]");

async function init() {
    if (!form) {
        return;
    }

    await bounceIfAuthenticated();
    requireConfigured(message);
}

form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage(message);

    if (!requireConfigured(message)) {
        return;
    }

    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
        setMessage(message, "error", "Enter both your email and password.");
        return;
    }

    const supabase = getSupabase();
    const button = form.querySelector("button[type='submit']");
    if (button) {
        button.disabled = true;
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (button) {
        button.disabled = false;
    }

    if (error) {
        setMessage(message, "error", error.message);
        return;
    }

    redirectTo(getRedirectTarget("account.html"));
});

void init();
