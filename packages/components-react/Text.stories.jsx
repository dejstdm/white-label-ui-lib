import React from 'react';
import { Text } from './Text';

export default {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['large', 'small', 'label'],
      description: 'Text size variant',
    },
    muted: {
      control: 'boolean',
      description: 'Use muted text color',
    },
    as: {
      control: 'text',
      description: 'HTML element to render',
    },
  },
};

export const Large = {
  args: {
    size: 'large',
    children: 'This is large body text. It uses the body-large typography scale with comfortable line height for reading.',
  },
};

export const Small = {
  args: {
    size: 'small',
    children: 'This is small body text for UI elements and compact displays.',
  },
};

export const Label = {
  args: {
    size: 'label',
    children: 'Label Text',
  },
};

export const Muted = {
  args: {
    size: 'large',
    muted: true,
    children: 'This is muted text using the secondary text color.',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <Text size="large">
          Large body text: The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
      <div>
        <Text size="small">
          Small body text: The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
      <div>
        <Text size="label">Label Text</Text>
      </div>
      <div>
        <Text size="large" muted>
          Muted text: The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    </div>
  ),
};
