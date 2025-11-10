import defaultLogo from './pepsicolabs_logo_inv.svg';
import laysLogo from './lays-logo.png';

export const brandLogos = {
  default: {
    src: defaultLogo,
    alt: 'WhiteLabel brand logo',
  },
  '7up': {
    src: defaultLogo,
    alt: '7UP brand logo',
  },
  lays: {
    src: laysLogo,
    alt: "Lay's brand logo",
    className: 'brand-logo--lays',
  },
};

export const resolveBrandAsset = (brand, fallback = 'default') => {
  const normalizedBrand = (brand || '').toLowerCase();
  if (brandLogos[normalizedBrand]) {
    return brandLogos[normalizedBrand];
  }

  return brandLogos[fallback] || null;
};

