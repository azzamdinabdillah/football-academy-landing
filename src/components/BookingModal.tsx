import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Mail, Phone, Flame, Check, HelpCircle, Trophy, Ticket, AlertTriangle } from 'lucide-react';
import { FutsalCamp, TrainingPackage, Booking } from '../types';
import Button from './Button';
import Input from './form/Input';
import Select from './form/Select';
import DateInput from './form/DateInput';
import Textarea from './form/Textarea';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedId?: string;
  onBookingSuccess: () => void;
  camps: FutsalCamp[];
  trainings: TrainingPackage[];
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedId,
  onBookingSuccess,
  camps,
  trainings
}: BookingModalProps) {
  // Booking Form State
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState<number>(10);
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [bookingType, setBookingType] = useState<'Camp' | 'Training'>('Camp');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [notes, setNotes] = useState('');

  // UI Flow State
  const [step, setStep] = useState<1 | 2>(1); // 1: Form, 2: Ticket Ticket SFX
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle preselected package/camp on load or preselectedId change
  useEffect(() => {
    if (preselectedId) {
      const campExists = camps.find(c => c.id === preselectedId);
      if (campExists) {
        setBookingType('Camp');
        setSelectedItemId(campExists.id);
        // Default to first camp date range
        setSelectedDate(campExists.dates.split(' - ')[0] || '2026-06-22');
      } else {
        const trainExists = trainings.find(t => t.id === preselectedId);
        if (trainExists) {
          setBookingType('Training');
          setSelectedItemId(trainExists.id);
          // Default to a realistic weekday
          setSelectedDate('2026-06-24');
        }
      }
    } else {
      // Set default
      if (camps.length > 0) {
        setBookingType('Camp');
        setSelectedItemId(camps[0].id);
        setSelectedDate('2026-06-22');
      }
    }
  }, [preselectedId, isOpen, camps, trainings]);

  // Adjust preselected ID when bookingType changes manually
  const handleTypeChange = (type: 'Camp' | 'Training') => {
    setBookingType(type);
    if (type === 'Camp' && camps.length > 0) {
      setSelectedItemId(camps[0].id);
      setSelectedDate('2026-06-22');
    } else if (type === 'Training' && trainings.length > 0) {
      setSelectedItemId(trainings[0].id);
      setSelectedDate('2026-06-24');
    }
  };

  const currentItemTitle = () => {
    if (bookingType === 'Camp') {
      return camps.find(c => c.id === selectedItemId)?.title || '';
    }
    return trainings.find(t => t.id === selectedItemId)?.title || '';
  };

  const currentItemPrice = () => {
    if (bookingType === 'Camp') {
      return camps.find(c => c.id === selectedItemId)?.price || 0;
    }
    const training = trainings.find(t => t.id === selectedItemId);
    return training ? training.pricePerSession : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!playerName.trim() || !parentName.trim() || !parentEmail.trim() || !parentPhone.trim() || !selectedDate) {
      setFormError('Sila isi semua ruangan yang wajib diisi. (Please fill in all required fields.)');
      return;
    }

    if (playerAge < 5 || playerAge > 20) {
      setFormError('Umur pemain mestilah antara 5 sehingga 20 tahun. (Player age must be 5-20 years.)');
      return;
    }

    const itemTitle = currentItemTitle();
    const ticketCode = `SFYF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      playerName,
      playerAge,
      parentName,
      parentEmail,
      parentPhone,
      selectedPackageId: selectedItemId,
      selectedPackageTitle: itemTitle,
      bookingType,
      selectedDate,
      notes,
      createdAt: new Date().toISOString(),
      ticketCode
    };

    // Save to local storage
    const existingBookingsRaw = localStorage.getItem('sfyf_bookings');
    const existingBookings: Booking[] = existingBookingsRaw ? JSON.parse(existingBookingsRaw) : [];
    existingBookings.push(newBooking);
    localStorage.setItem('sfyf_bookings', JSON.stringify(existingBookings));

    setCreatedBooking(newBooking);
    setStep(2);
    onBookingSuccess();
  };

  const handleResetClose = () => {
    // Reset Form
    setPlayerName('');
    setParentName('');
    setParentEmail('');
    setParentPhone('');
    setNotes('');
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetClose}
          className="fixed inset-0 bg-neutral-900/80 backdrop-blur-md"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-neutral-100 max-h-[94vh] flex flex-col"
          data-lenis-prevent="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-brand-blue text-white">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 flex-shrink-0 animate-bounce" />
              <div>
                <h3 className="font-display font-bold text-sm sm:text-lg tracking-tight leading-tight">Futsal Academy Booking System</h3>
                <p className="text-[10px] sm:text-xs text-blue-100">Daftar Slot Latihan & Camp SF Youth Futsal</p>
              </div>
            </div>
            <button
              id="close-booking-modal"
              onClick={handleResetClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/15 transition-colors cursor-pointer flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-4 sm:p-6 overscroll-contain" data-lenis-prevent="true">
            {step === 1 ? (
              // STEP 1: FORM FILLING
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {formError && (
                  <div className="flex items-start gap-2 p-3.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Booking Category Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('Camp')}
                    className={`p-3 rounded-2xl border text-center font-bold text-[11px] sm:text-xs tracking-wide transition-all flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-2.5 sm:gap-1.5 cursor-pointer ${
                      bookingType === 'Camp'
                        ? 'bg-blue-50 border-brand-blue text-brand-blue ring-1 ring-brand-blue'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${bookingType === 'Camp' ? 'text-brand-blue' : 'text-slate-400'}`} />
                    <span>TRAINING CAMPS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('Training')}
                    className={`p-3 rounded-2xl border text-center font-bold text-[11px] sm:text-xs tracking-wide transition-all flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-2.5 sm:gap-1.5 cursor-pointer ${
                      bookingType === 'Training'
                        ? 'bg-blue-50 border-brand-blue text-brand-blue ring-1 ring-brand-blue'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Flame className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${bookingType === 'Training' ? 'text-orange-500' : 'text-slate-400'}`} />
                    <span>INDIVIDUAL & GROUP TRAINING</span>
                  </button>
                </div>

                {/* Service Dropdown & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <Select
                    label="Selected Program"
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    required
                  >
                    {bookingType === 'Camp'
                      ? camps.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.title} (${c.price})
                          </option>
                        ))
                      : trainings.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.title} (${t.pricePerSession}/session)
                          </option>
                        ))}
                  </Select>

                  <DateInput
                    label="Session / Start Date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min="2026-06-02"
                    required
                  />
                </div>

                <div className="border-t border-slate-100 my-1.5" />

                {/* Player Information */}
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-brand-blue uppercase tracking-wider mb-2.5">Player Registration Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <Input
                        label="Player Full Name"
                        type="text"
                        placeholder="e.g. Dani Abdillah"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        required
                        icon={<User className="w-3.5 h-3.5" />}
                      />
                    </div>

                    <div>
                      <Input
                        label="Player Age"
                        type="number"
                        min="5"
                        max="20"
                        value={playerAge}
                        onChange={(e) => setPlayerAge(parseInt(e.target.value) || 10)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Parent / Guardian Information */}
                <div className="space-y-3">
                  <h4 className="text-[11px] sm:text-xs font-bold text-orange-500 uppercase tracking-wider mb-1.5">Parent / Guardian Contact</h4>
                  
                  <Input
                    label="Parent/Guardian Name"
                    type="text"
                    placeholder="e.g. Azzam Abdillah"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="guardian@example.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      required
                      icon={<Mail className="w-3.5 h-3.5" />}
                    />

                    <Input
                      label="Contact Phone"
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      required
                      icon={<Phone className="w-3.5 h-3.5" />}
                    />
                  </div>
                </div>

                {/* Medical Notes / Positions */}
                <Textarea
                  label="Special Notes / Allergies / Experience Level (Optional)"
                  placeholder="Provide any medical details, team experience, or positional focus..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />

                {/* Bottom Pricing Summary and Action */}
                <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-100">
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Tuition Fee</span>
                    <p className="text-xl sm:text-2xl font-extrabold text-brand-blue" style={{ fontFamily: 'var(--font-display)' }}>
                      ${currentItemPrice()}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    variant="blue"
                    size="md"
                    className="w-full sm:w-auto px-6 py-3"
                  >
                    Confirm & Reserve Spot
                  </Button>
                </div>
              </form>
            ) : (
              // STEP 2: SPORTS TICKET / RECEIPT CONFIRMATION
              <div className="space-y-6 flex flex-col items-center py-2 sm:py-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="text-center px-2">
                  <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    Registration Successful!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Seat reserved. Confirmation email has been sent to <strong className="text-slate-700">{createdBooking?.parentEmail}</strong>.
                  </p>
                </div>

                {/* Dynamic Ticket Design */}
                <div className="w-full max-w-md bg-white border-2 border-dashed border-slate-200 rounded-2xl shadow-lg relative overflow-hidden mt-1 sm:mt-2">
                  {/* Top Ticket Header */}
                  <div className="bg-brand-blue text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                      <span className="font-display font-black tracking-wider text-xs sm:text-sm">SFY OUTDOOR ARENA TICKET</span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                      {createdBooking?.ticketCode}
                    </span>
                  </div>

                  {/* Ticket Details */}
                  <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-bold text-[9px] uppercase">PARTICIPANT / PLAYER</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-tight">
                        {createdBooking?.playerName} (Age {createdBooking?.playerAge})
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <span className="text-slate-400 block font-bold text-[9px] uppercase">PROGRAM REGISTERED</span>
                        <p className="font-bold text-slate-800 truncate">{createdBooking?.selectedPackageTitle}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold text-[9px] uppercase">SCHEDULE DATE</span>
                        <p className="font-bold text-brand-orange flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {createdBooking?.selectedDate}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <span className="text-slate-400 block font-bold text-[9px] uppercase">PARENT / SPONSOR</span>
                        <p className="font-medium text-slate-700">{createdBooking?.parentName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold text-[9px] uppercase">TUITION DUES</span>
                        <p className="font-black text-slate-900">${currentItemPrice()} (PAID)</p>
                      </div>
                    </div>

                    {createdBooking?.notes && (
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic text-slate-500 text-[11px]">
                        "{createdBooking.notes}"
                      </div>
                    )}

                    {/* Fake barcode/QR code design */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
                      <div className="h-8 sm:h-10 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_6px,black_6px,black_10px)] opacity-85" />
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[6px] sm:tracking-[8px] mt-1 text-slate-500">
                        {createdBooking?.id?.toUpperCase()}2026YF
                      </span>
                    </div>
                  </div>

                  {/* Left-Right side cut notches */}
                  <div className="absolute top-[48px] -left-3 w-6 h-6 rounded-full bg-slate-100 border-r border-slate-200" />
                  <div className="absolute top-[48px] -right-3 w-6 h-6 rounded-full bg-slate-100 border-l border-slate-200" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2">
                  <Button
                    onClick={() => {
                      window.print();
                    }}
                    variant="ghost"
                    size="md"
                    className="w-full sm:flex-1 border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                  >
                    Cetak Resit (Print Ticket)
                  </Button>
                  <Button
                    onClick={handleResetClose}
                    variant="blue"
                    size="md"
                    className="w-full sm:flex-1"
                  >
                    Finish Registration
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
