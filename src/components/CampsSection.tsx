import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { FutsalCamp } from '../types';

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
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-neutral-900/60 rounded-3xl overflow-hidden border border-neutral-800 flex flex-col justify-between group hover:border-brand-blue/50 transition-all shadow-lg hover:shadow-brand-blue/5"
            >
              {/* Image banner */}
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img
                  src={camp.image}
                  alt={camp.title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Spot Left indicator badge */}
                <div className="absolute top-4 left-4 z-20 bg-emerald-500 font-bold text-[9px] text-white px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {camp.spotsLeft} spots left
                </div>

                {/* Price tag */}
                <div className="absolute bottom-4 right-4 z-20 text-white font-display font-extrabold text-xl">
                  ${camp.price} <span className="text-[10px] font-normal text-slate-300">/tuition</span>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold text-white group-hover:text-blue-400 duration-200">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3">
                    {camp.description}
                  </p>
                </div>

                {/* Logistics breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    <span>{camp.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-blue" />
                    <span><strong>Category:</strong> {camp.ageGroup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span className="truncate">{camp.location}</span>
                  </div>
                </div>

                {/* Call-to-action */}
                <button
                  onClick={() => onOpenBooking(camp.id)}
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-brand-blue hover:bg-brand-blue-hover group-hover:bg-brand-blue duration-200 text-white rounded-xl text-xs font-bold uppercase tracking-wider active:scale-98 cursor-pointer"
                >
                  <span>Book Your Spot Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-200" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
