import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {nodePolyfills} from 'vite-plugin-node-polyfills';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      global: true,
    }),],
  resolve: {
    alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
  },
  define: {
    'process.env': {},
  },
});
