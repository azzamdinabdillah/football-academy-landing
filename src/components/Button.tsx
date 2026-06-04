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
  const baseClasses = 'inline-flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer uppercase select-none font-bold tracking-wider';

  // Variant classes map
  const variantClasses: Record<ButtonVariant, string> = {
    'blue': 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-md hover:shadow-lg hover:shadow-brand-blue/15',
    'orange': 'bg-brand-orange hover:bg-brand-orange-hover text-white shadow-md hover:shadow-lg hover:shadow-brand-orange/15',
    'indigo': 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg hover:shadow-indigo-600/15',
    'dark': 'bg-brand-dark hover:bg-neutral-800 text-white shadow-md hover:shadow-lg hover:shadow-black/10',
    'outline-blue': 'bg-white border-2 border-brand-blue hover:bg-brand-blue/5 text-brand-blue shadow-sm hover:shadow',
    'outline-orange': 'bg-white border-2 border-brand-orange hover:bg-brand-orange/5 text-brand-orange shadow-sm hover:shadow',
    'ghost': 'bg-transparent hover:bg-slate-50 text-slate-700 hover:text-brand-blue border border-transparent'
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
      {leftIcon && <span className="flex items-center mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex items-center ml-2">{rightIcon}</span>}
    </button>
  );
}
