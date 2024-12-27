import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    entry: ['src/**/*', '!src/**/__tests__/**', '!src/**/*.test.*'],
    format: ['esm'],
    outDir: 'dist',
    dts: true,
  }
})
