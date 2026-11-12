/**
 * BitePulse - Core Domain Data Models
 * Matching Room Database Entities & MVVM Architecture
 */

export type CrowdLevel = 'CALM' | 'MODERATE' | 'BUSY' | 'VERY_BUSY';

export interface FoodOutlet {
  id: string;
  name: string;
  shortName: string;
  location: string;
  coordinates: { x: number; y: number }; // Percentage for campus map
  crowdLevel: CrowdLevel;
  estimatedQueueMin: number;
  popularItem: string;
  fastestItem: string;
  fastestItemTimeMin: number;
  isOpen: boolean;
  closingTime: string;
  rating: number;
  distanceMeters: number;
  walkingTimeMin: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For Food Rescue discounts
  category: 'Breakfast' | 'Meals' | 'Burgers' | 'Wraps' | 'Snacks' | 'Pizza' | 'Drinks' | 'Coffee' | 'Desserts' | 'Healthy' | 'Food Rescue';
  outletId: string;
  outletName: string;
  rating: number;
  ratingCount: number;
  preparationTimeMin: number;
  isVegetarian: boolean;
  spiceLevel: 'None' | 'Mild' | 'Medium' | 'Hot' | 'Extreme';
  isAvailable: boolean;
  imageUrl: string;
  isTrending: boolean;
  trendingRank?: number;
  recentOrdersCount?: number;
  isFoodRescue?: boolean;
  caloriesKcal: number;
  dietaryTags: string[];
}

export interface CustomizationOptions {
  size: 'Regular' | 'Large';
  spiceLevel: 'None' | 'Mild' | 'Medium' | 'Hot' | 'Extreme';
  selectedExtras: { name: string; price: number }[];
  removedIngredients: string[];
  notes?: string;
}

export interface CartItem {
  id: string; // unique cart item id
  foodItem: FoodItem;
  quantity: number;
  customization: CustomizationOptions;
  totalPrice: number;
  addedBy?: string; // For Group Orders
}

export type OrderStage = 'RECEIVED' | 'PREPARING' | 'ALMOST_READY' | 'READY' | 'COMPLETED';

export interface Order {
  id: string; // e.g. "BP1042"
  timestamp: string;
  outletId: string;
  outletName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  orderType: 'PICKUP' | 'DINE_IN';
  paymentMethod: 'UPI' | 'CAMPUS_CARD' | 'CASH_COUNTER';
  queuePosition: number;
  initialQueuePosition: number;
  estimatedReadyMin: number;
  stage: OrderStage;
  pickupPin: string;
  groupCode?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatarColor: string;
  items: CartItem[];
  subtotal: number;
}

export interface GroupOrder {
  code: string; // e.g. "BP204"
  title: string;
  hostName: string;
  outletName: string;
  members: GroupMember[];
  createdAt: string;
  isLocked: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'PERCENT' | 'FLAT';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsCost: number;
  category: 'Discount' | 'Free Item' | 'Upgrade';
  description: string;
  voucherCode: string;
  isRedeemed?: boolean;
}

export interface BiteMission {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  isCompleted: boolean;
  isClaimed: boolean;
  progress: number;
  maxProgress: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'QUEUE_DROP' | 'ORDER_UPDATE' | 'FOOD_RESCUE' | 'POINTS' | 'GROUP';
  isRead: boolean;
  targetScreen?: string;
}

export interface TastePassportData {
  studentName: string;
  studentEmail: string;
  avatarSeed: string;
  foodsTriedCount: number;
  favoriteCategory: string;
  preferredSpiceLevel: string;
  favoriteOutlet: string;
  moneySavedRupees: number;
  foodRescueSavesCount: number;
  bitePoints: number;
  unlockedBadgeIds: string[];
}

export interface Badge {
  id: string;
  icon: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  unlockedDate?: string;
}

export type NavTab = 'home' | 'radar' | 'order' | 'rewards' | 'profile';

export type AppViewMode = 'app' | 'kotlin' | 'docs' | 'slides' | 'viva';
