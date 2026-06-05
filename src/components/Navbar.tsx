import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar, Ticket, Phone } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';

interface NavbarProps {
  bookingsCount: number;
  onOpenBookings: () => void;
  onOpenBookingModal: () => void;
}

export default function Navbar({ bookingsCount, onOpenBookings, onOpenBookingModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar near top
      if (currentScrollY <= 80) {
        setVisible(true);
      } else {
        // Hide if scrolling down, show if scrolling up
        if (currentScrollY > lastScrollY.current) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const isNavbarVisible = visible || mobileMenuOpen;

  // Smooth scroll handler helper
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { title: 'About', target: 'about-section' },
    { title: 'Camps', target: 'camps' },
    { title: 'Trainings', target: 'trainings' },
    { title: 'Testimonials', target: 'testimonials' },
    { title: 'Contact Us', target: 'contact-us' },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 transition-transform duration-300 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Crest Logo left side */}
        <a href="#hero-top" onClick={(e) => handleScroll(e, 'hero-top')} className="cursor-pointer">
          <Logo />
        </a>

        {/* Desktop Navigation links center */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={`#${link.target}`}
              onClick={(e) => handleScroll(e, link.target)}
              className="font-medium text-[13px] text-slate-700 hover:text-brand-blue duration-150 transition-colors uppercase tracking-wider relative group"
            >
              {link.title}
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full duration-200 transition-all" />
            </a>
          ))}
        </div>

        {/* Right side CTA / Cart indicator */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Active registrations ticket bag */}
          <Button
            onClick={onOpenBookings}
            variant="ghost"
            size="md"
            className="relative border border-slate-200 hover:border-brand-blue/30 hover:bg-blue-50/40 text-slate-700 font-bold"
            leftIcon={<Ticket className="w-4.5 h-4.5" />}
            title="View My Bookings"
          >
            {bookingsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-[10px] animate-bounce z-10 animate-pulse">
                {bookingsCount}
              </span>
            )}
            My Tickets
          </Button>

          <Button
            onClick={onOpenBookingModal}
            variant="blue"
            size="md"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile controls Hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          {bookingsCount > 0 && (
            <button
              onClick={onOpenBookings}
              className="relative p-2 rounded-xl border border-slate-200 bg-white"
            >
              <Ticket className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-[9px]">
                {bookingsCount}
              </span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={`#${link.target}`}
                onClick={(e) => handleScroll(e, link.target)}
                className="font-bold text-sm text-slate-700 hover:text-brand-blue uppercase tracking-wider block py-1"
              >
                {link.title}
              </a>
            ))}
          </div>
          
          <div className="border-t border-slate-100 pt-5 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookings();
              }}
              className="w-full py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 text-xs font-bold uppercase tracking-wider"
            >
              <Ticket className="w-4 h-4" />
              <span>My Registrations ({bookingsCount})</span>
            </button>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              variant="blue"
              size="md"
              fullWidth
            >
              Book Academy Spot Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
