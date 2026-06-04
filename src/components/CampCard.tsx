import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { FutsalCamp } from '../types';
import Button from './Button';

interface CampCardProps {
  camp: FutsalCamp;
  idx: number;
  onOpenBooking: (id: string) => void;
  key?: React.Key;
}

export default function CampCard({ camp, idx, onOpenBooking }: CampCardProps) {
  // Use styling that exactly mirrors the previous camps cards
  return (
    <motion.div
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
        <Button
          onClick={() => onOpenBooking(camp.id)}
          variant="blue"
          size="md"
          fullWidth
          rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-200" />}
          className="mt-4 group-hover:bg-brand-blue"
        >
          Book Your Spot Now
        </Button>
      </div>
    </motion.div>
  );
}
