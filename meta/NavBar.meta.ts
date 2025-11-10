import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'NavBar',
  category: 'navigation',
  displayName: 'Navigation Bar',
  description: 'Navigation bar component with sticky option, menu items, and mobile-responsive burger menu.',
  props: {
    logoSrc: {
      type: 'string',
      description: 'Image URL for the navigation logo. When omitted a theme-based default is used.',
      required: false,
    },
    logoAlt: {
      type: 'string',
      description: 'Accessible alternate text for the navigation logo image (defaults to the theme logo alt).',
      required: false,
      defaultValue: '',
    },
    brand: {
      type: 'string',
      description: 'Theme key used to pick the built-in default logo (e.g. "default", "7up", "lays").',
      required: false,
      defaultValue: 'default',
    },
    items: {
      type: 'array',
      description: 'Array of navigation items',
      required: false,
      defaultValue: [],
      itemType: {
        label: { type: 'string', required: true },
        href: { type: 'string', required: false },
        active: { type: 'boolean', required: false },
      },
    },
    sticky: {
      type: 'boolean',
      description: 'Make navbar sticky on scroll',
      required: false,
      defaultValue: false,
    },
    className: {
      type: 'string',
      description: 'Additional CSS classes',
      required: false,
      defaultValue: '',
    },
  },
  constraints: {
    maxDepth: 1,
  },
});

