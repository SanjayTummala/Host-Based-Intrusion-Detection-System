import React from "react";
import "./AnimatedHidsSection.css";

export default function AnimatedHidsSection({
  hasAlerts = false,
  hasHighSeverity = false,
}) {
  const streamState = hasHighSeverity
    ? "critical"
    : hasAlerts
    ? "suspicious"
    : "normal";

  const packets = [1, 2, 3].map((i) => (
    <span key={i} className={`stream-packet packet-${i} ${streamState}`} />
  ));

  const maliciousPackets = [1, 2].map((i) => (
    <span
      key={i}
      className={`malicious-packet m-${i} ${
        hasAlerts || hasHighSeverity ? "visible" : ""
      }`}
    />
  ));

  return (
    <section className="animated-hids-root">
      {/* HEADER */}
      <header className="hids-header">
        <div className="hids-header-left">
          <svg className="shield-svg" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="shieldGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <path
              d="M60 8 L96 22 V50 C96 78 78 100 60 111 C42 100 24 78 24 50 V22 Z"
              fill="url(#shieldGrad)"
              stroke="#021826"
              strokeWidth="2"
            />
            <text
              x="60"
              y="66"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#021826"
            >
              HIDS
            </text>
          </svg>
        </div>

        <div className="hids-header-center">
          <h1 className="hids-title">
            Host-Based Intrusion Detection System
          </h1>
        </div>

        <div className="hids-header-right">
          <div className={`hids-status ${streamState}`}>
            {hasHighSeverity
              ? "High Severity"
              : hasAlerts
              ? "Active Alerts"
              : "Monitoring"}
          </div>
        </div>
      </header>

      {/* FLOW */}
      <div className="hids-flow-row">
        {/* STAGE 1 */}
        <div className="stage">
          <div className="stage-card attacker-card">
            <div className="attacker-circle">
              <span className="attacker-emoji">👨‍💻</span>
            </div>
            <div className="stage-name">External Attacker</div>
            <div className="stage-small">Malicious traffic source</div>
          </div>
        </div>

        <div className="connector">
          <div className={`stream-line ${streamState}`}>{packets}</div>
        </div>

        {/* STAGE 2 */}
        <div className="stage">
          <div className="stage-card org-card">
            <div className="stage-name">Organization</div>

            <div className="org-row">
              <div className="org-node">
                <div className="node-icon">👩‍💻</div>
                <div>User A</div>
              </div>
              <div className="org-node">
                <div className="node-icon">👨‍💻</div>
                <div>User B</div>
              </div>
              <div className="org-node">
                <div className="node-icon">🧑‍💻</div>
                <div>User C</div>
              </div>
            </div>

            <div className="org-row servers-row">
              <div className="org-node server">
                <div className="node-icon">🖥️</div>
                <div>App Server</div>
              </div>
              <div className="org-node server">
                <div className="node-icon">💾</div>
                <div>DB Server</div>
              </div>
            </div>
          </div>
        </div>

        <div className="connector">
          <div className={`stream-line ${streamState}`}>
            {packets}
            {maliciousPackets}
          </div>
        </div>

        {/* STAGE 3 */}
        <div className="stage">
          <div className="stage-card stage3-box">
            <div className="stage-name">Detection & Response</div>

            <div className="stage3-inner">
              {/* HIDS SYSTEM */}
              <div className="inner-box hids-system-box">
                <div className="box-title">🛡️ HIDS Sensor</div>
                <div className="hids-stats">
                  <div>Agents: 125</div>
                  <div>Events/hr: 420</div>
                  <div>Latency: 0.8s</div>
                </div>
                <div className={`hids-pulse ${streamState}`} />
              </div>

              {/* SECURITY ADMIN */}
              <div className="inner-box admin-box">
                <div className="box-title">👨‍💼 Security Admin</div>

                <div className="admin-logs">
                  <div className="log-item log-normal">
                    <span className="log-dot" />
                    Normal
                    <span className="log-badge">120</span>
                  </div>
                  <div className="log-item log-suspicious">
                    <span className="log-dot" />
                    Suspicious
                    <span className="log-badge">6</span>
                  </div>
                  <div
                    className={`log-item log-critical ${
                      hasHighSeverity ? "pulse" : ""
                    }`}
                  >
                    <span className="log-dot" />
                    Critical
                    <span className="log-badge">
                      {hasHighSeverity ? 2 : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEGEND */}
      <aside className="hids-legend-vertical">
        <h4>Legend</h4>
        <ul>
          <li>
            <span className="dot attacker" /> External Attacker
          </li>
          <li>
            <span className="dot traffic" /> Network Traffic
          </li>
          <li>
            <span className="dot alert" /> Detected Threat
          </li>
          <li>
            <span className="dot response" /> HIDS Response
          </li>
        </ul>
      </aside>
    </section>
  );
}
