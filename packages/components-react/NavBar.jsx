import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

const BurgerIcon = ({ isOpen }) => (
  <span className="navbar__burger-icon" aria-hidden="true">
    <span className={`navbar__burger-line ${isOpen ? 'navbar__burger-line--open' : ''}`} />
    <span className={`navbar__burger-line ${isOpen ? 'navbar__burger-line--open' : ''}`} />
    <span className={`navbar__burger-line ${isOpen ? 'navbar__burger-line--open' : ''}`} />
  </span>
);

const DefaultLogo = () => (
  <div className="navbar__logo">
    <svg
      width="187"
      height="54"
      viewBox="0 0 148 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PEPSICO LABS"
    >
      <text
        x="0"
        y="20"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="currentColor"
      >
        PEPSICO
      </text>
      <text
        x="0"
        y="35"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fontWeight="bold"
        fill="currentColor"
      >
        LABS
      </text>
    </svg>
  </div>
);

export const NavBar = ({
  logo,
  items = [],
  sticky = false,
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const classes = [
    'navbar',
    sticky ? 'navbar--sticky' : '',
    isMobileMenuOpen ? 'navbar--menu-open' : '',
    className
  ].filter(Boolean).join(' ');

  const displayLogo = logo || <DefaultLogo />;

  return (
    <>
      <nav className={classes} role="navigation" aria-label="Main navigation" {...props}>
        <div className="navbar__container">
          <div className="navbar__logo-wrapper">
            {typeof displayLogo === 'string' ? (
              <img src={displayLogo} alt="" className="navbar__logo-img" />
            ) : (
              displayLogo
            )}
          </div>

          {/* Desktop navigation links */}
          {items.length > 0 && (
            <div className="navbar__links">
              {items.map((item, index) => {
                const isFirst = index === 0;
                const linkClasses = [
                  'navbar__link',
                  isFirst ? 'navbar__link--first' : '',
                  item.active ? 'navbar__link--active' : ''
                ].filter(Boolean).join(' ');

                if (item.href) {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className={linkClasses}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <span
                    key={index}
                    className={linkClasses}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                );
              })}
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className={`navbar__menu-button ${isMobileMenuOpen ? 'navbar__menu-button--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-mobile-menu"
            type="button"
          >
            <BurgerIcon isOpen={isMobileMenuOpen} />
          </button>

          {/* Desktop spacer */}
          <div className="navbar__spacer" />
        </div>

        {/* Mobile menu - collapsible content */}
        <div 
          id="navbar-mobile-menu"
          className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
        >
          <div className="navbar__mobile-menu-content">
            {items.length > 0 && (
              <nav className="navbar__mobile-links" aria-label="Mobile navigation">
                {items.map((item, index) => {
                  const linkClasses = [
                    'navbar__mobile-link',
                    item.active ? 'navbar__mobile-link--active' : ''
                  ].filter(Boolean).join(' ');

                  if (item.href) {
                    return (
                      <a
                        key={index}
                        href={item.href}
                        className={linkClasses}
                        onClick={handleLinkClick}
                        aria-current={item.active ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    );
                  }
                  return (
                    <span
                      key={index}
                      className={linkClasses}
                      aria-current={item.active ? 'page' : undefined}
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </nav>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

NavBar.propTypes = {
  logo: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
  sticky: PropTypes.bool,
  className: PropTypes.string,
};
