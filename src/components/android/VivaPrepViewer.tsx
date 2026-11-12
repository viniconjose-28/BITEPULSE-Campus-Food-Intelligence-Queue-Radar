import React from 'react';
import { Search, HelpCircle, CheckCircle2, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const VIVA_QUESTIONS = [
  {
    id: 1,
    category: 'Kotlin',
    question: 'What makes Kotlin better suited for Android than Java?',
    answer: 'Kotlin offers null-safety (eliminating NullPointerExceptions), concise syntax (data classes, lambdas), extension functions, and native coroutine support for asynchronous programming without blocking threads.',
  },
  {
    id: 2,
    category: 'Jetpack Compose',
    question: 'What is the core difference between Jetpack Compose and traditional XML layouts?',
    answer: 'Jetpack Compose is a declarative UI toolkit where the UI is a direct function of state. When state changes, Compose automatically recomposes only affected composables, eliminating findViewById and imperative UI manipulation.',
  },
  {
    id: 3,
    category: 'MVVM',
    question: 'Why did you choose MVVM architecture for BitePulse?',
    answer: 'MVVM cleanly separates concerns: Model manages data, View (Compose) displays UI, and ViewModel retains state across configuration changes (like screen rotation), exposing observable StateFlows.',
  },
  {
    id: 4,
    category: 'Room Database',
    question: 'What is Room Database and why is it preferred over raw SQLite?',
    answer: 'Room is an abstraction layer over SQLite. It provides compile-time verification of SQL queries, reduces boilerplate, and seamlessly integrates with Kotlin Coroutines and Flows for reactive real-time queries.',
  },
  {
    id: 5,
    category: 'DAO',
    question: 'What is the role of a DAO (Data Access Object) in Room?',
    answer: 'A DAO defines the database operations (CRUD) using annotations such as @Insert, @Update, @Delete, and @Query. It maps database tables to Kotlin objects and returns reactive Flow streams.',
  },
  {
    id: 6,
    category: 'Repository',
    question: 'Why do we need a Repository layer between ViewModel and Room?',
    answer: 'The Repository acts as a single source of truth, abstracting whether data comes from a local Room database, cache, or remote network API, making the codebase modular and testable.',
  },
  {
    id: 7,
    category: 'ViewModel',
    question: 'How does ViewModel survive configuration changes?',
    answer: 'A ViewModel is retained in memory by the Android ViewModelStoreOwner until the hosting Activity is completely finished, preventing unnecessary data reloading during orientation changes.',
  },
  {
    id: 8,
    category: 'Coroutines',
    question: 'What are Kotlin Coroutines and what role do they play in Room?',
    answer: 'Coroutines are lightweight threads used for non-blocking asynchronous operations. In Room, suspend functions and Flows execute database reads and writes off the main UI thread to prevent Application Not Responding (ANR) dialogs.',
  },
  {
    id: 9,
    category: 'Navigation',
    question: 'How does Navigation Compose manage screen transitions?',
    answer: 'Navigation Compose uses a NavHost and NavController where each screen is associated with a route string. Composable destinations are swapped declaratively on a navigation backstack.',
  },
  {
    id: 10,
    category: 'Activities',
    question: 'What is the role of MainActivity in a single-activity Jetpack Compose app?',
    answer: 'MainActivity acts as the single window container that calls setContent { ... } to host the Compose hierarchy and initialize application-level lifecycles.',
  },
  {
    id: 11,
    category: 'Intents',
    question: 'How did you implement Android Intents in BitePulse?',
    answer: 'We implemented explicit and implicit Intents: Intent.ACTION_SEND to share order status (#BP1042) to social or chat apps, and Intent.ACTION_SENDTO to trigger campus mail clients for feedback.',
  },
  {
    id: 12,
    category: 'CRUD',
    question: 'Where are CRUD operations performed in BitePulse?',
    answer: 'Create: Adding food to cart and generating orders. Read: Querying menu, queue radar, and past orders. Update: Modifying cart item quantities and order stages. Delete: Removing items from cart.',
  },
  {
    id: 13,
    category: 'Offline-First',
    question: 'What does "Offline-First" mean in BitePulse?',
    answer: 'The core functionality (discovering food, checking queues, building combos, adding to cart, placing mock orders) operates completely without an active internet connection using seeded local database persistence.',
  },
  {
    id: 14,
    category: 'Queue Intelligence',
    question: 'How does Queue Radar calculate estimated wait time?',
    answer: 'It models outlet crowd levels (Calm: ~4m, Moderate: ~12m, Busy: ~22m) combined with individual dish kitchen preparation times to calculate realistic wait times for students.',
  },
  {
    id: 15,
    category: 'Time Attack',
    question: 'Explain the algorithmic concept behind "Time Attack Mode".',
    answer: 'When a student enters their available break time (e.g. 10 minutes), the algorithm filters items where [Prep Time + Queue Delay <= Break Time] and highlights fastest and safest choices.',
  },
  {
    id: 16,
    category: 'Budget Mode',
    question: 'How does Budget Mode benefit college students?',
    answer: 'It prevents overspending by assembling complete nutritional combos (e.g., Sandwich + Soda + Cookie = exact ₹100) within designated student pocket allowances (₹50 to ₹200).',
  },
  {
    id: 17,
    category: 'Group Orders',
    question: 'How does the Group Order feature function locally?',
    answer: 'A host creates a room squad with a 5-character code (e.g. #BP204). Friends join the ticket, add their selections with individual subtotal tallies, apply group discounts, and split the final bill.',
  },
  {
    id: 18,
    category: 'Food Rescue',
    question: 'What is the purpose of the Food Rescue feature?',
    answer: 'It addresses campus food sustainability by automatically offering 35%-42% discounts on fresh surplus cafeteria meals 1-2 hours before kitchen service closes.',
  },
  {
    id: 19,
    category: 'Taste Passport',
    question: 'Why did you design a Taste Passport instead of a standard profile screen?',
    answer: 'Inspired by Spotify Wrapped, it gamifies dining with metrics (foods tried, money saved, waste diverted) and unlockable badges (Burger Explorer, Spice Hunter) to increase user engagement.',
  },
  {
    id: 20,
    category: 'BitePoints',
    question: 'How does the BitePoints loyalty system work?',
    answer: 'Students earn points for positive campus actions (orders +10, group orders +15, food rescue +20, missions +30) and redeem them for free toppings and meal vouchers in the Rewards Store.',
  },
  {
    id: 21,
    category: 'AI Assistant',
    question: 'How does BiteBot handle situations where Gemini API is unavailable?',
    answer: 'BiteBot employs an offline rule-based natural language parser that recognizes intents (budget, time constraints, trending, food rescue, vegan) and returns structured meal recommendation cards.',
  },
  {
    id: 22,
    category: 'Campus Map',
    question: 'How does the Campus Food Map function without a paid Google Maps API key?',
    answer: 'It renders a custom vector canvas of the university campus layout with interactive markers showing distance, walking times, and color-coded queue status.',
  },
  {
    id: 23,
    category: 'Security',
    question: 'What security practices are demonstrated in this application?',
    answer: 'Password masking, email regex validation, safe parameterized queries in SQLite, zero storage of real credit card numbers, and demo-only payment simulation.',
  },
  {
    id: 24,
    category: 'State Management',
    question: 'What is StateFlow in Kotlin Coroutines?',
    answer: 'StateFlow is a state-holder observable flow that emits the current and new state updates to its collectors, acting as a modern, lifecycle-aware alternative to LiveData.',
  },
  {
    id: 25,
    category: 'Design Identity',
    question: 'Why was blue strictly avoided in BitePulse?',
    answer: 'Blue is a clinical corporate/tech color that depresses appetite. BitePulse uses warm food-centric tones (Warm Cream #FFF8EF, Terracotta #D95F39, Burnt Orange #F28C28, Espresso #2B211C) for a premium culinary feel.',
  },
  {
    id: 26,
    category: 'Performance',
    question: 'How do you optimize Jetpack Compose performance and prevent lagging?',
    answer: 'By using LazyColumn/LazyRow for lazy list virtualization, remembering expensive calculations with remember {}, avoiding reading unstable state in parent composables, and using keys for list items.',
  },
  {
    id: 27,
    category: 'Notifications',
    question: 'How does the local notification simulation work?',
    answer: 'Local broadcasts model queue status changes (e.g., "Queue dropped to 4 min at Central Canteen") and order stage advancements without requiring an external Firebase Cloud Messaging server.',
  },
  {
    id: 28,
    category: 'Why BitePulse',
    question: 'Why is BitePulse a novel contribution for MAD Assignment 4 & 5?',
    answer: 'Because it avoids being another generic Zomato clone and invents "Campus Food Intelligence" addressing the unique friction points of students: queues, 10-minute class breaks, tight budgets, and food rescue.',
  },
  {
    id: 29,
    category: 'Testing',
    question: 'What testing strategies should be applied to an Android app like BitePulse?',
    answer: 'Unit tests for Repository/ViewModel logic using JUnit and MockK, instrumented Compose UI tests using composeTestRule, and SQLite Room testing using in-memory databases.',
  },
  {
    id: 30,
    category: 'Future Scope',
    question: 'What are future enhancements for BitePulse in a production campus deployment?',
    answer: 'Real IoT camera queue length detection via Computer Vision, integration with university RFID student cards via Android NFC, and synchronization with lecture timetable systems.',
  },
];

export const VivaPrepViewer: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [expandedId, setExpandedId] = React.useState<number | null>(1);

  const categories = ['All', 'Kotlin', 'Jetpack Compose', 'MVVM', 'Room Database', 'Coroutines', 'Intents', 'Queue Intelligence'];

  const filtered = VIVA_QUESTIONS.filter((q) => {
    if (selectedCategory !== 'All' && !q.category.includes(selectedCategory)) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return q.question.toLowerCase().includes(s) || q.answer.toLowerCase().includes(s) || q.category.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col space-y-4 text-[#FFF8EF] select-text">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#3D312B] gap-3">
        <div>
          <span className="text-xs font-bold text-[#D95F39] uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Viva Examination Defense Guide
          </span>
          <h2 className="text-xl font-black text-[#FFF8EF] font-['Cabinet_Grotesk']">
            30 Comprehensive Viva Questions & Answers
          </h2>
          <p className="text-xs text-[#A39389]">
            Targeted technical questions covering Android, Kotlin, Room, MVVM, and BitePulse concepts.
          </p>
        </div>

        <span className="text-xs font-mono text-[#D95F39] bg-[#D95F39]/10 px-3 py-1 rounded-lg border border-[#D95F39]/20 font-bold">
          {filtered.length} Questions Displayed
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap gap-2 items-center justify-between bg-[#1A1412] p-3 rounded-xl border border-[#3D312B]">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#7A6A60]" />
          <input
            type="text"
            placeholder="Search viva topic, question or answer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-[#241A17] border border-[#3D312B] rounded-lg text-xs text-[#FFF8EF] placeholder:text-[#7A6A60] focus:outline-none focus:border-[#D95F39]"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-[#D95F39] text-white'
                  : 'bg-[#241A17] text-[#A39389] hover:text-[#FFF8EF]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-2.5 max-h-[640px] overflow-y-auto no-scrollbar pr-1">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#1A1412] rounded-xl border border-[#3D312B] overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-3.5 text-left flex items-start justify-between gap-3 hover:bg-[#241A17] transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-xs font-black text-[#D95F39] bg-[#D95F39]/10 px-2 py-0.5 rounded shrink-0 mt-0.5">
                    Q{item.id}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-[#7A6A60] uppercase block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#FFF8EF] leading-snug">
                      {item.question}
                    </h4>
                  </div>
                </div>

                <div className="text-[#A39389] mt-1 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#3D312B]/50 bg-[#241A17]/50">
                  <div className="flex items-start gap-2 text-xs text-[#E6DCD5] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#5F8A52] shrink-0 mt-0.5" />
                    <p className="font-medium">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
