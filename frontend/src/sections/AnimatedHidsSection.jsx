import React from "react";
import "./AnimatedHidsSection.css";

function AnimatedHidsSection({ hasAlerts, hasHighSeverity }) {
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
          <h2>HIDS Traffic & Detection Flow</h2>
          <p>
            Visual flow of how traffic enters the organization, reaches the
            hosts, is inspected by the HIDS sensor, and finally generates
            alerts for the security admin.
          </p>
        </div>
        <div className={statusClass}>{statusText}</div>
      </div>

      <div className="hids-flow">
        {/* Stage 1: Attacker */}
        <div className="flow-stage">
          <div className="hids-card">
            <div className="hids-avatar hids-avatar-attacker">👨‍💻</div>
            <div className="hids-card-title">External Attacker</div>
            <div className="hids-card-subtitle">
              Sends malicious traffic from outside the network
            </div>
            <ul className="hids-card-list">
              <li>Brute-force login attempts</li>
              <li>Suspicious outbound connections</li>
              <li>Privilege escalation on hosts</li>
            </ul>
          </div>
          <div className="flow-step-label">1. Attack traffic originates</div>
        </div>

        {/* Connector 1: Attacker -> Network (left → right arc) */}
        <div className="flow-connector">
          <div className="connector-label">Traffic entering the network</div>
          <div
            className={
              "connector-path connector-arc " +
              (hasAlerts ? "connector-alert" : "connector-normal")
            }
          >
            <span
              className={
                "connector-packet " +
                (hasAlerts ? "packet-alert" : "packet-normal") +
                (hasHighSeverity ? " packet-fast" : "")
              }
            />
          </div>
        </div>

        {/* Stage 2: Hosts & Servers */}
        <div className="flow-stage">
          <div className="hids-card hosts-card">
            <div className="hosts-row">
              <div className="hids-node-small">
                <div className="hids-node-icon">👩‍💻</div>
                <div className="hids-node-title">User A</div>
                <div className="hids-node-subtitle">HR workstation</div>
              </div>
              <div className="hids-node-small">
                <div className="hids-node-icon">👨‍💻</div>
                <div className="hids-node-title">User B</div>
                <div className="hids-node-subtitle">Finance workstation</div>
              </div>
              <div className="hids-node-small">
                <div className="hids-node-icon">🧑‍💻</div>
                <div className="hids-node-title">User C</div>
                <div className="hids-node-subtitle">Remote employee</div>
              </div>
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
          <div className="flow-step-label">
            2. Hosts & servers see the traffic
          </div>
        </div>

        {/* Connector 2: Hosts -> HIDS (right → left arc) */}
        <div className="flow-connector">
          <div className="connector-label">Host logs & events to HIDS</div>
          <div className="connector-path connector-arc connector-arc-reverse connector-telemetry">
            <span
              className={
                "connector-packet packet-telemetry" +
                (hasAlerts || hasHighSeverity ? " packet-bright" : "")
              }
            />
          </div>
        </div>

        {/* Stage 3: HIDS Sensor & Admin */}
        <div className="flow-stage">
          <div className="hids-card hids-core-card">
            <div className="hids-core-row">
              <div className="hids-node-small hids-core-node">
                <div className="hids-node-icon hids-core-icon">🛡️</div>
                <div className="hids-node-title">HIDS Sensor</div>
                <div className="hids-node-subtitle">
                  Analyses host logs & detects anomalies
                </div>
                <div
                  className={
                    "hids-core-pulse " +
                    (hasHighSeverity
                      ? "danger"
                      : hasAlerts
                      ? "active"
                      : "normal")
                  }
                />
              </div>
              <div className="hids-node-small admin-node">
                <div className="hids-node-icon">🧑‍💼</div>
                <div className="hids-node-title">Security Admin</div>
                <div className="hids-node-subtitle">
                  Receives alerts & investigates incidents
                </div>

                <div className="mini-dashboard">
                  <div className="mini-bar-row">
                    <div className="mini-bar-label">Normal</div>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill normal" />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <div className="mini-bar-label">Suspicious</div>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill active" />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <div className="mini-bar-label">Critical</div>
                    <div className="mini-bar-track">
                      <div
                        className={
                          "mini-bar-fill danger" +
                          (hasHighSeverity ? " pulse" : "")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HIDS -> Admin (can stay straight or slightly curved) */}
            <div className="admin-telemetry">
              <div className="admin-telemetry-label">
                Alerts forwarded to console
              </div>
              <div className="admin-telemetry-line">
                <span
                  className={
                    "admin-telemetry-packet" +
                    (hasAlerts || hasHighSeverity ? " bright" : "")
                  }
                />
              </div>
            </div>
          </div>

          <div className="flow-step-label">
            3. HIDS detects & sends alerts to the admin
          </div>
        </div>
      </div>

      <div className="hids-legend">
        <div className="legend-item">
          <span className="legend-dot legend-normal" /> Attacker traffic entering
          the network
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-telemetry" /> Host logs & HIDS
          telemetry
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-danger" /> Malicious / high-severity
          detection
        </div>
      </div>
    </div>
  );
}

export default AnimatedHidsSection;
