# backend/app/schemas.py
from datetime import datetime

from pydantic import BaseModel


class AlertOut(BaseModel):
    id: int
    event_type: str
    severity: str
    score: float
    description: str
    timestamp: datetime

    class Config:
        from_attributes = True  # for SQLAlchemy models


class MetricsOut(BaseModel):
    total_events: int
    total_alerts: int
    high_severity: int
