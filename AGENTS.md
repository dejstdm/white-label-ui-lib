# Cursor Agents Specification — WhiteLabel Theming System

---

## Agent 1 – Theme Compiler Agent
**Goal:** Validate and compile `theme.manifest.json` → `theme.css`.

### Inputs
- `/themes/<brand>/theme.manifest.json`
- `/packages/theme-schema/schema.json`

### Outputs
- `/themes/<brand>/dist/theme.css`
- `/themes/<brand>/dist/theme-report.json` (contrast + validation)
- Build status (pass/fail)

### Tasks
1. Validate manifest against schema.  
2. Verify all required roles exist.  
3. Compute contrast ratios for declared pairs → AA minimum.  
4. Generate CSS variables scoped to `[data-theme="brand-x"]`.  
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

## Agent 3 – Drupal Packager Agent
**Goal:** Package compiled theme for Drupal base theme.

### Inputs
- `/themes/<brand>/dist/theme.css`
- `/packages/drupal-theme/**`

### Outputs
- `/packages/drupal-theme/brands/<brand>/theme.css`
- `/packages/drupal-theme/brands/<brand>/manifest.json`

### Tasks
1. Copy compiled CSS into Drupal theme structure.  
2. Update `libraries.yml` and `info.yml` entries.  
3. Validate Twig templates use only CSS vars (not hardcoded colors).  
4. Run AA check against key templates.  
5. Report status to CI summary.

---

## Agent 4 – Schema Governance Agent
**Goal:** Enforce versioning and migration rules.

### Inputs
- `package.json` (versions)  
- `CHANGELOG.md` entries  
- `/packages/theme-schema/schema.json`

### Outputs
- Validation report  
- Required migration mapping file (if MAJOR)

### Tasks
1. Detect schema changes → determine PATCH / MINOR / MAJOR.  
2. Verify changelog contains migration notes for MAJOR.  
3. Lock component + schema versions in CI.  
4. Generate summary for release PR.

---

## Agent 5 – CI Validator Agent
**Goal:** Run end-to-end checks before merge.

### Tasks
- Validate schema & manifest structure.  
- Run Theme Compiler Agent.  
- Run Storybook Docs Agent.  
- Verify contrast AA pass.  
- Run visual snapshot diff for 5 MVP components.  
- Fail pipeline on any error.

---

## Shared Rules for All Agents
- Never introduce new roles/scales outside schema.  
- Respect SemVer rules from `Versioning Rules.md`.  
- Reject changes that break AA accessibility.  
- Log outputs to `/reports/agents/` directory.

---

## Expected Workflow in Cursor

1. Developer edits `theme.manifest.json`.  
2. **Theme Compiler Agent** runs → `theme.css`.  
3. **Storybook Docs Agent** refreshes docs + previews.  
4. **Drupal Packager Agent** updates base theme.  
5. **Schema Governance Agent** checks versions.  
6. **CI Validator Agent** runs everything on PR.

**Result:**  
One manifest → same visuals in Storybook and Drupal, fully validated, no manual CSS.
