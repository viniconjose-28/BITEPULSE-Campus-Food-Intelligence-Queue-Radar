import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Share2, CheckCircle2, QrCode, AlertCircle, Sparkles, ChefHat, Bell } from 'lucide-react';
import { Order, OrderStage } from '../../types';
import { localDb } from '../../data/localDatabase';

interface OrderTrackerScreenProps {
  orderId?: string;
  onBack: () => void;
  onTriggerShareIntent: (order: Order) => void;
}

export const OrderTrackerScreen: React.FC<OrderTrackerScreenProps> = ({
  orderId,
  onBack,
  onTriggerShareIntent,
}) => {
  const [order, setOrder] = React.useState<Order | undefined>(() => {
    if (orderId) return localDb.getOrders().find((o) => o.id === orderId);
    return localDb.getActiveOrder() || localDb.getOrders()[0];
  });

  React.useEffect(() => {
    const unsub = localDb.subscribe(() => {
      if (orderId) {
        setOrder(localDb.getOrders().find((o) => o.id === orderId));
      } else {
        setOrder(localDb.getActiveOrder() || localDb.getOrders()[0]);
      }
    });
    return unsub;
  }, [orderId]);

  if (!order) {
    return (
      <div className="w-full h-full bg-[#050505] p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14] mb-4">
          <ChefHat className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#FFFFFF]">No Active Orders</h3>
        <p className="text-xs text-[#777777] mt-1 mb-6">
          Your first Bite is waiting. Explore the menu or Queue Radar!
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl bg-[#39FF14] text-[#050505] font-black text-xs shadow-[0_0_10px_#39FF14]"
        >
          Explore Food
        </button>
      </div>
    );
  }

  const stages: { key: OrderStage; label: string; desc: string }[] = [
    { key: 'RECEIVED', label: 'Order Received', desc: 'Ticket printed at kitchen' },
    { key: 'PREPARING', label: 'Preparing', desc: 'Chefs assembling your food' },
    { key: 'ALMOST_READY', label: 'Almost Ready', desc: 'Packaging & quality check' },
    { key: 'READY', label: 'Ready for Pickup', desc: 'Show PIN at the counter' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === order.stage);
  const activeIdx = currentStageIndex === -1 ? 3 : currentStageIndex;

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col select-none overflow-y-auto p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
        <button
          onClick={onBack}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#B7B7B7] hover:text-[#FFFFFF]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-[10px] font-black text-[#39FF14] tracking-wider uppercase block">
            Live Order Intelligence
          </span>
          <h2 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
            Order #{order.id}
          </h2>
        </div>
        <button
          onClick={() => onTriggerShareIntent(order)}
          title="Share via Android Intent"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#39FF14] hover:bg-[#111111] rounded-full"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Live Queue Radar Card */}
      <div className="my-4 bg-[#111111] rounded-3xl p-5 border border-[#1C1C1C] relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-ping" />
            {order.outletName}
          </span>
          <span className="text-[11px] font-bold text-[#B7B7B7] bg-[#171717] px-2.5 py-1 rounded-full border border-[#222222]">
            {order.orderType === 'PICKUP' ? 'Express Pickup' : 'Dine-In'}
          </span>
        </div>

        {/* Central Queue Metric Display */}
        <div className="flex items-center justify-around py-3 bg-[#171717] rounded-2xl border border-[#222222] mb-4">
          <div className="text-center">
            <span className="text-[10px] font-bold text-[#777777] uppercase block">
              Queue Position
            </span>
            <span className="text-3xl font-black text-[#39FF14] font-['Cabinet_Grotesk'] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
              {order.stage === 'READY' ? 'READY' : `#${order.queuePosition || 1}`}
            </span>
          </div>
          <div className="h-8 w-px bg-[#222222]" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-[#777777] uppercase block">
              Est. Preparation
            </span>
            <span className="text-3xl font-black text-[#FFFFFF] font-['Cabinet_Grotesk']">
              {order.stage === 'READY' ? '0 min' : `${order.estimatedReadyMin || 4} min`}
            </span>
          </div>
        </div>

        {/* Pickup Verification Token */}
        <div className="bg-[#0B3D16]/60 border border-[#39FF14]/40 text-[#FFFFFF] p-3 rounded-2xl flex items-center justify-between shadow-[0_0_12px_rgba(57,255,20,0.2)]">
          <div className="flex items-center gap-2.5">
            <QrCode className="w-5 h-5 text-[#39FF14]" />
            <div>
              <span className="text-[10px] text-[#B7B7B7] uppercase block font-semibold">
                Counter Pickup PIN
              </span>
              <span className="text-sm font-black tracking-widest text-[#39FF14]">
                PIN: {order.pickupPin}
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-[#39FF14] text-[#050505] font-black px-2 py-1 rounded-lg">
            Verify & Collect
          </span>
        </div>
      </div>

      {/* 4-Stage Animated Progress Tracker */}
      <div className="bg-[#111111] rounded-3xl p-5 border border-[#1C1C1C] mb-4">
        <h4 className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider mb-4">
          Live Preparation Pipeline
        </h4>

        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isDone = idx < activeIdx || order.stage === 'READY';
            const isCurrent = idx === activeIdx && order.stage !== 'READY';
            return (
              <div key={stage.key} className="flex items-start gap-3 relative">
                {/* Vertical connection */}
                {idx < stages.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-6 bottom-[-16px] w-0.5 transition-colors ${
                      isDone ? 'bg-[#39FF14]' : 'bg-[#222222]'
                    }`}
                  />
                )}

                {/* Status Dot */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-[#39FF14] text-[#050505] font-black shadow-[0_0_8px_#39FF14]'
                      : isCurrent
                      ? 'bg-[#111111] text-[#39FF14] border-2 border-[#39FF14] shadow-[0_0_10px_#39FF14] animate-pulse'
                      : 'bg-[#171717] border border-[#222222] text-[#777777]'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </div>

                {/* Labels */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-[#39FF14]' : isDone ? 'text-[#FFFFFF]' : 'text-[#777777]'
                      }`}
                    >
                      {stage.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] bg-[#0B3D16] text-[#39FF14] border border-[#39FF14]/30 font-black px-1.5 py-0.2 rounded">
                        In Progress
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#777777] block">
                    {stage.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ordered Items summary */}
      <div className="bg-[#111111] rounded-3xl p-4 border border-[#1C1C1C] space-y-2 mb-4">
        <h4 className="text-xs font-bold text-[#777777] uppercase tracking-wider">
          Items in this Ticket
        </h4>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#1C1C1C] last:border-0">
            <div>
              <span className="font-bold text-[#FFFFFF]">
                {item.quantity}x {item.foodItem.name}
              </span>
              <span className="text-[10px] text-[#777777] block">
                {item.customization.size} · Spice: {item.customization.spiceLevel}
              </span>
            </div>
            <span className="font-black text-[#39FF14]">₹{item.totalPrice}</span>
          </div>
        ))}
        <div className="pt-2 flex justify-between text-xs font-black text-[#FFFFFF]">
          <span>Total Paid ({order.paymentMethod}):</span>
          <span className="text-sm text-[#39FF14]">₹{order.total}</span>
        </div>
      </div>

      {/* Android Share Intent CTA */}
      <button
        onClick={() => onTriggerShareIntent(order)}
        className="w-full h-11 rounded-2xl bg-[#111111] border border-[#39FF14]/50 text-[#39FF14] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#39FF14] hover:text-[#050505] active:scale-95 transition-all shadow-[0_0_10px_rgba(57,255,20,0.15)]"
      >
        <Share2 className="w-4 h-4" />
        <span>Share Order via Android Intent</span>
      </button>
    </div>
  );
};
