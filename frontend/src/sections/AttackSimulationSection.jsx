import React from "react";
import MetricsCards from "../components/MetricsCards";
import AlertsTable from "../components/AlertsTable";
import "./AttackSimulationSection.css";

function AttackSimulationSection({ liveAlerts, metrics, loading }) {
  return (
    <div className="attack-section">
      <div className="attack-section-header">
        <h2>Attack Simulation Dashboard</h2>
        <p>
          Launch simulated attacks and monitor new alerts generated in real time.
          Live alerts below show only events created after the last simulation.
        </p>
      </div>

      <MetricsCards metrics={metrics} loading={loading} />

      <div className="attack-section-table">
        <div className="attack-section-table-header">
          <h3>Live Alerts</h3>
          <span className="attack-hint">
            Showing alerts generated after the last <strong>Simulate Attack</strong>.
          </span>
        </div>
        <AlertsTable alerts={liveAlerts} loading={loading} />
      </div>
    </div>
  );
}

export default AttackSimulationSection;
