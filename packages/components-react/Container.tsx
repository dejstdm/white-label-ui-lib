import { type HTMLAttributes, type ReactNode } from 'react';
import './Container.css';

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
  const classes = [
    fluid ? 'container-fluid' : 'container',
    padding ? 'container--padded' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
