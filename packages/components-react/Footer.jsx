import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import { Container } from './Container';

const SocialIcon = ({ name, href, icon, ...props }) => {
  if (href) {
    return (
      <a
        href={href}
        className={`footer__social-link footer__social-link--${name}`}
        aria-label={`Follow us on ${name}`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {icon}
      </a>
    );
  }
  return (
    <div className={`footer__social-link footer__social-link--${name}`} {...props}>
      {icon}
    </div>
  );
};

SocialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  icon: PropTypes.node.isRequired,
};

export const Footer = ({
  logoSrc,
  logoAlt = '',
  socialLinks = [],
  links = [],
  copyright = '2022 PEPSICO',
  copyrightYear = '2022',
  className = '',
  ...props
}) => {
  const classes = [
    'footer',
    className
  ].filter(Boolean).join(' ');

  const displayLogo = logoSrc ? (
    <div className="footer__logo">
      <img
        src={logoSrc}
        alt={logoAlt}
        className="footer__logo-img"
        loading="lazy"
      />
    </div>
  ) : null;

  const displayCopyright = copyright || `${copyrightYear} PEPSICO`;

  return (
    <footer className={classes} role="contentinfo" {...props}>
      <Container className="footer__inner" breakpoint={null} padding>
        {/* Logo */}
        {displayLogo && <div className="footer__logo-wrapper">{displayLogo}</div>}

        {/* Social Media Icons */}
        {socialLinks.length > 0 && (
          <div className="footer__social">
            {socialLinks.map((social, index) => (
              <SocialIcon
                key={index}
                name={social.name || `social-${index}`}
                href={social.href}
                icon={social.icon}
              />
            ))}
          </div>
        )}

        {/* Content Section */}
        <div className="footer__content">
          {/* Navigation Links */}
          {links.length > 0 && (
            <nav className="footer__links" aria-label="Footer navigation">
              {links.map((link, index) => {
                if (link.href) {
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className="footer__link"
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <span
                    key={index}
                    className="footer__link"
                  >
                    {link.label}
                  </span>
                );
              })}
            </nav>
          )}

          {/* Separator Line */}
          <div className="footer__separator" />

          {/* Copyright */}
          <div className="footer__copyright">
            <svg
              className="footer__copyright-icon"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 0C4.037 0 0 4.037 0 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2S5.031 1.8 9 1.8s7.2 3.231 7.2 7.2-3.231 7.2-7.2 7.2z"
                fill="currentColor"
              />
              <path
                d="M9 4.5c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5S11.485 4.5 9 4.5zm0 7.2c-1.488 0-2.7-1.212-2.7-2.7S7.512 6.3 9 6.3s2.7 1.212 2.7 2.7-1.212 2.7-2.7 2.7z"
                fill="currentColor"
              />
            </svg>
            <span className="footer__copyright-text">{displayCopyright}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.node.isRequired,
    })
  ),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  copyright: PropTypes.string,
  copyrightYear: PropTypes.string,
  className: PropTypes.string,
};

