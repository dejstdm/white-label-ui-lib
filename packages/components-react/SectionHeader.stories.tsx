import React from 'react';
import { SectionHeader } from './SectionHeader';

export default {
  title: 'Internal/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  argTypes: {
    headline: {
      control: 'text',
      description: 'Plain text headline (not from CMS)',
    },
    subheadline: {
      control: 'text',
      description: 'HTML string rendered via WysiwygContent',
    },
    headlineLevel: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Semantic heading level passed to Heading component',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Internal `SectionHeader` primitive used by section components to render consistent headline/subheadline pairs.',
      },
    },
  },
};

const Template = (args) => (
  <section className="wl-sec" style={{ maxWidth: '860px', margin: '0 auto' }}>
    <SectionHeader {...args} />
  </section>
);

export const Default = {
  render: Template,
  args: {
    headline: 'Frequently Asked Questions',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>',
    headlineLevel: 2,
  },
};

export const WithRichCopy = {
  render: Template,
  args: {
    headline: 'Why choose our platform?',
    subheadline:
      '<p>Section headers are centered by default to match component sections.</p>',
    headlineLevel: 2,
  },
};

export const HeadlineOnly = {
  render: Template,
  args: {
    headline: 'CMS optional subheadline',
    subheadline: '',
    headlineLevel: 3,
  },
};

