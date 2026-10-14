
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
# CORS CONFIGURATION
# GitHub Pages + Local Development
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://tarak2220.github.io",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


# ==========================================
# DATABASE INITIALIZATION
# ==========================================

Base.metadata.create_all(bind=engine)


# ==========================================
# ROOT ENDPOINT
# GET /
# ==========================================

@app.get("/")
def root():
    return {
        "message": "TeamWebsite Backend is running!",
        "status": "OK",
    }


# ==========================================
# HEALTH CHECK
# GET /api/health
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

    Attempt to send an email notification after
    the inquiry has been saved.
    """

    # --------------------------------------
    # SAVE INQUIRY TO DATABASE
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

        logger.exception("Failed to save client inquiry.")

        raise HTTPException(
            status_code=500,
            detail="Failed to save your inquiry. Please try again.",
        )

    # --------------------------------------
    # SEND EMAIL NOTIFICATION
    # --------------------------------------

    try:
        email_result = send_inquiry_email(
            name=db_inquiry.name,
            email=db_inquiry.email,
            service=db_inquiry.service,
            project_details=db_inquiry.project_details,
        )

        logger.info(
            "Email notification result: %s",
            email_result,
        )

    except Exception:
        # The inquiry is already saved.
        # Do not report the database operation as failed
        # just because the email notification failed.
        logger.exception(
            "Inquiry saved, but email notification failed."
        )

    # --------------------------------------
    # RETURN SAVED INQUIRY
    # --------------------------------------

    return db_inquiry
