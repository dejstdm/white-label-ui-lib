import React from 'react';
import { Hero } from './Hero';
import laysHeroBackground from '../../stories/assets/theme-lays/lays-de-header-desktop.jpg';

export default {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: {
      description: 'Background image URL',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
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
    headline: {
      description: 'Plain text field - not from CMS',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text)',
        },
      },
    },
    body: {
      description: 'HTML string from CMS rich text editor',
      control: 'text',
      table: {
        type: {
          summary: 'string (HTML from CMS)',
          detail: 'HTML string from CMS rich text editor, e.g., "<p>Text</p>"',
        },
      },
    },
    buttonLabel: {
      description: 'Plain text field for link text',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text)',
        },
      },
    },
    buttonHref: {
      description: 'Plain text field for link URL',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text)',
        },
      },
    },
  },
};

export const Default = {
  args: {
    backgroundImage: laysHeroBackground,
    subheadline: '<p>Sed ut perspiciatis unde omnis</p>', // HTML from CMS
    headline: 'Lorem ipsum dolor sit amet, consectetur adipi scing elit', // Plain text
    body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>', // HTML from CMS
    buttonLabel: 'Lorem ipsum', // Plain text
    buttonHref: '#',
  },
};

export const WithoutButton = {
  args: {
    backgroundImage: laysHeroBackground,
    subheadline: '<p>Sed ut perspiciatis unde omnis</p>', // HTML from CMS
    headline: 'Lorem ipsum dolor sit amet, consectetur adipi scing elit', // Plain text
    body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>', // HTML from CMS
  },
};

export const Minimal = {
  args: {
    backgroundImage: laysHeroBackground,
    headline: 'Lorem ipsum dolor sit amet', // Plain text
  },
};


