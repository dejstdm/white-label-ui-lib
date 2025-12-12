import React from 'react';
import './ProductCard.css';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';
import { Button } from './Button';
import type { ProductItem } from './types';

export interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const classes = ['product-card', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {product.image && (
        <div className="product-card__image-wrapper">
          <img
            src={product.image}
            alt={product.imageAlt || product.title || ''}
            className="product-card__image"
            loading="lazy"
          />
        </div>
      )}
      <div className="product-card__content">
        {product.title && (
          <Heading level={3} variant="h4" className="product-card__title">
            {product.title}
          </Heading>
        )}
        {product.description && (
          <div className="product-card__description">
            <WysiwygContent content={product.description} />
          </div>
        )}
        {product.buttonLabel && (
          <div className="product-card__button-wrapper">
            <Button
              variant="solid"
              href={product.buttonHref}
              onClick={product.buttonOnClick}
            >
              {product.buttonLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

