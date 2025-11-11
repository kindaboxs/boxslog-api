import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/app.ts', './src/index.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
  fixedExtension: true,
  sourcemap: true,
  dts: true,
});
