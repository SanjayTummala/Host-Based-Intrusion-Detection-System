import React from "react";
import "./AnimatedHidsSection.css";

/**
 * 3-stage HIDS animation (wide grid + split HIDS/Admin + vertical alerts)
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

  // sample counts (you can wire these to real backend)
  const counts = {
    normal: 120,
    suspicious: hasAlerts && !hasHighSeverity ? 3 : 0,
    critical: hasHighSeverity ? 1 : 0,
  };

  return (
    <section className="hids-section-wrapper" aria-labelledby="hids-title">
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
              <text x="60" y="66" textAnchor="middle" fontSize="28" fontFamily="Verdana" fill="#021826" fontWeight="700">HIDS</text>
            </svg>
          </div>

          <div className="hids-title-area">
            <h1 id="hids-title" className="hids-title">Host-Based Intrusion Detection System</h1>
            <p className="hids-subtitle">Real-time host telemetry, detection and alerting — visualized end-to-end.</p>
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
          {/* Stage 1: Attacker */}
          <div className="stage stage-1">
            <div className="stage-card attacker-card">
              <div className="attacker-top">
                <div className="attacker-avatar">👨‍💻</div>
                <div style={{minWidth:0}}>
                  <div className="stage-title">1 — External Attacker</div>
                  <div className="stage-desc small-pt">Human attacker with laptop. Typical actions:</div>
                </div>
              </div>

              <div className="stage-desc">
                <ul>
                  <li>Scan & reconnaissance</li>
                  <li>Brute-force / credential stuffing</li>
                  <li>Exploit delivery & data exfiltration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Connector 1 -> 2 */}
          <div className="connector connector-wide">
            <div className={`stream-line ${streamState} stream-1`} aria-hidden="true">
              {renderPackets()}
            </div>
            <div className="connector-label">Traffic → Organization</div>
          </div>

          {/* Stage 2: Hosts & Servers (WIDE GRID) */}
          <div className="stage stage-2 wide-organization">
            <div className="stage-card hosts-card wide">
              <div className="hosts-grid-wide">
                <div className="host-node large">
                  <div className="host-icon">👩‍💻</div>
                  <div className="host-name">Alice — HR</div>
                </div>
                <div className="host-node large">
                  <div className="host-icon">👨‍💻</div>
                  <div className="host-name">Bob — Finance</div>
                </div>
                <div className="host-node large">
                  <div className="host-icon">🧑‍💻</div>
                  <div className="host-name">Charlie — Dev</div>
                </div>

                <div className="host-node server large">
                  <div className="host-icon">🖥️</div>
                  <div className="host-name">App Server</div>
                </div>
                <div className="host-node server large">
                  <div className="host-icon">💾</div>
                  <div className="host-name">DB Server</div>
                </div>
              </div>

              <div className="hosts-note">Large spaced endpoints with local HIDS agents — clearer layout, not congested.</div>
            </div>
          </div>

          {/* Connector 2 -> 3 (malicious overlay possible) */}
          <div className="connector connector-wide">
            <div className={`stream-line ${streamState} stream-2`} aria-hidden="true">
              {renderPackets()}
              <div className="malicious-overlay">{renderMaliciousPackets()}</div>
            </div>
            <div className="connector-label">Telemetry → HIDS Collector</div>
          </div>

          {/* Stage 3: Split HIDS System (left) & Security Admin (right) */}
          <div className="stage stage-3 split-stage">
            <div className="hids-admin-row">
              <div className="hids-system-card stage-card">
                <div className="admin-top">
                  <div className="admin-icon">🛡️</div>
                  <div>
                    <div className="stage-title">HIDS System</div>
                    <div className="stage-desc small-pt">Collector & correlator — aggregates host telemetry.</div>
                  </div>
                </div>

                <div className="hids-body">
                  <div className="hids-stats">
                    <div className="stat-item"><strong>Agents:</strong> 125</div>
                    <div className="stat-item"><strong>Events/hr:</strong> 420</div>
                    <div className="stat-item"><strong>Avg latency:</strong> 0.8s</div>
                  </div>
                </div>
              </div>

              <div className="admin-card stage-card">
                <div className="admin-top">
                  <div className="admin-icon">👨‍💼</div>
                  <div>
                    <div className="stage-title">Security Admin</div>
                    <div className="stage-desc small-pt">Vertical alert list — click to inspect an incident.</div>
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

                  <div className="admin-note small-pt">Alerts show vertically and reflect stream state in real time.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flow-notes">
          <strong>Legend:</strong>
          <ul>
            <li>Telemetry (2 → 3): teal/green normal; amber suspicious; red critical (overlay).</li>
            <li>Admin badges list alerts vertically (normal / suspicious / critical).</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
