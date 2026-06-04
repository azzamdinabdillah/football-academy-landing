import React from 'react';
import { Award } from 'lucide-react';
import { TrainingPackage } from '../../types';
import PricingCard from '../PricingCard';
import SectionHeader from '../SectionHeader';

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
        <SectionHeader
          tagline="INDIVIDUAL & TEAM ASSESSMENTS"
          taglineColorClass="text-brand-blue"
          title="Professional Scouting & Training"
          titleColorClass="text-slate-900"
          description="Customized training programs tailored for highly competitive club players seeking elite physical conditioning, fast tactical decisions, and collegiate recruiting readiness."
          descriptionColorClass="text-slate-500"
          badgeIcon={<Award className="w-4 h-4 text-brand-blue" />}
          badgeText="Collegiate & Professional Scouting Verified"
          badgeColorClass="border border-brand-blue/30 bg-brand-blue/5 text-brand-blue"
        />

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
