import React from 'react';
import PropTypes from 'prop-types';
import './Hero.css';
import { Button } from './Button';
import { Container } from './Container';

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
                <p>{subheadline}</p>
              </div>
            )}
            {headline && (
              <div className="hero__headline">
                <p>{headline}</p>
              </div>
            )}
            {body && (
              <div className="hero__body">
                <p>{body}</p>
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
  subheadline: PropTypes.string,
  headline: PropTypes.string,
  body: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonHref: PropTypes.string,
  buttonOnClick: PropTypes.func,
  containerBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', null]),
  className: PropTypes.string,
};

