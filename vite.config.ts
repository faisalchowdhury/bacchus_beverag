import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Chrome and Firefox refuse to connect to port 6000 at all (ERR_UNSAFE_PORT
  // — it's on their reserved-port blocklist, historically tied to X11), so it
  // can never be opened directly in a browser. Production is unaffected: the
  // reverse proxy talks to this port server-to-server, which isn't subject to
  // that browser restriction. Locally, set DEV_PORT in .env to something else
  // (5173 by default here) rather than hitting 6000 straight from a browser.
  const port = Number(env.DEV_PORT) || 6000;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port,

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
  };
});
