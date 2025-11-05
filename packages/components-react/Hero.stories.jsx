import React from 'react';
import { Hero } from './Hero';

// Image from Figma - using the localhost URL provided by Figma MCP
const heroBackgroundImage = 'http://localhost:3845/assets/8fb9639b4efbbec4a0d7d0e7c6e8e40c840bbbff.png';

export default {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    backgroundImage: heroBackgroundImage,
    subheadline: 'Sed ut perspiciatis unde omnis',
    headline: 'Lorem ipsum dolor sit amet, consectetur adipi scing elit',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
    buttonLabel: 'Lorem ipsum',
    buttonHref: '#',
  },
};

export const WithoutButton = {
  args: {
    backgroundImage: heroBackgroundImage,
    subheadline: 'Sed ut perspiciatis unde omnis',
    headline: 'Lorem ipsum dolor sit amet, consectetur adipi scing elit',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
  },
};

export const Minimal = {
  args: {
    backgroundImage: heroBackgroundImage,
    headline: 'Lorem ipsum dolor sit amet',
  },
};


