# WhiteLabel Theme Editor — Product Requirements Document (PRD)

## 0. Purpose
Create a **standalone web application** that enables designers to visually create and customize themes for WhiteLabel UI components without writing code or editing JSON files manually. The editor provides live preview of all components and exports production-ready `theme.css` files.

---

## 1. Problem Statement
Designers need to create custom themes for different brands/sites, but currently require:
- Manual editing of `theme.manifest.json` files
- Understanding of JSON structure and theme schema
- Running compilation scripts
- No visual feedback until CSS is generated

This creates a bottleneck where designers depend on developers, slowing down the theming workflow for new sites.

---

## 2. Goal
Deliver a **visual theme editor** that:
1. Provides intuitive UI controls for all theme properties (colors, typography, spacing, etc.)
2. Shows **live preview** of all WhiteLabel components as theme changes
3. Validates accessibility (contrast ratios) in real-time
4. Exports production-ready `theme.css` files
5. Allows importing existing themes for editing

---

## 3. Success Criteria

| # | Metric | Target |
|---|---------|--------|
| 1 | Time to create new theme | ≤ 30 minutes |
| 2 | Designer dependency on developers | 0 |
| 3 | Contrast validation | Real-time AA warnings |
| 4 | Component preview coverage | 100% of exported components |
| 5 | Export success rate | 100% valid CSS output |

---

## 4. Core Architecture

### Application Structure
- **Standalone React/Vite app** (separate from main library)
- **Two-panel layout**: Sidebar (controls) + Main area (component preview)
- **Browser-based theme compiler** (port of `scripts/compile-theme.js`)
- **Live CSS injection** via `<style>` tag updates
- **Direct component rendering** (no iframe)

### Technology Stack
- React 18+ with TypeScript
- Vite for build/dev server
- Color picker library (`@uiw/react-color` or `react-color`)
- Component library: `@dejstdm/white-label-ui` (consumed as npm package)

---

## 5. User Interface Requirements

### Layout
- **Left Sidebar (350px width, scrollable)**:
  - Theme metadata (brand name, version)
  - Color palette editor (brand, background, text, semantic colors)
  - Typography editor (font families, scales)
  - Spacing editor (spacing scale array)
  - Border radius editor
  - Shadows editor
  - Export panel

- **Main Area (flexible width, scrollable)**:
  - Live preview of all components:
    - NavBar
    - Hero
    - TextSection
    - ProductSlider
    - RecipeSlider
    - FAQ
    - ImageSection
    - SocialMediaFeed
    - Footer
  - Components render with current theme applied
  - Scrollable single-page layout (like tweakcn.com)

### UI Controls

#### Color Palette
- Color picker with visual swatch
- Hex input field with validation
- RGB/RGBA support
- Contrast ratio indicator (AA/AAA badges)
- Warning for low contrast pairs

#### Typography
- Font family selector (dropdown)
- Font size slider/input (px, rem)
- Font weight selector
- Line height slider/input
- Letter spacing input

#### Spacing
- Array of spacing values
- Visual slider for each spacing step
- Preset spacing scales (2px → 48px)

#### Border Radius
- Visual selector for each radius level (none, sm, md, pill)
- Pixel input with preview

#### Shadows
- Shadow editor with visual preview
- Box shadow input (CSS format)

---

## 6. Functionality Requirements

### Theme Management
1. **Load Default Theme**: Start with `themes/default/theme.manifest.json`
2. **Import Theme**: Load existing `theme.manifest.json` file
3. **Create New Theme**: Start from default or blank template
4. **Save Theme**: Download `theme.manifest.json` (optional local storage)
5. **Export CSS**: Download compiled `theme.css` file

### Live Preview
1. **Real-time Updates**: Theme changes reflect immediately in component preview
2. **CSS Injection**: Compiled CSS injected as `<style>` tag in `<head>`
3. **Theme Attribute**: Preview container uses `data-theme="custom"` attribute
4. **Component Props**: All components use realistic mock data

### Validation
1. **Contrast Checking**: Validate color pairs against WCAG AA (4.5:1 for text)
2. **Schema Validation**: Ensure manifest structure matches schema
3. **Real-time Warnings**: Show inline warnings for accessibility issues
4. **Export Validation**: Verify CSS compiles correctly before download

### Export Functionality
1. **CSS Export**: Download `theme-{brandName}.css` file
2. **Manifest Export**: Download `theme.manifest.json` file
3. **Both Formats**: Option to export both files at once
4. **File Naming**: Use brand name from metadata

---

## 7. Data Flow

1. **User edits control** (e.g., color picker) →
2. **Theme state updates** (React state) →
3. **Theme compiler runs** (browser-based) →
4. **CSS string generated** →
5. **CSS injected into `<style>` tag** →
6. **Components update automatically** (CSS variables change) →
7. **User sees live preview**

---

## 8. Component Preview Requirements

### Mock Data
Each component needs realistic mock props:
- **NavBar**: Navigation items array
- **Hero**: Background image, headline, body, button
- **TextSection**: Headline, content HTML
- **ProductSlider**: Product array with images, names, links
- **RecipeSlider**: Recipe array with images, titles, descriptions
- **FAQ**: FAQ items with questions and answers
- **ImageSection**: Image gallery array
- **SocialMediaFeed**: Social posts array
- **Footer**: Logo, links, copyright

### Layout
- Single scrollable page
- Components stack vertically
- Realistic spacing between sections
- Mobile-responsive preview option (viewport toggle)

---

## 9. Theme Compiler (Browser Version)

### Requirements
- Port `scripts/compile-theme.js` logic to browser-safe TypeScript
- No Node.js filesystem APIs
- Generate CSS string in memory
- Support all manifest sections:
  - Palette (colors with RGB variants)
  - Typography (families and scales)
  - Spacing (array to CSS variables)
  - Radii (object to CSS variables)
  - Shadows (object to CSS variables)
  - Grid (container max widths)

### Output Format
- CSS string matching `themes/<brand>/dist/theme.css` format
- Scoped to `[data-theme="custom"]` selector
- All CSS variables properly formatted
- RGB variants included for all colors

---

## 10. Accessibility Requirements

### Contrast Validation
- **Real-time checking**: Validate color pairs as user edits
- **AA Compliance**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Visual Indicators**: Show pass/fail badges next to color pickers
- **Warning Messages**: Inline warnings for failing pairs

### Keyboard Navigation
- All controls keyboard accessible
- Tab order logical
- Focus indicators visible

### Screen Reader Support
- Proper ARIA labels on all controls
- Live region announcements for theme changes
- Descriptive button labels

---

## 11. Performance Requirements

- **Initial Load**: < 2 seconds
- **Theme Update Latency**: < 100ms (CSS injection)
- **Component Render**: Smooth 60fps scrolling
- **Export Generation**: < 500ms

---

## 12. Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 13. Deployment

### Options
1. **Standalone Hosting**: Deploy as separate web app (e.g., `theme-editor.yourdomain.com`)
2. **Monorepo Integration**: Include in main repo, serve via Vite dev server
3. **Static Build**: Build to static files, host on CDN

### Recommended
- Standalone Vite app in monorepo
- Build command: `npm run build`
- Output: `dist/` folder with static files
- Serve via any static hosting (Vercel, Netlify, GitHub Pages)

---

## 14. Future Enhancements

- **Theme Presets**: Pre-built theme templates
- **Theme Sharing**: URL-based theme sharing (query params)
- **Undo/Redo**: Theme change history
- **Compare Themes**: Side-by-side theme comparison
- **Export to Figma**: Generate Figma color styles
- **Theme Analytics**: Track popular color combinations
- **Multi-brand Preview**: Show multiple themes at once

---

## 15. Constraints

- **No Backend**: Pure client-side application
- **No Database**: Themes stored locally or exported as files
- **No Authentication**: Open tool (optional: add later)
- **Component Library Dependency**: Must use published `@dejstdm/white-label-ui` package

---

## ✅ Acceptance Criteria

- Designer can create new theme without developer help
- All components preview updates in real-time
- Contrast validation shows AA compliance status
- Exported CSS file works in production
- Export format matches existing `theme.css` structure
- Application loads and runs in modern browsers
- UI is intuitive for non-technical users