# Testing Strategy (Storybook Component Library)

This document describes what can be tested in this repository, what is currently configured, and a practical plan to reach high/complete test coverage across all components.

## Current State (Repo Audit)

### What exists

- Storybook is configured in `.storybook/` and includes:
  - `@storybook/addon-a11y` for manual a11y checks in the UI.
  - `@storybook/addon-vitest` with a Vitest project configured to run Storybook tests in a real browser (Playwright + Chromium): `vitest.config.js`.
- Playwright + Vitest browser runner are installed (`playwright`, `@vitest/browser-playwright`).

### What is missing (to achieve “full coverage”)

- No unit/component test files exist (`*.test.*` / `*.spec.*`).
- No `test` / `test:coverage` scripts exist in `package.json`.
- Missing common testing dependencies:
  - `@storybook/test` (recommended for Storybook `play` interaction tests).
  - `@testing-library/react` + `@testing-library/user-event` + `@testing-library/jest-dom` + `jsdom` (recommended for fast unit tests and branch coverage).

## What To Test (Coverage Layers)

To get full coverage for a UI component library, treat “coverage” as layered:

1. **Type safety** (contract coverage)
   - `npm run typecheck`
   - `npm run typecheck:stories`

2. **Story rendering smoke tests** (every story renders without crashing)
   - Best to run in the browser via the existing Storybook+Vitest integration.
   - Ensures Storybook examples are not broken by changes.

3. **Story interaction tests (recommended primary layer)**
   - Add `play` functions to stories to simulate real interactions.
   - Covers behavior *as documented* in Storybook and runs in a real browser.

4. **Unit/component tests (JSDOM)**
   - Covers edge cases/branches that are hard or slow to express in Storybook.
   - Great for utilities, null-return conditions, DOM attribute toggling, event cleanup, and console warnings.

5. **Accessibility checks**
   - Manual: Storybook addon panel for each story.
   - Automated: run `axe` in either Storybook interaction tests or JSDOM unit tests for the highest value stories/components.

6. **Visual regression**
   - Use Chromatic (already present) to detect CSS/layout regressions.

## Recommended Setup (Scripts + Config)

### Add test scripts

Add scripts to `package.json` to make tests runnable in CI:

- `test` (runs all test projects)
- `test:storybook` (storybook project only)
- `test:unit` (jsdom project only)
- `test:coverage` (runs coverage)

Example (recommendation):

```json
{
  "scripts": {
    "test": "vitest",
    "test:storybook": "vitest run --project storybook",
    "test:unit": "vitest run --project unit",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Add a JSDOM unit-test project to Vitest

Your `vitest.config.js` already contains the Storybook browser project. Add a second project for fast unit tests:

- `environment: "jsdom"`
- `setupFiles` for jest-dom matchers
- include pattern like `packages/components-react/**/*.test.{ts,tsx}`

This lets you keep:
- Storybook tests = browser + integration confidence
- Unit tests = fast branch coverage

### Add required dependencies

Recommended dev dependencies for full coverage:

- Story interaction tests:
  - `@storybook/test`
- Unit tests:
  - `@testing-library/react`
  - `@testing-library/user-event`
  - `@testing-library/jest-dom`
  - `jsdom`

Note: installing packages requires network access. If CI is network-restricted, ensure dependencies are vendored/pinned via `package-lock.json`.

## Test Design Guidelines (Library-Specific)

### Prefer Storybook “play” tests for component behavior

Most components in this repo are already demonstrated via stories in `packages/components-react/*.stories.tsx`. Converting those stories to include `play` functions gives:

- behavioral coverage aligned with documentation
- browser-realistic results (layout, focus, keyboard, click)
- easier maintenance (stories stay the single source of truth)

### Use unit tests for edge cases and hard-to-drive code paths

Good unit-test targets in this repo:

- `ResponsiveImage` returning `null` and calling `console.warn` when both sources are missing (`packages/components-react/ResponsiveImage.tsx`).
- `SectionHeader` returning `null` when no content provided (`packages/components-react/SectionHeader.tsx`).
- `Button` anchor vs button rendering, disabled anchor behavior (`packages/components-react/Button.tsx`).
- Event listener cleanup for Escape handlers (`NavBar`, `SocialMediaFeed`).

### Swiper-based components: test logic, not Swiper internals

Components using Swiper:

- `ProductSlider` (`packages/components-react/ProductSlider.tsx`)
- `RecipeSlider` (`packages/components-react/RecipeSlider.tsx`)
- `ImageSection` (`packages/components-react/ImageSection.tsx`)

Recommended approach:

- Unit tests: mock `swiper/react` to a simple wrapper and assert:
  - navigation buttons appear only when expected
  - `allowTouchMove` toggles correctly
  - wrapper/element classes switch (`--static` variants)
- Storybook browser tests: validate at least one “navigation enabled” and one “navigation disabled” scenario and optionally resize viewport to validate breakpoints.

## Component Coverage Checklist (What To Assert)

This list is intended as a checklist to reach high coverage quickly.

### Public/exported components

Exported from `packages/components-react/index.ts`:

- `NavBar` (`packages/components-react/NavBar.tsx`)
  - toggles mobile menu, `aria-expanded`, `aria-controls`
  - closes on `Escape`
  - closes on link click
  - active link uses `aria-current="page"`
  - renders with/without logo
- `Footer` (`packages/components-react/Footer.tsx`)
  - renders links as `<a>` when `href` exists else `<span>`
  - social icon rendering requires `icon`
  - renders default copyright fallback
- `Hero` (`packages/components-react/Hero.tsx`)
  - background image present/absent
  - CTA button uses `inverted` when background image exists
  - CMS HTML fields render through `WysiwygContent`
- `TextSection` (`packages/components-react/TextSection.tsx`)
  - section header optional
  - `text` HTML renders through `WysiwygContent`
- `ImageSection` (`packages/components-react/ImageSection.tsx`)
  - returns `null` when `images.length === 0`
  - single-image layout vs Swiper layout
  - external link images get `target="_blank"` + `rel="noopener noreferrer"`
- `ProductSlider` (`packages/components-react/ProductSlider.tsx`)
  - navigation enabled only when `products.length` exceeds computed `slidesPerView`
  - wrapper class switches to `--static` when navigation disabled
- `ProductOverview` (`packages/components-react/ProductOverview.tsx`)
  - grid vs zig-zag layout
  - “Load more” appears only for grid with more than initial count
  - `loadMoreOnClick` vs default behavior (prevent default + show all)
- `ProductDetail` (`packages/components-react/ProductDetail.tsx`)
  - variant switching (`overview|compact|tabs`)
  - CTA only in `compact|tabs` when label exists
  - tabs switch visible panel and maintain a11y attributes
  - nutritional table only in `overview|compact` when provided
- `RecipeSlider` (`packages/components-react/RecipeSlider.tsx`)
  - navigation/pagination only when recipes exceed slides per view
  - optional header CTA button when label provided
- `FAQ` (`packages/components-react/FAQ.tsx`)
  - maps items into Accordion
  - `collapseMode` drives `allowMultiple`
- `SocialMediaFeed` (`packages/components-react/SocialMediaFeed.tsx`)
  - confirm external links: dialog opens on click; Escape closes
  - “Leave” calls `window.open` and closes
  - platform badge renders only when `platformIcon` is provided

### Internal building blocks (still worth testing)

Not exported publicly (per `packages/components-react/index.ts` comment) but important:

- `Accordion` (`packages/components-react/Accordion.tsx`): single vs multiple open, `aria-expanded`, `hidden` handling.
- `Button` (`packages/components-react/Button.tsx`): anchor vs button rendering; disabled anchor semantics.
- `SectionHeader` (`packages/components-react/SectionHeader.tsx`): clamps heading level; returns null without content.
- `WysiwygContent` (`packages/components-react/WysiwygContent.tsx`): returns null on empty; wraps HTML correctly.
- `ResponsiveImage` (`packages/components-react/ResponsiveImage.tsx`): returns null + warn when missing sources.

## CI Recommendations

Recommended blocking checks before merge (aligning with repo conventions):

1. `npm run compile-themes:sd`
2. `npm run typecheck && npm run typecheck:stories`
3. `npm run build && npm run build-storybook`
4. `npm run test` and `npm run test:coverage`

## Network / Determinism Notes

- `.storybook/preview-head.html` includes Google Fonts. In restricted or offline CI this may:
  - slow tests,
  - fail intermittently,
  - change visual diffs.

Recommendation: provide a CI-safe option to disable external font loading during tests (either via conditional includes or by hosting fonts locally).

