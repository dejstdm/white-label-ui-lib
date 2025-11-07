import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'Footer',
  category: 'navigation',
  displayName: 'Footer',
  description: 'Footer component with logo, links, and content sections.',
  props: {
    logo: {
      type: 'node',
      description: 'Logo component or image URL. Defaults to PEPSICO LABS logo if not provided.',
      required: false,
    },
    socialLinks: {
      type: 'array',
      description: 'Array of social media links',
      required: false,
      defaultValue: [],
      itemType: {
        name: { type: 'string', required: false },
        href: { type: 'string', required: false },
        icon: { type: 'node', required: true },
      },
    },
    links: {
      type: 'array',
      description: 'Array of footer navigation links',
      required: false,
      defaultValue: [],
      itemType: {
        label: { type: 'string', required: true },
        href: { type: 'string', required: false },
      },
    },
    copyright: {
      type: 'string',
      description: 'Copyright text',
      required: false,
      defaultValue: '2022 PEPSICO',
    },
    copyrightYear: {
      type: 'string',
      description: 'Copyright year',
      required: false,
      defaultValue: '2022',
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

