import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'NavBar',
  category: 'navigation',
  displayName: 'Navigation Bar',
  description: 'Navigation bar component with sticky option, menu items, and mobile-responsive burger menu.',
  props: {
    logoSrc: {
      type: 'string',
      description: 'Image URL for the navigation logo. When omitted, no logo is rendered.',
      required: false,
    },
    logoAlt: {
      type: 'string',
      description: 'Accessible alternate text for the navigation logo image.',
      required: false,
      defaultValue: '',
    },
    items: {
      type: 'array',
      description: 'Array of navigation items',
      required: false,
      defaultValue: [],
      itemType: {
        label: { 
          type: 'string', 
          required: true,
          description: 'PlainText: Display label for the navigation item (not from CMS, safe to render directly).',
        },
        href: { 
          type: 'string', 
          required: false,
          description: 'URL for the navigation link.',
        },
        active: { 
          type: 'boolean', 
          required: false,
          description: 'Whether this item is currently active/selected.',
        },
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

