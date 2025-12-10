Here is the detailed technical specification for preparing your library. You can save this as `THEME_BUILDER_READINESS.md` in your repository to guide the refactoring process.

***

# Technical Specification: Preparing `white-label-ui-lib` for Theme Builder Integration

**Objective:** Refactor and configure the component library to support the "Zero-Maintenance" Theme Builder architecture. The library must expose its metadata, tokens, and components in a way that allows an external application to discover and style them dynamically without hardcoding.

---

## 1. Action: Expose Metadata in `package.json`

### The "What"
Modify the `package.json` file to ensuring that JSON manifest files and theme definitions are included in the final NPM tarball.

### The "Why"
By default, NPM publishing often ignores non-code files or files outside the `dist` folder. The Theme Builder relies on reading `components.manifest.json` and `theme.manifest.json` directly from the installed package `node_modules`. If these files are missing, the Builder cannot discover components or generate UI controls.

### Implementation Steps
1.  Open `package.json`.
2.  Locate the `files` array.
3.  Add entries for the manifest files and the themes directory.

**Example `package.json`:**
```json
{
  "name": "@dejstdm/white-label-ui",
  "version": "1.0.1",
  "files": [
    "dist",
    "README.md",
    "components.manifest.json",  <-- ADD THIS
    "themes/"                    <-- ADD THIS
  ],
  // ... rest of file
}
```

**Definition of Done:**
*   Running `npm pack` generates a tarball that, when unzipped, contains the `themes` folder and `components.manifest.json` at the root.

---

## 2. Action: CSS Architecture Refactor (Static → Dynamic)

### The "What"
Refactor all component styling to rely exclusively on **CSS Custom Properties (Variables)** for design tokens (colors, spacing, typography, radii).

### The "Why"
The Theme Builder changes the look of components in **real-time (<100ms)**.
*   **Sass/LESS variables (`$primary`)** are compiled away at build time. Changing them requires rebuilding the library (too slow).
*   **CSS Variables (`var(--primary)`)** are evaluated by the browser at runtime. The Theme Builder simply updates the style on the `<body>` tag, and all components update instantly.

### Implementation Steps

#### A. Define the Variables (The "Contract")
Ensure your base theme outputs a CSS file that defines these variables on the root.

```css
/* dist/themes/base.css */
:root {
  --color-brand-primary: #0052CC;
  --color-text-body: #333333;
  --space-md: 16px;
  --radius-sm: 4px;
}
```

#### B. Refactor Components
Change component source code to use these variables.

**❌ BEFORE (Hardcoded/Sass):**
```tsx
// Button.tsx
import styled from 'styled-components';
import { brandColor } from './tokens'; // JS Constant

const StyledButton = styled.button`
  background-color: ${brandColor}; /* Fixed at build time */
  padding: 16px;
  border-radius: 4px;
`;
```

**✅ AFTER (Dynamic CSS Variables):**
```tsx
// Button.tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--color-brand-primary); /* Updates instantly */
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  
  /* Fallbacks are optional but recommended */
  color: var(--color-text-on-primary, #FFFFFF);
`;
```

**Definition of Done:**
*   Searching the `src` folder for hex codes (e.g., `#000000`) returns 0 results (except in the theme definition file).
*   Manually changing a variable in the Browser Inspector (`--color-brand-primary: red`) instantly changes the button color.

---

## 3. Action: Create `components.manifest.json`

### The "What"
Create a JSON file at the root of the library that acts as a map for the Theme Builder. It lists every available component and provides "Sample Data."

### The "Why"
The Theme Builder is "dumb"—it doesn't know how to render your components.
*   It doesn't know `Hero` exists.
*   It doesn't know `Hero` creates a crash if the `title` prop is missing.
This manifest tells the builder *what* to render and *how* to render it safely.

### Implementation Steps
Create `components.manifest.json` at the repo root:

```json
{
  "version": "1.0.0",
  "categories": {
    "Navigation": [
      {
        "name": "NavBar",
        "displayName": "Primary Navigation",
        "importPath": "./NavBar", 
        "description": "Top level navigation bar with logo and links",
        "defaults": {
          "logo": "https://via.placeholder.com/150x50",
          "links": [
            { "label": "Home", "href": "#" },
            { "label": "Products", "href": "#" }
          ],
          "sticky": true
        }
      }
    ],
    "Layout": [
      {
        "name": "Hero",
        "displayName": "Hero Section",
        "importPath": "./Hero",
        "defaults": {
          "title": "Experience the Difference",
          "subtitle": "Our premium solution for your business",
          "ctaText": "Get Started",
          "backgroundImage": "https://via.placeholder.com/1200x600"
        }
      }
    ]
  }
}
```

**Definition of Done:**
*   Every public component in the library has an entry in this JSON.
*   The `defaults` object contains enough props to render the component "prettily" without React errors.

---

## 4. Action: Establish Theme Token Structure

### The "What"
Create a `themes/` directory and establish the source-of-truth JSON file for your design tokens using the **Style Dictionary (CTI)** format.

### The "Why"
The Theme Builder UI (Color pickers, Input fields) is generated programmatically from this file.
*   If you add `"success": { "value": "#00FF00" }` to this file, a new Color Picker appears in the Builder automatically.
*   This decouples the Builder from the Library.

### Implementation Steps
1.  Create folder: `themes/default/`
2.  Create file: `themes/default/theme.manifest.json`

**Example Content:**
```json
{
  "color": {
    "brand": {
      "primary": { "value": "#0052CC", "type": "color", "label": "Primary Brand Color" },
      "secondary": { "value": "#FF6600", "type": "color", "label": "Secondary Brand Color" }
    },
    "text": {
      "body": { "value": "#333333", "type": "color" }
    }
  },
  "size": {
    "spacing": {
      "sm": { "value": "8px", "type": "size" },
      "md": { "value": "16px", "type": "size" }
    }
  }
}
```

**Definition of Done:**
*   The file exists and contains all current design tokens used in the library.
*   Running a script (Style Dictionary) can read this JSON and output the `base.css` file mentioned in Step 2.

---

## Summary of Impact

| File | Before | After | Benefit |
| :--- | :--- | :--- | :--- |
| `package.json` | Files ignored | Files included | Builder can "see" the library structure. |
| Component CSS | Static values | `var(--token)` | Instant live preview in Builder. |
| `components.manifest` | Did not exist | exists with Samples | Builder can render components safely. |
| `theme.manifest` | Did not exist | exists with Tokens | Builder auto-generates UI controls. |