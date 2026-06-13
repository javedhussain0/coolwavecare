import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Yeh nayi line add karein

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
})