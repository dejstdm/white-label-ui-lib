import React from 'react';
import { ContentBlock } from './ContentBlock';

// Import pepsi images
import pepsiImage1 from '../../stories/assets/pepsi-images/alexander-sergienko-S_fpEkzHnJo-unsplash.jpg';
import pepsiImage2 from '../../stories/assets/pepsi-images/mohammed-benjadi-aHp47GFJqqw-unsplash.jpg';
import pepsiImage3 from '../../stories/assets/pepsi-images/ja-san-miguel-xYSp0kkIUio-unsplash.jpg';
import pepsiImage4 from '../../stories/assets/pepsi-images/nikhil-82LJQZGwW5o-unsplash.jpg';

export default {
  title: 'Components/ContentBlock',
  component: ContentBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Layout variant: single row or multiple rows with zig-zag pattern',
      control: { type: 'select' },
      options: ['single', 'multiple'],
      table: {
        type: {
          summary: "'single' | 'multiple'",
        },
        defaultValue: { summary: "'single'" },
      },
    },
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
    imagePosition: {
      description: 'Image position: controls first row position in multiple variant, single row position in single variant',
      control: { type: 'select' },
      options: ['left', 'right'],
      table: {
        type: {
          summary: "'left' | 'right'",
        },
        defaultValue: { summary: "'right'" },
      },
    },
    imageSrc: {
      description: 'Image source URL (single variant)',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    imageAlt: {
      description: 'Alt text for the image (single variant)',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    imageWidth: {
      description: 'Image width in pixels (single variant)',
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    imageHeight: {
      description: 'Image height in pixels (single variant)',
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    heading: {
      description: 'Heading text (HTML from CMS, single variant)',
      control: 'text',
      table: {
        type: {
          summary: 'string (HTML from CMS)',
        },
      },
    },
    content: {
      description: 'Body content (HTML from CMS, single variant)',
      control: 'text',
      table: {
        type: {
          summary: 'string (HTML from CMS)',
        },
      },
    },
    items: {
      description: 'Array of content items (multiple variant)',
      control: 'object',
      table: {
        type: {
          summary: 'array',
          detail: `[
  {
    id: string | number,
    imageSrc: string (required),
    imageAlt: string (required),
    imageWidth: number (required),
    imageHeight: number (required),
    heading: string (HTML from CMS),
    content: string (HTML from CMS)
  }
]`,
        },
      },
    },
  },
};

export const SingleImageRight = {
  args: {
    variant: 'single',
    imagePosition: 'right',
    imageSrc: pepsiImage1,
    imageAlt: 'People enjoying Pepsi products',
    imageWidth: 800,
    imageHeight: 600,
    heading: '<h2>Our Story</h2>',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
  },
};

export const SingleImageLeft = {
  args: {
    variant: 'single',
    imagePosition: 'left',
    imageSrc: pepsiImage2,
    imageAlt: 'People enjoying Pepsi products',
    imageWidth: 800,
    imageHeight: 600,
    heading: '<h2>Our Mission</h2>',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>',
  },
};

export const SingleWithHeader = {
  args: {
    variant: 'single',
    headline: 'Content Block',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    imagePosition: 'right',
    imageSrc: pepsiImage1,
    imageAlt: 'People enjoying Pepsi products',
    imageWidth: 800,
    imageHeight: 600,
    heading: '<h2>Our Story</h2>',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
  },
};

export const MultipleZigZag = {
  args: {
    variant: 'multiple',
    imagePosition: 'right',
    items: [
      {
        id: 1,
        imageSrc: pepsiImage1,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Story</h2>',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
      },
      {
        id: 2,
        imageSrc: pepsiImage2,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Mission</h2>',
        content: '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
      },
      {
        id: 3,
        imageSrc: pepsiImage3,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Values</h2>',
        content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>',
      },
    ],
  },
};

export const MultipleZigZagStartLeft = {
  args: {
    variant: 'multiple',
    imagePosition: 'left',
    items: [
      {
        id: 1,
        imageSrc: pepsiImage1,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Story</h2>',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
      },
      {
        id: 2,
        imageSrc: pepsiImage2,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Mission</h2>',
        content: '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
      },
    ],
  },
};

export const MultipleWithHeader = {
  args: {
    variant: 'multiple',
    headline: 'About Us',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    imagePosition: 'right',
    items: [
      {
        id: 1,
        imageSrc: pepsiImage1,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Story</h2>',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
      },
      {
        id: 2,
        imageSrc: pepsiImage2,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Mission</h2>',
        content: '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>',
      },
    ],
  },
};

export const MultipleRichContent = {
  args: {
    variant: 'multiple',
    imagePosition: 'right',
    items: [
      {
        id: 1,
        imageSrc: pepsiImage1,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Story</h2>',
        content: `
          <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <ul>
            <li>Feature one with <a href="#">a link</a></li>
            <li>Feature two with <em>emphasis</em></li>
            <li>Feature three</li>
          </ul>
        `,
      },
      {
        id: 2,
        imageSrc: pepsiImage2,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Mission</h2>',
        content: `
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `,
      },
      {
        id: 3,
        imageSrc: pepsiImage3,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Values</h2>',
        content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>',
      },
      {
        id: 4,
        imageSrc: pepsiImage4,
        imageAlt: 'People enjoying Pepsi products',
        imageWidth: 800,
        imageHeight: 600,
        heading: '<h2>Our Commitment</h2>',
        content: '<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>',
      },
    ],
  },
};
