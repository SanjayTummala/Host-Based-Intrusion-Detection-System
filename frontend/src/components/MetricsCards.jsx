// src/components/MetricsCards.jsx
import React from "react";

function MetricsCards({ metrics }) {
  if (!metrics) return null;

  const cards = [
    {
      label: "Total Events",
      value: metrics.total_events,
    },
    {
      label: "Total Alerts",
      value: metrics.total_alerts,
    },
    {
      label: "High Severity Alerts",
      value: metrics.high_severity,
    },
  ];

  return (
    <div className="metrics-grid">
      {cards.map((c) => (
        <div key={c.label} className="metric-card">
          <div className="metric-label">{c.label}</div>
          <div className="metric-value">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;
