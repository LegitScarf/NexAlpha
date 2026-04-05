from __future__ import annotations

import logging
import smtplib
from email.message import EmailMessage
from threading import Thread

from ..config import get_settings


logger = logging.getLogger(__name__)


def build_verification_url(token: str, app_base_url: str | None = None) -> str:
    settings = get_settings()
    public_base_url = (app_base_url or settings.app_base_url).rstrip("/")
    return f"{public_base_url}/verify-email?token={token}"


def is_smtp_configured() -> bool:
    settings = get_settings()
    return bool(settings.smtp_host and settings.smtp_from_email)


def _deliver_verification_email(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> None:
    settings = get_settings()
    verification_url = build_verification_url(token, app_base_url)

    message = EmailMessage()
    message["Subject"] = "Verify your NexAlpha account"
    message["From"] = f"{settings.smtp_from_name} <{settings.smtp_from_email}>"
    message["To"] = email
    message.set_content(
        "\n".join(
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
    )

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=settings.smtp_timeout_seconds) as smtp:
        if settings.smtp_use_tls:
            smtp.starttls()
        if settings.smtp_username:
            smtp.login(settings.smtp_username, settings.smtp_password or "")
        smtp.send_message(message)


def _deliver_verification_email_safe(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> None:
    try:
        _deliver_verification_email(email, full_name, token, app_base_url)
    except (OSError, smtplib.SMTPException, TimeoutError) as error:
        logger.warning("Verification email delivery failed for %s: %s", email, error)


def send_verification_email(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> dict:
    verification_url = build_verification_url(token, app_base_url)

    if not is_smtp_configured():
        return {
            "emailDelivery": "preview",
            "verificationUrl": verification_url,
        }

    _deliver_verification_email_safe(email, full_name, token, app_base_url)

    return {
        "emailDelivery": "smtp",
        "verificationUrl": None,
    }


def queue_verification_email(email: str, full_name: str | None, token: str, app_base_url: str | None = None) -> dict:
    verification_url = build_verification_url(token, app_base_url)

    if not is_smtp_configured():
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
        "emailDelivery": "smtp_queued",
        "verificationUrl": None,
    }
