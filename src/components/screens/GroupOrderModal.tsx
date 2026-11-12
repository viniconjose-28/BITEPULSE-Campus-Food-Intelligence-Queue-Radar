import React from 'react';
import { motion } from 'motion/react';
import { X, Users, Copy, Check, Plus, UserPlus, ShoppingBag, Sparkles } from 'lucide-react';
import { GroupOrder, FoodItem } from '../../types';
import { localDb } from '../../data/localDatabase';

interface GroupOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceGroupOrder: () => void;
  onOpenMenuForGroup: () => void;
}

export const GroupOrderModal: React.FC<GroupOrderModalProps> = ({
  isOpen,
  onClose,
  onPlaceGroupOrder,
  onOpenMenuForGroup,
}) => {
  const [group, setGroup] = React.useState<GroupOrder>(localDb.getGroupOrder());
  const [copied, setCopied] = React.useState(false);
  const [friendNameInput, setFriendNameInput] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setGroup(localDb.getGroupOrder());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(group.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateFriendJoin = () => {
    const friend = friendNameInput.trim() || 'Rohan (Hostel 205)';
    localDb.joinGroupOrder(group.code, friend);
    setGroup(localDb.getGroupOrder());
    setFriendNameInput('');
  };

  const groupTotal = group.members.reduce((sum, m) => sum + m.subtotal, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end justify-center select-none">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-[430px] bg-[#0B0B0B] rounded-t-[32px] p-5 max-h-[90vh] flex flex-col shadow-2xl border-t border-[#1C1C1C]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0B3D16] border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14]">
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
                {group.title}
              </h3>
              <p className="text-[11px] text-[#B7B7B7]">
                Host: {group.hostName} · Outlet: {group.outletName}
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

        {/* Group Code Card */}
        <div className="my-3 bg-[#111111] p-3.5 rounded-2xl border-2 border-dashed border-[#39FF14]/50 flex items-center justify-between shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          <div>
            <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">
              Share Squad Code with Friends
            </span>
            <span className="text-xl font-black text-[#39FF14] tracking-widest font-['Cabinet_Grotesk'] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
              {group.code}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-[#39FF14] text-[#050505] text-xs font-black flex items-center gap-1.5 shadow-[0_0_8px_#39FF14] active:scale-95 transition-transform hover:bg-[#7CFF5B]"
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Simulated Quick Join */}
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            placeholder="Friend name to simulate join..."
            value={friendNameInput}
            onChange={(e) => setFriendNameInput(e.target.value)}
            className="flex-1 h-9 px-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder:text-[#777777] focus:outline-none focus:border-[#39FF14]"
          />
          <button
            onClick={handleSimulateFriendJoin}
            className="px-3 h-9 bg-[#171717] border border-[#39FF14]/40 text-[#39FF14] rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-[#39FF14] hover:text-[#050505] transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Friend</span>
          </button>
        </div>

        {/* Members breakdown */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 my-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#777777] px-1">
            <span>SQUAD BASKET ({group.members.length} MEMBERS)</span>
            <span className="text-[#39FF14]">₹30 Squad Discount Applied</span>
          </div>

          {group.members.map((member) => (
            <div
              key={member.id}
              className="bg-[#111111] rounded-2xl p-3 border border-[#1C1C1C] flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between border-b border-[#1C1C1C] pb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full text-[11px] font-black text-[#050505] bg-[#39FF14] flex items-center justify-center">
                    {member.name.charAt(0)}
                  </span>
                  <span className="text-xs font-bold text-[#FFFFFF]">{member.name}</span>
                </div>
                <span className="text-xs font-black text-[#39FF14]">₹{member.subtotal}</span>
              </div>

              {/* Items */}
              <div className="space-y-1 pl-8">
                {member.items.length === 0 ? (
                  <span className="text-[11px] text-[#777777] italic">Deciding food...</span>
                ) : (
                  member.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] text-[#B7B7B7]">
                      <span>• {item.foodItem.name}</span>
                      <span className="font-semibold text-[#FFFFFF]">₹{item.totalPrice}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Group Footer & Checkout */}
        <div className="pt-3 border-t border-[#1C1C1C] space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#777777]">Squad Subtotal</span>
            <span className="font-bold text-[#FFFFFF]">₹{groupTotal}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#39FF14] font-semibold">Group Perk Discount</span>
            <span className="font-bold text-[#39FF14]">-₹30</span>
          </div>
          <div className="flex items-center justify-between text-sm font-black text-[#FFFFFF]">
            <span>TOTAL GROUP DUE:</span>
            <span className="text-base text-[#39FF14] drop-shadow-[0_0_6px_rgba(57,255,20,0.5)]">₹{Math.max(0, groupTotal - 30)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenMenuForGroup();
              }}
              className="h-11 rounded-xl bg-[#111111] border border-[#39FF14]/50 text-[#39FF14] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#39FF14] hover:text-[#050505] active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add My Item</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onPlaceGroupOrder();
              }}
              disabled={groupTotal === 0}
              className="h-11 rounded-xl bg-[#39FF14] text-[#050505] font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:bg-[#7CFF5B] disabled:opacity-40 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>Place Group Order</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
