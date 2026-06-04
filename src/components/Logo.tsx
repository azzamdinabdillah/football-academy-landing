import React from 'react';

export default function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Dynamic Futsal Olympic Shield Crest */}
      <svg
        viewBox="0 0 100 100"
        className="w-11 h-11 filter drop-shadow-sm flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crestBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0070c0" />
            <stop offset="100%" stopColor="#0a4b8f" />
          </linearGradient>
          <linearGradient id="crestOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7f11" />
            <stop offset="100%" stopColor="#e34a00" />
          </linearGradient>
        </defs>

        {/* Outer Circular Swoosh Action */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#crestBlue)" strokeWidth="6" />
        <path
          d="M 50,4 A 46,46 0 0,1 96,50 A 46,46 0 0,1 50,96"
          fill="none"
          stroke="url(#crestOrange)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* The Futsal Ball in central Action */}
        <circle cx="50" cy="50" r="28" fill="#f8fafc" stroke="#1e293b" strokeWidth="2.5" />
        {/* Ball pentagons / designs to look like a futsal ball (futsal ball has low bounce, compact panels) */}
        <circle cx="50" cy="50" r="14" fill="url(#crestOrange)" opacity="0.9" />
        {/* Star-like and pentagon laces */}
        <path d="M 50,22 L 50,36 M 50,64 L 50,78 M 22,50 L 36,50 M 64,50 L 78,50 M 30,30 L 40,40 M 70,70 L 60,60 M 30,70 L 40,60 M 70,30 L 60,40" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        {/* Central star crest detail */}
        <path d="M 50,40 L 53,46 L 60,47 L 55,52 L 57,58 L 50,55 L 43,58 L 45,52 L 40,47 L 47,46 Z" fill="#ffffff" />
      </svg>

      {/* Sporty Brand Typography */}
      <div className="flex flex-col leading-none">
        <span 
          style={{ fontFamily: 'var(--font-display)' }} 
          className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#ff5500] uppercase"
        >
          San Francisco
        </span>
        <span 
          style={{ fontFamily: 'var(--font-display)' }} 
          className="text-lg md:text-xl font-extrabold tracking-tight text-[#0060b0] uppercase flex items-center gap-1"
        >
          Youth <span className="text-[#0050a0]">Futsal</span>
        </span>
      </div>
    </div>
  );
}
