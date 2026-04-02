import { fetchStatus, getFunctionsBaseUrl, getSession, requireAuthPage, setMessage } from "./auth-client.js";

const message = document.querySelector("[data-admin-message]");
const tableBody = document.querySelector("[data-admin-body]");
const refreshButton = document.querySelector("[data-admin-refresh]");

async function callFunction(path, method = "GET", body) {
    const session = await getSession();
    if (!session?.access_token) {
        throw new Error("Admin session not found.");
    }

    const functionsBaseUrl = getFunctionsBaseUrl();
    const response = await fetch(`${functionsBaseUrl}/${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`
        },
        body: body ? JSON.stringify(body) : undefined
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(payload.error ?? "Admin request failed.");
    }

    return payload;
}

function renderRow(user) {
    const subscription = user.subscriptionStatus ?? "none";
    const approved = user.approvalStatus ?? "pending";
    const verificationLabel = user.isEmailVerified ? "Email verified" : "Email verification pending";
    const verificationClass = user.isEmailVerified ? "status-badge success" : "status-badge warning";
    const approvalDisabled = user.isEmailVerified ? "" : "disabled";
    const approvalHint = user.isEmailVerified
        ? ""
        : `<div class="muted" style="margin-top: 8px;">Verify email before approval.</div>`;

    return `
        <tr>
            <td>
                <strong>${user.fullName || "Unnamed user"}</strong><br>
                <span class="muted">${user.email}</span>
                <div style="margin-top: 10px;">
                    <span class="${verificationClass}">${verificationLabel}</span>
                </div>
            </td>
            <td>${approved}</td>
            <td>${subscription}</td>
            <td>${user.state}</td>
            <td>
                <div class="admin-actions">
                    <button class="portal-button-secondary" type="button" data-approve="${user.id}" ${approvalDisabled}>Approve</button>
                    <button class="portal-button-secondary" type="button" data-reject="${user.id}">Reject</button>
                </div>
                ${approvalHint}
            </td>
        </tr>
    `;
}

async function handleDecision(button, payload, successTone, successMessage) {
    button.disabled = true;

    try {
        await callFunction("admin-approve-user", "POST", payload);
        setMessage(message, successTone, successMessage);
        await loadUsers();
    } catch (error) {
        setMessage(message, "error", error.message);
    } finally {
        button.disabled = false;
    }
}

async function loadUsers() {
    tableBody.innerHTML = "";
    const payload = await callFunction("admin-list-users");
    tableBody.innerHTML = payload.users.map(renderRow).join("") || `
        <tr>
            <td colspan="5" class="muted">No users found.</td>
        </tr>
    `;

    tableBody.querySelectorAll("[data-approve]").forEach((button) => {
        button.addEventListener("click", async () => {
            const targetUserId = button.getAttribute("data-approve");
            await handleDecision(button, {
                targetUserId,
                decision: "approved"
            }, "success", "User approved.");
        });
    });

    tableBody.querySelectorAll("[data-reject]").forEach((button) => {
        button.addEventListener("click", async () => {
            const targetUserId = button.getAttribute("data-reject");
            await handleDecision(button, {
                targetUserId,
                decision: "rejected"
            }, "warning", "User rejected.");
        });
    });
}

async function init() {
    const session = await requireAuthPage(message);
    if (!session) {
        return;
    }

    const status = await fetchStatus();
    if (status.role !== "admin") {
        setMessage(message, "error", "Admin role required to access this page.");
        return;
    }

    await loadUsers();
}

refreshButton?.addEventListener("click", async () => {
    try {
        await loadUsers();
        setMessage(message, "info", "Admin table refreshed.");
    } catch (error) {
        setMessage(message, "error", error.message);
    }
});

void init().catch((error) => {
    setMessage(message, "error", error.message);
});
