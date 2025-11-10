import pepsicoLogoWhite from './pepsicolabs_logo-white.png';
import pepsicoLogoColor from './pepsicolabs_logo.png';
import laysLogo from './lays-logo.png';
import logo7up from './logo-7up.png';

const defaultLogos = {
  default: {
    src: pepsicoLogoColor,
    alt: 'PepsiCo Labs logo',
    variants: {
      color: pepsicoLogoColor,
      inverse: pepsicoLogoWhite,
    },
  },
  '7up': {
    src: logo7up,
    alt: '7UP logo',
  },
  lays: {
    src: laysLogo,
    alt: "Lay's brand logo",
  },
};

export const resolveDefaultLogo = (brand) => {
  const key = (brand || 'default').toLowerCase();
  return defaultLogos[key] || defaultLogos.default;
};

