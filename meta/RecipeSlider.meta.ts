import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'RecipeSlider',
  category: 'display',
  displayName: 'Recipe Slider',
  description: 'Recipe carousel/slider with navigation and pagination. Supports two variations: image-only (default) and with-content (shows title and read more button).',
  props: {
    headline: {
      type: 'string',
      description: 'PlainText: Plain text headline (not from CMS, safe to render directly)',
      required: false,
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
        title: { type: 'string', description: 'PlainText: Recipe title (for with-content variation)', required: false },
        readMoreLabel: { type: 'string', description: 'PlainText: Read more button label (for with-content variation)', required: false },
        readMoreHref: { type: 'string', description: 'Read more button URL (for with-content variation)', required: false },
        readMoreOnClick: { type: 'function', description: 'Read more button click handler (for with-content variation)', required: false },
      },
    },
    headerButtonLabel: {
      type: 'string',
      description: 'PlainText: Header button text (not from CMS, safe to render directly)',
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
    variant: {
      type: 'string',
      description: 'Variation: "image-only" shows only images (default), "with-content" shows title and read more button',
      required: false,
      defaultValue: 'image-only',
      enum: ['image-only', 'with-content'],
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

