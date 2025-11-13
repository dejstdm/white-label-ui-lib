import { useMemo, type HTMLAttributes } from 'react';
import './FAQ.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { WysiwygContent } from './WysiwygContent';
import { Accordion, type AccordionItemData } from './Accordion';

export type FAQItem = {
  id?: string | number;
  question: string;
  answer: string;
};

export interface FAQProps extends HTMLAttributes<HTMLElement> {
  headline?: string;
  subheadline?: string;
  headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  items?: FAQItem[];
  collapseMode?: 'single' | 'multiple';
  containerBreakpoint?: import('./Container').ContainerBreakpoint;
  className?: string;
}

export const FAQ = ({
  headline,
  subheadline,
  headlineLevel = 2,
  items = [],
  collapseMode = 'single',
  containerBreakpoint = null,
  className = '',
  ...props
}: FAQProps) => {
  const classes = [
    'faq',
    'wl-sec',
    className
  ].filter(Boolean).join(' ');

  const accordionItems = useMemo(
    () =>
      items.map((item, index): AccordionItemData => ({
        id: item.id ?? index,
        trigger: () => (
          <>
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
          </>
        ),
        content: (
          <WysiwygContent content={item.answer} />
        ),
      })),
    [items],
  );

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

        {accordionItems.length > 0 && (
          <Accordion
            className="faq__accordion"
            itemClassName="faq__item"
            headerClassName="faq__button"
            bodyClassName="faq__collapse"
            bodyInnerClassName="faq__content"
            items={accordionItems}
            allowMultiple={collapseMode === 'multiple'}
            role="region"
            aria-label="Frequently asked questions"
          />
        )}
      </Container>
    </section>
  );
};

