import React from 'react';
import { motion } from 'motion/react';
import { Check, Users, Award, Star } from 'lucide-react';
import Button from '../Button';
import type { TrainingProgramCardProps } from '../../types';


export default function TrainingProgramCard({
  title,
  description,
  image,
  badge,
  stat1,
  stat2,
  index = 0,
  onOpenBooking,
}: TrainingProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group select-none relative rounded-[24px] bg-white border border-slate-100 p-2 pb-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Top Image Part with Inner Radius spacing matching card padding */}
      <div className="relative rounded-[16px] overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-slate-50">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          referrerPolicy="no-referrer"
        />

        {/* Frosted/Glassmorphism badge */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-950/40 backdrop-blur-md text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-sm">
          <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
          <span>{badge}</span>
        </div>
      </div>

      {/* Content text and CTAs */}
      <div className="pt-4.5 px-4.5 space-y-4 text-left flex-1 flex flex-col justify-between">
        <div>
          {/* Title with verified check pill */}
          <h3
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              {title}
              <div className="w-4 h-4 rounded-full bg-[#e8fbf1] border border-[#a3f3cc] flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-[#10b981] stroke-[3.5]" />
              </div>
            </span>
          </h3>

          {/* Description text */}
          <p className="text-slate-500 text-xs font-semibold leading-relaxed mt-2.5">
            {description}
          </p>
        </div>

        {/* Bottom stats and CTA */}
        <div className="pt-3.5 flex items-center justify-between border-t border-slate-50">
          <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 leading-none">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{stat1}</span>
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <Award className="w-4 h-4 text-slate-400" />
              <span>{stat2}</span>
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
  );
}
