import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Accordion.css';

const TRANSITION_DURATION_MS = 300;

const AccordionItem = ({
  index,
  item,
  isOpen,
  allowMultiple,
  onToggle,
  onAnimationStart,
  onAnimationEnd,
  itemClassName,
  headerClassName,
  bodyClassName,
  bodyInnerClassName,
}) => {
  const bodyRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const baseId = useId();
  const headerId = `${baseId}-header`;
  const panelId = `${baseId}-panel`;
  const firstRenderRef = useRef(true);

  const itemClasses = useMemo(
    () =>
      ['accordion__item', itemClassName].filter(Boolean).join(' '),
    [itemClassName],
  );

  const headerClasses = useMemo(
    () =>
      [
        'accordion__header',
        headerClassName,
        isOpen ? 'accordion__header--open' : '',
        isTransitioning ? 'accordion__header--transitioning' : '',
      ]
        .filter(Boolean)
        .join(' '),
    [headerClassName, isOpen, isTransitioning],
  );

  const bodyClasses = useMemo(
    () =>
      [
        'accordion__body',
        bodyClassName,
        isOpen ? 'accordion__body--open' : '',
        isTransitioning ? 'accordion__body--collapsing' : '',
      ]
        .filter(Boolean)
        .join(' '),
    [bodyClassName, isOpen, isTransitioning],
  );

  const bodyInnerClasses = useMemo(
    () =>
      ['accordion__body-inner', bodyInnerClassName]
        .filter(Boolean)
        .join(' '),
    [bodyInnerClassName],
  );

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) {
      return;
    }

    const content = body.firstElementChild;
    if (!content) {
      return;
    }

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      if (isOpen) {
        body.classList.add('accordion__body--open');
        body.style.height = '';
      } else {
        body.style.height = '0px';
      }
      return;
    }

    setIsTransitioning(true);
    if (typeof onAnimationStart === 'function') {
      onAnimationStart(index);
    }

    const runAnimationFrame = (callback) => {
      if (typeof window === 'undefined') return;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(callback);
      });
    };

    if (isOpen) {
      const targetHeight = content.offsetHeight;
      body.classList.add('accordion__body--open');
      body.style.height = '0px';
      body.offsetHeight; // force reflow
      runAnimationFrame(() => {
        body.style.height = `${targetHeight}px`;
      });
    } else {
      const currentHeight = body.scrollHeight;
      body.style.height = `${currentHeight}px`;
      body.offsetHeight; // force reflow
      runAnimationFrame(() => {
        body.style.height = '0px';
      });
    }

    const handleTransitionEnd = (event) => {
      if (event.target !== body || event.propertyName !== 'height') {
        return;
      }

      body.style.height = isOpen ? '' : '0px';
      if (!isOpen) {
        body.classList.remove('accordion__body--open');
      }

      setIsTransitioning(false);
      body.removeEventListener('transitionend', handleTransitionEnd);

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(index);
      }
    };

    body.addEventListener('transitionend', handleTransitionEnd);

    const timeoutId =
      typeof window !== 'undefined'
        ? window.setTimeout(() => {
            handleTransitionEnd({
              target: body,
              propertyName: 'height',
            });
          }, TRANSITION_DURATION_MS + 100)
        : null;

    return () => {
      if (typeof window !== 'undefined' && timeoutId) {
        window.clearTimeout(timeoutId);
      }
      body.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [index, isOpen, onAnimationEnd, onAnimationStart]);

  const triggerContent =
    typeof item.trigger === 'function'
      ? item.trigger({ isOpen, allowMultiple })
      : item.trigger;

  return (
    <div className={itemClasses} data-accordion-item>
      <button
        type="button"
        className={headerClasses}
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={headerId}
      >
        {triggerContent}
      </button>
      <div
        ref={bodyRef}
        className={bodyClasses}
        role="region"
        id={panelId}
        aria-labelledby={headerId}
        aria-hidden={!isOpen && !isTransitioning}
        hidden={!isOpen && !isTransitioning}
      >
        <div className={bodyInnerClasses}>{item.content}</div>
      </div>
      <div className="accordion__divider"></div>
    </div>
  );
};

AccordionItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    content: PropTypes.node.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  allowMultiple: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onAnimationStart: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  itemClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  bodyInnerClassName: PropTypes.string,
};

export const Accordion = ({
  items = [],
  allowMultiple = false,
  className = '',
  itemClassName = '',
  headerClassName = '',
  bodyClassName = '',
  bodyInnerClassName = '',
  ...rest
}) => {
  const [openItems, setOpenItems] = useState([]);
  const animationCountRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!allowMultiple) {
      setOpenItems((prev) => {
        if (prev.length <= 1) {
          return prev;
        }

        return [prev[prev.length - 1]];
      });
    }
  }, [allowMultiple]);

  useEffect(() => {
    setOpenItems((prev) => prev.filter((index) => index < items.length));
  }, [items.length]);

  const wrapperClassName = useMemo(
    () =>
      ['accordion', className].filter(Boolean).join(' '),
    [className],
  );

  const handleToggle = useCallback(
    (index) => {
      if (isAnimatingRef.current) {
        return;
      }

      setOpenItems((prev) => {
        const isOpen = prev.includes(index);

        if (allowMultiple) {
          if (isOpen) {
            return prev.filter((itemIndex) => itemIndex !== index);
          }

          return [...prev, index];
        }

        return isOpen ? [] : [index];
      });
    },
    [allowMultiple],
  );

  const handleAnimationStart = useCallback(() => {
    animationCountRef.current += 1;
    isAnimatingRef.current = true;
  }, []);

  const handleAnimationEnd = useCallback(() => {
    animationCountRef.current = Math.max(animationCountRef.current - 1, 0);
    if (animationCountRef.current === 0) {
      isAnimatingRef.current = false;
    }
  }, []);

  return (
    <div className={wrapperClassName} data-accordion {...rest}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        return (
          <AccordionItem
            key={item.id ?? index}
            index={index}
            item={item}
            isOpen={isOpen}
            allowMultiple={allowMultiple}
            onToggle={handleToggle}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            itemClassName={itemClassName}
            headerClassName={headerClassName}
            bodyClassName={bodyClassName}
            bodyInnerClassName={bodyInnerClassName}
          />
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
      content: PropTypes.node.isRequired,
    }),
  ),
  allowMultiple: PropTypes.bool,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  bodyInnerClassName: PropTypes.string,
};

