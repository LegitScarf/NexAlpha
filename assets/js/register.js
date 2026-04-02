import { bounceIfAuthenticated, clearMessage, getSupabase, redirectTo, requireConfigured, setMessage } from "./auth-client.js";

const form = document.querySelector("[data-register-form]");
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
    const fullName = String(formData.get("full_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirm_password") ?? "");

    if (!fullName || !email || !password) {
        setMessage(message, "error", "Please complete all required fields.");
        return;
    }

    if (password.length < 8) {
        setMessage(message, "error", "Use a password with at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        setMessage(message, "error", "Passwords do not match.");
        return;
    }

    const supabase = getSupabase();
    const button = form.querySelector("button[type='submit']");
    if (button) {
        button.disabled = true;
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/account.html`,
            data: {
                full_name: fullName
            }
        }
    });

    if (button) {
        button.disabled = false;
    }

    if (error) {
        setMessage(message, "error", error.message);
        return;
    }

    setMessage(
        message,
        "success",
        `Account created for ${email}. Check your inbox, verify your email, then sign in to continue.`
    );

    window.setTimeout(() => {
        redirectTo("login.html");
    }, 2400);
});

void init();
