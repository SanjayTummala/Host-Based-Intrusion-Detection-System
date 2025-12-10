import React, { useEffect, useState } from "react";
import { fetchAlerts, fetchMetrics, startAttack } from "./api/client";
import AlertsTable from "./components/AlertsTable";
import MetricsCards from "./components/MetricsCards";
import "./App.css";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attackLoading, setAttackLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");
      const [alertsData, metricsData] = await Promise.all([
        fetchAlerts(),
        fetchMetrics(),
      ]);
      setAlerts(alertsData);
      setMetrics(metricsData);
    } catch (err) {
      console.error(err);
      setError("Failed to load data from backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSimulateAttack() {
    try {
      setAttackLoading(true);
      setError("");
      await startAttack();
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to simulate attack");
    } finally {
      setAttackLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Host-Based Intrusion Detection System</h1>
        <p>Real-time alerts & metrics from your HIDS backend</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        <div className="controls">
          <button onClick={loadData} disabled={loading || attackLoading}>
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
          <button
            onClick={handleSimulateAttack}
            disabled={attackLoading || loading}
          >
            {attackLoading ? "Simulating..." : "Simulate Attack"}
          </button>
        </div>

        <MetricsCards metrics={metrics} loading={loading} />

        <section className="alerts-section">
          <h2>Alerts</h2>
          <AlertsTable alerts={alerts} loading={loading} />
        </section>
      </main>
    </div>
  );
}

export default App;
