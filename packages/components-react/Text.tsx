import React, { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Text.css';

export type TextSize = 'large' | 'small' | 'label';

export type TextProps<T extends ElementType = 'p'> = {
  size?: TextSize;
  muted?: boolean;
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Text = <T extends ElementType = 'p'>({ 
  size = 'large',
  muted = false,
  as,
  children,
  className = '',
  ...props 
}: TextProps<T>) => {
  const Tag = (as ?? 'p') as ElementType;
  
  const classes = [
    'text',
    `text--${size}`,
    muted ? 'text--muted' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  size: PropTypes.oneOf(['large', 'small', 'label']),
  muted: PropTypes.bool,
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
