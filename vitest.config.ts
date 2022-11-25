/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@style': '/src/styles/global.scss',
      '@graphql': '/src/lib/client',
      '@components': '/src/components',
      '@libs': '/src/lib',
      '@hooks': '/src/hooks'
    }
  },

  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/vitest-setup.ts']
  }
})
