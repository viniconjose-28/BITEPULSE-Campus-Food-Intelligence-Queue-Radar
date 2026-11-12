import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface AndroidDeviceFrameProps {
  children: React.ReactNode;
}

export const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = React.useState('12:45');

  React.useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden select-none">
      {/* Android Hardware Frame (Google Pixel 9 style in Black + Neon Accents) */}
      <div className="relative w-full max-w-[430px] h-screen sm:h-[900px] sm:max-h-[96vh] bg-[#050505] sm:rounded-[50px] shadow-2xl sm:border-[8px] sm:border-[#141414] flex flex-col overflow-hidden ring-1 ring-[#39FF14]/20">
        
        {/* Camera cutout / Dynamic Pill */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0D0D0D] rounded-full z-40 hidden sm:flex items-center justify-center border border-[#1C1C1C]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#050505] mr-3"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]"></div>
        </div>

        {/* Android Status Bar */}
        <div className="w-full h-11 bg-transparent px-6 flex items-center justify-between text-xs font-semibold text-[#FFFFFF] z-30 select-none pt-1">
          <span className="font-mono text-[11px] tracking-tight">{currentTime}</span>
          <div className="flex items-center gap-2 text-[#FFFFFF]">
            <span className="text-[10px] font-bold tracking-wider text-[#39FF14]">5G</span>
            <Wifi className="w-3.5 h-3.5 text-[#B7B7B7]" />
            <Battery className="w-4 h-4 text-[#39FF14]" />
          </div>
        </div>

        {/* Application Screen Canvas */}
        <div className="flex-1 w-full overflow-hidden flex flex-col relative bg-[#050505]">
          {children}
        </div>

        {/* Android Gesture Bar */}
        <div className="w-full h-4 bg-[#050505] flex items-center justify-center pb-1 z-30 select-none">
          <div className="w-32 h-1 bg-[#FFFFFF]/25 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
