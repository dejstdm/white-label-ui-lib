import React from 'react';
import { Accordion } from './Accordion';
import { WysiwygContent } from './WysiwygContent';

const sampleItems = [
  {
    id: 'item-1',
    trigger: ({ isOpen }: { isOpen: boolean }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ fontWeight: 600 }}>Accordion header 1</span>
        <span style={{ color: 'var(--color-text-tertiary)' }}>{isOpen ? 'Open' : 'Closed'}</span>
      </div>
    ),
    content: (
      <WysiwygContent
        content="<p>This is accordion body text which can be long or very short. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>"
      />
    ),
  },
  {
    id: 'item-2',
    trigger: ({ isOpen }: { isOpen: boolean }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ fontWeight: 600 }}>Accordion header 2</span>
        <span style={{ color: 'var(--color-text-tertiary)' }}>{isOpen ? 'Open' : 'Closed'}</span>
      </div>
    ),
    content: (
      <WysiwygContent
        content="<p>This is accordion body text which can be long or very short. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>"
      />
    ),
  },
  {
    id: 'item-3',
    trigger: ({ isOpen }: { isOpen: boolean }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ fontWeight: 600 }}>Accordion header 3</span>
        <span style={{ color: 'var(--color-text-tertiary)' }}>{isOpen ? 'Open' : 'Closed'}</span>
      </div>
    ),
    content: (
      <WysiwygContent
        content="<p>This is accordion body text which can be long or very short. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>"
      />
    ),
  },
];

export default {
  title: 'Internal/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow more than one panel to stay open at the same time',
    },
    className: {
      control: 'text',
      description: 'Optional class applied to accordion wrapper',
    },
    itemClassName: {
      control: 'text',
      description: 'Optional class applied to each accordion item',
    },
    headerClassName: {
      control: 'text',
      description: 'Optional class applied to the accordion header button',
    },
    bodyClassName: {
      control: 'text',
      description: 'Optional class applied to the accordion body wrapper',
    },
    bodyInnerClassName: {
      control: 'text',
      description: 'Optional class applied to the inner body content wrapper',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Internal accordion primitive used by FAQ and other sections. Accepts item objects with `trigger` and `content` nodes.',
      },
    },
  },
};

export const SingleOpen = {
  args: {
    allowMultiple: false,
    items: sampleItems,
  },
};

export const AllowMultiple = {
  args: {
    allowMultiple: true,
    items: sampleItems,
  },
};

