// Public API - only export components meant for direct consumer use

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
export { RecipeSlider } from './RecipeSlider';
export { FAQ } from './FAQ';
export { SocialMediaFeed } from './SocialMediaFeed';

// Icons
export * from './icons/index';
// Internal building blocks - NOT exported:
// - Container (used internally by all sections)
// - Heading (used internally by Hero, SectionHeader)
// - Text (primitive typography component)
// - Button (used internally by Hero, ProductSlider, RecipeSlider, SocialMediaFeed)
// - WysiwygContent (used internally for CMS content)
// - SectionHeader (used internally by section components)
