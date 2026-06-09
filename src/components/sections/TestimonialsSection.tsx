import React from 'react';
import Button from '../Button';
import TestimonialCard from '../cards/TestimonialCard';
import { TESTIMONIALS_DATA } from '../../data';

export default function TestimonialsSection() {
  // Split centralized data into two columns for the marquee layout
  const column1Items = TESTIMONIALS_DATA.slice(0, 4);
  const column2Items = TESTIMONIALS_DATA.slice(4);

  // Double lists to make infinite scrolling completely seamless
  const scrollColumn1 = [...column1Items, ...column1Items];
  const scrollColumn2 = [...column2Items, ...column2Items];

  const handleContactScroll = () => {
    const el = document.getElementById('contact-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="bg-[#f8fafc] relative overflow-hidden border-b border-slate-100 py-0">
      {/* Visual Ambient Rings */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Localized CSS Keyframe Animations for Smooth High-performance Infinite Scroll both Vertical and Horizontal */}
      <style>{`
        @keyframes marquee-v-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-v-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marquee-h-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-h-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-vertical-up {
          animation: marquee-v-up 32s linear infinite;
        }
        .animate-vertical-down {
          animation: marquee-v-down 32s linear infinite;
        }
        .animate-horizontal-left {
          animation: marquee-h-left 28s linear infinite;
        }
        .animate-horizontal-right {
          animation: marquee-h-right 28s linear infinite;
        }
        .animate-vertical-up:hover, .animate-vertical-down:hover, .animate-horizontal-left:hover, .animate-horizontal-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-0 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-0">
          
          {/* LEFT PART: Styling matching section titles */}
          <div className="lg:col-span-5 space-y-8 px-4 md:px-8 lg:px-0 pt-16 pb-6 md:pt-24 md:pb-8 lg:py-32 flex flex-col justify-center">
            <div className="space-y-3">
              <span style={{ fontFamily: 'var(--font-display)' }} className="text-brand-blue text-xs font-bold tracking-widest uppercase block">
                ATHLETE & PARENT TESTIMONIALS
              </span>

              {/* Display Header */}
              <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
                Trusted by elite soccer families
              </h2>

              {/* Description Paragraph */}
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-sm font-medium">
                Our young athletes' stories highlight the deep tactical growth, explosive footwork speed, and ultimate ball confidence built across San Francisco.
              </p>
            </div>

            {/* Glossy Bold Action Button */}
            <div>
              <Button
                onClick={handleContactScroll}
                variant="dark"
                size="lg"
              >
                Contact Recruiter
              </Button>
            </div>

            {/* Featured organizations footer info */}
            <div className="space-y-3 pt-6 border-t border-slate-200/60">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
                AFFILIATED LEAGUE PATHWAYS:
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 opacity-65 text-[11px] font-black tracking-wider text-slate-500 uppercase">
                <span>★ US YOUTH SOCCER</span>
                <span>★ NORCAL PREMIER</span>
                <span>★ FUTSAL CUP</span>
                <span>★ CALNORTH AGENTS</span>
              </div>
            </div>
          </div>

          {/* RIGHT PART: Marquees that are horizontal on mobile/tablet (full bleed), vertical on desktop (full height) */}
          <div className="lg:col-span-12 xl:col-span-7 lg:col-start-6 relative overflow-hidden bg-slate-100/30 lg:border-l border-slate-200/50 w-full flex flex-col justify-center min-h-[280px] lg:min-h-[750px] lg:h-full">
            
            {/* Elegant Vignette Gradient Masks */}
            {/* Horizontal masks for mobile */}
            <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-linear-to-r from-[#f8fafc] to-transparent z-20 pointer-events-none lg:hidden" />
            <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-linear-to-l from-[#f8fafc] to-transparent z-20 pointer-events-none lg:hidden" />
            
            {/* Vertical masks for desktop */}
            <div className="absolute top-0 left-0 right-0 h-16 lg:h-24 bg-linear-to-b from-[#f8fafc] to-transparent z-20 pointer-events-none hidden lg:block" />
            <div className="absolute bottom-0 left-0 right-0 h-16 lg:h-24 bg-linear-to-t from-[#f8fafc] to-transparent z-20 pointer-events-none hidden lg:block" />

            {/* 1. MOBILE/TABLET HORIZONTAL MARQUEES (Full viewport edge-to-edge, horizontal sliding in opposite directions) */}
            <div className="lg:hidden w-full space-y-3 pt-0 pb-10">
              
              {/* Row 1: Scrolling Left-to-Right */}
              <div className="w-full overflow-hidden">
                <div className="flex gap-3 animate-horizontal-left w-max py-1 px-4">
                  {scrollColumn1.map((item, idx) => (
                    <TestimonialCard
                      key={`mob-col1-${item.id}-${idx}`}
                      item={item}
                      variant="mobile"
                    />
                  ))}
                </div>
              </div>

              {/* Row 2: Scrolling Right-to-Left (Opposite direction) */}
              <div className="w-full overflow-hidden">
                <div className="flex gap-3 animate-horizontal-right w-max py-1 px-4">
                  {scrollColumn2.map((item, idx) => (
                    <TestimonialCard
                      key={`mob-col2-${item.id}-${idx}`}
                      item={item}
                      variant="mobile"
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* 2. DESKTOP VERTICAL MARQUEES (Spans complete vertical height from top-to-bottom edge) */}
            <div className="hidden lg:grid grid-cols-2 gap-4 h-full p-6 max-h-[750px]">
              
              {/* Column 1: Vertical scrolling UP */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-4 animate-vertical-up py-4">
                  {scrollColumn1.map((item, idx) => (
                    <TestimonialCard
                      key={`dt-col1-${item.id}-${idx}`}
                      item={item}
                      variant="desktop"
                    />
                  ))}
                </div>
              </div>

              {/* Column 2: Vertical scrolling DOWN */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-4 animate-vertical-down py-4">
                  {scrollColumn2.map((item, idx) => (
                    <TestimonialCard
                      key={`dt-col2-${item.id}-${idx}`}
                      item={item}
                      variant="desktop"
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
