import React from 'react';
import PropTypes from 'prop-types';
import './TextSection.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { WysiwygContent } from './WysiwygContent';

export const TextSection = ({
  headline,
  subheadline,
  headlineLevel = 2,
  text,
  containerBreakpoint = null,
  className = '',
  ...props
}) => {
  const classes = [
    'text-section',
    'wl-sec',
    className
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

        {text && (
          <div className="text-section__content">
            <WysiwygContent content={text} />
          </div>
        )}
      </Container>
    </section>
  );
};

TextSection.propTypes = {
  headline: PropTypes.string, // Plain text field - not from CMS
  headlineLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  subheadline: PropTypes.string, // HTML string from CMS rich text editor
  text: PropTypes.string, // HTML string from CMS rich text editor
  containerBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', null]),
  className: PropTypes.string,
};

