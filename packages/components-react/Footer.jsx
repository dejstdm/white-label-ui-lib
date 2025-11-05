import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const DefaultLogo = () => (
  <div className="footer__logo">
    <svg
      width="222"
      height="80"
      viewBox="0 0 222 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PEPSICO LABS"
    >
      <text
        x="0"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fontWeight="bold"
        fill="currentColor"
      >
        PEPSICO
      </text>
      <text
        x="0"
        y="55"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="currentColor"
      >
        LABS
      </text>
    </svg>
  </div>
);

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
  logo,
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

  const displayLogo = logo || <DefaultLogo />;

  const displayCopyright = copyright || `${copyrightYear} PEPSICO`;

  return (
    <footer className={classes} role="contentinfo" {...props}>
      <div className="footer__container">
        {/* Logo */}
        <div className="footer__logo-wrapper">
          {typeof displayLogo === 'string' ? (
            <img src={displayLogo} alt="" className="footer__logo-img" />
          ) : (
            displayLogo
          )}
        </div>

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
      </div>
    </footer>
  );
};

Footer.propTypes = {
  logo: PropTypes.node,
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

