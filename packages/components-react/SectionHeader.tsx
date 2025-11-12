import React, { type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import './SectionLayout.css';
import './SectionHeader.css';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  headline?: string;
  headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  subheadline?: string;
  className?: string;
}

export const SectionHeader = ({
  headline,
  headlineLevel = 2,
  subheadline,
  className = '',
  ...props
}: SectionHeaderProps) => {
  if (!headline && !subheadline) {
    return null;
  }

  const classes = [
    'wl-sec__header',
    className
  ].filter(Boolean).join(' ');

  const headingLevel = Math.min(Math.max(headlineLevel, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <div className={classes} {...props}>
      {headline && (
        <Heading
          level={headingLevel}
          variant="h2"
          className="wl-sec__headline"
        >
          {headline}
        </Heading>
      )}
      {subheadline && (
        <WysiwygContent
          content={subheadline}
          className="wl-sec__subheadline"
        />
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  headline: PropTypes.string, // Plain text field - not from CMS
  headlineLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  subheadline: PropTypes.string, // HTML string from CMS rich text editor
  className: PropTypes.string,
};
