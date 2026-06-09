import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { TrainingPackage } from '../../types';
import Button, { ButtonVariant } from '../Button';

interface PricingCardProps {
  pkg: TrainingPackage;
  idx: number;
  onOpenBooking: (id: string) => void;
  key?: React.Key;
}

export default function PricingCard({ pkg, idx, onOpenBooking }: PricingCardProps) {
  // Configured styling based on training packages exactly like original implementation
  let badgeBg = 'bg-blue-50/50 text-brand-blue border-blue-200';
  let pillText = '★ POPULAR';
  let btnVariant: ButtonVariant = 'blue';

  if (pkg.id === 'train-2') {
    badgeBg = 'bg-orange-50/50 text-brand-orange border-orange-200';
    pillText = '★ BEST VALUE';
    btnVariant = 'orange';
  } else if (pkg.id === 'train-3') {
    badgeBg = 'bg-indigo-50/50 text-indigo-600 border-indigo-200';
    pillText = '★ SCOUT HIGHLY RECOMMENDED';
    btnVariant = 'indigo';
  }

  return (
    <motion.div
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
                  <div className="w-5 h-5 rounded-full bg-[#f0fdf4] border border-[#dcfce7] flex items-center justify-center shrink-0 shadow-sm shadow-[#15a34a]/5">
                    <Check className="w-3 h-3 text-[#16a34a] stroke-3" />
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
      <Button
        onClick={() => onOpenBooking(pkg.id)}
        variant={btnVariant}
        size="full-edge"
        rightIcon={<span className="text-sm">→</span>}
      >
        Book Assessment Slot
      </Button>
    </motion.div>
  );
}
