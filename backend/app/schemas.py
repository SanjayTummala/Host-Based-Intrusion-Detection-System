from datetime import datetime
from pydantic import BaseModel


class AlertBase(BaseModel):
    event_type: str
    severity: str
    score: float
    description: str


class AlertCreate(AlertBase):
    pass


class Alert(AlertBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True


class Metrics(BaseModel):
    total_events: int
    total_alerts: int
    high_severity: int
