# backend/app/ml_model.py
from typing import Tuple

import numpy as np
from sklearn.ensemble import IsolationForest


class HidsModel:
    """Tiny anomaly detector for the demo dashboard.

    We train an IsolationForest on fake 'normal' host metrics:
    - CPU usage (%)
    - Disk operations per second
    - Network egress (KB/s)
    """

    def __init__(self) -> None:
        normal_data = np.random.normal(
            loc=[30.0, 200.0, 50.0],   # mean for cpu, disk_ops, net_out
            scale=[10.0, 80.0, 30.0], # std deviation
            size=(500, 3),
        )

        self.model = IsolationForest(
            contamination=0.05,
            n_estimators=100,
            random_state=42,
        )
        self.model.fit(normal_data)

    def score_event(self, cpu: float, disk_ops: float, net_out: float) -> Tuple[float, bool]:
        """Return (anomaly_score, is_malicious)."""
        x = np.array([[cpu, disk_ops, net_out]], dtype=float)
        raw = float(self.model.decision_function(x)[0])
        score = -raw  # higher = more anomalous
        is_malicious = raw < 0.0
        return score, bool(is_malicious)


hids_model = HidsModel()
