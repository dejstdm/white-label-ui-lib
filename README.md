# WhiteLabel UI Library

Unified theming system for WhiteLabel Drupal projects using a single Theme Manifest shared across Storybook, React components, and Drupal themes.

## Project Structure

```
/
├── src/
│   ├── components/         # React component library
│   ├── stories/            # Storybook stories
│   └── styles/             # Global CSS styles
├── .storybook/             # Storybook configuration
├── themes/
│   └── <brand>/           # Brand-specific theme manifests (to be implemented)
└── docs/                   # Documentation templates
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

A default theme with fallback CSS variables is included. When theme compiler is implemented, themes will be loaded from `/themes/<brand>/dist/theme.css`.

## Documentation

- Component capability sheet template: `/docs/capability-sheet-template.md`
- Product Requirements: `PRD.md`
- Agent Specifications: `AGENTS.md`

## Next Steps

1. Implement Theme Compiler Agent (Agent 1)
2. Implement Theme Schema package
3. Create example theme manifest
4. Set up Drupal theme integration (Agent 3)

