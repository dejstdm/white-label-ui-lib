import React from 'react';
import { TextSection } from './TextSection';

export default {
  title: 'Components/TextSection',
  component: TextSection,
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
    text: {
      description: 'HTML string from CMS rich text editor - main content area',
      control: 'text',
      table: {
        type: {
          summary: 'string (HTML from CMS)',
          detail: 'HTML string from CMS rich text editor with full formatting support',
        },
      },
    },
  },
};

export const Default = {
  args: {
    headline: 'Text Section',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
  },
};

export const ComprehensiveRichText = {
  args: {
    headline: 'Comprehensive Rich Text Content',
    subheadline: '<p>This story demonstrates all common rich text editor features including headings, paragraphs, lists, links, formatting, blockquotes, and more.</p>',
    text: `
      <h2>Introduction to Our Services</h2>
      <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in <em>reprehenderit in voluptate</em> velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <h3>Key Features and Benefits</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

      <ul>
        <li><strong>Feature One:</strong> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit</li>
        <li><strong>Feature Two:</strong> Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt</li>
        <li><strong>Feature Three:</strong> Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</li>
        <li><strong>Feature Four:</strong> Consectetur, adipisci velit, sed quia non numquam eius modi tempora</li>
        <li><strong>Feature Five:</strong> Incidunt ut labore et dolore magnam aliquam quaerat voluptatem</li>
      </ul>

      <h3>Step-by-Step Process</h3>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur:</p>

      <ol>
        <li>First, you need to <a href="#">register for an account</a> on our platform. This process takes only a few minutes and requires basic information.</li>
        <li>Next, verify your email address by clicking the link we send to your inbox. This ensures the security of your account.</li>
        <li>Then, complete your profile by adding relevant information about your business or personal needs.</li>
        <li>Finally, explore our services and select the ones that best match your requirements. You can always modify your selections later.</li>
      </ol>

      <h3>Important Information</h3>
      <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>

      <blockquote>
        <p>"The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."</p>
        <cite>— Steve Jobs</cite>
      </blockquote>

      <h3>Additional Details</h3>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

      <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>

      <h4>Nested Lists Example</h4>
      <ul>
        <li>Main item one
          <ul>
            <li>Sub-item 1.1 with <a href="#">a link</a></li>
            <li>Sub-item 1.2 with <strong>bold text</strong></li>
            <li>Sub-item 1.3 with <em>italic text</em></li>
          </ul>
        </li>
        <li>Main item two
          <ol>
            <li>Numbered sub-item 2.1</li>
            <li>Numbered sub-item 2.2</li>
          </ol>
        </li>
        <li>Main item three</li>
      </ul>

      <h3>Text Formatting Examples</h3>
      <p>Here are various text formatting options commonly used in rich text editors:</p>
      <ul>
        <li><strong>Bold text</strong> for emphasis</li>
        <li><em>Italic text</em> for subtle emphasis</li>
        <li><strong><em>Bold and italic</em></strong> combined</li>
        <li><a href="https://example.com">External link</a> to other websites</li>
        <li><a href="#internal">Internal link</a> to sections within the page</li>
        <li><code>Inline code</code> for technical terms</li>
        <li><u>Underlined text</u> for additional emphasis</li>
        <li><s>Strikethrough text</s> for deleted content</li>
        <li>Text with <sup>superscript</sup> and <sub>subscript</sub></li>
      </ul>

      <h3>Paragraph Variations</h3>
      <p>This is a regular paragraph with normal text. It contains multiple sentences to demonstrate how text flows and wraps within the content area. The text should be readable and well-spaced.</p>

      <p>This is another paragraph that follows the previous one. It shows how multiple paragraphs are separated and styled. Each paragraph should have appropriate spacing above and below it to ensure good readability.</p>

      <p>Here's a third paragraph that demonstrates consistency in styling. The spacing between paragraphs should be consistent throughout the entire text section, creating a harmonious reading experience.</p>

      <h3>Complex Content Structure</h3>
      <p>When creating content in a rich text editor, you often need to combine different elements:</p>

      <p>Start with an introduction paragraph that sets the context. Then you might include a list of items, followed by another paragraph that elaborates on those items. You can also include <a href="#">links to related content</a> that provide additional information.</p>

      <ul>
        <li>Combine <strong>bold text</strong> with <em>italic text</em> in list items</li>
        <li>Include <a href="#">links within lists</a> for navigation</li>
        <li>Use <code>code snippets</code> when discussing technical topics</li>
      </ul>

      <p>After a list, you typically want to add a concluding paragraph that summarizes the key points or transitions to the next section. This helps maintain the flow of the content and guides the reader through the information.</p>

      <h2>Conclusion</h2>
      <p>In conclusion, this comprehensive example demonstrates the full range of formatting options available in a typical rich text editor. From basic formatting like <strong>bold</strong> and <em>italic</em> text to complex structures like nested lists and blockquotes, all elements should render correctly and maintain proper styling.</p>

      <p>Remember to always test your content across different devices and browsers to ensure consistent rendering. For more information, please <a href="#">contact our support team</a> or visit our <a href="#">documentation page</a>.</p>
    `,
  },
};

export const NoHeader = {
  args: {
    text: '<p>This text section has no header, only the main content area. This is useful when you want to display content without a title or subtitle.</p><p>You can still use all rich text formatting options in the content area, including <strong>bold text</strong>, <em>italic text</em>, <a href="#">links</a>, and lists.</p>',
  },
};

export const TextOnly = {
  args: {
    text: '<h2>Text Only Section</h2><p>This section contains only the text content without a separate header section. The text can include its own headings and formatting.</p><p>This approach gives you more flexibility in structuring your content directly within the text field.</p>',
  },
};

