# BITEPULSE — Campus Food Intelligence & Queue Radar
**Mobile Application Development (MAD) Assignment 4 & 5**  
**Tagline:** *"Know the Crowd. Find Your Food. Beat the Queue."*  
**Theme:** Modern Black & Neon Green (`#050505` + `#39FF14`)

---

## Overview
BitePulse is a local-first Android mobile application built with **Kotlin**, **Jetpack Compose**, **Material 3**, and **Room Database**. It re-engineers university dining by providing real-time cafeteria crowd sensing, time-constrained meal recommendations, budget combos, social squad orders, and sustainability food rescue discounts.

---

## Repository Structure

```
├── android/                         # Complete Android Studio Project
│   ├── app/
│   │   ├── build.gradle.kts
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── java/com/bitepulse/app/
│   │           ├── MainActivity.kt
│   │           ├── data/
│   │           │   ├── database/BitePulseDatabase.kt
│   │           │   ├── dao/FoodItemDao.kt
│   │           │   └── entity/FoodItemEntity.kt
│   │           └── ui/theme/
│   │               ├── Color.kt
│   │               └── Theme.kt
│   ├── build.gradle.kts
│   └── settings.gradle.kts
│
├── docs/                            # Academic & Submission Documentation
│   ├── MAD_ASSIGNMENT_DOSSIER.md    # Full 21-section project report
│   ├── VIVA_QUESTIONS_ANSWERS_30.md # 30 technical viva Q&A
│   └── PRESENTATION_SLIDES_24.md    # 24 defense presentation slides
│
├── src/                             # Interactive Mobile Web Preview Application
│   ├── components/
│   │   ├── android/                 # Android device frame & intent modal
│   │   ├── navigation/              # Bottom navigation bar
│   │   └── screens/                 # All 15+ interactive feature screens & modals
│   ├── data/                        # Room-like local database & seed data
│   ├── types/                       # Core domain models
│   └── utils/                       # BiteBot AI & Web Audio ambient engine
│
└── bitepulse_mad_assignment.zip     # Complete generated submission bundle
```

---

## Key Features

1. **Live Campus Pulse:** Color-coded crowd status (Calm, Moderate, Busy) and 4-min average wait time.
2. **Queue Radar:** Outlets wait times, fastest items, and instant "Order Ahead".
3. **Time Attack Mode:** "I have 10 minutes" -> filters meals ready before the lecture bell.
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

---

## How to Build

### 1. Android Studio
1. Open Android Studio -> **Open an Existing Project** -> Select the `/android` folder.
2. Allow Gradle sync to complete (JDK 17+, Android Gradle Plugin 8.5+).
3. Connect an Android device or launch an emulator.
4. Click **Run 'app'** (`Shift + F10`).

### 2. Web Development Preview
1. `npm install`
2. `npm run dev`
3. Open browser at `http://localhost:3000`.
