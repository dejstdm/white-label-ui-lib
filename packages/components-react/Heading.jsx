import React from 'react';
import PropTypes from 'prop-types';
import './Heading.css';

export const Heading = ({ 
  level = 1,
  variant = null,
  children,
  className = '',
  ...props 
}) => {
  const Tag = `h${level}`;
  const variantClass = variant || `h${level}`;
  
  const classes = [
    'heading',
    `heading--${variantClass}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  variant: PropTypes.oneOf(['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
