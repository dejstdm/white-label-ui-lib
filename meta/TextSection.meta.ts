import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'TextSection',
  category: 'display',
  displayName: 'Text Section',
  description: 'Text content section with headline and WYSIWYG content.',
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
    text: {
      type: 'string',
      description: 'HtmlString: HTML string for text content (from CMS rich text editor, must use WysiwygContent)',
      required: false,
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

