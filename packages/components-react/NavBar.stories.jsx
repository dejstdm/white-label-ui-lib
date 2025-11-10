import React from 'react';
import { NavBar } from './NavBar';
import pepsicoLogo from './assets/pepsicolabs_logo-white.png';
import pepsicoColorLogo from './assets/pepsicolabs_logo.png';
import laysLogo from './assets/lays-logo.png';
import sevenUpLogo from './assets/logo-7up.png';

export default {
  title: 'Components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {
    logoSrc: {
      control: 'text',
      description: 'Image URL for the navigation logo.',
    },
    logoAlt: {
      control: 'text',
      description: 'Accessible alternate text for the logo image.',
    },
    items: {
      control: 'object',
      description: 'Array of navigation items',
    },
    sticky: {
      control: 'boolean',
      description: 'Make NavBar sticky/fixed at top',
    },
  },
};

const Template = (args) => <NavBar {...args} />;

const defaultItems = [
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
    items: defaultItems,
    sticky: false,
  },
};

export const WithActiveLink = {
  render: Template,
  args: {
    logoSrc: pepsicoLogo,
    logoAlt: 'PepsiCo Labs logo',
    items: [
      { label: 'Link1', href: '#link1', active: true },
      { label: 'Link2', href: '#link2' },
      { label: 'Link3', href: '#link3' },
      { label: 'Link4', href: '#link4' },
      { label: 'Link5', href: '#link5' },
    ],
    sticky: false,
  },
};

export const Sticky = {
  render: Template,
  args: {
    logoSrc: pepsicoColorLogo,
    logoAlt: 'PepsiCo Labs logo',
    items: defaultItems,
    sticky: true,
  },
};

export const LaysTheme = {
  render: Template,
  args: {
    logoSrc: laysLogo,
    logoAlt: "Lay's logo",
    items: defaultItems,
    sticky: false,
  },
};

export const SevenUpTheme = {
  render: Template,
  args: {
    logoSrc: sevenUpLogo,
    logoAlt: '7UP logo',
    items: defaultItems,
    sticky: false,
  },
};

export const WithoutLogo = {
  render: Template,
  args: {
    logoSrc: undefined,
    logoAlt: '',
    items: defaultItems,
    sticky: false,
  },
};
