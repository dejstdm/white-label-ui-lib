import React from 'react';
import { FAQ } from './FAQ';

const defaultItems = [
  {
    id: 1,
    question: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?',
    answer: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>',
  },
  {
    id: 2,
    question: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?',
    answer: '<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>',
  },
  {
    id: 3,
    question: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?',
    answer: '<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>',
  },
  {
    id: 4,
    question: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?',
    answer: '<p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>',
  },
  {
    id: 5,
    question: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?',
    answer: '<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>',
  },
];

export default {
  title: 'Components/FAQ',
  component: FAQ,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    headline: {
      description: 'Plain text field - not from CMS',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text)',
        },
      },
    },
    headlineLevel: {
      description: 'Semantic heading level for the headline (visual style remains H2)',
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      table: {
        type: {
          summary: 'number',
          detail: 'Heading level rendered as <h{n}>; default 2.',
        },
        defaultValue: { summary: 2 },
      },
    },
    subheadline: {
      description: 'HTML string from CMS rich text editor',
      control: 'text',
      table: {
        type: {
          summary: 'string (HTML from CMS)',
          detail: 'HTML string from CMS rich text editor, e.g., "<p>Text</p>"',
        },
      },
    },
    items: {
      description: 'Array of FAQ item objects',
      control: 'object',
      table: {
        type: {
          summary: 'array',
          detail: `[
  {
    id: string | number,
    question: string (plain text - not from CMS),
    answer: string (HTML from CMS rich text editor, e.g., "<p>Text</p>")
  }
]`,
        },
      },
    },
    collapseMode: {
      description: 'Accordion behaviour: "single" keeps only one item open, "multiple" allows several to stay expanded',
      control: { type: 'radio' },
      options: ['single', 'multiple'],
      table: {
        type: {
          summary: '"single" | "multiple"',
        },
        defaultValue: { summary: 'single' },
      },
    },
  },
};

export const Default = {
  args: {
    headline: 'FAQ',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    items: defaultItems,
  },
};

export const SingleItem = {
  args: {
    headline: 'FAQ',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    items: [defaultItems[0]],
  },
};

export const ThreeItems = {
  args: {
    headline: 'FAQ',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    items: defaultItems.slice(0, 3),
  },
};

export const NoHeader = {
  args: {
    items: defaultItems,
  },
};

export const CustomHeadline = {
  args: {
    headline: 'Frequently Asked Questions',
    subheadline: '<p>Find answers to common questions about our products and services</p>',
    items: defaultItems,
  },
};

export const LongContent = {
  args: {
    headline: 'FAQ',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    items: [
      {
        id: 1,
        question: 'What is your return policy?',
        answer: '<p>We offer a 30-day return policy on all products. Items must be in their original condition with tags attached. To initiate a return, please contact our customer service team or use the return portal in your account.</p><p>Refunds will be processed within 5-7 business days after we receive your returned item.</p>',
      },
      {
        id: 2,
        question: 'How long does shipping take?',
        answer: '<p>Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for 2-3 business day delivery. We process all orders within 1-2 business days of receiving your payment confirmation.</p><p>International shipping times vary by location. Please check our shipping page for specific delivery estimates for your country. For most international destinations, standard shipping takes 10-14 business days, while express shipping can take 5-7 business days.</p><p>During peak seasons such as holidays, shipping times may be extended by 2-3 additional business days. We recommend placing your orders early to ensure timely delivery. All orders are shipped with tracking information, which will be sent to your email address once your order has been dispatched from our warehouse.</p><p>For orders over $100, we offer free standard shipping. Express shipping is available for an additional fee, which varies based on your location and the weight of your order. You can view all available shipping options and their associated costs during the checkout process.</p><p>If you need your order by a specific date, please contact our customer service team before placing your order, and we will do our best to accommodate your request. Rush orders may be available for an additional fee, subject to product availability and shipping destination.</p><p>Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to monitor your package\'s progress through our carrier\'s system. If you have any concerns about your shipment or if your package appears to be delayed, please don\'t hesitate to reach out to our customer service team for assistance.</p>',
      },
      {
        id: 3,
        question: 'Do you offer international shipping?',
        answer: '<p>Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can view available shipping options and costs during checkout.</p>',
      },
    ],
  },
};

export const MultipleOpen = {
  args: {
    headline: 'FAQ',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    items: defaultItems,
    collapseMode: 'multiple',
  },
};

