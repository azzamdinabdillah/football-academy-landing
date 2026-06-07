import React, { forwardRef } from 'react';

interface InputProps {
  label: string;
  icon?: React.ReactNode;
  id?: string;
  className?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  error?: string;
  [key: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  icon,
  id,
  className = '',
  required,
  type = 'text',
  placeholder,
  value,
  onChange,
  min,
  max,
  disabled,
  error,
  ...rest
}, ref) => {
  return (
    <div className="w-full">
      <label 
        htmlFor={id} 
        className="block text-[10px] font-semibold text-slate-500 uppercase mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          {...rest}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-slate-200'
          } ${
            icon ? 'pl-9' : ''
          } ${className}`}
        />
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[10px] text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

