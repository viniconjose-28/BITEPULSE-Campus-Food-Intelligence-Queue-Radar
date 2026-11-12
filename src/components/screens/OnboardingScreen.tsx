import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Clock, DollarSign, Users, ArrowRight, Check } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      icon: Compass,
      tag: 'CROWD SENSING',
      title: 'See the Crowd',
      subtitle: 'Know how busy your campus food spots are before walking across college.',
      detail: 'Live color-coded crowd radar (Calm, Moderate, Busy) with real-time queue estimates across Central Canteen, Food Court, and Night Mess.',
    },
    {
      icon: Clock,
      tag: 'SPEED DISCOVERY',
      title: 'Beat the Queue',
      subtitle: 'Find the fastest food before you order so you never arrive late to class.',
      detail: 'Time Attack Mode: tell BitePulse you have 10 minutes, and get instant recommendations tagged by fastest prep & safest pickup times.',
    },
    {
      icon: DollarSign,
      tag: 'STUDENT FIRST',
      title: 'Eat Smart',
      subtitle: 'Get food recommendations based on your time and exact wallet budget.',
      detail: 'Select ₹50, ₹100, or ₹150 budget bundles and rescue end-of-day campus surplus meals with up to 40% discounts.',
    },
    {
      icon: Users,
      tag: 'CAMPUS SOCIAL',
      title: 'Make It Social',
      subtitle: 'Order together with hostel friends and earn BitePoints rewards.',
      detail: 'Create a room squad code like #BP204, combine friend orders in one tap, and unlock free toppings, drinks, and food badges.',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col justify-between p-6 select-none relative overflow-hidden">
      {/* Top skip header */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-black text-[#39FF14] tracking-wider font-['Cabinet_Grotesk'] uppercase">
          BITEPULSE
        </span>
        <button
          onClick={onComplete}
          className="text-xs font-semibold text-[#B7B7B7] hover:text-[#FFFFFF] min-h-[44px] px-3 flex items-center"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-xs"
          >
            {/* Visual Icon Illustration Card */}
            <div className="w-24 h-24 rounded-3xl bg-[#0B3D16]/40 border border-[#39FF14]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
              <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#39FF14] flex items-center justify-center text-[#39FF14]">
                <Icon className="w-8 h-8 stroke-[2.2] drop-shadow-[0_0_8px_#39FF14]" />
              </div>
            </div>

            <span className="text-[10px] font-black tracking-widest uppercase mb-2 px-2.5 py-0.5 rounded-full text-[#39FF14] bg-[#0B3D16]/60 border border-[#39FF14]/30">
              {slide.tag}
            </span>

            <h2 className="text-2xl font-black text-[#FFFFFF] tracking-tight font-['Cabinet_Grotesk'] mb-2">
              {slide.title}
            </h2>

            <p className="text-sm font-semibold text-[#B7B7B7] mb-3 leading-relaxed">
              {slide.subtitle}
            </p>

            <p className="text-xs text-[#777777] leading-normal bg-[#111111] p-3 rounded-xl border border-[#1C1C1C]">
              {slide.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom pagination & CTA */}
      <div className="w-full flex flex-col gap-4 pb-2">
        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === i ? 'w-6 bg-[#39FF14] shadow-[0_0_8px_#39FF14]' : 'w-2 bg-[#222222]'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full h-12 rounded-2xl bg-[#39FF14] text-[#050505] font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(57,255,20,0.35)] active:scale-[0.98] transition-transform hover:bg-[#7CFF5B]"
        >
          <span>{currentSlide === slides.length - 1 ? 'Start Campus Experience' : 'Next'}</span>
          {currentSlide === slides.length - 1 ? (
            <Check className="w-4 h-4 stroke-[3]" />
          ) : (
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          )}
        </button>
      </div>
    </div>
  );
};
