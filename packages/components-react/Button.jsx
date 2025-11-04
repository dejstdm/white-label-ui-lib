import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const ArrowIcon = ({ size = 16 }) => (
  <svg 
    className="button__icon" 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M14 7L1.74846e-07 7L0 9L14 9L14 7Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8479 7.99998L7 14.4856L7.60894 15L15 7.99998L7.60894 1L7 1.51436L13.8479 7.99998Z" fill="currentColor" stroke="currentColor"/>
  </svg>
);

export const Button = ({ 
  variant = 'solid',
  size = 'medium',
  icon = false,
  disabled = false,
  children,
  className = '',
  ...props 
}) => {
  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    disabled ? 'button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      disabled={disabled}
      {...props}
    >
      <span className="button__label">{children}</span>
      {icon && <ArrowIcon size={size === 'large' ? 20 : 16} />}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['solid', 'outline', 'text']),
  size: PropTypes.oneOf(['medium', 'large']),
  icon: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
