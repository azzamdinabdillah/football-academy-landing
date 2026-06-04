import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { FutsalCamp } from '../../types';
import CampCard from '../CampCard';
import SectionHeader from '../SectionHeader';

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
        <SectionHeader
          tagline="HIGH-PERFORMANCE ELITE TRAINING"
          taglineColorClass="text-brand-orange"
          title="Elite Futsal Camps 2026"
          titleColorClass="text-white"
          description="Certified futsal camps designed to build electric foot speed, sharp tactical intelligence, and stellar physical conditioning."
          descriptionColorClass="text-slate-400"
          badgeIcon={<ShieldCheck className="w-4 h-4 text-sky-400" />}
          badgeText="SF Youth Futsal Official Sanctioned Program"
          badgeColorClass="border border-sky-500/30 bg-sky-500/10 text-sky-400"
        />

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
