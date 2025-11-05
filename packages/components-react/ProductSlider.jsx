import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './ProductSlider.css';
import { Container } from './Container';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';
import { Button } from './Button';

export const ProductSlider = ({
  headline,
  subheadline,
  products = [],
  containerBreakpoint = null,
  className = '',
  ...props
}) => {
  const classes = [
    'product-slider',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <Container breakpoint={containerBreakpoint} padding>
        {(headline || subheadline) && (
          <div className="product-slider__header">
            {headline && (
              <Heading level={2} variant="h2" className="product-slider__headline">
                {headline}
              </Heading>
            )}
            {subheadline && (
              <WysiwygContent 
                content={subheadline}
                className="product-slider__subheadline"
              />
            )}
          </div>
        )}
        
        {products.length > 0 && (
          <div className="product-slider__wrapper">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.product-slider__button-next',
                prevEl: '.product-slider__button-prev',
              }}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 41,
                },
              }}
              className="product-slider__swiper"
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
                            variant="outline"
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
            <button
              className="product-slider__button-prev product-slider__nav-button"
              aria-label="Previous products"
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
      </Container>
    </section>
  );
};

ProductSlider.propTypes = {
  headline: PropTypes.string, // Plain text field
  subheadline: PropTypes.string, // HTML string from CMS rich text editor
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      imageAlt: PropTypes.string,
      title: PropTypes.string, // Plain text field
      description: PropTypes.string, // HTML string from CMS rich text editor (e.g., "<p>Description text</p>")
      buttonLabel: PropTypes.string, // Plain text field for link text
      buttonHref: PropTypes.string, // Plain text field for link URL
      buttonOnClick: PropTypes.func,
    })
  ),
  containerBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', null]),
  className: PropTypes.string,
};

