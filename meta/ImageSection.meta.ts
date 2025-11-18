import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'ImageSection',
  category: 'display',
  displayName: 'Image Gallery',
  description: 'Image gallery section with optional slider/carousel functionality.',
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

