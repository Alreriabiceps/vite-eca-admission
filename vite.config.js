import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Suppress PostCSS warnings about deprecated color-adjust
  logLevel: "warn",
  // Ensure proper base path for deployment
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
