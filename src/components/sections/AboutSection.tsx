import React from 'react';
import { motion } from 'motion/react';
import TrainingProgramCard from '../cards/TrainingProgramCard';
import TrainingProgramCardDesktop from '../cards/TrainingProgramCardDesktop';
import Button from '../Button';

interface AboutSectionProps {
  onOpenBooking?: () => void;
}

const points = [
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
    <section id="about-section" className="py-16 lg:py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 1. DESKTOP LAYOUT (lg:block - exactly identical to original) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-8 items-start">
            
            {/* Leftmost main heading */}
            <div className="lg:col-span-1 pt-1">
              <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-slate-900 tracking-tight leading-none uppercase">
                Training Programs
              </h2>
            </div>

            {/* Three program columns */}
            {points.map((pt, idx) => (
              <TrainingProgramCardDesktop
                key={idx}
                index={idx}
                title={pt.title}
                description={pt.description}
                image={pt.image}
                badge={pt.badge}
                stat1={pt.stat1}
                stat2={pt.stat2}
              />
            ))}
          </div>

          {/* Row 3: Aesthetic Outlined BOOK NOW button left positioned below Column 2's image */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 mt-10">
            <div className="hidden lg:block lg:col-span-1" />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Button
                onClick={onOpenBooking}
                variant="outline-blue"
                size="lg"
                className="w-full lg:w-auto text-center block"
              >
                BOOK NOW
              </Button>
            </motion.div>

            <div className="hidden lg:block lg:col-span-2" />
          </div>
        </div>

        {/* 2. MOBILE / TABLET LAYOUT (lg:hidden - Cards stacked vertically with background images and text overlays) */}
        <div className="block lg:hidden">
          
          {/* Section Header */}
          <div className="mb-10 space-y-2">
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-brand-blue text-xs font-bold tracking-widest uppercase block">
              TRAINING PROGRAMS INDIVIDUALS & TEAMS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              Elite Futsal School
            </h2>
          </div>

          {/* Stacked background action cards */}
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

      </div>
    </section>
  );
}
