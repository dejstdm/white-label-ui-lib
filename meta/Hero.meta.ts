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
      description: 'HtmlString: HTML string for subheadline (from CMS rich text editor, must use WysiwygContent)',
      required: false,
    },
    headline: {
      type: 'string',
      description: 'PlainText: Plain text headline (not from CMS, safe to render directly)',
      required: false,
    },
    body: {
      type: 'string',
      description: 'HtmlString: HTML string for body content (from CMS rich text editor, must use WysiwygContent)',
      required: false,
    },
    buttonLabel: {
      type: 'string',
      description: 'PlainText: Button text label (not from CMS, safe to render directly)',
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

