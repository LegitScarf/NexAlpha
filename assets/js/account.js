import {
    createSubscription,
    fetchStatus,
    getConfig,
    renderUserEmail,
    requireAuthPage,
    setMessage,
    signOut
} from "./auth-client.js";

const summary = document.querySelector("[data-account-summary]");
const accountState = document.querySelector("[data-account-state]");
const accountMessage = document.querySelector("[data-account-message]");
const accountActions = document.querySelector("[data-account-actions]");
const emailNode = document.querySelector("[data-user-email]");
const signOutButton = document.querySelector("[data-sign-out]");

function renderActionLink(href, label, variant = "portal-button") {
    return `<a class="${variant}" href="${href}">${label}</a>`;
}

function toDisplayLabel(value) {
    return String(value ?? "")
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildStatusCards(status, config) {
    const isAdmin = status.role === "admin";
    const currentEnd = status.subscription?.currentPeriodEnd
        ? new Date(status.subscription.currentPeriodEnd).toLocaleDateString()
        : (isAdmin ? "Not required" : "Not scheduled");

    const stateMap = {
        guest: {
            tone: "info",
            title: "Guest",
            detail: "Sign In Required"
        },
        registered_unverified: {
            tone: "warning",
            title: "Registered",
            detail: "Email Unverified"
        },
        verified_pending_approval: {
            tone: "info",
            title: "Verified",
            detail: "Awaiting Approval"
        },
        approved_unsubscribed: {
            tone: "warning",
            title: "Approved",
            detail: "Billing Required"
        },
        approved_subscription_pending: {
            tone: "info",
            title: "Approved",
            detail: "Payment Pending"
        },
        active: {
            tone: "success",
            title: "Active",
            detail: "Apps Unlocked"
        },
        suspended: {
            tone: "danger",
            title: "Suspended",
            detail: "Access Paused"
        }
    };

    const stateCard = isAdmin
        ? { tone: "success", title: "Admin", detail: "Full Access" }
        : (stateMap[status.state] ?? stateMap.guest);

    const approvalCard = isAdmin
        ? { tone: "success", title: "Admin Override", detail: "Queue Access Enabled" }
        : {
            tone: status.approvalStatus === "approved" ? "success" : (status.approvalStatus === "rejected" ? "danger" : "warning"),
            title: toDisplayLabel(status.approvalStatus ?? "pending"),
            detail: status.approvalStatus === "approved"
                ? "Manual Review Complete"
                : (status.approvalStatus === "rejected" ? "Access Rejected" : "Awaiting Manual Review")
        };

    const subscriptionStatus = isAdmin ? "Not Required" : toDisplayLabel(status.subscription?.status ?? "inactive");
    const subscriptionTone = isAdmin
        ? "success"
        : (status.subscription?.status === "active" ? "success" : (
            status.subscription?.status ? "info" : "warning"
        ));
    const subscriptionDetail = isAdmin
        ? "Admin Bypass Enabled"
        : (status.subscription?.currentPeriodEnd ? `Cycle Ends ${currentEnd}` : "Billing Not Started");

    return [
        {
            kicker: "Access State",
            icon: "ACC",
            ...stateCard
        },
        {
            kicker: "Approval Status",
            icon: "APR",
            ...approvalCard,
            showDot: !isAdmin && status.approvalStatus === "pending"
        },
        {
            kicker: "Subscription",
            icon: "SUB",
            tone: subscriptionTone,
            title: subscriptionStatus,
            detail: subscriptionDetail
        },
        {
            kicker: "Selected Plan",
            icon: "INR",
            tone: isAdmin ? "success" : "info",
            title: isAdmin ? "Admin Override" : `INR ${config.billing.amountInr.toLocaleString()}/${config.billing.interval.toUpperCase()}`,
            detail: `Next Billing Cycle: ${currentEnd}`
        }
    ];
}

function renderSummary(status) {
    const config = getConfig();
    const cards = buildStatusCards(status, config);

    summary.innerHTML = cards.map((card) => `
        <article class="status-card status-card-${card.tone}">
            <div class="status-card-icon" aria-hidden="true">${card.icon}</div>
            <div class="status-card-body">
                <div class="status-card-kicker">${card.kicker}</div>
                <div class="status-card-title-row">
                    <strong class="status-card-title">${card.title}</strong>
                    ${card.showDot ? '<span class="status-card-dot" aria-hidden="true"></span>' : ""}
                </div>
                <div class="status-card-detail">${card.detail}</div>
            </div>
        </article>
    `).join("");
}

function renderState(status) {
    if (status.role === "admin") {
        accountState.className = "status-badge success";
        accountState.textContent = "Admin Access";
        setMessage(
            accountMessage,
            "success",
            "Your admin account bypasses billing and can access the admin queue and both products immediately."
        );
        return;
    }

    const stateMap = {
        guest: {
            tone: "warning",
            label: "Guest",
            copy: "Sign in to unlock your account dashboard and continue the onboarding flow."
        },
        registered_unverified: {
            tone: "warning",
            label: "Verify Email",
            copy: "Your account exists, but email verification is still pending."
        },
        verified_pending_approval: {
            tone: "info",
            label: "Approval Queue",
            copy: "Your email is verified. The next step is manual approval from NexAlpha before billing can start."
        },
        approved_unsubscribed: {
            tone: "warning",
            label: "Subscription Required",
            copy: "You are approved. Start the Rs 599/month subscription to unlock both products."
        },
        approved_subscription_pending: {
            tone: "info",
            label: "Payment Pending",
            copy: "Your checkout has started. Access will unlock after Razorpay confirms the authorization payment."
        },
        active: {
            tone: "success",
            label: "Active Access",
            copy: "Your account is fully active and both products are unlocked."
        },
        suspended: {
            tone: "danger",
            label: "Suspended",
            copy: "Access is currently paused. Renew the subscription or contact NexAlpha support."
        }
    };

    const view = stateMap[status.state] ?? stateMap.guest;
    accountState.className = `status-badge ${view.tone}`;
    accountState.textContent = view.label;
    setMessage(accountMessage, view.tone === "danger" ? "error" : view.tone, view.copy);
}

function renderActions(status) {
    const products = Object.entries(getConfig().products ?? {});

    if (status.role === "admin") {
        const productLinks = products.map(([code, product], index) => {
            const variant = index === 0 ? "portal-button" : "portal-button-secondary";
            return renderActionLink(`access.html?product=${code}`, `Launch ${product.name}`, variant);
        }).join("");
        accountActions.innerHTML = `
            ${renderActionLink("admin.html", "Open Admin Queue", "portal-button")}
            ${productLinks}
        `;
        return;
    }

    if (status.state === "active") {
        accountActions.innerHTML = products.map(([code, product], index) => {
            const variant = index === 0 ? "portal-button" : "portal-button-secondary";
            return renderActionLink(`access.html?product=${code}`, `Launch ${product.name}`, variant);
        }).join("");
        return;
    }

    if (status.state === "approved_unsubscribed" || status.state === "suspended") {
        accountActions.innerHTML = `
            <button class="portal-button" type="button" data-start-subscription>
                Subscribe Rs 599/Month
            </button>
            ${renderActionLink("index.html#products", "Review Products", "portal-button-secondary")}
        `;

        const subscribeButton = accountActions.querySelector("[data-start-subscription]");
        subscribeButton?.addEventListener("click", async () => {
            subscribeButton.disabled = true;
            try {
                const payload = await createSubscription();
                if (payload.checkoutUrl) {
                    window.location.href = payload.checkoutUrl;
                    return;
                }

                setMessage(
                    accountMessage,
                    "info",
                    "Subscription was created, but no checkout URL was returned. Check your Razorpay plan setup."
                );
            } catch (error) {
                setMessage(accountMessage, "error", error.message);
            } finally {
                subscribeButton.disabled = false;
            }
        });
        return;
    }

    if (status.state === "verified_pending_approval") {
        accountActions.innerHTML = renderActionLink(
            "mailto:hello@nexalpha.in?subject=NexAlpha%20Approval%20Request",
            "Contact NexAlpha",
            "portal-button-secondary"
        );
        return;
    }

    if (status.state === "registered_unverified") {
        accountActions.innerHTML = renderActionLink("login.html", "Sign In Again", "portal-button-secondary");
        return;
    }

    accountActions.innerHTML = renderActionLink("login.html", "Sign In", "portal-button");
}

async function init() {
    const session = await requireAuthPage(accountMessage);
    if (!session) {
        return;
    }

    renderUserEmail(emailNode, session.user.email);

    try {
        const status = await fetchStatus();
        renderSummary(status);
        renderState(status);
        renderActions(status);
    } catch (error) {
        setMessage(accountMessage, "error", error.message);
    }
}

signOutButton?.addEventListener("click", async () => {
    await signOut();
    window.location.href = "login.html";
});

void init().catch((error) => {
    setMessage(accountMessage, "error", error.message);
});
