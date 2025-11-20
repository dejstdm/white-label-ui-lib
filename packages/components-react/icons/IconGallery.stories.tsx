import React from 'react';

const ICON_SIZE = 48;

const icons = [
  { name: 'Facebook', iconClass: 'fa-brands fa-square-facebook' },
  { name: 'Instagram', iconClass: 'fa-brands fa-square-instagram' },
  { name: 'X (Twitter)', iconClass: 'fa-brands fa-square-x-twitter' },
];

export default {
  title: 'Internal/Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Font Awesome icons used for social media links in Footer and SocialMediaFeed components.',
      },
    },
  },
};

const IconTile = ({ name, iconClass }: { name: string; iconClass: string }) => (
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
        fontSize: `${ICON_SIZE}px`,
        color: 'var(--color-brand-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <i className={iconClass} aria-hidden="true"></i>
    </div>
    <span style={{ fontSize: 'var(--type-label-size)', fontWeight: 600 }}>{name}</span>
    <code style={{ fontSize: 'var(--type-small-size)', color: 'var(--color-text-muted)' }}>{iconClass}</code>
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

