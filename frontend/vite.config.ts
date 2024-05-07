import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from "path";

// https://ui.shadcn.com/docs/installation/vite
export default defineConfig({
  server: {
    port: 9001,
    cors: false,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(import.meta.dir, "./src") },
      {
        find: "@server",
        replacement: path.resolve(import.meta.dir, "../server"),
      },
    ],
  },
});
