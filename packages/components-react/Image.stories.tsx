import React from 'react';
import { Image } from './Image';
import pepsiImage1 from '../../stories/assets/pepsi-images/alexander-sergienko-S_fpEkzHnJo-unsplash.jpg';

export default {
  title: 'Internal/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL (required)',
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
};

export const Default = {
  args: {
    src: pepsiImage1,
    alt: 'Pepsi product image',
    width: 800,
    height: 600,
  },
};

export const Square = {
  args: {
    src: pepsiImage1,
    alt: 'Square image example',
    width: 600,
    height: 600,
  },
};

export const Portrait = {
  args: {
    src: pepsiImage1,
    alt: 'Portrait image example',
    width: 400,
    height: 600,
  },
};

export const Landscape = {
  args: {
    src: pepsiImage1,
    alt: 'Landscape image example',
    width: 1200,
    height: 600,
  },
};

export const WithCustomClass = {
  args: {
    src: pepsiImage1,
    alt: 'Image with custom class',
    width: 800,
    height: 600,
    className: 'custom-image-class',
  },
};

