import React from 'react';
import { motion } from 'motion/react';
import { X, Tag, CreditCard, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem, Order, FoodOutlet } from '../../types';
import { localDb } from '../../data/localDatabase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  const [orderType, setOrderType] = React.useState<'PICKUP' | 'DINE_IN'>('PICKUP');
  const [paymentMethod, setPaymentMethod] = React.useState<'UPI' | 'CAMPUS_CARD' | 'CASH_COUNTER'>('UPI');
  const [couponCode, setCouponCode] = React.useState('');
  const [appliedCoupon, setAppliedCoupon] = React.useState<{ code: string; discount: number } | null>(null);
  const [couponMessage, setCouponMessage] = React.useState<string | null>(null);
  const [selectedOutlet, setSelectedOutlet] = React.useState<FoodOutlet>(localDb.getOutlets()[0]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  if (!isOpen) return null;

  const outlets = localDb.getOutlets();
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const campusFee = 0;
  const totalAmount = Math.max(0, subtotal - discount + campusFee);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponCode;
    const result = localDb.applyCoupon(code, subtotal);
    setCouponMessage(result.message);
    if (result.valid) {
      setAppliedCoupon({ code, discount: result.discount });
    } else {
      setAppliedCoupon(null);
    }
  };

  const handlePayAndPlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder = localDb.createOrder({
        items: cartItems,
        outletId: selectedOutlet.id,
        outletName: selectedOutlet.name,
        subtotal,
        discount,
        total: totalAmount,
        orderType,
        paymentMethod,
      });
      setIsProcessing(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 900);
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
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
          <div>
            <h3 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
              CAMPUS CHECKOUT
            </h3>
            <p className="text-[11px] text-[#B7B7B7]">
              {cartItems.length} items · Estimated Queue: <span className="text-[#39FF14] font-bold">~{selectedOutlet.estimatedQueueMin} min</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#B7B7B7] hover:text-[#FFFFFF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Checkout Details */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 my-3">
          {/* 1. Dining Mode */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setOrderType('PICKUP')}
              className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                orderType === 'PICKUP'
                  ? 'bg-[#39FF14] text-[#050505] border-[#39FF14] shadow-[0_0_8px_#39FF14]'
                  : 'bg-[#111111] text-[#B7B7B7] border-[#222222]'
              }`}
            >
              🏃 Express Pickup
            </button>
            <button
              onClick={() => setOrderType('DINE_IN')}
              className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                orderType === 'DINE_IN'
                  ? 'bg-[#39FF14] text-[#050505] border-[#39FF14] shadow-[0_0_8px_#39FF14]'
                  : 'bg-[#111111] text-[#B7B7B7] border-[#222222]'
              }`}
            >
              🍽️ Canteen Dine-In
            </button>
          </div>

          {/* 2. Select Outlet */}
          <div>
            <label className="text-xs font-bold text-[#FFFFFF] block mb-1.5">
              Pickup Outlet Location:
            </label>
            <select
              value={selectedOutlet.id}
              onChange={(e) => {
                const found = outlets.find((o) => o.id === e.target.value);
                if (found) setSelectedOutlet(found);
              }}
              className="w-full h-11 px-3 bg-[#111111] border border-[#222222] rounded-xl text-xs font-semibold text-[#FFFFFF] focus:outline-none focus:border-[#39FF14]"
            >
              {outlets.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} ({o.estimatedQueueMin} min queue · {o.crowdLevel})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Promo Coupon */}
          <div className="bg-[#111111] p-3 rounded-2xl border border-[#222222] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFFFFF]">
              <Tag className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>Campus Promo Code</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. CAMPUS50, PULSE20"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 h-9 px-3 bg-[#171717] border border-[#222222] rounded-xl text-xs font-bold text-[#FFFFFF] uppercase placeholder:text-[#777777] focus:outline-none focus:border-[#39FF14]"
              />
              <button
                onClick={() => handleApplyCoupon()}
                className="px-3 h-9 bg-[#39FF14] text-[#050505] rounded-xl text-xs font-black hover:bg-[#7CFF5B]"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <span className={`text-[10px] font-bold block ${appliedCoupon ? 'text-[#39FF14]' : 'text-[#FF4D4D]'}`}>
                {couponMessage}
              </span>
            )}
            <div className="flex gap-1.5 pt-1">
              {['CAMPUS50', 'PULSE20'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCouponCode(c);
                    handleApplyCoupon(c);
                  }}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#171717] text-[#39FF14] border border-[#39FF14]/30 hover:border-[#39FF14]"
                >
                  Use {c}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Payment Method */}
          <div>
            <label className="text-xs font-bold text-[#FFFFFF] block mb-1.5">
              Select Demo Payment Method:
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'UPI', label: 'UPI Instant (Google Pay / PhonePe Demo)', desc: 'Instant QR simulation' },
                { id: 'CAMPUS_CARD', label: 'Student RFID Campus SmartCard', desc: 'Auto-deduct from campus balance' },
                { id: 'CASH_COUNTER', label: 'Cash / Pay at Canteen Counter', desc: 'Pay when picking up order' },
              ].map((p) => {
                const isSelected = paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as 'UPI' | 'CAMPUS_CARD' | 'CASH_COUNTER')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-[#39FF14] bg-[#0B3D16]/30 text-[#FFFFFF] shadow-[0_0_8px_rgba(57,255,20,0.15)]'
                        : 'border-[#222222] bg-[#111111] text-[#777777]'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-[#FFFFFF] block">{p.label}</span>
                      <span className="text-[10px] text-[#777777]">{p.desc}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Bill Summary */}
          <div className="bg-[#111111] p-3 rounded-2xl border border-[#222222] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#777777]">
              <span>Items Total ({cartItems.length})</span>
              <span className="font-semibold text-[#FFFFFF]">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#39FF14] font-semibold">
                <span>Student Promo Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-[#777777]">
              <span>Campus Digital Platform Fee</span>
              <span className="font-semibold text-[#39FF14]">FREE (₹0)</span>
            </div>
            <div className="pt-2 border-t border-[#222222] flex justify-between text-sm font-black text-[#FFFFFF]">
              <span>TO PAY:</span>
              <span className="text-base text-[#39FF14] drop-shadow-[0_0_6px_rgba(57,255,20,0.5)]">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Place Order CTA */}
        <div className="pt-2">
          <button
            onClick={handlePayAndPlaceOrder}
            disabled={isProcessing}
            className="w-full h-12 rounded-2xl bg-[#39FF14] text-[#050505] font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(57,255,20,0.35)] hover:bg-[#7CFF5B] active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="animate-pulse">Securing Queue Token...</span>
            ) : (
              <>
                <span>Confirm & Place Order (₹{totalAmount})</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
          <span className="block text-center text-[10px] text-[#777777] mt-1.5">
            🔒 Demo Simulation · No real money charged
          </span>
        </div>
      </motion.div>
    </div>
  );
};
