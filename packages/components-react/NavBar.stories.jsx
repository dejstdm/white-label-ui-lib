import React from 'react';
import { NavBar } from './NavBar';

export default {
  title: 'Components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {
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

const defaultItems = [
  { label: 'Link1', href: '#link1' },
  { label: 'Link2', href: '#link2' },
  { label: 'Link3', href: '#link3' },
  { label: 'Link4', href: '#link4' },
  { label: 'Link5', href: '#link5' },
];

export const Default = {
  args: {
    items: defaultItems,
    sticky: false,
  },
};

export const WithActiveLink = {
  args: {
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
  args: {
    items: defaultItems,
    sticky: true,
  },
};

export const WithCustomLogo = {
  args: {
    items: defaultItems,
    logo: (
      <div style={{ 
        color: 'white', 
        fontSize: '18px', 
        fontWeight: 'bold',
        padding: '10px'
      }}>
        CUSTOM LOGO
      </div>
    ),
    sticky: false,
  },
};

export const ResponsiveDemo = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 'var(--space-8)',
      minHeight: '200vh'
    }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3 style={{ 
          marginBottom: 'var(--space-4)', 
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-heading)'
        }}>
          Responsive NavBar
        </h3>
        <p style={{ 
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-6)'
        }}>
          Resize the browser window to see the responsive behavior. On mobile (≤768px), 
          the navigation links are hidden and a burger menu appears. Click the burger menu 
          to open the mobile navigation overlay.
        </p>
      </div>
      
      <NavBar
        items={defaultItems}
        sticky={true}
      />

      <div style={{ 
        padding: 'var(--space-8)',
        background: 'var(--color-bg-section)',
        borderRadius: 'var(--radius-md)'
      }}>
        <h4 style={{ 
          fontFamily: 'var(--font-heading)',
          marginBottom: 'var(--space-4)',
          color: 'var(--color-text-primary)'
        }}>
          Scroll down to test sticky behavior
        </h4>
        <p style={{ 
          color: 'var(--color-text-muted)',
          lineHeight: '1.6'
        }}>
          The NavBar should stick to the top when scrolling. On mobile devices, 
          clicking the burger menu will open a full-screen overlay menu with all 
          navigation links. The menu can be closed by clicking the X icon, pressing 
          Escape, or clicking outside the menu.
        </p>
      </div>
    </div>
  ),
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    items: defaultItems,
    sticky: false,
  },
};
