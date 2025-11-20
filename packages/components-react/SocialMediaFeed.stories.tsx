import React from 'react';
import { SocialMediaFeed } from './SocialMediaFeed';
import feedImage1 from '../../stories/assets/pepsi-images/alexander-sergienko-S_fpEkzHnJo-unsplash.jpg';
import feedImage2 from '../../stories/assets/pepsi-images/ja-san-miguel-xYSp0kkIUio-unsplash.jpg';
import feedImage3 from '../../stories/assets/pepsi-images/mohammed-benjadi-aHp47GFJqqw-unsplash.jpg';
import feedImage4 from '../../stories/assets/pepsi-images/nikhil-82LJQZGwW5o-unsplash.jpg';
import feedImage5 from '../../stories/assets/recipes/Mac_JackOLantern_FinalDish_1x1.jpg';

export default {
  title: 'Components/SocialMediaFeed',
  component: SocialMediaFeed,
  tags: ['autodocs'],
  argTypes: {
    headline: {
      control: 'text',
      description: 'Plain text field - not from CMS',
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
      control: 'text',
      description: 'HTML string from CMS rich text editor',
    },
    followText: {
      control: 'text',
      description: 'Plain text field',
    },
    items: {
      control: 'object',
      description: 'Array of gallery items with image, alt, url, and platform',
    },
    socialLinks: {
      control: 'object',
      description: 'Array of social media link objects with name, href, and icon (Font Awesome class names, e.g., "fa-brands fa-square-facebook") - required',
    },
    confirmExternalLinks: {
      control: 'boolean',
      description: 'Enable/disable confirmation dialog for external links',
    },
  },
};

const defaultItems = [
  {
    image: feedImage1,
    alt: 'Social media post 1',
    url: 'https://instagram.com/p/example1',
    platform: 'instagram',
  },
  {
    image: feedImage2,
    alt: 'Social media post 2',
    url: 'https://instagram.com/p/example2',
    platform: 'instagram',
  },
  {
    image: feedImage3,
    alt: 'Social media post 3',
    url: 'https://instagram.com/p/example3',
    platform: 'instagram',
  },
  {
    image: feedImage4,
    alt: 'Social media post 4',
    url: 'https://instagram.com/p/example4',
    platform: 'instagram',
  },
  {
    image: feedImage5,
    alt: 'Social media post 5',
    url: 'https://instagram.com/p/example5',
    platform: 'instagram',
  },
];

const defaultSocialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/example',
    icon: 'fa-brands fa-square-facebook',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/example',
    icon: 'fa-brands fa-square-instagram',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/example',
    icon: 'fa-brands fa-square-x-twitter',
  },
];

export const Default = {
  args: {
    headline: 'Get Social',
    followText: 'Follow lorem ipsum',
    items: defaultItems,
    socialLinks: defaultSocialLinks,
    confirmExternalLinks: false,
  },
};

export const WithConfirmationDialog = {
  args: {
    headline: 'Get Social',
    followText: 'Follow lorem ipsum',
    items: defaultItems,
    socialLinks: defaultSocialLinks,
    confirmExternalLinks: true,
  },
};

export const WithSubheadline = {
  args: {
    headline: 'Get Social',
    subheadline: '<p>Connect with us on social media and stay updated with our latest news and updates.</p>',
    followText: 'Follow lorem ipsum',
    items: defaultItems,
    socialLinks: defaultSocialLinks,
    confirmExternalLinks: false,
  },
};

export const WithoutSocialLinks = {
  args: {
    headline: 'Get Social',
    followText: 'Follow lorem ipsum',
    items: defaultItems,
    socialLinks: [],
    confirmExternalLinks: false,
  },
};

export const WithoutFollowText = {
  args: {
    headline: 'Get Social',
    items: defaultItems,
    socialLinks: defaultSocialLinks,
    confirmExternalLinks: false,
  },
};

export const Minimal = {
  args: {
    headline: 'Get Social',
    items: defaultItems.slice(0, 3),
    socialLinks: [],
    confirmExternalLinks: false,
  },
};

