import React, { useEffect, useState } from "react";
import { fetchAlerts, fetchMetrics, startAttack } from "./api/client";
import AttackSimulationSection from "./sections/AttackSimulationSection";
import SavedLogsSection from "./sections/SavedLogsSection";
import AnimatedHidsSection from "./sections/AnimatedHidsSection";
import "./App.css";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [previousAlerts, setPreviousAlerts] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attackLoading, setAttackLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("attack"); // "attack" | "logs" | "animation"

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      // Save current alerts as "previous logs" before updating
      if (alerts && alerts.length > 0) {
        setPreviousAlerts(alerts);
      }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSimulateAttack() {
    try {
      setAttackLoading(true);
      setError("");

      // Store current alerts as previous before simulating new batch
      if (alerts && alerts.length > 0) {
        setPreviousAlerts(alerts);
      }

      await startAttack();
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to simulate attack");
    } finally {
      setAttackLoading(false);
    }
  }

  const hasHighSeverity = metrics && metrics.high_severity > 0;

  return (
    <div className="app-root">
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">HIDS</div>
          <div className="sidebar-subtitle">Host-Based IDS</div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${
              activeSection === "attack" ? "active" : ""
            }`}
            onClick={() => setActiveSection("attack")}
          >
            <span className="sidebar-nav-dot" />
            Attack Simulation
          </button>

          <button
            className={`sidebar-nav-item ${
              activeSection === "logs" ? "active" : ""
            }`}
            onClick={() => setActiveSection("logs")}
          >
            <span className="sidebar-nav-dot" />
            Saved Logs
          </button>

          <button
            className={`sidebar-nav-item ${
              activeSection === "animation" ? "active" : ""
            }`}
            onClick={() => setActiveSection("animation")}
          >
            <span className="sidebar-nav-dot" />
            HIDS Animation
          </button>
        </nav>

        <div className="sidebar-footer">
          {metrics && (
            <div className="sidebar-metrics">
              <div className="sidebar-metric">
                <span className="label">Events</span>
                <span className="value">{metrics.total_events}</span>
              </div>
              <div className="sidebar-metric">
                <span className="label">Alerts</span>
                <span className="value">{metrics.total_alerts}</span>
              </div>
              <div className="sidebar-metric">
                <span className="label">High Sev</span>
                <span className={`value ${hasHighSeverity ? "danger" : ""}`}>
                  {metrics.high_severity}
                </span>
              </div>
            </div>
          )}
          <div className="sidebar-status">
            <span className="status-dot" />
            Backend connected
          </div>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <div>
            <h1>Host-Based Intrusion Detection System</h1>
            <p>Real-time attack simulation, log history, and animated topology.</p>
          </div>
          <div className="header-actions">
            <button
              className="btn secondary"
              onClick={loadData}
              disabled={loading || attackLoading}
            >
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
            <button
              className="btn primary"
              onClick={handleSimulateAttack}
              disabled={attackLoading || loading}
            >
              {attackLoading ? "Simulating..." : "Simulate Attack"}
            </button>
          </div>
        </header>

        {error && <div className="error-banner">{error}</div>}

        <section className="app-section">
          {activeSection === "attack" && (
            <AttackSimulationSection
              alerts={alerts}
              metrics={metrics}
              loading={loading}
            />
          )}

          {activeSection === "logs" && (
            <SavedLogsSection
              currentAlerts={alerts}
              previousAlerts={previousAlerts}
            />
          )}

          {activeSection === "animation" && (
            <AnimatedHidsSection
              hasAlerts={alerts && alerts.length > 0}
              hasHighSeverity={hasHighSeverity}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
