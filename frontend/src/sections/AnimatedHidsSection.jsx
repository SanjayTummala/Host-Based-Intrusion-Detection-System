import React from "react";
import "./AnimatedHidsSection.css";

/**
 * 4-stage straight left->right flow with visible moving packets on each connector.
 * Props:
 *  - hasAlerts (bool)
 *  - hasHighSeverity (bool)
 */

export default function AnimatedHidsSection({ hasAlerts = false, hasHighSeverity = false }) {
  const statusText = hasHighSeverity
    ? "High severity alerts detected"
    : hasAlerts
    ? "Active alerts detected"
    : "Monitoring in real time";

  // class applied to stream lines & packets
  const streamClass = hasHighSeverity ? "critical" : hasAlerts ? "alert" : "normal";

  // create packet nodes (3 packets gives continuous flow)
  const renderPackets = (prefix = "") =>
    [1, 2, 3].map((n) => (
      <span key={n} className={`stream-packet packet-${n} ${streamClass}`} aria-hidden="true" />
    ));

  return (
    <section className="hids-section-wrapper" aria-labelledby="hids-title">
      <header className="hids-header">
        <div className="hids-header-center">
          <div className="hids-shield" aria-hidden="true" title="HIDS">
            <svg viewBox="0 0 100 100" className="shield-svg" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#0ea5e9" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path d="M50 5 L85 20 L85 45 C85 70 65 88 50 95 C35 88 15 70 15 45 L15 20 Z" fill="url(#g1)" stroke="#083344" strokeWidth="2"/>
              <text x="50" y="58" textAnchor="middle" fontSize="36" fontFamily="Arial" fill="#041826" fontWeight="700">H</text>
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
          {/* Stage 1 */}
          <div className="stage stage-1">
            <div className="stage-card">
              <div className="stage-icon">👨‍💻</div>
              <div className="stage-title">1 — External Attacker</div>
              <div className="stage-desc">Attacker originates malicious traffic: scanning, brute-force, exploit attempts.</div>
            </div>
          </div>

          {/* Connector 1 → 2 */}
          <div className="connector">
            <div className={`stream-line ${streamClass} stream-1`} aria-hidden="true">
              {renderPackets("s1")}
            </div>
            <div className="connector-label">Traffic → Perimeter</div>
          </div>

          {/* Stage 2 */}
          <div className="stage stage-2">
            <div className="stage-card">
              <div className="stage-icon">🛡️</div>
              <div className="stage-title">2 — Perimeter / Edge</div>
              <div className="stage-desc">Edge devices and network perimeter: first contact, filtering & routing to hosts.</div>
            </div>
          </div>

          {/* Connector 2 → 3 */}
          <div className="connector">
            <div className={`stream-line ${streamClass} stream-2`} aria-hidden="true">
              {renderPackets("s2")}
            </div>
            <div className="connector-label">Traffic → Hosts</div>
          </div>

          {/* Stage 3 */}
          <div className="stage stage-3">
            <div className="stage-card">
              <div className="stage-icon">💻</div>
              <div className="stage-title">3 — Hosts & Servers</div>
              <div className="stage-desc">Host agents run on each host: process monitoring, filesystem checks, log analysis.</div>
            </div>
          </div>

          {/* Connector 3 → 4 */}
          <div className="connector">
            <div className={`stream-line ${streamClass} stream-3`} aria-hidden="true">
              {renderPackets("s3")}
            </div>
            <div className="connector-label">Telemetry → HIDS Collector</div>
          </div>

          {/* Stage 4 */}
          <div className="stage stage-4">
            <div className="stage-card">
              <div className="stage-icon">🏢</div>
              <div className="stage-title">4 — HIDS Collector & Admin</div>
              <div className="stage-desc">Collector aggregates host telemetry, correlates alerts, and notifies security admins.</div>
            </div>
          </div>
        </div>

        <div className="flow-notes">
          <strong>How to read this flow:</strong>
          <ul>
            <li>Streams are continuous left→right flows: attacker → perimeter → hosts → collector.</li>
            <li>Host agents run locally on each host (detection happens at host level) and forward telemetry to the collector.</li>
            <li>Stream color & speed indicate severity: normal (soft blue), alert (green), critical (red and faster).</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
