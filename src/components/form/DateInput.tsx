import React, { forwardRef } from 'react';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  required?: boolean;
  min?: string;
  max?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  error?: string;
  [key: string]: any;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(({
  label,
  value,
  onChange,
  id,
  className = '',
  required,
  min,
  max,
  disabled,
  icon = <Calendar className="w-3.5 h-3.5" />,
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
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          {...rest}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue pl-9 ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-slate-200'
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

DateInput.displayName = 'DateInput';

export default DateInput;

