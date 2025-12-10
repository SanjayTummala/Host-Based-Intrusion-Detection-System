import React from "react";
import "./MetricsCards.css";

function MetricsCards({ metrics, loading }) {
  if (loading && !metrics) {
    return <p>Loading metrics...</p>;
  }

  if (!metrics) {
    return <p>No metrics available.</p>;
  }

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <h3>Total Events</h3>
        <p>{metrics.total_events}</p>
      </div>
      <div className="metric-card">
        <h3>Total Alerts</h3>
        <p>{metrics.total_alerts}</p>
      </div>
      <div className="metric-card">
        <h3>High Severity</h3>
        <p>{metrics.high_severity}</p>
      </div>
    </div>
  );
}

export default MetricsCards;
