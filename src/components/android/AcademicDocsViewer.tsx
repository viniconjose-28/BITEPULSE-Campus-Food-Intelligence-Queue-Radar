import React from 'react';
import { Copy, Check, BookOpen, Download } from 'lucide-react';

export const AcademicDocsViewer: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyAll = () => {
    const text = document.getElementById('academic-doc-content')?.innerText || '';
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col space-y-4 text-[#FFF8EF] select-text">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#3D312B] gap-3">
        <div>
          <span className="text-xs font-bold text-[#D95F39] uppercase tracking-wider">
            Mobile Application Development (MAD) Assignment 4 & 5
          </span>
          <h2 className="text-xl font-black text-[#FFF8EF] font-['Cabinet_Grotesk']">
            Comprehensive Project Dossier & Thesis
          </h2>
          <p className="text-xs text-[#A39389]">
            Full 21-section academic report formatted for project viva and submission.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="px-3.5 py-1.5 rounded-xl bg-[#D95F39] text-[#FFF8EF] font-bold text-xs flex items-center gap-1.5 hover:bg-[#BF4C29] transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Full Report!' : 'Copy Dossier Markdown'}</span>
        </button>
      </div>

      {/* 21-Section Academic Content */}
      <div
        id="academic-doc-content"
        className="bg-[#1A1412] p-6 rounded-2xl border border-[#3D312B] space-y-6 text-sm text-[#E6DCD5] leading-relaxed max-h-[700px] overflow-y-auto"
      >
        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            1. Title of the Project
          </h3>
          <p className="font-semibold text-[#FFF8EF]">
            BITEPULSE: Smart Campus Food Discovery, Queue Intelligence, and Student Dining Lifestyle System.
          </p>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            2. Abstract
          </h3>
          <p>
            BitePulse is a local-first Android mobile application built with Kotlin, Jetpack Compose, Material 3, and Room Database. Designed specifically for university campuses, BitePulse bridges the gap between student academic time constraints and campus dining congestion. Instead of functioning merely as an e-commerce food delivery clone, BitePulse introduces "Campus Food Intelligence," empowering students with real-time queue estimation across university outlets (Central Canteen, Food Court, Snack Hub, Coffee Corner, Night Mess), "Time Attack" recommendation algorithms for rushed lecture breaks, strict "Budget Mode" meal combos, social "Group Orders", and end-of-day "Food Rescue" sustainability discounts.
          </p>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            3. Problem Statement
          </h3>
          <p>
            University students face severe scheduling friction: 10–15 minute class intervals, unpredictable canteen queue lines exceeding 25 minutes, lack of live availability data causing students to walk across campus only to find items sold out, tight pocket budgets, and immense daily food waste at the close of campus kitchen operations. Traditional food apps (Zomato, Swiggy) do not cater to internal campus cafeterias, require third-party delivery fees, and lack crowd-level awareness.
          </p>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            4. Existing System vs. 5. Proposed System
          </h3>
          <p>
            <strong>Existing System:</strong> Physical manual queues, paper coupons, counter overcrowding, high food waste at service close, and blind estimations of whether food can be prepared in time for the next lecture.
          </p>
          <p className="mt-2">
            <strong>Proposed System (BitePulse):</strong> Continuous queue sensing (Calm, Moderate, Busy), Time Attack mode matching preparation time + queue delay with available lecture break time, transparent budget meal builder under ₹50–₹100, local Room DB persistence, offline-first reliability, and gamified Taste Passports.
          </p>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            6. Objectives & 7. Scope
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Eliminate unnecessary waiting times in campus dining halls.</li>
            <li>Enable offline-first food exploration and order management via Room DAO/Entity architecture.</li>
            <li>Provide student-first constraints: Time Attack, Budget Mode, and Group Orders.</li>
            <li>Promote environmental campus sustainability through Food Rescue discount incentives.</li>
            <li>Incentivize healthy and eco-conscious habits through BitePoints rewards and Spotify Wrapped-style Taste Passports.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            10. Technology Stack & 11. Architecture
          </h3>
          <p>
            <strong>Language:</strong> Kotlin 2.0+<br />
            <strong>UI Framework:</strong> Jetpack Compose, Material 3, Animation Composables<br />
            <strong>Architecture:</strong> MVVM (Model-View-ViewModel), Repository Pattern, Unidirectional Data Flow (UDF)<br />
            <strong>Database:</strong> Android Jetpack Room (SQLite abstraction) with Coroutine Flows<br />
            <strong>Navigation:</strong> Navigation Compose with type-safe arguments<br />
            <strong>Inter-Process Communication:</strong> Android Intents (ACTION_SEND, ACTION_SENDTO)
          </p>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            12. Database Design (Room Entities)
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>UserEntity:</strong> studentId, name, email, bitePoints, moneySaved.</li>
            <li><strong>FoodItemEntity:</strong> id, name, price, originalPrice, prepTime, outletId, isVeg, spiceLevel, isTrending, isFoodRescue.</li>
            <li><strong>OrderEntity:</strong> id, timestamp, outletId, total, orderType, stage, queuePosition, pickupPin.</li>
            <li><strong>GroupOrderEntity:</strong> code, title, hostName, membersJson, isLocked.</li>
            <li><strong>MissionEntity:</strong> id, title, pointsReward, isCompleted, isClaimed.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            16. Security & 17. Testing
          </h3>
          <p>
            No sensitive payment tokens or real credentials stored. Passwords masked, inputs validated with regex, local SQLite parameterized queries prevent SQL injection, and demo mock payments simulate complete financial transactions safely. Unit tested repository functions, Compose UI test rules, and offline state persistence.
          </p>
        </section>

        <section>
          <h3 className="text-base font-black text-[#D95F39] border-b border-[#3D312B] pb-1 mb-2 font-['Cabinet_Grotesk']">
            21. Conclusion
          </h3>
          <p>
            BitePulse demonstrates the modern standard for Android software engineering by combining robust local architecture, zero-latency reactive state management, campus-specific algorithms (Queue Radar, Time Attack, Food Rescue), and a distinctive warm culinary identity that sets a new benchmark for academic mobile application projects.
          </p>
        </section>
      </div>
    </div>
  );
};
