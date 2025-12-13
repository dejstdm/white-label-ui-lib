# Button Color System - Context-Aware Theming

## Overview

Buttons can have different colors depending on their background context. This document explains how button colors work across themes and how to configure them.

## Problem

For the Lays theme:
- Buttons on **yellow background** (brand-primary) → **Red** (#d6001c)
- Buttons on **white/neutral background** → **Gold** (#ffd700)
- Hover states need to be slightly darker for visual feedback

## Solution: Button Color Tokens

### Token Structure

Button colors are defined in `tokens/brands/<brand>/color/brand.json`:

```json
{
  "color": {
    "brand": {
      "button-on-brand": {
        "value": "#d6001c"
      },
      "button-on-brand-hover": {
        "value": "#b80018"
      },
      "button-on-brand-active": {
        "value": "#9a0014"
      },
      "button-on-neutral": {
        "value": "#ffd700"
      },
      "button-on-neutral-hover": {
        "value": "#e6c200"
      },
      "button-on-neutral-active": {
        "value": "#ccad00"
      }
    }
  }
}
```

### Generated CSS Variables

Style Dictionary compiles these to:

```css
[data-theme="lays"] {
  --color-brand-button-on-brand: #d6001c;
  --color-brand-button-on-brand-hover: #b80018;
  --color-brand-button-on-brand-active: #9a0014;
  --color-brand-button-on-neutral: #ffd700;
  --color-brand-button-on-neutral-hover: #e6c200;
  --color-brand-button-on-neutral-active: #ccad00;
}
```

## Implementation

### Context Detection

Button colors are applied based on parent component background using `theme-overrides.css`:

**Buttons on Yellow Background (Red):**
- ProductSlider
- RecipeSlider
- FAQ
- TextSection
- ImageSection
- SocialMediaFeed
- ProductDetail
- NavBar

**Buttons on White/Neutral Background (Gold):**
- ProductOverview (all layouts - grid and zig-zag)

### CSS Rules

The rules are defined in `themes/lays/theme-overrides.css` and work by setting button hook variables that `packages/components-react/Button.css` consumes:

```css
/* Buttons on yellow background use red */
[data-theme="lays"] .product-slider {
  --wl-button-solid-bg: var(--color-brand-button-on-brand);
  --wl-button-solid-border: var(--color-brand-button-on-brand);
  --wl-button-solid-color: #ffffff;
  --wl-button-solid-hover-bg: var(--color-brand-button-on-brand-hover);
  --wl-button-solid-hover-border: var(--color-brand-button-on-brand-hover);
  --wl-button-solid-active-bg: var(--color-brand-button-on-brand-active);
  --wl-button-solid-active-border: var(--color-brand-button-on-brand-active);
}

/* Buttons on neutral background use gold */
[data-theme="lays"] .product-overview__zig-zag-item {
  --wl-button-solid-bg: var(--color-brand-button-on-neutral);
  --wl-button-solid-border: var(--color-brand-button-on-neutral);
  --wl-button-solid-color: var(--color-text-primary);
  --wl-button-solid-hover-bg: var(--color-brand-button-on-neutral-hover);
  --wl-button-solid-hover-border: var(--color-brand-button-on-neutral-hover);
  --wl-button-solid-active-bg: var(--color-brand-button-on-neutral-active);
  --wl-button-solid-active-border: var(--color-brand-button-on-neutral-active);
}
```

These same `--wl-button-solid-*` hook variables are also used by slider navigation buttons and pagination dots (e.g. `.product-slider__nav-button`, `.recipe-slider__nav-button`, `.recipe-slider__pagination .swiper-pagination-bullet`) so they automatically match the active theme.

## Do All Themes Need Two Types?

**Answer: No, but the structure supports it.**

### Current Implementation

- **Default Theme**: Both button types reference `brand-primary` (same color)
- **7up Theme**: Buttons on brand/green backgrounds use an inverted style (white button + green text) via `themes/7up/theme-overrides.css`
- **Lays Theme**: Different colors for each context (red vs gold)

### When to Use Two Types

Use two button color types when:
- ✅ Buttons need different colors on brand vs neutral backgrounds
- ✅ Brand guidelines require context-aware button colors
- ✅ Accessibility requires different contrast ratios

Use one button color type when:
- ✅ All buttons use the same color regardless of background
- ✅ Brand guidelines don't specify context-aware colors
- ✅ Simpler theme configuration is preferred

### Theme Builder Integration

In your future theme builder:

1. **Button Color Section**:
   - "Button on Brand Background" → Color picker
   - "Button on Neutral Background" → Color picker
   - Hover/Active states → Auto-generated (slightly darker) or manual

2. **Smart Defaults**:
   - If both are the same → Use single `brand-primary` reference
   - If different → Generate separate tokens

3. **Preview**:
   - Show buttons on both yellow and white backgrounds
   - Live preview of hover/active states

## Hover State Calculation

For Lays theme, hover states are:
- **Red hover**: `#b80018` (slightly darker than `#d6001c`)
- **Gold hover**: `#e6c200` (slightly darker than `#ffd700`)

**Recommendation**: In theme builder, you could:
1. Auto-calculate hover as 10-15% darker
2. Allow manual override
3. Use `color-mix()` for automatic darkening (CSS-native)

## Adding New Components

When adding a new component with buttons:

1. **Determine background**: Yellow (brand-primary) or white/neutral?
2. **Add to theme-overrides.css**: Prefer setting `--wl-button-solid-*` variables on the component wrapper (rather than overriding `.button--solid` properties with `!important`)
3. **Use appropriate token**: `button-on-brand` or `button-on-neutral`

Example:
```css
/* New component with yellow background */
[data-theme="lays"] .new-component {
  --wl-button-solid-bg: var(--color-brand-button-on-brand);
  --wl-button-solid-border: var(--color-brand-button-on-brand);
  --wl-button-solid-color: #ffffff;
  /* Optional: hover/active vars too */
}
```

## Benefits

1. **Theme Builder Ready**: All button colors are tokenized
2. **Flexible**: Supports one or two button color types per theme
3. **Maintainable**: Centralized in token files
4. **Accessible**: Proper contrast ratios can be enforced
5. **Scalable**: Easy to add new themes or components
