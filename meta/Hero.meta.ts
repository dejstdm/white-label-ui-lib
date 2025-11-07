import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'Hero',
  category: 'layout',
  displayName: 'Hero Section',
  description: 'Full-width hero section with background image, headline, body content, and optional button.',
  props: {
    backgroundImage: {
      type: 'string',
      description: 'URL of background image',
      required: false,
    },
    subheadline: {
      type: 'string',
      description: 'HTML string for subheadline (from CMS rich text editor)',
      required: false,
    },
    headline: {
      type: 'string',
      description: 'Plain text headline',
      required: false,
    },
    body: {
      type: 'string',
      description: 'HTML string for body content (from CMS rich text editor)',
      required: false,
    },
    buttonLabel: {
      type: 'string',
      description: 'Button text label',
      required: false,
    },
    buttonHref: {
      type: 'string',
      description: 'Button link URL',
      required: false,
    },
    buttonOnClick: {
      type: 'function',
      description: 'Button click handler',
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

