import React from 'react';
import { motion } from 'motion/react';
import { X, Bell, Clock, Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../../types';
import { localDb } from '../../data/localDatabase';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateScreen: (target: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigateScreen,
}) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(localDb.getNotifications());

  React.useEffect(() => {
    if (isOpen) {
      setNotifications(localDb.getNotifications());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleItemClick = (n: NotificationItem) => {
    localDb.markNotificationRead(n.id);
    setNotifications(localDb.getNotifications());
    if (n.targetScreen) {
      onClose();
      onNavigateScreen(n.targetScreen);
    }
  };

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'QUEUE_DROP':
        return '🟢';
      case 'FOOD_RESCUE':
        return '♻️';
      case 'POINTS':
        return '🎉';
      case 'GROUP':
        return '👥';
      default:
        return '🔔';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end justify-center select-none">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-[430px] bg-[#0B0B0B] rounded-t-[32px] p-5 max-h-[85vh] flex flex-col shadow-2xl border-t border-[#1C1C1C]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0B3D16] border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14]">
              <Bell className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#FFFFFF] font-['Cabinet_Grotesk'] leading-tight">
                CAMPUS PULSE ALERTS
              </h3>
              <p className="text-[11px] text-[#B7B7B7]">
                Live queue drops, rescue deals & food notifications
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

        {/* List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 my-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleItemClick(n)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                n.isRead
                  ? 'bg-[#111111] border-[#1C1C1C]'
                  : 'bg-[#141A14] border-[#39FF14]/50 shadow-[0_0_8px_rgba(57,255,20,0.15)]'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#171717] border border-[#222222] flex items-center justify-center text-sm shrink-0">
                {getIconForType(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-[#FFFFFF] leading-snug">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-[#777777]">{n.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#B7B7B7] mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center border-t border-[#1C1C1C]">
          <span className="text-[10px] text-[#777777]">
            Local offline alert simulation powered by Android Notification System architecture
          </span>
        </div>
      </motion.div>
    </div>
  );
};
