import React from "react";
import "./AnimatedHidsSection.css";

export default function AnimatedHidsSection({ hasAlerts = false, hasHighSeverity = false }) {
  const streamState = hasHighSeverity ? "critical" : hasAlerts ? "suspicious" : "normal";

  const packets = [1, 2, 3].map((i) => (
    <span key={i} className={`stream-packet packet-${i} ${streamState}`} />
  ));

  const maliciousPackets = [1, 2].map((i) => (
    <span
      key={i}
      className={`malicious-packet m-${i} ${hasAlerts || hasHighSeverity ? "visible" : ""}`}
    />
  ));

  return (
    <section className="animated-hids-root">
      {/* HEADER */}
      <header className="hids-header">
        <div className="hids-header-left">
          <svg className="shield-svg" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#36d1dc" />
                <stop offset="1" stopColor="#5b86e5" />
              </linearGradient>
            </defs>
            <path
              d="M60 8 L96 22 V50 C96 78 78 100 60 111 C42 100 24 78 24 50 V22 Z"
              fill="url(#g1)"
              stroke="#042033"
              strokeWidth="2"
            />
            <text
              x="60"
              y="66"
              textAnchor="middle"
              fontSize="20"
              fontFamily="Verdana"
              fill="#021826"
              fontWeight="700"
            >
              HIDS
            </text>
          </svg>
        </div>

        <div className="hids-header-center">
          <h1 className="hids-title">Host-Based Intrusion Detection System</h1>
        </div>

        <div className="hids-header-right">
          <div className={`hids-status ${streamState}`}>
            {hasHighSeverity ? "High Severity" : hasAlerts ? "Active Alerts" : "Monitoring"}
          </div>
        </div>
      </header>

      {/* MAIN HORIZONTAL FLOW */}
      <div className="hids-flow-row">
        {/* STAGE 1 — ATTACKER */}
        <div className="stage">
          <div className="stage-card attacker-card">
            <div className="attacker-circle">
              <div className="attacker-emoji">👨‍💻</div>
            </div>
            <div className="stage-name">External Attacker</div>
            <div className="stage-small">Threat actor generating malicious traffic</div>
          </div>
        </div>

        {/* CONNECTOR 1 → 2 */}
        <div className="connector">
          <div className={`stream-line ${streamState}`}>{packets}</div>
        </div>

        {/* STAGE 2 — ORGANIZATION */}
        <div className="stage">
          <div className="stage-card org-card">
            <div className="stage-name">Organization Hosts</div>

            {/* USERS ROW */}
            <div className="org-row">
              <div className="org-node">
                <div className="node-icon">👩‍💻</div>
                <div className="node-label">User A</div>
              </div>
              <div className="org-node">
                <div className="node-icon">👨‍💻</div>
                <div className="node-label">User B</div>
              </div>
              <div className="org-node">
                <div className="node-icon">🧑‍💻</div>
                <div className="node-label">User C</div>
              </div>
            </div>

            {/* SERVERS ROW */}
            <div className="org-row servers-row">
              <div className="org-node server">
                <div className="node-icon">🖥️</div>
                <div className="node-label">App Server</div>
              </div>
              <div className="org-node server">
                <div className="node-icon">💾</div>
                <div className="node-label">DB Server</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTOR 2 → 3 */}
        <div className="connector">
          <div className={`stream-line ${streamState}`}>
            {packets}
            {maliciousPackets}
          </div>
        </div>

        {/* STAGE 3 — HIDS + SECURITY ADMIN */}
        <div className="stage">
          <div className="stage-card hids-card">
            <div className="stage-name">HIDS System & Security Admin</div>

            <div className="hids-inner">
              {/* LEFT SIDE — HIDS SYSTEM */}
              <div className="hids-left">
                <div className="hids-left-head">
                  <div className="hids-icon">🛡️</div>
                  <div className="hids-left-title">HIDS System</div>
                </div>
                <div className="hids-stats">
                  <div className="stat-line"><span>Agents:</span> <span>125</span></div>
                  <div className="stat-line"><span>Events/hr:</span> <span>420</span></div>
                  <div className="stat-line"><span>Latency:</span> <span>0.8s</span></div>
                </div>
              </div>

              {/* RIGHT SIDE — SECURITY ADMIN */}
              <div className="hids-right">
                <div className="admin-head">
                  <div className="admin-icon">👨‍💼</div>
                  <div className="admin-title">Security Admin</div>
                </div>

                <div className="admin-logs">
                  <div className="log-item log-normal">
                    <div className="log-dot" />
                    <div className="log-text">Normal Activity</div>
                    <div className="log-badge">120</div>
                  </div>

                  <div className="log-item log-suspicious">
                    <div className="log-dot" />
                    <div className="log-text">Suspicious Behavior</div>
                    <div className="log-badge">6</div>
                  </div>

                  <div className={`log-item log-critical ${hasHighSeverity ? "pulse" : ""}`}>
                    <div className="log-dot" />
                    <div className="log-text">Critical Alerts</div>
                    <div className="log-badge">{hasHighSeverity ? 2 : 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* LEGEND */}
      <div className="hids-legend">
        <div className="legend-item"><span className="legend-dot legend-attacker" /> Attacker</div>
        <div className="legend-item"><span className="legend-dot legend-host" /> Hosts</div>
        <div className="legend-item"><span className="legend-dot legend-server" /> Servers</div>
        <div className="legend-item"><span className="legend-dot legend-normal" /> Normal</div>
        <div className="legend-item"><span className="legend-dot legend-suspicious" /> Suspicious</div>
        <div className="legend-item"><span className="legend-dot legend-critical" /> Critical</div>
      </div>
    </section>
  );
}
