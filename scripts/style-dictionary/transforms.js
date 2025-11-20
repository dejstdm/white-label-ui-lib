/**
 * Custom Style Dictionary transforms
 */
import { transformTypes } from 'style-dictionary/enums';

/**
 * Convert hex color to RGB tuple (comma-separated)
 * Example: #00529C -> "0, 82, 156"
 */
export const transformHexToRgb = {
  name: 'transform/hexToRgb',
  type: transformTypes.value,
  transitive: true,
  transform: (token) => {
    const value = token.original?.value || token.value;
    if (typeof value !== 'string' || !value.startsWith('#')) {
      return value;
    }

    const hex = value.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  },
};

/**
 * Extract fallback color from gradient object
 * Handles background tokens that may have {fill, fallback} structure
 */
export const transformGradientFallback = {
  name: 'transform/gradientFallback',
  type: transformTypes.value,
  transform: (token) => {
    const value = token.original?.value || token.value;
    
    // Handle null or undefined values
    if (value === null || value === undefined) {
      return value;
    }
    
    // If it's an object with fill/fallback, return the fill
    if (typeof value === 'object' && value.fill) {
      return value.fallback || value.fill;
    }
    
    // If it's a string (gradient or solid), return as-is
    return value;
  },
};

/**
 * Custom CSS variable naming transform
 * Maps CTI structure to our CSS variable naming convention
 */
export const transformNameCssVariable = {
  name: 'transform/nameCssVariable',
  type: transformTypes.name,
  transform: (token) => {
    const path = token.path;
    
    // Handle color tokens
    if (path[0] === 'color') {
      if (path[1] === 'brand') {
        // color.brand.primary -> --color-brand-primary
        return `--color-brand-${path.slice(2).join('-')}`;
      } else if (path[1] === 'background') {
        // color.background.page -> --color-bg-page
        return `--color-bg-${path.slice(2).join('-')}`;
      } else if (path[1] === 'text') {
        // color.text.primary -> --color-text-primary
        return `--color-text-${path.slice(2).join('-')}`;
      } else {
        // color.border -> --color-border
        return `--color-${path.slice(1).join('-')}`;
      }
    }
    
    // Handle font tokens
    if (path[0] === 'font') {
      if (path[1] === 'family') {
        // font.family.heading -> --font-heading
        return `--font-${path.slice(2).join('-')}`;
      } else if (path[1] === 'scale') {
        // font.scale.h1.size -> --type-h1-size
        const scaleName = path[2];
        const property = path[3];
        const propertyMap = {
          'size': 'size',
          'weight': 'weight',
          'lineHeight': 'line',
          'letterSpacing': 'spacing',
          'family': 'family'
        };
        const mappedProperty = propertyMap[property] || property;
        return `--type-${scaleName}-${mappedProperty}`;
      }
    }
    
    // Handle size tokens
    if (path[0] === 'size') {
      if (path[1] === 'spacing') {
        // size.spacing.0 -> --space-0
        return `--space-${path[2]}`;
      } else if (path[1] === 'radius') {
        // size.radius.sm -> --radius-sm
        return `--radius-${path.slice(2).join('-')}`;
      }
    }
    
    // Handle shadow tokens
    if (path[0] === 'shadow' && path[1] === 'base') {
      // shadow.base.sm -> --shadow-sm
      return `--shadow-${path.slice(2).join('-')}`;
    }
    
    // Handle grid tokens
    if (path[0] === 'grid' && path[1] === 'system') {
      if (path[2] === 'columns') {
        return '--grid-columns';
      } else if (path[2] === 'gutter') {
        return '--grid-gutter';
      } else if (path[2] === 'breakpoint') {
        return '--container-breakpoint';
      } else if (path[2] === 'container') {
        // grid.system.container.sm -> --grid-container-sm
        return `--grid-container-${path[3]}`;
      }
    }
    
    // Default: join with hyphens
    return `--${path.join('-')}`;
  },
};

