import React, { type HTMLAttributes } from 'react';
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

