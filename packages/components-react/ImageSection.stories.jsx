import React from 'react';
import { ImageSection } from './ImageSection';

// Import pepsi images
import pepsiImage1 from '../../stories/assets/pepsi-images/alexander-sergienko-S_fpEkzHnJo-unsplash.jpg';
import pepsiImage2 from '../../stories/assets/pepsi-images/mohammed-benjadi-aHp47GFJqqw-unsplash.jpg';
import pepsiImage3 from '../../stories/assets/pepsi-images/ja-san-miguel-xYSp0kkIUio-unsplash.jpg';
import pepsiImage4 from '../../stories/assets/pepsi-images/nikhil-82LJQZGwW5o-unsplash.jpg';

export default {
  title: 'Components/ImageSection',
  component: ImageSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    headline: {
      description: 'Plain text field - not from CMS',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text)',
        },
      },
    },
    headlineLevel: {
      description: 'Semantic heading level for the headline (visual style remains H2)',
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      table: {
        type: {
          summary: 'number',
          detail: 'Heading level rendered as <h{n}>; default 2.',
        },
        defaultValue: { summary: 2 },
      },
    },
    subheadline: {
      description: 'HTML string from CMS rich text editor',
      control: 'text',
      table: {
        type: {
          summary: 'string (HTML from CMS)',
          detail: 'HTML string from CMS rich text editor, e.g., "<p>Text</p>"',
        },
      },
    },
    images: {
      description: 'Array of image objects',
      control: 'object',
      table: {
        type: {
          summary: 'array',
          detail: `[
  {
    id: string | number,
    src: string (required),
    alt: string,
    href: string (optional - makes image clickable)
  }
]`,
        },
      },
    },
  },
};

const defaultImages = [
  {
    id: 1,
    src: pepsiImage1,
    alt: 'Pepsi product image 1',
  },
  {
    id: 2,
    src: pepsiImage2,
    alt: 'Pepsi product image 2',
  },
  {
    id: 3,
    src: pepsiImage3,
    alt: 'Pepsi product image 3',
  },
  {
    id: 4,
    src: pepsiImage4,
    alt: 'Pepsi product image 4',
  },
];

export const Default = {
  args: {
    headline: 'Image Section',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    images: [defaultImages[0]],
  },
};

export const SingleImage = {
  args: {
    headline: 'Single Image',
    subheadline: '<p>This section displays a single image without a slider</p>',
    images: [
      {
        id: 1,
        src: pepsiImage1,
        alt: 'Pepsi product showcase',
      },
    ],
  },
};

export const MultipleImages = {
  args: {
    headline: 'Image Gallery',
    subheadline: '<p>Multiple images displayed in a slider. Only one image is visible at a time.</p>',
    images: defaultImages,
  },
};

export const ClickableImages = {
  args: {
    headline: 'Clickable Images',
    subheadline: '<p>Images with links show a hover icon to indicate they are clickable</p>',
    images: [
      {
        id: 1,
        src: pepsiImage1,
        alt: 'Pepsi product - click to view',
        href: 'https://example.com/product1',
      },
      {
        id: 2,
        src: pepsiImage2,
        alt: 'Pepsi product - click to view',
        href: 'https://example.com/product2',
      },
      {
        id: 3,
        src: pepsiImage3,
        alt: 'Pepsi product - click to view',
        href: 'https://example.com/product3',
      },
    ],
  },
};

export const MixedImages = {
  args: {
    headline: 'Mixed Images',
    subheadline: '<p>Some images are clickable, others are not</p>',
    images: [
      {
        id: 1,
        src: pepsiImage1,
        alt: 'Pepsi product - clickable',
        href: 'https://example.com/product1',
      },
      {
        id: 2,
        src: pepsiImage2,
        alt: 'Pepsi product - not clickable',
      },
      {
        id: 3,
        src: pepsiImage3,
        alt: 'Pepsi product - clickable',
        href: 'https://example.com/product3',
      },
      {
        id: 4,
        src: pepsiImage4,
        alt: 'Pepsi product - not clickable',
      },
    ],
  },
};

export const NoHeader = {
  args: {
    images: defaultImages,
  },
};

export const InternalLinks = {
  args: {
    headline: 'Internal Links',
    subheadline: '<p>Images can link to internal pages as well</p>',
    images: [
      {
        id: 1,
        src: pepsiImage1,
        alt: 'Pepsi product - internal link',
        href: '/products/pepsi-classic',
      },
      {
        id: 2,
        src: pepsiImage2,
        alt: 'Pepsi product - internal link',
        href: '/products/pepsi-zero',
      },
    ],
  },
};

