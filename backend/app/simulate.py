# backend/app/simulate.py
from datetime import datetime
import random
from typing import List, Tuple

from sqlalchemy.orm import Session

from .ml_model import hids_model
from .models import Alert

EVENT_TYPES = [
    "unauthorized_file_access",
    "suspicious_process",
    "brute_force_login",
    "privilege_escalation",
    "suspicious_network_outbound",
]


def _random_host_features() -> Tuple[float, float, float]:
    """Generate fake host metrics (cpu, disk_ops, net_out)."""
    cpu = random.uniform(10.0, 95.0)
    disk_ops = random.uniform(50.0, 800.0)
    net_out = random.uniform(10.0, 400.0)
    return cpu, disk_ops, net_out


def _severity_from_score(score: float) -> str:
    if score >= 0.9:
        return "High"
    if score >= 0.5:
        return "Medium"
    return "Low"


def simulate_attack(db: Session, num_events: int = 15) -> List[Alert]:
    """Generate synthetic events and save anomalies as alerts."""
    created_alerts: List[Alert] = []

    for _ in range(num_events):
        event_type = random.choice(EVENT_TYPES)
        cpu, disk_ops, net_out = _random_host_features()

        score, is_malicious = hids_model.score_event(cpu, disk_ops, net_out)
        if not is_malicious:
            continue

        severity = _severity_from_score(score)
        description = f"Detected {event_type.replace('_', ' ')} on host."

        alert = Alert(
            event_type=event_type,
            severity=severity,
            score=round(float(score), 3),
            description=description,
            timestamp=datetime.utcnow(),
        )

        db.add(alert)
        created_alerts.append(alert)

    db.commit()
    for alert in created_alerts:
        db.refresh(alert)

    return created_alerts
