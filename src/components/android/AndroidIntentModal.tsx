import React from 'react';
import { motion } from 'motion/react';
import { X, Share2, Mail, MessageSquare, Copy, Check, Smartphone } from 'lucide-react';

interface AndroidIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  intentType: 'SHARE_ORDER' | 'SUPPORT_EMAIL';
  payload: {
    title: string;
    text: string;
    target?: string;
  };
}

export const AndroidIntentModal: React.FC<AndroidIntentModalProps> = ({
  isOpen,
  onClose,
  intentType,
  payload,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(payload.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.text,
        });
        onClose();
        return;
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end justify-center select-none">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-[430px] bg-[#0B0B0B] rounded-t-[32px] p-5 max-h-[80vh] flex flex-col shadow-2xl border-t border-[#1C1C1C]"
      >
        {/* Android Intent Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#171717] border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#39FF14] tracking-wider uppercase">
                {intentType === 'SHARE_ORDER' ? 'Intent: ACTION_SEND' : 'Intent: ACTION_SENDTO'}
              </span>
              <h3 className="text-sm font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
                Android Intent Dispatcher
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#B7B7B7] hover:text-[#FFFFFF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Intent Payload preview */}
        <div className="my-4 bg-[#111111] p-3.5 rounded-2xl border border-[#1C1C1C] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#777777] uppercase">
              Intent Extras: EXTRA_TEXT
            </span>
            <span className="text-[10px] bg-[#0B3D16] text-[#39FF14] border border-[#39FF14]/30 font-black px-1.5 py-0.5 rounded">
              text/plain
            </span>
          </div>
          <p className="text-xs text-[#E6DCD5] font-medium p-2.5 bg-[#171717] rounded-xl border border-[#222222] leading-relaxed">
            "{payload.text}"
          </p>
        </div>

        {/* Targets */}
        <div className="space-y-2 mb-4">
          <span className="text-[11px] font-bold text-[#777777] block px-1">
            Simulate App Target Resolution:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleNativeShare}
              className="p-3 bg-[#111111] border border-[#222222] rounded-2xl flex flex-col items-center justify-center gap-1.5 hover:border-[#39FF14] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B3D16] flex items-center justify-center text-[#39FF14]">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#FFFFFF]">System Share</span>
            </button>
            <button
              onClick={handleCopy}
              className="p-3 bg-[#111111] border border-[#222222] rounded-2xl flex flex-col items-center justify-center gap-1.5 hover:border-[#39FF14] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#171717] border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14]">
                {copied ? <Check className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4" />}
              </div>
              <span className="text-[10px] font-bold text-[#FFFFFF]">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={() => {
                window.location.href = `mailto:support@bitepulse.campus?subject=${encodeURIComponent(payload.title)}&body=${encodeURIComponent(payload.text)}`;
                onClose();
              }}
              className="p-3 bg-[#111111] border border-[#222222] rounded-2xl flex flex-col items-center justify-center gap-1.5 hover:border-[#39FF14] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#171717] border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14]">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#FFFFFF]">Campus Mail</span>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-[#1C1C1C] text-center">
          <span className="text-[10px] text-[#777777]">
            Demonstrates Android Intent IPC & Sharing mechanism
          </span>
        </div>
      </motion.div>
    </div>
  );
};
