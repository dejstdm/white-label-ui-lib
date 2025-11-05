import React from 'react';
import PropTypes from 'prop-types';
import './wysiwyg-content.css';

export const WysiwygContent = ({
  content,
  className = '',
  ...props
}) => {
  if (!content) {
    return null;
  }

  const classes = [
    'wysiwyg-content',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  );
};

WysiwygContent.propTypes = {
  content: PropTypes.string, // HTML string from CMS rich text editor
  className: PropTypes.string,
};

