from datetime import datetime
from random import choice
from sqlalchemy.orm import Session
from . import models, ml_model


EVENT_TYPES = [
    "brute_force_login",
    "unauthorized_file_access",
    "privilege_escalation",
    "suspicious_process",
    "suspicious_network_outbound",
]

SEVERITY_WEIGHTS = [
    ("Low", 0.6),
    ("Medium", 0.35),
    ("High", 0.05),
]


def pick_severity() -> str:
    from random import random

    r = random()
    cumulative = 0.0
    for sev, w in SEVERITY_WEIGHTS:
        cumulative += w
        if r <= cumulative:
            return sev
    return "Low"


def simulate_attack_batch(db: Session, n: int = 20) -> int:
    created = 0
    for _ in range(n):
        event_type = choice(EVENT_TYPES)
        severity = pick_severity()
        score = ml_model.compute_score(event_type, severity)

        desc_map = {
            "brute_force_login": "Detected brute force login on host.",
            "unauthorized_file_access": "Detected unauthorized file access on host.",
            "privilege_escalation": "Detected privilege escalation on host.",
            "suspicious_process": "Detected suspicious process on host.",
            "suspicious_network_outbound": "Detected suspicious network outbound on host.",
        }
        description = desc_map.get(event_type, "Detected suspicious activity on host.")

        alert = models.Alert(
            event_type=event_type,
            severity=severity,
            score=score,
            description=description,
            timestamp=datetime.utcnow(),
        )
        db.add(alert)
        created += 1

    db.commit()
    return created
