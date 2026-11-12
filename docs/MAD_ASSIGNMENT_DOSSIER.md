# BITEPULSE: Comprehensive Project Dossier & Thesis
**Mobile Application Development (MAD) Assignment 4 & 5**  
**Tagline:** *"Know the Crowd. Find Your Food. Beat the Queue."*  
**Theme:** Black & Neon Green Modern Campus Intelligence (`#050505` + `#39FF14`)

---

## 1. Title of the Project
**BITEPULSE: Smart Campus Food Discovery, Queue Intelligence, and Student Dining Lifestyle System.**

## 2. Abstract
BitePulse is a local-first Android mobile application built with Kotlin, Jetpack Compose, Material 3, and Room Database. Designed specifically for university campuses, BitePulse bridges the gap between student academic time constraints and campus dining congestion. Instead of functioning merely as an e-commerce food delivery clone, BitePulse introduces "Campus Food Intelligence," empowering students with real-time queue estimation across university outlets (Central Canteen, Food Court, Snack Hub, Coffee Corner, Night Mess), "Time Attack" recommendation algorithms for rushed lecture breaks, strict "Budget Mode" meal combos, social "Group Orders", and end-of-day "Food Rescue" sustainability discounts.

## 3. Problem Statement
University students face severe scheduling friction:
- 10–15 minute class intervals between lectures.
- Unpredictable canteen queue lines exceeding 25 minutes.
- Lack of live food availability data causing students to walk across campus only to find items sold out.
- Tight student pocket budgets with daily allowances.
- Immense daily food waste at the close of campus kitchen operations.
Commercial delivery apps (Zomato/Swiggy) cannot operate inside university campuses due to high delivery surcharges and lack of cafeteria queue awareness.

## 4. Existing System vs. 5. Proposed System
- **Existing System:** Physical queues, token slips, counter congestion, food waste at service close, uncoordinated room food orders, and high cafeteria wait times.
- **Proposed System (BitePulse):** Continuous queue sensing (Calm, Moderate, Busy), Time Attack mode matching preparation time with lecture break intervals, transparent budget meal builder under ₹50–₹100, local Room DB persistence, offline-first reliability, and gamified Taste Passports.

## 6. Objectives & 7. Scope
- Eliminate unnecessary queue wait times in campus cafeterias.
- Provide student-first constraints: Time Attack, Budget Mode, and Group Orders.
- Promote environmental sustainability through Food Rescue discounts (35%–42% off closing items).
- Incentivize healthy and eco-conscious habits via BitePoints rewards and Taste Passports.
- Work 100% offline with seeded local database persistence.

## 8. Target Users
- University undergraduate and postgraduate students.
- Campus faculty and laboratory staff.
- University cafeteria and kiosk managers.

## 9. Unique Features
1. **Live Campus Pulse:** Color-coded crowd status (Calm, Moderate, Busy) and average wait time.
2. **Queue Radar:** Outlets cards showing wait times, fastest items, and instant "Order Ahead".
3. **Time Attack Mode:** "I have 10 minutes" -> filters meals ready before the bell.
4. **Budget Mode:** Pre-curated student combos for ₹50, ₹75, ₹100, ₹150, ₹200+.
5. **Food Pulse:** Hourly trending items counter (+34, +27 orders).
6. **Group Order:** Shared squad lunch rooms (e.g., `#BP204`) with bill splitting.
7. **Food Rescue:** End-of-service surplus meals discounted to prevent food waste.
8. **Taste Passport:** Spotify Wrapped-style personal dining statistics and unlockable badges.
9. **Daily Missions:** Dining challenges rewarding +30 BitePoints.
10. **BitePoints:** Rewards catalog for free toppings, discount coupons, and beverages.
11. **Smart Food Finder:** Intent-based discovery tiles.
12. **BiteBot AI:** Natural language dining assistant with Gemini multi-turn chat and offline fallback.
13. **Campus Food Map:** Vector interactive map with queue pins and walking distances.
14. **Smart Notifications:** Local queue drops and order readiness alerts.
15. **End-to-End Ordering & Live Queue Tracking:** 4-stage pipeline with pickup PIN.

## 10. Technology Stack & 11. Architecture
- **Language:** Kotlin 2.0+
- **UI Toolkit:** Jetpack Compose, Material 3
- **Architecture:** MVVM (Model-View-ViewModel) with Unidirectional Data Flow (UDF)
- **Database:** Room (SQLite) with Coroutines and StateFlow
- **IPC / Intents:** Android Intents (`ACTION_SEND`, `ACTION_SENDTO`)

## 12. Database Design (Room Entities)
- `FoodItemEntity`: id, name, price, originalPrice, prepTime, outletId, isVeg, spiceLevel, isTrending, isFoodRescue.
- `OrderEntity`: id, timestamp, outletId, total, orderType, stage, queuePosition, pickupPin.
- `UserEntity`: studentName, email, bitePoints, moneySaved, foodsTried.
- `GroupOrderEntity`: code, title, hostName, members.

## 16. Security & 17. Testing
- Safe SQLite parameterized queries preventing injection.
- Masked credentials and email format validation.
- Mock payments only (zero real payment processing).
- Unit tested repository functions and StateFlow emissions.

## 21. Conclusion
BitePulse establishes an innovative standard for university campus mobile software engineering, blending real-time queue intelligence, student affordability, and culinary sustainability.
