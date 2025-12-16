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
    
    // Append theme-overrides.css if it exists (always refresh content on rebuild)
    const themeDir = path.join(__dirname, 'themes', brandName);
    const overridesPath = path.join(themeDir, 'theme-overrides.css');
    const themeCssPath = path.join(themeDir, 'dist', 'theme.css');
    
    if (fs.existsSync(overridesPath) && fs.existsSync(themeCssPath)) {
      const overridesContent = fs.readFileSync(overridesPath, 'utf-8');
      const existingThemeCss = fs.readFileSync(themeCssPath, 'utf-8');

      const BEGIN = '/* BEGIN THEME OVERRIDES */';
      const END = '/* END THEME OVERRIDES */';

      let baseCss = existingThemeCss;

      // Prefer removing our explicit block first.
      const beginIdx = baseCss.indexOf(BEGIN);
      const endIdx = baseCss.indexOf(END);
      if (beginIdx !== -1 && endIdx !== -1 && endIdx > beginIdx) {
        baseCss = baseCss.slice(0, beginIdx);
      } else {
        // Legacy cleanup: previous builds appended overrides without explicit markers.
        // Our generated CSS format does not include this phrase, so it’s safe to strip.
        const legacyMarkerIdx = baseCss.indexOf('Theme Component Overrides');
        if (legacyMarkerIdx !== -1) {
          const startCommentIdx = baseCss.lastIndexOf('/*', legacyMarkerIdx);
          baseCss = baseCss.slice(0, startCommentIdx === -1 ? legacyMarkerIdx : startCommentIdx);
        }
      }

      const combinedCss =
        baseCss.trimEnd() +
        '\n\n' +
        BEGIN +
        '\n' +
        overridesContent.trim() +
        '\n' +
        END +
        '\n';

      fs.writeFileSync(themeCssPath, combinedCss, 'utf-8');
    }
    
    console.log(`✓ Compiled theme with Style Dictionary: themes/${brandName}/dist/theme.css`);
  }
}

// If run directly, build all themes
if (import.meta.url === `file://${process.argv[1]}`) {
  buildThemes();
}
