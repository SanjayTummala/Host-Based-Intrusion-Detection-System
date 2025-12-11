import React, { useState } from "react";
import "./AnimatedHidsSection.css";

const HOSTS = [
  { id: "A", name: "User A", desc: "HR workstation", emoji: "👩‍💻" },
  { id: "B", name: "User B", desc: "Finance workstation", emoji: "👨‍💻" },
  { id: "C", name: "User C", desc: "Remote employee", emoji: "🧑‍💻" },
];

export default function AnimatedHidsSection({
  hasAlerts = false,
  hasHighSeverity = false,
}) {
  const [view, setView] = useState("aggregate"); // "aggregate" | "host"

  const statusText = hasHighSeverity
    ? "High severity alerts detected"
    : hasAlerts
    ? "Active alerts detected"
    : "Monitoring organization in real time";

  const statusClass = hasHighSeverity
    ? "status-chip danger"
    : hasAlerts
    ? "status-chip active"
    : "status-chip normal";

  return (
    <div className="hids-section">
      <div className="hids-header-row">
        <div>
          <h2 className="hids-title">Host-Based Intrusion Detection System</h2>
          <p className="hids-sub">
            Visual flow showing how traffic enters the org, how host agents
            detect anomalies locally, and how telemetry is aggregated to the
            central collector and admin console.
          </p>
        </div>

        <div className="right-controls">
          <div className="view-toggle" role="tablist" aria-label="View toggle">
            <button
              className={view === "aggregate" ? "toggle-btn active" : "toggle-btn"}
              onClick={() => setView("aggregate")}
              aria-pressed={view === "aggregate"}
            >
              Aggregate
            </button>
            <button
              className={view === "host" ? "toggle-btn active" : "toggle-btn"}
              onClick={() => setView("host")}
              aria-pressed={view === "host"}
            >
              Host
            </button>
          </div>

          <div className={`${statusClass} status-text`}>{statusText}</div>
        </div>
      </div>

      <div className="hids-flow diagonal-layout">
        {/* Stage 1: Attacker */}
        <div className="flow-stage stage-attacker">
          <div className="hids-card attacker-card">
            <div className="card-top">
              <div className="hids-avatar hids-avatar-attacker">👨‍💻</div>
              <div>
                <div className="hids-card-title">External Attacker</div>
                <div className="hids-card-subtitle">Sends malicious traffic</div>
              </div>
            </div>

            <ul className="hids-card-list short">
              <li>Probing / brute-force attempts</li>
              <li>Exploit & lateral movement attempts</li>
            </ul>
          </div>

          <div className="flow-step-label">1. Attack originates</div>
        </div>

        {/* Connector 1: Attacker -> Hosts (curved L→R) */}
        <div className="flow-connector connector-arc-wrap">
          <div
            className={
              "connector-path connector-arc " + (hasAlerts ? "connector-alert" : "connector-normal")
            }
            aria-hidden="true"
          >
            <span
              className={
                "connector-packet " +
                (hasAlerts ? "packet-alert" : "packet-normal") +
                (hasHighSeverity ? " packet-fast" : "")
              }
            />
          </div>
          <div className="connector-label">Traffic entering network</div>
        </div>

        {/* Stage 2: Organization (shifted right) */}
        <div className="flow-stage flow-stage-org">
          <div className="hids-card hosts-card">
            <div className="hosts-row">
              {HOSTS.map((h) => (
                <div key={h.id} className="hids-node-small node-with-agent" role="group" aria-label={h.name}>
                  <div className="hids-node-icon" aria-hidden="true">{h.emoji}</div>
                  <div className="hids-node-title">{h.name}</div>
                  <div className="hids-node-subtitle">{h.desc}</div>

                  {/* Agent badge (always shown) */}
                  <div className="agent-badge" title="HIDS agent running" aria-hidden="true">
                    🛡️
                  </div>

                  {/* Host → collector telemetry packet (only in host view or when alerts exist) */}
                  {(view === "host" || hasAlerts) && (
                    <div className={"agent-to-collector " + (hasAlerts ? "agent-active" : "")}>
                      <span className={"agent-packet " + (hasHighSeverity ? "fast" : "")} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hosts-row servers-row">
              <div className="hids-node-small">
                <div className="hids-node-icon">🖥️</div>
                <div className="hids-node-title">App Server</div>
                <div className="hids-node-subtitle">Business logic</div>
              </div>
              <div className="hids-node-small">
                <div className="hids-node-icon">💾</div>
                <div className="hids-node-title">DB Server</div>
                <div className="hids-node-subtitle">Critical data</div>
              </div>
            </div>
          </div>

          <div className="flow-step-label">2. Hosts & servers observe traffic</div>
        </div>

        {/* Connector 2: Hosts -> HIDS collector (curved R→L) */}
        <div className="flow-connector connector-arc-wrap">
          <div
            className={"connector-path connector-arc connector-arc-reverse connector-telemetry"}
            aria-hidden="true"
          >
            <span
              className={
                "connector-packet packet-telemetry " +
                ((view === "host" || hasAlerts) ? "packet-bright" : "")
              }
            />
          </div>
          <div className="connector-label">Host logs & telemetry → collector</div>
        </div>

        {/* Stage 3: Collector + Admin (down-right shift) */}
        <div className="flow-stage flow-stage-hids">
          <div className="hids-card hids-core-card">
            <div className="card-top">
              <div className="hids-node-small hids-core-node">
                <div className="hids-node-icon hids-core-icon">🛡️</div>
                <div className="hids-node-title">HIDS Collector</div>
                <div className="hids-node-subtitle">Aggregates host telemetry</div>
                <div className={"hids-core-pulse " + (hasHighSeverity ? "danger" : hasAlerts ? "active" : "normal")} />
              </div>

              <div className="hids-node-small admin-node">
                <div className="hids-node-icon">🧑‍💼</div>
                <div className="hids-node-title">Security Admin</div>
                <div className="hids-node-subtitle">Investigates alerts</div>

                <div className="mini-dashboard">
                  <div className="mini-bar-row">
                    <div className="mini-bar-label">Normal</div>
                    <div className="mini-bar-track"><div className="mini-bar-fill normal" /></div>
                  </div>
                  <div className="mini-bar-row">
                    <div className="mini-bar-label">Suspicious</div>
                    <div className="mini-bar-track"><div className="mini-bar-fill active" /></div>
                  </div>
                  <div className="mini-bar-row">
                    <div className="mini-bar-label">Critical</div>
                    <div className="mini-bar-track"><div className={"mini-bar-fill danger " + (hasHighSeverity ? "pulse" : "")} /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-telemetry">
              <div className="admin-telemetry-label">Alerts forwarded to console</div>
              <div className="admin-telemetry-line">
                <span className={"admin-telemetry-packet " + ((hasAlerts || hasHighSeverity) ? "bright" : "")} />
              </div>
            </div>
          </div>

          <div className="flow-step-label">3. Collector analyzes & notifies admin</div>
        </div>
      </div>

      <div className="hids-legend" role="list">
        <div className="legend-item" role="listitem"><span className="legend-dot legend-normal" /> Attacker traffic</div>
        <div className="legend-item" role="listitem"><span className="legend-dot legend-telemetry" /> Host telemetry</div>
        <div className="legend-item" role="listitem"><span className="legend-dot legend-danger" /> Malicious / high severity</div>
      </div>
    </div>
  );
}
