import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "public",

  build: {
    // Enable source maps for debugging in production (optional)
    sourcemap: false,

    // Increase chunk size warning limit
    chunkSizeWarningLimit: 500,

    // Use esbuild for minification (default, fast, and efficient)
    minify: "esbuild",

    rollupOptions: {
      output: {
        // Manual chunks for code splitting
        manualChunks: {
          // Vendor chunk - React and router
          "vendor-react": ["react", "react-dom", "react-router-dom"],

          // Icons chunk - heavy icon libraries
          "vendor-icons": ["@phosphor-icons/react", "lucide-react"],

          // Animation libraries
          "vendor-animation": ["aos", "rough-notation"],

          // UI utilities
          "vendor-utils": ["axios", "react-toastify", "swiper"],
        },

        // Optimize chunk naming for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
