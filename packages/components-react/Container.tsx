import { useEffect, useState, type HTMLAttributes, type ReactNode } from 'react';
import './Container.css';
import type { ContainerBreakpoint } from './types';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
  padding?: boolean;
  children?: ReactNode;
}

export const Container = ({ 
  fluid = false,
  padding = true,
  children,
  className = '',
  ...props 
}: ContainerProps) => {
  const [breakpoint, setBreakpoint] = useState<ContainerBreakpoint>(null);

  // Read CSS variable for container breakpoint (global setting)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue('--container-breakpoint').trim();
    
    // Handle CSS variable value: can be "null", "lg", "sm", etc. or empty
    if (!value || value === 'null' || value === '') {
      setBreakpoint(null);
    } else {
      const validBreakpoints: ContainerBreakpoint[] = ['sm', 'md', 'lg', 'xl', 'xxl'];
      if (validBreakpoints.includes(value as ContainerBreakpoint)) {
        setBreakpoint(value as ContainerBreakpoint);
      } else {
        setBreakpoint(null);
      }
    }
  }, []);

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
