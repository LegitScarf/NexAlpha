from __future__ import annotations

import logging
import smtplib
from email.message import EmailMessage
from threading import Thread

import httpx

from ..config import get_settings


logger = logging.getLogger(__name__)


def build_verification_url(token: str, app_base_url: str | None = None) -> str:
    settings = get_settings()
    public_base_url = (app_base_url or settings.app_base_url).rstrip("/")
    return f"{public_base_url}/verify-email?token={token}"


def _build_message_payload(email: str, full_name: str | None, verification_url: str) -> tuple[str, str]:
    subject = "Verify your NexAlpha account"
    text_content = "\n".join(
        [
            f"Hi {full_name or 'there'},",
            "",
            "Welcome to NexAlpha.",
            "Verify your email address by opening the link below:",
            verification_url,
            "",
            "After verification, your account will wait for admin approval before billing and product access unlock.",
        ]
    )
    return subject, text_content


def is_brevo_api_configured() -> bool:
    settings = get_settings()
    return bool(settings.brevo_api_key and settings.smtp_from_email)


def is_smtp_configured() -> bool:
    settings = get_settings()
    return bool(settings.smtp_host and settings.smtp_from_email)


def _deliver_via_brevo_api(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> None:
    settings = get_settings()
    verification_url = build_verification_url(token, app_base_url)
    subject, text_content = _build_message_payload(email, full_name, verification_url)

    response = httpx.post(
        f"{settings.brevo_api_base_url}/smtp/email",
        headers={
            "accept": "application/json",
            "api-key": settings.brevo_api_key or "",
            "content-type": "application/json",
        },
        json={
            "sender": {
                "name": settings.smtp_from_name,
                "email": settings.smtp_from_email,
            },
            "to": [
                {
                    "email": email,
                    "name": full_name or email,
                }
            ],
            "subject": subject,
            "textContent": text_content,
        },
        timeout=settings.email_request_timeout_seconds,
    )
    response.raise_for_status()


def _deliver_via_smtp(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> None:
    settings = get_settings()
    verification_url = build_verification_url(token, app_base_url)
    subject, text_content = _build_message_payload(email, full_name, verification_url)

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = f"{settings.smtp_from_name} <{settings.smtp_from_email}>"
    message["To"] = email
    message.set_content(text_content)

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=settings.smtp_timeout_seconds) as smtp:
        if settings.smtp_use_tls:
            smtp.starttls()
        if settings.smtp_username:
            smtp.login(settings.smtp_username, settings.smtp_password or "")
        smtp.send_message(message)


def _delivery_mode() -> str:
    settings = get_settings()
    if settings.email_provider == "brevo_api":
        return "brevo_api" if is_brevo_api_configured() else "preview"
    if settings.email_provider == "smtp":
        return "smtp" if is_smtp_configured() else "preview"
    if is_brevo_api_configured():
        return "brevo_api"
    if is_smtp_configured():
        return "smtp"
    return "preview"


def _deliver_verification_email(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> str:
    mode = _delivery_mode()
    if mode == "brevo_api":
        _deliver_via_brevo_api(email, full_name, token, app_base_url)
    elif mode == "smtp":
        _deliver_via_smtp(email, full_name, token, app_base_url)
    return mode


def _deliver_verification_email_safe(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> None:
    try:
        _deliver_verification_email(email, full_name, token, app_base_url)
    except (OSError, smtplib.SMTPException, TimeoutError, httpx.HTTPError) as error:
        logger.warning("Verification email delivery failed for %s: %s", email, error)


def send_verification_email(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> dict:
    verification_url = build_verification_url(token, app_base_url)
    mode = _delivery_mode()

    if mode == "preview":
        return {
            "emailDelivery": "preview",
            "verificationUrl": verification_url,
        }

    _deliver_verification_email_safe(email, full_name, token, app_base_url)

    return {
        "emailDelivery": mode,
        "verificationUrl": None,
    }


def queue_verification_email(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> dict:
    verification_url = build_verification_url(token, app_base_url)
    mode = _delivery_mode()

    if mode == "preview":
        return {
            "emailDelivery": "preview",
            "verificationUrl": verification_url,
        }

    Thread(
        target=_deliver_verification_email_safe,
        args=(email, full_name, token, app_base_url),
        name="nexalpha-email-verification",
        daemon=True,
    ).start()

    return {
        "emailDelivery": f"{mode}_queued",
        "verificationUrl": None,
    }
