"use client";

import React, { type HTMLAttributes } from 'react';
import './TextSection.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { WysiwygContent } from './WysiwygContent';
import type { PlainText, HtmlString, HeadingLevel } from './types';

export interface TextSectionProps extends HTMLAttributes<HTMLElement> {
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  text?: HtmlString;
  className?: string;
}

export const TextSection = ({
  headline,
  subheadline,
  headlineLevel = 2,
  text,
  className = '',
  ...props
}: TextSectionProps) => {
  const classes = [
    'text-section',
    'wl-sec',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <Container padding>
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

