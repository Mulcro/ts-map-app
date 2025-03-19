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
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: new RegExp('https://jsonplaceholder\\.typicode\\.com/posts/\\d+'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'testCache',
              expiration: {
                maxAgeSeconds: 60 *10 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
        ]
      }
    })
  ],
})
