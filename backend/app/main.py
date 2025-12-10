# backend/app/main.py
from typing import Generator, List

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, SessionLocal, engine
from .models import Alert
from .schemas import AlertOut, MetricsOut
from .simulate import simulate_attack

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HIDS Backend")

ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://sanjaytummala.github.io",
    "https://sanjaytummala.github.io/Host-Based-Intrusion-Detection-System",
    "https://host-based-intrusion-detection-system.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", tags=["health"])
def healthcheck() -> dict:
    return {"status": "ok", "message": "HIDS backend is running"}


@app.get("/alerts", response_model=List[AlertOut])
def get_alerts(db: Session = Depends(get_db)) -> List[Alert]:
    alerts = (
        db.query(Alert)
        .order_by(Alert.timestamp.desc())
        .limit(500)
        .all()
    )
    return alerts


@app.get("/metrics", response_model=MetricsOut)
def get_metrics(db: Session = Depends(get_db)) -> MetricsOut:
    total_alerts = db.query(Alert).count()
    high_severity = db.query(Alert).filter(Alert.severity == "High").count()
    return MetricsOut(
        total_events=total_alerts,
        total_alerts=total_alerts,
        high_severity=high_severity,
    )


@app.post("/simulate_attack", response_model=List[AlertOut])
def start_attack(db: Session = Depends(get_db)) -> List[Alert]:
    created_alerts = simulate_attack(db, num_events=15)
    return created_alerts
