import React from 'react';
import { motion } from 'motion/react';
import { X, Flame, Clock, Heart, Plus, Minus, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { FoodItem, CustomizationOptions } from '../../types';
import { localDb } from '../../data/localDatabase';

interface FoodDetailModalProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (food: FoodItem, customization: CustomizationOptions, quantity: number) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  food,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [size, setSize] = React.useState<'Regular' | 'Large'>('Regular');
  const [spiceLevel, setSpiceLevel] = React.useState<'None' | 'Mild' | 'Medium' | 'Hot' | 'Extreme'>('Medium');
  const [selectedExtras, setSelectedExtras] = React.useState<{ name: string; price: number }[]>([]);
  const [removedIngredients, setRemovedIngredients] = React.useState<string[]>([]);
  const [quantity, setQuantity] = React.useState(1);
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    if (food) {
      setSize('Regular');
      setSpiceLevel(food.spiceLevel || 'Medium');
      setSelectedExtras([]);
      setRemovedIngredients([]);
      setQuantity(1);
      setIsFavorite(localDb.isFavorite(food.id));
    }
  }, [food]);

  if (!isOpen || !food) return null;

  const extraOptions = [
    { name: 'Extra Mozzarella / Cheddar', price: 20 },
    { name: 'Extra Mint Yogurt Dip', price: 10 },
    { name: 'Extra Grilled Paneer / Protein', price: 25 },
  ];

  const ingredientOptions = ['Raw Onions', 'Garlic Mayo', 'Green Chilies'];

  const toggleExtra = (extra: { name: string; price: number }) => {
    if (selectedExtras.some((e) => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const toggleRemove = (ing: string) => {
    if (removedIngredients.includes(ing)) {
      setRemovedIngredients(removedIngredients.filter((i) => i !== ing));
    } else {
      setRemovedIngredients([...removedIngredients, ing]);
    }
  };

  const handleToggleFavorite = () => {
    const nextState = localDb.toggleFavorite(food.id);
    setIsFavorite(nextState);
  };

  const sizeMultiplier = size === 'Large' ? 1.3 : 1.0;
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = Math.round(food.price * sizeMultiplier) + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(
      food,
      {
        size,
        spiceLevel,
        selectedExtras,
        removedIngredients,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end justify-center select-none">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-[430px] bg-[#0B0B0B] rounded-t-[32px] p-5 max-h-[90vh] flex flex-col shadow-2xl border-t border-[#1C1C1C]"
      >
        {/* Top Header / Image Bar */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-[#111111] border border-[#222222]">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/40 to-transparent" />

          {/* Close & Favorite triggers */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/90"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                isFavorite ? 'bg-[#39FF14] text-[#050505]' : 'bg-black/70 text-white hover:bg-black/90'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#050505]' : ''}`} />
            </button>
          </div>

          {/* Food Info on Image overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${food.isVegetarian ? 'bg-[#0B3D16] text-[#39FF14] border border-[#39FF14]/40' : 'bg-[#3D0B0B] text-[#FF4D4D] border border-[#FF4D4D]/40'}`}>
                {food.isVegetarian ? '🌱 Pure Veg' : '🍗 Non-Veg'}
              </span>
              <span className="text-[10px] bg-black/60 border border-white/10 px-2 py-0.5 rounded-full font-semibold">
                {food.caloriesKcal} kcal
              </span>
              <span className="text-[10px] bg-black/60 border border-white/10 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 text-[#39FF14]">
                <Clock className="w-3 h-3 text-[#39FF14]" /> {food.preparationTimeMin} min prep
              </span>
            </div>
            <h3 className="text-lg font-black tracking-tight leading-snug font-['Cabinet_Grotesk'] text-[#FFFFFF]">
              {food.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-3">
          <p className="text-xs text-[#B7B7B7] leading-relaxed">
            {food.description}
          </p>

          {/* 1. Size Selection */}
          <div>
            <label className="text-xs font-bold text-[#FFFFFF] block mb-2">
              Select Portion Size:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSize('Regular')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors ${
                  size === 'Regular'
                    ? 'border-[#39FF14] bg-[#0B3D16]/40 text-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.2)]'
                    : 'border-[#222222] bg-[#111111] text-[#B7B7B7]'
                }`}
              >
                <span>Regular</span>
                <span>₹{food.price}</span>
              </button>
              <button
                type="button"
                onClick={() => setSize('Large')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors ${
                  size === 'Large'
                    ? 'border-[#39FF14] bg-[#0B3D16]/40 text-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.2)]'
                    : 'border-[#222222] bg-[#111111] text-[#B7B7B7]'
                }`}
              >
                <span>Large Jumbo (+30%)</span>
                <span>₹{Math.round(food.price * 1.3)}</span>
              </button>
            </div>
          </div>

          {/* 2. Spice Level */}
          <div>
            <label className="text-xs font-bold text-[#FFFFFF] block mb-2 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#39FF14]" /> Spice Calibration:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['Mild', 'Medium', 'Hot', 'Extreme'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpiceLevel(lvl)}
                  className={`py-1.5 rounded-xl border text-[11px] font-bold transition-colors ${
                    spiceLevel === lvl
                      ? 'bg-[#39FF14] text-[#050505] border-[#39FF14] shadow-[0_0_8px_#39FF14]'
                      : 'bg-[#111111] border-[#222222] text-[#B7B7B7]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Add Extras */}
          <div>
            <label className="text-xs font-bold text-[#FFFFFF] block mb-2">
              Campus Add-ons & Extras:
            </label>
            <div className="space-y-1.5">
              {extraOptions.map((extra) => {
                const isSelected = selectedExtras.some((e) => e.name === extra.name);
                return (
                  <button
                    key={extra.name}
                    type="button"
                    onClick={() => toggleExtra(extra)}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-[#39FF14] bg-[#0B3D16]/30 text-[#FFFFFF]'
                        : 'border-[#222222] bg-[#111111] text-[#B7B7B7]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'bg-[#39FF14] border-[#39FF14] text-[#050505]' : 'border-[#444444]'}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{extra.name}</span>
                    </div>
                    <span className="font-black text-[#39FF14]">+₹{extra.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Remove Ingredients */}
          <div>
            <label className="text-xs font-bold text-[#FFFFFF] block mb-2">
              Exclude Ingredients (Optional):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ingredientOptions.map((ing) => {
                const isRemoved = removedIngredients.includes(ing);
                return (
                  <button
                    key={ing}
                    type="button"
                    onClick={() => toggleRemove(ing)}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-medium transition-colors ${
                      isRemoved
                        ? 'bg-[#1C1C1C] text-[#39FF14] border-[#39FF14]/50'
                        : 'bg-[#111111] text-[#777777] border-[#222222]'
                    }`}
                  >
                    {isRemoved ? `✕ No ${ing}` : ing}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between gap-3">
          {/* Quantity stepper */}
          <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] rounded-2xl p-1 h-12">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-xl bg-[#171717] flex items-center justify-center text-[#FFFFFF] hover:text-[#39FF14]"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-black text-[#FFFFFF]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-[#171717] flex items-center justify-center text-[#FFFFFF] hover:text-[#39FF14]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 h-12 rounded-2xl bg-[#39FF14] text-[#050505] font-black text-xs flex items-center justify-between px-4 shadow-[0_0_15px_rgba(57,255,20,0.35)] hover:bg-[#7CFF5B] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Cart</span>
            </div>
            <span className="text-sm font-black">₹{totalPrice}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
