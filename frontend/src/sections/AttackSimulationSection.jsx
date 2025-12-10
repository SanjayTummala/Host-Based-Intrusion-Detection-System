// src/sections/AttackSimulationSection.jsx
import React, { useEffect, useState } from "react";
import { fetchMetrics, startAttack } from "../api/client.js";
import MetricsCards from "../components/MetricsCards.jsx";
import AlertsTable from "../components/AlertsTable.jsx";

function AttackSimulationSection({ onAttackRun, liveAlerts }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const loadMetrics = async () => {
    try {
      const data = await fetchMetrics();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to load metrics", err);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const handleAttackClick = async () => {
    setLoading(true);
    setToast(null);
    try {
      const alerts = await startAttack();
      onAttackRun(alerts);
      setToast({
        type: "success",
        message: `Attack simulation complete – generated ${alerts.length} alerts.`,
      });
      loadMetrics();
    } catch (err) {
      console.error("Attack simulation failed", err);
      setToast({
        type: "error",
        message: "Attack simulation failed. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  return (
    <div className="panel">
      <h2 className="panel-title">Attack Laboratory</h2>
      <p className="panel-subtitle">
        Launch a synthetic attack sequence. The backend ML model scores each
        event and turns anomalies into alerts that show up live below.
      </p>

      {metrics && (
        <section>
          <h3 className="panel-subheading">Current Metrics</h3>
          <MetricsCards metrics={metrics} />
        </section>
      )}

      <div className="actions-row">
        <button
          className="primary-btn"
          onClick={handleAttackClick}
          disabled={loading}
        >
          {loading ? "Running attack..." : "Start Attack"}
        </button>
      </div>

      {toast && (
        <div
          className={
            toast.type === "error" ? "toast toast-error" : "toast toast-success"
          }
        >
          {toast.message}
        </div>
      )}

      <h3 className="panel-subheading">Live Alerts</h3>
      <AlertsTable alerts={liveAlerts} />
    </div>
  );
}

export default AttackSimulationSection;
