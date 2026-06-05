import React from 'react';

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
}

export default function Textarea({
  label,
  id,
  className = '',
  required,
  placeholder,
  value,
  onChange,
  rows = 3,
  disabled
}: TextareaProps) {
  return (
    <div className="w-full">
      <label 
        htmlFor={id} 
        className="block text-[10px] font-semibold text-slate-500 uppercase mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${className}`}
      />
    </div>
  );
}
