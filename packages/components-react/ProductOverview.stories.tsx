import React from 'react';
import { ProductOverview } from './ProductOverview';

// Product images from pepsi-can folder
const pepsiMaxImage = '/stories/assets/pepsi-can/_MAX.png';
const pepsiMaxLimeImage = '/stories/assets/pepsi-can/LIME.png';
const pepsiMaxMangoImage = '/stories/assets/pepsi-can/MANGO.png';
const pepsiCaffeineFreeImage = '/stories/assets/pepsi-can/Caffeine-free.png';
const pepsiZeroSugarCreamSodaImage = '/stories/assets/pepsi-can/PEPSI-TREATS-226-x-372px-Cream-Soda-Flavour-Can.png';
const pepsiZeroSugarStrawberryCreamImage = '/stories/assets/pepsi-can/PEPSI-TREATS-226-x-372px-Strawberries-&-Cream-Flavour-Can.png';
const pepsiRegularImage = '/stories/assets/pepsi-can/REG.png';
const pepsiDietImage = '/stories/assets/pepsi-can/_DIET_RGB.png';

// Product data based on Pepsi UK products
const allProducts = [
  {
    id: 1,
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: 'Pepsi Max',
    description: '<p>Maximum taste with no sugar. The bold, refreshing cola that gives you maximum flavour without the calories.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
  {
    id: 2,
    image: pepsiMaxLimeImage,
    imageAlt: 'Pepsi Max Lime can',
    title: 'Pepsi Max Lime',
    description: '<p>Maximum taste with a zingy lime twist. Zero sugar, maximum refreshment with a burst of lime flavour.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
  {
    id: 3,
    image: pepsiMaxMangoImage,
    imageAlt: 'Pepsi Max Mango can',
    title: 'Pepsi Max Mango',
    description: '<p>Maximum taste with an exotic mango twist. Zero sugar, maximum refreshment with tropical mango flavour.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
  {
    id: 4,
    image: pepsiCaffeineFreeImage,
    imageAlt: 'Pepsi Max No Caffeine can',
    title: 'Pepsi Max No Caffeine',
    description: '<p>Maximum taste without caffeine. The same bold flavour you love, now available without caffeine.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
  {
    id: 5,
    image: pepsiZeroSugarCreamSodaImage,
    imageAlt: 'Pepsi Zero Sugar Cream Soda can',
    title: 'Pepsi Zero Sugar Cream Soda',
    description: '<p>A zero-sugar cream soda variant with the classic smooth, creamy taste you love. Perfect for any occasion.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
  {
    id: 6,
    image: pepsiZeroSugarStrawberryCreamImage,
    imageAlt: 'Pepsi Zero Sugar Strawberry and Cream can',
    title: 'Pepsi Zero Sugar Strawberry & Cream',
    description: '<p>A zero-sugar treat with strawberry and cream flavours. Indulge in the sweet, creamy taste without the calories.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
  {
    id: 7,
    image: pepsiRegularImage,
    imageAlt: 'Pepsi can',
    title: 'Pepsi',
    description: '<p>The classic great-tasting refreshment. The original cola that brings people together with its unmistakable flavour.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
  {
    id: 8,
    image: pepsiDietImage,
    imageAlt: 'Diet Pepsi can',
    title: 'Diet Pepsi',
    description: '<p>No sugar, no calories. The light, refreshing cola that delivers great taste without the guilt.</p>',
    buttonLabel: 'Learn More',
    buttonHref: '#',
  },
];

export default {
  title: 'Components/ProductOverview',
  component: ProductOverview,
  tags: ['autodocs'],
  argTypes: {
    headline: {
      description: 'Plain text field - not from CMS',
      control: 'text',
    },
    subheadline: {
      description: 'HTML string from CMS rich text editor',
      control: 'text',
    },
    headlineLevel: {
      description: 'Semantic heading level for the headline',
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    layout: {
      description: 'Layout variant',
      control: { type: 'select' },
      options: ['grid', 'zig-zag'],
    },
    products: {
      description: 'Array of product items',
      control: 'object',
    },
    loadMoreLabel: {
      description: 'Load More button label',
      control: 'text',
    },
  },
};

export const FourProducts = {
  args: {
    headline: 'Our Products',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    products: allProducts.slice(0, 4),
    layout: 'grid',
  },
};

export const EightProducts = {
  args: {
    headline: 'Our Products',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    products: allProducts,
    layout: 'grid',
  },
};

export const ZigZag = {
  args: {
    headline: 'Products',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>',
    products: allProducts.slice(0, 6),
    layout: 'zig-zag',
  },
};

