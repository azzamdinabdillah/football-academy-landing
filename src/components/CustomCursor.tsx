import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for beautiful pointer tracking
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const clickable = target.closest('button, a, [role="button"], .cursor-pointer') || 
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovered(!!clickable);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer elegant tracking circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-orange/30 pointer-events-none z-50"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'var(--color-brand-blue)' : 'rgba(251, 146, 60, 0.4)',
          backgroundColor: isHovered ? 'rgba(0,112,192,0.08)' : 'rgba(0,0,0,0)'
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      />
      {/* Center core dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-orange rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      />
    </>
  );
}
