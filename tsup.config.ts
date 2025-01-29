import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*', '!src/**/__tests__/**', '!src/**/*.test.*'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  minify: true,
  dts: true,
  clean: true,
  sourcemap: false,
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.js' : '.cjs', // Use .js for ESM files
  }),
})
