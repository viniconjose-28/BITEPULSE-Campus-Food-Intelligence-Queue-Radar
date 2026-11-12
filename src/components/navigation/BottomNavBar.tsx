import React from 'react';
import { Home, Compass, ShoppingBag, Trophy, User } from 'lucide-react';
import { NavTab } from '../../types';

interface BottomNavBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'radar', label: 'Radar', icon: Compass },
    { id: 'order', label: 'Order', icon: ShoppingBag },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
    { id: 'profile', label: 'Passport', icon: User },
  ];

  return (
    <nav className="w-full bg-[#0B0B0B]/95 backdrop-blur-md border-t border-[#1C1C1C] px-2 py-1 z-30 select-none">
      <div className="grid grid-cols-5 items-center h-14">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center relative group transition-transform active:scale-95"
            >
              <div
                className={`relative p-1 rounded-full transition-colors ${
                  isActive ? 'text-[#39FF14]' : 'text-[#B7B7B7] group-hover:text-[#FFFFFF]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all ${
                    isActive
                      ? 'stroke-[2.5] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]'
                      : 'stroke-[1.8]'
                  }`}
                />
                {tab.id === 'order' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#39FF14] text-[#050505] text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold tracking-tight transition-colors ${
                  isActive ? 'text-[#39FF14] font-bold' : 'text-[#777777]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1 bg-[#39FF14] rounded-full mt-0.5 shadow-[0_0_6px_#39FF14]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
