// src/sections/CollectedLogsSection.jsx
import React from "react";
import AlertsTable from "../components/AlertsTable.jsx";

function CollectedLogsSection({ logs, onClearLogs }) {
  return (
    <div className="panel">
      <h2 className="panel-title">Collected Logs</h2>
      <p className="panel-subtitle">
        Every attack run executed in this browser is saved here as a separate
        log. Use it to review previous alerts.
      </p>

      {(!logs || logs.length === 0) && (
        <p className="empty-text">
          No runs recorded yet. Trigger an attack from the Attack Lab to
          populate this view.
        </p>
      )}

      {logs && logs.length > 0 && (
        <>
          <div className="logs-header-row">
            <span className="logs-count">Runs stored: {logs.length}</span>
            <button className="secondary-btn" onClick={onClearLogs}>
              Clear all logs
            </button>
          </div>

          {logs.map((run) => (
            <div key={run.id} className="log-run">
              <div className="log-run-header">
                <span className="log-run-title">
                  Attack run –{" "}
                  {new Date(run.timestamp).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
                <span className="log-run-count">
                  {run.alerts.length} alerts
                </span>
              </div>
              <AlertsTable alerts={run.alerts} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CollectedLogsSection;
