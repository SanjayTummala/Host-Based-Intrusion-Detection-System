import React, { useEffect, useState } from "react";
import { fetchAlerts, fetchMetrics, startAttack } from "./api/client";
import AttackSimulationSection from "./sections/AttackSimulationSection";
import SavedLogsSection from "./sections/SavedLogsSection";
import AnimatedHidsSection from "./sections/AnimatedHidsSection";
import "./App.css";

function App() {
  const [allAlerts, setAllAlerts] = useState([]);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [savedLogs, setSavedLogs] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attackLoading, setAttackLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("attack"); // "attack" | "logs" | "animation"
  const [baselineMaxId, setBaselineMaxId] = useState(null); // alerts before last simulation

  // Helper: compute max id from a list
  function getMaxId(alerts) {
    if (!alerts || alerts.length === 0) return 0;
    return alerts.reduce((max, a) => (a.id > max ? a.id : max), 0);
  }

  async function loadData({ resetBaseline = false } = {}) {
    try {
      setLoading(true);
      setError("");

      const [alertsData, metricsData] = await Promise.all([
        fetchAlerts(),
        fetchMetrics(),
      ]);

      setAllAlerts(alertsData);
      setMetrics(metricsData);

      if (baselineMaxId === null || resetBaseline) {
        // First load or reset: treat existing DB as baseline (no live alerts)
        const maxId = getMaxId(alertsData);
        setBaselineMaxId(maxId);
        setLiveAlerts([]);
      } else {
        // Only show alerts created after the last simulation baseline
        const live = alertsData.filter((a) => a.id > baselineMaxId);
        setLiveAlerts(live);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load data from backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // On first load, we mark current alerts as baseline
    loadData({ resetBaseline: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSimulateAttack() {
    try {
      setAttackLoading(true);
      setError("");

      // Save current alerts snapshot as "Saved Logs"
      if (allAlerts && allAlerts.length > 0) {
        setSavedLogs(allAlerts);
        setBaselineMaxId(getMaxId(allAlerts));
      }

      await startAttack();
      // After simulation, fetch new alerts with baseline set from before simulation
      await loadData({ resetBaseline: false });
    } catch (err) {
      console.error(err);
      setError("Failed to simulate attack");
    } finally {
      setAttackLoading(false);
    }
  }

  const hasHighSeverity = metrics && metrics.high_severity > 0;

  return (
    <div className="page-root">
      {/* Full-width title bar */}
      <header className="page-header">
        <h1>Host-Based Intrusion Detection System</h1>
      </header>

      {/* Layout: sidebar + main */}
      <div className="app-root">
        <aside className="app-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">🛡️</div>
            <div className="sidebar-subtitle">HIDS Sections</div>
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
                  <span
                    className={`value ${hasHighSeverity ? "danger" : ""}`}
                  >
                    {metrics.high_severity}
                  </span>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main className="app-main">
          {/* Section content */}
          {error && <div className="error-banner">{error}</div>}

          <section className="app-section">
            {activeSection === "attack" && (
              <AttackSimulationSection
                liveAlerts={liveAlerts}
                metrics={metrics}
                loading={loading || attackLoading}
                onSimulate={handleSimulateAttack}
                simulateDisabled={attackLoading || loading}
              />
            )}

            {activeSection === "logs" && (
              <SavedLogsSection savedLogs={savedLogs} />
            )}

            {activeSection === "animation" && (
              <AnimatedHidsSection
                hasAlerts={allAlerts && allAlerts.length > 0}
                hasHighSeverity={hasHighSeverity}
              />
            )}
          </section>
        </main>
      </div>

      {/* Full-width footer */}
      <footer className="page-footer">
        <span>Developed by Sanjay Kumar</span>
      </footer>
    </div>
  );
}

export default App;
