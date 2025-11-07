import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Plugin to bundle default theme at :root level
function bundleDefaultTheme() {
  return {
    name: 'bundle-default-theme',
    writeBundle(options, bundle) {
      // Find the CSS file in the bundle
      const cssFile = Object.keys(bundle).find(file => file.endsWith('.css'));
      if (!cssFile) return;

      const cssPath = resolve(options.dir, cssFile);
      
      // Read the default theme CSS
      const defaultThemePath = resolve(__dirname, 'themes/default/dist/theme.css');
      let defaultThemeCSS = readFileSync(defaultThemePath, 'utf-8');
      
      // Transform [data-theme="default"] to :root
      defaultThemeCSS = defaultThemeCSS.replace(/\[data-theme="default"\]/g, ':root');
      
      // Read the existing built CSS
      const existingCSS = readFileSync(cssPath, 'utf-8');
      
      // Prepend default theme CSS to the built CSS
      const combinedCSS = defaultThemeCSS + '\n\n' + existingCSS;
      
      // Write back
      writeFileSync(cssPath, combinedCSS);
    }
  };
}

export default defineConfig({
  plugins: [react(), bundleDefaultTheme()],
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
