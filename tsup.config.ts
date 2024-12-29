import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    entry: ['src/**/*', '!src/**/__tests__/**', '!src/**/*.test.*'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: true,
    clean: true,
    sourcemap: true,
    outExtension: ({ format }) => ({
      js: format === 'esm' ? '.js' : '.cjs', // Use .js for ESM files
    }),
  }
})
