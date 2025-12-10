// src/components/AlertsTable.jsx
import React from "react";

function AlertsTable({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return <p className="empty-text">No alerts available.</p>;
  }

  const severityClass = (severity) => {
    if (severity === "High") return "severity-badge severity-high";
    if (severity === "Medium") return "severity-badge severity-medium";
    return "severity-badge severity-low";
  };

  return (
    <div className="table-wrapper">
      <table className="alerts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Severity</th>
            <th>Score</th>
            <th>Description</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{(a.event_type || "").split("_").join(" ")}</td>
              <td>
                <span className={severityClass(a.severity)}>{a.severity}</span>
              </td>
              <td>{Number(a.score).toFixed(3)}</td>
              <td>{a.description}</td>
              <td>{new Date(a.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertsTable;
