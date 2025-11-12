import React from 'react';
import { FacebookIcon, InstagramIcon, XTwitterIcon } from './index.js';

const ICON_SIZE = 48;

const icons = [
  { name: 'Facebook', Component: FacebookIcon },
  { name: 'Instagram', Component: InstagramIcon },
  { name: 'X (Twitter)', Component: XTwitterIcon },
];

export default {
  title: 'Internal/Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shared glyph set exposed for NavBar/Footer social clusters and other internal use.',
      },
    },
  },
};

const IconTile = ({ name, Component }: { name: string; Component: React.ComponentType<any> }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-bg-section)',
      minWidth: '140px',
    }}
  >
    <div
      style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        color: 'var(--color-brand-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Component aria-hidden />
    </div>
    <span style={{ fontSize: 'var(--type-label-size)', fontWeight: 600 }}>{name}</span>
  </div>
);

export const Social = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 'var(--space-4)',
      }}
    >
      {icons.map((icon) => (
        <IconTile key={icon.name} {...icon} />
      ))}
    </div>
  ),
};

