import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';

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

// Plugin to copy meta files to dist/meta
function copyMetaFiles() {
  return {
    name: 'copy-meta-files',
    writeBundle(options) {
      const metaSourceDir = resolve(__dirname, 'meta');
      const metaDestDir = resolve(options.dir, 'meta');
      
      // Create dist/meta directory
      mkdirSync(metaDestDir, { recursive: true });
      
      // Read all files in meta directory
      const files = readdirSync(metaSourceDir);
      
      files.forEach(file => {
        if (file.endsWith('.meta.ts')) {
          const sourcePath = join(metaSourceDir, file);
          const destFileName = file.replace(/\.ts$/, '.js');
          const destPath = join(metaDestDir, destFileName);
          
          // Copy file content and rename .ts to .js
          // Meta files are already valid JS, just with .ts extension
          const content = readFileSync(sourcePath, 'utf-8');
          writeFileSync(destPath, content, 'utf-8');
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), bundleDefaultTheme(), copyMetaFiles()],
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
