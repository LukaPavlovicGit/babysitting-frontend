import { defineConfig, PluginOption } from 'vite'
import autoprefixer from "autoprefixer";
import react from '@vitejs/plugin-react-swc'

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
  plugins: [react() as PluginOption],
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
})
