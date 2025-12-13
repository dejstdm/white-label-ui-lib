import StyleDictionary from 'style-dictionary';
import { transformHexToRgb, transformGradientFallback, transformNameCssVariable } from './scripts/style-dictionary/transforms.js';
import { formatCssThemeVariables } from './scripts/style-dictionary/formats.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transforms } from 'style-dictionary/enums';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register custom transforms
StyleDictionary.registerTransform(transformHexToRgb);
StyleDictionary.registerTransform(transformGradientFallback);
StyleDictionary.registerTransform(transformNameCssVariable);

// Register custom format
StyleDictionary.registerFormat(formatCssThemeVariables);

/**
 * Get all brand directories
 */
function getBrands() {
  const themesDir = path.join(__dirname, 'themes');
  if (!fs.existsSync(themesDir)) {
    return [];
  }
  
  return fs.readdirSync(themesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * Build configuration for a specific brand
 */
function getBrandConfig(brand) {
  // Read brand name from manifest
  const manifestPath = path.join(__dirname, 'themes', brand, 'theme.manifest.json');
  let brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      if (manifest.meta?.brandName) {
        brandName = manifest.meta.brandName;
      }
    } catch (e) {
      // Fallback to default
    }
  }
  
  return {
    source: [
      'tokens/global/**/*.json',
      `tokens/brands/${brand}/**/*.json`
    ],
    platforms: {
      css: {
        transforms: [
          transforms.attributeCti,
          transforms.attributeColor,
          'transform/gradientFallback',
          'transform/nameCssVariable',
        ],
        buildPath: `themes/${brand}/dist/`,
        files: [
          {
            destination: 'theme.css',
            format: 'css/theme-variables',
            options: {
              brand: brand,
              brandName: brandName
            }
          },
          {
            destination: 'tokens.json',
            format: 'json/nested'
          }
        ]
      }
    }
  };
}

/**
 * Main configuration - builds all brands
 */
const config = {
  // This will be populated per brand
};

// Export function to build specific brand or all brands
export default async function buildThemes(brand = null) {
  const brands = brand ? [brand] : getBrands();
  
  for (const brandName of brands) {
    const brandConfig = getBrandConfig(brandName);
    const sd = new StyleDictionary(brandConfig);
    await sd.buildAllPlatforms();
    
    // Append theme-overrides.css if it exists
    const themeDir = path.join(__dirname, 'themes', brandName);
    const overridesPath = path.join(themeDir, 'theme-overrides.css');
    const themeCssPath = path.join(themeDir, 'dist', 'theme.css');
    
    if (fs.existsSync(overridesPath) && fs.existsSync(themeCssPath)) {
      const overridesContent = fs.readFileSync(overridesPath, 'utf-8');
      const existingThemeCss = fs.readFileSync(themeCssPath, 'utf-8');
      // Only append if not already appended (avoid duplicates on re-runs)
      // Check for any marker from theme-overrides.css
      const hasOverrides = existingThemeCss.includes('Theme Component Overrides') ||
                          existingThemeCss.includes('Button Component') ||
                          existingThemeCss.includes('Component Overrides');
      
      if (!hasOverrides) {
        const combinedCss = existingThemeCss + '\n\n' + overridesContent;
        fs.writeFileSync(themeCssPath, combinedCss, 'utf-8');
      }
    }
    
    console.log(`✓ Compiled theme with Style Dictionary: themes/${brandName}/dist/theme.css`);
  }
}

// If run directly, build all themes
if (import.meta.url === `file://${process.argv[1]}`) {
  buildThemes();
}
