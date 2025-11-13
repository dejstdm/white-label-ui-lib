import type { ImgHTMLAttributes } from 'react';
import './Image.css';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}: ImageProps) => {
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;
  const style = aspectRatio ? { aspectRatio } : undefined;

  const classes = [
    'image',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="image__img"
        {...props}
      />
    </div>
  );
};

