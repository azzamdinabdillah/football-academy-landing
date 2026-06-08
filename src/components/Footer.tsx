import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-slate-400 py-16 border-t border-neutral-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-900/60 items-start">

          {/* Branding Column */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-3 text-center md:text-left">
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-white text-base font-black tracking-wider uppercase">
              SAN FRANCISCO YOUTH FUTSAL
            </span>
            <p className="max-w-sm text-[12px] text-slate-500 leading-relaxed">
              The benchmark in high performance youth soccer ball-handling and collegiate scouting assessments. San Francisco, California.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-3">
            <span className="text-white text-[10px] font-bold tracking-widest uppercase text-slate-400">Quick Links</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start text-slate-400 text-xs font-semibold">
              <a href="#programs-section" className="hover:text-white transition-colors duration-150">Programs</a>
              <a href="#camps" className="hover:text-white transition-colors duration-150">Camps</a>
              <a href="#trainings" className="hover:text-white transition-colors duration-150">Trainings</a>
              <a href="#testimonials" className="hover:text-white transition-colors duration-150">Testimonials</a>
              <a href="#contact-us" className="hover:text-white transition-colors duration-150">Contact Us</a>
            </div>
          </div>

          {/* Support Column / Academy info */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end space-y-3 text-center md:text-right w-full">
            <span className="text-white text-[10px] font-bold tracking-widest uppercase text-slate-400">Academy Sessions</span>
            <span className="text-slate-500 text-xs font-semibold">U5 - U18 Development</span>
            <span className="text-brand-orange text-xs font-bold">Admissions Open</span>
          </div>

        </div>

        {/* Bottom Copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <p className="font-medium text-center md:text-left">
            © 2026 SFY Futsal. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1.5 justify-center mt-1 md:mt-0 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" />
            <span>for elite soccer families.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
