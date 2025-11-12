# WhiteLabel Theming System — Product Requirements Document (PRD)

## 0. Purpose
Create a unified, automated theming workflow for **WhiteLabel component library** using a single **Theme Manifest** that drives:
- Storybook (component documentation + preview)
- React component library (for Storybook)

The system must let a new brand be themed quickly **without writing new CSS**, only by editing a manifest.

---

## 1. Problem Statement
Current theming for WhiteLabel components is manual and slow.  
Every new brand requires re-styling (colors, typography, spacing).  
No stable contract exists between design and code → inconsistencies + high cost.

---

## 2. Goal
Deliver a **role-based theming architecture** that:

1. Stores all theme data in a single `theme.manifest.json`.  
2. Compiles that manifest into reusable CSS variables (`theme.css`).  
3. Drives Storybook previews from the compiled theme source.  
4. Enforces accessibility and design-system constraints automatically.

---

## 3. Success Criteria

| # | Metric | Target |
|---|---------|--------|
| 1 | Time to apply new brand | ≤ 2 hours |
| 2 | Manual CSS edits per site | 0 |
| 3 | Contrast accessibility compliance | 100 % AA |
| 4 | Components using role-based tokens | 100 % |
| 5 | Version conflicts | None after CI validation |

---

## 4. Core Architecture

### Structure
- `/packages/components-react` – React components plus the MDX/TSX stories Storybook uses for documentation
- `/stories/` – Additional Storybook examples (legacy starter kit kept for reference)
- `/themes/<brand>/` – Theme manifests and compiled CSS (default, 7up, lays)
- `/.storybook/` – Storybook configuration (docs + visual test bed)
- `/scripts/` – Theme compiler and build scripts (e.g., `scripts/compile-theme.js`)
- `/reports/` – Manual engineering reviews such as `ts-review.md`

### Mount selector
`[data-theme="brand-x"]`

---

## 5. Data Contracts

### Theme Manifest v1
Validated JSON describing brand theming.

**Sections**
1. **meta** — brandName, version, schemaVersion, notes  
2. **palette** — role-based colors  
   `bg/page`, `bg/section`, `text/primary`, `text/muted`,  
   `brand/primary`, `brand/on-primary`, `accent/primary`,  
   `border`, `focus-ring`, `success`, `warning`, `danger`  
3. **typography** — families (heading, body – max 2); scales (display, h1–h4, body, small, label); size, lineHeight, weight  
4. **spacing** — 8 steps (2 → 48 px)  
5. **radii** — none | sm | md | pill  
6. **shadows** — none | sm | md | lg  
7. **componentSizing** — per component (e.g., Hero modes)  
8. **mediaPolicy** — allowed ratios per component  
9. **variantsAndHooks** — component variants with element types and theming hooks  
   Each component defines variants (e.g., "button", "link") with:  
   - `element`: HTML element type ("button", "a", "div", "span")  
   - `roles`: Array of color role references (e.g., ["brand/primary", "brand/on-primary"])  
   - `typography`: Typography scale reference (e.g., "label")  
   - `spacing`: Array of spacing step indices (e.g., [2, 4])  
   - `radii`: Border radius key (e.g., "md")  
   Note: Element type is determined by component props (e.g., `href` prop → `<a>`, otherwise `<button>`).  
   Both variants share the same CSS classes since they use identical theme tokens.  
10. **a11y** — contrast pairs, focus-ring role, motion policy

### Hero Sizing Modes
`fixedHeight`, `viewportHeight`, `minHeight`, `aspectRatioCover` — each per breakpoint (sm | md | lg | xl).

### Image Ratios
- Hero/full-width – 16:9 | 21:9 | 4:3 (fallback)  
- Cards/teasers – 1:1 | 4:3  
- Portraits – 3:4 (primary) | 2:3 (optional)

---

## 6. Component Docs (Capability Sheets)

Component documentation currently lives inside the Storybook stories that ship with the repo:
- `packages/components-react/*.stories.tsx` cover every exported component with controls and notes.
- `/stories/*.stories.(ts|js)x` contains the legacy starter kit pages that still mirror the latest tokens.

Each story must continue to call out:
- Purpose and primary use case
- Fields / props (documented through TypeScript definitions + Storybook argTypes)
- Variants + theming hooks sourced from the active manifest
- Accessibility rules and CMS guidance baked into the stories and notes
- QA checklist items inline with the story controls

**MVP components under documentation:** Nav Bar, Hero Section, Product Single, FAQ, Footer (all located in `packages/components-react`).

---

## 7. The Flow

1. Design handoff → roles mapped in Figma.  
2. `theme.manifest.json` authored.  
3. CLI validates + compiles → `theme.css`.  
4. Storybook loads both for preview + docs.  
5. Components use compiled CSS variables for styling.  
6. CI enforces schema + contrast + version checks.

---

## 8. Accessibility Requirements
- WCAG 2.2 AA minimum.  
- Keyboard navigation + focus visible.  
- `focus-ring` token used.  
- Build fails on contrast errors.

---

## 9. Versioning Policy

### Components (SemVer)
- **PATCH** – safe fixes  
- **MINOR** – new variant/prop  
- **MAJOR** – breaking change  

### Theme Schema (SemVer)
- **PATCH** – doc/validation only  
- **MINOR** – new optional role  
- **MAJOR** – renamed / removed role  

Migration notes required on MAJOR.

---

## 10. Presets (after MVP)
- Default theme (baseline)  
- 3 neutral timeless themes  
- 3 bold branded themes

---

## 11. Constraints
- ≤ 16 color roles  
- 8 spacing steps  
- 4 radius levels  
- 4 shadow levels  
- 2 font families  
- No per-brand SCSS overrides

---

## 12. CI Gates
- `npm run compile-themes` to verify every `theme.manifest.json` compiles without warnings
- `npm run typecheck` for the library code
- `npm run typecheck:stories` so Storybook examples stay in sync
- `npm run build` to ensure the package bundles cleanly
- `npm run build-storybook` to verify the docs site renders (visual diffs are manual for now)

---

## 13. Deliverables
1. Theme compiler script (`scripts/compile-theme.js`) that validates manifests and outputs CSS  
2. Theme manifests + compiled CSS for `default`, `7up`, and `lays`  
3. Storybook stories for every exported component (with controls + docs)  
4. Dist bundle + TypeScript declarations produced by `vite build`  
5. `reports/ts-review.md` capturing the current TypeScript migration status

---

## 14. Future Enhancements
- Theme Editor GUI  
- AI contrast / copy QA  
- Multi-brand previews  
- Manifest diff migrations

---

## ✅ Acceptance Criteria
- One manifest → theme-driven components in Storybook  
- All components use role-based CSS vars  
- AA contrast verified  
- 0 manual CSS overrides  
- New brand setup ≤ 2 hours
