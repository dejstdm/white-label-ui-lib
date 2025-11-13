import React, { type HTMLAttributes } from 'react';
import './TextSection.css';
import './SectionLayout.css';
import { Container, type ContainerBreakpoint } from './Container';
import { SectionHeader } from './SectionHeader';
import { WysiwygContent } from './WysiwygContent';

export interface TextSectionProps extends HTMLAttributes<HTMLElement> {
  headline?: string;
  subheadline?: string;
  headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
  containerBreakpoint?: ContainerBreakpoint;
  className?: string;
}

export const TextSection = ({
  headline,
  subheadline,
  headlineLevel = 2,
  text,
  containerBreakpoint = null,
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

