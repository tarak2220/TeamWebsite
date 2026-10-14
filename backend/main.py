
import logging

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, Inquiry
from schemas import InquiryCreate, InquiryResponse
from email_service import send_inquiry_email


# ==========================================
# LOGGING
# ==========================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ==========================================
# FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="TeamWebsite API",
    description=(
        "Backend API for client inquiries "
        "and email notifications."
    ),
    version="1.0.0",
)


# ==========================================
# DATABASE INITIALIZATION
# ==========================================

Base.metadata.create_all(bind=engine)


# ==========================================
# CORS CONFIGURATION
# Local development only
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


# ==========================================
# ROOT ENDPOINT
# ==========================================

@app.get("/")
def root():
    return {
        "message": "TeamWebsite Backend is running!",
        "status": "OK",
    }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/api/health")
def health_check():
    return {
        "status": "OK",
    }


# ==========================================
# CREATE CLIENT INQUIRY
# POST /api/inquiries
# ==========================================

@app.post(
    "/api/inquiries",
    response_model=InquiryResponse,
    status_code=201,
)
def create_inquiry(
    inquiry: InquiryCreate,
    db: Session = Depends(get_db),
):
    """
    Save a client inquiry to the database.

    After saving, attempt to send an email notification.
    Client inquiry records are not exposed through a
    public listing endpoint.
    """

    # --------------------------------------
    # Validate and save inquiry
    # --------------------------------------

    try:
        db_inquiry = Inquiry(
            name=inquiry.name.strip(),
            email=str(inquiry.email),
            service=inquiry.service.strip(),
            project_details=inquiry.project_details.strip(),
        )

        db.add(db_inquiry)
        db.commit()
        db.refresh(db_inquiry)

    except Exception:
        db.rollback()

        logger.exception(
            "Failed to save client inquiry."
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Could not save your inquiry. "
                "Please try again."
            ),
        )

    # --------------------------------------
    # Send email notification
    # --------------------------------------

    try:
        email_sent = send_inquiry_email(
            name=db_inquiry.name,
            client_email=db_inquiry.email,
            service=db_inquiry.service,
            project_details=db_inquiry.project_details,
            inquiry_id=db_inquiry.id,
        )

        if email_sent:
            logger.info(
                "Email notification sent for inquiry #%s.",
                db_inquiry.id,
            )
        else:
            logger.warning(
                "Inquiry #%s was saved, but its email "
                "notification could not be sent.",
                db_inquiry.id,
            )

    except Exception:
        # Do not lose a saved inquiry because email failed.
        logger.exception(
            "Unexpected email error for inquiry #%s.",
            db_inquiry.id,
        )

    # --------------------------------------
    # Return confirmation for the submitted inquiry
    # --------------------------------------

    return db_inquiry
