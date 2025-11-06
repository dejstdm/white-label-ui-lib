import React from 'react';
import { SocialMediaFeed } from './SocialMediaFeed';

// Import social media icons (blue versions)
import facebookIcon from '../../stories/assets/facebook-blue.svg';
import instagramIcon from '../../stories/assets/instagram-blue.svg';
import xTwitterIcon from '../../stories/assets/x-twitter-blue.svg';

// Social media icon component
const SocialIcon = ({ src, alt }) => (
  <img src={src} alt={alt} width="40" height="40" />
);

// Platform icon component for gallery items
const PlatformIcon = ({ src, alt }) => (
  <img src={src} alt={alt} width="30" height="30" />
);

// Figma image URLs (these will be replaced with actual images when available)
const figmaImages = {
  rectangle1: 'http://localhost:3845/assets/cba21047f379d09c44087b931f6c37e222e3bd99.png',
  rectangle2: 'http://localhost:3845/assets/885570ddacc6c25ded77e269a7c2ead074fc9297.png',
  rectangle3: 'http://localhost:3845/assets/b09ffc90b805ac251f5982c987cde81fd579d6e4.png',
  rectangle4: 'http://localhost:3845/assets/43c95253b06c2dd1df7fa0b731167c11749e693c.png',
  rectangle5: 'http://localhost:3845/assets/81bb13fff338c5e2458d15e800375b0e27e928bb.png',
};

export default {
  title: 'Components/SocialMediaFeed',
  component: SocialMediaFeed,
  tags: ['autodocs'],
  argTypes: {
    headline: {
      control: 'text',
      description: 'Plain text field - not from CMS',
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
      description: 'Array of social media link objects with name, href, and icon',
    },
    confirmExternalLinks: {
      control: 'boolean',
      description: 'Enable/disable confirmation dialog for external links',
    },
  },
};

const defaultItems = [
  {
    image: figmaImages.rectangle1,
    alt: 'Social media post 1',
    url: 'https://instagram.com/p/example1',
    platform: 'instagram',
    platformIcon: <PlatformIcon src={instagramIcon} alt="Instagram" />,
  },
  {
    image: figmaImages.rectangle2,
    alt: 'Social media post 2',
    url: 'https://instagram.com/p/example2',
    platform: 'instagram',
    platformIcon: <PlatformIcon src={instagramIcon} alt="Instagram" />,
  },
  {
    image: figmaImages.rectangle3,
    alt: 'Social media post 3',
    url: 'https://instagram.com/p/example3',
    platform: 'instagram',
    platformIcon: <PlatformIcon src={instagramIcon} alt="Instagram" />,
  },
  {
    image: figmaImages.rectangle4,
    alt: 'Social media post 4',
    url: 'https://instagram.com/p/example4',
    platform: 'instagram',
    platformIcon: <PlatformIcon src={instagramIcon} alt="Instagram" />,
  },
  {
    image: figmaImages.rectangle5,
    alt: 'Social media post 5',
    url: 'https://instagram.com/p/example5',
    platform: 'instagram',
    platformIcon: <PlatformIcon src={instagramIcon} alt="Instagram" />,
  },
];

const defaultSocialLinks = [
  {
    name: 'facebook',
    href: 'https://facebook.com/example',
    icon: <SocialIcon src={facebookIcon} alt="Facebook" />,
  },
  {
    name: 'instagram',
    href: 'https://instagram.com/example',
    icon: <SocialIcon src={instagramIcon} alt="Instagram" />,
  },
  {
    name: 'x-twitter',
    href: 'https://x.com/example',
    icon: <SocialIcon src={xTwitterIcon} alt="X (Twitter)" />,
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

