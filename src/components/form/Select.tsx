import React from 'react';

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
}

export default function Select({
  label,
  value,
  onChange,
  id,
  className = '',
  required,
  options = [],
  children
}: SelectProps) {
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
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${className}`}
        >
          {children ? children : options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
