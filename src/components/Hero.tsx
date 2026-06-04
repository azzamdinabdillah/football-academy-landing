import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Star } from 'lucide-react';
import Button from './Button';

interface HeroProps {
  onOpenBookingModal: () => void;
  backgroundPath: string;
}

export default function Hero({ onOpenBookingModal, backgroundPath }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force play in case the autoplay attribute is restricted by background sandbox policies
      const playVideo = () => {
        videoRef.current?.play().catch((err) => {
          console.warn("Video autoplay was prevented, waiting for interaction:", err);
        });
      };
      
      playVideo();
      // Handle potential suspension when tab is unfocused
      document.addEventListener('visibilitychange', playVideo);
      return () => {
        document.removeEventListener('visibilitychange', playVideo);
      };
    }
  }, []);

  return (
    <header id="hero-top" className="relative h-screen min-h-[660px] md:min-h-[750px] w-full bg-brand-dark overflow-hidden">
      
      {/* Dynamic Ambient Background Video with smooth zoom-in entrance keyframe */}
      <div className="absolute inset-0 select-none overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundPath}
            className="w-full h-full object-cover object-center z-0"
          >
            {/* Extremely reliable Vimeo direct MP4 soccer video CDN URL */}
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054273b1e22784e1b023e3b3a6e3c1d&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-boys-playing-soccer-at-the-stadium-34407-large.mp4" type="video/mp4" />
          </video>
          {/* Subtle vignette/shading wash - darker wash to make white display typography highly readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-black/50 to-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a0f18] to-transparent" />
        </motion.div>
      </div>

      {/* Hero content wrapping relative grids */}
      <div className="absolute inset-0 flex flex-col justify-between max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-32 z-10">
        
        {/* TOP ACCENTS: Live Badge Notification */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="self-start mt-4"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white/95 text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Academy Admissions Open for Autumn 2026</span>
          </div>
        </motion.div>

        {/* BOTTOM SECTION: Left display text, Right BOOK NOW CTA */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mt-auto">
          
          {/* Bottom-Left: ELITE SOCCER TRAINING & RECRUITING */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl"
          >
            <h1 
              style={{ fontFamily: 'var(--font-display)' }} 
              className="font-black text-white text-5xl md:text-6.5xl lg:text-7.5xl xl:text-8xl leading-[1.02] tracking-tight text-shadow"
            >
              ELITE SOCCER <br />
              <span className="text-white">TRAINING & RECRUITING</span>
            </h1>
            <p className="text-slate-200 mt-4 text-xs md:text-sm font-medium tracking-wide max-w-lg opacity-90 drop-shadow">
              San Francisco's premier futsal academy pairing world-class technical footwork with competitive recruitment programs for dedicated youth athletes.
            </p>
          </motion.div>

          {/* Bottom-Right: BOOK NOW Button - Exactly styled like the original picture */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <Button
              onClick={onOpenBookingModal}
              variant="blue"
              size="xl"
              rightIcon={<Award className="w-5 h-5 text-amber-300" />}
              className="w-full sm:w-auto hover:shadow-lg hover:shadow-brand-blue/20"
            >
              BOOK NOW
            </Button>
          </motion.div>

        </div>

      </div>

      {/* Absolute Sports Aesthetic lower divider grid line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-orange to-emerald-500 opacity-90" />
    </header>
  );
}
