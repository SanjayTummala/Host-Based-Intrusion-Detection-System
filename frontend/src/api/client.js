import axios from "axios";

// Render backend URL
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://host-based-intrusion-detection-system.onrender.com";

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
