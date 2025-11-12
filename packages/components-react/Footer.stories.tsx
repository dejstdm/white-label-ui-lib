import React from 'react';
import { Footer } from './Footer';
import facebookIcon from '../../stories/assets/facebook.svg';
import instagramIcon from '../../stories/assets/instagram.svg';
import xTwitterIcon from '../../stories/assets/x-twitter.svg';
import pepsicoLogo from './assets/pepsicolabs_logo.png';
import laysLogo from './assets/lays-logo.png';
import sevenUpLogo from './assets/logo-7up.png';

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
    logoSrc: pepsicoLogo,
    logoAlt: 'PepsiCo Labs logo',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithCustomCopyright = {
  render: Template,
  args: {
    logoSrc: pepsicoLogo,
    logoAlt: 'PepsiCo Labs logo',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyright: '2024 All Rights Reserved',
  },
};

export const WithoutSocialLinks = {
  render: Template,
  args: {
    logoSrc: pepsicoLogo,
    logoAlt: 'PepsiCo Labs logo',
    socialLinks: [],
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithoutLinks = {
  render: Template,
  args: {
    logoSrc: pepsicoLogo,
    logoAlt: 'PepsiCo Labs logo',
    socialLinks: defaultSocialLinks,
    copyrightYear: '2022',
  },
};

export const Minimal = {
  render: Template,
  args: {
    logoSrc: pepsicoLogo,
    logoAlt: 'PepsiCo Labs logo',
    socialLinks: [],
    links: [],
    copyrightYear: '2022',
  },
};

export const LaysTheme = {
  render: Template,
  args: {
    logoSrc: laysLogo,
    logoAlt: "Lay's logo",
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const SevenUpTheme = {
  render: Template,
  args: {
    logoSrc: sevenUpLogo,
    logoAlt: '7UP logo',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithoutLogo = {
  render: Template,
  args: {
    logoSrc: undefined,
    logoAlt: '',
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

