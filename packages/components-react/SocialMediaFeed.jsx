import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SocialMediaFeed.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';

const ExternalLinkDialog = ({ isOpen, image, imageAlt, onStay, onLeave }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onStay();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
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

ExternalLinkDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  onStay: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

const SocialIcon = ({ name, href, icon, ...props }) => {
  if (href) {
    return (
      <a
        href={href}
        className={`social-media-feed__social-link social-media-feed__social-link--${name}`}
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
    <div className={`social-media-feed__social-link social-media-feed__social-link--${name}`} {...props}>
      {icon}
    </div>
  );
};

SocialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  icon: PropTypes.node.isRequired,
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
}) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    image: null,
    imageAlt: '',
    targetUrl: null,
  });

  const handleImageClick = (e, item) => {
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
            align="center"
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
                        {item.platformIcon && (
                          <div className={`social-media-feed__platform social-media-feed__platform--${item.platform || 'default'}`}>
                            {item.platformIcon}
                          </div>
                        )}
                      </div>
                    </a>
                  ) : (
                    <div className="social-media-feed__image-wrapper">
                      <img
                        src={item.image}
                        alt={item.alt || ''}
                        className="social-media-feed__image"
                      />
                      {item.platformIcon && (
                        <div className={`social-media-feed__platform social-media-feed__platform--${item.platform || 'default'}`}>
                          {item.platformIcon}
                        </div>
                      )}
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

SocialMediaFeed.propTypes = {
  headline: PropTypes.string, // Plain text field - not from CMS
  headlineLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  subheadline: PropTypes.string, // HTML string from CMS rich text editor
  followText: PropTypes.string, // Plain text field
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
      url: PropTypes.string,
      platform: PropTypes.string, // 'instagram', 'facebook', 'pinterest', etc.
      platformIcon: PropTypes.node, // Icon component or image for platform badge
    })
  ).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.node.isRequired,
    })
  ),
  confirmExternalLinks: PropTypes.bool,
  className: PropTypes.string,
};

