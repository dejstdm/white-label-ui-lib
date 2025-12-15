import React from 'react';
import { RecipeOverview } from './RecipeOverview';

// Recipe images from recipes folder
const spicyMeatballsImage = '/stories/assets/recipes/SpicyMeatballs.jpg';
const chickenRiceImage = '/stories/assets/recipes/ChickenRice.jpg';
const steakImage = '/stories/assets/recipes/Steak.jpg';
const churrosImage = '/stories/assets/recipes/Churros.jpg';
const pancakesImage = '/stories/assets/recipes/Pancakes.jpg';
const friedGreenTomatoesImage = '/stories/assets/recipes/FriedGreenTomatoes.jpg';
const meatballsImage = '/stories/assets/recipes/Meatballs.jpg';
const macJackOLanternImage = '/stories/assets/recipes/Mac_JackOLantern_FinalDish_1x1.jpg';
const mummyFranksImage = '/stories/assets/recipes/Mummy_Franks_FinalDish_1x1.jpg';

// Recipe data for image-only variant
const imageOnlyRecipes = [
  {
    id: 1,
    image: spicyMeatballsImage,
    imageAlt: 'CHEETOS® Sweet \'N\' Spicy Chili Meatballs',
    href: '#',
  },
  {
    id: 2,
    image: chickenRiceImage,
    imageAlt: 'CHEETOS® XXTRA FLAMIN\' HOT® Rice Bowl',
    href: '#',
  },
  {
    id: 3,
    image: steakImage,
    imageAlt: 'Five-Alarm CHEETOS® Steak',
    href: '#',
  },
  {
    id: 4,
    image: churrosImage,
    imageAlt: 'Chester Cheetah\'s CHEETOS® Churros',
    href: '#',
  },
  {
    id: 5,
    image: pancakesImage,
    imageAlt: 'CHEETOS® Sweetos Hot Cakes',
    href: '#',
  },
  {
    id: 6,
    image: friedGreenTomatoesImage,
    imageAlt: 'Puffectly Fried Green Tomatoes',
    href: '#',
  },
];

// Recipe data for with-content variant
const recipesWithContent = [
  {
    id: 1,
    image: spicyMeatballsImage,
    imageAlt: 'CHEETOS® Sweet \'N\' Spicy Chili Meatballs',
    href: '#',
    title: 'CHEETOS® Sweet \'N\' Spicy Chili Meatballs',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
  {
    id: 2,
    image: chickenRiceImage,
    imageAlt: 'CHEETOS® XXTRA FLAMIN\' HOT® Rice Bowl',
    href: '#',
    title: 'CHEETOS® XXTRA FLAMIN\' HOT® Rice Bowl',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
  {
    id: 3,
    image: steakImage,
    imageAlt: 'Five-Alarm CHEETOS® Steak',
    href: '#',
    title: 'Five-Alarm CHEETOS® Steak',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
  {
    id: 4,
    image: churrosImage,
    imageAlt: 'Chester Cheetah\'s CHEETOS® Churros',
    href: '#',
    title: 'Chester Cheetah\'s CHEETOS® Churros',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
  {
    id: 5,
    image: pancakesImage,
    imageAlt: 'CHEETOS® Sweetos Hot Cakes',
    href: '#',
    title: 'CHEETOS® Sweetos Hot Cakes',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
  {
    id: 6,
    image: friedGreenTomatoesImage,
    imageAlt: 'Puffectly Fried Green Tomatoes',
    href: '#',
    title: 'Puffectly Fried Green Tomatoes',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
];

// Extended recipes for load more examples
const allImageOnlyRecipes = [
  ...imageOnlyRecipes,
  {
    id: 7,
    image: meatballsImage,
    imageAlt: 'CHEETOS® Meatballs',
    href: '#',
  },
  {
    id: 8,
    image: macJackOLanternImage,
    imageAlt: 'CHEETOS® \'Mac O\' Lanterns\'',
    href: '#',
  },
  {
    id: 9,
    image: mummyFranksImage,
    imageAlt: 'CHEETOS® Mummies',
    href: '#',
  },
];

const allRecipesWithContent = [
  ...recipesWithContent,
  {
    id: 7,
    image: meatballsImage,
    imageAlt: 'CHEETOS® Meatballs',
    href: '#',
    title: 'CHEETOS® Meatballs',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
  {
    id: 8,
    image: macJackOLanternImage,
    imageAlt: 'CHEETOS® \'Mac O\' Lanterns\'',
    href: '#',
    title: 'CHEETOS® \'Mac O\' Lanterns\'',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
  {
    id: 9,
    image: mummyFranksImage,
    imageAlt: 'CHEETOS® Mummies',
    href: '#',
    title: 'CHEETOS® Mummies',
    readMoreLabel: 'Read More',
    readMoreHref: '#',
  },
];

export default {
  title: 'Components/RecipeOverview',
  component: RecipeOverview,
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
    recipes: {
      description: 'Array of recipe objects',
      control: 'object',
      table: {
        type: {
          summary: 'array',
          detail: `[
  {
    id: string | number,
    image: string (plain text - image URL),
    imageAlt: string (plain text),
    href: string (plain text - recipe link URL, optional),
    title: string (plain text - for with-content variant, optional),
    readMoreLabel: string (plain text - for with-content variant, optional),
    readMoreHref: string (plain text - read more link URL, optional),
    readMoreOnClick: function (read more click handler, optional)
  }
]`,
        },
      },
    },
    loadMoreLabel: {
      description: 'Plain text field for load more button text',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text)',
        },
      },
    },
    loadMoreHref: {
      description: 'Plain text field for load more button URL',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text - URL)',
        },
      },
    },
    variant: {
      description: 'Variation: "image-only" shows only images (default), "with-content" shows title and read more button',
      control: { type: 'select' },
      options: ['image-only', 'with-content'],
      table: {
        type: {
          summary: 'string',
          detail: 'Variation type: "image-only" (default) or "with-content"',
        },
        defaultValue: { summary: 'image-only' },
      },
    },
  },
};

export const Default = {
  args: {
    headline: 'Our Recipes',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>',
    variant: 'image-only',
    recipes: imageOnlyRecipes,
  },
};

export const WithContent = {
  args: {
    headline: 'Featured Recipes',
    subheadline: '<p>Check out our most popular recipes with full details</p>',
    variant: 'with-content',
    recipes: recipesWithContent,
  },
};

export const LoadMore = {
  args: {
    headline: 'All Recipes',
    subheadline: '<p>Discover all our delicious recipes</p>',
    variant: 'image-only',
    recipes: allImageOnlyRecipes,
    loadMoreLabel: 'Load More Recipes',
  },
};

export const WithContentLoadMore = {
  args: {
    headline: 'Recipe Collection',
    subheadline: '<p>Explore our complete recipe collection</p>',
    variant: 'with-content',
    recipes: allRecipesWithContent,
    loadMoreLabel: 'View More Recipes',
  },
};

export const NoHeader = {
  args: {
    variant: 'image-only',
    recipes: imageOnlyRecipes,
  },
};
