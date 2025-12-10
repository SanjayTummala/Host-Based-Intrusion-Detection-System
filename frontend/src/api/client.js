// frontend/src/api/client.js
import axios from "axios";

// Backend on Render (new service)
const BASE_URL = "https://host-based-intrusion-detection-system.onrender.com";

export async function fetchAlerts() {
  const res = await axios.get(`${BASE_URL}/alerts`);
  return res.data;
}

export async function fetchMetrics() {
  const res = await axios.get(`${BASE_URL}/metrics`);
  return res.data;
}

export async function startAttack() {
  const res = await axios.post(`${BASE_URL}/simulate_attack`);
  return res.data;
}
