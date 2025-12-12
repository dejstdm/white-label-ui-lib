import React from 'react';
import {
  NavBar,
  Hero,
  Footer,
  TextSection,
  ImageSection,
  ProductSlider,
  ProductOverview,
  ProductDetail,
  RecipeSlider,
  FAQ,
  SocialMediaFeed,
} from '../packages/components-react';

// Assets
import laysHeroBackground from './assets/theme-lays/lays-de-header-desktop.jpg';
import pepsicoLogo from '../packages/components-react/assets/pepsicolabs_logo.png';
import pepsicoWhiteLogo from '../packages/components-react/assets/pepsicolabs_logo-white.png';
import pepsiImage1 from './assets/pepsi-images/alexander-sergienko-S_fpEkzHnJo-unsplash.jpg';
import pepsiImage2 from './assets/pepsi-images/mohammed-benjadi-aHp47GFJqqw-unsplash.jpg';
import pepsiImage3 from './assets/pepsi-images/ja-san-miguel-xYSp0kkIUio-unsplash.jpg';
import pepsiImage4 from './assets/pepsi-images/nikhil-82LJQZGwW5o-unsplash.jpg';
import feedImage5 from './assets/recipes/Mac_JackOLantern_FinalDish_1x1.jpg';

// Product images
const pepsiMaxImage = '/stories/assets/pepsi-can/_MAX.png';
const pepsiMaxLimeImage = '/stories/assets/pepsi-can/LIME.png';
const pepsiMaxMangoImage = '/stories/assets/pepsi-can/MANGO.png';
const pepsiRegularImage = '/stories/assets/pepsi-can/REG.png';

// Recipe images
const spicyMeatballsImage = '/stories/assets/recipes/SpicyMeatballs.jpg';
const chickenRiceImage = '/stories/assets/recipes/ChickenRice.jpg';
const steakImage = '/stories/assets/recipes/Steak.jpg';
const churrosImage = '/stories/assets/recipes/Churros.jpg';

export const Page = () => {
  // Navigation items
  const navItems = [
    { label: 'Home', href: '#', active: true },
    { label: 'Products', href: '#' },
    { label: 'Recipes', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  // Products for ProductSlider
  const products = [
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
      image: pepsiRegularImage,
      imageAlt: 'Pepsi can',
      title: 'Pepsi',
      description: '<p>The classic great-tasting refreshment. The original cola that brings people together with its unmistakable flavour.</p>',
      buttonLabel: 'Learn More',
      buttonHref: '#',
    },
  ];

  

  // Product for ProductDetail
  const productDetail = {
    image: pepsiMaxImage,
    imageAlt: 'Pepsi Max can',
    title: '<h1>Pepsi Max</h1>',
    description: '<p>Maximum taste with no sugar. The bold, refreshing cola that gives you maximum flavour without the calories.</p>',
  };

  // Recipes for RecipeSlider
  const recipes = [
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
  ];

  // Images for ImageSection
  const images = [
    {
      id: 1,
      src: pepsiImage1,
      alt: 'Pepsi product image 1',
      href: '#',
    },
    {
      id: 2,
      src: pepsiImage2,
      alt: 'Pepsi product image 2',
      href: '#',
    },
    {
      id: 3,
      src: pepsiImage3,
      alt: 'Pepsi product image 3',
      href: '#',
    },
    {
      id: 4,
      src: pepsiImage4,
      alt: 'Pepsi product image 4',
      href: '#',
    },
  ];

  // FAQ items
  const faqItems = [
    {
      id: 1,
      question: 'What makes our products special?',
      answer: '<p>Our products are made with carefully selected ingredients and traditional recipes to ensure exceptional quality and taste.</p>',
    },
    {
      id: 2,
      question: 'Are your products suitable for vegetarians?',
      answer: '<p>Most of our products are suitable for vegetarians. Please check the product packaging for specific dietary information.</p>',
    },
    {
      id: 3,
      question: 'Where can I buy your products?',
      answer: '<p>Our products are available in supermarkets, convenience stores, and online retailers. Check our store locator to find products near you.</p>',
    },
    {
      id: 4,
      question: 'What flavors are available?',
      answer: '<p>We offer a wide range of flavors, from classic to gourmet varieties. Explore our products section to discover all available flavors.</p>',
    },
  ];

  // Social media items
  const socialMediaItems = [
    {
      image: pepsiImage1,
      alt: 'Social media post 1',
      url: 'https://instagram.com/p/example1',
      platform: 'instagram',
    },
    {
      image: pepsiImage2,
      alt: 'Social media post 2',
      url: 'https://instagram.com/p/example2',
      platform: 'instagram',
    },
    {
      image: pepsiImage3,
      alt: 'Social media post 3',
      url: 'https://instagram.com/p/example3',
      platform: 'instagram',
    },
    {
      image: feedImage5,
      alt: 'Social media post 4',
      url: 'https://instagram.com/p/example4',
      platform: 'instagram',
    },
  ];

  // Footer social links
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: 'fa-brands fa-square-facebook',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: 'fa-brands fa-square-instagram',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com',
      icon: 'fa-brands fa-square-x-twitter',
    },
  ];

  // Footer links
  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
  ];

  return (
    <>
      {/* NavBar */}
      <NavBar
        items={navItems}
        sticky={true}
        logoSrc={pepsicoWhiteLogo}
        logoAlt="PepsiCo Labs logo"
      />

      {/* Hero */}
      <Hero
        backgroundImage={laysHeroBackground}
        subheadline="<p>Welcome to our complete component showcase</p>"
        headline="All Components Together"
        body="<p>This page demonstrates all exported components from the WhiteLabel UI library working together on a single page.</p>"
        buttonLabel="Explore Products"
        buttonHref="#products"
      />

      {/* TextSection */}
      <TextSection
        headline="About This Page"
        text="<p>This page showcases all exported components from the WhiteLabel UI library. Each component is designed to work independently and can be composed together to create complete pages.</p><p>All components manage their own internal layout and styling, making it easy to build pages without additional wrappers.</p>"
      />

      {/* ProductSlider */}
      <ProductSlider
        headline="Our Products"
        subheadline="<h3>Discover our range of refreshing beverages</h3>"
        products={products}
      />

      {/* ProductOverview */}
      <ProductOverview
        headline="Featured Products"
        subheadline="<p>Check out our most popular selections</p>"
        products={products}
      />

     

      {/* ProductDetail */}
      <ProductDetail
        variant="overview"
        image={productDetail.image}
        imageAlt={productDetail.imageAlt}
        title={productDetail.title}
        description={productDetail.description}
      />

      {/* ImageSection */}
      <ImageSection
        headline="Gallery"
        subheadline="<p>Explore our visual collection</p>"
        images={images}
      />

      {/* TextSection */}
      <TextSection
        headline="Our Story"
        text="<p>We are committed to delivering quality products that bring people together. Our journey is built on innovation, quality, and a passion for excellence.</p>"
      />

      {/* RecipeSlider */}
      <RecipeSlider
        headline="Recipe Ideas"
        subheadline="<p>Get inspired by our recipe suggestions</p>"
        recipes={recipes}
        headerButtonLabel="View All Recipes"
        headerButtonHref="#recipes"
      />

      {/* FAQ */}
      <FAQ
        headline="Frequently Asked Questions"
        subheadline="<p>Find answers to common questions</p>"
        items={faqItems}
        collapseMode="single"
      />

      {/* SocialMediaFeed */}
      <SocialMediaFeed
        headline="Follow Us"
        subheadline="<p>Stay connected on social media</p>"
        followText="Follow us on social networks"
        items={socialMediaItems}
        socialLinks={socialLinks}
      />

      {/* Footer */}
      <Footer
        links={footerLinks}
        socialLinks={socialLinks}
        copyright="PepsiCo Labs"
        copyrightYear="2025"
        logoSrc={pepsicoLogo}
        logoAlt="PepsiCo Labs logo"
      />
    </>
  );
};
