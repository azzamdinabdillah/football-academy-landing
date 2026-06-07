/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowUp, Milestone } from 'lucide-react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import CampsSection from './components/sections/CampsSection';
import TrainingsSection from './components/sections/TrainingsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ContactSection from './components/sections/ContactSection';

import BookingModal from './components/modals/BookingModal';
import MyBookingsDrawer from './components/modals/MyBookingsDrawer';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

import { Booking } from './types';
import { CAMPS_DATA, TRAININGS_DATA, TESTIMONIALS_DATA } from './data';

export default function App() {
  // Booking state from localStorage
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modal controls
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preselectedId, setPreselectedId] = useState<string | undefined>(undefined);

  const lenisRef = useRef<Lenis | null>(null);

  // Load Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  // Control scrolling when modal or drawer is open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (isBookingOpen || isDrawerOpen) {
      if (lenis) {
        lenis.stop();
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('lenis-stopped');
      document.documentElement.classList.add('lenis-stopped');
    } else {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('lenis-stopped');
      document.documentElement.classList.remove('lenis-stopped');
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('lenis-stopped');
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [isBookingOpen, isDrawerOpen]);

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
      <Footer />

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
