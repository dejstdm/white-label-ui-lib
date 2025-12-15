# WhiteLabel UI Library

A Storybook component library with a role-based theming system. Components use design tokens (compiled via Style Dictionary) and theme manifests that compile to CSS variables, enabling rapid brand customization through configuration rather than code changes.

## About This Project

### Problem Statement

Current theming for WhiteLabel components is manual and slow. Every new brand requires re-styling (colors, typography, spacing). No stable contract exists between design and code, leading to inconsistencies and high maintenance costs.

### Success Criteria

The project aims to achieve the following goals (aspirational targets):

| Metric | Target |
|--------|--------|
| Time to apply new brand | ≤ 2 hours |
| Manual CSS edits per site | 0 |
| Contrast accessibility compliance | 100% AA |
| Components using role-based tokens | 100% |
| Version conflicts | None after CI validation |

## Project Structure

```
/
├── packages/
│   └── components-react/  # React component library
│       ├── *.tsx          # Component implementations (TypeScript)
│       ├── *.css          # Component styles
│       ├── *.stories.tsx  # Storybook stories
│       ├── index.ts       # Component exports
│       └── AGENTS.md      # Component development rules
├── stories/               # Additional Storybook example stories
│   └── assets/           # Story assets (images, SVGs)
├── themes/               # Brand-specific theme manifests
│   ├── default/          # Default theme
│   │   ├── theme.manifest.json
│   │   └── dist/
│   │       ├── theme.css
│   │       └── tokens.json
│   ├── 7up/              # 7up brand theme
│   │   ├── theme.manifest.json
│   │   └── dist/
│   │       ├── theme.css
│   │       └── tokens.json
│   └── lays/             # Lays brand theme
│       ├── theme.manifest.json
│       └── dist/
│           ├── theme.css
│           └── tokens.json
├── tokens/               # Design tokens (Style Dictionary source)
│   ├── global/           # Shared tokens across all brands
│   │   ├── size/         # Spacing, radii
│   │   ├── shadow/       # Shadow definitions
│   │   └── grid/         # Grid system
│   └── brands/           # Brand-specific token overrides
│       ├── default/
│       ├── 7up/
│       └── lays/
├── scripts/
│   ├── compile-theme.js       # Legacy manifest compiler
│   ├── compile-themes-sd.js   # Style Dictionary compiler
│   └── style-dictionary/      # Custom transforms and formats
├── style-dictionary.config.js # Style Dictionary configuration
├── .storybook/           # Storybook configuration
│   ├── main.js           # Storybook config
│   ├── preview.jsx       # Storybook preview setup
│   └── vitest.setup.js   # Vitest test setup
├── templates/            # Template files
├── reports/              # Engineering audits and manual reviews
│   └── ts-review.md      # Current TypeScript migration audit
├── ARCHITECTURE.md       # Architecture, constraints, data contracts
├── ROADMAP.md            # Future plans and research items
└── AGENTS.md             # Agent specifications for theming system
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install --ignore-scripts
```

**Note:** If you encounter esbuild permission errors on Windows, use `--ignore-scripts` flag. You may need to manually unblock the esbuild executable in Windows (right-click → Properties → Unblock).

### Development

Start Storybook (automatically compiles themes):

```bash
npm run storybook
```

Storybook will open at `http://localhost:6006`

### Available Scripts

- `npm run build` - Build the component library for production (creates `dist/` folder)
- `npm run prepublishOnly` - Automatically runs build before publishing
- `npm run storybook` - Start Storybook dev server (compiles themes automatically)
- `npm run build-storybook` - Build static Storybook site (compiles themes automatically)
- `npm run typecheck` - Run TypeScript type checking
- `npm run typecheck:stories` - Type-check Storybook stories with `tsconfig.stories.json`
- `npm run compile-themes` - Compile all theme manifests to CSS (legacy compiler)
- `npm run compile-themes:sd` - Compile all themes using Style Dictionary (recommended)
- `npm run compile-themes:watch` - Watch mode for Style Dictionary compilation (development)

### Publishing to npm

#### Prerequisites: GitHub Packages Authentication

**Quick Setup (Copy & Paste):**

1. **Get GitHub token:** Go to [GitHub Settings → Tokens](https://github.com/settings/tokens) → Generate new token (classic) → Select `write:packages` scope → Copy token

2. **Setup project config:**
   ```bash
   cp .npmrc.example .npmrc
   ```

3. **Set token (one-time, persistent):**
   ```bash
   # Linux/Mac/WSL
   echo 'export NPM_TOKEN=YOUR_TOKEN_HERE' >> ~/.zshrc  # or ~/.bashrc
   source ~/.zshrc
   
   # Windows PowerShell
   Add-Content $PROFILE "`$env:NPM_TOKEN='YOUR_TOKEN_HERE'"
   ```

4. **Verify:**
   ```bash
   npm whoami --registry=https://npm.pkg.github.com
   ```

Replace `YOUR_TOKEN_HERE` with your actual token. Done! The token will be available in all future terminal sessions.

---

**Detailed Instructions:**

**Step 1: Create a GitHub Personal Access Token**

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `npm-publish-white-label-ui`
4. Set expiration (recommend 90 days)
5. **Select required scopes:**
   - ✅ `write:packages` (REQUIRED for publishing)
   - ✅ `read:packages`
6. Click **"Generate token"** and **COPY IT IMMEDIATELY**

**Step 2: Configure npm Authentication**

The project uses environment variables for cross-platform compatibility:

1. Copy the example file: `cp .npmrc.example .npmrc`
2. Add token to your shell profile (makes it persistent):

   **Linux/Mac/WSL (zsh):**
   ```bash
   echo 'export NPM_TOKEN=YOUR_TOKEN_HERE' >> ~/.zshrc
   source ~/.zshrc
   ```
   
   **Linux/Mac/WSL (bash):**
   ```bash
   echo 'export NPM_TOKEN=YOUR_TOKEN_HERE' >> ~/.bashrc
   source ~/.bashrc
   ```
   
   **Windows (PowerShell):**
   ```powershell
   Add-Content $PROFILE "`$env:NPM_TOKEN='YOUR_TOKEN_HERE'"
   ```

**Step 3: Verify Authentication**

```bash
npm whoami --registry=https://npm.pkg.github.com
```

Should display your GitHub username. If it fails, check:
- Token has `write:packages` permission
- Token hasn't expired
- Token was copied correctly (no extra spaces)

**Troubleshooting:**

| Error | Solution |
|-------|----------|
| `401 Unauthorized` | Token invalid/expired or missing `write:packages`. Create new token. |
| `403 Forbidden` | Token missing `write:packages` scope. Regenerate with correct permissions. |
| `npm whoami` fails | Check token: `echo $NPM_TOKEN`. If empty, reload shell: `source ~/.zshrc` |

**Important:**
- Never commit your token. `.npmrc` is in `.gitignore`.
- Token is stored in your shell profile (`~/.zshrc`/`~/.bashrc`), not in the project.
- Works on Windows, Mac, and Linux/WSL (use PowerShell profile on Windows).
- Tokens expire - create a new one when needed.

#### Interactive Publishing Script (Recommended)

The easiest way to publish is using the interactive script:

```bash
npm run publish:interactive
```

This script will:
- Check if your git worktree is clean
- Prompt you to choose a version bump (patch/minor/major) or skip
- Optionally refresh dependencies
- Compile themes, build the library, publish, and push to git
- Show clear progress indicators for each step

#### Manual Publishing

Alternatively, you can follow this flow manually:

1. **Ensure authentication is set up** (see Prerequisites section above)
2. Ensure your git worktree is clean: `git status`
3. Bump the version and generate a tag: `npm version patch` (or `minor`/`major`)
4. (Optional) Refresh dependencies: `npm install --ignore-scripts`
5. Compile themes so `themes/*/dist/theme.css` are current: `npm run compile-themes:sd`
6. Build the library: `npm run build`
7. Publish: `npm publish` (package.json `publishConfig` points to GitHub Packages)
8. Push commit and tag: `git push --set-upstream origin main && git push --tags`

## Using the Package in Your Project

### Installation

Install the package from GitHub Packages:

```bash
npm install @dejstdm/white-label-ui
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom swiper
```

**Note:** `swiper` is required if you're using slider components (`ProductSlider`, `RecipeSlider`, `ImageSection`).

### Importing Components

Import components from the package:

```javascript
import { NavBar, Hero, Footer, TextSection, ImageSection, ProductSlider, ProductOverview, ProductDetail, RecipeSlider, FAQ, SocialMediaFeed } from '@dejstdm/white-label-ui';
```

You can import individual components for better tree-shaking:

```javascript
import { NavBar } from '@dejstdm/white-label-ui';
import { Hero } from '@dejstdm/white-label-ui';
```

**Note:** Only standalone page-level components are exported. Internal building blocks like `Container`, `Button`, `Heading`, and `Text` are not exported as they are used internally by the exported components.

### Importing Styles

**Required:** Import the component styles CSS file in your application. The **default theme is automatically included** and works out of the box:

```javascript
// In your main app file (e.g., app/layout.tsx for Next.js, or index.js for Create React App)
import '@dejstdm/white-label-ui/dist/style.css';
```

**That's it!** Components will work immediately with the default theme. No additional setup needed.

### Using Other Themes

If you want to use a different theme (e.g., `7up`), import the theme CSS and apply it using the `data-theme` attribute:

```javascript
// Import the theme CSS
import '@dejstdm/white-label-ui/themes/7up/dist/theme.css';

// Apply the theme to your app
export default function RootLayout({ children }) {
  return (
    <html data-theme="7up">
      <body>{children}</body>
    </html>
  );
}
```

**Available themes:**
- `default` - Automatically included, no import needed
- `7up` - Import from `@dejstdm/white-label-ui/themes/7up/dist/theme.css`
- `lays` - Import from `@dejstdm/white-label-ui/themes/lays/dist/theme.css`

### Brand Logos

- `NavBar` and `Footer` expose simple `logoSrc` and `logoAlt` props for dropping in any brand mark.
- Provide whatever image URL your integration needs; the components render it inside `.navbar__logo` and `.footer__logo` using a native `<img>` tag.
- Omit `logoSrc` when you want to hide the brand mark entirely. No fallback logo is rendered automatically.

### Swiper CSS (Required for Slider Components)

If you're using slider components (`ProductSlider`, `RecipeSlider`, `ImageSection`), you also need to import Swiper CSS:

```javascript
import 'swiper/css';
import 'swiper/css/navigation';  // For navigation arrows
import 'swiper/css/pagination';  // For pagination dots (used in RecipeSlider)
```

### Complete Usage Example

**Basic usage (default theme):**

```javascript
// app/layout.tsx (Next.js App Router)
import '@dejstdm/white-label-ui/dist/style.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
import { Hero, NavBar, TextSection } from '@dejstdm/white-label-ui';
import 'swiper/css';  // If using slider components
import 'swiper/css/navigation';

export default function HomePage() {
  // Navigation items array
  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* NavBar - sticky navigation with items */}
      <NavBar 
        items={navItems}
        sticky={true}
      />
      
      {/* Hero section - each component manages its own Container internally */}
      <Hero 
        backgroundImage="/path/to/hero-image.jpg"
        subheadline="<p>Welcome to our site</p>"
        headline="Amazing Products for Everyone"
        body="<p>Discover our collection of high-quality products designed to make your life better.</p>"
        buttonLabel="Shop Now"
        buttonHref="/products"
      />
      
      {/* TextSection - also has Container built-in, no need to wrap */}
      <TextSection 
        headline="About Us"
        content="<p>We are a company dedicated to excellence...</p>"
      />
    </>
  );
}
```

**Using a different theme:**

```javascript
// app/layout.tsx
import '@dejstdm/white-label-ui/dist/style.css';
import '@dejstdm/white-label-ui/themes/7up/dist/theme.css';

export default function RootLayout({ children }) {
  return (
    <html data-theme="7up">
      <body>{children}</body>
    </html>
  );
}
```

**RecipeSlider usage examples:**

```javascript
import { RecipeSlider } from '@dejstdm/white-label-ui';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Image-only variation (default)
const imageOnlyRecipes = [
  {
    id: 1,
    image: '/recipes/recipe1.jpg',
    imageAlt: 'Recipe 1',
    href: '/recipes/recipe1',
  },
  {
    id: 2,
    image: '/recipes/recipe2.jpg',
    imageAlt: 'Recipe 2',
    href: '/recipes/recipe2',
  },
];

<RecipeSlider
  headline="Our Recipes"
  subheadline="<p>Discover delicious recipes</p>"
  variant="image-only"
  recipes={imageOnlyRecipes}
/>

// With-content variation (shows title and read more button)
const recipesWithContent = [
  {
    id: 1,
    image: '/recipes/recipe1.jpg',
    imageAlt: 'Recipe 1',
    href: '/recipes/recipe1',
    title: 'Delicious Recipe 1',
    readMoreLabel: 'Read More',
    readMoreHref: '/recipes/recipe1',
  },
  {
    id: 2,
    image: '/recipes/recipe2.jpg',
    imageAlt: 'Recipe 2',
    href: '/recipes/recipe2',
    title: 'Amazing Recipe 2',
    readMoreLabel: 'View Recipe',
    readMoreHref: '/recipes/recipe2',
  },
];

<RecipeSlider
  headline="Featured Recipes"
  subheadline="<p>Check out our most popular recipes</p>"
  variant="with-content"
  recipes={recipesWithContent}
  headerButtonLabel="View All Recipes"
  headerButtonHref="/recipes"
/>
```

### Builder.io Integration

This package is designed to work with Builder.io and other visual page builders. Components are pre-built and ready to use:

1. Install the package and peer dependencies
2. Import the CSS file in your application root (e.g., `app/layout.tsx`)
3. Import components in your Builder.io component registry
4. Components will work out of the box with the default theme

**No additional theme setup required** - the default theme is automatically included and applied at the root level.

### Builder.io Fusion Integration

This package includes metadata files for Builder.io Fusion, enabling AI-powered page generation using your components.

#### Setup

1. **Install the package:**
```bash
npm install @dejstdm/white-label-ui
```

2. **Create `fusion.config.ts` in your project root** (not in the package, in your consuming project):
```typescript
import { defineAgent } from '@builder.io/fusion';

export default defineAgent({
  name: 'white-label-ui-agent',
  designSystem: {
    path: './node_modules/@dejstdm/white-label-ui',
    components: './node_modules/@dejstdm/white-label-ui/dist',
    metadata: './node_modules/@dejstdm/white-label-ui/meta/*.meta.ts',
  },
  constraints: { 
    maxDepth: 6, 
    allowedCategories: ['layout', 'display', 'navigation'],
    disallowRawHtml: true 
  },
  guidance: {
    brandVoice: 'clean, modern, minimal',
    layoutGoals: ['balanced whitespace', 'clear hierarchy'],
    a11yGoals: ['focus-visible', 'sufficient contrast', 'semantic headings']
  }
});
```

3. **Import CSS in your app root:**
```javascript
// app/layout.tsx (Next.js)
import '@dejstdm/white-label-ui/dist/style.css';
import 'swiper/css';  // If using slider components
import 'swiper/css/navigation';
import 'swiper/css/pagination';
```

4. **Register components in Builder.io:**
```javascript
// Register components with Builder.io
import { 
  NavBar, Hero, Footer, TextSection, ImageSection,
  ProductSlider, ProductOverview, ProductDetail, RecipeSlider, FAQ, SocialMediaFeed 
} from '@dejstdm/white-label-ui';

// Add to Builder.io component registry
Builder.registerComponent(NavBar, { name: 'NavBar', ... });
// ... register other components
```

#### Component Categories

- **Navigation**: `NavBar`, `Footer`
- **Layout**: `Hero`
- **Display**: `TextSection`, `ImageSection`, `ProductSlider`, `ProductOverview`, `ProductDetail`, `RecipeSlider`, `FAQ`, `SocialMediaFeed`

#### Metadata Maintenance

**Important:** When creating new components or updating existing component props:

1. **Create/Update metadata file**: Create a new `*.meta.ts` file in the `meta/` directory (or update existing one)
2. **Match PropTypes**: Ensure metadata props match component PropTypes exactly
3. **Update exports**: Add component to `packages/components-react/index.js` exports
4. **Rebuild**: Run `npm run build` to include changes
5. **Test**: Verify metadata loads correctly in Fusion

Metadata files use the Builder.io Fusion `defineComponentMeta` format and must be kept in sync with component PropTypes.

## Components

The following components are available in the library. All components are standalone page-level components that manage their own internal layout and styling:

### Navigation & Layout
- **NavBar** - Navigation bar component with sticky option, menu items, and mobile-responsive burger menu
- **Footer** - Footer component with logo, social media links (uses Font Awesome icon classes), navigation links, and content sections

### Hero Section
- **Hero** - Full-width hero section with background image, headline, body content, and optional button

### Content Sections
- **TextSection** - Text content section with headline and WYSIWYG content
- **ImageSection** - Image gallery section with optional slider/carousel functionality

### Feature Components
- **ProductSlider** - Product carousel/slider with navigation controls
- **ProductOverview** - Product grid or zig-zag layout with load more functionality
- **ProductDetail** - Product detail page component with variants (overview, compact, tabs) including nutritional information
- **RecipeSlider** - Recipe carousel/slider with navigation and pagination. Supports two variations:
  - `image-only` (default) - Displays recipe images only
  - `with-content` - Displays recipe images with title and "read more" button
- **FAQ** - FAQ accordion component with expandable questions/answers
- **SocialMediaFeed** - Social media feed component with social links (uses Font Awesome icon classes)

### Internal Components (Not Exported)

The following components are used internally and are not part of the public API:
- **Container** - Layout container (used internally by all section components)
- **Heading** - Typography heading (used internally by Hero and sections)
- **Text** - Typography text component (internal primitive)
- **Button** - Button component (used internally by Hero, sliders, and social feed)
- **WysiwygContent** - WYSIWYG content renderer (used internally for CMS content)
- **SectionHeader** - Section header component (used internally by section components)
- **Image** - Standard image component with required width/height attributes
- **ResponsiveImage** - Picture tag component for responsive images (mobile/desktop variants)

All components include Storybook stories. Source files are in `packages/components-react/`.

### Icons

Social media icons use **Font Awesome** icon classes. Components accept Font Awesome class strings for API integration.

**Font Awesome Icons:**
- **Facebook**: `fa-brands fa-square-facebook`
- **Instagram**: `fa-brands fa-square-instagram`
- **Twitter/X**: `fa-brands fa-square-x-twitter`

These icons are used by components that support social media links:
- **Footer** - Requires Font Awesome icon class string via `icon` prop (e.g., `"fa-brands fa-square-facebook"`)
- **SocialMediaFeed** - Uses Font Awesome icon classes for platform badges and social links

**Font Awesome CSS Requirement:**

**Required:** Import Font Awesome CSS in your application root (e.g., `app/layout.tsx` for Next.js):

```bash
npm install @fortawesome/fontawesome-free
```

```typescript
// In your main app file (e.g., app/layout.tsx for Next.js)
import '@fortawesome/fontawesome-free/css/all.min.css';
```

Or via CDN in your HTML:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

**Usage in components:**
```typescript
// Icons are provided as Font Awesome class strings (perfect for API integration)
const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://facebook.com',
    icon: 'fa-brands fa-square-facebook'
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com',
    icon: 'fa-brands fa-square-instagram'
  },
  { 
    name: 'X (Twitter)', 
    href: 'https://x.com',
    icon: 'fa-brands fa-square-x-twitter'
  }
];

<Footer socialLinks={socialLinks} />
```

**Icon styling is controlled by theme CSS** - size and color are managed through CSS variables, not component props.

## Theming System

The theming system uses [Style Dictionary](https://styledictionary.com/) to compile design tokens from CTI-structured JSON files into CSS variables. The system supports both token-based compilation (recommended) and legacy manifest-based compilation.

### Token Structure

Design tokens are organized using the CTI (Category/Type/Item) naming convention:

- **Global tokens** (`tokens/global/`) - Shared across all brands (spacing, radii, shadows, grid)
- **Brand tokens** (`tokens/brands/<brand>/`) - Brand-specific overrides (colors, typography)

Tokens follow a hierarchical structure:
```
tokens/
├── global/              # Shared tokens
│   ├── size/
│   │   ├── spacing.json
│   │   └── radii.json
│   ├── shadow/
│   │   └── base.json
│   └── grid/
│       └── system.json
└── brands/              # Brand-specific tokens
    ├── default/
    │   ├── color/
    │   └── font/
    ├── 7up/
    └── lays/
```

### Theme Structure

Each theme in `/themes/<brand>/` contains:
- `theme.manifest.json` - Theme configuration and component metadata (`variantsAndHooks`)
- `dist/theme.css` - Compiled CSS variables (generated from tokens)
- `dist/tokens.json` - JSON token export (generated, for documentation/tooling)

### Token Files

Token files use CTI structure and support references:
```json
{
  "color": {
    "brand": {
      "primary": {
        "value": "#00529C"
      }
    }
  },
  "font": {
    "scale": {
      "h1": {
        "family": {
          "value": "{font.family.heading}"
        }
      }
    }
  }
}
```

### CSS Variables

Themes compile to CSS variables scoped to `[data-theme="brand-x"]` selectors:
- Colors: `--color-brand-*`, `--color-bg-*`, `--color-text-*` (with `-rgb` variants)
- Typography: `--font-*`, `--type-*-*`
- Spacing: `--space-*`
- Radii: `--radius-*`
- Shadows: `--shadow-*`
- Grid: `--grid-*`, `--container-*`

### Available Themes

- **default** - Baseline design system foundation
- **7up** - 7up brand theme
- **lays** - Lays brand theme

### Theme Compilation

**Style Dictionary (Recommended):**
- Compiles tokens from `tokens/global/` and `tokens/brands/<brand>/`
- Generates CSS variables and JSON token exports
- Supports watch mode for development
- Run: `npm run compile-themes:sd`

**Legacy Manifest Compiler:**
- Compiles from `theme.manifest.json` files
- Maintained for backward compatibility
- Run: `npm run compile-themes`

Themes are automatically compiled when running Storybook or build commands.

### Documentation

For detailed information on working with tokens, see [`docs/STYLE_DICTIONARY.md`](docs/STYLE_DICTIONARY.md).

## Testing

The project uses Vitest for testing. Test configuration is in `vitest.config.js` and setup in `.storybook/vitest.setup.js`.

## Documentation

- **Architecture**: `ARCHITECTURE.md` - Current architecture, constraints, data contracts, versioning policy
- **Roadmap**: `ROADMAP.md` - Future plans and research items
- **Agent Specifications**: `AGENTS.md` - Automated agent specifications for theming workflow
- **Style Dictionary Guide**: `docs/STYLE_DICTIONARY.md` - Guide for working with design tokens
- **Component Development Rules**: `packages/components-react/AGENTS.md` - Rules for component development (BEM, mobile-first, etc.)

## Component Development

Component development follows specific rules documented in `packages/components-react/AGENTS.md`, including:
- BEM methodology for CSS class naming
- Mobile-first responsive design
- Container usage patterns
- CMS content handling
- HTML tag styling rules

## Storybook Addons

- `@storybook/addon-docs` - Documentation
- `@storybook/addon-a11y` - Accessibility testing
- `@chromatic-com/storybook` - Visual testing
- `@storybook/addon-vitest` - Vitest integration

