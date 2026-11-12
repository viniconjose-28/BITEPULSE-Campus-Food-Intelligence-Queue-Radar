# BitePulse: 30 Viva Examination Questions & Answers
**Course:** Mobile Application Development (MAD) Assignment 4 & 5  
**Project:** BitePulse — Campus Food Discovery & Queue Intelligence  

---

1. **What makes Kotlin better suited for Android than Java?**  
   Kotlin offers null-safety (preventing NullPointerExceptions), concise syntax (data classes, lambdas), extension functions, and native coroutines for asynchronous execution without thread blocking.

2. **What is the difference between Jetpack Compose and traditional XML layouts?**  
   Jetpack Compose is a declarative UI toolkit where the UI is a direct function of state. When state changes, Compose automatically recomposes only affected composables, eliminating findViewById and boilerplate view binding.

3. **Why did you choose MVVM architecture for BitePulse?**  
   MVVM cleanly separates concerns: Model manages data, View (Compose) displays UI, and ViewModel retains state across configuration changes (like screen rotation), exposing observable StateFlows.

4. **What is Room Database and why is it preferred over raw SQLite?**  
   Room is an abstraction layer over SQLite that provides compile-time verification of SQL queries, reduces boilerplate, and seamlessly integrates with Kotlin Coroutines and Flows for reactive real-time queries.

5. **What is the role of a DAO (Data Access Object) in Room?**  
   A DAO defines the database operations (CRUD) using annotations such as `@Insert`, `@Update`, `@Delete`, and `@Query`. It maps database tables to Kotlin objects and returns reactive Flow streams.

6. **Why do we need a Repository layer between ViewModel and Room?**  
   The Repository acts as a single source of truth, abstracting whether data comes from a local Room database, cache, or remote network API, making the codebase modular and testable.

7. **How does ViewModel survive configuration changes?**  
   A ViewModel is retained in memory by the Android `ViewModelStoreOwner` until the hosting Activity is completely finished, preventing unnecessary data reloading during orientation changes.

8. **What are Kotlin Coroutines and what role do they play in Room?**  
   Coroutines are lightweight threads used for non-blocking asynchronous operations. In Room, suspend functions and Flows execute database reads and writes off the main UI thread to prevent Application Not Responding (ANR) dialogs.

9. **How does Navigation Compose manage screen transitions?**  
   Navigation Compose uses a `NavHost` and `NavController` where each screen is associated with a route string. Composable destinations are swapped declaratively on a navigation backstack.

10. **What is the role of MainActivity in a single-activity Jetpack Compose app?**  
    MainActivity acts as the single window container that calls `setContent { ... }` to host the Compose hierarchy and initialize application-level lifecycles.

11. **How did you implement Android Intents in BitePulse?**  
    We implemented explicit and implicit Intents: `Intent.ACTION_SEND` to share order status (#BP1042) to social or chat apps, and `Intent.ACTION_SENDTO` to trigger campus mail clients for feedback.

12. **Where are CRUD operations performed in BitePulse?**  
    Create: Adding food to cart and generating orders. Read: Querying menu, queue radar, and past orders. Update: Modifying cart item quantities and order stages. Delete: Removing items from cart.

13. **What does "Offline-First" mean in BitePulse?**  
    The core functionality (discovering food, checking queues, building combos, adding to cart, placing mock orders) operates completely without an active internet connection using seeded local database persistence.

14. **How does Queue Radar calculate estimated wait time?**  
    It models outlet crowd levels (Calm: ~4m, Moderate: ~12m, Busy: ~22m) combined with individual dish kitchen preparation times to calculate realistic wait times for students.

15. **Explain the algorithmic concept behind "Time Attack Mode".**  
    When a student enters their available break time (e.g. 10 minutes), the algorithm filters items where `[Prep Time + Queue Delay <= Break Time]` and highlights fastest and safest choices.

16. **How does Budget Mode benefit college students?**  
    It prevents overspending by assembling complete nutritional combos (e.g., Sandwich + Soda + Cookie = exact ₹100) within designated student pocket allowances (₹50 to ₹200).

17. **How does the Group Order feature function locally?**  
    A host creates a room squad with a 5-character code (e.g. `#BP204`). Friends join the ticket, add their selections with individual subtotal tallies, apply group discounts, and split the final bill.

18. **What is the purpose of the Food Rescue feature?**  
    It addresses campus food sustainability by automatically offering 35%-42% discounts on fresh surplus cafeteria meals 1-2 hours before kitchen service closes.

19. **Why did you design a Taste Passport instead of a standard profile screen?**  
    Inspired by Spotify Wrapped, it gamifies dining with metrics (foods tried, money saved, waste diverted) and unlockable badges (Burger Explorer, Spice Hunter) to increase user engagement.

20. **How does the BitePoints loyalty system work?**  
    Students earn points for positive campus actions (orders +10, group orders +15, food rescue +20, missions +30) and redeem them for free toppings and meal vouchers in the Rewards Store.

21. **How does BiteBot handle situations where Gemini API is unavailable?**  
    BiteBot employs an offline rule-based natural language parser that recognizes intents (budget, time constraints, trending, food rescue, vegan) and returns structured meal recommendation cards.

22. **How does the Campus Food Map function without a paid Google Maps API key?**  
    It renders a custom vector canvas of the university campus layout with interactive markers showing distance, walking times, and color-coded queue status.

23. **What security practices are demonstrated in this application?**  
    Password masking, email regex validation, safe parameterized queries in SQLite, zero storage of real credit card numbers, and demo-only payment simulation.

24. **What is StateFlow in Kotlin Coroutines?**  
    StateFlow is a state-holder observable flow that emits the current and new state updates to its collectors, acting as a modern, lifecycle-aware alternative to LiveData.

25. **Why was blue strictly avoided in BitePulse?**  
    Blue is a clinical corporate/tech color that depresses appetite. BitePulse uses an energetic Black (`#050505`) and Neon Green (`#39FF14`) identity for high-contrast visibility and a modern campus feel.

26. **How do you optimize Jetpack Compose performance and prevent lagging?**  
    By using `LazyColumn`/`LazyRow` for list virtualization, remembering expensive calculations with `remember {}`, avoiding reading unstable state in parent composables, and using keys for list items.

27. **How does the local notification simulation work?**  
    Local broadcasts model queue status changes (e.g., "Queue dropped to 4 min at Central Canteen") and order stage advancements without requiring an external Firebase Cloud Messaging server.

28. **Why is BitePulse a novel contribution for MAD Assignment 4 & 5?**  
    Because it avoids being another generic Zomato clone and invents "Campus Food Intelligence" addressing the unique friction points of students: queues, 10-minute class breaks, tight budgets, and food rescue.

29. **What testing strategies should be applied to an Android app like BitePulse?**  
    Unit tests for Repository/ViewModel logic using JUnit and MockK, instrumented Compose UI tests using `composeTestRule`, and SQLite Room testing using in-memory databases.

30. **What are future enhancements for BitePulse in a production campus deployment?**  
    Real IoT camera queue length detection via Computer Vision, integration with university RFID student cards via Android NFC, and synchronization with lecture timetable systems.
