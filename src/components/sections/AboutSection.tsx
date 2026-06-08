import React from 'react';
import { Star } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import TrainingProgramCard from '../cards/TrainingProgramCard';
import type { TrainingProgramCardProps } from '../../types';

interface AboutSectionProps {
  onOpenBooking?: () => void;
}

const points: TrainingProgramCardProps[] = [
  {
    title: "Elite Soccer Training",
    description: "Elite soccer training provides top-tier coaching, advanced techniques, & comprehensive drills to player.",
    image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    badge: "TOP CREATOR",
    stat1: "Age 8-18",
    stat2: "Elite Tier",
  },
  {
    title: "Pro Coaching & Mentorship",
    description: "Pro Coaching & Mentorship offers elite guidance, expert training, and personalized support to elevate your performance.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop",
    badge: "TOP COACH",
    stat1: "Pro Mentor",
    stat2: "1x1 Focus",
  },
  {
    title: "Recruit Clarity & Coaching",
    description: "Recruit Clarity & Coaching offers clear guidance, expert training, and personalized support for optimal performance.",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600&auto=format&fit=crop",
    badge: "COLLEGE READY",
    stat1: "Collegiate",
    stat2: "Scouting",
  }
];


export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  return (
    <section id="about-section" className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
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
          {points.map((pt, idx) => (
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

