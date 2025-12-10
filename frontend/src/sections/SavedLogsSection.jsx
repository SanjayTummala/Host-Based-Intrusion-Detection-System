import React from "react";
import "./SavedLogsSection.css";

function SavedLogsSection({ currentAlerts, previousAlerts }) {
  const hasPrev = previousAlerts && previousAlerts.length > 0;
  const hasCurrent = currentAlerts && currentAlerts.length > 0;

  return (
    <div className="logs-section">
      <div className="logs-section-header">
        <h2>Saved HIDS Logs</h2>
        <p>
          Compare the previous run with the current state of your intrusion
          detection system. Logs are persisted in the backend database and
          visualized here.
        </p>
      </div>

      <div className="logs-grid">
        <div className="logs-column">
          <div className="logs-column-header">
            <h3>Previous Run</h3>
            <span className="badge">
              {hasPrev ? previousAlerts.length : 0} entries
            </span>
          </div>
          <div className="logs-table-wrapper">
            {hasPrev ? (
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Event</th>
                    <th>Severity</th>
                    <th>Score</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {previousAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.id}</td>
                      <td>{alert.event_type}</td>
                      <td>{alert.severity}</td>
                      <td>{alert.score}</td>
                      <td>
                        {new Date(alert.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="logs-empty">
                No previous run captured yet. Run a simulation or refresh to
                take a snapshot.
              </p>
            )}
          </div>
        </div>

        <div className="logs-column">
          <div className="logs-column-header">
            <h3>Current Run</h3>
            <span className="badge">
              {hasCurrent ? currentAlerts.length : 0} entries
            </span>
          </div>
          <div className="logs-table-wrapper">
            {hasCurrent ? (
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Event</th>
                    <th>Severity</th>
                    <th>Score</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.id}</td>
                      <td>{alert.event_type}</td>
                      <td>{alert.severity}</td>
                      <td>{alert.score}</td>
                      <td>
                        {new Date(alert.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="logs-empty">
                No current alerts loaded. Trigger an attack or refresh data.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="logs-footnote">
        Note: Logs are stored in the HIDS backend database (SQLite on Render).
        This view keeps an in-memory snapshot of the previous vs current state
        to help you compare runs quickly.
      </p>
    </div>
  );
}

export default SavedLogsSection;
