import React, { type HTMLAttributes, type MouseEventHandler } from 'react';
import './Hero.css';
import './SectionLayout.css';
import { Button } from './Button';
import { Container } from './Container';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';
import type { PlainText, HtmlString } from './types';

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  backgroundImage?: string;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  body?: HtmlString;
  /** Plain text button label (not from CMS) */
  buttonLabel?: PlainText;
  buttonHref?: string;
  buttonOnClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
}

export const Hero = ({
  backgroundImage,
  subheadline,
  headline,
  body,
  buttonLabel,
  buttonHref,
  buttonOnClick,
  className = '',
  ...props
}: HeroProps) => {
  const classes = [
    'hero',
    'wl-sec',
    !backgroundImage ? 'hero--no-background' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      {backgroundImage && (
        <div className="hero__background" aria-hidden="true">
          <img 
            src={backgroundImage} 
            alt="" 
            className="hero__background-image"
          />
          <div className="hero__overlay" />
        </div>
      )}
      <div className="hero__content">
        <Container padding>
          <div className="hero__text">
            {subheadline && (
              <div className="hero__subheadline">
                <WysiwygContent content={subheadline} />
              </div>
            )}
            {headline && (
              <div className="hero__headline">
                <Heading level={1} variant="h1">
                  {headline}
                </Heading>
              </div>
            )}
            {body && (
              <div className="hero__body">
                <WysiwygContent content={body} />
              </div>
            )}
            {buttonLabel && (
              <div className="hero__button-wrapper">
                <Button
                  variant={backgroundImage ? 'inverted' : 'solid'}
                  href={buttonHref}
                  onClick={buttonOnClick}
                >
                  {buttonLabel}
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
};
