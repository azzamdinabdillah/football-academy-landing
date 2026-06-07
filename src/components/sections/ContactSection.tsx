import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../Button';
import ModalBase from '../modals/ModalBase';
import Input from '../form/Input';
import Textarea from '../form/Textarea';

// ─── Zod Schema ────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+\d\s\-()]*$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ──────────────────────────────────────────────────────────────────────────────

export default function ContactSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const onSubmit = (_data: ContactFormValues) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactModalOpen(false);
      reset();
    }, 2500);
  };

  const handleClose = () => {
    setIsContactModalOpen(false);
    setSubmitted(false);
    reset();
  };

  return (
    <section 
      id="contact-us" 
      className="relative bg-fixed bg-cover bg-center bg-no-repeat py-20 md:py-24 lg:py-32 overflow-hidden flex items-center min-h-[500px]"
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.15)), url('https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1600&auto=format&fit=crop')` 
      }}
    >
      {/* Dynamic Overlay Shading */}
      <div className="absolute inset-0 bg-[#0a0f18]/30 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 flex justify-end">
        
        {/* White Elegant Contact Info Card on the Right (responsive width) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 w-full lg:max-w-[540px] flex flex-col justify-between"
        >
          <div className="space-y-6">
            <h2 
              style={{ fontFamily: 'var(--font-display)' }} 
              className="text-3xl lg:text-[40px] font-black tracking-tight text-slate-900 leading-[1.1] mb-2"
            >
              Get in Touch! SF Youth Futsal ⚽
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Get in touch with SF Premier Training for elite soccer coaching and development for players ages U5-U18 ⚽.
            </p>

            <div className="pt-2">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                variant="ghost"
                size="lg"
                className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold"
              >
                CONTACT US
              </Button>
            </div>
          </div>

          {/* Minimalist Contact Grid (Clean & lightweight layout) */}
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-5">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-1">Contact Us</span>
              <a 
                href="mailto:info@sfyouthfutsal.com" 
                className="font-extrabold text-brand-dark hover:text-brand-blue text-sm md:text-base transition-colors duration-150 block"
              >
                info@sfyouthfutsal.com
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-0.5">Phone Hotline</span>
                <span className="font-bold text-slate-700 text-xs md:text-sm">
                  +1 (415) 349-2098
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-0.5">Arena Address</span>
                <span className="font-bold text-slate-700 text-xs md:text-sm">
                  1450 Harrison St, SF
                </span>
              </div>
            </div>

            {/* Social Followings */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-2.5">Follow us</span>
              <div className="flex items-center gap-4 text-slate-600">
                <a href="#" className="hover:text-brand-blue duration-150 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-brand-blue duration-150 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-brand-blue duration-150 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* CONTACT FORM MODAL POPUP */}
      <ModalBase
        isOpen={isContactModalOpen}
        onClose={handleClose}
        maxWidth="max-w-md"
        tagline="GET ACCREDITED HELP"
        title="Premium Contact Form"
        description="Drop us a line and our athletics director will reach you within 24 business hours."
      >
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 flex flex-col items-center justify-center text-center space-y-4"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Transmission Succeeded!</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Your message has been safely logged. We look forward to welcome you to the pitch!
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Input
              id="contact-name"
              label="Full Name"
              type="text"
              placeholder="e.g. Azzam Din"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              id="contact-email"
              label="Email Address"
              type="email"
              placeholder="azzam@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="contact-phone"
              label="Phone Number (Optional)"
              type="tel"
              placeholder="e.g. +1 (415) 349-2098"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Textarea
              id="contact-message"
              label="Message / Inquiry"
              rows={3}
              placeholder="Describe your enquiry..."
              error={errors.message?.message}
              {...register('message')}
            />

            <Button
              type="submit"
              variant="blue"
              size="md"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2"
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        )}
      </ModalBase>

    </section>
  );
}
