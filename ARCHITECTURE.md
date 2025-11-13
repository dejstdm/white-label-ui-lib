# Architecture Documentation

This document describes the current architecture, constraints, data contracts, and design decisions for the WhiteLabel UI Library.

## Current Architecture

### Project Structure

- `/packages/components-react` – React components (TypeScript) plus the MDX/TSX stories Storybook uses for documentation
- `/stories/` – Additional Storybook examples (legacy starter kit kept for reference)
- `/tokens/` – Design tokens (Style Dictionary source)
  - `/tokens/global/` – Shared tokens across all brands (spacing, radii, shadows, grid)
  - `/tokens/brands/<brand>/` – Brand-specific token overrides (colors, typography)
- `/themes/<brand>/` – Theme manifests and compiled CSS (default, 7up, lays)
  - `theme.manifest.json` – Component metadata (`variantsAndHooks`)
  - `dist/theme.css` – Compiled CSS variables (generated from tokens)
  - `dist/tokens.json` – JSON token export (generated)
- `/.storybook/` – Storybook configuration (docs + visual test bed)
- `/scripts/` – Theme compiler and build scripts
  - `scripts/compile-theme.js` – Legacy manifest compiler (backward compatibility)
  - `scripts/compile-themes-sd.js` – Style Dictionary compiler (recommended)
  - `scripts/style-dictionary/` – Custom transforms and formats
- `style-dictionary.config.js` – Style Dictionary configuration

### Mount Selector

Themes are scoped using `[data-theme="brand-x"]` CSS selectors.

## Constraints

The system enforces the following constraints to maintain consistency and simplicity:

- ≤ 16 color roles
- 8 spacing steps
- 4 radius levels
- 4 shadow levels
- 2 font families (heading, body)
- No per-brand SCSS overrides

These constraints ensure the theming system remains maintainable and prevents design system bloat.

## Data Contracts

### Design Tokens (Primary Source)

Design tokens are stored in CTI (Category/Type/Item) structured JSON files and compiled via Style Dictionary.

**Token Structure:**

- **Global tokens** (`tokens/global/`) – Shared across all brands:
  - `size/spacing.json` – Spacing scale (8 steps: 2px → 48px)
  - `size/radii.json` – Border radius values (none, sm, md, pill)
  - `shadow/base.json` – Shadow definitions (sm, md, lg)
  - `grid/system.json` – Grid columns, gutters, container max-widths

- **Brand tokens** (`tokens/brands/<brand>/`) – Brand-specific overrides:
  - `color/brand.json` – Brand colors (primary, on-primary, etc.)
  - `color/background.json` – Background colors (page, section)
  - `color/text.json` – Text colors (primary, muted)
  - `font/family.json` – Font families (heading, body – max 2)
  - `font/scale.json` – Typography scales (display, h1–h6, body, small, label)

**Token References:**

Tokens can reference other tokens using `{token.path}` syntax (e.g., `{font.family.heading}`). Style Dictionary validates these references at compile time.

### Theme Manifest v1

Validated JSON describing component metadata and configuration.

**Sections:**

1. **meta** — brandName, version, schemaVersion, notes
2. **componentSizing** — per component (e.g., Hero modes)
3. **mediaPolicy** — allowed ratios per component
4. **variantsAndHooks** — component variants with element types and theming hooks
   Each component defines variants (e.g., "button", "link") with:
   - `element`: HTML element type ("button", "a", "div", "span")
   - `roles`: Array of color role references (e.g., ["brand/primary", "brand/on-primary"])
   - `typography`: Typography scale reference (e.g., "label")
   - `spacing`: Array of spacing step indices (e.g., [2, 4])
   - `radii`: Border radius key (e.g., "md")
   Note: Element type is determined by component props (e.g., `href` prop → `<a>`, otherwise `<button>`).
   Both variants share the same CSS classes since they use identical theme tokens.
5. **a11y** — contrast pairs, focus-ring role, motion policy

**Note:** Design tokens (colors, typography, spacing, radii, shadows, grid) are now stored in token files, not in the manifest. The manifest focuses on component-specific metadata.

### Hero Sizing Modes

Hero components support the following sizing modes, each configurable per breakpoint (sm | md | lg | xl):

- `fixedHeight` – Fixed pixel height
- `viewportHeight` – Full viewport height
- `minHeight` – Minimum height with content expansion
- `aspectRatioCover` – Maintain aspect ratio with cover behavior

### Image Ratios

Standard image aspect ratios used across components:

- Hero/full-width – 16:9 | 21:9 | 4:3 (fallback)
- Cards/teasers – 1:1 | 4:3
- Portraits – 3:4 (primary) | 2:3 (optional)

## Versioning Policy

### Components (SemVer)

- **PATCH** – safe fixes (bug fixes, documentation updates)
- **MINOR** – new variant/prop (backward compatible additions)
- **MAJOR** – breaking change (API changes, removed props)

### Theme Schema (SemVer)

- **PATCH** – doc/validation only (no functional changes)
- **MINOR** – new optional role (backward compatible additions)
- **MAJOR** – renamed / removed role (breaking changes)

Migration notes are required on MAJOR version changes.

## Accessibility Requirements

The system enforces the following accessibility standards:

- WCAG 2.2 AA minimum compliance
- Keyboard navigation support for all interactive elements
- Focus visible indicators using the `focus-ring` token
- Build fails on contrast errors (manual review in Storybook)

All components must be keyboard accessible and meet contrast requirements.

## Component Documentation Requirements

Component documentation lives in Storybook stories (`packages/components-react/*.stories.tsx`). Each story must include:

- Purpose and primary use case
- Fields / props (documented through TypeScript definitions + Storybook argTypes)
- Variants + theming hooks sourced from the active manifest
- Accessibility rules and CMS guidance baked into the stories and notes
- QA checklist items inline with the story controls

**MVP components under documentation:** Nav Bar, Hero Section, Product Single, FAQ, Footer (all located in `packages/components-react`).

