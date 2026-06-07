import React, { forwardRef } from 'react';

interface TextareaProps {
  label: string;
  id?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  disabled?: boolean;
  error?: string;
  [key: string]: any;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  id,
  className = '',
  required,
  placeholder,
  value,
  onChange,
  rows = 3,
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
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        required={required}
        {...rest}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
          error ? 'border-red-400 focus:ring-red-200' : 'border-slate-200'
        } ${className}`}
      />
      {error && (
        <p className="mt-1 text-[10px] text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;

