import React from 'react';
import './RecipeCard.css';
import { Heading } from './Heading';
import { Button } from './Button';
import type { RecipeItem } from './types';

export interface RecipeCardProps {
  recipe: RecipeItem;
  className?: string;
}

export const RecipeCard = ({ recipe, className = '' }: RecipeCardProps) => {
  const classes = ['recipe-card', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {recipe.image && (
        recipe.href ? (
          <a href={recipe.href} className="recipe-card__image-wrapper">
            <img
              src={recipe.image}
              alt={recipe.imageAlt || ''}
              className="recipe-card__image"
              loading="lazy"
            />
          </a>
        ) : (
          <div className="recipe-card__image-wrapper">
            <img
              src={recipe.image}
              alt={recipe.imageAlt || ''}
              className="recipe-card__image"
              loading="lazy"
            />
          </div>
        )
      )}
      {(recipe.title || recipe.readMoreLabel) && (
        <div className="recipe-card__content">
          {recipe.title && (
            <Heading level={3} variant="h6" className="recipe-card__title">
              {recipe.title}
            </Heading>
          )}
          {recipe.readMoreLabel && (
            <div className="recipe-card__read-more">
              <Button
                variant="text"
                icon={true}
                href={recipe.readMoreHref}
                onClick={recipe.readMoreOnClick}
              >
                {recipe.readMoreLabel}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
