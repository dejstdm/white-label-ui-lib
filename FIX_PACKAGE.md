# Fix for @dejstdm/white-label-ui Package

## Problem Summary

The package is missing the `packages/` folder when published, causing the import to fail:
```
Module not found: Can't resolve './packages/components-react/index.js'
```

## Root Causes

1. **Missing files in package.json**: The `files` array doesn't include `packages/`
2. **No build process**: Components use JSX but aren't transpiled
3. **JSX in published package**: Consumers need to configure transpilation

## Solution Options

### Option 1: Include Source Files (Quick Fix)

**Update `package.json` in white-label-ui-lib:**

```json
{
  "files": [
    "index.js",
    "packages/",
    "README.md",
    "LICENSE"
  ]
}
```

**Pros:**
- Quick fix, no build step needed
- Works immediately

**Cons:**
- Consumers need to transpile JSX (Next.js handles this with `transpilePackages`)
- Larger package size
- Source code exposed

**Required in consuming apps:**
```js
// next.config.ts
transpilePackages: ['@dejstdm/white-label-ui']
```

### Option 2: Build Before Publish (Recommended)

**1. Install build tools:**
```bash
npm install --save-dev vite @vitejs/plugin-react
```

**2. Create `vite.config.js`:**
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

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
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
```

**3. Update `package.json`:**
```json
{
  "main": "dist/white-label-ui.js",
  "module": "dist/white-label-ui.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "vite build",
    "prepublishOnly": "npm run build"
  }
}
```

**4. Update root `index.js`:**
```js
export * from './dist/white-label-ui.js';
```

**Pros:**
- Pre-built, optimized code
- No transpilation needed in consuming apps
- Smaller package size
- Production-ready

**Cons:**
- Requires build step before publish
- More complex setup

### Option 3: Use TypeScript + Build (Best for Long-term)

**1. Convert components to TypeScript**
**2. Use a bundler (Vite/Rollup) to build**
**3. Generate type definitions**

## Immediate Fix (Option 1 - Quick)

**In `white-label-ui-lib/package.json`:**

```json
{
  "files": [
    "index.js",
    "packages/",
    "README.md",
    "LICENSE"
  ]
}
```

**Then republish:**
```bash
cd white-label-ui-lib
npm version patch  # or minor/major
npm publish
```

**In consuming apps (like wl-next-js-test), ensure `next.config.ts` has:**
```ts
transpilePackages: ['@dejstdm/white-label-ui']
```

## Recommended Long-term Solution

Use **Option 2** (Build Before Publish) for:
- Better performance
- Smaller package size
- No consumer configuration needed
- Production-ready code

