import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Presentation, Maximize2, Sparkles } from 'lucide-react';

export const SLIDES_DATA = [
  {
    slideNumber: 1,
    title: 'BITEPULSE',
    subtitle: 'Campus Food Discovery, Queue Intelligence, and Student Dining Lifestyle System',
    bulletPoints: [
      'Mobile Application Development (MAD) Assignment 4 & 5',
      'Technology: Kotlin, Jetpack Compose, Room Database, MVVM, Coroutines',
      'Tagline: "Know the Crowd. Find Your Food. Beat the Queue."',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 2,
    title: 'The Problem on Campus',
    subtitle: 'Why Dining in College is a Daily Challenge',
    bulletPoints: [
      'Students have 10-15 minute tight breaks between lectures.',
      'Unpredictable canteen queues lead to missed meals or tardiness to classes.',
      'No way of knowing if popular items are sold out before walking across campus.',
      'Severe food waste at 7 PM closing without dynamic discounts.',
    ],
    accent: '#B3261E',
  },
  {
    slideNumber: 3,
    title: 'Why Campus Food is Different',
    subtitle: 'The Nuances of University Dining Halls',
    bulletPoints: [
      'Hyper-localized walking distance vs vehicular delivery drivers.',
      'Strict academic timetable constraints (class starts at fixed bell).',
      'Extremely price-sensitive student wallets with daily allowances.',
      'Shared communal culture: hostel roommates and project squads eat together.',
    ],
    accent: '#F28C28',
  },
  {
    slideNumber: 4,
    title: 'Existing Solutions & Gaps',
    subtitle: 'Why Standard Commercial Apps Fail on Campus',
    bulletPoints: [
      'Zomato / Swiggy / DoorDash: Excluded from internal campus kiosks.',
      'High delivery & packaging surcharges unaffordable for student micro-orders.',
      'Zero awareness of internal canteen queue queues or kitchen rush status.',
      'No time-constrained recommendation modes.',
    ],
    accent: '#7A6A60',
  },
  {
    slideNumber: 5,
    title: 'The Proposed Solution: BitePulse',
    subtitle: 'A New Category: Campus Food Intelligence',
    bulletPoints: [
      'Local-first real-time crowd and wait sensing.',
      'Reverse discovery: match your remaining time & pocket cash to available food.',
      'Seamless express counter pickups with zero wait in queue lines.',
      'Integrated sustainability and community gamification.',
    ],
    accent: '#5F8A52',
  },
  {
    slideNumber: 6,
    title: 'BitePulse Core Architecture',
    subtitle: 'Unidirectional Data Flow (UDF) & Local-First Resilience',
    bulletPoints: [
      'Jetpack Compose UI observes ViewModel StateFlows.',
      'ViewModel interacts with Repository for business logic.',
      'Repository fetches and writes to Room SQLite local DB.',
      'Zero hard external API dependencies for offline execution.',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 7,
    title: 'Key System Modules',
    subtitle: '15 Distinct Features Built Specifically for Campus',
    bulletPoints: [
      'Campus Pulse · Queue Radar · Time Attack Mode · Budget Mode',
      'Food Pulse (Trending) · Group Orders (#BP204) · Food Rescue (♻️)',
      'Taste Passport · BitePoints · BiteBot AI · Campus Food Map',
    ],
    accent: '#F28C28',
  },
  {
    slideNumber: 8,
    title: 'Feature 1: Live Campus Pulse',
    subtitle: 'Hero Real-Time Crowd Sensation',
    bulletPoints: [
      'Color-coded crowd indicator: 🟢 Calm, 🟡 Moderate, 🔴 Busy, ⛔ Very Busy.',
      'Displays real-time average wait time (e.g., "4 min average wait").',
      'Advises students: "Best time to order: NOW".',
      'Quick glance preview for Central Canteen, Food Court, and Snack Hub.',
    ],
    accent: '#5F8A52',
  },
  {
    slideNumber: 9,
    title: 'Feature 2: Queue Radar',
    subtitle: 'Multi-Outlet Kitchen Queue Intel',
    bulletPoints: [
      'Dedicated radar cards for all 5 university food outlets.',
      'Shows current crowd status, queue length in minutes, and distance.',
      'Highlights the "Fastest Item" (e.g., Tea in 2 mins) and "Most Ordered".',
      'Direct "Order Ahead" button into specific kitchen queues.',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 10,
    title: 'Feature 3: Time Attack Mode',
    subtitle: 'Food Guaranteed Before Your Next Class',
    bulletPoints: [
      'Student inputs available time: "I have 10 minutes".',
      'System evaluates [Kitchen Prep Time + Queue Wait Time <= Time Cap].',
      'Auto-classifies into: "Fastest Choice", "Safest Choice", "Best Value".',
      'Never be late to a lab or lecture due to lunch delay.',
    ],
    accent: '#F28C28',
  },
  {
    slideNumber: 11,
    title: 'Feature 4: Budget Mode',
    subtitle: 'Zero-Overspend Smart Meal Bundles',
    bulletPoints: [
      'Pills for ₹50, ₹75, ₹100, ₹150, ₹200+ maximum allowance.',
      'Curates complete combos (e.g., ₹100 = Sandwich ₹60 + Soda ₹25 + Cookie ₹15).',
      '1-click bundle checkout adds the exact combo to cart.',
      'Displays exact price savings compared to individual retail.',
    ],
    accent: '#5F8A52',
  },
  {
    slideNumber: 12,
    title: 'Feature 5: Food Pulse (Trending)',
    subtitle: 'Live Hourly Crowd Popularity',
    bulletPoints: [
      'Calculates most ordered items across campus in the past 60 minutes.',
      'Live order counters: Smash Burger (+34 orders), Cold Coffee (+27 orders).',
      'Helps freshmen quickly identify campus staples and favorites.',
      'Animated trending pulse visual indicators.',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 13,
    title: 'Feature 6: Group Orders',
    subtitle: 'Social Hostel Room & Lab Orders',
    bulletPoints: [
      'Host generates squad room title: "ROOM 204 LUNCH" -> Code #BP204.',
      'Friends enter code to link their baskets under one single order ticket.',
      'Displays individual breakdown: Aarav (₹90), Vini (₹70), Rahul (₹120).',
      'Applies special ₹30 squad bundle discount and simplifies bill split.',
    ],
    accent: '#F28C28',
  },
  {
    slideNumber: 14,
    title: 'Feature 7: Food Rescue',
    subtitle: 'Campus Sustainability & Surplus Food Diversion',
    bulletPoints: [
      'Activates before kitchen closing hours (e.g. 7 PM).',
      'Fresh surplus meals offered at 35% to 42% discounts (Brownie ₹60 -> ₹35).',
      'Motto: "Save food. Save money. Earn +20 BitePoints."',
      'Direct contribution to university environmental sustainability goals.',
    ],
    accent: '#7A8B5A',
  },
  {
    slideNumber: 15,
    title: 'Feature 8: Taste Passport',
    subtitle: 'Spotify Wrapped-Style Foodie Dossier',
    bulletPoints: [
      'Replaces sterile profile screens with interactive culinary statistics.',
      'Tracks: Foods Tried (27), Money Saved (₹420), Meals Rescued (6).',
      'Gamified Badges: Burger Explorer 🍔, Coffee Addict ☕, Spice Hunter 🌶️.',
      'Fosters engagement and exploration of healthy dining alternatives.',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 16,
    title: 'Feature 9 & 10: BitePoints & Missions',
    subtitle: 'Student Loyalty Engine',
    bulletPoints: [
      'Earn points: Orders (+10), Group (+15), Food Rescue (+20), Missions (+30).',
      'Daily challenges: "Try something under ₹80", "Beat the 1 PM rush".',
      'Rewards store: Free toppings, ₹20 discount vouchers, free beverages.',
      'Instant voucher code generation and automatic checkout redemption.',
    ],
    accent: '#F28C28',
  },
  {
    slideNumber: 17,
    title: 'Feature 11 & 12: BiteBot AI Concierge',
    subtitle: 'Smart Natural Language Food Assistant',
    bulletPoints: [
      'Interactive chat assistant for cravings, budgets, and rush constraints.',
      'Safe dual engine: Gemini API if key is supplied + instant rule-based fallback.',
      'Returns rich interactive clickable meal recommendation cards.',
      'Fully functional in 100% offline environments.',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 18,
    title: 'Feature 13: Campus Food Map',
    subtitle: 'Spatial Spatial Dining Navigation',
    bulletPoints: [
      'Interactive campus layout grid showing Academic Block, Library, Hostels.',
      'Color-coded markers indicate live queue times directly on the map.',
      'Displays walking distance (meters) and walking duration (minutes).',
      'Tap to inspect opening hours, fastest items, and order ahead.',
    ],
    accent: '#5F8A52',
  },
  {
    slideNumber: 19,
    title: 'Feature 14 & 15: Ordering & Queue Position',
    subtitle: 'Counter Verification & Live Pipeline',
    bulletPoints: [
      'Customization: Portion size, 4-tier spice level, add-on toppings, allergen exclusions.',
      '4-stage preparation pipeline: Received -> Preparing -> Almost Ready -> Ready.',
      'Dynamic queue position countdown (Queue #4 -> #3 -> Ready).',
      'Secure 4-digit Pickup PIN & QR code verification at the counter.',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 20,
    title: 'Android Technical Deep Dive',
    subtitle: 'Core MAD Curriculum Concepts Demonstrated',
    bulletPoints: [
      'Activities & Jetpack Compose declarative UI architecture.',
      'Android Intents: ACTION_SEND for order sharing, ACTION_SENDTO for support email.',
      'Room Database: Entities, DAOs, TypeConverters, Reactive Flow streams.',
      'State Management: StateFlow, derived state, composable recomposition control.',
    ],
    accent: '#7A6A60',
  },
  {
    slideNumber: 21,
    title: 'Security, Privacy & Local Resilience',
    subtitle: 'Zero Vulnerability by Design',
    bulletPoints: [
      'Local-first architecture requires no third-party cloud data harvesting.',
      'Demo mock payments: UPI, Campus SmartCard, Cash (no real cards processed).',
      'Parameterized SQLite queries defend against SQL injection attacks.',
      'Masked student credentials and sanitized regex email inputs.',
    ],
    accent: '#5F8A52',
  },
  {
    slideNumber: 22,
    title: 'Key Advantages of BitePulse',
    subtitle: 'Why It Excels Over Generic Food Clones',
    bulletPoints: [
      'Saves 15-20 minutes of queue waiting time per student per day.',
      'Zero delivery fees: promotes walking and timely counter pickup.',
      'Reduces university cafeteria food waste through Food Rescue discounts.',
      'Warm distinctive visual identity (strictly no generic blue/tech tropes).',
    ],
    accent: '#D95F39',
  },
  {
    slideNumber: 23,
    title: 'Future Enhancements',
    subtitle: 'Roadmap for Production Campus Deployment',
    bulletPoints: [
      'Computer Vision camera queue length detection at canteen counters.',
      'NFC contactless student ID card tap for instantaneous pickup.',
      'Integration with university student ERP and lecture timetable calendars.',
      'Multi-campus dining hall federation across university satellite branches.',
    ],
    accent: '#F28C28',
  },
  {
    slideNumber: 24,
    title: 'Conclusion & Live Demo',
    subtitle: 'BitePulse: Know the Crowd. Find Your Food. Beat the Queue.',
    bulletPoints: [
      'Complete end-to-end implementation of MAD Assignments 4 & 5.',
      'Production-grade Kotlin & Jetpack Compose design architecture.',
      'Ready for academic evaluation, viva examination, and live device testing.',
      'Thank you! Questions and demonstrations are welcomed.',
    ],
    accent: '#D95F39',
  },
];

export const SlidesDeckViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const slide = SLIDES_DATA[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : SLIDES_DATA.length - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev < SLIDES_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full flex flex-col space-y-4 text-[#FFF8EF] select-none">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#3D312B] gap-3">
        <div>
          <span className="text-xs font-bold text-[#D95F39] uppercase tracking-wider flex items-center gap-1.5">
            <Presentation className="w-4 h-4" /> MAD Defense Presentation Deck
          </span>
          <h2 className="text-xl font-black text-[#FFF8EF] font-['Cabinet_Grotesk']">
            24 Presentation Slides
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#A39389]">
            Slide {currentSlideIndex + 1} of {SLIDES_DATA.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-[#1A1412] border border-[#3D312B] hover:border-[#D95F39] text-[#FFF8EF]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-[#D95F39] hover:bg-[#BF4C29] text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Canvas */}
      <div className="relative w-full aspect-[16/9] min-h-[420px] bg-[#1A1412] rounded-2xl border-2 border-[#3D312B] p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Slide Accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: slide.accent }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-black px-2.5 py-0.5 rounded-full uppercase"
                style={{ backgroundColor: `${slide.accent}25`, color: slide.accent }}
              >
                SLIDE {slide.slideNumber} / {SLIDES_DATA.length}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-[#FFF8EF] font-['Cabinet_Grotesk'] tracking-tight mb-2">
              {slide.title}
            </h3>

            <p className="text-sm sm:text-base font-semibold text-[#A39389] mb-6">
              {slide.subtitle}
            </p>

            <div className="space-y-3 bg-[#241A17] p-5 sm:p-6 rounded-2xl border border-[#3D312B]/70">
              {slide.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: slide.accent }}
                  />
                  <span className="text-sm sm:text-base text-[#E6DCD5] leading-relaxed font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Footer */}
        <div className="pt-4 border-t border-[#3D312B] flex items-center justify-between text-xs text-[#7A6A60]">
          <span>BITEPULSE · Campus Food Intelligence</span>
          <span>MAD Assignment 4 & 5 Viva Presentation</span>
        </div>
      </div>

      {/* Slide Thumbnails Scroller */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {SLIDES_DATA.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              currentSlideIndex === idx
                ? 'bg-[#D95F39] text-white shadow-xs'
                : 'bg-[#1A1412] text-[#A39389] border border-[#3D312B] hover:text-[#FFF8EF]'
            }`}
          >
            {s.slideNumber}. {s.title}
          </button>
        ))}
      </div>
    </div>
  );
};
