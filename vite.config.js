import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Pre-compress text assets so Nginx can serve them with `gzip_static` / `brotli_static` (zero CPU at request time).
    compression({ algorithm: "gzip", exclude: [/\.(webp|png|jpe?g|woff2?)$/i], threshold: 1024 }),
    compression({ algorithm: "brotliCompress", exclude: [/\.(webp|png|jpe?g|woff2?)$/i], threshold: 1024 }),
  ],
  build: {
    target: "es2019",
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
    sourcemap: false,
    chunkSizeWarningLimit: 220,
    rollupOptions: {
      output: {
        // Long-lived libraries get their own hashed chunks so returning visitors keep them cached across releases.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          gsap: ["gsap", "gsap/ScrollTrigger"],
        },
      },
    },
  },
});
