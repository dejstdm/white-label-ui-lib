# WhiteLabel UI Library

A Storybook component library with a role-based theming system. Components use theme manifests that compile to CSS variables, enabling rapid brand customization through configuration rather than code changes.

## Project Structure

```
/
├── packages/
│   └── components-react/  # React component library
├── stories/               # Storybook example stories
├── themes/               # Brand-specific theme manifests
│   └── <brand>/          # Theme manifests and compiled CSS
├── .storybook/           # Storybook configuration
└── docs/                 # Documentation templates
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

Start Storybook:

```bash
npm run storybook
```

Storybook will open at `http://localhost:6006`

## MVP Components

The following components are available with Storybook stories:

1. **NavBar** - Navigation bar component
2. **Hero** - Hero section component
3. **ProductSingle** - Product display component
4. **FAQ** - FAQ accordion component
5. **Footer** - Footer component

## Theming

Components use CSS variables scoped to `[data-theme="brand-x"]` selectors. Theme CSS files are loaded dynamically in Storybook via the theme toolbar selector.

### Default Theme

A default theme with fallback CSS variables is included. Themes are compiled from manifest files and loaded from `/themes/<brand>/dist/theme.css`.

## Documentation

- Component capability sheet template: `/docs/capability-sheet-template.md`
- Product Requirements: `PRD.md`
- Agent Specifications: `AGENTS.md`

