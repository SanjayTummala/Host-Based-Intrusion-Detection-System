from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from .database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, index=True)
    severity = Column(String, index=True)
    score = Column(Float)
    description = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
