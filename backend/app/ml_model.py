from random import random


def compute_score(event_type: str, severity: str) -> float:
    base = {
        "brute_force_login": 0.18,
        "unauthorized_file_access": 0.16,
        "privilege_escalation": 0.19,
        "suspicious_process": 0.17,
        "suspicious_network_outbound": 0.17,
    }.get(event_type, 0.15)

    sev_factor = {
        "Low": 0.8,
        "Medium": 1.0,
        "High": 1.3,
    }.get(severity, 1.0)

    jitter = (random() - 0.5) * 0.05  # small randomness
    return round(max(0.0, min(1.0, base * sev_factor + jitter)), 3)
