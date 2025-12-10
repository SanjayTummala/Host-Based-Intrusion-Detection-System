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
          <h2>HIDS Organization View</h2>
          <p>
            Real-time visualization of an organization monitored by a
            Host-Based Intrusion Detection System. Host activity and attacker
            traffic are continuously inspected.
          </p>
        </div>
        <div className={statusClass}>{statusText}</div>
      </div>

      <div className="hids-org-layout">
        {/* Attacker side */}
        <div className="hids-column attacker-column">
          <div className="hids-card attacker-card">
            <div className="hids-avatar hids-avatar-attacker">👨‍💻</div>
            <div className="hids-card-title">External Attacker</div>
            <div className="hids-card-subtitle">
              Attempts to breach from the internet
            </div>
            <ul className="hids-card-list">
              <li>Brute force logins</li>
              <li>Suspicious outbound traffic</li>
              <li>Privilege escalation attempts</li>
            </ul>
          </div>
        </div>

        {/* Network + HIDS core */}
        <div className="hids-column network-column">
          <div className="hids-network-frame">
            <div className="hids-network-title">Organization Network</div>

            <div className="hids-row">
              {/* Firewall */}
              <div className="hids-node firewall-node">
                <div className="hids-node-icon">🧱</div>
                <div className="hids-node-title">Firewall</div>
                <div className="hids-node-subtitle">
                  Filters incoming connections
                </div>
              </div>

              {/* HIDS Core */}
              <div className="hids-node hids-core-node">
                <div className="hids-node-icon hids-node-icon-core">🛡️</div>
                <div className="hids-node-title">HIDS Sensor</div>
                <div className="hids-node-subtitle">
                  Watches host logs & processes
                </div>
                <div
                  className={`hids-core-pulse ${
                    hasHighSeverity ? "danger" : hasAlerts ? "active" : ""
                  }`}
                />
              </div>
            </div>

            <div className="hids-row hids-servers-row">
              {/* Application server */}
              <div className="hids-node server-node">
                <div className="hids-node-icon">🖥️</div>
                <div className="hids-node-title">App Server</div>
                <div className="hids-node-subtitle">
                  Runs business applications
                </div>
              </div>

              {/* Database server */}
              <div className="hids-node server-node">
                <div className="hids-node-icon">💾</div>
                <div className="hids-node-title">Database Server</div>
                <div className="hids-node-subtitle">
                  Stores critical company data
                </div>
              </div>
            </div>

            <div className="hids-row hids-users-row">
              <div className="hids-node user-node">
                <div className="hids-node-icon">👩‍💻</div>
                <div className="hids-node-title">User A</div>
                <div className="hids-node-subtitle">HR workstation</div>
              </div>
              <div className="hids-node user-node">
                <div className="hids-node-icon">👨‍💻</div>
                <div className="hids-node-title">User B</div>
                <div className="hids-node-subtitle">Finance workstation</div>
              </div>
              <div className="hids-node user-node">
                <div className="hids-node-icon">🧑‍💻</div>
                <div className="hids-node-title">User C</div>
                <div className="hids-node-subtitle">Remote employee</div>
              </div>
            </div>

            {/* Animated traffic lines inside the network */}
            <div className="hids-traffic-layer">
              <div className="traffic-path path-horizontal">
                <span className="traffic-packet" />
              </div>
              <div className="traffic-path path-diagonal">
                <span className="traffic-packet" />
              </div>
              {hasAlerts && (
                <div className="traffic-path path-alert">
                  <span className="traffic-packet alert" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin / SOC side */}
        <div className="hids-column admin-column">
          <div className="hids-card admin-card">
            <div className="hids-avatar hids-avatar-admin">🧑‍💼</div>
            <div className="hids-card-title">Security Admin</div>
            <div className="hids-card-subtitle">
              Monitors HIDS alerts & metrics
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
                    className={`mini-bar-fill danger ${
                      hasHighSeverity ? "pulse" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="admin-note">
              HIDS sends host alerts to the admin console for investigation and
              response.
            </div>
          </div>
        </div>
      </div>

      <div className="hids-legend">
        <div className="legend-item">
          <span className="legend-dot normal" /> Normal host activity
        </div>
        <div className="legend-item">
          <span className="legend-dot active" /> Suspicious / alert traffic
        </div>
        <div className="legend-item">
          <span className="legend-dot danger" /> High severity detection
        </div>
      </div>
    </div>
  );
}

export default AnimatedHidsSection;
