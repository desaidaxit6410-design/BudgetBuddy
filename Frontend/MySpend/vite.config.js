import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],

  build: {
    chunkSizeWarningLimit: 2000, // in KB, e.g., 1000 KB
    outDir: 'dist'
  },
  server: {
    // Only for dev
    historyApiFallback: true
  }

})
