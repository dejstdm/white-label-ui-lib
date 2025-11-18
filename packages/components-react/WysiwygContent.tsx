import React, { type HTMLAttributes } from 'react';
import './wysiwyg-content.css';
import type { HtmlString } from './types';

export interface WysiwygContentProps extends HTMLAttributes<HTMLDivElement> {
  /** HTML string from CMS rich text editor - MUST use this component to render safely */
  content?: HtmlString | string;
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

