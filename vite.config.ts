import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    kitchen: resolve(import.meta.dirname, 'mutfak-dolabi/index.html'),
    wardrobe: resolve(import.meta.dirname, 'gardirop/index.html'),
    bathroom: resolve(import.meta.dirname, 'banyo-dolabi/index.html'),
  },
})
