export interface FutsalCamp {
  id: string;
  title: string;
  description: string;
  dates: string;
  ageGroup: string;
  price: number;
  spotsLeft: number;
  location: string;
  image: string;
}

export interface TrainingPackage {
  id: string;
  title: string;
  description: string;
  intensity: 'Introduction' | 'Intermediate' | 'High Intensity' | 'Elite Prep';
  duration: string;
  pricePerSession: number;
  benefits: string[];
}

export interface Booking {
  id: string;
  playerName: string;
  playerAge: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  selectedPackageId: string;
  selectedPackageTitle: string;
  bookingType: 'Camp' | 'Training';
  selectedDate: string;
  notes?: string;
  createdAt: string;
  ticketCode: string; // SFYF-XXXX
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface TrainingProgramCardProps {
  title: string;
  description: string;
  image: string;
  badge: string;
  stat1: string;
  stat2: string;
  index?: number;
  onOpenBooking?: () => void;
}
