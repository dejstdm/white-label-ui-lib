import React from 'react';
import PropTypes from 'prop-types';
import './Hero.css';
import './SectionLayout.css';
import { Button } from './Button';
import { Container } from './Container';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';

export const Hero = ({
  backgroundImage,
  subheadline,
  headline,
  body,
  buttonLabel,
  buttonHref,
  buttonOnClick,
  containerBreakpoint = null,
  className = '',
  ...props
}) => {
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
        <Container breakpoint={containerBreakpoint} padding>
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
                  variant="inverted"
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

Hero.propTypes = {
  backgroundImage: PropTypes.string,
  subheadline: PropTypes.string, // HTML string from CMS rich text editor
  headline: PropTypes.string, // Plain text field - not from CMS
  body: PropTypes.string, // HTML string from CMS rich text editor
  buttonLabel: PropTypes.string, // Plain text field for link text
  buttonHref: PropTypes.string, // Plain text field for link URL
  buttonOnClick: PropTypes.func,
  containerBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', null]),
  className: PropTypes.string,
};
