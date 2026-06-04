import React from 'react';
import { motion } from 'motion/react';
import { Check, Flame, Clock, Award, AwardIcon } from 'lucide-react';
import { TrainingPackage } from '../types';

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
          {trainings.map((pkg, idx) => {
            const isFeatured = pkg.id === 'train-1'; // Highlight 1-on-1 package
            
            // Reference-inspired colors and tag options
            let badgeBg = 'bg-blue-50/50 text-brand-blue border-blue-200';
            let pillText = '★ POPULAR';
            let btnBg = 'bg-brand-blue hover:bg-brand-blue-hover';
            let checkColor = 'text-emerald-500';
            
            if (pkg.id === 'train-2') {
              badgeBg = 'bg-orange-50/50 text-brand-orange border-orange-200';
              pillText = '★ BEST VALUE';
              btnBg = 'bg-brand-orange hover:bg-brand-orange-hover';
              checkColor = 'text-emerald-500';
            } else if (pkg.id === 'train-3') {
              badgeBg = 'bg-indigo-50/50 text-indigo-600 border-indigo-200';
              pillText = '★ SCOUT HIGHLY RECOMMENDED';
              btnBg = 'bg-indigo-600 hover:bg-indigo-700';
              checkColor = 'text-emerald-500';
            }

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group select-none relative rounded-[24px] bg-white border border-slate-100 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Main Card Body with standard spacing padding */}
                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Badge on top, title fully responsive below */}
                    <div className="mb-3.5">
                      <span className={`inline-block text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-extrabold ${badgeBg} mb-2.5`}>
                        {pillText}
                      </span>
                      <h3 
                        style={{ fontFamily: 'var(--font-display)' }} 
                        className="text-xl font-black text-slate-900 tracking-tight leading-snug"
                      >
                        {pkg.title}
                      </h3>
                    </div>

                    {/* Billed info tagline */}
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      {pkg.duration} • Billed per session
                    </span>

                    {/* Divider Line exactly like reference image */}
                    <div className="border-t border-slate-100 my-4" />

                    {/* Includes Section block */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest block animate-pulse">
                        Includes
                      </p>

                      <ul className="space-y-2.5">
                        {pkg.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-2.5 text-xs text-slate-600 leading-normal">
                            <div className="w-5 h-5 rounded-full bg-[#f0fdf4] border border-[#dcfce7] flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#15a34a]/5">
                              <Check className="w-3 h-3 text-[#16a34a] stroke-[3]" />
                            </div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing metrics shown beautifully on bottom left exactly like reference */}
                  <div className="mt-6 pt-4 border-t border-dashed border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                        ${pkg.pricePerSession}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5 uppercase tracking-wider">
                      per player / training session
                    </span>
                  </div>
                </div>

                {/* Edge-to-Edge full width action button matching reference */}
                <button
                  onClick={() => onOpenBooking(pkg.id)}
                  style={{ fontFamily: 'var(--font-display)' }}
                  className={`w-full py-4 text-white font-extrabold text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-b-[23px] ${btnBg} shadow-inner active:scale-98`}
                >
                  Book Assessment Slot <span className="text-sm">→</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
