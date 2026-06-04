import React from 'react';
import { Award } from 'lucide-react';
import { TrainingPackage } from '../../types';
import PricingCard from '../PricingCard';

interface TrainingsSectionProps {
  trainings: TrainingPackage[];
  onOpenBooking: (id: string) => void;
}

export default function TrainingsSection({ trainings, onOpenBooking }: TrainingsSectionProps) {
  return (
    <section id="trainings" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-slate-100" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-2">
              INDIVIDUAL & TEAM ASSESSMENTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Professional Scouting & Training
            </h2>
            <p className="text-slate-500 mt-3 text-sm max-w-xl">
              Customized training programs tailored for highly competitive club players seeking elite physical conditioning, fast tactical decisions, and collegiate recruiting readiness.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs text-brand-blue border border-brand-blue/30 bg-brand-blue/5 px-4 py-2 rounded-2xl">
            <Award className="w-4 h-4 text-brand-blue" />
            <span>Collegiate & Professional Scouting Verified</span>
          </div>
        </div>

        {/* Training Packages Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {trainings.map((pkg, idx) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              idx={idx}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
