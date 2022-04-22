import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteFonts from "vite-plugin-fonts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteFonts({
      google: {
        families: ["Crimson Text"],
      },
    }),
  ],
})
