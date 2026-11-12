import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Award,
  Sparkles,
  ShoppingBag,
  Heart,
  Settings,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
  Flame,
  Clock,
  DollarSign,
  Download,
} from 'lucide-react';
import { TastePassportData, Badge, Order } from '../../types';
import { localDb } from '../../data/localDatabase';

interface TastePassportScreenProps {
  onOpenOrderHistory: () => void;
  onOpenNotifications: () => void;
  onLogout: () => void;
  onTrackOrder: (order: Order) => void;
}

export const TastePassportScreen: React.FC<TastePassportScreenProps> = ({
  onOpenOrderHistory,
  onOpenNotifications,
  onLogout,
  onTrackOrder,
}) => {
  const [user, setUser] = React.useState<TastePassportData>(localDb.getUser());
  const [badges, setBadges] = React.useState<Badge[]>(localDb.getBadges());
  const [orders, setOrders] = React.useState<Order[]>(localDb.getOrders());
  const [selectedBadge, setSelectedBadge] = React.useState<Badge | null>(null);

  React.useEffect(() => {
    const unsub = localDb.subscribe(() => {
      setUser(localDb.getUser());
      setBadges(localDb.getBadges());
      setOrders(localDb.getOrders());
    });
    return unsub;
  }, []);

  const latestOrder = orders[0];

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto no-scrollbar select-none pb-6">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#1C1C1C]">
        <div>
          <span className="text-[10px] font-black tracking-widest text-[#39FF14] uppercase font-['Cabinet_Grotesk']">
            Student Food Profile
          </span>
          <h2 className="text-xl font-black text-[#FFFFFF] tracking-tight leading-none mt-0.5 font-['Cabinet_Grotesk']">
            TASTE PASSPORT
          </h2>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Passport Identity Header */}
        <div className="bg-[#111111] rounded-3xl p-5 border border-[#1C1C1C] flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#171717] border-2 border-[#39FF14] flex items-center justify-center text-2xl font-black text-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.3)]">
              {user.studentName.charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#39FF14] text-[#050505] font-black flex items-center justify-center text-xs">
              ✓
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk']">
              {user.studentName}
            </h3>
            <span className="text-xs text-[#777777] block">{user.studentEmail}</span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-black text-[#39FF14] bg-[#0B3D16]/60 border border-[#39FF14]/30 px-2 py-0.5 rounded-full">
                🪙 {user.bitePoints} BitePoints
              </span>
              <span className="text-[10px] text-[#FFFFFF] font-bold">
                Student Verified
              </span>
            </div>
          </div>
        </div>

        {/* Passport Metrics Grid */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider font-['Cabinet_Grotesk']">
              Personal Dining Dossier
            </h4>
            <span className="text-[10px] text-[#39FF14] font-bold">Fall Term</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#111111] p-3.5 rounded-2xl border border-[#1C1C1C]">
              <span className="text-[10px] text-[#777777] uppercase block">Foods Tried</span>
              <span className="text-2xl font-black text-[#39FF14] font-['Cabinet_Grotesk']">
                {user.foodsTriedCount}
              </span>
              <span className="text-[10px] text-[#B7B7B7] block mt-0.5">Top 5% Explorer</span>
            </div>

            <div className="bg-[#111111] p-3.5 rounded-2xl border border-[#1C1C1C]">
              <span className="text-[10px] text-[#777777] uppercase block">Favorite Genre</span>
              <span className="text-lg font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] truncate block">
                {user.favoriteCategory}
              </span>
              <span className="text-[10px] text-[#777777] block mt-0.5">Spice: {user.preferredSpiceLevel}</span>
            </div>

            <div className="bg-[#111111] p-3.5 rounded-2xl border border-[#1C1C1C]">
              <span className="text-[10px] text-[#777777] uppercase block">Money Saved</span>
              <span className="text-2xl font-black text-[#39FF14] font-['Cabinet_Grotesk']">
                ₹{user.moneySavedRupees}
              </span>
              <span className="text-[10px] text-[#777777] block mt-0.5">Via Promos & Rescue</span>
            </div>

            <div className="bg-[#111111] p-3.5 rounded-2xl border border-[#1C1C1C]">
              <span className="text-[10px] text-[#777777] uppercase block">Food Rescue Saves</span>
              <span className="text-2xl font-black text-[#7CFF5B] font-['Cabinet_Grotesk']">
                {user.foodRescueSavesCount}
              </span>
              <span className="text-[10px] text-[#777777] block mt-0.5">Meals Diverted</span>
            </div>
          </div>
        </div>

        {/* Gamified Food Badges */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider font-['Cabinet_Grotesk']">
              Gamified Passport Badges
            </h4>
            <span className="text-[10px] text-[#39FF14]">
              {badges.filter((b) => b.isUnlocked).length} / {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {badges.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBadge(b)}
                className={`p-2.5 rounded-2xl border text-center cursor-pointer transition-all ${
                  b.isUnlocked
                    ? 'bg-[#111111] border-[#39FF14]/40 hover:border-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.15)]'
                    : 'bg-[#111111]/40 border-dashed border-[#222222] opacity-40'
                }`}
              >
                <span className="text-2xl block mb-1">{b.icon}</span>
                <span className="text-[10px] font-bold text-[#FFFFFF] block line-clamp-1">
                  {b.title}
                </span>
                <span className="text-[9px] text-[#39FF14] block">
                  {b.isUnlocked ? 'Earned' : 'Locked'}
                </span>
              </div>
            ))}
          </div>

          {selectedBadge && (
            <div className="mt-2.5 p-3 bg-[#111111] rounded-2xl border border-[#39FF14] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedBadge.icon}</span>
                <div>
                  <h5 className="text-xs font-bold text-[#FFFFFF]">{selectedBadge.title}</h5>
                  <p className="text-[10px] text-[#B7B7B7]">{selectedBadge.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-xs text-[#777777] hover:text-[#FFFFFF] px-2 py-1 font-bold"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Latest Order Card */}
        {latestOrder && (
          <div className="bg-[#111111] rounded-3xl p-4 border border-[#1C1C1C]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#FFFFFF]">Recent Campus Order</span>
              <button
                onClick={() => onTrackOrder(latestOrder)}
                className="text-[11px] font-bold text-[#39FF14] hover:underline flex items-center gap-0.5"
              >
                View Ticket #{latestOrder.id} <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-[#777777]">
              <span>{latestOrder.outletName} · {latestOrder.items.length} items</span>
              <span className="font-black text-[#39FF14]">₹{latestOrder.total}</span>
            </div>
          </div>
        )}

        {/* Settings & Support Links */}
        <div className="bg-[#111111] rounded-3xl border border-[#1C1C1C] divide-y divide-[#1C1C1C] overflow-hidden">
          <a
            href="/api/download-zip"
            download="bitepulse_final_project.zip"
            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-[#FFFFFF] hover:bg-[#171717] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#39FF14]" /> Export Submission Project ZIP
            </span>
            <span className="text-[10px] text-[#39FF14] font-bold bg-[#0B3D16]/60 border border-[#39FF14]/30 px-2 py-0.5 rounded-full">
              Ready · ZIP
            </span>
          </a>
          <button
            onClick={onOpenNotifications}
            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-[#FFFFFF] hover:bg-[#171717] transition-colors"
          >
            <span>Campus Notification Alerts</span>
            <ChevronRight className="w-4 h-4 text-[#777777]" />
          </button>
          <button
            onClick={() => {
              window.location.href = 'mailto:support@bitepulse.campus?subject=BitePulse%20Support%20Request';
            }}
            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-[#FFFFFF] hover:bg-[#171717] transition-colors"
          >
            <span>Campus Support & Feedback (Email Intent)</span>
            <ChevronRight className="w-4 h-4 text-[#777777]" />
          </button>
          <button
            onClick={onLogout}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-[#FF4D4D] hover:bg-[#1C1111] transition-colors"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </span>
            <ChevronRight className="w-4 h-4 text-[#FF4D4D]" />
          </button>
        </div>
      </div>
    </div>
  );
};
