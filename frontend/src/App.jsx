// src/App.jsx
import React, { useEffect, useState } from "react";
import AttackSimulationSection from "./sections/AttackSimulationSection.jsx";
import CollectedLogsSection from "./sections/CollectedLogsSection.jsx";
import AnimatedHidsSection from "./sections/AnimatedHidsSection.jsx";

const LOCAL_STORAGE_KEY = "hids_collected_logs";

function App() {
  const [activeSection, setActiveSection] = useState("attack");
  const [currentAlerts, setCurrentAlerts] = useState([]);
  const [collectedLogs, setCollectedLogs] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCollectedLogs(parsed);
      }
    } catch {
      setCollectedLogs([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(collectedLogs)
      );
    } catch {
      // ignore
    }
  }, [collectedLogs]);

  const handleAttackRun = (alertsFromRun) => {
    const runEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      alerts: alertsFromRun || [],
    };

    setCurrentAlerts(alertsFromRun || []);
    setCollectedLogs((prev) => [runEntry, ...prev].slice(0, 20));
  };

  const handleClearLogs = () => {
    setCollectedLogs([]);
    setCurrentAlerts([]);
    try {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const renderSection = () => {
    if (activeSection === "attack") {
      return (
        <AttackSimulationSection
          onAttackRun={handleAttackRun}
          liveAlerts={currentAlerts}
        />
      );
    }
    if (activeSection === "logs") {
      return (
        <CollectedLogsSection
          logs={collectedLogs}
          onClearLogs={handleClearLogs}
        />
      );
    }
    return <AnimatedHidsSection />;
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">
          Host-Based Intrusion Detection System (HIDS) Dashboard
        </h1>
        <p className="app-subtitle">
          Simulate host attacks, inspect generated alerts, and explore how a
          HIDS pipeline works – built as a portfolio project.
        </p>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <button
            className={
              activeSection === "attack" ? "nav-btn nav-btn-active" : "nav-btn"
            }
            onClick={() => setActiveSection("attack")}
          >
            Attack Lab
          </button>
          <button
            className={
              activeSection === "logs" ? "nav-btn nav-btn-active" : "nav-btn"
            }
            onClick={() => setActiveSection("logs")}
          >
            Collected Logs
          </button>
          <button
            className={
              activeSection === "animated"
                ? "nav-btn nav-btn-active"
                : "nav-btn"
            }
            onClick={() => setActiveSection("animated")}
          >
            HIDS Flow (Animated)
          </button>
        </aside>

        <main className="main-panel">{renderSection()}</main>
      </div>
    </div>
  );
}

export default App;
