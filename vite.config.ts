import { defineConfig, type Plugin } from 'vite';
import type { OutputBundle, OutputOptions } from 'rollup';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Plugin to bundle default theme at :root level
function bundleDefaultTheme(): Plugin {
  return {
    name: 'bundle-default-theme',
    writeBundle(options: OutputOptions, bundle: OutputBundle) {
      // Find the CSS file in the bundle
      const cssFile = Object.keys(bundle).find(file => file.endsWith('.css'));
      if (!cssFile || !options.dir) return;

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
function copyMetaFiles(): Plugin {
  return {
    name: 'copy-meta-files',
    writeBundle(options: OutputOptions) {
      if (!options.dir) return;
      
      const outputDir = options.dir; // Type narrowing
      const metaSourceDir = resolve(__dirname, 'meta');
      const metaDestDir = resolve(outputDir, 'meta');
      
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
  plugins: [
    react(),
    preserveDirectives(),
    dts({
      include: ['packages/components-react/**/*.ts', 'packages/components-react/**/*.tsx'],
      exclude: ['**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'],
      outDir: 'dist',
      rollupTypes: false,
    }),
    bundleDefaultTheme(),
    copyMetaFiles()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/components-react/index.ts'),
      name: 'WhiteLabelUI',
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
        preserveModules: true,
        preserveModulesRoot: 'packages/components-react',
        entryFileNames: '[name].js'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false, // Extract all CSS into a single file
    sourcemap: true
  }
});
