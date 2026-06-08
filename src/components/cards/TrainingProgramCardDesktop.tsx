import React from 'react';
import { motion } from 'motion/react';
import type { TrainingProgramCardProps } from '../../types';

export default function TrainingProgramCardDesktop({
  title,
  description,
  image,
  index = 0,
}: TrainingProgramCardProps) {
  return (
    <div className="flex flex-col h-full justify-between">
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="space-y-3"
      >
        <h3 className="font-display font-black text-slate-800 text-base lg:text-lg tracking-tight">
          {title}
        </h3>
        <p className="text-slate-500 text-xs lg:text-sm leading-relaxed font-medium">
          {description}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="mt-10"
      >
        <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 bg-slate-50">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </div>
  );
}

