import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

export default defineConfig({
  base: './',
  server: {host: '0.0.0.0', port: 5173},
  preview: {host: '0.0.0.0', port: 4173},
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        studio: fileURLToPath(new URL('./index.html', import.meta.url)),
        learn: fileURLToPath(new URL('./learn.html', import.meta.url)),
      },
    },
  },
});
