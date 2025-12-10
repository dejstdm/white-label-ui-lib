# Token to CSS Variable Mapping

This document describes how design tokens stored in CTI (Category/Type/Item) structured JSON files are transformed into CSS custom properties (variables) for use in components and Theme Builder applications.

## Overview

Design tokens are compiled from JSON source files using Style Dictionary, which applies custom transforms to convert token paths to CSS variable names. The transformation logic is defined in `scripts/style-dictionary/transforms.js` via the `transformNameCssVariable` transform.

## Mapping Patterns

### Color Tokens

Color tokens follow these patterns:

| Token Path | CSS Variable | Example Value |
|------------|--------------|---------------|
| `color.brand.primary` | `--color-brand-primary` | `#00529C` |
| `color.brand.on-primary` | `--color-brand-on-primary` | `#FFFFFF` |
| `color.background.page` | `--color-bg-page` | `#FFFFFF` |
| `color.background.section` | `--color-bg-section` | `#F7F8FA` |
| `color.text.primary` | `--color-text-primary` | `#1A1A1A` |
| `color.text.muted` | `--color-text-muted` | `#6B7280` |
| `color.border` | `--color-border` | `#E5E7EB` |
| `color.focus-ring` | `--color-focus-ring` | `#00529C` |
| `color.success` | `--color-success` | `#16A34A` |
| `color.warning` | `--color-warning` | `#EAB308` |
| `color.danger` | `--color-danger` | `#DC2626` |

**Pattern Rules:**
- Brand colors: `color.brand.*` → `--color-brand-{item}`
- Background colors: `color.background.*` → `--color-bg-{item}`
- Text colors: `color.text.*` → `--color-text-{item}`
- Direct color properties: `color.{property}` → `--color-{property}`

**RGB Variants:**
All color tokens automatically generate RGB variants via the `transformHexToRgb` transform:
- `--color-brand-primary` → `--color-brand-primary-rgb: 0, 82, 156`

### Typography Tokens

#### Font Family Tokens

| Token Path | CSS Variable | Example Value |
|------------|--------------|---------------|
| `font.family.heading` | `--font-heading` | `"GT America Trial Bd", sans-serif` |
| `font.family.body` | `--font-body` | `"GT America Rg", sans-serif` |

**Pattern:** `font.family.{name}` → `--font-{name}`

#### Typography Scale Tokens

Typography scales map to CSS variables with a `--type-` prefix:

| Token Path | CSS Variable | Property Mapping |
|------------|--------------|------------------|
| `font.scale.h1.size` | `--type-h1-size` | size → size |
| `font.scale.h1.weight` | `--type-h1-weight` | weight → weight |
| `font.scale.h1.lineHeight` | `--type-h1-line` | lineHeight → line |
| `font.scale.h1.letterSpacing` | `--type-h1-spacing` | letterSpacing → spacing |
| `font.scale.h1.family` | `--type-h1-family` | family → family |

**Pattern:** `font.scale.{scaleName}.{property}` → `--type-{scaleName}-{mappedProperty}`

**Property Name Mappings:**
- `size` → `size`
- `weight` → `weight`
- `lineHeight` → `line`
- `letterSpacing` → `spacing`
- `family` → `family`

**Available Scale Names:**
- `display`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `body-large`, `body-small`
- `label`, `small`

### Spacing Tokens

| Token Path | CSS Variable | Example Value |
|------------|--------------|---------------|
| `size.spacing.0` | `--space-0` | `2px` |
| `size.spacing.1` | `--space-1` | `4px` |
| `size.spacing.2` | `--space-2` | `8px` |
| `size.spacing.3` | `--space-3` | `12px` |
| `size.spacing.4` | `--space-4` | `16px` |
| `size.spacing.5` | `--space-5` | `24px` |
| `size.spacing.6` | `--space-6` | `32px` |
| `size.spacing.7` | `--space-7` | `48px` |

**Pattern:** `size.spacing.{index}` → `--space-{index}`

### Border Radius Tokens

| Token Path | CSS Variable | Example Value |
|------------|--------------|---------------|
| `size.radius.none` | `--radius-none` | `0` |
| `size.radius.sm` | `--radius-sm` | `4px` |
| `size.radius.md` | `--radius-md` | `8px` |
| `size.radius.pill` | `--radius-pill` | `9999px` |

**Pattern:** `size.radius.{name}` → `--radius-{name}`

### Shadow Tokens

| Token Path | CSS Variable | Example Value |
|------------|--------------|---------------|
| `shadow.base.sm` | `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `shadow.base.md` | `--shadow-md` | `0 4px 8px rgba(0,0,0,0.08)` |
| `shadow.base.lg` | `--shadow-lg` | `0 8px 16px rgba(0,0,0,0.12)` |

**Pattern:** `shadow.base.{size}` → `--shadow-{size}`

### Grid Tokens

| Token Path | CSS Variable | Example Value |
|------------|--------------|---------------|
| `grid.system.columns` | `--grid-columns` | `12` |
| `grid.system.gutter` | `--grid-gutter` | `24px` |
| `grid.system.breakpoint` | `--container-breakpoint` | `null` |
| `grid.system.container.sm` | `--grid-container-sm` | `640px` |
| `grid.system.container.md` | `--grid-container-md` | `768px` |
| `grid.system.container.lg` | `--grid-container-lg` | `1024px` |
| `grid.system.container.xl` | `--grid-container-xl` | `1280px` |
| `grid.system.container.2xl` | `--grid-container-2xl` | `1440px` |

**Pattern:** 
- `grid.system.columns` → `--grid-columns`
- `grid.system.gutter` → `--grid-gutter`
- `grid.system.breakpoint` → `--container-breakpoint`
- `grid.system.container.{breakpoint}` → `--grid-container-{breakpoint}`

## CSS Variable Scoping

All CSS variables are scoped to the theme selector:

```css
[data-theme="default"] {
  --color-brand-primary: #00529C;
  /* ... all other variables ... */
}
```

The Theme Builder can dynamically apply theme variables by:
1. Loading a theme's compiled CSS file
2. Applying the `data-theme="{brand}"` attribute to the root element
3. Updating CSS variable values in real-time for live preview

## Token Source Structure

Tokens are organized in the following directory structure:

```
tokens/
├── global/              # Shared tokens across all brands
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
    │   │   ├── brand.json
    │   │   ├── background.json
    │   │   └── text.json
    │   └── font/
    │       ├── family.json
    │       └── scale.json
    ├── 7up/
    └── lays/
```

## Example Token File

```json
{
  "color": {
    "brand": {
      "primary": {
        "value": "#00529C"
      },
      "on-primary": {
        "value": "#FFFFFF"
      }
    }
  },
  "font": {
    "scale": {
      "h1": {
        "size": {
          "value": "72px"
        },
        "weight": {
          "value": "700"
        }
      }
    }
  }
}
```

Compiles to:

```css
[data-theme="default"] {
  --color-brand-primary: #00529C;
  --color-brand-primary-rgb: 0, 82, 156;
  --color-brand-on-primary: #FFFFFF;
  --color-brand-on-primary-rgb: 255, 255, 255;
  --type-h1-size: 72px;
  --type-h1-weight: 700;
}
```

## Theme Builder UI Control Mapping

For Theme Builder applications, token types map to UI controls as follows:

| Token Type | CTI Pattern | UI Control | Example |
|------------|-------------|------------|---------|
| Color | `color.*.*` | Color picker + hex input | `color.brand.primary` → Color picker |
| Font Family | `font.family.*` | Font dropdown + custom input | `font.family.heading` → Font selector |
| Font Size | `font.scale.*.size` | Number input + unit selector | `font.scale.h1.size` → Size input (px) |
| Font Weight | `font.scale.*.weight` | Dropdown (100-900) | `font.scale.h1.weight` → Weight selector |
| Spacing | `size.spacing.*` | Number input + unit selector | `size.spacing.4` → Size input (px) |
| Border Radius | `size.radius.*` | Number input + unit selector | `size.radius.md` → Size input (px) |
| Shadow | `shadow.base.*` | Shadow builder (x, y, blur, spread, color) | `shadow.base.lg` → Shadow editor |

## Reference Files

- **Transform Logic:** `scripts/style-dictionary/transforms.js`
- **CSS Output Format:** `scripts/style-dictionary/formats.js`
- **Compiled CSS Example:** `themes/default/dist/theme.css`
- **Token JSON Example:** `themes/default/dist/tokens.json`
- **Style Dictionary Config:** `style-dictionary.config.js`

## Usage in Components

Components consume these CSS variables directly:

```css
.button {
  background-color: var(--color-brand-primary);
  color: var(--color-brand-on-primary);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--type-body-large-size);
}
```

This enables real-time theme updates without rebuilding components, making it perfect for Theme Builder applications where themes are edited visually and previewed instantly.

