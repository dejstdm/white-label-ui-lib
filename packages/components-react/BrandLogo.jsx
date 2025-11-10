import React from 'react';
import PropTypes from 'prop-types';

import { resolveBrandAsset } from './assets/brandLogos';

export const BrandLogo = ({
  brand = 'default',
  alt,
  className = '',
  fallback = 'default',
  ...imgProps
}) => {
  const asset = resolveBrandAsset(brand, fallback);

  if (!asset) {
    return null;
  }

  const combinedClassName = ['brand-logo', asset.className, className]
    .filter(Boolean)
    .join(' ');

  if (asset.component) {
    const Component = asset.component;
    return <Component className={combinedClassName} alt={alt ?? asset.alt} {...imgProps} />;
  }

  return (
    <img
      src={asset.src}
      alt={alt ?? asset.alt ?? ''}
      className={combinedClassName}
      loading="lazy"
      {...imgProps}
    />
  );
};

BrandLogo.propTypes = {
  brand: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};

