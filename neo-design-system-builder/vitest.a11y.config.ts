import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    name: 'accessibility',
    include: ['**/*.a11y.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.git', '.cache'],
    setupFiles: ['./src/test/setup.ts', './tests/setup-a11y.ts'],
    testTimeout: 20000,
    hookTimeout: 20000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
