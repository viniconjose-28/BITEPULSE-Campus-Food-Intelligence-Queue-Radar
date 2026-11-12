import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  Flame,
  Clock,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  X,
  Plus,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { FoodItem, CartItem } from '../../types';
import { localDb } from '../../data/localDatabase';

interface MenuOrderScreenProps {
  onSelectFood: (food: FoodItem) => void;
  onOpenCartCheckout: () => void;
  initialFilter?: string;
}

export const MenuOrderScreen: React.FC<MenuOrderScreenProps> = ({
  onSelectFood,
  onOpenCartCheckout,
  initialFilter,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>(initialFilter || 'All');
  const [vegFilter, setVegFilter] = React.useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const [priceCap, setPriceCap] = React.useState<number | null>(null);
  const [sortBy, setSortBy] = React.useState<'POPULAR' | 'PRICE_ASC' | 'TIME_ASC' | 'RATING'>('POPULAR');
  const [cartItems, setCartItems] = React.useState<CartItem[]>(localDb.getCart());

  React.useEffect(() => {
    const unsub = localDb.subscribe(() => {
      setCartItems(localDb.getCart());
    });
    return unsub;
  }, []);

  const categories = [
    'All',
    'Wraps',
    'Burgers',
    'Coffee',
    'Drinks',
    'Meals',
    'Breakfast',
    'Snacks',
    'Pizza',
    'Desserts',
    'Healthy',
    'Food Rescue',
  ];

  const allFoods = localDb.getAllFoodItems();

  const filteredFoods = allFoods
    .filter((f) => {
      if (selectedCategory !== 'All' && f.category !== selectedCategory) {
        return false;
      }
      if (vegFilter === 'VEG' && !f.isVegetarian) return false;
      if (vegFilter === 'NON_VEG' && f.isVegetarian) return false;
      if (priceCap !== null && f.price > priceCap) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesDesc = f.description.toLowerCase().includes(q);
        const matchesCat = f.category.toLowerCase().includes(q);
        const matchesOutlet = f.outletName.toLowerCase().includes(q);
        const matchesTag = f.dietaryTags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesOutlet && !matchesTag) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.price - b.price;
      if (sortBy === 'TIME_ASC') return a.preparationTimeMin - b.preparationTimeMin;
      if (sortBy === 'RATING') return b.rating - a.rating;
      return (b.recentOrdersCount || 0) - (a.recentOrdersCount || 0);
    });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto no-scrollbar select-none pb-20 relative">
      {/* Sticky Search & Filter Header */}
      <div className="sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#1C1C1C] space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#39FF14] uppercase font-['Cabinet_Grotesk']">
              Campus Outlets Menu
            </span>
            <h2 className="text-xl font-black text-[#FFFFFF] tracking-tight leading-none mt-0.5 font-['Cabinet_Grotesk']">
              EXPLORE FOOD
            </h2>
          </div>
          <span className="text-xs font-bold text-[#777777]">
            {filteredFoods.length} items
          </span>
        </div>

        {/* Search input bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#777777]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search dish, wrap, chai, maggi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-8 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder:text-[#777777] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#777777] hover:text-[#FFFFFF]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Horizontal Slider */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#39FF14] text-[#050505] shadow-[0_0_8px_#39FF14]'
                  : 'bg-[#111111] text-[#B7B7B7] border border-[#222222] hover:border-[#39FF14]'
              }`}
            >
              {cat === 'Food Rescue' ? '♻️ Food Rescue' : cat}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Veg, Price, Sort */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 text-[11px]">
          {/* Veg Selector */}
          <div className="flex bg-[#111111] rounded-lg border border-[#222222] p-0.5 shrink-0">
            <button
              onClick={() => setVegFilter('ALL')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${vegFilter === 'ALL' ? 'bg-[#222222] text-white' : 'text-[#777777]'}`}
            >
              All
            </button>
            <button
              onClick={() => setVegFilter('VEG')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${vegFilter === 'VEG' ? 'bg-[#0B3D16] text-[#39FF14]' : 'text-[#777777]'}`}
            >
              🌱 Veg
            </button>
            <button
              onClick={() => setVegFilter('NON_VEG')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${vegFilter === 'NON_VEG' ? 'bg-[#3D0B0B] text-[#FF4D4D]' : 'text-[#777777]'}`}
            >
              🍗 Non-Veg
            </button>
          </div>

          {/* Price Caps */}
          {[50, 100].map((cap) => (
            <button
              key={cap}
              onClick={() => setPriceCap(priceCap === cap ? null : cap)}
              className={`px-2 py-1 rounded-lg border shrink-0 font-bold transition-colors ${
                priceCap === cap
                  ? 'bg-[#39FF14] text-[#050505] border-[#39FF14]'
                  : 'bg-[#111111] text-[#B7B7B7] border-[#222222]'
              }`}
            >
              ≤ ₹{cap}
            </button>
          ))}

          {/* Sort Menu */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-7 px-2 bg-[#111111] border border-[#222222] rounded-lg font-bold text-[#B7B7B7] shrink-0 focus:outline-none focus:border-[#39FF14]"
          >
            <option value="POPULAR">Most Popular</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="TIME_ASC">Fastest Prep</option>
            <option value="RATING">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="p-5 space-y-3">
        {filteredFoods.length === 0 ? (
          <div className="py-12 text-center text-[#777777] space-y-2">
            <p className="text-sm font-bold text-[#FFFFFF]">No food items matched your search.</p>
            <p className="text-xs">Try clearing filters or search for another term.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setVegFilter('ALL');
                setPriceCap(null);
              }}
              className="px-4 py-1.5 rounded-xl bg-[#39FF14] text-[#050505] text-xs font-black mt-2 shadow-[0_0_10px_rgba(57,255,20,0.3)]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFoods.map((food) => (
            <div
              key={food.id}
              onClick={() => onSelectFood(food)}
              className="bg-[#111111] rounded-3xl p-3.5 border border-[#1C1C1C] hover:border-[#39FF14] transition-all cursor-pointer shadow-md flex gap-3 group"
            >
              {/* Image & Badges */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#171717] shrink-0 relative border border-[#222222]">
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                {food.isFoodRescue ? (
                  <span className="absolute top-1 left-1 text-[9px] bg-[#39FF14] text-[#050505] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    RESCUE
                  </span>
                ) : food.isTrending ? (
                  <span className="absolute top-1 left-1 text-[9px] bg-[#050505] border border-[#39FF14] text-[#39FF14] font-black px-1.5 py-0.5 rounded-md">
                    🔥 POPULAR
                  </span>
                ) : null}
              </div>

              {/* Dish info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`w-2 h-2 rounded-full ${food.isVegetarian ? 'bg-[#39FF14]' : 'bg-[#FF4D4D]'}`} />
                    <span className="text-[10px] font-bold text-[#777777]">
                      {food.outletName}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors line-clamp-1">
                    {food.name}
                  </h4>
                  <p className="text-[10px] text-[#B7B7B7] line-clamp-1 mt-0.5">
                    {food.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-[#39FF14]">₹{food.price}</span>
                    {food.originalPrice && (
                      <span className="text-xs text-[#777777] line-through font-medium">
                        ₹{food.originalPrice}
                      </span>
                    )}
                    <span className="text-[10px] text-[#777777] font-semibold flex items-center gap-0.5 ml-1">
                      <Clock className="w-3 h-3 text-[#39FF14]" /> {food.preparationTimeMin}m
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFood(food);
                    }}
                    className="px-3 py-1 rounded-xl bg-[#171717] border border-[#39FF14]/50 text-[#39FF14] text-xs font-black hover:bg-[#39FF14] hover:text-[#050505] transition-colors"
                  >
                    Customize +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Cart Sticky Pill Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 max-w-[430px] mx-auto px-5 z-30 pointer-events-none">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pointer-events-auto bg-[#171717] text-[#FFFFFF] rounded-2xl p-3 shadow-2xl flex items-center justify-between border border-[#39FF14]/40 shadow-[0_0_20px_rgba(57,255,20,0.25)]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#39FF14] text-[#050505] flex items-center justify-center font-black text-xs">
                {cartItems.length}
              </div>
              <div>
                <span className="text-xs font-black block text-[#FFFFFF]">Cart Subtotal: <span className="text-[#39FF14]">₹{cartTotal}</span></span>
                <span className="text-[10px] text-[#777777]">Instant counter queue token</span>
              </div>
            </div>

            <button
              onClick={onOpenCartCheckout}
              className="px-4 py-2 rounded-xl bg-[#39FF14] text-[#050505] text-xs font-black hover:bg-[#7CFF5B] flex items-center gap-1 active:scale-95 transition-transform shadow-[0_0_10px_#39FF14]"
            >
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
