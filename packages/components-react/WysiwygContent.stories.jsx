import React from 'react';
import { WysiwygContent } from './WysiwygContent';

const sampleHtml = `
  <h3>Rich text heading level 3</h3>
  <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Integer nec odio. Praesent libero.</p>
  <ul>
    <li>Semibold bullet one</li>
    <li>Bullet two with <a href="#">link styling</a></li>
    <li>Bullet three with more detail</li>
  </ul>
  <p>Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.</p>
`;

export default {
  title: 'Internal/WysiwygContent',
  component: WysiwygContent,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'HTML string rendered using `dangerouslySetInnerHTML`',
    },
    className: {
      control: 'text',
      description: 'Additional class names applied alongside `wysiwyg-content`',
    },
  },
  args: {
    content: sampleHtml,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Internal renderer that outputs CMS-provided HTML with the shared `.wysiwyg-content` styling.',
      },
    },
  },
};

const Template = (args) => (
  <div style={{ background: 'var(--color-bg-section)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', maxWidth: '640px' }}>
    <WysiwygContent {...args} />
  </div>
);

export const Preview = {
  render: Template,
};

export const InlineDense = {
  render: Template,
  args: {
    className: 'wysiwyg-content--dense',
    content: `
      <p style="margin: 0;">Custom class names can be used to scope overrides.</p>
      <p style="margin: 0;">This example applies the <code>wysiwyg-content--dense</code> modifier.</p>
    `,
  },
};

