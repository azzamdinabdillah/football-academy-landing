import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Phone, Mail, Award, Trash2, ShieldAlert, Heart, RefreshCw } from 'lucide-react';
import { Booking } from '../types';
import Button from './Button';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function MyBookingsDrawer({
  isOpen,
  onClose,
  bookings,
  onCancelBooking
}: MyBookingsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-neutral-100"
            >
              {/* Drawer Title Section */}
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-slate-900 text-lg uppercase tracking-tight flex items-center gap-2">
                    <Award className="w-5 h-5 text-brand-blue" />
                    My Registrations
                  </h3>
                  <p className="text-xs text-slate-500">Manage your training slot records</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {bookings.length === 0 ? (
                  <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">No Bookings Yet</h4>
                      <p className="text-xs text-slate-400 max-w-[240px] mt-1">
                        Choose a training camp package or individual slot, click the "BOOK NOW" button to begin.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{bookings.length} active reservations found</p>
                    
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
                      >
                        {/* Status bar */}
                        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-[10px] font-bold">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            CONFIRMED SLOT
                          </span>
                          <span className="font-mono text-zinc-400">{booking.ticketCode}</span>
                        </div>

                        {/* Player ticket body */}
                        <div className="p-4 space-y-3">
                          <div>
                            <span className="text-[9px] text-slate-400 font-bold block uppercase">PLAYER / ATHLETE</span>
                            <span className="font-bold text-slate-800 text-sm block">
                              {booking.playerName} <span className="text-xs font-normal text-slate-500">(Age {booking.playerAge})</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold block uppercase">PROGRAM</span>
                              <span className="font-semibold text-slate-700 block truncate">{booking.selectedPackageTitle}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold block uppercase">DATE / TIMING</span>
                              <span className="font-mono font-bold text-brand-orange block">{booking.selectedDate}</span>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[9px] text-slate-400 font-bold uppercase">PARENT CONTROLLER</span>
                              <span className="text-xs text-slate-600 font-medium truncate max-w-[150px]">
                                {booking.parentName}
                              </span>
                            </div>
                            <Button
                              onClick={() => {
                                if (confirm(`Are you sure you want to cancel the registration for ${booking.playerName}?`)) {
                                  onCancelBooking(booking.id);
                                }
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 rounded-lg p-2 font-black flex items-center justify-center gap-1 shadow-none hover:shadow-none"
                              leftIcon={<Trash2 className="w-4 h-4" />}
                            >
                              CANCEL
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="flex items-start gap-2.5 text-xs text-slate-500 mb-2">
                  <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Admission Requirements:</strong> Please bring shin guards, rubber-soled indoor futsal shoes, and your own water bottle. Arrive 15 minutes early.
                  </p>
                </div>
                <div className="text-center text-[10px] text-slate-400 font-extrabold uppercase mt-4 flex items-center justify-center gap-1">
                  <span>SF Youth Futsal Arena</span>
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>San Francisco</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
