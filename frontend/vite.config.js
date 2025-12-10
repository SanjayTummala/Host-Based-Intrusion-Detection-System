// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // IMPORTANT: this must match your repo name
  base: "/Host-Based-Intrusion-Detection-System/",
});
