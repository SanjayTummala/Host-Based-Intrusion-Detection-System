import React from "react";
import MetricsCards from "../components/MetricsCards";
import "./AttackSimulationSection.css";
import "./SavedLogsSection.css"; // reuse logs table styles & severity pills

function AttackSimulationSection({
  liveAlerts,
  metrics,
  loading,
  onSimulate,
  simulateDisabled,
}) {
  const hasLiveAlerts = liveAlerts && liveAlerts.length > 0;

  const renderSeverityPill = (severity) => {
    const sev = severity?.toLowerCase() || "";
    return <span className={`sev-pill sev-${sev}`}>{severity}</span>;
  };

  return (
    <div className="attack-section">
      <div className="attack-section-header">
        <h2>Attack Simulation</h2>
        <p>
          Trigger simulated attacks on the host and watch new alerts appear
          live in the dashboard.
        </p>
      </div>

      <div className="attack-controls-row">
        <button
          className="btn primary"
          onClick={onSimulate}
          disabled={simulateDisabled}
        >
          {simulateDisabled ? "Simulating..." : "Simulate Attack"}
        </button>
      </div>

      <MetricsCards metrics={metrics} loading={loading} />

      <div className="attack-section-table">
        <div className="attack-section-table-header">
          <h3>Live Alerts</h3>
          <span className="attack-hint">
            Showing alerts generated after the last{" "}
            <strong>Simulate Attack</strong>.
          </span>
        </div>

        <div className="logs-table-wrapper">
          {loading ? (
            <p className="logs-empty">Loading live alerts…</p>
          ) : hasLiveAlerts ? (
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
                {liveAlerts.map((alert) => (
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
              No live alerts yet. Click <strong>Simulate Attack</strong> to
              generate alerts.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttackSimulationSection;
