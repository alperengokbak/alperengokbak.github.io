import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    // Default is 4096, which base64-inlined the tech-stack and badge SVGs into the
    // main JS bundle — pulling ~24 kB of below-the-fold icons into the eager download
    // and defeating their loading="lazy". Keep only genuinely tiny files inline.
    assetsInlineLimit: 1024,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    css: false,
  },
});
