import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'Footer',
  category: 'navigation',
  displayName: 'Footer',
  description:
    'Footer with brand logo, social accounts, navigation links, and legal copy.',

  props: {
    logoSrc: {
      type: 'string',
      description: 'Image URL for the footer logo. When omitted, the logo block is hidden.',
      required: false,
    },
    logoAlt: {
      type: 'string',
      description: 'Accessible alternate text for the footer logo image.',
      required: false,
      defaultValue: '',
    },
    socialLinks: {
      type: 'array',
      description: 'Social network icons and links displayed inline beneath the logo.',
      required: false,
      defaultValue: [],
      itemType: {
        name: { 
          type: 'string', 
          required: false, 
          description: 'Name of the social media platform (e.g. "Facebook", "Instagram"). Auto-detected if not provided.' 
        },
        href: {
          type: 'string',
          required: false,
          description: 'URL to the social media profile. When omitted the icon renders as a static element.',
        },
        icon: {
          type: 'node',
          required: false,
          description: 'Custom icon component (optional). If not provided, icon is auto-detected from name.',
        },
        iconSize: {
          type: 'number',
          required: false,
          description: 'Icon size in pixels. Defaults to 25 if not provided.',
        },
        iconColor: {
          type: 'string',
          required: false,
          description: 'Icon color (CSS color value). Defaults to "currentColor" if not provided.',
        },
      },
    },
    links: {
      type: 'array',
      description: 'Inline footer navigation links rendered to the right of the logo.',
      required: false,
      defaultValue: [],
      itemType: {
        label: {
          type: 'string',
          required: true,
          description: 'PlainText: Visible link label (not from CMS, safe to render directly).',
        },
        href: {
          type: 'string',
          required: false,
          description: 'Optional link destination. When missing, renders as plain text.',
        },
      },
    },
    copyright: {
      type: 'string',
      description:
        'Full copyright string. If empty the component derives "{copyrightYear} PEPSICO".',
      required: false,
      defaultValue: '2022 PEPSICO',
    },
    copyrightYear: {
      type: 'string',
      description: 'Year fallback used when the copyright string is not provided.',
      required: false,
      defaultValue: '2022',
    },
    className: {
      type: 'string',
      description: 'Additional utility classes appended to the root `<footer>` element.',
      required: false,
      defaultValue: '',
    },
  },

  
  intents: ['navigation', 'legal', 'social'],

  constraints: {
    maxDepth: 1,
    recommendedContainer: 'footer',
  },
});