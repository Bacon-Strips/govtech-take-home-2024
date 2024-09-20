import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:5000', 
        changeOrigin: true,
      },
    },
    host: "0.0.0.0",
    port: 5173,
  },
})
