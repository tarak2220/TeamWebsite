
import logging
import os
import smtplib
from email.message import EmailMessage
from pathlib import Path

from dotenv import load_dotenv

# Load the .env file located beside this Python file.
load_dotenv(Path(__file__).resolve().parent / ".env")

logger = logging.getLogger(__name__)


def send_inquiry_email(
    name: str,
    client_email: str,
    service: str,
    project_details: str,
    inquiry_id=None,
) -> bool:
    """Send a new client inquiry notification through Gmail."""

    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_email = os.getenv("SMTP_EMAIL", "")
    smtp_password = os.getenv("SMTP_APP_PASSWORD", "")
    recipient = os.getenv(
        "INQUIRY_RECIPIENT",
        "tarakvamsharaj@gmail.com",
    )

    if not smtp_email or not smtp_password:
        logger.error(
            "Email notification not sent: SMTP credentials are missing."
        )
        return False

    message = EmailMessage()
    message["Subject"] = f"New TeamWebsite Inquiry: {service}"
    message["From"] = smtp_email
    message["To"] = recipient

    if client_email:
        message["Reply-To"] = client_email

    message.set_content(
        f"""A new client inquiry was submitted through TeamWebsite.

Inquiry ID: {inquiry_id if inquiry_id is not None else "N/A"}

Client name: {name}
Client email: {client_email}
Requested service: {service}

Project requirements:
{project_details}
"""
    )

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(smtp_email, smtp_password)
            server.send_message(message)

        logger.info("Email notification sent for inquiry #%s", inquiry_id)
        return True

    except (OSError, smtplib.SMTPException):
        logger.exception(
            "Email notification failed for inquiry #%s",
            inquiry_id,
        )
        return False

