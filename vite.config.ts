import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 6000,

    // ✅ Allow your custom domain
    allowedHosts: ["faisal6000.ssh.bd"],

    // ✅ Required for external access
    host: true,
    cors: true,
  },
  build: {
    //   target: "esnext", // Ensure modern JavaScript syntax is used
    outDir: "dist", // Define your output directory for production build
  },
});
