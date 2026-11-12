import React from 'react';
import { motion } from 'motion/react';
import { X, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';
import { FoodItem } from '../../types';
import { localDb } from '../../data/localDatabase';

interface BudgetModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (food: FoodItem) => void;
  onAddComboToCart: (items: FoodItem[]) => void;
}

export const BudgetModeModal: React.FC<BudgetModeModalProps> = ({
  isOpen,
  onClose,
  onSelectFood,
  onAddComboToCart,
}) => {
  const [selectedBudget, setSelectedBudget] = React.useState<number>(100);
  const [comboAdded, setComboAdded] = React.useState(false);

  if (!isOpen) return null;

  const allFoods = localDb.getAllFoodItems();

  const budgetCombos: Record<number, { title: string; items: FoodItem[]; total: number; savings: string }> = {
    50: {
      title: 'Quick Chai & Samosa Refuel',
      items: [
        allFoods.find((f) => f.id === 'food_6')!,
        allFoods.find((f) => f.id === 'food_18')!,
        allFoods.find((f) => f.id === 'rescue_2') || allFoods.find((f) => f.id === 'food_14')!,
      ].filter(Boolean),
      total: 50,
      savings: 'Save ₹15 vs normal retail',
    },
    75: {
      title: 'Crispy Dosa or Burger Standalone',
      items: [
        allFoods.find((f) => f.id === 'food_3')!,
      ].filter(Boolean),
      total: 75,
      savings: 'Satisfying hot meal',
    },
    100: {
      title: 'The Legendary ₹100 Triple Power Combo',
      items: [
        allFoods.find((f) => f.id === 'food_9')!,
        allFoods.find((f) => f.id === 'food_7')!,
        allFoods.find((f) => f.id === 'food_18')!,
      ].filter(Boolean),
      total: 100,
      savings: 'Full meal + drink + dessert',
    },
    150: {
      title: 'Campus Feast: Wrap, Cold Coffee & Brownie',
      items: [
        allFoods.find((f) => f.id === 'food_1')!,
        allFoods.find((f) => f.id === 'food_17')!,
      ].filter(Boolean),
      total: 150,
      savings: 'Hostel favorite combo',
    },
    200: {
      title: 'Squad Power Thali & Shakes',
      items: [
        allFoods.find((f) => f.id === 'food_23')!,
        allFoods.find((f) => f.id === 'food_5')!,
      ].filter(Boolean),
      total: 210,
      savings: 'Ultimate heavy dinner',
    },
  };

  const currentCombo = budgetCombos[selectedBudget] || budgetCombos[100];
  const singleItemsUnderBudget = allFoods.filter((f) => f.price <= selectedBudget).slice(0, 4);

  const handleOrderCombo = () => {
    onAddComboToCart(currentCombo.items);
    setComboAdded(true);
    setTimeout(() => {
      setComboAdded(false);
      onClose();
    }, 1200);
  };

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
              <DollarSign className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
                BUDGET MODE
              </h3>
              <p className="text-[11px] text-[#B7B7B7]">
                Zero-overspend campus meal bundles
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

        {/* Budget Selector Pills */}
        <div className="my-4">
          <label className="text-xs font-bold text-[#FFFFFF] block mb-2">
            Select Your Maximum Wallet Budget:
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[50, 75, 100, 150, 200].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBudget(b)}
                className={`py-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center ${
                  selectedBudget === b
                    ? 'bg-[#39FF14] text-[#050505] shadow-[0_0_10px_#39FF14]'
                    : 'bg-[#111111] border border-[#222222] text-[#B7B7B7] hover:border-[#39FF14]'
                }`}
              >
                <span>₹{b}</span>
                <span className="text-[9px] font-normal opacity-80">{b === 200 ? 'Max' : 'Cap'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Curated Combo Card */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-4">
          <div className="bg-[#111111] rounded-2xl p-4 border border-[#39FF14]/60 shadow-[0_0_15px_rgba(57,255,20,0.15)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#39FF14] bg-[#0B3D16]/60 border border-[#39FF14]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> ₹{selectedBudget} Student Mode
              </span>
              <span className="text-xs font-black text-[#39FF14]">
                Exact ₹{currentCombo.total}
              </span>
            </div>

            <h4 className="text-sm font-extrabold text-[#FFFFFF] mb-2">
              {currentCombo.title}
            </h4>

            {/* Meal Items Breakdown */}
            <div className="space-y-1.5 bg-[#171717] p-2.5 rounded-xl border border-[#222222] mb-3">
              {currentCombo.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-[#FFFFFF]">
                  <span className="font-semibold">{item.name}</span>
                  <span className="font-black text-[#39FF14]">₹{item.price}</span>
                </div>
              ))}
              <div className="pt-1.5 border-t border-[#222222] flex items-center justify-between text-xs font-black text-[#FFFFFF]">
                <span>TOTAL BUNDLE:</span>
                <span className="text-[#39FF14] text-sm drop-shadow-[0_0_6px_rgba(57,255,20,0.5)]">₹{currentCombo.total}</span>
              </div>
            </div>

            <button
              onClick={handleOrderCombo}
              className={`w-full h-10 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(57,255,20,0.25)] ${
                comboAdded
                  ? 'bg-[#39FF14] text-[#050505]'
                  : 'bg-[#39FF14] text-[#050505] hover:bg-[#7CFF5B] active:scale-[0.98]'
              }`}
            >
              {comboAdded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" /> Combo Added to Cart!
                </>
              ) : (
                <>Add ₹{currentCombo.total} Combo to Cart</>
              )}
            </button>
          </div>

          {/* Standalone Items Under Budget */}
          <div>
            <h5 className="text-xs font-bold text-[#777777] mb-2 px-1 uppercase tracking-wider">
              Single Items Under ₹{selectedBudget}
            </h5>
            <div className="space-y-2">
              {singleItemsUnderBudget.map((food) => (
                <div
                  key={food.id}
                  onClick={() => {
                    onSelectFood(food);
                    onClose();
                  }}
                  className="bg-[#111111] p-2.5 rounded-xl border border-[#222222] flex items-center justify-between cursor-pointer hover:border-[#39FF14] transition-all"
                >
                  <div>
                    <span className="text-xs font-bold text-[#FFFFFF] block">{food.name}</span>
                    <span className="text-[10px] text-[#777777]">{food.outletName} · {food.preparationTimeMin}m</span>
                  </div>
                  <span className="text-xs font-black text-[#39FF14]">₹{food.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
