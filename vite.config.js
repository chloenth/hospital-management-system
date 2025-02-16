import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to a directory path
const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = dirname(__filename); // Get current directory

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@radix-ui/react-dropdown-menu'],
  },
});
