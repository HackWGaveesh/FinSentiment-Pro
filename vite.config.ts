import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      // Ignore virtualenv and other large folders to avoid ENOSPC file watcher limits
      ignored: ['**/.venv/**', '**/.idea/**', '**/.git/**']
    },
  },
});
