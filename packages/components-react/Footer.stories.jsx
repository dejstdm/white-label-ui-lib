import React from 'react';
import { Footer } from './Footer';

// Import assets directly
import logoImage from '../../stories/assets/pepsicolabs_logo_inv.svg';
import facebookIcon from '../../stories/assets/facebook.svg';
import instagramIcon from '../../stories/assets/instagram.svg';
import whatsappIcon from '../../stories/assets/WhatsApp.svg';

// Social media icon component
const SocialIcon = ({ src, alt }) => (
  <img src={src} alt={alt} width="25" height="25" />
);

export default {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: false,
      description: 'Logo component or image URL',
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
    name: 'whatsapp',
    href: '#whatsapp',
    icon: <SocialIcon src={whatsappIcon} alt="WhatsApp" />,
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
  args: {
    logo: logoImage,
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithCustomLogo = {
  args: {
    logo: (
      <div style={{ 
        color: 'white', 
        fontSize: '24px', 
        fontWeight: 'bold',
        padding: '10px'
      }}>
        CUSTOM LOGO
      </div>
    ),
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithCustomCopyright = {
  args: {
    logo: logoImage,
    socialLinks: defaultSocialLinks,
    links: defaultLinks,
    copyright: '2024 All Rights Reserved',
  },
};

export const WithoutSocialLinks = {
  args: {
    logo: logoImage,
    socialLinks: [],
    links: defaultLinks,
    copyrightYear: '2022',
  },
};

export const WithoutLinks = {
  args: {
    logo: logoImage,
    socialLinks: defaultSocialLinks,
    copyrightYear: '2022',
  },
};

export const Minimal = {
  args: {
    logo: logoImage,
    socialLinks: [],
    links: [],
    copyrightYear: '2022',
  },
};

