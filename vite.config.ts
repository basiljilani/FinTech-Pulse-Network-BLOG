import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src-2-frontend'),
      '@lib': path.resolve(__dirname, './src-2-frontend/lib'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: true
  },
  root: '.',
  base: '/'
});
