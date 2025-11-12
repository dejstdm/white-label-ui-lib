import React, { useEffect, useMemo, useState, type HTMLAttributes, type MouseEventHandler } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './ProductSlider.css';
import './SectionLayout.css';
import { Container, type ContainerBreakpoint } from './Container';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';
import { Button } from './Button';
import { SectionHeader } from './SectionHeader';

export type ProductItem = {
  id?: string | number;
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export interface ProductSliderProps extends HTMLAttributes<HTMLElement> {
  headline?: string;
  subheadline?: string;
  headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  products?: ProductItem[];
  containerBreakpoint?: ContainerBreakpoint;
  className?: string;
}

export const ProductSlider = ({
  headline,
  subheadline,
  headlineLevel = 2,
  products = [],
  containerBreakpoint = null,
  className = '',
  ...props
}: ProductSliderProps) => {
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
    Math.max(products.length, 1)
  );

  const shouldEnableNavigation = products.length > slidesPerViewForViewport;

  const breakpointConfig = useMemo(() => ({
    768: {
      slidesPerView: Math.max(1, Math.min(2, products.length)),
      spaceBetween: 20,
    },
    992: {
      slidesPerView: Math.max(1, Math.min(3, products.length)),
      spaceBetween: 41,
    },
  }), [products.length]);

  const classes = [
    'product-slider',
    'wl-sec',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'product-slider__wrapper',
    shouldEnableNavigation ? '' : 'product-slider__wrapper--static'
  ].filter(Boolean).join(' ');

  const swiperClasses = [
    'product-slider__swiper',
    shouldEnableNavigation ? '' : 'product-slider__swiper--static'
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <Container breakpoint={containerBreakpoint} padding>
        {(headline || subheadline) && (
          <SectionHeader
            headline={headline}
            headlineLevel={headlineLevel}
            subheadline={subheadline}
          />
        )}
        
        {products.length > 0 && (
          <div className={wrapperClasses}>
            <Swiper
              modules={[Navigation]}
              navigation={shouldEnableNavigation ? {
                nextEl: '.product-slider__button-next',
                prevEl: '.product-slider__button-prev',
              } : false}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={breakpointConfig}
              allowTouchMove={shouldEnableNavigation}
              className={swiperClasses}
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id || index} className="product-slider__slide">
                  <div className="product-slider__card">
                    {product.image && (
                      <div className="product-slider__image-wrapper">
                        <img
                          src={product.image}
                          alt={product.imageAlt || product.title || ''}
                          className="product-slider__image"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="product-slider__content">
                      {product.title && (
                        <Heading level={3} variant="h4" className="product-slider__title">
                          {product.title}
                        </Heading>
                      )}
                      {product.description && (
                        <div className="product-slider__description">
                          <WysiwygContent content={product.description} />
                        </div>
                      )}
                      {product.buttonLabel && (
                        <div className="product-slider__button-wrapper">
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
                </SwiperSlide>
              ))}
            </Swiper>
            {shouldEnableNavigation && (
              <div className="product-slider__nav-buttons">
                <button
                  className="product-slider__button-prev product-slider__nav-button"
                  aria-label="Previous products"
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
                  className="product-slider__button-next product-slider__nav-button"
                  aria-label="Next products"
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
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

