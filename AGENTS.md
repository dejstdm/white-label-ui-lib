# Cursor Agents Specification — WhiteLabel Theming System

---

## Agent 1 – Theme Compiler Agent
**Goal:** Validate and compile `theme.manifest.json` → `theme.css` for Storybook themes.

### Inputs
- `/themes/<brand>/theme.manifest.json`
- Theme schema (inline or external schema.json)

### Outputs
- `/themes/<brand>/dist/theme.css`
- `/themes/<brand>/dist/theme-report.json` (contrast + validation)
- Build status (pass/fail)

### Tasks
1. Validate manifest against schema.  
2. Verify all required roles exist.  
3. Compute contrast ratios for declared pairs → AA minimum.  
4. Generate CSS variables scoped to `[data-theme="brand-x"]` for Storybook.  
5. Emit `@font-face`, spacing, radii, shadow variables.  
6. Minify and save `theme.css`.  
7. Fail build if:  
   - Missing roles  
   - Contrast < AA  
   - Invalid scale value  

---

## Agent 2 – Storybook Docs Agent
**Goal:** Keep component documentation in sync with schema and manifest.

### Inputs
- `/packages/components-react/**`
- `/docs/capability-sheet-template.md`
- `/themes/<brand>/theme.manifest.json`

### Outputs
- Generated MDX docs per component  
- Updated Storybook controls for theme roles  
- Screenshot diff reports (optional)

### Tasks
1. Parse component metadata (name, props, variants).  
2. Generate MDX Capability Sheet with theming hooks from manifest.  
3. Inject AA badges (contrast status).  
4. Ensure 5 MVP components (Nav Bar, Hero, Product Single, FAQ, Footer) are documented.  
5. Re-build Storybook when manifest or schema changes.

---

## Agent 3 – Schema Governance Agent
**Goal:** Enforce versioning and migration rules.

### Inputs
- `package.json` (versions)  
- `CHANGELOG.md` entries  
- Theme schema (if defined)

### Outputs
- Validation report  
- Required migration mapping file (if MAJOR)

### Tasks
1. Detect schema changes → determine PATCH / MINOR / MAJOR.  
2. Verify changelog contains migration notes for MAJOR.  
3. Lock component + schema versions in CI.  
4. Generate summary for release PR.

---

## Agent 4 – CI Validator Agent
**Goal:** Run end-to-end checks before merge.

### Tasks
- Validate schema & manifest structure.  
- Run Theme Compiler Agent.  
- Run Storybook Docs Agent.  
- Verify contrast AA pass.  
- Run visual snapshot diff for 5 MVP components.  
- Build Storybook static site.  
- Fail pipeline on any error.

---

## Shared Rules for All Agents
- Never introduce new roles/scales outside schema.  
- Respect SemVer rules from `Versioning Rules.md`.  
- Reject changes that break AA accessibility.  
- Log outputs to `/reports/agents/` directory.

**Note:** Component development rules and standards (including BEM methodology, mobile-first responsive design, Container usage, CMS content handling, and HTML tag styling rules) are documented in `/packages/components-react/AGENTS.md`.

---

## Expected Workflow in Cursor

1. Developer edits `theme.manifest.json`.  
2. **Theme Compiler Agent** runs → `theme.css`.  
3. **Storybook Docs Agent** refreshes docs + previews.  
4. **Schema Governance Agent** checks versions.  
5. **CI Validator Agent** runs everything on PR.

**Result:**  
One manifest → theme-driven components in Storybook, fully validated, no manual CSS.
