import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss({
    theme: {
      colors: {
        primary: '#99CCFF',
        secondary: '#17804b',

        red: '#CC0000',
        gray: '#666666',
        white: '#FFFFFF'

      }
    }
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 80
  }
})
