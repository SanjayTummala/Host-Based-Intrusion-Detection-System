import React from "react";
import "./SavedLogsSection.css";

function SavedLogsSection({ savedLogs }) {
  const hasLogs = savedLogs && savedLogs.length > 0;

  const renderSeverityPill = (severity) => {
    const sev = severity?.toLowerCase() || "";
    return (
      <span className={`sev-pill sev-${sev}`}>
        {severity}
      </span>
    );
  };

  return (
    <div className="logs-section">
      <div className="logs-section-header">
        <h2>Saved HIDS Logs</h2>
        <p>
          Snapshot of logs captured before the last simulation run. Severities
          are categorized as Low, Medium, or High to help you quickly scan
          historical activity.
        </p>
      </div>

      <div className="logs-table-wrapper">
        {hasLogs ? (
          <table className="logs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Event</th>
                <th>Severity</th>
                <th>Score</th>
                <th>Description</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {savedLogs.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.id}</td>
                  <td>{alert.event_type}</td>
                  <td>{renderSeverityPill(alert.severity)}</td>
                  <td>{alert.score}</td>
                  <td>{alert.description}</td>
                  <td>{new Date(alert.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="logs-empty">
            No saved logs yet. Run <strong>Simulate Attack</strong> at least once
            to capture a snapshot, then come back to this section.
          </p>
        )}
      </div>

      <p className="logs-footnote">
        Logs are persisted in the HIDS backend database and this view shows a
        snapshot from the state just before your latest attack simulation.
      </p>
    </div>
  );
}

export default SavedLogsSection;
