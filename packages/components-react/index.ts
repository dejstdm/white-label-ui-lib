// Public API - only export components meant for direct consumer use

// Global CSS reset (box-sizing: border-box for all elements)
import './reset.css';

// Navigation & Layout
export { NavBar } from './NavBar';
export { Footer } from './Footer';

// Hero Section
export { Hero } from './Hero';

// Content Sections
export { TextSection } from './TextSection';
export { ImageSection } from './ImageSection';

// Feature Components
export { ProductSlider } from './ProductSlider';
export { ProductOverview } from './ProductOverview';
export { RecipeOverview } from './RecipeOverview';
export { ProductDetail } from './ProductDetail';
export { RecipeSlider } from './RecipeSlider';
export { FAQ } from './FAQ';
export { SocialMediaFeed } from './SocialMediaFeed';

// Types - export for consumers
export type {
  // Primitive types
  // NOTE: ContainerBreakpoint is NOT exported - it's a global CSS variable setting, not a component prop
  HeadingLevel,
  HeadingVariant,
  TextSize,
  ButtonVariant,
  ButtonSize,
  CollapseMode,
  // Content types
  PlainText,
  HtmlString,
  // Navigation types
  NavBarItem,
  FooterLink,
  FooterSocialLink,
  // Media types
  ImageItem,
  // Slider types
  ProductItem,
  RecipeItem,
  SocialMediaFeedItem,
  SocialMediaFeedSocialLink,
  // Accordion types
  AccordionTriggerRender,
  AccordionItemData,
  // FAQ types
  FAQItem,
} from './types';

// Component props for advanced usage
export type { HeroProps } from './Hero';
export type { ProductSliderProps } from './ProductSlider';
export type { ProductOverviewProps } from './ProductOverview';
export type { ProductDetailProps, ProductDetailVariant } from './ProductDetail';
export type { RecipeSliderProps } from './RecipeSlider';
export type { RecipeOverviewProps } from './RecipeOverview';
export type { FAQProps } from './FAQ';
export type { TextSectionProps } from './TextSection';
export type { ImageSectionProps } from './ImageSection';
export type { SocialMediaFeedProps } from './SocialMediaFeed';
export type { NavBarProps } from './NavBar';
export type { FooterProps } from './Footer';

// Internal building blocks - NOT exported:
// - Container (used internally by all sections)
// - Heading (used internally by Hero, SectionHeader)
// - Text (primitive typography component)
// - Button (used internally by Hero, ProductSlider, RecipeSlider, SocialMediaFeed)
// - WysiwygContent (used internally for CMS content)
// - SectionHeader (used internally by section components)
// - Image (standard image component with required width/height)
// - ResponsiveImage (picture tag component for mobile/desktop images)
// - ProductCard (used internally by ProductSlider and ProductOverview)
// - RecipeCard (used internally by RecipeSlider and RecipeOverview)
