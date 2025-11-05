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
- `/packages/components-react` - React components for Storybook
- `/themes/<brand>/` - Theme manifests and compiled CSS
- `/.storybook/` - Storybook configuration (docs + visual test bed)
- `/scripts/` - Theme compiler and build scripts
- `/docs/` - Documentation templates

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

Each component documented with:
- Purpose  
- Fields / props  
- Variants  
- Theming hooks  
- Accessibility rules  
- Responsive behavior  
- CMS guidance  
- QA checklist  

**MVP components**
1. Nav Bar  
2. Hero Section  
3. Product Single  
4. FAQ  
5. Footer

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
- Schema validation  
- Contrast AA check  
- Storybook snapshot diffs (5 MVP components)  
- Version bump verification  
- No undeclared roles/scales

---

## 13. Deliverables
1. Theme compiler script (validator + CSS generator)  
2. `theme.manifest.json` (default theme)  
3. `theme.css` output  
4. Storybook demo (5 components + docs)  
5. Automated tests + CI config

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
