import React, { type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import './wysiwyg-content.css';

export interface WysiwygContentProps extends HTMLAttributes<HTMLDivElement> {
  content?: string;
  className?: string;
}

export const WysiwygContent = ({
  content,
  className = '',
  ...props
}: WysiwygContentProps) => {
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

