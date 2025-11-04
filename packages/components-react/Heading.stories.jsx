import { Heading } from './Heading';

export default {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Semantic heading level (h1-h6)',
    },
    variant: {
      control: { type: 'select' },
      options: ['display', 'h1', 'h2', 'h3'],
      description: 'Visual style variant',
    },
  },
};

export const Display = {
  args: {
    level: 1,
    variant: 'display',
    children: 'Display Heading',
  },
};

export const H1 = {
  args: {
    level: 1,
    variant: 'h1',
    children: 'Heading Level 1',
  },
};

export const H2 = {
  args: {
    level: 2,
    variant: 'h2',
    children: 'Heading Level 2',
  },
};

export const H3 = {
  args: {
    level: 3,
    variant: 'h3',
    children: 'Heading Level 3',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Heading level={1} variant="display">Display Heading</Heading>
      <Heading level={1} variant="h1">H1 Heading</Heading>
      <Heading level={2} variant="h2">H2 Heading</Heading>
      <Heading level={3} variant="h3">H3 Heading</Heading>
    </div>
  ),
};
