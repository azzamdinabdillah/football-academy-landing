import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  className?: string;
  required?: boolean;
  options?: SelectOption[];
  children?: React.ReactNode;
  error?: string;
  [key: string]: any;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  value,
  onChange,
  id,
  className = '',
  required,
  options = [],
  children,
  error,
  ...rest
}, ref) => {
  return (
    <div className="w-full">
      <label 
        htmlFor={id} 
        className="block text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          {...rest}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-slate-200'
          } ${className}`}
        >
          {children ? children : options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-[10px] text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

