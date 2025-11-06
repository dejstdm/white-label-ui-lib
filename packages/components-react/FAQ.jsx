import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FAQ.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { WysiwygContent } from './WysiwygContent';

export const FAQ = ({
  headline,
  subheadline,
  headlineLevel = 2,
  items = [],
  containerBreakpoint = null,
  className = '',
  ...props
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle(index);
    }
  };

  const classes = [
    'faq',
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
            align="center"
          />
        )}

        {items.length > 0 && (
          <div className="faq__accordion" role="region" aria-label="Frequently asked questions">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const itemId = `faq-item-${index}`;
              const controlId = `faq-control-${index}`;

              return (
                <div key={item.id || index} className="faq__item">
                  <button
                    type="button"
                    className={`faq__button ${isOpen ? 'faq__button--open' : ''}`}
                    onClick={() => handleToggle(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={isOpen}
                    aria-controls={itemId}
                    id={controlId}
                  >
                    <span className="faq__question">
                      {item.question}
                    </span>
                    <span className="faq__icon" aria-hidden="true">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={itemId}
                    className={`faq__collapse ${isOpen ? 'faq__collapse--show' : ''}`}
                    role="region"
                    aria-labelledby={controlId}
                  >
                    <div className="faq__content">
                      <WysiwygContent content={item.answer} />
                    </div>
                  </div>
                  {index < items.length - 1 && (
                    <div className="faq__divider" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

FAQ.propTypes = {
  headline: PropTypes.string, // Plain text field - not from CMS
  headlineLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  subheadline: PropTypes.string, // HTML string from CMS rich text editor
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      question: PropTypes.string.isRequired, // Plain text field - not from CMS
      answer: PropTypes.string.isRequired, // HTML string from CMS rich text editor
    })
  ),
  containerBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', null]),
  className: PropTypes.string,
};

