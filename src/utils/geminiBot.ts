import { FoodItem } from '../types';
import { localDb } from '../data/localDatabase';

export interface BotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  recommendedFoods?: FoodItem[];
  actionType?: 'VIEW_RADAR' | 'VIEW_RESCUE' | 'VIEW_TIME_ATTACK' | 'VIEW_BUDGET';
}

export const INITIAL_BOT_MESSAGES: BotMessage[] = [
  {
    id: 'bot_init',
    sender: 'bot',
    text: "Hey! I'm BiteBot 👋 Your campus food concierge. Tell me what you're craving, how much time you have before class, or your budget!",
    timestamp: 'Just now',
  },
];

export async function askBiteBot(
  userPrompt: string,
  history: BotMessage[] = []
): Promise<BotMessage> {
  const query = userPrompt.toLowerCase().trim();
  const allFoods = localDb.getAllFoodItems();
  const outlets = localDb.getOutlets();

  // Try server-side multi-turn Gemini chat first
  try {
    const formattedHistory = history.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text,
    }));

    // Determine task complexity
    let taskType = 'general';
    if (query.includes('explain') || query.includes('compare') || query.includes('analyze') || query.includes('nutrition')) {
      taskType = 'complex';
    } else if (query.includes('fast') || query.includes('quick') || query.includes('instant')) {
      taskType = 'fast';
    }

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userPrompt,
        history: formattedHistory,
        taskType,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text && !data.fallback) {
        // Extract any matching food recommendations
        const recommendedFoods: FoodItem[] = [];
        if (query.includes('100') || query.includes('budget')) {
          recommendedFoods.push(...allFoods.filter((f) => f.price <= 100).slice(0, 3));
        } else if (query.includes('minute') || query.includes('quick') || query.includes('hurry')) {
          recommendedFoods.push(...allFoods.slice().sort((a, b) => a.preparationTimeMin - b.preparationTimeMin).slice(0, 3));
        } else if (query.includes('rescue')) {
          recommendedFoods.push(...localDb.getFoodRescueItems().slice(0, 3));
        } else if (query.includes('trend')) {
          recommendedFoods.push(...localDb.getTrendingFoodItems().slice(0, 3));
        }

        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: data.text,
          timestamp: 'Just now',
          recommendedFoods: recommendedFoods.length > 0 ? recommendedFoods : undefined,
        };
      }
    }
  } catch {
    // Graceful offline fallback
  }

  // Robust Local Rule-Based Engine (100% Offline Guaranteed)
  if (query.includes('100') || query.includes('budget') || query.includes('cheap') || query.includes('afford') || query.includes('50')) {
    const budgetFoods = allFoods.filter((f) => f.price <= 100).slice(0, 3);
    return {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: "Here are the top campus picks under ₹100! You can grab a wholesome Mumbai Sandwich or Crispy Kathi Wrap right now without hurting your wallet.",
      timestamp: 'Just now',
      recommendedFoods: budgetFoods,
      actionType: 'VIEW_BUDGET',
    };
  }

  if (
    query.includes('minute') ||
    query.includes('hurry') ||
    query.includes('late') ||
    query.includes('fast') ||
    query.includes('rush') ||
    query.includes('quick') ||
    query.includes('class')
  ) {
    const fastestFoods = [...allFoods]
      .sort((a, b) => a.preparationTimeMin - b.preparationTimeMin)
      .slice(0, 3);
    return {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: "In a hurry before your lecture? These items are ready in under 3 minutes with zero queue hassle!",
      timestamp: 'Just now',
      recommendedFoods: fastestFoods,
      actionType: 'VIEW_TIME_ATTACK',
    };
  }

  if (query.includes('trend') || query.includes('popular') || query.includes('most ordered') || query.includes('best')) {
    const trending = localDb.getTrendingFoodItems().slice(0, 3);
    return {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: "Here's what students are crushing on in the last hour! The Double Smash Burger and Signature Cold Coffee have over 50 combined orders right now.",
      timestamp: 'Just now',
      recommendedFoods: trending,
    };
  }

  if (query.includes('rescue') || query.includes('discount') || query.includes('closing') || query.includes('save food') || query.includes('waste')) {
    const rescue = localDb.getFoodRescueItems().slice(0, 3);
    return {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: "♻️ Food Rescue Alert! Help save campus surplus food and grab up to 42% discounts on fresh brownies and thali bowls.",
      timestamp: 'Just now',
      recommendedFoods: rescue,
      actionType: 'VIEW_RESCUE',
    };
  }

  if (query.includes('veg') || query.includes('vegetarian') || query.includes('green') || query.includes('healthy') || query.includes('protein')) {
    const vegFoods = allFoods.filter((f) => f.isVegetarian).slice(0, 3);
    return {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: "Here are delicious 100% vegetarian & nutritious campus meals made fresh to order:",
      timestamp: 'Just now',
      recommendedFoods: vegFoods,
    };
  }

  if (query.includes('where') || query.includes('canteen') || query.includes('crowd') || query.includes('queue') || query.includes('calm')) {
    const calmOutlet = outlets.find((o) => o.crowdLevel === 'CALM') || outlets[0];
    const calmFoods = allFoods.filter((f) => f.outletId === calmOutlet.id).slice(0, 2);
    return {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: `Right now, ${calmOutlet.name} is in 🟢 Calm mode with only ~${calmOutlet.estimatedQueueMin} min estimated wait! Check the Queue Radar for live campus heatmaps.`,
      timestamp: 'Just now',
      recommendedFoods: calmFoods,
      actionType: 'VIEW_RADAR',
    };
  }

  const suggestions = allFoods.slice(0, 2);
  return {
    id: `bot_${Date.now()}`,
    sender: 'bot',
    text: "Got it! Based on live campus kitchen queues, I recommend checking our top-rated wrap or snack combos. Feel free to ask me for 'food under ₹80' or 'quick 5 min snack'!",
    timestamp: 'Just now',
    recommendedFoods: suggestions,
  };
}
