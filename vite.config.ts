import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});