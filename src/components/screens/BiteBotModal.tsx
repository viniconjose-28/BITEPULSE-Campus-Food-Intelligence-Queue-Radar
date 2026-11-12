import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Send, Bot, User, ArrowRight, Clock, DollarSign, Flame } from 'lucide-react';
import { BotMessage, INITIAL_BOT_MESSAGES, askBiteBot } from '../../utils/geminiBot';
import { FoodItem } from '../../types';

interface BiteBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (food: FoodItem) => void;
  onOpenRadar: () => void;
  onOpenRescue: () => void;
  onOpenTimeAttack: () => void;
  onOpenBudget: () => void;
}

export const BiteBotModal: React.FC<BiteBotModalProps> = ({
  isOpen,
  onClose,
  onSelectFood,
  onOpenRadar,
  onOpenRescue,
  onOpenTimeAttack,
  onOpenBudget,
}) => {
  const [messages, setMessages] = React.useState<BotMessage[]>(INITIAL_BOT_MESSAGES);
  const [inputText, setInputText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const chatBottomRef = React.useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'What can I eat under ₹100?',
    'I have 8 minutes before class',
    "What's trending now?",
    'Show Food Rescue items',
    'Where is the queue shortest?',
    'Healthy vegetarian picks',
  ];

  React.useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: BotMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await askBiteBot(query);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, response]);
      }, 400);
    } catch {
      setIsTyping(false);
    }
  };

  const handleAction = (type?: string) => {
    onClose();
    if (type === 'VIEW_RADAR') onOpenRadar();
    if (type === 'VIEW_RESCUE') onOpenRescue();
    if (type === 'VIEW_TIME_ATTACK') onOpenTimeAttack();
    if (type === 'VIEW_BUDGET') onOpenBudget();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end justify-center select-none">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-[430px] bg-[#0B0B0B] rounded-t-[32px] p-5 h-[85vh] flex flex-col shadow-2xl border-t border-[#1C1C1C]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0B3D16] border border-[#39FF14]/50 flex items-center justify-center text-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.3)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
                  BITEBOT AI ASSISTANT
                </h3>
                <span className="text-[9px] bg-[#0B3D16] text-[#39FF14] border border-[#39FF14]/30 font-bold px-1.5 py-0.2 rounded-full">
                  Online
                </span>
              </div>
              <p className="text-[10px] text-[#777777]">
                Campus craving & queue intelligence concierge
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

        {/* Message history */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0B3D16] border border-[#39FF14]/40 text-[#FFFFFF] rounded-br-xs'
                    : 'bg-[#111111] border border-[#1C1C1C] text-[#E6DCD5] rounded-bl-xs shadow-xs'
                }`}
              >
                <p>{msg.text}</p>

                {/* Embedded food recommendation cards */}
                {msg.recommendedFoods && msg.recommendedFoods.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#222222] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#777777] uppercase block">
                      Recommended for You:
                    </span>
                    {msg.recommendedFoods.map((food) => (
                      <div
                        key={food.id}
                        onClick={() => {
                          onSelectFood(food);
                          onClose();
                        }}
                        className="bg-[#171717] p-2 rounded-xl border border-[#222222] flex items-center justify-between cursor-pointer hover:border-[#39FF14] transition-all"
                      >
                        <div>
                          <span className="font-bold text-[#FFFFFF] text-[11px] block">{food.name}</span>
                          <span className="text-[9px] text-[#777777]">
                            {food.outletName} · {food.preparationTimeMin}m prep
                          </span>
                        </div>
                        <span className="font-black text-[#39FF14] text-xs">₹{food.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Shortcut */}
                {msg.actionType && (
                  <button
                    onClick={() => handleAction(msg.actionType)}
                    className="mt-2 text-[10px] font-black text-[#39FF14] flex items-center gap-1 hover:underline"
                  >
                    <span>Open dedicated view</span>
                    <ArrowRight className="w-3 h-3 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-2 bg-[#111111] rounded-2xl border border-[#222222] w-20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF5B] animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]/50 animate-bounce [animation-delay:300ms]" />
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="py-2 overflow-x-auto no-scrollbar flex gap-1.5 border-t border-[#1C1C1C]">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#111111] border border-[#222222] text-[10px] font-bold text-[#B7B7B7] hover:border-[#39FF14] hover:text-[#39FF14] transition-colors shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            placeholder="Ask BiteBot (e.g. food in 10 mins)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 h-11 px-3.5 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder:text-[#777777] focus:outline-none focus:border-[#39FF14]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-11 h-11 rounded-xl bg-[#39FF14] text-[#050505] flex items-center justify-center hover:bg-[#7CFF5B] disabled:opacity-30 transition-all shadow-[0_0_10px_rgba(57,255,20,0.3)]"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
