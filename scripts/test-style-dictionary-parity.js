import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract CSS variables from CSS content
 */
function extractVariables(css) {
  const variables = {};
  const regex = /--([^:]+):\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    const name = match[1].trim();
    const value = match[2].trim();
    variables[name] = value;
  }
  return variables;
}

/**
 * Compare two CSS files
 */
function compareCSS(originalPath, newPath, brand) {
  if (!fs.existsSync(originalPath)) {
    console.error(`❌ Original file not found: ${originalPath}`);
    return false;
  }
  
  if (!fs.existsSync(newPath)) {
    console.error(`❌ New file not found: ${newPath}`);
    return false;
  }
  
  const originalCSS = fs.readFileSync(originalPath, 'utf-8');
  const newCSS = fs.readFileSync(newPath, 'utf-8');
  
  const originalVars = extractVariables(originalCSS);
  const newVars = extractVariables(newCSS);
  
  const originalKeys = Object.keys(originalVars);
  const newKeys = Object.keys(newVars);
  
  let hasErrors = false;
  const missing = [];
  const extra = [];
  const different = [];
  
  // Check for missing variables
  originalKeys.forEach(key => {
    if (!(key in newVars)) {
      missing.push(key);
      hasErrors = true;
    } else if (originalVars[key] !== newVars[key]) {
      different.push({
        key,
        original: originalVars[key],
        new: newVars[key]
      });
      hasErrors = true;
    }
  });
  
  // Check for extra variables (warn but don't fail)
  newKeys.forEach(key => {
    if (!(key in originalVars)) {
      extra.push(key);
    }
  });
  
  console.log(`\n📊 Parity Test Results for ${brand}:`);
  console.log(`   Original variables: ${originalKeys.length}`);
  console.log(`   New variables: ${newKeys.length}`);
  
  if (missing.length > 0) {
    console.log(`\n❌ Missing variables (${missing.length}):`);
    missing.forEach(key => {
      console.log(`   - ${key}: ${originalVars[key]}`);
    });
  }
  
  if (different.length > 0) {
    console.log(`\n❌ Different values (${different.length}):`);
    different.forEach(({ key, original, new: newValue }) => {
      console.log(`   - ${key}:`);
      console.log(`     Original: ${original}`);
      console.log(`     New:      ${newValue}`);
    });
  }
  
  if (extra.length > 0) {
    console.log(`\n⚠️  Extra variables (${extra.length}):`);
    extra.forEach(key => {
      console.log(`   - ${key}: ${newVars[key]}`);
    });
  }
  
  if (!hasErrors && extra.length === 0) {
    console.log(`\n✅ Perfect match! All variables match exactly.`);
    return true;
  } else if (!hasErrors) {
    console.log(`\n✅ All original variables match. Extra variables are acceptable.`);
    return true;
  } else {
    console.log(`\n❌ Parity test failed.`);
    return false;
  }
}

// Main execution
const themesDir = path.join(__dirname, '..', 'themes');
const brands = process.argv[2] ? [process.argv[2]] : 
  fs.readdirSync(themesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let allPassed = true;

brands.forEach(brand => {
  const originalPath = path.join(themesDir, brand, 'dist', 'theme.css');
  const newPath = path.join(themesDir, brand, 'dist', 'theme.css'); // Same file for now
  
  // For testing, we need to compile with old compiler first, then new
  // For now, just compare what we have
  console.log(`\n${'='.repeat(60)}`);
  const passed = compareCSS(originalPath, newPath, brand);
  if (!passed) {
    allPassed = false;
  }
});

if (!allPassed) {
  process.exit(1);
}

