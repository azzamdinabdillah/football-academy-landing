import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'interactive'>('default');

  // Mouse position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for fluid lag effect
  const springConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor if it's a device with a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Global listener for interactive hover items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if targeting an interactive element
      const isClickable = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isClickable) {
        setIsHovered(true);
        // If it's a big card, we can make it feel extra immersive
        if (target.closest('.group') || target.closest('section')) {
          setCursorType('interactive');
        } else {
          setCursorType('pointer');
        }
      } else {
        setIsHovered(false);
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Core Dot indicator */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-orange rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? (cursorType === 'interactive' ? 3 : 1.8) : 1,
          backgroundColor: isHovered ? 'var(--color-brand-blue)' : 'var(--color-brand-orange)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Outer elegant tracking circle ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neutral-800/25 pointer-events-none z-50"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? (cursorType === 'interactive' ? 1.8 : 1.4) : 1,
          borderColor: isHovered ? 'var(--color-brand-blue)' : 'var(--color-brand-orange)',
          borderWidth: isHovered ? '2px' : '1px',
          backgroundColor: isHovered ? (cursorType === 'interactive' ? 'rgba(0,112,192,0.06)' : 'rgba(0,112,192,0.03)') : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </>
  );
}
