import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  item: Testimonial;
  variant?: 'mobile' | 'desktop';
  key?: React.Key;
}

export default function TestimonialCard({ item, variant = 'desktop' }: TestimonialCardProps) {
  if (variant === 'mobile') {
    return (
      <div className="w-[220px] sm:w-[260px] bg-white rounded-xl shadow-sm border border-slate-200/30 p-4 flex flex-col justify-between shrink-0 hover:shadow-md hover:border-slate-300/50 transition-all duration-200">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 font-mono">{item.rating}</span>
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[9px] text-slate-400 font-mono">Rating</span>
          </div>
          <p className="text-slate-800 text-[11px] sm:text-xs leading-relaxed font-semibold italic line-clamp-4">
            "{item.text}"
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
          <img 
            src={item.avatar} 
            alt={item.name} 
            className="w-8 h-8 rounded-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <div>
            <h4 className="font-display font-extrabold text-brand-dark text-[10px] leading-tight">{item.name}</h4>
            <span className="text-[8px] text-slate-400 font-medium block">{item.role}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/40 overflow-hidden flex flex-col justify-between group transition-all duration-200 hover:shadow-md hover:border-slate-300/60">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-slate-500 font-mono">{item.rating}</span>
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-[10px] text-slate-400 font-mono">Rating</span>
        </div>
        <p className="text-slate-800 text-xs md:text-[13px] leading-relaxed font-semibold italic">
          "{item.text}"
        </p>
      </div>
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
        <img 
          src={item.avatar} 
          alt={item.name} 
          className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm" 
          referrerPolicy="no-referrer" 
        />
        <div>
          <h4 className="font-display font-extrabold text-brand-dark text-[12px] leading-tight">{item.name}</h4>
          <span className="text-[10px] text-slate-400 font-medium block">{item.role}</span>
        </div>
      </div>
    </div>
  );
}
