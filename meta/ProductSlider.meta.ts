import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'ProductSlider',
  category: 'display',
  displayName: 'Product Slider',
  description: 'Product carousel/slider with navigation controls.',
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
    products: {
      type: 'array',
      description: 'Array of product items',
      required: false,
      defaultValue: [],
      itemType: {
        id: { type: 'string|number', required: false },
        image: { type: 'string', required: false },
        imageAlt: { type: 'string', required: false },
        title: { type: 'string', description: 'PlainText: Product title (not from CMS, safe to render directly)', required: false },
        description: { type: 'string', description: 'HtmlString: Product description (HTML from CMS rich text editor, must use WysiwygContent)', required: false },
        buttonLabel: { type: 'string', description: 'PlainText: Button label (not from CMS, safe to render directly)', required: false },
        buttonHref: { type: 'string', required: false },
        buttonOnClick: { type: 'function', required: false },
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

