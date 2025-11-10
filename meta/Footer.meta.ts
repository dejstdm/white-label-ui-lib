import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'Footer',
  category: 'navigation',
  displayName: 'Footer',
  description:
    'Footer with brand logo, social accounts, navigation links, and legal copy.',

  props: {
    logo: {
      type: 'node',
      description:
        'React node or image URL for the brand mark. Defaults to the PEPSICO LABS lockup when omitted.',
      required: false,
    },
    brand: {
      type: 'string',
      description:
        'Brand key used to resolve the packaged logo assets (e.g. "default", "7up", "lays"). Only used when logo prop is not provided.',
      required: false,
      defaultValue: 'default',
    },
    socialLinks: {
      type: 'array',
      description: 'Social network icons and links displayed inline beneath the logo.',
      required: false,
      defaultValue: [],
      itemType: {
        name: { type: 'string', required: false, description: 'Accessible network name, e.g. "LinkedIn".' },
        href: {
          type: 'string',
          required: false,
          description: 'Destination URL. When omitted the icon renders as a static element.',
        },
        icon: {
          type: 'node',
          required: true,
          description: 'React node for the network icon (SVG, icon component, etc.).',
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
          description: 'Visible link label (plain text from CMS or config).',
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