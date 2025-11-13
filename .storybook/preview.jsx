import React from 'react';
import '../themes/default/dist/theme.css';
import '../themes/7up/dist/theme.css';
import '../themes/lays/dist/theme.css';
import '../packages/components-react/wysiwyg-content.css';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#FFFFFF',
        },

        section: {
          name: 'section',
          value: '#F7F8FA',
        }
      }
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default Theme' },
          { value: '7up', title: '7UP Theme' },
          { value: 'lays', title: "Lay's Theme" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'default';
      return (
        <div data-theme={theme}>
          <Story />
        </div>
      );
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  },

  tags: ['autodocs']
};

