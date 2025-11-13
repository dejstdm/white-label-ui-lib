import React, { useState, useEffect, type HTMLAttributes, type ReactNode, type MouseEvent } from 'react';
import './SocialMediaFeed.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { FacebookIcon, InstagramIcon, XTwitterIcon } from './icons';

export type SocialMediaFeedItem = {
  image: string;
  alt?: string;
  url?: string;
  platform?: string;
  platformIcon?: ReactNode;
};

export type SocialMediaFeedSocialLink = {
  name?: string;
  href?: string;
  icon?: ReactNode;
};

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

const SOCIAL_ICON_COMPONENTS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  'x-twitter': XTwitterIcon,
};

const resolveIconKey = (value: string | null | undefined): 'facebook' | 'instagram' | 'x-twitter' | null => {
  if (!value || typeof value !== 'string') return null;
  const normalized = value.toLowerCase();

  if (normalized.includes('facebook')) {
    return 'facebook';
  }

  if (normalized.includes('instagram')) {
    return 'instagram';
  }

  if (
    normalized === 'x' ||
    normalized.includes('x-twitter') ||
    normalized.includes('x.com') ||
    normalized.includes('twitter')
  ) {
    return 'x-twitter';
  }

  return null;
};

const createDefaultIcon = (value: string | null | undefined, size: number): ReactNode => {
  const key = resolveIconKey(value);
  if (!key) return null;

  const IconComponent = SOCIAL_ICON_COMPONENTS[key];
  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      aria-hidden="true"
      focusable="false"
      color="currentColor"
    />
  );
};

const renderPlatformBadge = (platformIcon: ReactNode | undefined, platform: string | undefined): ReactNode => {
  const badgeIcon = platformIcon || createDefaultIcon(platform, 30);

  if (!badgeIcon) return null;

  return (
    <div className={`social-media-feed__platform social-media-feed__platform--${platform || 'default'}`}>
      {badgeIcon}
    </div>
  );
};

type SocialIconProps =
  | ({
      name: string;
      href: string;
      icon?: ReactNode;
    } & Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>)
  | ({
      name: string;
      href?: undefined;
      icon?: ReactNode;
    } & HTMLAttributes<HTMLDivElement>);

const SocialIcon = ({ name, href, icon, ...props }: SocialIconProps) => {
  const defaultIcon = createDefaultIcon(name, 40);
  const iconNode = icon ?? defaultIcon;
  const fallbackLetter = name ? name.charAt(0).toUpperCase() : '?';
  const content = iconNode || (
    <span aria-hidden="true">{fallbackLetter}</span>
  );

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
        {content}
      </a>
    );
  }
  const divProps = props as HTMLAttributes<HTMLDivElement>;
  return (
    <div className={`social-media-feed__social-link social-media-feed__social-link--${name}`} {...divProps}>
      {content}
    </div>
  );
};

export interface SocialMediaFeedProps extends HTMLAttributes<HTMLElement> {
  headline?: string;
  subheadline?: string;
  headlineLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  followText?: string;
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
      <Container breakpoint={null} padding>
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

