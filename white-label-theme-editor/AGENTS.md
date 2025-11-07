# Cursor Agents Specification — WhiteLabel Theme Editor

---

## Agent 1 – Theme Compiler Browser Agent
**Goal:** Port Node.js theme compiler to browser-safe TypeScript for live CSS generation.

### Inputs
- Theme manifest object (React state)
- Theme name (string, default: "custom")

### Outputs
- CSS string (compiled theme)
- Validation errors/warnings (array)

### Tasks
1. Port `scripts/compile-theme.js` logic to TypeScript.
2. Remove Node.js dependencies (fs, path).
3. Generate CSS string in memory (no filesystem).
4. Support all manifest sections (palette, typography, spacing, radii, shadows, grid).
5. Generate RGB variants for all colors.
6. Handle font family references ("heading", "body" → CSS variables).
7. Return CSS string ready for injection.

### Implementation
- Location: `src/utils/themeCompiler.ts`
- Export function: `compileThemeToCSS(manifest: ThemeManifest, themeName: string): string`
- Error handling: Return validation errors as array, don't throw.

---

## Agent 2 – Live Theme Injection Agent
**Goal:** Inject compiled CSS into page and update component preview in real-time.

### Inputs
- Compiled CSS string
- Theme name
- Preview container selector

### Outputs
- `<style>` tag in document head
- `data-theme` attribute on preview container
- Cleanup function

### Tasks
1. Create/update `<style id="live-theme-styles">` tag in `<head>`.
2. Set style tag content to compiled CSS.
3. Apply `data-theme` attribute to preview container.
4. Clean up style tag on component unmount.
5. Debounce rapid updates (optional, 50ms).

### Implementation
- Location: `src/hooks/useLiveTheme.ts`
- Export hook: `useLiveTheme(manifest: ThemeManifest, themeName: string)`
- Dependencies: React useEffect, useRef

---

## Agent 3 – Theme State Management Agent
**Goal:** Manage theme manifest state and provide update functions.

### Inputs
- Initial manifest (default theme or imported)

### Outputs
- Current manifest state
- Update functions (updateValue, reset, import, export)
- Theme name state

### Tasks
1. Initialize state with default theme manifest.
2. Provide `updateValue(path: string, value: any)` for nested updates.
3. Handle deep object updates (palette.brand.primary).
4. Support theme name changes.
5. Provide reset to default function.
6. Provide import/export manifest functions.
7. Persist to localStorage (optional).

### Implementation
- Location: `src/hooks/useThemeState.ts`
- Export hook: `useThemeState()`
- State library: React useState/useCallback or Zustand

---

## Agent 4 – Contrast Validation Agent
**Goal:** Validate color contrast ratios in real-time for WCAG AA compliance.

### Inputs
- Color pair (foreground, background)
- Text size (normal or large)

### Outputs
- Contrast ratio (number)
- AA compliance status (pass/fail)
- Warning message (if failing)

### Tasks
1. Calculate relative luminance for colors (WCAG formula).
2. Compute contrast ratio between two colors.
3. Check against AA threshold (4.5:1 normal, 3:1 large).
4. Return pass/fail status with ratio.
5. Highlight failing pairs in UI.

### Implementation
- Location: `src/utils/contrastChecker.ts`
- Export functions:
  - `calculateContrast(color1: string, color2: string): number`
  - `checkAACompliance(contrast: number, isLargeText: boolean): boolean`
  - `getContrastWarning(color1: string, color2: string, isLargeText: boolean): string | null`

---

## Agent 5 – Component Showcase Agent
**Goal:** Render all WhiteLabel components with realistic mock data.

### Inputs
- Component library (`@dejstdm/white-label-ui`)
- Mock data objects

### Outputs
- Rendered component tree
- Scrollable preview page

### Tasks
1. Import all exported components from library.
2. Create mock data for each component (NavBar items, Hero props, etc.).
3. Render components in logical order (NavBar → Hero → Sections → Footer).
4. Apply theme via `data-theme` attribute on container.
5. Handle component prop requirements (required vs optional).
6. Ensure responsive layout in preview.

### Implementation
- Location: `src/components/ComponentShowcase/ComponentShowcase.tsx`
- Export component: `ComponentShowcase()`
- Mock data: `src/data/mockData.ts`

---

## Agent 6 – Color Palette Editor Agent
**Goal:** Provide intuitive UI for editing theme colors.

### Inputs
- Current palette state
- Update function

### Outputs
- Color picker UI components
- Updated palette values

### Tasks
1. Render color picker for each palette color.
2. Show color swatch with hex value.
3. Display contrast warnings for text/background pairs.
4. Group colors logically (brand, background, text, semantic).
5. Support hex, RGB, HSL input formats.
6. Update theme state on color change.

### Implementation
- Location: `src/components/ThemeEditor/ColorPalette.tsx`
- Dependencies: `@uiw/react-color` or `react-color`
- Export component: `ColorPalette({ themeState })`

---

## Agent 7 – Typography Editor Agent
**Goal:** Provide UI for editing typography families and scales.

### Inputs
- Current typography state
- Update function

### Outputs
- Typography editor UI
- Updated typography values

### Tasks
1. Font family selector (dropdown or input).
2. Font size input/slider (px, rem).
3. Font weight selector (400, 500, 600, 700, etc.).
4. Line height input/slider.
5. Letter spacing input.
6. Preview text sample for each scale.
7. Update theme state on change.

### Implementation
- Location: `src/components/ThemeEditor/TypographyEditor.tsx`
- Export component: `TypographyEditor({ themeState })`

---

## Agent 8 – Export Agent
**Goal:** Generate and download theme.css and theme.manifest.json files.

### Inputs
- Current theme manifest
- Theme name
- Compiler function

### Outputs
- Downloadable files (CSS and JSON)

### Tasks
1. Compile manifest to CSS string.
2. Create Blob from CSS string.
3. Trigger download via `<a>` element.
4. Generate filename from brand name.
5. Export manifest JSON (optional).
6. Validate CSS before export (no errors).
7. Show success message after export.

### Implementation
- Location: `src/components/ExportPanel.tsx` and `src/utils/downloadFile.ts`
- Export functions:
  - `downloadCSS(css: string, filename: string): void`
  - `downloadManifest(manifest: ThemeManifest, filename: string): void`

---

## Agent 9 – Import Agent
**Goal:** Load existing theme.manifest.json file for editing.

### Inputs
- File input element
- File (theme.manifest.json)

### Outputs
- Parsed manifest object
- Updated theme state
- Validation errors (if invalid)

### Tasks
1. Read file from input element.
2. Parse JSON content.
3. Validate manifest structure.
4. Update theme state with imported manifest.
5. Show error message if invalid.
6. Extract theme name from manifest or file name.

### Implementation
- Location: `src/components/ThemeEditor/ImportPanel.tsx` and `src/utils/importTheme.ts`
- Export functions:
  - `importTheme(file: File): Promise<{ manifest: ThemeManifest, errors: string[] }>`

---

## Agent 10 – Validation Agent
**Goal:** Validate theme manifest structure and accessibility in real-time.

### Inputs
- Current theme manifest
- Theme schema (optional)

### Outputs
- Validation errors (array)
- Validation warnings (array)
- Accessibility issues (array)

### Tasks
1. Check required manifest sections exist.
2. Validate color format (hex, RGB, etc.).
3. Validate typography scale values (positive numbers).
4. Check spacing array length and values.
5. Run contrast validation on all color pairs.
6. Show validation status in UI (errors block export).
7. Display warnings inline next to controls.

### Implementation
- Location: `src/utils/themeValidator.ts`
- Export functions:
  - `validateManifest(manifest: ThemeManifest): { errors: string[], warnings: string[] }`
  - `validateAccessibility(manifest: ThemeManifest): { issues: string[] }`

---

## Shared Rules for All Agents

- **No Node.js APIs**: All code must run in browser.
- **TypeScript**: Use TypeScript for type safety.
- **Error Handling**: Never crash app, show user-friendly errors.
- **Performance**: Debounce rapid updates (theme compilation).
- **Accessibility**: All UI controls keyboard accessible.
- **Responsive**: Editor works on desktop (sidebar layout) and tablet (collapsible sidebar).

---

## Expected Workflow in Theme Editor

1. **Designer opens app** → Default theme loads.
2. **Designer edits colors** → Live preview updates instantly.
3. **Designer adjusts typography** → Components re-render with new fonts.
4. **Validation runs** → Contrast warnings appear if needed.
5. **Designer exports CSS** → Downloads `theme-{brand}.css` file.
6. **Designer uses CSS** → Imports in production site with `data-theme` attribute.

**Result:**  
Designer creates production-ready theme in 30 minutes, no developer help needed.