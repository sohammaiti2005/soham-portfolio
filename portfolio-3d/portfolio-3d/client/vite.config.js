import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development, any request to /api/* is forwarded to the
// Express backend running on port 3000, so the React app can just
// call fetch('/api/...') without worrying about the full URL or CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
