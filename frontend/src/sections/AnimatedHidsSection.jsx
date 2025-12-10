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
            Host-Based Intrusion Detection System. Host traffic, attacker
            activity, and alert telemetry are shown as flowing lines.
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
              Malicious attempts from outside the organization
            </div>
            <ul className="hids-card-list">
              <li>Brute force logins on exposed services</li>
              <li>Suspicious outbound connections</li>
              <li>Privilege escalation on hosts</li>
            </ul>
          </div>

          {/* Attacker → Network traffic path (red) */}
          {hasAlerts && (
            <div className="attacker-traffic">
              <div className="attacker-traffic-label">Malicious traffic</div>
              <div className="attacker-traffic-line">
                <span
                  className={
                    "attacker-packet" + (hasHighSeverity ? " fast" : "")
                  }
                />
              </div>
            </div>
          )}
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
                  Filters incoming and outgoing connections
                </div>
              </div>

              {/* HIDS Core */}
              <div className="hids-node hids-core-node">
                <div className="hids-node-icon hids-node-icon-core">🛡️</div>
                <div className="hids-node-title">HIDS Sensor</div>
                <div className="hids-node-subtitle">
                  Monitors host logs & suspicious behavior
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
                  Stores critical organization data
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

            {/* Traffic animation layer inside the network */}
            <div className="hids-traffic-layer">
              {/* Blue: normal internal host traffic */}
              <div className="traffic-path path-internal">
                <span className="traffic-packet internal" />
              </div>

              {/* Green: telemetry from HIDS to admin (we just show inside org box here) */}
              <div className="traffic-path path-telemetry">
                <span
                  className={
                    "traffic-packet telemetry" +
                    (hasAlerts || hasHighSeverity ? " bright" : "")
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Admin / SOC side */}
        <div className="hids-column admin-column">
          <div className="hids-card admin-card">
            <div className="hids-avatar hids-avatar-admin">🧑‍💼</div>
            <div className="hids-card-title">Security Admin</div>
            <div className="hids-card-subtitle">
              Receives HIDS alerts & investigates incidents
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
                      "mini-bar-fill danger" + (hasHighSeverity ? " pulse" : "")
                    }
                  />
                </div>
              </div>
            </div>

            {/* Green: HIDS → Admin telemetry path */}
            <div className="admin-telemetry">
              <div className="admin-telemetry-label">HIDS alerts to console</div>
              <div className="admin-telemetry-line">
                <span
                  className={
                    "admin-telemetry-packet" +
                    (hasAlerts || hasHighSeverity ? " bright" : "")
                  }
                />
              </div>
            </div>

            <div className="admin-note">
              The HIDS engine forwards suspicious activity from hosts to this
              console for analysis and response.
            </div>
          </div>
        </div>
      </div>

      <div className="hids-legend">
        <div className="legend-item">
          <span className="legend-dot normal" /> Normal host traffic
        </div>
        <div className="legend-item">
          <span className="legend-dot telemetry" /> HIDS telemetry & alerts
        </div>
        <div className="legend-item">
          <span className="legend-dot danger" /> Malicious / high-severity traffic
        </div>
      </div>
    </div>
  );
}

export default AnimatedHidsSection;
