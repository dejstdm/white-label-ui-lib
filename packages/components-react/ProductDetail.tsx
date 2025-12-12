import React, { useState, type HTMLAttributes, type MouseEventHandler } from 'react';
import './ProductDetail.css';
import { Container } from './Container';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';
import { Button } from './Button';
import type { PlainText, HtmlString, HeadingLevel } from './types';

/**
 * ProductDetail component variant.
 * 
 * - `overview`: Full product information with nutritional table (no CTA button)
 * - `compact`: Product information with CTA button and nutritional table (less content)
 * - `tabs`: Product information with CTA button and tabbed content (INGREDIENTS/NUTRITIONAL)
 */
export type ProductDetailVariant = 'overview' | 'compact' | 'tabs';

export interface ProductDetailProps extends HTMLAttributes<HTMLElement> {
  /** Component variant */
  variant?: ProductDetailVariant;
  /** Product image URL - required */
  image: string;
  /** Alt text for product image */
  imageAlt?: string;
  /** Product title (HTML from CMS) */
  title?: HtmlString;
  /** Semantic heading level for title - defaults to 2 */
  titleLevel?: HeadingLevel;
  /** Product tagline/short description (HTML from CMS) - only shown in 'overview' variant */
  tagline?: HtmlString;
  /** Product headline (HTML from CMS) - only shown in 'overview' variant */
  headline?: HtmlString;
  /** Product description (HTML from CMS) */
  description?: HtmlString;
  /** CTA button label (plain text) - only shown in 'compact' and 'tabs' variants */
  ctaLabel?: PlainText;
  /** CTA button link URL */
  ctaHref?: string;
  /** CTA button click handler */
  ctaOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Nutritional information table (HTML from CMS WYSIWYG) - only shown in 'overview' and 'compact' variants */
  nutritionalTable?: HtmlString;
  /** Ingredients content (HTML from CMS) - only shown in 'tabs' variant */
  ingredients?: HtmlString;
  /** Nutritional content (HTML from CMS) - only shown in 'tabs' variant */
  nutritional?: HtmlString;
  /** Default active tab for 'tabs' variant - defaults to 'ingredients' */
  defaultTab?: 'ingredients' | 'nutritional';
  className?: string;
}

export const ProductDetail = ({
  variant = 'overview',
  image,
  imageAlt,
  title,
  titleLevel = 2,
  tagline,
  headline,
  description,
  ctaLabel,
  ctaHref,
  ctaOnClick,
  nutritionalTable,
  ingredients,
  nutritional,
  defaultTab = 'ingredients',
  className = '',
  ...props
}: ProductDetailProps) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutritional'>(defaultTab);

  const classes = [
    'product-detail',
    'wl-sec',
    `product-detail--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const handleTabClick = (tab: 'ingredients' | 'nutritional') => {
    setActiveTab(tab);
  };

  const renderNutritionalTable = () => {
    if (!nutritionalTable) {
      return null;
    }

    return (
      <div className="product-detail__nutritional">
        <Heading level={3} variant="h5" className="product-detail__nutritional-title">
          Nutritional Information
        </Heading>
        <div className="product-detail__table-wrapper">
          <WysiwygContent content={nutritionalTable} />
        </div>
      </div>
    );
  };

  const renderTabs = () => {
    if (variant !== 'tabs') {
      return null;
    }

    return (
      <>
        <div className="product-detail__tabs-separator"></div>
        <div className="product-detail__tabs">
          <button
            type="button"
            className={`product-detail__tab ${activeTab === 'ingredients' ? 'product-detail__tab--active' : ''}`}
            onClick={() => handleTabClick('ingredients')}
            aria-selected={activeTab === 'ingredients'}
            aria-controls="product-detail-tabpanel-ingredients"
            id="product-detail-tab-ingredients"
          >
            INGREDIENTS
          </button>
          <button
            type="button"
            className={`product-detail__tab ${activeTab === 'nutritional' ? 'product-detail__tab--active' : ''}`}
            onClick={() => handleTabClick('nutritional')}
            aria-selected={activeTab === 'nutritional'}
            aria-controls="product-detail-tabpanel-nutritional"
            id="product-detail-tab-nutritional"
          >
            NUTRITIONAL
          </button>
        </div>
        <div className="product-detail__tab-content">
          <div
            id="product-detail-tabpanel-ingredients"
            role="tabpanel"
            aria-labelledby="product-detail-tab-ingredients"
            hidden={activeTab !== 'ingredients'}
            className="product-detail__tab-panel"
          >
            {ingredients && <WysiwygContent content={ingredients} />}
          </div>
          <div
            id="product-detail-tabpanel-nutritional"
            role="tabpanel"
            aria-labelledby="product-detail-tab-nutritional"
            hidden={activeTab !== 'nutritional'}
            className="product-detail__tab-panel"
          >
            {nutritional && <WysiwygContent content={nutritional} />}
          </div>
        </div>
      </>
    );
  };

  return (
    <section className={classes} {...props}>
      <Container padding>
        <div className="product-detail__wrapper">
          <div className="product-detail__image-wrapper">
            <img
              src={image}
              alt={imageAlt || ''}
              className="product-detail__image"
              loading="lazy"
            />
          </div>

          <div className="product-detail__content">
            {title && (
              <div className="product-detail__title">
                <WysiwygContent content={title} />
              </div>
            )}

            {variant === 'overview' && tagline && (
              <div className="product-detail__tagline">
                <WysiwygContent content={tagline} />
              </div>
            )}

            {variant === 'overview' && headline && (
              <div className="product-detail__headline">
                <WysiwygContent content={headline} />
              </div>
            )}

            {description && (
              <div className="product-detail__description">
                <WysiwygContent content={description} />
              </div>
            )}

            {(variant === 'compact' || variant === 'tabs') && ctaLabel && (
              <div className="product-detail__cta">
                <Button
                  variant="outline"
                  href={ctaHref}
                  onClick={ctaOnClick}
                >
                  {ctaLabel}
                </Button>
              </div>
            )}

            {variant === 'tabs' && renderTabs()}
          </div>

          {(variant === 'overview' || variant === 'compact') && renderNutritionalTable()}
        </div>
      </Container>
    </section>
  );
};
