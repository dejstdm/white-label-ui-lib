import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'ProductSlider',
  category: 'display',
  displayName: 'Product Slider',
  description: 'Product carousel/slider with navigation controls.',
  props: {
    headline: {
      type: 'string',
      description: 'Plain text headline',
      required: false,
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
    products: {
      type: 'array',
      description: 'Array of product items',
      required: false,
      defaultValue: [],
      itemType: {
        id: { type: 'string|number', required: false },
        image: { type: 'string', required: false },
        imageAlt: { type: 'string', required: false },
        title: { type: 'string', required: false },
        description: { type: 'string', description: 'HTML string from CMS', required: false },
        buttonLabel: { type: 'string', required: false },
        buttonHref: { type: 'string', required: false },
        buttonOnClick: { type: 'function', required: false },
      },
    },
    containerBreakpoint: {
      type: 'string',
      description: 'Container max-width breakpoint',
      required: false,
      defaultValue: null,
      enum: ['sm', 'md', 'lg', 'xl', 'xxl', null],
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

