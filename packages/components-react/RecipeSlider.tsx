"use client";

import React, { useEffect, useMemo, useState, type HTMLAttributes, type MouseEventHandler } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RecipeSlider.css';
import './SectionLayout.css';
import { Container } from './Container';
import { Button } from './Button';
import { SectionHeader } from './SectionHeader';
import type { RecipeItem, PlainText, HtmlString, HeadingLevel } from './types';

export interface RecipeSliderProps extends HTMLAttributes<HTMLElement> {
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  recipes?: RecipeItem[];
  /** Plain text button label (not from CMS) */
  headerButtonLabel?: PlainText;
  headerButtonHref?: string;
  headerButtonOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
}

export const RecipeSlider = ({
  headline,
  subheadline,
  headlineLevel = 2,
  recipes = [],
  headerButtonLabel,
  headerButtonHref,
  headerButtonOnClick,
  className = '',
  ...props
}: RecipeSliderProps) => {
  const isClient = typeof window !== 'undefined';
  const [viewportWidth, setViewportWidth] = useState(() => (
    isClient ? window.innerWidth : 0
  ));

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  const getSlidesPerViewForWidth = (width: number) => {
    if (width >= 992) {
      return 3;
    }

    if (width >= 768) {
      return 2;
    }

    return 1;
  };

  const slidesPerViewForViewport = Math.min(
    getSlidesPerViewForWidth(viewportWidth),
    Math.max(recipes.length, 1)
  );

  const shouldEnableNavigation = recipes.length > slidesPerViewForViewport;

  const breakpointConfig = useMemo(() => ({
    768: {
      slidesPerView: Math.max(1, Math.min(2, recipes.length)),
      spaceBetween: 20,
    },
    992: {
      slidesPerView: Math.max(1, Math.min(3, recipes.length)),
      spaceBetween: 40,
    },
  }), [recipes.length]);

  const classes = [
    'recipe-slider',
    'wl-sec',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'recipe-slider__wrapper',
    shouldEnableNavigation ? '' : 'recipe-slider__wrapper--static'
  ].filter(Boolean).join(' ');

  const swiperClasses = [
    'recipe-slider__swiper',
    shouldEnableNavigation ? '' : 'recipe-slider__swiper--static'
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <Container padding>
        {(headline || subheadline || headerButtonLabel) && (
          <div className="recipe-slider__header-wrapper">
            {(headline || subheadline) && (
              <SectionHeader
                headline={headline}
                headlineLevel={headlineLevel}
                subheadline={subheadline}
              />
            )}
            {headerButtonLabel && (
              <div className="recipe-slider__header-button-wrapper">
                <Button
                  variant="outline"
                  href={headerButtonHref}
                  onClick={headerButtonOnClick}
                >
                  {headerButtonLabel}
                </Button>
              </div>
            )}
          </div>
        )}
        </Container>
        <div className="recipe-slider__container">
        <Container padding>
        {recipes.length > 0 && (
          <div className={wrapperClasses}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={shouldEnableNavigation ? {
                nextEl: '.recipe-slider__button-next',
                prevEl: '.recipe-slider__button-prev',
              } : false}
              pagination={shouldEnableNavigation ? {
                el: '.recipe-slider__pagination',
                clickable: true,
              } : false}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={breakpointConfig}
              allowTouchMove={shouldEnableNavigation}
              className={swiperClasses}
            >
              {recipes.map((recipe, index) => (
                <SwiperSlide key={recipe.id || index} className="recipe-slider__slide">
                  <div className="recipe-slider__card">
                    {recipe.image && (
                      recipe.href ? (
                        <a href={recipe.href} className="recipe-slider__image-wrapper">
                          <img
                            src={recipe.image}
                            alt={recipe.imageAlt || ''}
                            className="recipe-slider__image"
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <div className="recipe-slider__image-wrapper">
                          <img
                            src={recipe.image}
                            alt={recipe.imageAlt || ''}
                            className="recipe-slider__image"
                            loading="lazy"
                          />
                        </div>
                      )
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {shouldEnableNavigation && (
              <>
                <button
                  className="recipe-slider__button-prev recipe-slider__nav-button"
                  aria-label="Previous recipes"
                  type="button"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 7 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1L1 7L6 13"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="recipe-slider__button-next recipe-slider__nav-button"
                  aria-label="Next recipes"
                  type="button"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 7 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 7L1 13"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="recipe-slider__pagination" />
              </>
            )}
          </div>
        )}
      </Container>
      </div>
    </section>
  );
};

