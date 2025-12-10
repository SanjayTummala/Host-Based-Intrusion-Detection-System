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
        // First load or explicit reset: use current state as baseline,
        // so no "live alerts" yet
        const maxId = getMaxId(alertsData);
        setBaselineMaxId(maxId);
        setLiveAlerts([]);
      } else {
        // Show only alerts created after baseline
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
    // On first load, treat existing DB alerts as baseline
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
      // After simulation, fetch new alerts, keep baseline from before simulation
      await loadData({ resetBaseline: false });
    } catch (err) {
      console.error(err);
      setError("Failed to simulate attack");
    } finally {
      setAttackLoading(false);
    }
  }

  async function handleRefresh() {
    await loadData({ resetBaseline: false });
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
            <p>Splunk-style dashboard for host-level attack detection.</p>
          </div>
          <div className="header-actions">
            <button
              className="btn secondary"
              onClick={handleRefresh}
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
              liveAlerts={liveAlerts}
              metrics={metrics}
              loading={loading}
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

        <footer className="app-footer">
          Developed by <span className="app-footer-name">Sanjay Kumar</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
