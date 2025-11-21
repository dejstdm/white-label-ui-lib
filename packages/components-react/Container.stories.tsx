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
    fluid: {
      control: 'boolean',
      description: 'Full-width container (100% at all breakpoints)',
    },
    padding: {
      control: 'boolean',
      description: 'Apply horizontal padding',
    },
  },
};

export const Default = {
  args: {
    padding: true,
    children: (
      <div style={{ 
        background: 'var(--color-bg-section)', 
        padding: 'var(--space-6)', 
        borderRadius: 'var(--radius-md)' 
      }}>
        Responsive container (adapts to viewport size)
      </div>
    ),
  },
};

export const Responsive = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Container padding>
        <div style={{ 
          background: 'var(--color-bg-section)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          Default container (responsive at all breakpoints via CSS media queries)
        </div>
      </Container>
      <Container fluid padding>
        <div style={{ 
          background: 'var(--color-bg-section)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          container-fluid (100% width at all breakpoints)
        </div>
      </Container>
    </div>
  ),
};

export const NoPadding = {
  args: {
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
