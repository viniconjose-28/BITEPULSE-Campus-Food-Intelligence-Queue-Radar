import React from 'react';
import { motion } from 'motion/react';
import { Compass, MapPin, Clock, Zap, ArrowRight, ShieldCheck, Flame, Users, Sparkles } from 'lucide-react';
import { FoodOutlet, CrowdLevel } from '../../types';
import { localDb } from '../../data/localDatabase';

interface RadarScreenProps {
  onOrderAheadAtOutlet: (outlet: FoodOutlet) => void;
}

export const RadarScreen: React.FC<RadarScreenProps> = ({ onOrderAheadAtOutlet }) => {
  const [activeTab, setActiveTab] = React.useState<'radar' | 'map'>('radar');
  const [outlets, setOutlets] = React.useState<FoodOutlet[]>(localDb.getOutlets());
  const [selectedMapOutlet, setSelectedMapOutlet] = React.useState<FoodOutlet | null>(null);

  React.useEffect(() => {
    const unsub = localDb.subscribe(() => {
      setOutlets(localDb.getOutlets());
    });
    return unsub;
  }, []);

  const getCrowdBadge = (crowd: CrowdLevel) => {
    switch (crowd) {
      case 'CALM':
        return { label: 'CALM', color: '#39FF14', bg: '#0B3D16', border: '#39FF14', dot: '🟢' };
      case 'MODERATE':
        return { label: 'MODERATE', color: '#FFD23F', bg: '#3D340B', border: '#FFD23F', dot: '🟡' };
      case 'BUSY':
        return { label: 'BUSY', color: '#FF4D4D', bg: '#3D0B0B', border: '#FF4D4D', dot: '🔴' };
      case 'VERY_BUSY':
        return { label: 'VERY BUSY', color: '#FF4D4D', bg: '#3D0B0B', border: '#FF4D4D', dot: '⛔' };
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto no-scrollbar select-none pb-6">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#1C1C1C]">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#39FF14] uppercase font-['Cabinet_Grotesk']">
              Live Queue Intelligence
            </span>
            <h2 className="text-xl font-black text-[#FFFFFF] tracking-tight leading-none mt-0.5 font-['Cabinet_Grotesk']">
              QUEUE RADAR
            </h2>
          </div>

          {/* Radar vs Map Switcher */}
          <div className="flex bg-[#111111] p-1 rounded-xl border border-[#1C1C1C]">
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'radar'
                  ? 'bg-[#39FF14] text-[#050505] shadow-[0_0_8px_#39FF14]'
                  : 'text-[#B7B7B7] hover:text-[#FFFFFF]'
              }`}
            >
              Radar Cards
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'map'
                  ? 'bg-[#39FF14] text-[#050505] shadow-[0_0_8px_#39FF14]'
                  : 'text-[#B7B7B7] hover:text-[#FFFFFF]'
              }`}
            >
              Campus Map
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#B7B7B7]">
          Live crowd sensors update cafeteria queue wait times in real-time.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {activeTab === 'radar' ? (
          /* RADAR CARDS VIEW */
          <div className="space-y-3.5">
            {outlets.map((outlet) => {
              const badge = getCrowdBadge(outlet.crowdLevel);
              return (
                <div
                  key={outlet.id}
                  className="bg-[#111111] rounded-3xl p-4.5 border border-[#1C1C1C] hover:border-[#39FF14] transition-all shadow-md"
                >
                  {/* Top line: Outlet Name & Crowd Status */}
                  <div className="flex items-start justify-between mb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-black text-[#FFFFFF] font-['Cabinet_Grotesk']">
                          {outlet.name}
                        </h3>
                        <span className="text-[10px] text-[#777777]">
                          · {outlet.distanceMeters}m ({outlet.walkingTimeMin}m walk)
                        </span>
                      </div>
                      <span className="text-[10px] text-[#B7B7B7]">
                        {outlet.location}
                      </span>
                    </div>

                    <span
                      className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border"
                      style={{ color: badge.color, backgroundColor: badge.bg, borderColor: `${badge.border}50` }}
                    >
                      <span>{badge.dot}</span>
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {/* Main Metric: Estimated Wait */}
                  <div className="bg-[#171717] rounded-2xl p-3 border border-[#222222] flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#777777] uppercase block">
                        Estimated Wait Time
                      </span>
                      <span className="text-2xl font-black text-[#39FF14] font-['Cabinet_Grotesk'] drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
                        {outlet.estimatedQueueMin} min
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#777777] uppercase block">
                        Fastest Item
                      </span>
                      <span className="text-xs font-black text-[#FFFFFF] flex items-center justify-end gap-1">
                        <Zap className="w-3 h-3 text-[#39FF14]" /> {outlet.fastestItem} ({outlet.fastestItemTimeMin}m)
                      </span>
                    </div>
                  </div>

                  {/* Popular Item highlight */}
                  <div className="text-xs text-[#B7B7B7] mb-3 flex items-center justify-between">
                    <span>
                      <strong className="text-[#FFFFFF]">Most Ordered:</strong> {outlet.popularItem}
                    </span>
                    <span className="text-[10px] text-[#777777]">Closes {outlet.closingTime}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onOrderAheadAtOutlet(outlet)}
                    className="w-full h-10 rounded-xl bg-[#39FF14] text-[#050505] font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(57,255,20,0.3)] hover:bg-[#7CFF5B] active:scale-[0.98] transition-transform"
                  >
                    <span>ORDER AHEAD</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* CAMPUS FOOD MAP VIEW */
          <div className="space-y-3">
            <div className="bg-[#111111] rounded-3xl p-4 border border-[#1C1C1C]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#FFFFFF] uppercase font-['Cabinet_Grotesk']">
                  Interactive Campus Grid
                </span>
                <span className="text-[10px] text-[#39FF14] font-bold">
                  Tap marker to inspect
                </span>
              </div>

              {/* Styled Vector Campus Map */}
              <div className="relative w-full h-64 bg-[#0A0E0A] rounded-2xl overflow-hidden border border-[#1E2E1E]">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="campusGridDark" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162216" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#campusGridDark)" />
                  {/* Walkways */}
                  <path d="M 50 0 L 150 120 L 250 180 L 380 260" stroke="#1A2B1A" strokeWidth="18" fill="none" strokeLinecap="round" />
                  <path d="M 120 40 L 40 220" stroke="#1A2B1A" strokeWidth="12" fill="none" strokeLinecap="round" />
                  {/* Buildings */}
                  <rect x="25" y="30" width="75" height="40" rx="6" fill="#131B13" stroke="#223322" strokeWidth="1" />
                  <text x="32" y="52" fontSize="7" fill="#4E6D4E" fontWeight="bold">BLOCK A</text>

                  <rect x="180" y="20" width="90" height="45" rx="6" fill="#131B13" stroke="#223322" strokeWidth="1" />
                  <text x="195" y="44" fontSize="7" fill="#4E6D4E" fontWeight="bold">LIBRARY</text>

                  <rect x="240" y="140" width="85" height="50" rx="6" fill="#131B13" stroke="#223322" strokeWidth="1" />
                  <text x="250" y="165" fontSize="7" fill="#4E6D4E" fontWeight="bold">WORKSHOP</text>

                  <rect x="110" y="190" width="95" height="45" rx="6" fill="#131B13" stroke="#223322" strokeWidth="1" />
                  <text x="125" y="215" fontSize="7" fill="#4E6D4E" fontWeight="bold">HOSTEL QUAD</text>
                </svg>

                {/* Outlet Map Markers */}
                {outlets.map((o) => {
                  const badge = getCrowdBadge(o.crowdLevel);
                  const isSelected = selectedMapOutlet?.id === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setSelectedMapOutlet(o)}
                      style={{ left: `${o.coordinates.x}%`, top: `${o.coordinates.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                      }`}
                    >
                      <div
                        className="px-2 py-1 rounded-xl shadow-md border-2 text-[10px] font-black flex items-center gap-1 whitespace-nowrap bg-[#0B0B0B]"
                        style={{
                          borderColor: badge.color,
                          color: '#FFFFFF',
                          boxShadow: `0 0 10px ${badge.color}50`,
                        }}
                      >
                        <MapPin className="w-3 h-3" style={{ color: badge.color }} />
                        <span>{o.shortName}</span>
                        <span className="font-extrabold" style={{ color: badge.color }}>
                          {o.estimatedQueueMin}m
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Map Outlet Inspection Card */}
              {selectedMapOutlet && (
                <div className="mt-3 p-3.5 bg-[#171717] rounded-2xl border border-[#222222] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-[#FFFFFF]">
                      {selectedMapOutlet.name}
                    </h4>
                    <span className="text-[10px] text-[#B7B7B7] block">
                      Queue: <span className="text-[#39FF14] font-bold">{selectedMapOutlet.estimatedQueueMin} min</span> · Fastest: {selectedMapOutlet.fastestItem}
                    </span>
                  </div>
                  <button
                    onClick={() => onOrderAheadAtOutlet(selectedMapOutlet)}
                    className="px-3 py-1.5 bg-[#39FF14] text-[#050505] rounded-xl text-xs font-black hover:bg-[#7CFF5B]"
                  >
                    Order Ahead
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
