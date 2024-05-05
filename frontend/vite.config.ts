import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://ui.shadcn.com/docs/installation/vite
export default defineConfig({
  server: {
    port: 9001,
    cors: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(import.meta.dir, "./src") }],
  },
});
