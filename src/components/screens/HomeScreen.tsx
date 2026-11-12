import React from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Clock,
  DollarSign,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Users,
} from 'lucide-react';
import { FoodItem, FoodOutlet, TastePassportData, BiteMission } from '../../types';
import { localDb } from '../../data/localDatabase';

interface HomeScreenProps {
  onOpenRadar: () => void;
  onOpenTimeAttack: () => void;
  onOpenBudget: () => void;
  onOpenRescue: () => void;
  onOpenGroupOrder: () => void;
  onOpenNotifications: () => void;
  onSelectFood: (food: FoodItem) => void;
  onOpenRewards: () => void;
  onOpenCategory: (category: string) => void;
  onOpenBot: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenRadar,
  onOpenTimeAttack,
  onOpenBudget,
  onOpenRescue,
  onOpenGroupOrder,
  onOpenNotifications,
  onSelectFood,
  onOpenRewards,
  onOpenCategory,
  onOpenBot,
}) => {
  const [user, setUser] = React.useState<TastePassportData>(localDb.getUser());
  const [outlets, setOutlets] = React.useState<FoodOutlet[]>(localDb.getOutlets());
  const [trendingFoods, setTrendingFoods] = React.useState<FoodItem[]>(localDb.getTrendingFoodItems());
  const [missions, setMissions] = React.useState<BiteMission[]>(localDb.getMissions());
  const [unreadCount, setUnreadCount] = React.useState<number>(
    localDb.getNotifications().filter((n) => !n.isRead).length
  );

  React.useEffect(() => {
    const unsub = localDb.subscribe(() => {
      setUser(localDb.getUser());
      setOutlets(localDb.getOutlets());
      setTrendingFoods(localDb.getTrendingFoodItems());
      setMissions(localDb.getMissions());
      setUnreadCount(localDb.getNotifications().filter((n) => !n.isRead).length);
    });
    return unsub;
  }, []);

  const todayMission = missions.find((m) => !m.isClaimed) || missions[0];
  const allFoods = localDb.getAllFoodItems();
  const popularNearYou = allFoods.slice(0, 4);

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto no-scrollbar select-none pb-6">
      {/* 1. Top App Bar */}
      <div className="sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-md px-5 pt-3 pb-2 flex items-center justify-between border-b border-[#1C1C1C]">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black tracking-widest text-[#FFFFFF] font-['Cabinet_Grotesk']">
              BITE
            </span>
            <span className="text-sm font-black tracking-widest text-[#39FF14] font-['Cabinet_Grotesk'] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">
              PULSE
            </span>
          </div>
          <h2 className="text-xs font-bold text-[#B7B7B7] tracking-tight leading-none mt-0.5">
            Good afternoon, <span className="text-[#FFFFFF]">{user.studentName}</span> 👋
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* In-App BiteBot Concierge trigger */}
          <button
            onClick={onOpenBot}
            className="px-2.5 py-1.5 rounded-xl bg-[#111111] border border-[#39FF14]/40 text-[#39FF14] text-xs font-bold flex items-center gap-1 hover:border-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.2)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>BiteBot</span>
          </button>

          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-xl bg-[#111111] border border-[#1C1C1C] flex items-center justify-center text-[#B7B7B7] relative hover:text-[#FFFFFF] hover:border-[#39FF14] transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#39FF14] rounded-full shadow-[0_0_6px_#39FF14] animate-pulse" />
            )}
          </button>
        </div>
      </div>

      <div className="px-5 space-y-4 pt-3">
        {/* 2. UNIQUE FEATURE #1: LIVE CAMPUS PULSE (HERO FEATURE) */}
        <div className="bg-[#111111] rounded-3xl p-4.5 border border-[#1C1C1C] relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39FF14] shadow-[0_0_8px_#39FF14]"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#39FF14]">
                Campus Calm · Crowd Low
              </span>
            </div>
            <button
              onClick={onOpenRadar}
              className="text-[11px] font-bold text-[#B7B7B7] hover:text-[#39FF14] flex items-center gap-0.5 transition-colors"
            >
              Queue Radar <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-3xl font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] tracking-tight">
                4 min
              </span>
              <span className="text-xs text-[#B7B7B7] ml-2 font-medium">
                estimated campus average wait
              </span>
            </div>
            <span className="text-[11px] font-black text-[#39FF14] bg-[#0B3D16]/70 border border-[#39FF14]/40 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.2)]">
              Best Time: NOW
            </span>
          </div>

          {/* Quick Outlets Queue Pills */}
          <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#1C1C1C]">
            <div
              onClick={onOpenRadar}
              className="bg-[#171717] p-2 rounded-xl border border-[#222222] cursor-pointer hover:border-[#39FF14] transition-all text-center"
            >
              <span className="text-[10px] font-bold text-[#B7B7B7] block truncate">
                Central
              </span>
              <span className="text-xs font-black text-[#39FF14]">🟢 4 min</span>
            </div>
            <div
              onClick={onOpenRadar}
              className="bg-[#171717] p-2 rounded-xl border border-[#222222] cursor-pointer hover:border-[#FFD23F] transition-all text-center"
            >
              <span className="text-[10px] font-bold text-[#B7B7B7] block truncate">
                Food Court
              </span>
              <span className="text-xs font-black text-[#FFD23F]">🟡 12 min</span>
            </div>
            <div
              onClick={onOpenRadar}
              className="bg-[#171717] p-2 rounded-xl border border-[#222222] cursor-pointer hover:border-[#FF4D4D] transition-all text-center"
            >
              <span className="text-[10px] font-bold text-[#B7B7B7] block truncate">
                Snack Hub
              </span>
              <span className="text-xs font-black text-[#FF4D4D]">🔴 22 min</span>
            </div>
          </div>
        </div>

        {/* 3. UNIQUE FEATURE #11: SMART FOOD FINDER */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider font-['Cabinet_Grotesk']">
              What do you need right now?
            </h3>
            <span className="text-[10px] text-[#777777]">Smart Modes</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Time Attack Card */}
            <div
              onClick={onOpenTimeAttack}
              className="bg-[#111111] p-3 rounded-2xl border border-[#1C1C1C] hover:border-[#39FF14] cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B3D16]/50 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-black text-[#FFFFFF] block">⏱️ 10 MIN</span>
                  <span className="text-[10px] text-[#777777]">In a hurry</span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#39FF14]" />
            </div>

            {/* Budget Mode Card */}
            <div
              onClick={onOpenBudget}
              className="bg-[#111111] p-3 rounded-2xl border border-[#1C1C1C] hover:border-[#39FF14] cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B3D16]/50 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] group-hover:scale-105 transition-transform">
                  <DollarSign className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-black text-[#FFFFFF] block">💸 UNDER ₹100</span>
                  <span className="text-[10px] text-[#777777]">Budget combos</span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#39FF14]" />
            </div>

            {/* Food Rescue Card */}
            <div
              onClick={onOpenRescue}
              className="bg-[#111111] p-3 rounded-2xl border border-[#1C1C1C] hover:border-[#39FF14] cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B3D16]/50 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] group-hover:scale-105 transition-transform">
                  <span className="text-base">♻️</span>
                </div>
                <div>
                  <span className="text-xs font-black text-[#FFFFFF] block">FOOD RESCUE</span>
                  <span className="text-[10px] text-[#777777]">Save up to 40%</span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#39FF14]" />
            </div>

            {/* Group Squad Order Card */}
            <div
              onClick={onOpenGroupOrder}
              className="bg-[#111111] p-3 rounded-2xl border border-[#1C1C1C] hover:border-[#39FF14] cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B3D16]/50 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-black text-[#FFFFFF] block">SQUAD ORDER</span>
                  <span className="text-[10px] text-[#777777]">Code: #BP204</span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#39FF14]" />
            </div>
          </div>
        </div>

        {/* 4. UNIQUE FEATURE #5: FOOD PULSE (TRENDING NOW) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_6px_#39FF14] animate-pulse" />
              <h3 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider font-['Cabinet_Grotesk']">
                Food Pulse · Trending Now
              </h3>
            </div>
            <span className="text-[10px] text-[#777777]">Past 60 mins</span>
          </div>

          <div className="space-y-2">
            {trendingFoods.slice(0, 3).map((food, idx) => (
              <div
                key={food.id}
                onClick={() => onSelectFood(food)}
                className="bg-[#111111] p-3 rounded-2xl border border-[#1C1C1C] hover:border-[#39FF14] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#171717] shrink-0 border border-[#222222]">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-[#39FF14]">#{idx + 1}</span>
                      <h4 className="text-xs font-bold text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors line-clamp-1">
                        {food.name}
                      </h4>
                    </div>
                    <span className="text-[10px] text-[#39FF14] font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +{food.recentOrdersCount || 20} orders
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-[#39FF14]">₹{food.price}</span>
                  <span className="text-[10px] text-[#777777] block">{food.preparationTimeMin}m prep</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. UNIQUE FEATURE #9: TODAY'S MISSION & BITEPOINTS */}
        <div className="bg-[#171717] text-[#FFFFFF] rounded-3xl p-4 border border-[#222222] shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black tracking-wider text-[#39FF14] uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Today's Mission
            </span>
            <span className="text-xs font-black text-[#39FF14] bg-[#0B3D16]/60 border border-[#39FF14]/30 px-2 py-0.5 rounded-full">
              +{todayMission.pointsReward} BitePoints
            </span>
          </div>

          <h4 className="text-sm font-black mb-1 text-[#FFFFFF]">
            {todayMission.title}
          </h4>
          <p className="text-[11px] text-[#B7B7B7] mb-3">
            {todayMission.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-[#222222]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0B3D16] border border-[#39FF14]/50 flex items-center justify-center text-xs font-bold text-[#39FF14]">
                🪙
              </div>
              <div>
                <span className="text-[10px] text-[#777777] block">Wallet Balance</span>
                <span className="text-xs font-black text-[#39FF14] drop-shadow-[0_0_6px_rgba(57,255,20,0.5)]">
                  {user.bitePoints} pts
                </span>
              </div>
            </div>

            <button
              onClick={onOpenRewards}
              className="px-3 py-1.5 rounded-xl bg-[#39FF14] text-[#050505] text-[11px] font-black hover:bg-[#7CFF5B] transition-colors shadow-[0_0_10px_rgba(57,255,20,0.3)]"
            >
              Rewards Store
            </button>
          </div>
        </div>

        {/* 6. Popular Near You */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider font-['Cabinet_Grotesk']">
              Popular Near You · Central Canteen
            </h3>
            <span className="text-[10px] text-[#777777]">120m away</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {popularNearYou.map((food) => (
              <div
                key={food.id}
                onClick={() => onSelectFood(food)}
                className="bg-[#111111] rounded-2xl overflow-hidden border border-[#1C1C1C] hover:border-[#39FF14] cursor-pointer transition-all flex flex-col group"
              >
                <div className="w-full h-24 overflow-hidden relative bg-[#171717]">
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-1.5 right-1.5 text-[9px] bg-black/80 text-white font-bold px-1.5 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
                    {food.preparationTimeMin}m
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors line-clamp-1">
                    {food.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-[#39FF14]">₹{food.price}</span>
                    <span className="text-[10px] font-black text-[#39FF14] bg-[#0B3D16]/50 px-2 py-0.5 rounded border border-[#39FF14]/30">
                      Add +
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
