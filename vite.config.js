import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/happy_Birthday_benny_myLove/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.loca.lt'],
  },
})
