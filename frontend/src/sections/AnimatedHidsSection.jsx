// src/sections/AnimatedHidsSection.jsx
import React from "react";
import { motion } from "framer-motion";

const systemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08 },
  }),
};

function AnimatedHidsSection() {
  const systems = Array.from({ length: 6 });

  return (
    <div className="panel">
      <h2 className="panel-title">How the HIDS Pipeline Works</h2>
      <p className="panel-subtitle">
        This animation shows how host events flow through an intrusion detection
        pipeline into the SOC dashboard.
      </p>

      <div className="animated-layout">
        <motion.div
          className="animated-column"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="animated-heading">Hosts</h3>
          <ul className="animated-list">
            {systems.map((_, idx) => (
              <motion.li
                key={idx}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={systemVariant}
                className="animated-pill"
              >
                Host #{idx + 1} – syscalls, logs, metrics
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="animated-column"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="animated-heading">HIDS Engine</h3>
          <ul className="animated-list">
            <li className="animated-step">1. Collect host events</li>
            <li className="animated-step">2. Extract features</li>
            <li className="animated-step">3. ML model scores anomalies</li>
            <li className="animated-step">4. Persist alerts to DB</li>
          </ul>
        </motion.div>

        <motion.div
          className="animated-column"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="animated-heading">SOC Dashboard</h3>
          <div className="soc-box">
            <p className="soc-text">
              Analysts see alerts, severity and timing, and decide whether to
              escalate or dismiss them.
            </p>
            <ul className="soc-list">
              <li>✔ Real-time alerts from /simulate_attack</li>
              <li>✔ Historical view in Collected Logs</li>
              <li>✔ Metrics powered by /metrics</li>
            </ul>
            <div className="soc-footer">
              In this project, your browser UI is playing the SOC dashboard
              role.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AnimatedHidsSection;
