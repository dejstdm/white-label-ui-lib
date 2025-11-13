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
    breakpoint: {
      control: { type: 'select' },
      options: [null, 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Breakpoint at which container becomes responsive (100% width until breakpoint)',
    },
    padding: {
      control: 'boolean',
      description: 'Apply horizontal padding',
    },
  },
};

export const Default = {
  args: {
    breakpoint: null,
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
      <Container breakpoint={null} padding>
        <div style={{ 
          background: 'var(--color-bg-section)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          Default container (responsive at all breakpoints)
        </div>
      </Container>
      <Container breakpoint="sm" padding>
        <div style={{ 
          background: 'var(--color-bg-section)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          container-sm (100% until sm, then responsive)
        </div>
      </Container>
      <Container breakpoint="md" padding>
        <div style={{ 
          background: 'var(--color-bg-section)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          container-md (100% until md, then responsive)
        </div>
      </Container>
      <Container breakpoint="lg" padding>
        <div style={{ 
          background: 'var(--color-bg-section)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          container-lg (100% until lg, then responsive)
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
    breakpoint: null,
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
