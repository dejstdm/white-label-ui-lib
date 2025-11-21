"use client";

import React, { useState, useEffect, type HTMLAttributes, type MouseEvent } from 'react';
import './SocialMediaFeed.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import type { SocialMediaFeedItem, SocialMediaFeedSocialLink, PlainText, HtmlString, HeadingLevel } from './types';

type ExternalLinkDialogProps = {
  isOpen: boolean;
  image?: string | null;
  imageAlt?: string;
  onStay: () => void;
  onLeave: () => void;
};

const ExternalLinkDialog = ({ isOpen, image, imageAlt, onStay, onLeave }: ExternalLinkDialogProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onStay();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape as EventListener);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape as EventListener);
      document.body.style.overflow = '';
    };
  }, [isOpen, onStay]);

  if (!isOpen) return null;

  return (
    <div className="social-media-feed__dialog-overlay" onClick={onStay}>
      <div 
        className="social-media-feed__dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="social-media-feed__dialog-content">
          <div className="social-media-feed__dialog-image">
            {image && (
              <img src={image} alt={imageAlt || ''} />
            )}
          </div>
          <div className="social-media-feed__dialog-text">
            <h3 id="dialog-title" className="social-media-feed__dialog-title">
              You are leaving our site
            </h3>
            <p className="social-media-feed__dialog-message">
              You are about to leave our website and visit an external link. Do you want to continue?
            </p>
            <div className="social-media-feed__dialog-actions">
              <Button
                variant="solid"
                onClick={onStay}
                className="social-media-feed__dialog-button social-media-feed__dialog-button--stay"
              >
                Stay
              </Button>
              <Button
                variant="outline"
                onClick={onLeave}
                className="social-media-feed__dialog-button social-media-feed__dialog-button--leave"
              >
                Leave
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderPlatformBadge = (platformIcon: string | undefined, platform: string | undefined): React.ReactElement | null => {
  // Icon must be explicitly provided - no auto-detection
  if (!platformIcon) return null;

  return (
    <div className={`social-media-feed__platform social-media-feed__platform--${platform || 'default'}`}>
      <i className={platformIcon} aria-hidden="true"></i>
    </div>
  );
};

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

const SocialIcon = ({ name, href, icon, ...props }: SocialIconProps) => {
  // Icon is required - no auto-detection
  if (!icon) return null;

  if (href != null) {
    const anchorProps = props as Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;
    return (
      <a
        href={href}
        className={`social-media-feed__social-link social-media-feed__social-link--${name}`}
        aria-label={`Follow us on ${name}`}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      >
        <i className={icon} aria-hidden="true"></i>
      </a>
    );
  }
  const divProps = props as HTMLAttributes<HTMLDivElement>;
  return (
    <div className={`social-media-feed__social-link social-media-feed__social-link--${name}`} {...divProps}>
      <i className={icon} aria-hidden="true"></i>
    </div>
  );
};

export interface SocialMediaFeedProps extends HTMLAttributes<HTMLElement> {
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  /** Plain text follow button label (not from CMS) */
  followText?: PlainText;
  items?: SocialMediaFeedItem[];
  socialLinks?: SocialMediaFeedSocialLink[];
  confirmExternalLinks?: boolean;
  className?: string;
}

type DialogState = {
  isOpen: boolean;
  image: string | null;
  imageAlt: string;
  targetUrl: string | null;
};

export const SocialMediaFeed = ({
  headline = 'Get Social',
  subheadline,
  headlineLevel = 2,
  followText = 'Follow lorem ipsum',
  items = [],
  socialLinks = [],
  confirmExternalLinks = false,
  className = '',
  ...props
}: SocialMediaFeedProps) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    image: null,
    imageAlt: '',
    targetUrl: null,
  });

  const handleImageClick = (e: MouseEvent<HTMLAnchorElement>, item: SocialMediaFeedItem) => {
    if (!item.url) return;

    const isExternal = item.url && (item.url.startsWith('http://') || item.url.startsWith('https://'));

    if (confirmExternalLinks && isExternal) {
      e.preventDefault();
      setDialogState({
        isOpen: true,
        image: item.image,
        imageAlt: item.alt || '',
        targetUrl: item.url,
      });
    }
  };

  const handleStay = () => {
    setDialogState({
      isOpen: false,
      image: null,
      imageAlt: '',
      targetUrl: null,
    });
  };

  const handleLeave = () => {
    if (dialogState.targetUrl) {
      window.open(dialogState.targetUrl, '_blank', 'noopener,noreferrer');
    }
    handleStay();
  };

  const classes = [
    'social-media-feed',
    'wl-sec',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <Container padding>
        {headline && (
          <SectionHeader
            headline={headline}
            headlineLevel={headlineLevel}
            subheadline={subheadline}
            className="social-media-feed__header"
          />
        )}

        {items.length > 0 && (
          <div className="social-media-feed__gallery">
            {items.map((item, index) => {
              const isExternal = item.url && (item.url.startsWith('http://') || item.url.startsWith('https://'));
              const linkProps = isExternal
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {};

              return (
                <div key={index} className="social-media-feed__item">
                  {item.url ? (
                    <a
                      href={item.url}
                      className="social-media-feed__link"
                      onClick={(e) => handleImageClick(e, item)}
                      {...linkProps}
                    >
                      <div className="social-media-feed__image-wrapper">
                        <img
                          src={item.image}
                          alt={item.alt || ''}
                          className="social-media-feed__image"
                        />
                        {renderPlatformBadge(item.platformIcon, item.platform)}
                      </div>
                    </a>
                  ) : (
                    <div className="social-media-feed__image-wrapper">
                      <img
                        src={item.image}
                        alt={item.alt || ''}
                        className="social-media-feed__image"
                      />
                      {renderPlatformBadge(item.platformIcon, item.platform)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {followText && (
          <p className="social-media-feed__follow-text">
            {followText}
          </p>
        )}

        {socialLinks.length > 0 && (
          <div className="social-media-feed__social">
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

        <ExternalLinkDialog
          isOpen={dialogState.isOpen}
          image={dialogState.image}
          imageAlt={dialogState.imageAlt}
          onStay={handleStay}
          onLeave={handleLeave}
        />
      </Container>
    </section>
  );
};

