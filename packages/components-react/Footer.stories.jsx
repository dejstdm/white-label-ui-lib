import React from 'react';
import { Footer } from './Footer';
import facebookIcon from '../../stories/assets/facebook.svg';
import instagramIcon from '../../stories/assets/instagram.svg';
import xTwitterIcon from '../../stories/assets/x-twitter.svg';

// Social media icon component
const SocialIcon = ({ src, alt }) => (
  <img src={src} alt={alt} width="25" height="25" />
);

export default {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    logoSrc: {
      control: 'text',
      description: 'Image URL displayed in the footer logo block.',
    },
    logoAlt: {
      control: 'text',
      description: 'Accessible alternate text for the footer logo image.',
    },
    brand: {
      control: {
        type: 'select',
      },
      options: ['default', '7up', 'lays'],
      description: 'Theme key used to load the built-in fallback logo.',
    },
    socialLinks: {
      control: 'object',
      description: 'Array of social media link objects with name, href, and icon',
    },
    links: {
      control: 'object',
      description: 'Array of footer navigation link objects',
    },
    copyright: {
      control: 'text',
      description: 'Copyright text (overrides copyrightYear if provided)',
    },
    copyrightYear: {
      control: 'text',
      description: 'Copyright year (used if copyright prop is not provided)',
    },
  },
};

const Template = (args) => <Footer {...args} />;

const defaultSocialLinks = [
  {
    name: 'facebook',
    href: '#facebook',
    icon: <SocialIcon src={facebookIcon} alt="Facebook" />,
  },
  {
    name: 'instagram',
    href: '#instagram',
    icon: <SocialIcon src={instagramIcon} alt="Instagram" />,
  },
  {
    name: 'x-twitter',
    href: '#x-twitter',
    icon: <SocialIcon src={xTwitterIcon} alt="X (Twitter)" />,
  },
];

const defaultLinks = [
  { label: 'Link1', href: '#link1' },
  { label: 'Link2', href: '#link2' },
  { label: 'Link3', href: '#link3' },
  { label: 'Link4', href: '#link4' },
  { label: 'Link5', href: '#link5' },
];

export const Default = {
  render: Template,
  args: {
    brand: 'default',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithCustomLogoImage = {
  render: Template,
  args: {
    logoSrc: 'https://via.placeholder.com/180x54?text=Custom+Logo',
    logoAlt: 'Custom brand logo',
    brand: undefined,
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithCustomCopyright = {
  render: Template,
  args: {
    brand: 'default',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyright: '2024 All Rights Reserved',
  },
};

export const WithoutSocialLinks = {
  render: Template,
  args: {
    brand: 'default',
    socialLinks: [],
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithoutLinks = {
  render: Template,
  args: {
    brand: 'default',
    socialLinks: defaultSocialLinks,
    copyrightYear: '2022',
  },
};

export const Minimal = {
  render: Template,
  args: {
    brand: 'default',
    socialLinks: [],
    links: [],
    copyrightYear: '2022',
  },
};

export const LaysTheme = {
  render: Template,
  args: {
    brand: 'lays',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const SevenUpTheme = {
  render: Template,
  args: {
    brand: '7up',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

