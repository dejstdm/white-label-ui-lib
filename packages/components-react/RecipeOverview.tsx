"use client";

import React, { useState, type HTMLAttributes, type MouseEventHandler } from 'react';
import './RecipeOverview.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { RecipeCard } from './RecipeCard';
import { Button } from './Button';
import type { RecipeItem, PlainText, HtmlString, HeadingLevel } from './types';

export interface RecipeOverviewProps extends HTMLAttributes<HTMLElement> {
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  /** Array of recipe items */
  recipes?: RecipeItem[];
  /** Load More button label (plain text) */
  loadMoreLabel?: PlainText;
  /** Load More button link URL */
  loadMoreHref?: string;
  /** Load More button click handler */
  loadMoreOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Variation: 'image-only' shows only images, 'with-content' shows title and read more button */
  variant?: 'image-only' | 'with-content';
  className?: string;
}

const INITIAL_RECIPES_COUNT = 6;

export const RecipeOverview = ({
  headline,
  subheadline,
  headlineLevel = 2,
  recipes = [],
  loadMoreLabel = 'Load More Items',
  loadMoreHref,
  loadMoreOnClick,
  variant = 'image-only',
  className = '',
  ...props
}: RecipeOverviewProps) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_RECIPES_COUNT);
  const hasMoreRecipes = recipes.length > INITIAL_RECIPES_COUNT;
  const showLoadMore = hasMoreRecipes && visibleCount < recipes.length;
  const visibleRecipes = recipes.slice(0, visibleCount);

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (loadMoreOnClick) {
      loadMoreOnClick(e);
    } else {
      e.preventDefault();
      setVisibleCount(recipes.length);
    }
  };

  const classes = [
    'recipe-overview',
    'wl-sec',
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

        {visibleRecipes.length > 0 && (
          <>
            <div className="recipe-overview__grid">
              {visibleRecipes.map((recipe, index) => (
                <div key={recipe.id || index} className="recipe-overview__grid-item">
                  <RecipeCard recipe={recipe} variant={variant} />
                </div>
              ))}
            </div>

            {showLoadMore && (
              <div className="recipe-overview__load-more">
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
