import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "spa-fallback-404",
      apply: "build",
      writeBundle(options) {
        const dir = options.dir ?? resolve("dist");
        copyFileSync(resolve(dir, "index.html"), resolve(dir, "404.html"));
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    port: 43123,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 43124,
    strictPort: true,
  },
});
