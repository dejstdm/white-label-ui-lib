import React from 'react';
import { Container } from './Container';

export default {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width of the container',
    },
    padding: {
      control: 'boolean',
      description: 'Apply horizontal padding',
    },
  },
};

export const Default = {
  args: {
    maxWidth: 'xl',
    padding: true,
    children: (
      <div style={{ 
        background: 'var(--color-bg-section)', 
        padding: 'var(--space-6)', 
        borderRadius: 'var(--radius-md)' 
      }}>
        Container content (max-width: xl)
      </div>
    ),
  },
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {['sm', 'md', 'lg', 'xl', '2xl', 'full'].map(size => (
        <Container key={size} maxWidth={size} padding>
          <div style={{ 
            background: 'var(--color-bg-section)', 
            padding: 'var(--space-6)', 
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            {size}
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const NoPadding = {
  args: {
    maxWidth: 'xl',
    padding: false,
    children: (
      <div style={{ 
        background: 'var(--color-bg-section)', 
        padding: 'var(--space-6)' 
      }}>
        Container with no padding
      </div>
    ),
  },
};
