import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: {
        icons: [{
          src: "public/car-solid.svg",
          type: "image/svg",
          purpose: "any maskable"
        }]
      }
    })
  ],
})
