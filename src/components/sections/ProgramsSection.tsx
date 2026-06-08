import React from 'react';
import { Star } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import TrainingProgramCard from '../cards/TrainingProgramCard';
import { PROGRAMS_DATA } from '../../data';

interface ProgramsSectionProps {
  onOpenBooking?: () => void;
}

export default function ProgramsSection({ onOpenBooking }: ProgramsSectionProps) {
  return (
    <section id="programs-section" className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="absolute top-0 inset-x-0 h-px bg-slate-100" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeader
          tagline="TRAINING PROGRAMS INDIVIDUALS & TEAMS"
          taglineColorClass="text-brand-blue"
          title="Elite Futsal School"
          titleColorClass="text-slate-900"
          description="High-performance development pathways designed to build technical dominance, physical superiority, and tactical intelligence under expert guidance."
          descriptionColorClass="text-slate-500"
          badgeIcon={<Star className="w-4 h-4 text-brand-orange fill-brand-orange" />}
          badgeText="Official Youth Futsal Academy"
          badgeColorClass="border border-brand-orange/30 bg-brand-orange/5 text-brand-orange"
        />

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS_DATA.map((pt, idx) => (
            <TrainingProgramCard
              key={idx}
              index={idx}
              title={pt.title}
              description={pt.description}
              image={pt.image}
              badge={pt.badge}
              stat1={pt.stat1}
              stat2={pt.stat2}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
