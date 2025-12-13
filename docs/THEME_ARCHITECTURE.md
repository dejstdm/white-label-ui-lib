# Theme Architecture & Component Backgrounds

## Overview

This document explains how component-specific styling works in the theming system, particularly for component backgrounds that need to differ from the default `--color-brand-primary`.

## Problem Statement

Some components (ProductSlider, RecipeSlider, FAQ, etc.) use `--color-brand-primary` for their background color. However:
- **Default theme**: Needs white backgrounds for these components
- **7up/Lays themes**: Need brand-primary colored backgrounds

This requires a flexible system that works with a future theme builder app.

## Solution: Component-Specific Background Tokens

### Token Structure

Component backgrounds are defined in `tokens/brands/<brand>/color/background.json`:

```json
{
  "color": {
    "background": {
      "page": { "value": "#FFFFFF" },
      "section": { "value": "#F7F8FA" },
      "component": {
        "productSlider": { "value": "#FFFFFF" },
        "recipeSlider": { "value": "#FFFFFF" },
        "faq": { "value": "{color.brand.primary}" },
        "textSection": { "value": "#FFFFFF" },
        "imageSection": { "value": "#FFFFFF" },
        "socialMediaFeed": { "value": "#FFFFFF" }
      }
    }
  }
}
```

### Token Values

Tokens can be:
1. **Direct color values**: `"#FFFFFF"` (white)
2. **Token references**: `"{color.brand.primary}"` (references brand primary color)
3. **Other token references**: `"{color.background.page}"` (references page background)

### Component CSS Usage

Components use component-specific tokens with a fallback:

```css
.product-slider {
  background-color: var(--color-bg-component-productSlider, var(--color-brand-primary));
  /* Falls back to brand-primary if component token doesn't exist */
}
```

### Generated CSS Variables

Style Dictionary compiles these to CSS variables:

```css
[data-theme="default"] {
  --color-bg-component-productSlider: #FFFFFF;
  --color-bg-component-productSlider-rgb: 255, 255, 255;
  /* ... */
}

[data-theme="7up"] {
  --color-bg-component-productSlider: var(--color-brand-primary);
  /* ... */
}
```

## Theme Builder Integration

### How It Works in Theme Builder

1. **Component Background Section**: Theme builder shows a list of components with background color options
2. **Color Options**:
   - **Brand Primary**: Sets token to `{color.brand.primary}`
   - **White**: Sets token to `#FFFFFF`
   - **Page Background**: Sets token to `{color.background.page}`
   - **Custom Color**: Allows direct hex/rgb input
3. **Token Updates**: Changes update `tokens/brands/<brand>/color/background.json`
4. **Compilation**: Style Dictionary compiles tokens → CSS variables
5. **Live Preview**: Components update immediately

### Example Theme Builder UI

```
Component Backgrounds
├── Product Slider
│   └── [Brand Primary ▼]  ← Dropdown with options
├── Recipe Slider
│   └── [Brand Primary ▼]
├── FAQ
│   └── [Brand Primary ▼]
└── ...
```

## When to Use Tokens vs. theme-overrides.css

### Use Tokens For:
- ✅ Simple background colors
- ✅ Standard color roles
- ✅ Typography values
- ✅ Spacing, radii, shadows
- ✅ **Anything that should be configurable in theme builder**

### Use theme-overrides.css For:
- ✅ Setting component hook CSS variables (e.g. `--wl-button-solid-*`)
- ✅ Complex selectors (`.hero__button-wrapper .button:hover`)
- ✅ Pseudo-classes and states
- ✅ Component-specific styling that can't be tokenized
- ✅ One-off overrides that don't need builder support
- ✅ **Anything too complex for token-based configuration**

## Current Implementation

### Default Theme
- All component backgrounds: `#FFFFFF` (white)
- FAQ background: `{color.brand.primary}` (blue)

### 7up Theme
- All component backgrounds: `{color.brand.primary}` (green)

### Lays Theme
- All component backgrounds: `{color.brand.primary}` (yellow)

## Adding New Component Backgrounds

1. **Add token** to `tokens/brands/<brand>/color/background.json`:
   ```json
   "component": {
     "newComponent": { "value": "#FFFFFF" }
   }
   ```

2. **Update component CSS**:
   ```css
   .new-component {
     background-color: var(--color-bg-component-newComponent, var(--color-brand-primary));
   }
   ```

3. **Run compilation**:
   ```bash
   npm run compile-themes:sd
   ```

## Benefits

1. **Theme Builder Ready**: All component backgrounds are tokenized and configurable
2. **Flexible**: Supports direct colors, token references, and fallbacks
3. **Maintainable**: Centralized in token files, not scattered in CSS
4. **Type-Safe**: Token references are validated at compile time
5. **Scalable**: Easy to add new components or themes

## Future Enhancements

- [ ] Add component-specific text colors (if needed)
- [ ] Add component-specific border colors (if needed)
- [ ] Theme builder UI for component backgrounds
- [ ] Visual token editor in Storybook
