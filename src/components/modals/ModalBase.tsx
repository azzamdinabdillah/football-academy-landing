import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  tagline?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: string; // e.g. "max-w-md", "max-w-2xl"
  closeButtonId?: string;
}

export default function ModalBase({
  isOpen,
  onClose,
  tagline,
  title,
  description,
  children,
  maxWidth = 'max-w-md',
  closeButtonId
}: ModalBaseProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with elegant blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`bg-white rounded-3xl p-6 md:p-8 w-full ${maxWidth} border border-slate-100 shadow-2xl relative z-10 max-h-[94vh] flex flex-col`}
            data-lenis-prevent="true"
          >
            {/* Close Button */}
            <button
              id={closeButtonId}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100/80 rounded-full transition-colors cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header (styled exactly like Contact Section modal) */}
            {title && tagline && (
              <div className="mb-6 flex-shrink-0 pr-8">
                <span className="text-[10px] text-brand-blue font-black tracking-widest uppercase block mb-1">
                  {tagline}
                </span>
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-xl md:text-2xl font-black text-slate-900 tracking-tight"
                >
                  {title}
                </h3>
                {description && (
                  <p className="text-slate-500 text-xs mt-1">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Scrollable Children Container */}
            <div className="overflow-y-auto flex-1 overscroll-contain pr-1 -mr-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
