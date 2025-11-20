import React, { type HTMLAttributes } from 'react';
import './Footer.css';
import { Container } from './Container';
import type { FooterSocialLink, FooterLink } from './types';

type SocialIconProps =
  | ({
      name: string;
      href: string;
      icon: string;
    } & Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>)
  | ({
      name: string;
      href?: undefined;
      icon: string;
    } & HTMLAttributes<HTMLDivElement>);

const SocialIcon = (props: SocialIconProps) => {
  const { name, href, icon, ...restProps } = props;
  
  // Icon is required
  if (!icon) return null;
  
  if (href != null) {
    const anchorProps = restProps as Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;
    return (
      <a
        href={href}
        className={`footer__social-link footer__social-link--${name}`}
        aria-label={`Follow us on ${name}`}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      >
        <i className={icon} aria-hidden="true"></i>
      </a>
    );
  }
  const divProps = restProps as HTMLAttributes<HTMLDivElement>;
  return (
    <div className={`footer__social-link footer__social-link--${name}`} {...divProps}>
      <i className={icon} aria-hidden="true"></i>
    </div>
  );
};

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logoSrc?: string;
  logoAlt?: string;
  socialLinks?: FooterSocialLink[];
  links?: FooterLink[];
  copyright?: string;
  copyrightYear?: string;
  className?: string;
}

export const Footer = ({
  logoSrc,
  logoAlt = '',
  socialLinks = [],
  links = [],
  copyright = '2022 PEPSICO',
  copyrightYear = '2022',
  className = '',
  ...props
}: FooterProps) => {
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
      <Container className="footer__inner" padding>
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

