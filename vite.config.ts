import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      process: "process/browser",
      "@": resolve(__dirname, "./src"),
    },
  },
});
