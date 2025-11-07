import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'RecipeSlider',
  category: 'display',
  displayName: 'Recipe Slider',
  description: 'Recipe carousel/slider with navigation and pagination.',
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
    recipes: {
      type: 'array',
      description: 'Array of recipe items',
      required: false,
      defaultValue: [],
      itemType: {
        id: { type: 'string|number', required: false },
        image: { type: 'string', required: false },
        imageAlt: { type: 'string', required: false },
        href: { type: 'string', description: 'Recipe link URL', required: false },
      },
    },
    headerButtonLabel: {
      type: 'string',
      description: 'Header button text',
      required: false,
    },
    headerButtonHref: {
      type: 'string',
      description: 'Header button URL',
      required: false,
    },
    headerButtonOnClick: {
      type: 'function',
      description: 'Header button click handler',
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
    maxDepth: 2,
  },
});

