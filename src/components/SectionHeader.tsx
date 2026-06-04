import React from 'react';

interface SectionHeaderProps {
  tagline: string;
  taglineColorClass: string;
  title: string;
  titleColorClass?: string;
  description: string;
  descriptionColorClass?: string;
  badgeIcon?: React.ReactNode;
  badgeText?: string;
  badgeColorClass?: string;
  id?: string;
}

export default function SectionHeader({
  tagline,
  taglineColorClass,
  title,
  titleColorClass = "text-slate-900",
  description,
  descriptionColorClass = "text-slate-500",
  badgeIcon,
  badgeText,
  badgeColorClass,
  id
}: SectionHeaderProps) {
  return (
    <div id={id} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
      <div>
        <span 
          style={{ fontFamily: 'var(--font-display)' }} 
          className={`${taglineColorClass} text-xs font-bold tracking-widest uppercase block mb-2`}
        >
          {tagline}
        </span>
        <h2 
          style={{ fontFamily: 'var(--font-display)' }} 
          className={`text-3xl md:text-5xl font-extrabold tracking-tight ${titleColorClass}`}
        >
          {title}
        </h2>
        <p className={`${descriptionColorClass} mt-3 text-sm max-w-xl`}>
          {description}
        </p>
      </div>
      
      {badgeIcon && badgeText && (
        <div className={`hidden lg:flex items-center gap-1.5 font-mono text-xs ${badgeColorClass} px-4 py-2 rounded-2xl`}>
          {badgeIcon}
          <span>{badgeText}</span>
        </div>
      )}
    </div>
  );
}
