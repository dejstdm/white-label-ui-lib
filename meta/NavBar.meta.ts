import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'NavBar',
  category: 'navigation',
  displayName: 'Navigation Bar',
  description: 'Navigation bar component with sticky option, menu items, and mobile-responsive burger menu.',
  props: {
    logo: {
      type: 'node',
      description: 'Logo component or image URL. Defaults to PEPSICO LABS logo if not provided.',
      required: false,
    },
    brand: {
      type: 'string',
      description: 'Brand key used to resolve packaged logo assets (e.g. "default", "7up", "lays"). Only used when logo prop is not provided.',
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

