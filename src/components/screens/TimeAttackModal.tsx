import React from 'react';
import { motion } from 'motion/react';
import { X, Clock, Zap, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { FoodItem } from '../../types';
import { localDb } from '../../data/localDatabase';

interface TimeAttackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (food: FoodItem) => void;
}

export const TimeAttackModal: React.FC<TimeAttackModalProps> = ({
  isOpen,
  onClose,
  onSelectFood,
}) => {
  const [selectedMinutes, setSelectedMinutes] = React.useState<number>(10);
  const allFoods = localDb.getAllFoodItems();
  const outlets = localDb.getOutlets();

  if (!isOpen) return null;

  const outletQueueMap = new Map<string, number>();
  outlets.forEach((o) => outletQueueMap.set(o.id, o.estimatedQueueMin));

  const feasibleItems = allFoods
    .map((item) => {
      const queueWait = outletQueueMap.get(item.outletId) || 4;
      const totalEstimatedWait = item.preparationTimeMin + Math.floor(queueWait / 2);
      return {
        item,
        totalWait: totalEstimatedWait,
      };
    })
    .filter((f) => f.totalWait <= selectedMinutes)
    .sort((a, b) => a.totalWait - b.totalWait);

  const fastest = feasibleItems[0];
  const safest = feasibleItems.find((f) => f.totalWait <= Math.max(3, selectedMinutes - 3)) || feasibleItems[1] || fastest;
  const bestValue = feasibleItems
    .slice()
    .sort((a, b) => a.item.price - b.item.price)[0] || fastest;

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
              <Clock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
                TIME ATTACK MODE
              </h3>
              <p className="text-[11px] text-[#B7B7B7]">
                Food ready before your next class starts
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

        {/* Time Selector Chips */}
        <div className="my-4">
          <label className="text-xs font-bold text-[#FFFFFF] block mb-2">
            "I have exactly:"
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 8, 10, 15].map((mins) => (
              <button
                key={mins}
                onClick={() => setSelectedMinutes(mins)}
                className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center ${
                  selectedMinutes === mins
                    ? 'bg-[#39FF14] text-[#050505] shadow-[0_0_10px_#39FF14]'
                    : 'bg-[#111111] border border-[#222222] text-[#B7B7B7] hover:border-[#39FF14]'
                }`}
              >
                <span>{mins} MIN</span>
                <span className="text-[9px] font-normal opacity-80">Limit</span>
              </button>
            ))}
          </div>
        </div>

        {/* Intelligence Highlights */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-4">
          <div className="flex items-center justify-between text-xs text-[#777777] px-1">
            <span className="font-bold text-[#FFFFFF]">
              ⏱️ You have {selectedMinutes} minutes
            </span>
            <span className="text-[#39FF14] font-bold">{feasibleItems.length} safe choices</span>
          </div>

          {/* Highlight 1: Fastest Choice */}
          {fastest && (
            <div
              onClick={() => {
                onSelectFood(fastest.item);
                onClose();
              }}
              className="bg-[#111111] rounded-2xl p-3.5 border border-[#39FF14] transition-all cursor-pointer shadow-[0_0_10px_rgba(57,255,20,0.15)] group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#39FF14] bg-[#0B3D16]/60 border border-[#39FF14]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Fastest Choice
                </span>
                <span className="text-xs font-black text-[#39FF14]">
                  ~{fastest.totalWait} min total
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors">
                    {fastest.item.name}
                  </h4>
                  <p className="text-[11px] text-[#777777]">
                    {fastest.item.outletName} · Prep: {fastest.item.preparationTimeMin} min
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#39FF14]">₹{fastest.item.price}</span>
                  <div className="text-[10px] text-[#39FF14] font-bold flex items-center justify-end gap-0.5">
                    Order <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Highlight 2: Safest Choice */}
          {safest && safest.item.id !== fastest?.item.id && (
            <div
              onClick={() => {
                onSelectFood(safest.item);
                onClose();
              }}
              className="bg-[#111111] rounded-2xl p-3.5 border border-[#222222] hover:border-[#39FF14] transition-all cursor-pointer shadow-xs group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#7CFF5B] bg-[#0B3D16]/40 border border-[#7CFF5B]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Safest Choice
                </span>
                <span className="text-xs font-black text-[#7CFF5B]">
                  ~{safest.totalWait} min total
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF] group-hover:text-[#7CFF5B] transition-colors">
                    {safest.item.name}
                  </h4>
                  <p className="text-[11px] text-[#777777]">
                    {safest.item.outletName} · Zero queue risk
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#7CFF5B]">₹{safest.item.price}</span>
                  <div className="text-[10px] text-[#7CFF5B] font-bold flex items-center justify-end gap-0.5">
                    Order <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Highlight 3: Best Value */}
          {bestValue && bestValue.item.id !== fastest?.item.id && bestValue.item.id !== safest?.item.id && (
            <div
              onClick={() => {
                onSelectFood(bestValue.item);
                onClose();
              }}
              className="bg-[#111111] rounded-2xl p-3.5 border border-[#222222] hover:border-[#39FF14] transition-all cursor-pointer shadow-xs group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FFFFFF] bg-[#171717] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#39FF14]" /> Best Value
                </span>
                <span className="text-xs font-black text-[#FFFFFF]">
                  ~{bestValue.totalWait} min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors">
                    {bestValue.item.name}
                  </h4>
                  <p className="text-[11px] text-[#777777]">
                    {bestValue.item.outletName} · Lowest price
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#39FF14]">₹{bestValue.item.price}</span>
                  <div className="text-[10px] text-[#39FF14] font-bold flex items-center justify-end gap-0.5">
                    Order <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
