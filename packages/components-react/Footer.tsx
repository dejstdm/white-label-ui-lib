"use client";

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
            <i className="fa-regular fa-copyright footer__copyright-icon" aria-hidden="true" />
            <span className="footer__copyright-text">{displayCopyright}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

