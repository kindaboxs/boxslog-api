import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    app: './src/app.ts',
    index: './src/index.ts',
  },
  format: 'esm',
  outDir: './dist',
  clean: true,
  dts: true,
});
