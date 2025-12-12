import React, { useState, type HTMLAttributes, type MouseEventHandler } from 'react';
import './ProductOverview.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';
import { Button } from './Button';
import type { ProductItem, PlainText, HtmlString, HeadingLevel } from './types';

export interface ProductOverviewProps extends HTMLAttributes<HTMLElement> {
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  /** Layout variant: 'grid' or 'zig-zag' */
  layout?: 'grid' | 'zig-zag';
  /** Array of product items */
  products?: ProductItem[];
  /** Load More button label (plain text) */
  loadMoreLabel?: PlainText;
  /** Load More button link URL */
  loadMoreHref?: string;
  /** Load More button click handler */
  loadMoreOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
}

const INITIAL_PRODUCTS_COUNT = 6;

export const ProductOverview = ({
  headline,
  subheadline,
  headlineLevel = 2,
  layout = 'grid',
  products = [],
  loadMoreLabel = 'Load More Items',
  loadMoreHref,
  loadMoreOnClick,
  className = '',
  ...props
}: ProductOverviewProps) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCTS_COUNT);
  const isZigZag = layout === 'zig-zag';
  const hasMoreProducts = products.length > INITIAL_PRODUCTS_COUNT;
  const showLoadMore = !isZigZag && hasMoreProducts && visibleCount < products.length;
  const visibleProducts = isZigZag ? products : products.slice(0, visibleCount);

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (loadMoreOnClick) {
      loadMoreOnClick(e);
    } else {
      e.preventDefault();
      setVisibleCount(products.length);
    }
  };

  const classes = [
    'product-overview',
    'wl-sec',
    isZigZag ? 'product-overview--zig-zag' : 'product-overview--grid',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <Container padding>
        {(headline || subheadline) && (
          <SectionHeader
            headline={headline}
            headlineLevel={headlineLevel}
            subheadline={subheadline}
          />
        )}

        {visibleProducts.length > 0 && (
          <>
            <div className={isZigZag ? 'product-overview__zig-zag' : 'product-overview__grid'}>
              {visibleProducts.map((product, index) => {
                if (isZigZag) {
                  return (
                    <div
                      key={product.id || index}
                      className="product-overview__zig-zag-item"
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                }

                return (
                  <div key={product.id || index} className="product-overview__grid-item">
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>

            {showLoadMore && (
              <div className="product-overview__load-more">
                <Button
                  variant="solid"
                  href={loadMoreHref}
                  onClick={handleLoadMore}
                >
                  {loadMoreLabel}
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

