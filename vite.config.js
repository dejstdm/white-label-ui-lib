import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/components-react/index.js'),
      name: 'WhiteLabelUI',
      fileName: 'white-label-ui',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'swiper',
        'swiper/react',
        'swiper/modules'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'swiper': 'Swiper'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false, // Extract all CSS into a single file
    sourcemap: true
  }
});
