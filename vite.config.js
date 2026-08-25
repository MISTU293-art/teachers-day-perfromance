import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on 0.0.0.0 and localhost (fixes router/network/port blocking)
    port: 5173,
    strictPort: false, // Automatically picks next open port if 5173 is occupied
    proxy: {
      // Automatically proxies /api requests to backend running on port 3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
