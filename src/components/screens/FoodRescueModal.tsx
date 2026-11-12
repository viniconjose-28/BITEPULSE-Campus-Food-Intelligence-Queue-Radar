import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { FoodItem } from '../../types';
import { localDb } from '../../data/localDatabase';

interface FoodRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (food: FoodItem) => void;
}

export const FoodRescueModal: React.FC<FoodRescueModalProps> = ({
  isOpen,
  onClose,
  onSelectFood,
}) => {
  const [rescueItems, setRescueItems] = React.useState<FoodItem[]>(localDb.getFoodRescueItems());
  const [timeLeftMin, setTimeLeftMin] = React.useState(38);

  React.useEffect(() => {
    if (isOpen) {
      setRescueItems(localDb.getFoodRescueItems());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end justify-center select-none">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-[430px] bg-[#0B0B0B] rounded-t-[32px] p-5 max-h-[85vh] flex flex-col shadow-2xl border-t border-[#1C1C1C]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0B3D16] border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14]">
              <span className="text-base">♻️</span>
            </div>
            <div>
              <h3 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
                CAMPUS FOOD RESCUE
              </h3>
              <p className="text-[11px] text-[#B7B7B7]">
                Save food. Save money. Earn +20 BitePoints.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#B7B7B7] hover:text-[#FFFFFF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sustainability Banner */}
        <div className="my-3 bg-[#0B3D16]/40 p-3.5 rounded-2xl border border-[#39FF14]/30 flex items-center justify-between shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#39FF14]">
              <Clock className="w-3.5 h-3.5" />
              <span>CLOSING SERVICE IN {timeLeftMin} MINS</span>
            </div>
            <p className="text-[11px] text-[#B7B7B7] mt-0.5">
              Fresh surplus cafeteria meals discounted by 35%–42%
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#39FF14]/40 flex flex-col items-center justify-center text-[#39FF14]">
            <Heart className="w-4 h-4 fill-[#39FF14]" />
            <span className="text-[9px] font-black mt-0.5">ECO</span>
          </div>
        </div>

        {/* Rescue List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-3">
          {rescueItems.map((item) => {
            const discountPct = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 35;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectFood(item);
                  onClose();
                }}
                className="bg-[#111111] rounded-2xl p-3 border border-[#1C1C1C] hover:border-[#39FF14] transition-all cursor-pointer shadow-md flex gap-3 group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#171717] shrink-0 relative border border-[#222222]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-[#39FF14] text-[#050505] text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    -{discountPct}%
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors leading-snug line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#777777] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-[#B7B7B7]">
                      {item.outletName} · Ready now
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-[#39FF14]">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-[#777777] line-through font-medium">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-[#39FF14] flex items-center gap-0.5">
                      Rescue Item <ArrowRight className="w-3 h-3 stroke-[3]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2 border-t border-[#1C1C1C]">
          <span className="text-[10px] text-[#777777] font-semibold">
            🌱 Every rescue meal prevents campus culinary waste
          </span>
        </div>
      </motion.div>
    </div>
  );
};
