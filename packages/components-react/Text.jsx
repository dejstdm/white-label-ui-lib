import React from 'react';
import PropTypes from 'prop-types';
import './Text.css';

export const Text = ({ 
  size = 'large',
  muted = false,
  as = 'p',
  children,
  className = '',
  ...props 
}) => {
  const Tag = as;
  
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
