
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class InquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    service: str = Field(min_length=1, max_length=150)
    project_details: str = Field(min_length=5, max_length=10000)


class InquiryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    service: str
    project_details: str
    created_at: datetime

