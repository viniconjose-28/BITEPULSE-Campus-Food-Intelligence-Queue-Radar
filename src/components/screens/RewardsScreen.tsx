import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Sparkles, CheckCircle2, Gift, Clock, AlertCircle, ArrowRight, Tag } from 'lucide-react';
import { TastePassportData, BiteMission, RewardItem } from '../../types';
import { localDb } from '../../data/localDatabase';

export const RewardsScreen: React.FC = () => {
  const [user, setUser] = React.useState<TastePassportData>(localDb.getUser());
  const [missions, setMissions] = React.useState<BiteMission[]>(localDb.getMissions());
  const [rewards, setRewards] = React.useState<RewardItem[]>(localDb.getRewards());
  const [redeemedCode, setRedeemedCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsub = localDb.subscribe(() => {
      setUser(localDb.getUser());
      setMissions(localDb.getMissions());
      setRewards(localDb.getRewards());
    });
    return unsub;
  }, []);

  const handleClaimMission = (id: string) => {
    localDb.claimMission(id);
  };

  const handleRedeemReward = (id: string) => {
    const res = localDb.redeemReward(id);
    if (res.success && res.voucher) {
      setRedeemedCode(res.voucher);
      setTimeout(() => setRedeemedCode(null), 4000);
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto no-scrollbar select-none pb-6">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#1C1C1C]">
        <div>
          <span className="text-[10px] font-black tracking-widest text-[#39FF14] uppercase font-['Cabinet_Grotesk']">
            Student Loyalty Program
          </span>
          <h2 className="text-xl font-black text-[#FFFFFF] tracking-tight leading-none mt-0.5 font-['Cabinet_Grotesk']">
            BITEPOINTS & PERKS
          </h2>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Wallet Balance Hero Card */}
        <div className="bg-[#171717] text-[#FFFFFF] rounded-3xl p-5 border border-[#39FF14]/30 shadow-[0_0_20px_rgba(57,255,20,0.15)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#39FF14] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Campus Pass Wallet
            </span>
            <span className="text-xs text-[#B7B7B7]">
              Level: Campus Gourmet
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-black text-[#39FF14] font-['Cabinet_Grotesk'] drop-shadow-[0_0_12px_rgba(57,255,20,0.6)]">
              {user.bitePoints}
            </span>
            <span className="text-sm font-bold text-[#FFFFFF]">
              BitePoints Earned
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#222222] text-center">
            <div className="bg-[#111111] p-2 rounded-xl border border-[#222222]">
              <span className="text-[10px] text-[#777777] block">Order</span>
              <span className="text-xs font-black text-[#39FF14]">+10 pts</span>
            </div>
            <div className="bg-[#111111] p-2 rounded-xl border border-[#222222]">
              <span className="text-[10px] text-[#777777] block">Group Order</span>
              <span className="text-xs font-black text-[#39FF14]">+15 pts</span>
            </div>
            <div className="bg-[#111111] p-2 rounded-xl border border-[#222222]">
              <span className="text-[10px] text-[#777777] block">Food Rescue</span>
              <span className="text-xs font-black text-[#39FF14]">+20 pts</span>
            </div>
          </div>
        </div>

        {/* Redeemed Banner Alert */}
        {redeemedCode && (
          <div className="bg-[#0B3D16] text-[#FFFFFF] border border-[#39FF14] p-3.5 rounded-2xl flex items-center justify-between shadow-[0_0_15px_rgba(57,255,20,0.3)]">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#39FF14] block">Perk Unlocked!</span>
              <span className="text-sm font-black tracking-wider text-[#FFFFFF]">CODE: {redeemedCode}</span>
            </div>
            <span className="text-[11px] bg-[#39FF14] text-[#050505] font-black px-2 py-1 rounded-lg">
              Use at Checkout
            </span>
          </div>
        )}

        {/* UNIQUE FEATURE #9: DAILY FOOD MISSIONS */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider font-['Cabinet_Grotesk']">
              Today's Food Missions
            </h3>
            <span className="text-[10px] text-[#777777]">Resets in 6 hrs</span>
          </div>

          <div className="space-y-2.5">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className="bg-[#111111] rounded-2xl p-3.5 border border-[#1C1C1C] flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-bold text-[#FFFFFF]">{mission.title}</span>
                    <span className="text-[10px] font-black text-[#39FF14] bg-[#0B3D16]/60 border border-[#39FF14]/30 px-1.5 py-0.2 rounded">
                      +{mission.pointsReward} pts
                    </span>
                  </div>
                  <span className="text-[10px] text-[#B7B7B7] block">{mission.description}</span>
                </div>

                <div>
                  {mission.isClaimed ? (
                    <span className="text-[11px] font-bold text-[#777777] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" /> Claimed
                    </span>
                  ) : mission.isCompleted ? (
                    <button
                      onClick={() => handleClaimMission(mission.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#39FF14] text-[#050505] text-xs font-black shadow-[0_0_10px_#39FF14] animate-bounce"
                    >
                      Claim +{mission.pointsReward}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaimMission(mission.id)}
                      className="px-2.5 py-1 rounded-xl bg-[#171717] border border-[#39FF14]/40 text-[#39FF14] text-[11px] font-bold hover:bg-[#39FF14] hover:text-[#050505] transition-colors"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UNIQUE FEATURE #10: REWARDS STORE */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider font-['Cabinet_Grotesk']">
              Rewards Catalog
            </h3>
            <span className="text-[10px] text-[#777777]">Redeem Points</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {rewards.map((reward) => {
              const canAfford = user.bitePoints >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className="bg-[#111111] rounded-2xl p-3 border border-[#1C1C1C] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] font-black uppercase text-[#39FF14] bg-[#0B3D16]/60 border border-[#39FF14]/30 px-1.5 py-0.5 rounded block w-fit mb-1.5">
                      {reward.pointsCost} Points
                    </span>
                    <h4 className="text-xs font-bold text-[#FFFFFF] leading-snug line-clamp-2">
                      {reward.title}
                    </h4>
                    <p className="text-[10px] text-[#777777] mt-1 line-clamp-2">
                      {reward.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRedeemReward(reward.id)}
                    disabled={!canAfford || reward.isRedeemed}
                    className={`mt-3 w-full py-1.5 rounded-xl text-xs font-bold transition-all ${
                      reward.isRedeemed
                        ? 'bg-[#1C1C1C] text-[#777777] cursor-not-allowed'
                        : canAfford
                        ? 'bg-[#39FF14] text-[#050505] font-black hover:bg-[#7CFF5B] shadow-[0_0_8px_#39FF14] active:scale-95'
                        : 'bg-[#171717] text-[#777777] border border-[#222222] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {reward.isRedeemed ? 'Redeemed' : canAfford ? 'Redeem Voucher' : 'Need More Pts'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
