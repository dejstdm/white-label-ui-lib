# WhiteLabel UI Library

A Storybook component library with a role-based theming system. Components use theme manifests that compile to CSS variables, enabling rapid brand customization through configuration rather than code changes.

## Project Structure

```
/
├── packages/
│   └── components-react/  # React component library
│       ├── *.jsx          # Component implementations
│       ├── *.css          # Component styles
│       ├── *.stories.jsx  # Storybook stories
│       ├── index.js       # Component exports
│       └── AGENTS.md      # Component development rules
├── stories/               # Additional Storybook example stories
│   └── assets/           # Story assets (images, SVGs)
├── themes/               # Brand-specific theme manifests
│   ├── default/          # Default theme
│   │   ├── theme.manifest.json
│   │   └── dist/
│   │       └── theme.css
│   └── 7up/              # 7up brand theme
│       ├── theme.manifest.json
│       └── dist/
│           └── theme.css
├── scripts/
│   └── compile-theme.js  # Theme compilation script
├── .storybook/           # Storybook configuration
│   ├── main.js           # Storybook config
│   ├── preview.jsx       # Storybook preview setup
│   └── vitest.setup.js   # Vitest test setup
├── templates/            # Template files
├── PRD.md                # Product Requirements Document
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
- `npm run compile-themes` - Compile all theme manifests to CSS

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
import { Button, Hero, NavBar, Container, Heading, Text } from '@dejstdm/white-label-ui';
```

You can import individual components for better tree-shaking:

```javascript
import { Button } from '@dejstdm/white-label-ui';
```

### Importing Styles

**Required:** Import the component styles CSS file in your application:

```javascript
// In your main app file (e.g., app/layout.tsx for Next.js, or index.js for Create React App)
import '@dejstdm/white-label-ui/dist/style.css';
```

### Swiper CSS (Required for Slider Components)

If you're using slider components (`ProductSlider`, `RecipeSlider`, `ImageSection`), you also need to import Swiper CSS:

```javascript
import 'swiper/css';
import 'swiper/css/navigation';  // For navigation arrows
import 'swiper/css/pagination';  // For pagination dots (used in RecipeSlider)
```

### Complete Usage Example

```javascript
// app/page.js (Next.js example)
import { Button, Hero, NavBar } from '@dejstdm/white-label-ui';
import '@dejstdm/white-label-ui/dist/style.css';
import 'swiper/css';  // If using slider components
import 'swiper/css/navigation';

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Hero 
        headline="Welcome"
        body="This is a hero section"
      />
      <Button variant="solid" size="large">
        Click Me
      </Button>
    </div>
  );
}
```

### Builder.io Integration

This package is designed to work with Builder.io and other visual page builders. Components are pre-built and ready to use:

1. Install the package and peer dependencies
2. Import components in your Builder.io component registry
3. Import the CSS file in your application root
4. Components will work out of the box

## Components

The following components are available in the library:

### Core Components
- **Container** - Layout container component
- **Heading** - Typography heading component
- **Text** - Typography text component
- **Button** - Button component with variants

### Layout Components
- **NavBar** - Navigation bar component
- **Hero** - Hero section component
- **Footer** - Footer component
- **SectionHeader** - Section header component
- **SectionLayout** - Section layout component

### Content Components
- **TextSection** - Text content section
- **ImageSection** - Image content section
- **WysiwygContent** - WYSIWYG content renderer

### Feature Components
- **ProductSlider** - Product carousel/slider
- **RecipeSlider** - Recipe carousel/slider
- **FAQ** - FAQ accordion component
- **SocialMediaFeed** - Social media feed component

All components include Storybook stories and are exported from the built package. Source files are in `packages/components-react/`.

## Theming System

The theming system uses role-based design tokens stored in `theme.manifest.json` files that compile to CSS variables.

### Theme Structure

Each theme in `/themes/<brand>/` contains:
- `theme.manifest.json` - Theme configuration (colors, typography, spacing, etc.)
- `dist/theme.css` - Compiled CSS variables (generated)

### Theme Manifest

The manifest includes:
- **Meta**: Brand name, version, schema version
- **Palette**: Brand colors, backgrounds, text colors, semantic colors
- **Typography**: Font families and scales (display, h1-h6, body, label, small)
- **Spacing**: Spacing scale array
- **Radii**: Border radius values
- **Shadows**: Box shadow definitions
- **Grid**: Grid system configuration
- **VariantsAndHooks**: Component variant definitions (optional)

### CSS Variables

Themes compile to CSS variables scoped to `[data-theme="brand-x"]` selectors:
- Colors: `--color-brand-*`, `--color-bg-*`, `--color-text-*`
- Typography: `--font-*`, `--type-*-*`
- Spacing: `--space-*`
- Radii: `--radius-*`
- Shadows: `--shadow-*`
- Grid: `--grid-*`, `--container-*`

### Available Themes

- **default** - Baseline design system foundation
- **7up** - 7up brand theme

### Theme Compilation

Themes are automatically compiled when running Storybook or build commands. The compilation script:
1. Validates theme manifests
2. Generates CSS variables from manifest data
3. Outputs `theme.css` to `dist/` directory
4. Validates component variants and hooks (if defined)

## Testing

The project uses Vitest for testing. Test configuration is in `vitest.config.js` and setup in `.storybook/vitest.setup.js`.

## Documentation

- **Product Requirements**: `PRD.md` - Product requirements document
- **Agent Specifications**: `AGENTS.md` - Automated agent specifications for theming workflow
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

