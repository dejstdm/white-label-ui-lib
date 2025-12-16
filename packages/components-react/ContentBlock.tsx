import React, { type HTMLAttributes } from 'react';
import './ContentBlock.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { Image } from './Image';
import { WysiwygContent } from './WysiwygContent';
import type { PlainText, HtmlString, HeadingLevel, ContentBlockItem } from './types';

export interface ContentBlockProps extends HTMLAttributes<HTMLElement> {
  /** Layout variant: 'single' or 'multiple' */
  variant?: 'single' | 'multiple';
  /** Plain text headline (not from CMS) - rendered via SectionHeader */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent */
  subheadline?: HtmlString;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  /** Image position: 'left' or 'right' - controls first row position in multiple variant, single row position in single variant (default: 'right') */
  imagePosition?: 'left' | 'right';
  
  // Single variant props
  /** Image source URL (single variant) */
  imageSrc?: string;
  /** Alt text for the image (single variant) */
  imageAlt?: string;
  /** Image width (single variant) */
  imageWidth?: number;
  /** Image height (single variant) */
  imageHeight?: number;
  /** Heading text (HTML from CMS, single variant) */
  heading?: HtmlString;
  /** Body content (HTML from CMS, single variant) */
  content?: HtmlString;
  
  // Multiple variant props
  /** Array of content items (multiple variant) */
  items?: ContentBlockItem[];
  
  className?: string;
}

export const ContentBlock = ({
  variant = 'single',
  headline,
  subheadline,
  headlineLevel = 2,
  imagePosition = 'right',
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  heading,
  content,
  items = [],
  className = '',
  ...props
}: ContentBlockProps) => {
  const classes = [
    'content-block',
    'wl-sec',
    `content-block--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const imageStart = imagePosition || 'right';

  // Single variant: render one row
  const renderSingleRow = () => {
    if (!imageSrc || !imageAlt || !imageWidth || !imageHeight) {
      return null;
    }

    return (
      <div className="content-block__row" data-image-position={imagePosition}>
        <div className="content-block__image-wrapper">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="content-block__image"
          />
        </div>
        <div className="content-block__content-wrapper">
          {heading && (
            <div className="content-block__heading">
              <WysiwygContent content={heading} />
            </div>
          )}
          {content && (
            <div className="content-block__text">
              <WysiwygContent content={content} />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Multiple variant: render multiple rows
  const renderMultipleRows = () => {
    if (items.length === 0) {
      return null;
    }

    return (
      <>
        {items.map((item, index) => (
          <div key={item.id || index} className="content-block__row">
            <div className="content-block__image-wrapper">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                width={item.imageWidth}
                height={item.imageHeight}
                className="content-block__image"
              />
            </div>
            <div className="content-block__content-wrapper">
              {item.heading && (
                <div className="content-block__heading">
                  <WysiwygContent content={item.heading} />
                </div>
              )}
              {item.content && (
                <div className="content-block__text">
                  <WysiwygContent content={item.content} />
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <section
      className={classes}
      data-image-start={variant === 'multiple' ? imageStart : undefined}
      {...props}
    >
      <Container padding>
        {(headline || subheadline) && (
          <SectionHeader
            headline={headline}
            headlineLevel={headlineLevel}
            subheadline={subheadline}
          />
        )}

        {variant === 'single' ? renderSingleRow() : renderMultipleRows()}
      </Container>
    </section>
  );
};
