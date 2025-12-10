import React from "react";
import "./AnimatedHidsSection.css";

function AnimatedHidsSection({ hasAlerts, hasHighSeverity }) {
  return (
    <div className="hids-section">
      <div className="hids-header">
        <h2>HIDS Animated Topology</h2>
        <p>
          Visual representation of an organization protected by a Host-Based
          Intrusion Detection System. Attacker traffic is monitored and flagged
          in real time.
        </p>
      </div>

      <div className="hids-topology">
        {/* Attacker outside */}
        <div className="hids-attacker">
          <div className="avatar attacker-avatar">👨‍💻</div>
          <div className="avatar-label">Attacker</div>
          <div className="attacker-note">Trying to breach from outside</div>
        </div>

        {/* Network boundary */}
        <div className="hids-network">
          <div className="network-border" />

          <div className="hids-org">
            <div className="org-title">Organization Network</div>

            <div className="org-row">
              <div className="hids-node admin-node">
                <div className="avatar">🧑‍💼</div>
                <div className="node-name">Admin Console</div>
                <div className="node-role">Security dashboard</div>
              </div>

              <div className="hids-node hids-core">
                <div className="avatar hids-logo">🛡️</div>
                <div className="node-name">HIDS Engine</div>
                <div className="node-role">
                  Monitors host logs, detects anomalies
                </div>
                <div
                  className={`hids-pulse ${
                    hasHighSeverity ? "danger" : hasAlerts ? "active" : ""
                  }`}
                />
              </div>
            </div>

            <div className="org-row users-row">
              <div className="hids-node user-node">
                <div className="avatar">👩‍💻</div>
                <div className="node-name">User Workstation A</div>
                <div className="node-role">Employee device</div>
              </div>
              <div className="hids-node user-node">
                <div className="avatar">👨‍💻</div>
                <div className="node-name">User Workstation B</div>
                <div className="node-role">Employee device</div>
              </div>
              <div className="hids-node user-node">
                <div className="avatar">🧑‍💻</div>
                <div className="node-name">User Workstation C</div>
                <div className="node-role">Remote user</div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated attack path */}
        <div className="hids-connections">
          <div className="attack-line">
            <span className="packet" />
          </div>
          <div className="detection-line">
            <span className="packet" />
          </div>
        </div>
      </div>

      <div className="hids-legend">
        <div className="legend-item">
          <span className="legend-dot normal" /> Normal monitoring
        </div>
        <div className="legend-item">
          <span className="legend-dot active" /> Active alerts detected
        </div>
        <div className="legend-item">
          <span className="legend-dot danger" /> High severity detection
        </div>
      </div>
    </div>
  );
}

export default AnimatedHidsSection;
