// src/api/client.js

// By default use the Render backend in production,
// but allow override via VITE_API_BASE_URL for local dev.
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://hids-backend.onrender.com";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!resp.ok) {
    // Try to parse JSON error if available
    let errMsg = `Request failed with status ${resp.status}`;
    try {
      const data = await resp.json();
      if (data && data.detail) {
        errMsg = data.detail;
      }
    } catch {
      // ignore parsing error
    }
    throw new Error(errMsg);
  }

  return resp.json();
}

export function fetchMetrics() {
  return request("/metrics");
}

export function fetchAlerts() {
  return request("/alerts");
}

export function startAttack() {
  return request("/simulate_attack", { method: "POST" });
}
