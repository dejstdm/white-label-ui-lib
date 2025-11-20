import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'SocialMediaFeed',
  category: 'display',
  displayName: 'Social Media Feed',
  description: 'Social media feed component with gallery and social links.',
  props: {
    headline: {
      type: 'string',
      description: 'PlainText: Plain text headline (not from CMS, safe to render directly)',
      required: false,
      defaultValue: 'Get Social',
    },
    subheadline: {
      type: 'string',
      description: 'HtmlString: HTML string for subheadline (from CMS rich text editor, must use WysiwygContent)',
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
      description: 'PlainText: Follow text below gallery (not from CMS, safe to render directly)',
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
        platformIcon: { type: 'string', description: 'Font Awesome icon class names for platform badge (e.g., "fa-brands fa-square-instagram") - required if platform badge should be displayed', required: false },
      },
    },
    socialLinks: {
      type: 'array',
      description: 'Array of social media links',
      required: false,
      defaultValue: [],
      itemType: {
        name: { 
          type: 'string', 
          required: false,
          description: 'Name of the social media platform',
        },
        href: { 
          type: 'string', 
          required: false,
          description: 'URL to the social media profile',
        },
        icon: { 
          type: 'string', 
          required: true,
          description: 'Font Awesome icon class names (e.g., "fa-brands fa-square-facebook") - required',
        },
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

