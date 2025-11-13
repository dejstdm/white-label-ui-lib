import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert theme.manifest.json to Style Dictionary CTI token structure
 */
function convertManifestToTokens(manifestPath, brand) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const tokensDir = path.join(__dirname, '..', 'tokens', 'brands', brand);
  
  // Create directory structure
  fs.mkdirSync(path.join(tokensDir, 'color'), { recursive: true });
  fs.mkdirSync(path.join(tokensDir, 'font'), { recursive: true });
  
  // Convert palette to color tokens
  const colorTokens = {};
  
  // Brand colors
  if (manifest.palette?.brand) {
    colorTokens.brand = {};
    Object.entries(manifest.palette.brand).forEach(([key, value]) => {
      colorTokens.brand[key] = {
        value: value
      };
    });
  }
  
  // Background colors
  if (manifest.palette?.bg) {
    colorTokens.background = {};
    Object.entries(manifest.palette.bg).forEach(([key, value]) => {
      if (typeof value === 'object' && (value.fill || value.value)) {
        colorTokens.background[key] = {
          value: value.fill || value.value,
          fallback: value.fallback || null
        };
      } else {
        colorTokens.background[key] = {
          value: value
        };
      }
    });
  }
  
  // Text colors
  if (manifest.palette?.text) {
    colorTokens.text = {};
    Object.entries(manifest.palette.text).forEach(([key, value]) => {
      colorTokens.text[key] = {
        value: value
      };
    });
  }
  
  // Other palette colors
  ['border', 'focus-ring', 'success', 'warning', 'danger'].forEach(key => {
    if (manifest.palette?.[key]) {
      if (!colorTokens[key]) {
        colorTokens[key] = {};
      }
      colorTokens[key] = {
        value: manifest.palette[key]
      };
    }
  });
  
  // Write color tokens
  if (colorTokens.brand) {
    fs.writeFileSync(
      path.join(tokensDir, 'color', 'brand.json'),
      JSON.stringify({ color: { brand: colorTokens.brand } }, null, 2)
    );
  }
  
  if (colorTokens.background) {
    fs.writeFileSync(
      path.join(tokensDir, 'color', 'background.json'),
      JSON.stringify({ color: { background: colorTokens.background } }, null, 2)
    );
  }
  
  if (colorTokens.text) {
    fs.writeFileSync(
      path.join(tokensDir, 'color', 'text.json'),
      JSON.stringify({ color: { text: colorTokens.text } }, null, 2)
    );
  }
  
  // Write other color tokens
  ['border', 'focus-ring', 'success', 'warning', 'danger'].forEach(key => {
    if (colorTokens[key]) {
      fs.writeFileSync(
        path.join(tokensDir, 'color', `${key}.json`),
        JSON.stringify({ color: { [key]: colorTokens[key] } }, null, 2)
      );
    }
  });
  
  // Convert typography families
  if (manifest.typography?.families) {
    const fontFamily = {};
    Object.entries(manifest.typography.families).forEach(([key, value]) => {
      fontFamily[key] = {
        value: value
      };
    });
    
    fs.writeFileSync(
      path.join(tokensDir, 'font', 'family.json'),
      JSON.stringify({ font: { family: fontFamily } }, null, 2)
    );
  }
  
  // Convert typography scales
  if (manifest.typography?.scales) {
    const fontScale = {};
    Object.entries(manifest.typography.scales).forEach(([scaleName, scaleProps]) => {
      fontScale[scaleName] = {};
      
      // Handle family - may be a reference or literal value
      if (scaleProps.family) {
        if (scaleProps.family === 'heading' || scaleProps.family === 'body') {
          // Reference to font family token
          fontScale[scaleName].family = {
            value: `{font.family.${scaleProps.family}}`
          };
        } else {
          // Literal value
          fontScale[scaleName].family = {
            value: scaleProps.family
          };
        }
      }
      
      if (scaleProps.weight !== undefined) {
        fontScale[scaleName].weight = {
          value: scaleProps.weight
        };
      }
      
      if (scaleProps.size) {
        fontScale[scaleName].size = {
          value: scaleProps.size
        };
      }
      
      if (scaleProps.lineHeight) {
        fontScale[scaleName].lineHeight = {
          value: scaleProps.lineHeight
        };
      }
      
      if (scaleProps.letterSpacing !== undefined) {
        fontScale[scaleName].letterSpacing = {
          value: scaleProps.letterSpacing
        };
      }
    });
    
    fs.writeFileSync(
      path.join(tokensDir, 'font', 'scale.json'),
      JSON.stringify({ font: { scale: fontScale } }, null, 2)
    );
  }
  
  // Convert spacing
  if (manifest.spacing && Array.isArray(manifest.spacing)) {
    const spacingTokens = {};
    manifest.spacing.forEach((value, index) => {
      spacingTokens[index] = {
        value: `${value}px`
      };
    });
    
    fs.mkdirSync(path.join(__dirname, '..', 'tokens', 'global', 'size'), { recursive: true });
    fs.writeFileSync(
      path.join(__dirname, '..', 'tokens', 'global', 'size', 'spacing.json'),
      JSON.stringify({ size: { spacing: spacingTokens } }, null, 2)
    );
  }
  
  // Convert radii
  if (manifest.radii) {
    const radiusTokens = {};
    Object.entries(manifest.radii).forEach(([key, value]) => {
      radiusTokens[key] = {
        value: value
      };
    });
    
    fs.mkdirSync(path.join(__dirname, '..', 'tokens', 'global', 'size'), { recursive: true });
    fs.writeFileSync(
      path.join(__dirname, '..', 'tokens', 'global', 'size', 'radii.json'),
      JSON.stringify({ size: { radius: radiusTokens } }, null, 2)
    );
  }
  
  // Convert shadows
  if (manifest.shadows) {
    const shadowTokens = {};
    Object.entries(manifest.shadows).forEach(([key, value]) => {
      shadowTokens[key] = {
        value: value
      };
    });
    
    fs.mkdirSync(path.join(__dirname, '..', 'tokens', 'global', 'shadow'), { recursive: true });
    fs.writeFileSync(
      path.join(__dirname, '..', 'tokens', 'global', 'shadow', 'base.json'),
      JSON.stringify({ shadow: { base: shadowTokens } }, null, 2)
    );
  }
  
  // Convert grid
  if (manifest.grid) {
    const gridTokens = {
      columns: {
        value: manifest.grid.columns
      },
      gutter: {
        value: manifest.grid.gutter
      }
    };
    
    if (manifest.grid.containerMaxWidths) {
      gridTokens.container = {};
      Object.entries(manifest.grid.containerMaxWidths).forEach(([key, value]) => {
        gridTokens.container[key] = {
          value: value
        };
      });
    }
    
    fs.mkdirSync(path.join(__dirname, '..', 'tokens', 'global', 'grid'), { recursive: true });
    fs.writeFileSync(
      path.join(__dirname, '..', 'tokens', 'global', 'grid', 'system.json'),
      JSON.stringify({ grid: { system: gridTokens } }, null, 2)
    );
  }
  
  // Save font-face metadata (if exists)
  if (manifest.fonts && Array.isArray(manifest.fonts) && manifest.fonts.length > 0) {
    fs.writeFileSync(
      path.join(tokensDir, 'font-face.json'),
      JSON.stringify({ fonts: manifest.fonts }, null, 2)
    );
  }
  
  console.log(`✓ Converted ${brand} manifest to tokens`);
}

// Main execution
const themesDir = path.join(__dirname, '..', 'themes');
const brands = process.argv[2] ? [process.argv[2]] : 
  fs.readdirSync(themesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

brands.forEach(brand => {
  const manifestPath = path.join(themesDir, brand, 'theme.manifest.json');
  if (fs.existsSync(manifestPath)) {
    convertManifestToTokens(manifestPath, brand);
  } else {
    console.warn(`⚠ Manifest not found: ${manifestPath}`);
  }
});

