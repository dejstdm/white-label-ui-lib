/**
 * Centralized Type Definitions
 * 
 * This file contains all shared TypeScript types used across the component library.
 * Types are organized by category for easy discovery and maintenance.
 * 
 * @module types
 */

import type { ReactNode, MouseEventHandler } from 'react';

// ==========================================
// PRIMITIVE & SEMANTIC TYPES
// ==========================================

/**
 * Container breakpoint - controls max-width at different viewport sizes.
 * 
 * @deprecated - No longer used. Container component now uses pure CSS media queries.
 * All containers behave the same and are controlled entirely by CSS.
 * 
 * @internal - Not exported for consumers
 */
export type ContainerBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | null;

/**
 * Semantic heading level (1-6) for accessibility.
 * 
 * Controls the HTML tag rendered by the Heading component (`<h1>` through `<h6>`).
 * This is separate from the visual styling controlled by `HeadingVariant`.
 * 
 * @example
 * ```tsx
 * <Heading level={1} variant="display">Main Title</Heading>
 * // Renders: <h1 class="heading--display">Main Title</h1>
 * ```
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Visual heading variant - controls typography style.
 * 
 * Controls the CSS class applied to the Heading component, which determines
 * font size, weight, line height, and letter spacing. This is independent
 * of the semantic HTML level.
 * 
 * @example
 * ```tsx
 * <Heading level={2} variant="display">Large Visual Heading</Heading>
 * // Renders: <h2 class="heading--display">Large Visual Heading</h2>
 * ```
 */
export type HeadingVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Text size variant for the Text component.
 * 
 * Controls the typography scale applied to text content.
 * 
 * - `large`: Body text, default size
 * - `small`: Smaller body text
 * - `label`: Label text, typically used for form labels or small captions
 */
export type TextSize = 'large' | 'small' | 'label';

/**
 * Button visual variant.
 * 
 * Controls the button's visual style:
 * - `solid`: Primary button with filled background
 * - `outline`: Button with border and transparent background
 * - `text`: Text-only button with no border or background
 * - `inverted`: Button with inverted colors for dark backgrounds
 */
export type ButtonVariant = 'solid' | 'outline' | 'text' | 'inverted';

/**
 * Button size variant.
 * 
 * Controls the button's size:
 * - `medium`: Default button size
 * - `large`: Larger button size
 */
export type ButtonSize = 'medium' | 'large';

/**
 * Accordion collapse mode.
 * 
 * Controls how multiple accordion items behave:
 * - `single`: Only one item can be open at a time (default)
 * - `multiple`: Multiple items can be open simultaneously
 */
export type CollapseMode = 'single' | 'multiple';

// ==========================================
// CONTENT TYPES
// ==========================================

/**
 * Plain text string - NOT from CMS, safe to render directly in React components.
 * 
 * Use this type for text content that is:
 * - Not from a CMS rich text editor
 * - Safe to render directly (no HTML)
 * - Used in components like Heading, Button labels, etc.
 * 
 * @example
 * ```tsx
 * <Heading>{headline}</Heading> // headline: PlainText
 * <Button>{buttonLabel}</Button> // buttonLabel: PlainText
 * ```
 * 
 * **Important**: Do NOT use `WysiwygContent` component with `PlainText`.
 */
export type PlainText = string;

/**
 * HTML string from CMS rich text editor - MUST use WysiwygContent component.
 * 
 * Use this type for content that:
 * - Comes from a CMS rich text editor (WYSIWYG)
 * - Contains HTML markup
 * - Must be rendered using the `WysiwygContent` component
 * 
 * @example
 * ```tsx
 * <WysiwygContent content={subheadline} /> // subheadline: HtmlString
 * ```
 * 
 * **Critical Rule**: Always use `WysiwygContent` component to render `HtmlString`.
 * Never render HTML strings directly in React components.
 */
export type HtmlString = string;

// ==========================================
// NAVIGATION TYPES
// ==========================================

/**
 * Navigation bar item.
 * 
 * Represents a single navigation link in the NavBar component.
 */
export type NavBarItem = {
  /** Display label for the navigation item */
  label: string;
  /** URL for the navigation link */
  href?: string;
  /** Whether this item is currently active/selected */
  active?: boolean;
};

/**
 * Footer link item.
 * 
 * Represents a single link in the Footer component's link sections.
 */
export type FooterLink = {
  /** Display label for the link */
  label: string;
  /** URL for the link */
  href?: string;
};

/**
 * Base social media link type.
 * 
 * Shared base type for social media links used across components.
 * All social icons must use Font Awesome class names (e.g., "fa-brands fa-square-facebook").
 */
export type BaseSocialLink = {
  /** Name of the social media platform */
  name?: string;
  /** URL to the social media profile */
  href?: string;
  /** Font Awesome icon class names (e.g., "fa-brands fa-square-facebook") - required */
  icon: string;
};

/**
 * Footer social media link.
 * 
 * Represents a social media link in the Footer component.
 */
export type FooterSocialLink = BaseSocialLink;

// ==========================================
// MEDIA TYPES
// ==========================================

/**
 * Image item for ImageSection component.
 * 
 * Represents a single image in an image gallery or slider.
 */
export type ImageItem = {
  /** Unique identifier for the image */
  id?: string | number;
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Optional link URL when image is clicked */
  href?: string;
};

// ==========================================
// SLIDER ITEM TYPES
// ==========================================

/**
 * Product item for ProductSlider component.
 * 
 * Represents a single product in a product slider/carousel.
 */
export type ProductItem = {
  /** Unique identifier for the product */
  id?: string | number;
  /** Product image URL */
  image?: string;
  /** Alt text for the product image */
  imageAlt?: string;
  /** Product title (plain text, not HTML) */
  title?: PlainText;
  /** Product description (HTML from CMS) */
  description?: HtmlString;
  /** Button label (plain text) */
  buttonLabel?: PlainText;
  /** Button link URL */
  buttonHref?: string;
  /** Button click handler */
  buttonOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

/**
 * Recipe item for RecipeSlider component.
 * 
 * Represents a single recipe card in a recipe slider/carousel.
 */
export type RecipeItem = {
  /** Unique identifier for the recipe */
  id?: string | number;
  /** Recipe image URL */
  image?: string;
  /** Alt text for the recipe image */
  imageAlt?: string;
  /** Link URL for the recipe */
  href?: string;
  /** Recipe title (plain text, not from CMS) */
  title?: PlainText;
  /** Label for the read more button/link (plain text) */
  readMoreLabel?: PlainText;
  /** URL for the read more link */
  readMoreHref?: string;
  /** Click handler for the read more button/link */
  readMoreOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

/**
 * Social media feed item.
 * 
 * Represents a single post/item in a social media feed.
 */
export type SocialMediaFeedItem = {
  /** Image URL for the social media post */
  image: string;
  /** Alt text for the image */
  alt?: string;
  /** URL to the social media post */
  url?: string;
  /** Platform name (e.g., "facebook", "instagram", "twitter") */
  platform?: string;
  /** Font Awesome icon class names for platform badge (e.g., "fa-brands fa-square-instagram") - required if platform badge should be displayed */
  platformIcon?: string;
};

/**
 * Social media link for SocialMediaFeed component.
 * 
 * Represents a social media profile link in the feed header.
 */
export type SocialMediaFeedSocialLink = BaseSocialLink;

// ==========================================
// ACCORDION TYPES
// ==========================================

/**
 * Accordion trigger render function.
 * 
 * Function that renders the accordion item trigger/header.
 * Receives context about the accordion state.
 * 
 * @param context - Accordion context
 * @param context.isOpen - Whether this accordion item is currently open
 * @param context.allowMultiple - Whether multiple items can be open at once
 * @returns ReactNode to render as the trigger
 */
export type AccordionTriggerRender = (context: { 
  isOpen: boolean; 
  allowMultiple: boolean;
}) => ReactNode;

/**
 * Accordion item data.
 * 
 * Represents a single item in an Accordion component.
 */
export type AccordionItemData = {
  /** Unique identifier for the accordion item */
  id?: string | number;
  /** 
   * Trigger content - can be a ReactNode or a render function.
   * If a function, it receives accordion context (isOpen, allowMultiple).
   */
  trigger: ReactNode | AccordionTriggerRender;
  /** Content to display when the accordion item is expanded */
  content: ReactNode;
};

// ==========================================
// FAQ TYPES
// ==========================================

/**
 * FAQ item.
 * 
 * Represents a single question and answer pair in the FAQ component.
 */
export type FAQItem = {
  /** Unique identifier for the FAQ item */
  id?: string | number;
  /** Question text (plain text, not HTML) */
  question: PlainText;
  /** Answer content (HTML from CMS, rendered via WysiwygContent) */
  answer: HtmlString;
};

// ==========================================
// PRODUCT DETAIL TYPES
// ==========================================

/**
 * Nutritional value entry for a specific nutrient.
 * 
 * Represents a single row in the nutritional information table.
 */
export type NutritionalValue = {
  /** Nutrient name (e.g., "Valor energetico", "Grasas") */
  nutrient: PlainText;
  /** Value per 100g (e.g., "2131 kJ", "510kcal") */
  per100g?: PlainText;
  /** Value per serving size (e.g., "639 kJ", "153kcal") */
  perServing?: PlainText;
  /** Reference intake percentage (e.g., "8%", "<1%") */
  referenceIntake?: PlainText;
};

/**
 * Nutritional information data.
 * 
 * Contains all nutritional data for a product, including table headers and values.
 */
export type NutritionalInformation = {
  /** Serving size label */
  servingSizeLabel?: PlainText;
  /** Reference intake label */
  referenceIntakeLabel?: PlainText;
  /** Array of nutritional values */
  values: NutritionalValue[];
  /** Reference intake disclaimer text (HTML from CMS) */
  disclaimer?: HtmlString;
};
