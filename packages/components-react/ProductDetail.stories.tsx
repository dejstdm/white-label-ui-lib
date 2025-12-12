import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetail } from './ProductDetail';

// Product image from pepsi-can folder
const pepsiMaxImage = '/stories/assets/pepsi-can/_MAX.png';

// Sample nutritional information table (HTML from WYSIWYG)
const sampleNutritionalTable = `
<table>
  <thead>
    <tr>
      <th></th>
      <th>100g</th>
      <th>30g**</th>
      <th>IR*/30g</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Valor energetico</td>
      <td>2131 kJ, 510kcal</td>
      <td>639 kJ, 153kcal</td>
      <td>8%</td>
    </tr>
    <tr>
      <td>Grasas</td>
      <td>29g</td>
      <td>8.8g</td>
      <td>13%</td>
    </tr>
    <tr>
      <td>De las cuales saturadas</td>
      <td>2,5g</td>
      <td>0.8g</td>
      <td>4%</td>
    </tr>
    <tr>
      <td>Hidratos de carbono</td>
      <td>54g</td>
      <td>16g</td>
      <td>&lt;1%</td>
    </tr>
    <tr>
      <td>De los cuales azucares</td>
      <td>2,8g</td>
      <td>0,8g</td>
      <td></td>
    </tr>
    <tr>
      <td>Fibra alimentaria</td>
      <td>4,1g</td>
      <td>1,2g</td>
      <td></td>
    </tr>
    <tr>
      <td>Proteinas</td>
      <td>5,5g</td>
      <td>1,7g</td>
      <td></td>
    </tr>
    <tr>
      <td>Sal</td>
      <td>1,3g</td>
      <td>0,39g</td>
      <td>7%</td>
    </tr>
  </tbody>
</table>
<p>*IR= Ingesta de Referencia de un adulto medio (8400 kJ / 2000 kcal). Las necesidades individuales pueden variar dependiendo del ejercicio físico y otros factores.</p>
`;

// Sample ingredients content
const sampleIngredients = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>';

// Sample nutritional content
const sampleNutritional = '<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p><p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>';

const meta = {
  title: 'Components/ProductDetail',
  component: ProductDetail,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Component variant',
      control: { type: 'select' },
      options: ['overview', 'compact', 'tabs'],
    },
    image: {
      description: 'Product image URL',
      control: 'text',
    },
    imageAlt: {
      description: 'Alt text for product image',
      control: 'text',
    },
    title: {
      description: 'Product title (HTML string from CMS rich text editor)',
      control: 'text',
    },
    titleLevel: {
      description: 'Semantic heading level for title',
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    tagline: {
      description: 'Product tagline (HTML string from CMS) - only shown in overview variant',
      control: 'text',
    },
    headline: {
      description: 'Product headline (HTML string from CMS) - only shown in overview variant',
      control: 'text',
    },
    description: {
      description: 'Product description (HTML string from CMS rich text editor)',
      control: 'text',
    },
    ctaLabel: {
      description: 'CTA button label (plain text) - only shown in compact and tabs variants',
      control: 'text',
    },
    ctaHref: {
      description: 'CTA button link URL',
      control: 'text',
    },
    nutritionalTable: {
      description: 'Nutritional information table (HTML string from CMS WYSIWYG) - only shown in overview and compact variants',
      control: 'text',
    },
    ingredients: {
      description: 'Ingredients content (HTML string from CMS) - only shown in tabs variant',
      control: 'text',
    },
    nutritional: {
      description: 'Nutritional content (HTML string from CMS) - only shown in tabs variant',
      control: 'text',
    },
    defaultTab: {
      description: 'Default active tab for tabs variant',
      control: { type: 'select' },
      options: ['ingredients', 'nutritional'],
    },
  },
} satisfies Meta<typeof ProductDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    variant: 'overview',
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: '<h2>Product 1</h2>',
    tagline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>',
    headline: '<h3>Headline</h3>',
    description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
    nutritionalTable: sampleNutritionalTable,
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: '<h2>Product 1</h2>',
    description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>',
    ctaLabel: 'Lorem ipsum',
    ctaHref: '#',
    nutritionalTable: sampleNutritionalTable,
  },
};

export const Tabs: Story = {
  args: {
    variant: 'tabs',
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: '<h2>Product 1</h2>',
    description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>',
    ctaLabel: 'Lorem ipsum',
    ctaHref: '#',
    ingredients: sampleIngredients,
    nutritional: sampleNutritional,
    defaultTab: 'ingredients',
  },
};

export const OverviewWithoutImage: Story = {
  args: {
    variant: 'overview',
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: '<h2>Product 1</h2>',
    tagline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>',
    headline: '<h3>Headline</h3>',
    description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
    nutritionalTable: sampleNutritionalTable,
  },
};

export const CompactWithoutCTA: Story = {
  args: {
    variant: 'compact',
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: '<h2>Product 1</h2>',
    description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>',
    nutritionalTable: sampleNutritionalTable,
  },
};

export const TabsDefaultNutritional: Story = {
  args: {
    variant: 'tabs',
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: '<h2>Product 1</h2>',
    description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>',
    ctaLabel: 'Lorem ipsum',
    ctaHref: '#',
    ingredients: sampleIngredients,
    nutritional: sampleNutritional,
    defaultTab: 'nutritional',
  },
};
