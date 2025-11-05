import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function generateCSS(manifest) {
  // Get theme name from directory name (e.g., "default" from "themes/default")
  const themePath = manifest.__filepath || '';
  const themeName = path.basename(themePath) || 'default';
  
  let css = `/* Theme: ${manifest.meta.brandName} */
/* Generated from theme.manifest.json */
[data-theme="${themeName}"] {
  /* Palette */
`;

  // Brand colors
  if (manifest.palette.brand) {
    Object.entries(manifest.palette.brand).forEach(([key, value]) => {
      css += `  --color-brand-${key}: ${value};\n`;
      const rgb = hexToRgb(value);
      if (rgb) {
        css += `  --color-brand-${key}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n`;
      }
    });
  }

  // Background colors
  if (manifest.palette.bg) {
    Object.entries(manifest.palette.bg).forEach(([key, value]) => {
      css += `  --color-bg-${key}: ${value};\n`;
      const rgb = hexToRgb(value);
      if (rgb) {
        css += `  --color-bg-${key}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n`;
      }
    });
  }

  // Text colors
  if (manifest.palette.text) {
    Object.entries(manifest.palette.text).forEach(([key, value]) => {
      css += `  --color-text-${key}: ${value};\n`;
      const rgb = hexToRgb(value);
      if (rgb) {
        css += `  --color-text-${key}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n`;
      }
    });
  }

  // Other palette colors
  ['border', 'focus-ring', 'success', 'warning', 'danger'].forEach((key) => {
    if (manifest.palette[key]) {
      css += `  --color-${key}: ${manifest.palette[key]};\n`;
      const rgb = hexToRgb(manifest.palette[key]);
      if (rgb) {
        css += `  --color-${key}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n`;
      }
    }
  });

  // Typography families
  css += `\n  /* Typography Families */\n`;
  if (manifest.typography.families) {
    // Map to expected variable names
    if (manifest.typography.families.heading) {
      css += `  --font-heading: ${manifest.typography.families.heading};\n`;
    }
    if (manifest.typography.families.body) {
      css += `  --font-body: ${manifest.typography.families.body};\n`;
    }
    // Also check for font-medium and font-bold from scales
    const scales = manifest.typography.scales || {};
    if (scales.h3?.family) {
      const h3Family = scales.h3.family;
      if (h3Family === 'heading' || h3Family === 'body') {
        css += `  --font-medium: var(--font-${h3Family});\n`;
      } else {
        css += `  --font-medium: ${h3Family};\n`;
      }
    }
    if (scales.label?.family) {
      const labelFamily = scales.label.family;
      if (labelFamily === 'heading' || labelFamily === 'body') {
        css += `  --font-bold: var(--font-${labelFamily});\n`;
      } else {
        css += `  --font-bold: ${labelFamily};\n`;
      }
    }
  }

  // Typography scales - map to --type-*-* format
  css += `\n  /* Typography Scales */\n`;
  if (manifest.typography.scales) {
    Object.entries(manifest.typography.scales).forEach(([scale, props]) => {
      // Map scale names and property names
      const scaleMap = {
        'display': 'display',
        'h1': 'h1',
        'h2': 'h2',
        'h3': 'h3',
        'body-large': 'body-large',
        'body-small': 'body-small',
        'label': 'label',
        'small': 'small'
      };
      const mappedScale = scaleMap[scale] || scale;
      
      Object.entries(props).forEach(([prop, value]) => {
        // Map property names
        const propMap = {
          'family': 'family',
          'size': 'size',
          'weight': 'weight',
          'lineHeight': 'line',
          'letterSpacing': 'spacing'
        };
        const mappedProp = propMap[prop] || prop;
        
        // Resolve font family references (heading, body) to CSS variables
        if (prop === 'family' && (value === 'heading' || value === 'body')) {
          css += `  --type-${mappedScale}-${mappedProp}: var(--font-${value});\n`;
        } else {
          css += `  --type-${mappedScale}-${mappedProp}: ${value};\n`;
        }
      });
    });
  }

  // Spacing - map to --space-* format
  css += `\n  /* Spacing */\n`;
  if (manifest.spacing) {
    manifest.spacing.forEach((value, index) => {
      css += `  --space-${index}: ${value}px;\n`;
    });
    // Add --space-8 if not present (common next step: 64px)
    if (manifest.spacing.length === 8) {
      css += `  --space-8: 64px;\n`;
    }
  }

  // Radii
  css += `\n  /* Radii */\n`;
  if (manifest.radii) {
    Object.entries(manifest.radii).forEach(([key, value]) => {
      css += `  --radius-${key}: ${value};\n`;
    });
  }

  // Shadows
  css += `\n  /* Shadows */\n`;
  if (manifest.shadows) {
    Object.entries(manifest.shadows).forEach(([key, value]) => {
      css += `  --shadow-${key}: ${value};\n`;
    });
  }

  // Grid
  css += `\n  /* Grid */\n`;
  if (manifest.grid) {
    css += `  --grid-columns: ${manifest.grid.columns};\n`;
    css += `  --grid-gutter: ${manifest.grid.gutter};\n`;
    if (manifest.grid.containerMaxWidths) {
      Object.entries(manifest.grid.containerMaxWidths).forEach(([key, value]) => {
        css += `  --grid-container-${key}: ${value};\n`;
        // Also add --container-* alias for components
        css += `  --container-${key}: ${value};\n`;
      });
    }
  }

  css += `}\n`;

  return css;
}

function validateVariantsAndHooks(manifest) {
  if (!manifest.variantsAndHooks) {
    return; // Optional section, no validation needed
  }

  const warnings = [];
  const errors = [];

  // Helper to check if a role exists in palette
  function roleExists(role) {
    const parts = role.split('/');
    if (parts.length === 2) {
      const [category, name] = parts;
      if (category === 'brand' && manifest.palette?.brand?.[name]) return true;
      if (category === 'bg' && manifest.palette?.bg?.[name]) return true;
      if (category === 'text' && manifest.palette?.text?.[name]) return true;
      if (manifest.palette?.[role]) return true;
    }
    return false;
  }

  // Validate each component's variants
  Object.entries(manifest.variantsAndHooks).forEach(([componentName, componentDef]) => {
    if (!componentDef.variants) {
      warnings.push(`Component "${componentName}" in variantsAndHooks has no variants defined`);
      return;
    }

    Object.entries(componentDef.variants).forEach(([variantName, variant]) => {
      // Validate element type
      if (variant.element && !['button', 'a', 'div', 'span', 'nav'].includes(variant.element)) {
        warnings.push(`Component "${componentName}" variant "${variantName}" has unknown element type: ${variant.element}`);
      }

      // Validate roles
      if (variant.roles) {
        variant.roles.forEach(role => {
          if (!roleExists(role)) {
            warnings.push(`Component "${componentName}" variant "${variantName}" references non-existent role: ${role}`);
          }
        });
      }

      // Validate typography scale
      if (variant.typography) {
        if (!manifest.typography?.scales?.[variant.typography]) {
          warnings.push(`Component "${componentName}" variant "${variantName}" references non-existent typography scale: ${variant.typography}`);
        }
      }

      // Validate radii
      if (variant.radii) {
        if (!manifest.radii?.[variant.radii]) {
          warnings.push(`Component "${componentName}" variant "${variantName}" references non-existent radius: ${variant.radii}`);
        }
      }

      // Validate spacing indices
      if (variant.spacing && Array.isArray(variant.spacing)) {
        variant.spacing.forEach(spacingIndex => {
          if (!manifest.spacing || spacingIndex >= manifest.spacing.length) {
            warnings.push(`Component "${componentName}" variant "${variantName}" references invalid spacing index: ${spacingIndex}`);
          }
        });
      }
    });
  });

  // Log warnings (non-blocking)
  if (warnings.length > 0) {
    console.warn('\n⚠ VariantsAndHooks validation warnings:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }

  // Log errors (blocking)
  if (errors.length > 0) {
    console.error('\n❌ VariantsAndHooks validation errors:');
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }
}

function compileTheme(themePath) {
  const manifestPath = path.join(themePath, 'theme.manifest.json');
  const distPath = path.join(themePath, 'dist');
  const outputPath = path.join(distPath, 'theme.css');

  if (!fs.existsSync(manifestPath)) {
    console.error(`Error: ${manifestPath} not found`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  manifest.__filepath = themePath;

  // Validate variantsAndHooks before compiling
  validateVariantsAndHooks(manifest);

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  const css = generateCSS(manifest);
  fs.writeFileSync(outputPath, css, 'utf-8');
  console.log(`✓ Compiled theme: ${outputPath}`);
}

// Find all themes and compile them
const themesDir = path.join(__dirname, '..', 'themes');

if (fs.existsSync(themesDir)) {
  const themes = fs.readdirSync(themesDir, { withFileTypes: true });
  themes.forEach((dirent) => {
    if (dirent.isDirectory()) {
      const themePath = path.join(themesDir, dirent.name);
      compileTheme(themePath);
    }
  });
} else {
  console.error(`Error: themes directory not found at ${themesDir}`);
  process.exit(1);
}

