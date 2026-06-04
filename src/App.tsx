/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUp, Milestone, Heart } from 'lucide-react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import CampsSection from './components/CampsSection';
import TrainingsSection from './components/TrainingsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';

import BookingModal from './components/BookingModal';
import MyBookingsDrawer from './components/MyBookingsDrawer';
import CustomCursor from './components/CustomCursor';

import { Booking } from './types';
import { CAMPS_DATA, TRAININGS_DATA, TESTIMONIALS_DATA } from './data';

export default function App() {
  // Booking state from localStorage
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modal controls
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preselectedId, setPreselectedId] = useState<string | undefined>(undefined);

  // Load Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Dynamic scroll setup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Load bookings on mount
  useEffect(() => {
    const raw = localStorage.getItem('sfyf_bookings');
    if (raw) {
      try {
        setBookings(JSON.parse(raw));
      } catch (err) {
        console.error("Failed to parse bookings from localStorage:", err);
      }
    }
  }, []);

  const handleBookingSuccess = () => {
    // Reload bookings list
    const raw = localStorage.getItem('sfyf_bookings');
    if (raw) {
      try {
        setBookings(JSON.parse(raw));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('sfyf_bookings', JSON.stringify(updated));
  };

  const handleOpenBookingWithSelect = (id?: string) => {
    setPreselectedId(id);
    setIsBookingOpen(true);
  };

  // Scroll to top button visibility state
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Image path of generated background (from our image generation step)
  const heroBackgroundPath = "/src/assets/images/futsal_hero_bg_1780383073976.png";

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 antialiased">
      <CustomCursor />
      
      {/* Structural Header Navigation */}
      <Navbar
        bookingsCount={bookings.length}
        onOpenBookings={() => setIsDrawerOpen(true)}
        onOpenBookingModal={() => handleOpenBookingWithSelect(undefined)}
      />

      {/* Primary Layout sections */}
      <main className="flex-1">
        {/* Beautiful high fidelity Hero mirroring user image request exactly */}
        <Hero
          onOpenBookingModal={() => handleOpenBookingWithSelect(undefined)}
          backgroundPath={heroBackgroundPath}
        />

        {/* Value details / About section */}
        <AboutSection onOpenBooking={() => handleOpenBookingWithSelect(undefined)} />

        {/* Futsal Training camps */}
        <CampsSection
          camps={CAMPS_DATA}
          onOpenBooking={handleOpenBookingWithSelect}
        />

        {/* Professional Scouting trainings */}
        <TrainingsSection
          trainings={TRAININGS_DATA}
          onOpenBooking={handleOpenBookingWithSelect}
        />

        {/* Slide reviews / Testimonials */}
        <TestimonialsSection testimonials={TESTIMONIALS_DATA} />

        {/* Contact info & Interactive mock directions locator map */}
        <ContactSection />
      </main>

      {/* Immersive Footer layout */}
      <footer className="bg-neutral-950 text-slate-400 py-16 border-t border-neutral-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-900/60 items-start">
            
            {/* Branding Column */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-3 text-center md:text-left">
              <span style={{ fontFamily: 'var(--font-display)' }} className="text-white text-base font-black tracking-wider uppercase">
                SAN FRANCISCO YOUTH FUTSAL
              </span>
              <p className="max-w-sm text-[12px] text-slate-500 leading-relaxed">
                The benchmark in high performance youth soccer ball-handling and collegiate scouting assessments. San Francisco, California.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-3">
              <span className="text-white text-[10px] font-bold tracking-widest uppercase text-slate-400">Quick Links</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start text-slate-400 text-xs font-semibold">
                <a href="#about-section" className="hover:text-white transition-colors duration-150">About Us</a>
                <a href="#camps" className="hover:text-white transition-colors duration-150">Camps</a>
                <a href="#trainings" className="hover:text-white transition-colors duration-150">Scouting</a>
                <a href="#contact-us" className="hover:text-white transition-colors duration-150">Contact Us</a>
              </div>
            </div>

            {/* Support Column / Academy info */}
            <div className="md:col-span-3 flex flex-col items-center md:items-end space-y-3 text-center md:text-right w-full">
              <span className="text-white text-[10px] font-bold tracking-widest uppercase text-slate-400">Academy Sessions</span>
              <span className="text-slate-500 text-xs font-semibold">U5 - U18 Development</span>
              <span className="text-brand-orange text-xs font-bold">Admissions Open</span>
            </div>

          </div>

          {/* Bottom Copyright bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
            <p className="font-medium text-center md:text-left">
              © 2026 SFY Futsal. All Rights Reserved.
            </p>
            <p className="flex items-center gap-1.5 justify-center mt-1 md:mt-0 font-medium">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" />
              <span>for elite soccer families.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Dynamic Floating Action items */}
      
      {/* Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-full shadow-lg hover:scale-105 active:scale-95 duration-200 z-30 border border-white/10 cursor-pointer"
          title="Scroll back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* MODALS & DRAWERS FOR INTERACTIVE STORYTELLING */}
      
      {/* Booking Form drawer Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedId={preselectedId}
        onBookingSuccess={handleBookingSuccess}
        camps={CAMPS_DATA}
        trainings={TRAININGS_DATA}
      />

      {/* Registered Tickets Drawer */}
      <MyBookingsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

    </div>
  );
}
