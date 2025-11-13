/**
 * Custom Style Dictionary formats
 */

/**
 * Convert hex color to RGB tuple (comma-separated)
 */
function hexToRgb(hex) {
  if (typeof hex !== 'string' || !hex.startsWith('#')) {
    return null;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
}

/**
 * Format for theme CSS variables matching current compiler output
 * Generates [data-theme="<brand>"] scoped CSS with exact variable naming
 */
export const formatCssThemeVariables = {
  name: 'css/theme-variables',
  format: ({ dictionary, options }) => {
  const brand = options.brand || 'default';
  // Get brand name from meta if available, otherwise use provided brandName
  const brandName = options.brandName || brand;
  
  let output = `/* Theme: ${brandName} */\n`;
  output += `/* Generated from theme.manifest.json */\n`;
  output += `[data-theme="${brand}"] {\n`;
  
  // Group tokens by category for organized output
  const tokens = dictionary.allTokens;
  
  // Palette section
  const paletteTokens = tokens.filter(t => 
    t.path[0] === 'color' && 
    !t.path.includes('rgb') &&
    (t.path[1] === 'brand' || t.path[1] === 'background' || t.path[1] === 'text' || 
     ['border', 'focus-ring', 'success', 'warning', 'danger'].includes(t.path[1]))
  );
  
  if (paletteTokens.length > 0) {
    output += `  /* Palette */\n`;
    
    // Brand colors
    paletteTokens
      .filter(t => t.path[1] === 'brand')
      .forEach(token => {
        output += `  ${token.name}: ${token.value};\n`;
        // Generate RGB from hex
        const rgb = hexToRgb(token.value);
        if (rgb) {
          output += `  ${token.name.replace(/:$/, '')}-rgb: ${rgb};\n`;
        }
      });
    
    // Background colors
    paletteTokens
      .filter(t => t.path[1] === 'background')
      .forEach(token => {
        output += `  ${token.name}: ${token.value};\n`;
        // Always generate fallback (use same value if no explicit fallback)
        const originalValue = token.original?.value || token.value;
        let fallbackValue = token.value;
        if (typeof originalValue === 'object' && originalValue.fallback) {
          fallbackValue = originalValue.fallback;
        }
        output += `  ${token.name}-fallback: ${fallbackValue};\n`;
        // Generate RGB from fallback
        const rgb = hexToRgb(fallbackValue);
        if (rgb) {
          output += `  ${token.name}-rgb: ${rgb};\n`;
        }
      });
    
    // Text colors
    paletteTokens
      .filter(t => t.path[1] === 'text')
      .forEach(token => {
        output += `  ${token.name}: ${token.value};\n`;
        // Generate RGB from hex
        const rgb = hexToRgb(token.value);
        if (rgb) {
          output += `  ${token.name}-rgb: ${rgb};\n`;
        }
      });
    
    // Other palette colors (border, focus-ring, success, warning, danger)
    ['border', 'focus-ring', 'success', 'warning', 'danger'].forEach(colorType => {
      const token = paletteTokens.find(t => t.path[1] === colorType);
      if (token) {
        output += `  ${token.name}: ${token.value};\n`;
        // Generate RGB from hex
        const rgb = hexToRgb(token.value);
        if (rgb) {
          output += `  ${token.name}-rgb: ${rgb};\n`;
        }
      }
    });
  }
  
  // Typography Families section
  const fontFamilyTokens = tokens.filter(t => 
    t.path[0] === 'font' && t.path[1] === 'family'
  );
  
  if (fontFamilyTokens.length > 0) {
    output += `\n  /* Typography Families */\n`;
    fontFamilyTokens.forEach(token => {
      output += `  ${token.name}: ${token.value};\n`;
    });
    
    // Add --font-medium and --font-bold if needed (derived from scales)
    // Check if h3 or label use heading family
    const h3Family = tokens.find(t => 
      t.path[0] === 'font' && t.path[1] === 'scale' && t.path[2] === 'h3' && t.path[3] === 'family'
    );
    const labelFamily = tokens.find(t => 
      t.path[0] === 'font' && t.path[1] === 'scale' && t.path[2] === 'label' && t.path[3] === 'family'
    );
    
    // Check if the family value references heading (either directly or via var)
    if (h3Family) {
      const familyValue = h3Family.value;
      if (typeof familyValue === 'string' && (familyValue.includes('heading') || familyValue.includes('GT America Trial Bd'))) {
        output += `  --font-medium: var(--font-heading);\n`;
      }
    }
    if (labelFamily) {
      const familyValue = labelFamily.value;
      if (typeof familyValue === 'string' && (familyValue.includes('heading') || familyValue.includes('GT America Trial Bd'))) {
        output += `  --font-bold: var(--font-heading);\n`;
      }
    }
  }
  
  // Typography Scales section
  const fontScaleTokens = tokens.filter(t => 
    t.path[0] === 'font' && t.path[1] === 'scale'
  );
  
  if (fontScaleTokens.length > 0) {
    output += `\n  /* Typography Scales */\n`;
    
    // Group by scale name
    const scales = {};
    fontScaleTokens.forEach(token => {
      const scaleName = token.path[2];
      if (!scales[scaleName]) {
        scales[scaleName] = [];
      }
      scales[scaleName].push(token);
    });
    
    // Output in order: display, h1-h6, body-large, body-small, label, small
    const scaleOrder = ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-large', 'body-small', 'label', 'small'];
    scaleOrder.forEach(scaleName => {
      if (scales[scaleName]) {
        const propertyOrder = ['family', 'weight', 'size', 'line', 'spacing'];
        propertyOrder.forEach(prop => {
          const token = scales[scaleName].find(t => 
            t.path[3] === prop || (prop === 'line' && t.path[3] === 'lineHeight') || 
            (prop === 'spacing' && t.path[3] === 'letterSpacing')
          );
          if (token) {
            // Check if this was originally a reference to font family
            let outputValue = token.value;
            if (prop === 'family') {
              const originalValue = token.original?.value;
              // If original was a reference like {font.family.heading}, output as CSS variable
              if (typeof originalValue === 'string' && originalValue.startsWith('{font.family.')) {
                const familyName = originalValue.match(/\{font\.family\.(\w+)\}/)?.[1];
                if (familyName) {
                  outputValue = `var(--font-${familyName})`;
                }
              }
            }
            output += `  ${token.name}: ${outputValue};\n`;
          }
        });
      }
    });
  }
  
  // Spacing section
  const spacingTokens = tokens.filter(t => 
    t.path[0] === 'size' && t.path[1] === 'spacing'
  ).sort((a, b) => {
    const aIndex = parseInt(a.path[2]);
    const bIndex = parseInt(b.path[2]);
    return aIndex - bIndex;
  });
  
  if (spacingTokens.length > 0) {
    output += `\n  /* Spacing */\n`;
    spacingTokens.forEach(token => {
      output += `  ${token.name}: ${token.value};\n`;
    });
    // Add --space-8 if spacing array has 8 items
    if (spacingTokens.length === 8) {
      output += `  --space-8: 64px;\n`;
    }
  }
  
  // Radii section
  const radiusTokens = tokens.filter(t => 
    t.path[0] === 'size' && t.path[1] === 'radius'
  );
  
  if (radiusTokens.length > 0) {
    output += `\n  /* Radii */\n`;
    radiusTokens.forEach(token => {
      output += `  ${token.name}: ${token.value};\n`;
    });
  }
  
  // Shadows section
  const shadowTokens = tokens.filter(t => 
    t.path[0] === 'shadow' && t.path[1] === 'base'
  );
  
  if (shadowTokens.length > 0) {
    output += `\n  /* Shadows */\n`;
    shadowTokens.forEach(token => {
      output += `  ${token.name}: ${token.value};\n`;
    });
  }
  
  // Grid section
  const gridTokens = tokens.filter(t => 
    t.path[0] === 'grid' && t.path[1] === 'system'
  );
  
  if (gridTokens.length > 0) {
    output += `\n  /* Grid */\n`;
    
    // columns
    const columnsToken = gridTokens.find(t => t.path[2] === 'columns');
    if (columnsToken) {
      output += `  ${columnsToken.name}: ${columnsToken.value};\n`;
    }
    
    // gutter
    const gutterToken = gridTokens.find(t => t.path[2] === 'gutter');
    if (gutterToken) {
      output += `  ${gutterToken.name}: ${gutterToken.value};\n`;
    }
    
    // container max widths
    const containerTokens = gridTokens.filter(t => t.path[2] === 'container');
    containerTokens.forEach(token => {
      output += `  ${token.name}: ${token.value};\n`;
      // Also add --container-* alias
      const containerSize = token.path[3];
      output += `  --container-${containerSize}: ${token.value};\n`;
    });
  }
  
  output += `}\n`;
  
  return output;
  },
};

/**
 * Format for @font-face rules
 * Generates CSS @font-face declarations from font metadata
 */
export const formatCssFontFace = {
  name: 'css/font-face',
  format: ({ dictionary, options }) => {
    // This will be handled separately as it's metadata, not tokens
    // For now, return empty string - font-face generation will be in the compiler script
    return '';
  },
};

