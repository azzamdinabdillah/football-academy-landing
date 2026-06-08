import { FutsalCamp, TrainingPackage, Testimonial, TrainingProgram } from './types';

export const CAMPS_DATA: FutsalCamp[] = [
  {
    id: 'camp-1',
    title: 'Elite Summer Futsal Camp 2026',
    description: 'Our flagship intensive summer development camp focusing on micro-touch, tactical positioning, and fast-paced transition play. Led by certified Pro Futsal licenced coaches.',
    dates: 'June 22 - June 26, 2026',
    ageGroup: 'U8 - U14 (Co-ed)',
    price: 425,
    spotsLeft: 8,
    location: 'Mission Dist Indoor Arena, SF',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'camp-2',
    title: 'Elite Soccer Recruiting Showcase',
    description: 'Designed exclusively for competitive club players seeking recruitment into collegiate divisions. Includes technical scouting reports, high-intensity match play, and video profiles.',
    dates: 'July 15 - July 18, 2026',
    ageGroup: 'U14 - U18 (Boys & Girls)',
    price: 520,
    spotsLeft: 14,
    location: 'Presidio Sports Arena, SF',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'camp-3',
    title: 'Technical Footwork & Ball Mastery',
    description: 'Master 1v1 situations under pressure. Players learn specific futsal ball manipulation techniques, change of speed patterns, and creative finishing directly applicable to outdoor 11v11.',
    dates: 'August 03 - August 07, 2026',
    ageGroup: 'U7 - U12 (Co-ed)',
    price: 380,
    spotsLeft: 5,
    location: 'Mission Dist Indoor Arena, SF',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600&auto=format&fit=crop'
  }
];

export const TRAININGS_DATA: TrainingPackage[] = [
  {
    id: 'train-1',
    title: 'Elite Individual 1-on-1 Mentorship',
    description: 'Highly customized technical and athletic drills designed for rapid improvement. Accompanied by position-specific feedback and regular physical metric reviews.',
    intensity: 'Elite Prep',
    duration: '60 Mins per Session',
    pricePerSession: 110,
    benefits: [
      'Personalized development blueprints',
      'Video analysis of tactical mechanics',
      'Direct collegiate recruiting advice',
      'Flexible scheduling on weekends'
    ]
  },
  {
    id: 'train-2',
    title: 'Small Group Technical Academy',
    description: 'Small player-to-coach ratios (max 6 players) creating high-repetition game simulation environments. Ideal for teamwork speed, fast decisions, and technical sharpness.',
    intensity: 'High Intensity',
    duration: '75 Mins per Session',
    pricePerSession: 65,
    benefits: [
      'High tempo 1v1 & 2v2 tactical decision scenarios',
      'Intense pressure dribbling practices',
      'Speed, agility, and quick-pivot training',
      'Competitive, highly collaborative group vibe'
    ]
  },
  {
    id: 'train-3',
    title: 'Recruiting Assessment Tryouts',
    description: 'A dedicated 2-hour technical evaluation where players are tested across core agility, spatial speed, first touch, and decision-making metrics. Includes a scouting feedback report.',
    intensity: 'Intermediate',
    duration: '120 Mins Session',
    pricePerSession: 140,
    benefits: [
      'Official SF Youth Futsal Performance Assessment',
      'Individual scout scorecard & statistics',
      'Eligibility matching for advanced travel teams',
      'Direct entry into high-performance pools'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Henderson',
    role: 'Parent of U13 Competitive Club Player',
    text: 'My son has played club soccer for 4 years, but joining SF Youth Futsal program transformed his speed of thought and confidence on the ball. The ball mastery taught here is unmatched!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Elite Girl Player, College Recruit 2025',
    text: 'The recruiting showcase and tactical video reviews gave me the leverage to stand out to college scouts. If you want to play at the next level, train here.',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-3',
    name: 'Sofia Thorne',
    role: 'Parent of U9 Elite Prep Twins',
    text: 'Finding high-quality futsal coaching in San Francisco was tough till we found this program. Our kids wait for Mondays and Wednesdays all week long!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-4',
    name: 'Sarah Jenkins',
    role: 'Parent of U15 Winger',
    text: 'The attention to detailed positioning and rapid transition play helped my daughter excel in her high school varsity matches. High-intensity and super organized!',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-5',
    name: 'Coach Robert Vance',
    role: 'Regional Youth Scout & Analyst',
    text: 'Unbelievable curriculum. The focus on micro-touches and explosive agility on court translates beautifully to the grass field. Highest recommendations!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-6',
    name: 'Thomas Alvarez',
    role: 'Parent of U11 Midfielder',
    text: 'More touches, fast decisions, and high repetition. SF Youth Futsal trains athletes to think two steps ahead. A must for any competitive youth soccer player.',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-7',
    name: 'Lucas Miller',
    role: 'U16 Academy Striker',
    text: 'As an outdoor club striker, my close-quarters finishing improved drastically after one summer camp here. The coaches are phenomenal mentors!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-8',
    name: 'Amara Diallo',
    role: 'Parent of U12 Goalkeeper',
    text: 'The booking is seamless, and the scouting assessment gave us clear, data-driven targets to improve. Highly professional soccer school!',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  }
];

export const PROGRAMS_DATA: TrainingProgram[] = [
  {
    title: "Elite Soccer Training",
    description: "Elite soccer training provides top-tier coaching, advanced techniques, & comprehensive drills to player.",
    image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    badge: "TOP CREATOR",
    stat1: "Age 8-18",
    stat2: "Elite Tier",
  },
  {
    title: "Pro Coaching & Mentorship",
    description: "Pro Coaching & Mentorship offers elite guidance, expert training, and personalized support to elevate your performance.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop",
    badge: "TOP COACH",
    stat1: "Pro Mentor",
    stat2: "1x1 Focus",
  },
  {
    title: "Recruit Clarity & Coaching",
    description: "Recruit Clarity & Coaching offers clear guidance, expert training, and personalized support for optimal performance.",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600&auto=format&fit=crop",
    badge: "COLLEGE READY",
    stat1: "Collegiate",
    stat2: "Scouting",
  }
];

