# Cursor Agents Specification — WhiteLabel Theming System

---

## Agent 1 – Theme Compiler Agent
**Goal:** Validate and compile `theme.manifest.json` → `theme.css` for Storybook themes.

### Inputs
- `/themes/<brand>/theme.manifest.json`
- `scripts/compile-theme.js` (current validator/generator)

### Outputs
- `/themes/<brand>/dist/theme.css`
- Console warnings/errors from the compiler run (used as the “report”)

### Tasks
1. Run `node scripts/compile-theme.js` so every manifest is parsed.  
2. Verify required palette, typography, spacing, radii, shadows, and grid roles exist; the script already enforces this and logs warnings when data is missing.  
3. Validate `variantsAndHooks` references (done inline inside the compiler).  
4. Generate CSS variables scoped to `[data-theme="<brand>"]`, including fonts, spacing, radii, shadows, and grid tokens.  
5. Write the CSS to `/themes/<brand>/dist/theme.css`. (The output is readable CSS; any minification happens downstream in the consumer build.)  
6. Fail the build only if manifest files are missing or `variantsAndHooks` validation errors are thrown. AA contrast checks are manual today.

---

## Agent 2 – Storybook Docs Agent
**Goal:** Keep component documentation in sync with schema and manifest.

### Inputs
- `packages/components-react/*.stories.tsx`
- `/stories/**/*` (legacy starter kit still rendered in Storybook)
- `/themes/<brand>/theme.manifest.json`

### Outputs
- Updated Storybook stories + MDX notes (Hero, Nav Bar, etc.)
- Controls/argTypes that mirror the latest manifest roles
- Optional screenshots or Chromatic links when regressions are found

### Tasks
1. Keep each component’s `.stories.tsx` file in sync with the component props/TypeScript types.  
2. Surface theming hooks and AA guidance directly inside the story docs/argTypes.  
3. Ensure the 5 MVP components (Nav Bar, Hero, Product Single, FAQ, Footer) always have current stories.  
4. Re-run `npm run compile-themes && npm run storybook` whenever a manifest or schema field changes so docs pick up the new tokens.  
5. Capture visual diffs manually (Chromatic optional) when large styling changes ship—there is no automated screenshot gate yet.

---

## Agent 3 – Schema Governance Agent
**Goal:** Enforce versioning and migration rules.

### Inputs
- `package.json` (source of truth for the published version)  
- `PRD.md` (defines contract + constraints)  
- `reports/ts-review.md` (tracks migration status and open items)

### Outputs
- Updated entry inside `reports/ts-review.md` describing schema/component changes  
- Release notes summary for PRs when a version bump occurs

### Tasks
1. Detect schema or API changes and assign the appropriate SemVer bump (PATCH/MINOR/MAJOR) directly in `package.json`.  
2. Record any breaking change or migration guidance in `reports/ts-review.md` so it is easy to reference later.  
3. Keep PR descriptions up to date with the version change summary (there is no standalone `CHANGELOG.md`).  
4. Ensure CI jobs pin the component + schema versions by consuming the committed `package-lock.json`.

---

## Agent 4 – CI Validator Agent
**Goal:** Run end-to-end checks before merge.

### Tasks
- Run `npm run compile-themes` to ensure every manifest still compiles.  
- Run `npm run typecheck` for the library and `npm run typecheck:stories` for Storybook coverage.  
- Build the package (`npm run build`) and Storybook (`npm run build-storybook`).  
- Surface console warnings for AA/contrast issues so they can be reviewed manually (no automated contrast gate yet).  
- Treat any failure from the commands above as a blocking error.

---

## Shared Rules for All Agents
- Never introduce new roles or scales beyond what the active manifest + `PRD.md` describe.  
- Follow SemVer expectations defined in `PRD.md` and enforced via `package.json`.  
- Reject any change that knowingly breaks AA accessibility (contrast reviews happen manually in Storybook).  
- Log findings in `reports/ts-review.md` or in the PR description so the history stays searchable.

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
