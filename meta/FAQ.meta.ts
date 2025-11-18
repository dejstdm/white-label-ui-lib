import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'FAQ',
  category: 'display',
  displayName: 'FAQ Accordion',
  description: 'FAQ accordion component with expandable questions/answers.',
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
    items: {
      type: 'array',
      description: 'Array of FAQ items',
      required: false,
      defaultValue: [],
      itemType: {
        id: { type: 'string|number', required: false },
        question: { type: 'string', description: 'PlainText: Question text (not from CMS, safe to render directly)', required: true },
        answer: { type: 'string', description: 'HtmlString: Answer content (HTML from CMS rich text editor, must use WysiwygContent)', required: true },
      },
    },
    className: {
      type: 'string',
      description: 'Additional CSS classes',
      required: false,
      defaultValue: '',
    },
    collapseMode: {
      type: 'string',
      description: 'Accordion behaviour. Use "single" to keep one item open, "multiple" to allow several expanded at once.',
      required: false,
      defaultValue: 'single',
      enum: ['single', 'multiple'],
    },
  },
  constraints: {
    maxDepth: 1,
  },
});

