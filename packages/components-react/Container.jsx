import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

export const Container = ({ 
  fluid = false,
  breakpoint = null,
  padding = true,
  children,
  className = '',
  ...props 
}) => {
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
