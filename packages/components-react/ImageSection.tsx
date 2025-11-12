import React, { type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './ImageSection.css';
import './SectionLayout.css';
import { Container, type ContainerBreakpoint } from './Container';
import { SectionHeader } from './SectionHeader';

export type ImageItem = {
  id?: string | number;
  src: string;
  alt?: string;
  href?: string;
};

type LinkIconProps = {
  className?: string;
};

// Link icon SVG component (inline for styling)
const LinkIcon = ({ className = '' }: LinkIconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z" />
  </svg>
);

LinkIcon.propTypes = {
  className: PropTypes.string,
};

export interface ImageSectionProps extends HTMLAttributes<HTMLElement> {
  headline?: string;
  subheadline?: string;
  headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  images?: ImageItem[];
  containerBreakpoint?: ContainerBreakpoint;
  className?: string;
}

export const ImageSection = ({
  headline,
  subheadline,
  headlineLevel = 2,
  images = [],
  containerBreakpoint = null,
  className = '',
  ...props
}: ImageSectionProps) => {
  const shouldEnableNavigation = images.length > 1;

  const classes = [
    'image-section',
    'wl-sec',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'image-section__wrapper',
    shouldEnableNavigation ? '' : 'image-section__wrapper--static'
  ].filter(Boolean).join(' ');

  const swiperClasses = [
    'image-section__swiper',
    shouldEnableNavigation ? '' : 'image-section__swiper--static'
  ].filter(Boolean).join(' ');

  const renderImage = (image: ImageItem, index: number) => {
    const imageElement = (
      <div className="image-section__image-wrapper">
        <img
          src={image.src}
          alt={image.alt || ''}
          className="image-section__image"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        {image.href && (
          <div className="image-section__link-icon" aria-hidden="true">
            <LinkIcon />
          </div>
        )}
      </div>
    );

    if (image.href) {
      const isExternal = image.href.startsWith('http://') || image.href.startsWith('https://');
      return (
        <a
          href={image.href}
          className="image-section__link"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          aria-label={image.alt || 'View image'}
        >
          {imageElement}
        </a>
      );
    }

    return imageElement;
  };

  if (images.length === 0) {
    return null;
  }

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

        {images.length === 1 ? (
          <div className="image-section__single">
            {renderImage(images[0], 0)}
          </div>
        ) : (
          <div className={wrapperClasses}>
            <Swiper
              modules={[Navigation]}
              navigation={shouldEnableNavigation ? {
                nextEl: '.image-section__button-next',
                prevEl: '.image-section__button-prev',
              } : false}
              slidesPerView={1}
              spaceBetween={20}
              allowTouchMove={shouldEnableNavigation}
              className={swiperClasses}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id || index} className="image-section__slide">
                  {renderImage(image, index)}
                </SwiperSlide>
              ))}
            </Swiper>
            {shouldEnableNavigation && (
              <>
                <button
                  className="image-section__button-prev image-section__nav-button"
                  aria-label="Previous image"
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
                  className="image-section__button-next image-section__nav-button"
                  aria-label="Next image"
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
              </>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

ImageSection.propTypes = {
  headline: PropTypes.string, // Plain text field - not from CMS
  headlineLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  subheadline: PropTypes.string, // HTML string from CMS rich text editor
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      href: PropTypes.string, // Optional link URL
    })
  ),
  containerBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', null]),
  className: PropTypes.string,
};

