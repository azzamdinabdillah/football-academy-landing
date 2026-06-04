import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { FutsalCamp } from '../../types';
import CampCard from '../CampCard';

interface CampsSectionProps {
  camps: FutsalCamp[];
  onOpenBooking: (id: string) => void;
}

export default function CampsSection({ camps, onOpenBooking }: CampsSectionProps) {
  return (
    <section id="camps" className="py-24 bg-[#0a0f18] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,112,192,0.12)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-brand-orange text-xs font-bold tracking-widest uppercase block mb-2">
              HIGH-PERFORMANCE ELITE TRAINING
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Elite Futsal Camps 2026
            </h2>
            <p className="text-slate-400 mt-3 text-sm max-w-xl">
              Certified futsal camps designed to build electric foot speed, sharp tactical intelligence, and stellar physical conditioning.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs text-sky-400 border border-sky-500/30 bg-sky-500/10 px-4 py-2 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>SF Youth Futsal Official Sanctioned Program</span>
          </div>
        </div>

        {/* Camps Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {camps.map((camp, idx) => (
            <CampCard
              key={camp.id}
              camp={camp}
              idx={idx}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
