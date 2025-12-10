import React from "react";
import MetricsCards from "../components/MetricsCards";
import AlertsTable from "../components/AlertsTable";
import "./AttackSimulationSection.css";

function AttackSimulationSection({ alerts, metrics, loading }) {
  return (
    <div className="attack-section">
      <div className="attack-section-header">
        <h2>Attack Simulation Dashboard</h2>
        <p>
          Run synthetic attacks on your host and watch alerts and metrics update
          in real time.
        </p>
      </div>

      <MetricsCards metrics={metrics} loading={loading} />

      <div className="attack-section-table">
        <h3>Live Alerts</h3>
        <AlertsTable alerts={alerts} loading={loading} />
      </div>
    </div>
  );
}

export default AttackSimulationSection;
