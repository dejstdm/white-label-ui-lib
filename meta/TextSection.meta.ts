import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'TextSection',
  category: 'display',
  displayName: 'Text Section',
  description: 'Text content section with headline and WYSIWYG content.',
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
    text: {
      type: 'string',
      description: 'HTML string for text content (from CMS rich text editor)',
      required: false,
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
    maxDepth: 1,
  },
});

