import React from 'react';
import { Button } from './Button';

export default {
  title: 'Internal/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'text'],
      description: 'Button visual style',
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'large'],
      description: 'Button size',
    },
    icon: {
      control: 'boolean',
      description: 'Show arrow icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export const Solid = {
  args: {
    variant: 'solid',
    size: 'medium',
    children: 'Primary Action',
  },
};

export const SolidWithIcon = {
  args: {
    variant: 'solid',
    size: 'medium',
    icon: true,
    children: 'Primary Action',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    size: 'medium',
    children: 'Secondary Action',
  },
};

export const OutlineWithIcon = {
  args: {
    variant: 'outline',
    size: 'medium',
    icon: true,
    children: 'Secondary Action',
  },
};

export const TextButton = {
  args: {
    variant: 'text',
    size: 'medium',
    children: 'Text Link',
  },
};

export const TextWithIcon = {
  args: {
    variant: 'text',
    size: 'medium',
    icon: true,
    children: 'Text Link',
  },
};

export const Large = {
  args: {
    variant: 'solid',
    size: 'large',
    icon: true,
    children: 'Large Button',
  },
};

export const Disabled = {
  args: {
    variant: 'solid',
    size: 'medium',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        <Button variant="solid" size="medium">Solid Medium</Button>
        <Button variant="solid" size="medium" icon>Solid Medium Icon</Button>
        <Button variant="solid" size="large">Solid Large</Button>
        <Button variant="solid" size="large" icon>Solid Large Icon</Button>
      </div>
      
      <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        <Button variant="outline" size="medium">Outline Medium</Button>
        <Button variant="outline" size="medium" icon>Outline Medium Icon</Button>
        <Button variant="outline" size="large">Outline Large</Button>
        <Button variant="outline" size="large" icon>Outline Large Icon</Button>
      </div>
      
      <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        <Button variant="text" size="medium">Text Medium</Button>
        <Button variant="text" size="medium" icon>Text Medium Icon</Button>
        <Button variant="text" size="large">Text Large</Button>
        <Button variant="text" size="large" icon>Text Large Icon</Button>
      </div>
      
      <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        <Button variant="solid" size="medium" disabled>Disabled Solid</Button>
        <Button variant="outline" size="medium" disabled>Disabled Outline</Button>
        <Button variant="text" size="medium" disabled>Disabled Text</Button>
      </div>
    </div>
  ),
};

