import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'ProductDetail',
  category: 'display',
  displayName: 'Product Detail',
  description: 'Product detail page component with variants: overview, compact, or tabs. Includes product information, nutritional table, and CTA button.',
  props: {
    variant: {
      type: 'string',
      description: 'Component variant: overview (full info with nutritional table, no CTA), compact (with CTA and nutritional table), or tabs (with CTA and tabbed content)',
      required: false,
      defaultValue: 'overview',
      enum: ['overview', 'compact', 'tabs'],
    },
    image: {
      type: 'string',
      description: 'Product image URL - required',
      required: true,
    },
    imageAlt: {
      type: 'string',
      description: 'Alt text for product image',
      required: false,
    },
    title: {
      type: 'string',
      description: 'HtmlString: Product title (HTML from CMS rich text editor, must use WysiwygContent)',
      required: false,
    },
    titleLevel: {
      type: 'number',
      description: 'HTML heading level for title (1-6)',
      required: false,
      defaultValue: 2,
      enum: [1, 2, 3, 4, 5, 6],
    },
    tagline: {
      type: 'string',
      description: 'HtmlString: Product tagline/short description (HTML from CMS, only shown in overview variant)',
      required: false,
    },
    headline: {
      type: 'string',
      description: 'HtmlString: Product headline (HTML from CMS, only shown in overview variant)',
      required: false,
    },
    description: {
      type: 'string',
      description: 'HtmlString: Product description (HTML from CMS rich text editor, must use WysiwygContent)',
      required: false,
    },
    ctaLabel: {
      type: 'string',
      description: 'PlainText: CTA button label (not from CMS, safe to render directly, only shown in compact and tabs variants)',
      required: false,
    },
    ctaHref: {
      type: 'string',
      description: 'CTA button link URL',
      required: false,
    },
    ctaOnClick: {
      type: 'function',
      description: 'CTA button click handler',
      required: false,
    },
    nutritionalTable: {
      type: 'string',
      description: 'HtmlString: Nutritional information table (HTML from CMS WYSIWYG, only shown in overview and compact variants)',
      required: false,
    },
    ingredients: {
      type: 'string',
      description: 'HtmlString: Ingredients content (HTML from CMS, only shown in tabs variant)',
      required: false,
    },
    nutritional: {
      type: 'string',
      description: 'HtmlString: Nutritional content (HTML from CMS, only shown in tabs variant)',
      required: false,
    },
    defaultTab: {
      type: 'string',
      description: 'Default active tab for tabs variant',
      required: false,
      defaultValue: 'ingredients',
      enum: ['ingredients', 'nutritional'],
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
