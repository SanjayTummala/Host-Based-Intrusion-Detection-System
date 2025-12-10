# backend/app/models.py
from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String

from .database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, index=True, nullable=False)
    severity = Column(String, index=True, nullable=False)
    score = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
