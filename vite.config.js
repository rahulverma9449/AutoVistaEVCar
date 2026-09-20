import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  server: {
    port: 5353,
    strictPort: true,
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
});
export {
  vite_config_default as default
};
