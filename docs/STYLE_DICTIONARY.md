# Style Dictionary Usage Guide

This project uses [Style Dictionary](https://styledictionary.com/) to compile design tokens from CTI-structured JSON files into CSS variables and other output formats.

## Overview

Style Dictionary transforms design tokens defined in JSON files into platform-specific outputs. Our implementation:

- Reads tokens from `tokens/global/` (shared tokens) and `tokens/brands/<brand>/` (brand-specific tokens)
- Compiles to CSS variables scoped to `[data-theme="<brand>"]` selectors
- Generates JSON token exports for documentation and tooling
- Maintains 100% backward compatibility with existing component CSS consumption

## Token Structure

Tokens follow the CTI (Category/Type/Item) naming convention:

```
tokens/
├── global/              # Shared tokens across all brands
│   ├── size/
│   │   ├── spacing.json     # Base spacing scale
│   │   └── radii.json       # Base radius values
│   ├── shadow/
│   │   └── base.json        # Base shadow definitions
│   └── grid/
│       └── system.json      # Grid columns, gutters, containers
├── brands/
│   ├── default/
│   │   ├── color/
│   │   │   ├── brand.json       # brand.primary, brand.on-primary
│   │   │   ├── background.json  # bg.page, bg.section
│   │   │   └── text.json        # text.primary, text.muted
│   │   └── font/
│   │       ├── family.json      # heading, body families
│   │       └── scale.json       # Typography scales (display, h1-h6, etc.)
│   ├── 7up/
│   └── lays/
```

## Token File Format

Each token file is a JSON object with nested structure:

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
  }
}
```

### References

Tokens can reference other tokens using `{token.path}` syntax:

```json
{
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

## Adding/Editing Tokens

### Adding a New Color Token

1. Edit the appropriate color file in `tokens/brands/<brand>/color/`:
   - `brand.json` for brand colors
   - `background.json` for background colors
   - `text.json` for text colors
   - Or create a new file for semantic colors (e.g., `accent.json`)

2. Add the token following CTI structure:
   ```json
   {
     "color": {
       "brand": {
         "new-color": {
           "value": "#FF0000"
         }
       }
     }
   }
   ```

3. Run `npm run compile-themes:sd` to regenerate CSS

### Adding a New Typography Scale

1. Edit `tokens/brands/<brand>/font/scale.json`
2. Add the new scale:
   ```json
   {
     "font": {
       "scale": {
         "new-scale": {
           "family": {
             "value": "{font.family.body}"
           },
           "weight": {
             "value": 400
           },
           "size": {
             "value": "14px"
           },
           "lineHeight": {
             "value": "150%"
           },
           "letterSpacing": {
             "value": "0"
           }
         }
       }
     }
   }
   ```

### Adding a New Brand

1. Create directory: `tokens/brands/<brand-name>/`
2. Create token files following the structure above
3. Run `npm run compile-themes:sd` to compile

## Compilation

### Build All Themes

```bash
npm run compile-themes:sd
```

### Build Specific Brand

```bash
node scripts/compile-themes-sd.js <brand>
```

### Watch Mode (Development)

```bash
npm run compile-themes:watch
```

## Output Files

After compilation, each theme generates:

- `themes/<brand>/dist/theme.css` - CSS variables (used by components)
- `themes/<brand>/dist/tokens.json` - JSON token export (for documentation/tooling)

## CSS Variable Naming

The custom format generates CSS variables matching our existing naming convention:

- Colors: `--color-brand-*`, `--color-bg-*`, `--color-text-*`
- Typography: `--font-*`, `--type-*-*`
- Spacing: `--space-*`
- Radii: `--radius-*`
- Shadows: `--shadow-*`
- Grid: `--grid-*`, `--container-*`

RGB values are automatically generated for all color tokens (e.g., `--color-brand-primary-rgb: 0, 82, 156`).

## Custom Transforms

The implementation includes custom transforms:

- `transform/hexToRgb` - Converts hex colors to RGB tuples (not currently used, RGB generated in format)
- `transform/gradientFallback` - Handles gradient objects with fallback colors
- `transform/nameCssVariable` - Maps CTI structure to CSS variable names

## Custom Format

The `css/theme-variables` format generates CSS matching the exact structure of the original compiler output, including:

- Theme comments with brand name
- Section comments (`/* Palette */`, `/* Typography Families */`, etc.)
- Exact variable ordering
- RGB variables alongside color variables
- Font-face rules (handled separately via metadata)

## Migration from Manifests

To convert an existing `theme.manifest.json` to tokens:

```bash
node scripts/convert-manifest-to-tokens.js <brand>
```

This script:
- Converts palette → color tokens
- Converts typography → font tokens
- Converts spacing/radii/shadows/grid → size/shadow/grid tokens
- Preserves `variantsAndHooks` in the original manifest (component metadata, not tokens)

## Best Practices

1. **Use References** - Prefer `{font.family.heading}` over duplicating values
2. **Shared Tokens** - Put common values (spacing, radii, shadows, grid) in `tokens/global/`
3. **Brand Overrides** - Only override what's different per brand in `tokens/brands/<brand>/`
4. **CTI Structure** - Always follow Category/Type/Item hierarchy
5. **Test After Changes** - Run compilation and verify Storybook renders correctly

## Troubleshooting

### Reference Errors

If you see "Reference Errors" during compilation:
- Check that referenced tokens exist
- Verify reference syntax: `{category.type.item}` (no `.value` suffix)
- Ensure token files are in the correct directory structure

### Missing CSS Variables

- Verify tokens are in the correct CTI structure
- Check that transforms are applied correctly
- Review the custom format logic in `scripts/style-dictionary/formats.js`

### RGB Values Not Generated

RGB values are generated automatically for hex colors. If missing:
- Ensure color values are valid hex strings (e.g., `#00529C`)
- Check the `hexToRgb` function in the format file

## Resources

- [Style Dictionary Documentation](https://styledictionary.com/)
- [CTI Structure Guide](https://styledictionary.com/format/tokens/#category-type-item)
- [Custom Transforms](https://styledictionary.com/transform/)
- [Custom Formats](https://styledictionary.com/format/)

