import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Calendar, User, Mail, Phone, Flame, Check, Trophy, Ticket, AlertTriangle } from 'lucide-react';
import { FutsalCamp, TrainingPackage, Booking } from '../../types';
import Button from '../Button';
import Input from '../form/Input';
import Select from '../form/Select';
import DateInput from '../form/DateInput';
import Textarea from '../form/Textarea';
import ModalBase from './ModalBase';

const bookingSchema = z.object({
  playerName: z.string().min(1, 'Player full name is required'),
  playerAge: z.number().min(5, 'Player age must be at least 5').max(20, 'Player age must be at most 20'),
  parentName: z.string().min(1, 'Parent/Guardian name is required'),
  parentEmail: z.string().min(1, 'Email address is required').email('Invalid email address'),
  parentPhone: z.string().min(1, 'Contact phone is required').regex(/^\d+$/, 'Phone number must contain digits only'),
  bookingType: z.enum(['Camp', 'Training']),
  selectedItemId: z.string().min(1, 'Selected program is required'),
  selectedDate: z.string().min(1, 'Session / Start date is required'),
  notes: z.string().optional()
});

type BookingFormValues = z.infer<typeof bookingSchema>;

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
  const [step, setStep] = useState<1 | 2>(1); // 1: Form, 2: Ticket Ticket SFX
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      playerName: '',
      playerAge: 10,
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      bookingType: 'Camp',
      selectedItemId: '',
      selectedDate: '',
      notes: ''
    }
  });

  const bookingType = watch('bookingType');
  const selectedItemId = watch('selectedItemId');
  const selectedDate = watch('selectedDate');



  // Handle preselected package/camp on load or preselectedId change
  useEffect(() => {
    if (preselectedId) {
      const campExists = camps.find(c => c.id === preselectedId);
      if (campExists) {
        setValue('bookingType', 'Camp');
        setValue('selectedItemId', campExists.id);
        setValue('selectedDate', campExists.dates.split(' - ')[0] || '2026-06-22');
      } else {
        const trainExists = trainings.find(t => t.id === preselectedId);
        if (trainExists) {
          setValue('bookingType', 'Training');
          setValue('selectedItemId', trainExists.id);
          setValue('selectedDate', '2026-06-24');
        }
      }
    } else {
      // Set default
      if (camps.length > 0) {
        setValue('bookingType', 'Camp');
        setValue('selectedItemId', camps[0].id);
        setValue('selectedDate', '2026-06-22');
      }
    }
  }, [preselectedId, isOpen, camps, trainings, setValue]);

  // Adjust preselected ID when bookingType changes manually
  const handleTypeChange = (type: 'Camp' | 'Training') => {
    setValue('bookingType', type);
    if (type === 'Camp' && camps.length > 0) {
      setValue('selectedItemId', camps[0].id);
      setValue('selectedDate', '2026-06-22');
    } else if (type === 'Training' && trainings.length > 0) {
      setValue('selectedItemId', trainings[0].id);
      setValue('selectedDate', '2026-06-24');
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

  const onSubmit = (data: BookingFormValues) => {
    const itemTitle = currentItemTitle();
    const ticketCode = `SFYF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      playerName: data.playerName,
      playerAge: data.playerAge,
      parentName: data.parentName,
      parentEmail: data.parentEmail,
      parentPhone: data.parentPhone,
      selectedPackageId: data.selectedItemId,
      selectedPackageTitle: itemTitle,
      bookingType: data.bookingType,
      selectedDate: data.selectedDate,
      notes: data.notes || '',
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
    reset();
    setStep(1);
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={handleResetClose}
      maxWidth="max-w-2xl"
      closeButtonId="close-booking-modal"
      tagline={step === 1 ? "FUTSAL ACADEMY BOOKING" : "REGISTRATION CONFIRMED"}
      title={step === 1 ? "Futsal Academy Booking System" : "Registration Successful!"}
      description={
        step === 1
          ? "Register for SF Youth Futsal Training Slots & Camps"
          : `Seat reserved. Confirmation email has been sent to ${createdBooking?.parentEmail || ''}.`
      }
    >
      <div>
        {step === 1 ? (
          // STEP 1: FORM FILLING
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-5">

            {/* Booking Category Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange('Camp')}
                className={`p-3 rounded-2xl text-center font-bold text-[11px] sm:text-xs tracking-wide transition-all flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-2.5 sm:gap-1.5 cursor-pointer ${
                  bookingType === 'Camp'
                    ? 'bg-blue-50 text-brand-blue ring-2 ring-brand-blue ring-inset'
                    : 'text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200 ring-inset'
                }`}
              >
                <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${bookingType === 'Camp' ? 'text-brand-blue' : 'text-slate-400'}`} />
                <span>TRAINING CAMPS</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('Training')}
                className={`p-3 rounded-2xl text-center font-bold text-[11px] sm:text-xs tracking-wide transition-all flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-2.5 sm:gap-1.5 cursor-pointer ${
                  bookingType === 'Training'
                    ? 'bg-blue-50 text-brand-blue ring-2 ring-brand-blue ring-inset'
                    : 'text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200 ring-inset'
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
                error={errors.selectedItemId?.message}
                {...register('selectedItemId')}
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
                error={errors.selectedDate?.message}
                {...register('selectedDate')}
                min="2026-06-02"
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
                    error={errors.playerName?.message}
                    icon={<User className="w-3.5 h-3.5" />}
                    {...register('playerName')}
                  />
                </div>

                <div>
                  <Input
                    label="Player Age"
                    type="number"
                    min="5"
                    max="20"
                    error={errors.playerAge?.message}
                    {...register('playerAge', { valueAsNumber: true })}
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
                error={errors.parentName?.message}
                {...register('parentName')}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="guardian@example.com"
                  error={errors.parentEmail?.message}
                  icon={<Mail className="w-3.5 h-3.5" />}
                  {...register('parentEmail')}
                />

                <Input
                  label="Contact Phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="e.g. 6281234567890"
                  error={errors.parentPhone?.message}
                  icon={<Phone className="w-3.5 h-3.5" />}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    const allowed = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
                    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault();
                  }}
                  {...register('parentPhone')}
                />
              </div>
            </div>

            {/* Medical Notes / Positions */}
            <Textarea
              label="Special Notes / Allergies / Experience Level (Optional)"
              placeholder="Provide any medical details, team experience, or positional focus..."
              error={errors.notes?.message}
              rows={2}
              {...register('notes')}
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
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3"
              >
                {isSubmitting ? 'Processing...' : 'Confirm & Reserve Spot'}
              </Button>
            </div>
          </form>
        ) : (
          // STEP 2: SPORTS TICKET / RECEIPT CONFIRMATION
          <div className="space-y-6 flex flex-col items-center py-2 sm:py-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
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
                Print Ticket
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
    </ModalBase>
  );
}
