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

- `npm run storybook` - Start Storybook dev server (compiles themes automatically)
- `npm run build-storybook` - Build static Storybook site (compiles themes automatically)
- `npm run compile-themes` - Compile all theme manifests to CSS

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

All components include Storybook stories and are exported from `packages/components-react/index.js`.

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

