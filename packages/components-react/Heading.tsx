import type { HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Heading.css';

export type HeadingVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: HeadingVariant | null;
  children: ReactNode;
}

export const Heading = ({ 
  level = 1,
  variant = null,
  children,
  className = '',
  ...props 
}: HeadingProps) => {
  const variantClass = variant || `h${level}`;
  
  const classes = [
    'heading',
    `heading--${variantClass}`,
    className
  ].filter(Boolean).join(' ');

  // Type-safe heading element mapping
  const headingElements = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  } as const;

  const Tag = headingElements[level as keyof typeof headingElements];
  
  const headingProps: HTMLAttributes<HTMLHeadingElement> = {
    ...props,
    className: classes,
  };

  switch (Tag) {
    case 'h1':
      return <h1 {...headingProps}>{children}</h1>;
    case 'h2':
      return <h2 {...headingProps}>{children}</h2>;
    case 'h3':
      return <h3 {...headingProps}>{children}</h3>;
    case 'h4':
      return <h4 {...headingProps}>{children}</h4>;
    case 'h5':
      return <h5 {...headingProps}>{children}</h5>;
    case 'h6':
      return <h6 {...headingProps}>{children}</h6>;
    default:
      return <h1 {...headingProps}>{children}</h1>;
  }
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  // Note: PropTypes doesn't support null directly, but TypeScript allows variant?: HeadingVariant | null
  // This matches the TypeScript type where variant can be null
  variant: PropTypes.oneOf(['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', null]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
