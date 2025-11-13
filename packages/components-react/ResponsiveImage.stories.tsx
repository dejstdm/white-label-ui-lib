import React from 'react';
import { ResponsiveImage } from './ResponsiveImage';
import pepsiImage1 from '../../stories/assets/pepsi-images/alexander-sergienko-S_fpEkzHnJo-unsplash.jpg';
import pepsiImage2 from '../../stories/assets/pepsi-images/mohammed-benjadi-aHp47GFJqqw-unsplash.jpg';

export default {
  title: 'Internal/ResponsiveImage',
  component: ResponsiveImage,
  tags: ['autodocs'],
  argTypes: {
    mobileSrc: {
      control: 'text',
      description: 'Image source URL for mobile devices (at least one image required)',
    },
    desktopSrc: {
      control: 'text',
      description: 'Image source URL for desktop devices (at least one image required)',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility (required)',
    },
    width: {
      control: 'number',
      description: 'Image width in pixels (required)',
    },
    height: {
      control: 'number',
      description: 'Image height in pixels (required)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Responsive image component using the `<picture>` tag. Accepts mobile and desktop images. If only one image is provided, it will be used for both mobile and desktop. Always includes width and height attributes and CSS aspect-ratio.',
      },
    },
  },
};

export const MobileAndDesktop = {
  args: {
    mobileSrc: pepsiImage1,
    desktopSrc: pepsiImage2,
    alt: 'Responsive image with different mobile and desktop sources',
    width: 800,
    height: 600,
  },
};

export const SingleImage = {
  args: {
    mobileSrc: pepsiImage1,
    alt: 'Single image used for both mobile and desktop',
    width: 800,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'When only one image is provided, it is used for both mobile and desktop.',
      },
    },
  },
};

export const DesktopOnly = {
  args: {
    desktopSrc: pepsiImage2,
    alt: 'Desktop image used for both mobile and desktop',
    width: 800,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'When only desktop image is provided, it is used for both mobile and desktop.',
      },
    },
  },
};

export const Square = {
  args: {
    mobileSrc: pepsiImage1,
    desktopSrc: pepsiImage2,
    alt: 'Square responsive image',
    width: 600,
    height: 600,
  },
};

export const Portrait = {
  args: {
    mobileSrc: pepsiImage1,
    desktopSrc: pepsiImage2,
    alt: 'Portrait responsive image',
    width: 400,
    height: 600,
  },
};

export const Landscape = {
  args: {
    mobileSrc: pepsiImage1,
    desktopSrc: pepsiImage2,
    alt: 'Landscape responsive image',
    width: 1200,
    height: 600,
  },
};

export const WithCustomClass = {
  args: {
    mobileSrc: pepsiImage1,
    desktopSrc: pepsiImage2,
    alt: 'Responsive image with custom class',
    width: 800,
    height: 600,
    className: 'custom-responsive-image-class',
  },
};

