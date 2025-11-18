import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode
} from 'react';
import './Button.css';
import type { ButtonVariant, ButtonSize } from './types';

type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
type NativeButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type CommonButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

// Discriminated union: button variant when href is undefined, anchor variant when href is provided
export type ButtonProps =
  | ({ href: string } & CommonButtonProps & Omit<AnchorProps, 'href' | 'children'>)
  | ({ href?: undefined } & CommonButtonProps & Omit<NativeButtonProps, 'type' | 'children'> & { type?: 'button' | 'submit' | 'reset' });

type ArrowIconProps = {
  size?: number;
};

const ArrowIcon = ({ size = 16 }: ArrowIconProps) => (
  <svg 
    className="button__icon" 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M14 7L1.74846e-07 7L0 9L14 9L14 7Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8479 7.99998L7 14.4856L7.60894 15L15 7.99998L7.60894 1L7 1.51436L13.8479 7.99998Z" fill="currentColor" stroke="currentColor"/>
  </svg>
);

export const Button = (props: ButtonProps) => {
  const {
    variant = 'solid',
    size = 'medium',
    icon = false,
    disabled = false,
    href,
    children,
    className = '',
  } = props;
  
  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    disabled ? 'button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Handle props based on element type
  if ('href' in props && props.href != null) {
    // Anchor variant
    const { type: _, ...anchorProps } = props as { href: string } & CommonButtonProps & Omit<AnchorProps, 'href' | 'children'>;
    const componentProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      ...anchorProps,
      className: classes,
      href: disabled ? undefined : href,
      'aria-disabled': disabled ? 'true' : undefined,
      tabIndex: disabled ? -1 : undefined,
    };

    return (
      <a {...componentProps}>
        <span className="button__label">{children}</span>
        {icon && <ArrowIcon size={size === 'large' ? 20 : 16} />}
      </a>
    );
  } else {
    // Button variant
    const { type: buttonType, ...buttonProps } = props as { href?: undefined } & CommonButtonProps & Omit<NativeButtonProps, 'type' | 'children'> & { type?: 'button' | 'submit' | 'reset' };
    const componentProps: ButtonHTMLAttributes<HTMLButtonElement> = {
      ...buttonProps,
      className: classes,
      type: (buttonType ?? 'button') as 'button' | 'submit' | 'reset', // Default to 'button' to prevent form submission
      disabled,
    };

    return (
      <button {...componentProps}>
        <span className="button__label">{children}</span>
        {icon && <ArrowIcon size={size === 'large' ? 20 : 16} />}
      </button>
    );
  }
};
