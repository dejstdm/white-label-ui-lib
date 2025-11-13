# Cursor Agents Specification — WhiteLabel Theming System

---

## Agent 1 – Theme Compiler Agent
**Goal:** Validate and compile design tokens → `theme.css` for Storybook themes using Style Dictionary.

### Inputs
- `tokens/global/**/*.json` (shared tokens: spacing, radii, shadows, grid)
- `tokens/brands/<brand>/**/*.json` (brand-specific tokens: colors, typography)
- `/themes/<brand>/theme.manifest.json` (component metadata: `variantsAndHooks`)
- `style-dictionary.config.js` (Style Dictionary configuration)
- `scripts/compile-theme.js` (legacy manifest compiler, maintained for backward compatibility)

### Outputs
- `/themes/<brand>/dist/theme.css` (CSS variables scoped to `[data-theme="<brand>"]`)
- `/themes/<brand>/dist/tokens.json` (JSON token export for documentation/tooling)
- Console warnings/errors from the compiler run (used as the "report")

### Tasks
1. Run `npm run compile-themes:sd` (or `node scripts/compile-themes-sd.js`) to compile all brands using Style Dictionary.  
2. Verify token files exist in `tokens/global/` and `tokens/brands/<brand>/` directories.  
3. Validate token references (Style Dictionary validates `{token.path}` syntax automatically).  
4. Generate CSS variables scoped to `[data-theme="<brand>"]`, including colors (with RGB variants), typography, spacing, radii, shadows, and grid tokens.  
5. Write outputs to `/themes/<brand>/dist/theme.css` and `/themes/<brand>/dist/tokens.json`. (The CSS output is readable; any minification happens downstream in the consumer build.)  
6. Validate `variantsAndHooks` references in `theme.manifest.json` (component metadata, not tokens).  
7. Fail the build only if token files are missing, reference errors occur, or `variantsAndHooks` validation errors are thrown. AA contrast checks are manual today.

**Note:** The legacy manifest compiler (`npm run compile-themes`) is still available for backward compatibility but Style Dictionary is the recommended approach.

---

## Agent 2 – Storybook Docs Agent
**Goal:** Keep component documentation in sync with schema and manifest.

### Inputs
- `packages/components-react/*.stories.tsx`
- `/stories/**/*` (legacy starter kit still rendered in Storybook)
- `/themes/<brand>/theme.manifest.json` (component metadata)
- `tokens/brands/<brand>/**/*.json` (design tokens for controls/argTypes)

### Outputs
- Updated Storybook stories + MDX notes (Hero, Nav Bar, etc.)
- Controls/argTypes that mirror the latest manifest roles
- Optional screenshots or Chromatic links when regressions are found

### Tasks
1. Keep each component’s `.stories.tsx` file in sync with the component props/TypeScript types.  
2. Surface theming hooks and AA guidance directly inside the story docs/argTypes.  
3. Ensure the 5 MVP components (Nav Bar, Hero, Product Single, FAQ, Footer) always have current stories.  
4. Re-run `npm run compile-themes:sd && npm run storybook` whenever tokens or manifest fields change so docs pick up the new tokens.  
5. Capture visual diffs manually (Chromatic optional) when large styling changes ship—there is no automated screenshot gate yet.

---

## Agent 3 – Schema Governance Agent
**Goal:** Enforce versioning and migration rules.

### Inputs
- `package.json` (source of truth for the published version)  
- `ARCHITECTURE.md` (defines contract + constraints)  
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
- Run `npm run compile-themes:sd` to ensure all tokens compile successfully.  
- Run `npm run typecheck` for the library and `npm run typecheck:stories` for Storybook coverage.  
- Build the package (`npm run build`) and Storybook (`npm run build-storybook`).  
- Surface console warnings for AA/contrast issues so they can be reviewed manually (no automated contrast gate yet).  
- Treat any failure from the commands above as a blocking error.

---

## Shared Rules for All Agents
- Never introduce new roles or scales beyond what the active manifest + `ARCHITECTURE.md` describe.  
- Follow SemVer expectations defined in `ARCHITECTURE.md` and enforced via `package.json`.  
- Reject any change that knowingly breaks AA accessibility (contrast reviews happen manually in Storybook).  
- Log findings in `reports/ts-review.md` or in the PR description so the history stays searchable.

**Note:** Component development rules and standards (including BEM methodology, mobile-first responsive design, Container usage, CMS content handling, and HTML tag styling rules) are documented in `/packages/components-react/AGENTS.md`.

---

## Documentation

### Documentation Files

The project maintains the following documentation files:

- `README.md` - User-facing documentation (installation, usage, components, theming system)
- `AGENTS.md` - Agent specifications for theming workflow (this file)
- `ARCHITECTURE.md` - Current architecture, constraints, data contracts, versioning policy
- `ROADMAP.md` - Future plans and research items
- `docs/STYLE_DICTIONARY.md` - Guide for working with design tokens
- `packages/components-react/AGENTS.md` - Component development rules

### Documentation Maintenance Rules

**CRITICAL: Documentation MUST be kept up-to-date with code changes.**

1. **On completion of ANY task**, check if documentation needs updating.
2. **Documentation updates are part of the task completion checklist** - do not mark a task complete until relevant documentation has been reviewed and updated.
3. **Update relevant documentation files when:**
   - Architecture changes → update `ARCHITECTURE.md`
   - New features added → update `README.md`, `ROADMAP.md` if it was a planned item
   - Constraints change → update `ARCHITECTURE.md`
   - Workflow changes → update `AGENTS.md`, `README.md`
   - Token structure changes → update `ARCHITECTURE.md`, `docs/STYLE_DICTIONARY.md`
   - Component API changes → update `README.md`, component stories
   - New documentation files created → update this list in `AGENTS.md`

4. **Before completing any task**, verify:
   - All affected documentation files have been reviewed
   - Changes are reflected in the appropriate documentation
   - No outdated information remains
   - New features/patterns are documented

5. **When in doubt**, err on the side of updating documentation. It's better to have slightly redundant information than outdated information.

---

## Expected Workflow in Cursor

1. Developer edits tokens in `tokens/global/` or `tokens/brands/<brand>/` (or `theme.manifest.json` for component metadata).  
2. **Theme Compiler Agent** runs Style Dictionary → `theme.css` + `tokens.json`.  
3. **Storybook Docs Agent** refreshes docs + previews.  
4. **Schema Governance Agent** checks versions.  
5. **CI Validator Agent** runs everything on PR.

**Result:**  
Tokens → theme-driven components in Storybook, fully validated, no manual CSS.
