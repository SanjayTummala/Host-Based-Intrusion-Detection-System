import React, { useEffect, useState } from "react";
import { fetchAlerts, fetchMetrics } from "../api/client";
import MetricsCards from "../components/MetricsCards";
import AlertsTable from "../components/AlertsTable";

function DashboardSection() {
  const [alerts, setAlerts] = useState([]);
  const [metrics, setMetrics] = useState(null);

  const loadData = async () => {
    try {
      const [alertsData, metricsData] = await Promise.all([
        fetchAlerts(),
        fetchMetrics(),
      ]);
      setAlerts(alertsData);
      setMetrics(metricsData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  useEffect(() => {
    loadData();
    const id = setInterval(loadData, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="dashboard" className="section">
      <h2>Host-based Intrusion Detection System (HIDS)</h2>
      <p className="section-subtitle">Live alerts detected by ML.</p>
      {metrics && <MetricsCards metrics={metrics} />}
      <AlertsTable alerts={alerts} />
    </section>
  );
}

export default DashboardSection;
