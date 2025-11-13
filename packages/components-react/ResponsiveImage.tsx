import type { ImgHTMLAttributes } from 'react';
import './ResponsiveImage.css';

export interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  mobileSrc?: string;
  desktopSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ResponsiveImage = ({
  mobileSrc,
  desktopSrc,
  alt,
  width,
  height,
  className = '',
  ...props
}: ResponsiveImageProps) => {
  // At least one image is required
  if (!mobileSrc && !desktopSrc) {
    console.warn('ResponsiveImage: At least one image (mobileSrc or desktopSrc) is required');
    return null;
  }

  // If only one image is provided, use it for both mobile and desktop
  const mobileImage = mobileSrc || desktopSrc;
  const desktopImage = desktopSrc || mobileSrc;

  const aspectRatio = width && height ? `${width} / ${height}` : undefined;
  const style = aspectRatio ? { aspectRatio } : undefined;

  const classes = [
    'responsive-image',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <picture className="responsive-image__picture">
        {/* Desktop image source */}
        {desktopImage && desktopImage !== mobileImage && (
          <source
            media="(min-width: 768px)"
            srcSet={desktopImage}
          />
        )}
        {/* Fallback/mobile image - always include width and height */}
        <img
          src={mobileImage}
          alt={alt}
          width={width}
          height={height}
          className="responsive-image__img"
          {...props}
        />
      </picture>
    </div>
  );
};

