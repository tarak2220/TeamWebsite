
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from database import Base


class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(150), nullable=False)

    email = Column(String(255), nullable=False)

    service = Column(String(150), nullable=False)

    # Keep the existing database column named "project".
    # Python code can access this field as project_details.
    project_details = Column(
        "project",
        Text,
        nullable=False,
        default="",
        server_default="",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
