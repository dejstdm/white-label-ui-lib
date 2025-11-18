import React, { type HTMLAttributes } from 'react';
import './SectionLayout.css';
import './SectionHeader.css';
import { Heading } from './Heading';
import { WysiwygContent } from './WysiwygContent';
import type { PlainText, HtmlString, HeadingLevel } from './types';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
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
