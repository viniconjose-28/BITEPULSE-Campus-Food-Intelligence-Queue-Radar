# BitePulse: 24 Presentation Slides Defense Deck
**Mobile Application Development (MAD) Assignment 4 & 5**  

---

### Slide 1: Title & Overview
- **Project:** BITEPULSE
- **Tagline:** "Know the Crowd. Find Your Food. Beat the Queue."
- **Theme:** Modern Black & Neon Green UI
- **Tech Stack:** Kotlin, Jetpack Compose, Material 3, Room Database, Coroutines, MVVM

### Slide 2: Problem Statement
- Students face 10-15 minute class intervals between lectures.
- Unpredictable canteen queue lines lead to missed meals or classroom tardiness.
- Unaware if items are sold out before walking across university campus.
- High campus kitchen food waste at evening closing.

### Slide 3: Why Campus Food is Different
- Hyper-localized walking distance vs vehicular delivery drivers.
- Fixed lecture timetable deadlines.
- Price-sensitive student wallets with daily pocket money limits.
- Communal dining culture: hostel roommates and project teams eat together.

### Slide 4: Existing Solutions & Gaps
- Commercial delivery apps (Zomato/Swiggy) cannot deliver inside internal campus cafeterias.
- Delivery surcharges exceed the cost of student food.
- No visibility into kitchen preparation queues or rush status.

### Slide 5: The Proposed Solution: BitePulse
- Real-time queue and crowd sensing (Calm, Moderate, Busy).
- Reverse discovery: recommend food based on break time and budget.
- Express counter pickups with zero wait in queue lines.
- Food waste reduction and gamified student rewards.

### Slide 6: Architecture Overview
- Unidirectional Data Flow (UDF) with MVVM.
- Jetpack Compose UI observes ViewModel StateFlows.
- Repository pattern mediates between local Room SQLite and remote caches.

### Slide 7: Core System Modules
- 15 Distinct modules designed specifically for campus dining lifecycle.

### Slide 8: Live Campus Pulse (Hero Feature)
- Real-time color-coded crowd indicator: 🟢 Calm, 🟡 Moderate, 🔴 Busy.
- Displays average wait time (e.g. 4 minutes) and "Best Time: NOW".
- Quick-glance previews for Central Canteen, Food Court, and Snack Hub.

### Slide 9: Queue Radar
- Dedicated cards for all 5 university food outlets.
- Displays wait times, walking distances, and fastest available items (Kadak Chai in 2 mins).
- Direct "Order Ahead" routing.

### Slide 10: Time Attack Mode
- Student inputs available break time ("I have 10 minutes").
- Algorithmic filtering matching `[Prep Time + Queue Delay <= Break Time]`.
- Categorizes into: "Fastest Choice", "Safest Choice", and "Best Value".

### Slide 11: Budget Mode
- Student pocket allowance selectors: ₹50, ₹75, ₹100, ₹150, ₹200+.
- Curated complete meal bundles (e.g., Sandwich ₹60 + Soda ₹25 + Cookie ₹15 = exact ₹100).
- 1-click combo addition to cart.

### Slide 12: Food Pulse (Trending)
- Rolling hourly counter of most ordered dishes (+34, +27 orders).
- Animated trending indicators.

### Slide 13: Group Orders (Squad Lunch)
- Shared squad room code (e.g., `#BP204`).
- Friends join ticket, add selections, and view transparent bill split with ₹30 squad discount.

### Slide 14: Food Rescue (♻️ Campus Sustainability)
- Activates before kitchen closing hours.
- Surplus meals offered at 35% to 42% discounts (Brownie ₹60 -> ₹35).
- Eco-impact points rewarded.

### Slide 15: Taste Passport
- Spotify Wrapped-style personal dining dossier.
- Tracks foods tried, money saved, waste diverted, and unlockable badges.

### Slide 16: BitePoints & Daily Missions
- Loyalty engine rewarding points for positive campus actions.
- Rewards catalog for free toppings, discount vouchers, and drinks.

### Slide 17: BiteBot AI Concierge
- Multi-turn conversational assistant with Gemini API & offline rule-based fallback.
- Contextual meal recommendation cards.

### Slide 18: Campus Food Map
- Vector campus map with real-time wait markers, walking times, and tap-to-inspect outlet cards.

### Slide 19: Ordering & Counter Verification
- 4-stage live pipeline: Received -> Preparing -> Almost Ready -> Ready.
- Secure 4-digit counter pickup PIN and QR verification.

### Slide 20: Android Technical Deep Dive
- Jetpack Compose declarative UI.
- Android Intents (`ACTION_SEND`, `ACTION_SENDTO`).
- Room Database DAOs and Coroutine Flows.

### Slide 21: Security & Local Resilience
- 100% offline-first reliability.
- Masked credentials, sanitized inputs, and mock demo payments.

### Slide 22: Key Advantages
- Saves 15-20 minutes of queue waiting time per student per day.
- Zero delivery fees.
- Reduces cafeteria food waste.

### Slide 23: Future Enhancements
- IoT camera queue detection via Computer Vision.
- NFC student card tap for counter verification.
- Lecture timetable calendar synchronization.

### Slide 24: Conclusion & Live Demonstration
- Complete implementation of MAD Assignments 4 & 5.
- Thank you! Ready for evaluation and live demo.
