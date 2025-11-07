import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'SocialMediaFeed',
  category: 'display',
  displayName: 'Social Media Feed',
  description: 'Social media feed component with gallery and social links.',
  props: {
    headline: {
      type: 'string',
      description: 'Plain text headline',
      required: false,
      defaultValue: 'Get Social',
    },
    subheadline: {
      type: 'string',
      description: 'HTML string for subheadline (from CMS rich text editor)',
      required: false,
    },
    headlineLevel: {
      type: 'number',
      description: 'HTML heading level (1-6)',
      required: false,
      defaultValue: 2,
      enum: [1, 2, 3, 4, 5, 6],
    },
    followText: {
      type: 'string',
      description: 'Follow text below gallery',
      required: false,
      defaultValue: 'Follow lorem ipsum',
    },
    items: {
      type: 'array',
      description: 'Array of social media feed items',
      required: true,
      itemType: {
        image: { type: 'string', required: true },
        alt: { type: 'string', required: false },
        url: { type: 'string', required: false },
        platform: { type: 'string', description: 'Platform name (instagram, facebook, etc.)', required: false },
        platformIcon: { type: 'node', description: 'Platform icon component', required: false },
      },
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
    confirmExternalLinks: {
      type: 'boolean',
      description: 'Show confirmation dialog for external links',
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
    maxDepth: 2,
  },
});

