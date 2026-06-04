import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Comprehensive high-integrity set of 8 testimonials to provide rich scrolling content
  const column1Items = [
    {
      id: 't-1',
      name: 'Marcus Henderson',
      role: 'Parent of U13 Competitive Club Player',
      text: 'My son has played club soccer for 4 years, but joining SF Youth Futsal program transformed his speed of thought and confidence on the ball. The ball mastery taught here is unmatched!',
      rating: '5.0',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-2',
      name: 'Elena Rostova',
      role: 'Elite Girl Player, College Recruit 2025',
      text: 'The recruiting showcase and tactical video reviews gave me the leverage to stand out to college scouts. If you want to play at the next level, train here.',
      rating: '4.9',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-3',
      name: 'Sofia Thorne',
      role: 'Parent of U9 Elite Prep Twins',
      text: 'Finding high-quality futsal coaching in San Francisco was tough till we found this program. Our kids wait for Mondays and Wednesdays all week long!',
      rating: '5.0',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-4',
      name: 'Sarah Jenkins',
      role: 'Parent of U15 Winger',
      text: 'The attention to detailed positioning and rapid transition play helped my daughter excel in her high school varsity matches. High-intensity and super organized!',
      rating: '4.9',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const column2Items = [
    {
      id: 't-5',
      name: 'Coach Robert Vance',
      role: 'Regional Youth Scout & Analyst',
      text: 'Unbelievable curriculum. The focus on micro-touches and explosive agility on court translates beautifully to the grass field. Highest recommendations!',
      rating: '5.0',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-6',
      name: 'Thomas Alvarez',
      role: 'Parent of U11 Midfielder',
      text: 'More touches, fast decisions, and high repetition. SF Youth Futsal trains athletes to think two steps ahead. A must for any competitive youth soccer player.',
      rating: '4.9',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-7',
      name: 'Lucas Miller',
      role: 'U16 Academy Striker',
      text: 'As an outdoor club striker, my close-quarters finishing improved drastically after one summer camp here. The coaches are phenomenal mentors!',
      rating: '5.0',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-8',
      name: 'Amara Diallo',
      role: 'Parent of U12 Goalkeeper',
      text: 'The booking is seamless, and the scouting assessment gave us clear, data-driven targets to improve. Highly professional soccer school!',
      rating: '4.9',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    }
  ];

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
              <button
                onClick={handleContactScroll}
                className="px-8 py-3.5 bg-brand-dark hover:bg-neutral-800 text-white font-black text-xs tracking-wider rounded-full transition-all duration-200 active:scale-95 cursor-pointer uppercase shadow-lg shadow-black/10"
              >
                Contact Recruiter
              </button>
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
            <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#f8fafc] to-transparent z-20 pointer-events-none lg:hidden" />
            <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#f8fafc] to-transparent z-20 pointer-events-none lg:hidden" />
            
            {/* Vertical masks for desktop */}
            <div className="absolute top-0 left-0 right-0 h-16 lg:h-24 bg-gradient-to-b from-[#f8fafc] to-transparent z-20 pointer-events-none hidden lg:block" />
            <div className="absolute bottom-0 left-0 right-0 h-16 lg:h-24 bg-gradient-to-t from-[#f8fafc] to-transparent z-20 pointer-events-none hidden lg:block" />

            {/* 1. MOBILE/TABLET HORIZONTAL MARQUEES (Full viewport edge-to-edge, horizontal sliding in opposite directions) */}
            <div className="lg:hidden w-full space-y-3 pt-0 pb-10">
              
              {/* Row 1: Scrolling Left-to-Right */}
              <div className="w-full overflow-hidden">
                <div className="flex gap-3 animate-horizontal-left w-max py-1 px-4">
                  {scrollColumn1.map((item, idx) => (
                    <div
                      key={`mob-col1-${item.id}-${idx}`}
                      className="w-[220px] sm:w-[260px] bg-white rounded-xl shadow-sm border border-slate-200/30 p-4 flex flex-col justify-between flex-shrink-0 hover:shadow-md hover:border-slate-300/50 transition-all duration-200"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-slate-500 font-mono">{item.rating}</span>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[9px] text-slate-400 font-mono">Rating</span>
                        </div>
                        <p className="text-slate-800 text-[11px] sm:text-xs leading-relaxed font-semibold italic line-clamp-4">
                          "{item.text}"
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                        <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-display font-extrabold text-brand-dark text-[10px] leading-tight">{item.name}</h4>
                          <span className="text-[8px] text-slate-400 font-medium block">{item.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Scrolling Right-to-Left (Opposite direction) */}
              <div className="w-full overflow-hidden">
                <div className="flex gap-3 animate-horizontal-right w-max py-1 px-4">
                  {scrollColumn2.map((item, idx) => (
                    <div
                      key={`mob-col2-${item.id}-${idx}`}
                      className="w-[220px] sm:w-[260px] bg-white rounded-xl shadow-sm border border-slate-200/30 p-4 flex flex-col justify-between flex-shrink-0 hover:shadow-md hover:border-slate-300/50 transition-all duration-200"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-slate-500 font-mono">{item.rating}</span>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[9px] text-slate-400 font-mono">Rating</span>
                        </div>
                        <p className="text-slate-800 text-[11px] sm:text-xs leading-relaxed font-semibold italic line-clamp-4">
                          "{item.text}"
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                        <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-display font-extrabold text-brand-dark text-[10px] leading-tight">{item.name}</h4>
                          <span className="text-[8px] text-slate-400 font-medium block">{item.role}</span>
                        </div>
                      </div>
                    </div>
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
                    <div
                      key={`dt-col1-${item.id}-${idx}`}
                      className="bg-white rounded-3xl shadow-sm border border-slate-200/40 overflow-hidden flex flex-col justify-between group transition-all duration-200 hover:shadow-md hover:border-slate-300/60"
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-bold text-slate-500 font-mono">{item.rating}</span>
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] text-slate-400 font-mono">Rating</span>
                        </div>
                        <p className="text-slate-800 text-xs md:text-[13px] leading-relaxed font-semibold italic">
                          "{item.text}"
                        </p>
                      </div>
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-display font-extrabold text-brand-dark text-[12px] leading-tight">{item.name}</h4>
                          <span className="text-[10px] text-slate-400 font-medium block">{item.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Vertical scrolling DOWN */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-4 animate-vertical-down py-4">
                  {scrollColumn2.map((item, idx) => (
                    <div
                      key={`dt-col2-${item.id}-${idx}`}
                      className="bg-white rounded-3xl shadow-sm border border-slate-200/40 overflow-hidden flex flex-col justify-between group transition-all duration-200 hover:shadow-md hover:border-slate-300/60"
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-bold text-slate-500 font-mono">{item.rating}</span>
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] text-slate-400 font-mono">Rating</span>
                        </div>
                        <p className="text-slate-800 text-xs md:text-[13px] leading-relaxed font-semibold italic">
                          "{item.text}"
                        </p>
                      </div>
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-display font-extrabold text-brand-dark text-[12px] leading-tight">{item.name}</h4>
                          <span className="text-[10px] text-slate-400 font-medium block">{item.role}</span>
                        </div>
                      </div>
                    </div>
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
