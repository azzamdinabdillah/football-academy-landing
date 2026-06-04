import React from 'react';

export type ButtonVariant = 
  | 'blue' 
  | 'orange' 
  | 'indigo' 
  | 'dark' 
  | 'outline-blue' 
  | 'outline-orange'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'full-edge';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fontType?: 'display' | 'sans';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
}

export default function Button({
  children,
  variant = 'blue',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  fontType = 'display',
  className = '',
  ...props
}: ButtonProps) {
  // Base classes for consistent aesthetic, active states, and cursor settings
  const baseClasses = 'group inline-flex items-center justify-center transition-all duration-300 ease-out transform active:scale-95 cursor-pointer uppercase select-none font-bold tracking-wider';

  // Variant classes map
  const variantClasses: Record<ButtonVariant, string> = {
    'blue': 'bg-brand-blue text-white shadow-md hover:-translate-y-0.5 hover:bg-brand-blue-hover hover:shadow-lg hover:shadow-brand-blue/25',
    'orange': 'bg-brand-orange text-white shadow-md hover:-translate-y-0.5 hover:bg-brand-orange-hover hover:shadow-lg hover:shadow-brand-orange/25',
    'indigo': 'bg-indigo-600 text-white shadow-md hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/25',
    'dark': 'bg-brand-dark text-white border border-neutral-800 hover:-translate-y-0.5 hover:bg-brand-blue hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/20',
    'outline-blue': 'bg-white border-2 border-brand-blue text-brand-blue shadow-sm hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white hover:shadow-md hover:shadow-brand-blue/15',
    'outline-orange': 'bg-white border-2 border-brand-orange text-brand-orange shadow-sm hover:-translate-y-0.5 hover:bg-brand-orange hover:text-white hover:shadow-md hover:shadow-brand-orange/15',
    'ghost': 'bg-transparent text-slate-700 border border-transparent hover:-translate-y-0.5 hover:bg-slate-100 hover:text-brand-blue'
  };

  // Size classes map
  const sizeClasses: Record<ButtonSize, string> = {
    'sm': 'px-4 py-2 text-[11px] font-black rounded-full shadow-[0_4px_16px_rgba(0,112,192,0.12)] border border-brand-blue/15 hover:border-brand-blue',
    'md': 'px-5 py-2.5 text-[11px] tracking-wide rounded-xl shadow-sm',
    'lg': 'px-8 py-3 text-xs font-black rounded-full shadow-sm',
    'xl': 'px-15 py-4.5 text-sm font-black rounded-2xl md:px-10', // responsive px as in hero section
    'full-edge': 'w-full py-4 text-xs font-extrabold tracking-widest rounded-b-[23px] active:scale-98 shadow-inner'
  };

  // Typography class map
  const fontClasses = fontType === 'display' ? 'font-display' : 'font-sans';

  // Layout classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Combine all tailwind classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fontClasses,
    widthClasses,
    className
  ].filter(Boolean).join(' ');

  // Inline font style fallback just in case the font-display utility class behaves differently on any container
  const style = fontType === 'display' ? { fontFamily: 'var(--font-display)' } : undefined;

  return (
    <button className={combinedClasses} style={style} {...props}>
      {leftIcon && (
        <span className="flex items-center mr-2 transition-transform duration-300 ease-out group-hover:-translate-x-0.5">
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className="flex items-center ml-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
