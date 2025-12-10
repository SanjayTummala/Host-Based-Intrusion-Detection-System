import React from "react";
import MetricsCards from "../components/MetricsCards";
import AlertsTable from "../components/AlertsTable";
import "./AttackSimulationSection.css";

function AttackSimulationSection({
  liveAlerts,
  metrics,
  loading,
  onSimulate,
  simulateDisabled,
}) {
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
        <AlertsTable alerts={liveAlerts} loading={loading} />
      </div>
    </div>
  );
}

export default AttackSimulationSection;
