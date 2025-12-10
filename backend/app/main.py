from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from . import models, schemas, simulate

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HIDS Backend",
    version="1.0.0",
)


# CORS – allow frontend (GitHub Pages + local dev)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://sanjaytummala.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "message": "HIDS backend is running"}


@app.get("/alerts", response_model=list[schemas.Alert])
def get_alerts(db: Session = Depends(get_db)):
    return db.query(models.Alert).order_by(models.Alert.id.desc()).all()


@app.get("/metrics", response_model=schemas.Metrics)
def get_metrics(db: Session = Depends(get_db)):
    total_alerts = db.query(models.Alert).count()
    high_severity = db.query(models.Alert).filter(models.Alert.severity == "High").count()
    return schemas.Metrics(
        total_events=total_alerts,
        total_alerts=total_alerts,
        high_severity=high_severity,
    )


@app.post("/simulate_attack")
def simulate_attack(db: Session = Depends(get_db)):
    created = simulate.simulate_attack_batch(db, n=20)
    return {"message": "Attack simulation generated alerts", "count": created}
