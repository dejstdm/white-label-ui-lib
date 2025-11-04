import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

export const Container = ({ 
  maxWidth = 'xl',
  padding = true,
  children,
  className = '',
  ...props 
}) => {
  const classes = [
    'container',
    `container--${maxWidth}`,
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
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  padding: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
