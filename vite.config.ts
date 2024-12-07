import { defineConfig } from 'vite'
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import autoprefixer from "autoprefixer";
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {}, // SCSS opcije
    },
    postcss: {
      plugins: [autoprefixer()], // PostCSS pluginovi
    },
  },
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      minify: true,
      workbox: { globPatterns: ["**/*"] },
      injectManifest: {},
      includeAssets: ["**/*"],
      includeManifestIcons: true,
      manifest: {
        name: "Baby Sitting",
        short_name: "Baby Sitting",
        theme_color: "#7C1BD7",
        background_color: "#171716",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/pwa/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/icons/pwa/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icons/pwa/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icons/pwa/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icons/pwa/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/pwa/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/pwa/icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/pwa/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icons/pwa/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    TanStackRouterVite(),],
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
})


