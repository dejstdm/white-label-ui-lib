import type { HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Container.css';

export type ContainerBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | null;

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
  breakpoint?: ContainerBreakpoint;
  padding?: boolean;
  children?: ReactNode;
}

export const Container = ({ 
  fluid = false,
  breakpoint = null,
  padding = true,
  children,
  className = '',
  ...props 
}: ContainerProps) => {
  const classes = [
    'container',
    fluid ? 'container-fluid' : '',
    breakpoint ? `container-${breakpoint}` : '',
    padding ? 'container--padded' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  fluid: PropTypes.bool,
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', null]),
  padding: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
