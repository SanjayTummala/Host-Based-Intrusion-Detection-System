import React from "react";
import "./AlertsTable.css";

function AlertsTable({ alerts, loading }) {
  if (loading && (!alerts || alerts.length === 0)) {
    return <p>Loading alerts...</p>;
  }

  if (!alerts || alerts.length === 0) {
    return <p>No alerts found.</p>;
  }

  return (
    <table className="alerts-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Event Type</th>
          <th>Severity</th>
          <th>Score</th>
          <th>Description</th>
          <th>Timestamp (local)</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert) => (
          <tr
            key={alert.id}
            className={`severity-${alert.severity.toLowerCase()}`}
          >
            <td>{alert.id}</td>
            <td>{alert.event_type}</td>
            <td>{alert.severity}</td>
            <td>{alert.score}</td>
            <td>{alert.description}</td>
            <td>{new Date(alert.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AlertsTable;
