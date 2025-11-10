import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'BrandLogo',
  category: 'branding',
  displayName: 'Brand Logo',
  description:
    'Theme-aware logo renderer that resolves the correct brand asset based on the provided brand key.',

  props: {
    brand: {
      type: 'string',
      description:
        'Brand key used to resolve packaged logo assets (e.g. "default", "7up", "lays"). Defaults to the primary brand mark.',
      required: false,
      defaultValue: 'default',
    },
    fallback: {
      type: 'string',
      description:
        'Secondary brand key used when the primary asset is missing. Defaults to the global "default" logo.',
      required: false,
      defaultValue: 'default',
    },
    alt: {
      type: 'string',
      description:
        'Accessible alternate text. When not provided, the component uses the packaged asset alt text.',
      required: false,
    },
    className: {
      type: 'string',
      description: 'Additional CSS classes appended to the rendered logo element.',
      required: false,
      defaultValue: '',
    },
  },

  constraints: {
    maxDepth: 1,
  },
});

