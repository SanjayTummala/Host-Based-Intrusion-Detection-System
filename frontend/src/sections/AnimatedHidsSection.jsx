import React from "react";
import "./AnimatedHidsSection.css";

/**
 * Updated: horizontal, resized stages, attacker in red circle, simple "Logs" label.
 *
 * Props:
 *  - hasAlerts (bool)
 *  - hasHighSeverity (bool)
 */

export default function AnimatedHidsSection({ hasAlerts = false, hasHighSeverity = false }) {
  const statusText = hasHighSeverity
    ? "High severity detected"
    : hasAlerts
    ? "Active alerts detected"
    : "Monitoring in real time";

  const streamState = hasHighSeverity ? "critical" : hasAlerts ? "alert" : "normal";

  const renderPackets = () =>
    [1, 2, 3].map((n) => (
      <span key={n} className={`stream-packet packet-${n} ${streamState}`} aria-hidden="true" />
    ));

  const renderMaliciousPackets = () =>
    [1, 2].map((n) => (
      <span key={n} className={`malicious-packet m-${n} ${hasHighSeverity ? "visible" : ""}`} aria-hidden="true" />
    ));

  const counts = {
    normal: 120,
    suspicious: hasAlerts && !hasHighSeverity ? 3 : 0,
    critical: hasHighSeverity ? 1 : 0,
  };

  return (
    <section className="hids-section-wrapper horizontal-layout" aria-labelledby="hids-title">
      <header className="hids-header">
        <div className="hids-header-center">
          <div className="hids-shield" aria-hidden="true" title="HIDS shield">
            <svg viewBox="0 0 120 120" className="shield-svg" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="sG" x1="0" x2="1">
                  <stop offset="0" stopColor="#36d1dc" />
                  <stop offset="1" stopColor="#5b86e5" />
                </linearGradient>
              </defs>
              <path d="M60 8 L95 22 V50 C95 78 78 100 60 111 C42 100 25 78 25 50 V22 Z" fill="url(#sG)" stroke="#042033" strokeWidth="2"/>
              <text x="60" y="66" textAnchor="middle" fontSize="22" fontFamily="Verdana" fill="#021826" fontWeight="700">HIDS</text>
            </svg>
          </div>

          <div className="hids-title-area">
            <h1 id="hids-title" className="hids-title">Host-Based Intrusion Detection System</h1>
            <p className="hids-subtitle">Real-time host logs, detection and alerting — visualized end-to-end.</p>
          </div>
        </div>

        <div className="hids-status">
          <div className={hasHighSeverity ? "status danger" : hasAlerts ? "status active" : "status normal"}>
            {statusText}
          </div>
        </div>
      </header>

      <div className="hids-main">
        <div className="stages-row">

          {/* Stage 1: External Attacker (red circle icon, no number) */}
          <div className="stage stage-1 small-stage">
            <div className="stage-card attacker-card compact">
              <div className="attacker-top">
                <div className="attacker-avatar attacker-red">👨‍💻</div>
                <div style={{minWidth:0}}>
                  <div className="stage-title">External Attacker</div>
                  <div className="stage-desc small-pt">Malicious host outside the org.</div>
                </div>
              </div>

              <div className="stage-desc small-pt">
                <em>Key points in legend — see below.</em>
              </div>
            </div>
          </div>

          {/* Connector 1 -> 2 */}
          <div className="connector connector-narrow">
            <div className={`stream-line ${streamState} stream-1`} aria-hidden="true">
              {renderPackets()}
            </div>
            <div className="connector-label">Traffic → Organization</div>
          </div>

          {/* Stage 2: Organization (users in first row; app & db centered second row) */}
          <div className="stage stage-2 medium-stage">
            <div className="stage-card hosts-card compact">
              <div className="hosts-grid-row1 horizontal-users">
                <div className="host-node compact">
                  <div className="host-icon">👩‍💻</div>
                  <div className="host-name">Alice — HR</div>
                </div>
                <div className="host-node compact">
                  <div className="host-icon">👨‍💻</div>
                  <div className="host-name">Bob — Finance</div>
                </div>
                <div className="host-node compact">
                  <div className="host-icon">🧑‍💻</div>
                  <div className="host-name">Charlie — Dev</div>
                </div>
              </div>

              <div className="hosts-grid-row2 servers-centered">
                <div className="host-node server compact server-centered">
                  <div className="host-icon">🖥️</div>
                  <div className="host-name">App Server</div>
                </div>
                <div className="host-node server compact server-centered">
                  <div className="host-icon">💾</div>
                  <div className="host-name">DB Server</div>
                </div>
              </div>
            </div>
          </div>

          {/* Connector 2 -> 3 (label uses simple word "Logs") */}
          <div className="connector connector-narrow">
            <div className={`stream-line ${streamState} stream-2`} aria-hidden="true">
              {renderPackets()}
              <div className="malicious-overlay">{renderMaliciousPackets()}</div>
            </div>
            <div className="connector-label">Logs → HIDS Collector</div>
          </div>

          {/* Stage 3: Single big outer box that contains HIDS System (left) and Security Admin (right) */}
          <div className="stage stage-3 large-stage">
            <div className="stage-card stage3-outer compact-outer">
              <div className="stage-title stage3-title">HIDS Collector & Security Console</div>

              <div className="stage3-inner">
                <div className="hids-system-card inner-card">
                  <div className="admin-top">
                    <div className="admin-icon">🛡️</div>
                    <div>
                      <div className="stage-title small">HIDS System</div>
                      <div className="stage-desc small-pt">Collector, correlator, model inference.</div>
                    </div>
                  </div>

                  <div className="hids-body small-pt">
                    <div className="hids-stats">
                      <div className="stat-item"><strong>Agents:</strong> 125</div>
                      <div className="stat-item"><strong>Events/hr:</strong> 420</div>
                      <div className="stat-item"><strong>Latency:</strong> 0.8s</div>
                    </div>
                  </div>
                </div>

                <div className="admin-card inner-card">
                  <div className="admin-top">
                    <div className="admin-icon">👨‍💼</div>
                    <div>
                      <div className="stage-title small">Security Admin</div>
                      <div className="stage-desc small-pt">Vertical alert list — click to inspect.</div>
                    </div>
                  </div>

                  <div className="admin-body-vertical">
                    <div className={`alert-row alert-normal ${!hasAlerts && !hasHighSeverity ? "highlight" : ""}`}>
                      <div className="alert-dot normal" /> <div className="alert-label">Normal</div>
                      <div className="alert-count">{counts.normal}</div>
                    </div>

                    <div className={`alert-row alert-suspicious ${hasAlerts && !hasHighSeverity ? "highlight pulse" : ""}`}>
                      <div className="alert-dot suspicious" /> <div className="alert-label">Suspicious</div>
                      <div className="alert-count">{counts.suspicious}</div>
                    </div>

                    <div className={`alert-row alert-critical ${hasHighSeverity ? "highlight pulse-strong" : ""}`}>
                      <div className="alert-dot critical" /> <div className="alert-label">Critical</div>
                      <div className="alert-count">{counts.critical}</div>
                    </div>

                    <div className="admin-note small-pt">Alerts are vertical inside the single stage-3 box and sync with the packet flow.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flow-notes">
          <strong>Legend & key points:</strong>
          <ul>
            <li><span className="legend-dot legend-attacker" /> Attacker (red circle) — source of malicious traffic.</li>
            <li><span className="legend-dot legend-host" /> Host endpoints — local HIDS agents run here.</li>
            <li><span className="legend-dot legend-server" /> Critical servers (App / DB).</li>
            <li><span className="legend-dot legend-normal" /> Packet color shows stream severity: normal / suspicious / critical.</li>
            <li>Connectors labelled simply as "Traffic" or "Logs" for readability.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
