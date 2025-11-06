import React from 'react';
import { RecipeSlider } from './RecipeSlider';

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

// Recipe data based on Cheetos recipes from https://www.cheetos.com/recipes
// Note: Recipes only have id, image, and imageAlt (simpler than products)
const allRecipes = [
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

export default {
  title: 'Components/RecipeSlider',
  component: RecipeSlider,
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
    href: string (plain text - recipe link URL, optional)
  }
]`,
        },
      },
    },
    headerButtonLabel: {
      description: 'Plain text field for header button text',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text)',
        },
      },
    },
    headerButtonHref: {
      description: 'Plain text field for header button URL',
      control: 'text',
      table: {
        type: {
          summary: 'string (plain text - URL)',
        },
      },
    },
  },
};

export const Default = {
  args: {
    headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptateam accusantium</p>',
    headerButtonLabel: 'Lorem ipsum',
    headerButtonHref: '#',
    recipes: allRecipes,
  },
};

export const CustomHeadline = {
  args: {
    headline: 'Discover Our Recipes',
    subheadline: '<p>Get playfully mischievous in the kitchen with these cheesy recipes.</p>',
    headerButtonLabel: 'View More Recipes',
    headerButtonHref: '#',
    recipes: allRecipes,
  },
};

export const ThreeRecipes = {
  args: {
    headline: 'Featured Recipes',
    subheadline: '<p>Check out our most popular recipes</p>',
    headerButtonLabel: 'View All Recipes',
    headerButtonHref: '#',
    recipes: allRecipes.slice(0, 3),
  },
};

export const TwoRecipes = {
  args: {
    headline: 'Quick Recipes',
    subheadline: '<p>Perfect for busy weeknights</p>',
    headerButtonLabel: 'See More',
    headerButtonHref: '#',
    recipes: allRecipes.slice(0, 2),
  },
};

export const NoHeader = {
  args: {
    recipes: allRecipes,
  },
};

export const SingleRecipe = {
  args: {
    headline: 'Recipe of the Week',
    subheadline: '<p>This week\'s featured recipe</p>',
    headerButtonLabel: 'Get Recipe',
    headerButtonHref: '#',
    recipes: [allRecipes[0]],
  },
};

export const WithoutHeaderButton = {
  args: {
    headline: 'Our Recipes',
    subheadline: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptateam accusantium</p>',
    recipes: allRecipes,
  },
};

