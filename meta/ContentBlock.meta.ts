import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'ContentBlock',
  category: 'display',
  displayName: 'Content Block',
  description: 'Content block component with image and text. Supports single row or multiple rows with zig-zag pattern.',
  props: {
    variant: {
      type: 'string',
      description: 'Layout variant: single row or multiple rows with zig-zag pattern',
      required: false,
      defaultValue: 'single',
      enum: ['single', 'multiple'],
    },
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
    imagePosition: {
      type: 'string',
      description: 'Image position: controls first row position in multiple variant, single row position in single variant',
      required: false,
      defaultValue: 'right',
      enum: ['left', 'right'],
    },
    // Single variant props
    imageSrc: {
      type: 'string',
      description: 'Image source URL (single variant)',
      required: false,
    },
    imageAlt: {
      type: 'string',
      description: 'Alt text for the image (single variant)',
      required: false,
    },
    imageWidth: {
      type: 'number',
      description: 'Image width in pixels (single variant)',
      required: false,
    },
    imageHeight: {
      type: 'number',
      description: 'Image height in pixels (single variant)',
      required: false,
    },
    heading: {
      type: 'string',
      description: 'HtmlString: Heading text (HTML from CMS, single variant)',
      required: false,
    },
    content: {
      type: 'string',
      description: 'HtmlString: Body content (HTML from CMS, single variant)',
      required: false,
    },
    // Multiple variant props
    items: {
      type: 'array',
      description: 'Array of content items (multiple variant). Each item should have: id, imageSrc, imageAlt, imageWidth, imageHeight, heading (HTML), content (HTML)',
      required: false,
      defaultValue: [],
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
