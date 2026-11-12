import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Utensils, Clock, Flame } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      onClick={onFinish}
      className="w-full h-full bg-[#050505] flex flex-col items-center justify-between p-8 cursor-pointer select-none relative overflow-hidden"
    >
      {/* Background organic neon pulse glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#39FF14]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#0B3D16]/30 blur-3xl pointer-events-none" />

      {/* Top tag */}
      <div className="pt-6">
        <span className="text-[11px] font-bold tracking-widest text-[#B7B7B7] uppercase font-mono">
          CAMPUS FOOD INTELLIGENCE
        </span>
      </div>

      {/* Center Animated Logo Lockup */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Pulse radar rings container */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-[#39FF14]/15"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
            className="absolute inset-2 rounded-full bg-[#39FF14]/25"
          />
          <div className="relative w-20 h-20 rounded-2xl bg-[#111111] border border-[#39FF14]/60 flex items-center justify-center shadow-[0_0_24px_rgba(57,255,20,0.35)] text-[#39FF14]">
            <Utensils className="w-10 h-10 stroke-[2.2] drop-shadow-[0_0_8px_#39FF14]" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <h1 className="text-4xl font-black text-[#FFFFFF] tracking-tight font-['Cabinet_Grotesk']">
            BITE
          </h1>
          <h1 className="text-4xl font-black text-[#39FF14] tracking-tight font-['Cabinet_Grotesk'] drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]">
            PULSE
          </h1>
        </div>
        
        <p className="text-xs font-semibold text-[#B7B7B7] max-w-[260px] leading-snug">
          Know the Crowd. Find Your Food. Beat the Queue.
        </p>

        {/* Feature badges */}
        <div className="flex items-center gap-3 mt-6 text-xs text-[#777777] font-medium">
          <span className="flex items-center gap-1 text-[#FFFFFF]">
            <Clock className="w-3.5 h-3.5 text-[#39FF14]" /> Live Queues
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 text-[#FFFFFF]">
            <Flame className="w-3.5 h-3.5 text-[#39FF14]" /> Time Attack
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 text-[#FFFFFF]">
            <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" /> BitePoints
          </span>
        </div>
      </motion.div>

      {/* Bottom indicator */}
      <div className="w-full flex flex-col items-center pb-4 text-center">
        <div className="flex gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#7CFF5B] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#39FF14]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-[11px] text-[#777777]">Tap to enter</span>
      </div>
    </div>
  );
};
