import React from 'react';
import { motion } from 'motion/react';
import { Check, Users, Award, Star } from 'lucide-react';
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
          {/* Row 1: Titles and descriptions */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-8 items-start">
            
            {/* Leftmost main heading */}
            <div className="lg:col-span-1 pt-1">
              <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-slate-900 tracking-tight leading-none uppercase">
                Training Programs
              </h2>
            </div>

            {/* Three strength / capability descriptions */}
            {points.map((pt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="lg:col-span-1 space-y-3"
              >
                <h3 className="font-display font-black text-slate-800 text-base lg:text-lg tracking-tight">
                  {pt.title}
                </h3>
                <p className="text-slate-500 text-xs lg:text-sm leading-relaxed font-medium">
                  {pt.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Row 2: Vertical high fidelity action images to copy screenshot structure */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-8 mt-10">
            {/* Label vertical spacing marker */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Three corresponding action images representing youth futsal training */}
            {points.map((pt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="lg:col-span-1"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 bg-slate-50">
                  <img
                    src={pt.image}
                    alt={pt.title}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
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
          <div className="flex flex-col gap-6">
            {points.map((pt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group select-none relative rounded-[24px] bg-white border border-slate-100 p-2 pb-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Top Image Part with Inner Radius spacing matching card padding */}
                <div className="relative rounded-[16px] overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-slate-50">
                  <img
                    src={pt.image}
                    alt={pt.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Frosted/Glassmorphism badge exactly like Emma Carter card layout */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-950/40 backdrop-blur-md text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-sm">
                    <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>{pt.badge}</span>
                  </div>
                </div>

                {/* Overlaid content text and CTAs */}
                <div className="pt-4.5 px-4.5 space-y-4 text-left flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Name with Solid verified check pill */}
                    <h3 
                      style={{ fontFamily: 'var(--font-display)' }} 
                      className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        {pt.title}
                        <div className="w-4 h-4 rounded-full bg-[#e8fbf1] border border-[#a3f3cc] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#10b981] stroke-[3.5]" />
                        </div>
                      </span>
                    </h3>

                    {/* Description text */}
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed mt-2.5">
                      {pt.description}
                    </p>
                  </div>

                  {/* Bottom details mimicking user count indicators */}
                  <div className="pt-3.5 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px] sm:text-xs">
                      <div className="flex items-center gap-1.5 leading-none">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>{pt.stat1}</span>
                      </div>
                      <div className="flex items-center gap-1.5 leading-none">
                        <Award className="w-4 h-4 text-slate-400" />
                        <span>{pt.stat2}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={onOpenBooking}
                      variant="outline-blue"
                      size="sm"
                      rightIcon={<span className="font-extrabold text-brand-blue opacity-80">+</span>}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
