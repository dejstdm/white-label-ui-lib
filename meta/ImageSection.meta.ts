import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'ImageSection',
  category: 'display',
  displayName: 'Image Gallery',
  description: 'Image gallery section with optional slider/carousel functionality.',
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
    images: {
      type: 'array',
      description: 'Array of images',
      required: false,
      defaultValue: [],
      itemType: {
        id: { type: 'string|number', required: false },
        src: { type: 'string', required: true },
        alt: { type: 'string', required: false },
        href: { type: 'string', description: 'Optional link URL', required: false },
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

