/**
 * Room Database & Repository Simulation for BitePulse
 * Provides offline-first local persistence with Reactive State.
 */

import {
  FoodItem,
  FoodOutlet,
  CartItem,
  CustomizationOptions,
  Order,
  GroupOrder,
  Coupon,
  RewardItem,
  BiteMission,
  NotificationItem,
  TastePassportData,
} from '../types';
import {
  FOOD_ITEMS_SEED,
  INITIAL_OUTLETS,
  INITIAL_USER,
  INITIAL_GROUP_ORDER,
  BADGES_SEED,
  COUPONS_SEED,
  REWARDS_SEED,
  MISSIONS_SEED,
  NOTIFICATIONS_SEED,
} from './mockData';

const STORAGE_KEYS = {
  CART: 'bp_cart_v1',
  ORDERS: 'bp_orders_v1',
  USER: 'bp_user_v1',
  FAVORITES: 'bp_favs_v1',
  GROUP_ORDER: 'bp_group_order_v1',
  MISSIONS: 'bp_missions_v1',
  REWARDS: 'bp_rewards_v1',
  NOTIFICATIONS: 'bp_notifs_v1',
  OUTLETS: 'bp_outlets_v1',
  IS_LOGGED_IN: 'bp_logged_in_v1',
};

class LocalDatabase {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initDatabase();
    this.startLiveSimulation();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private initDatabase() {
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.OUTLETS)) {
      localStorage.setItem(STORAGE_KEYS.OUTLETS, JSON.stringify(INITIAL_OUTLETS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.GROUP_ORDER)) {
      localStorage.setItem(STORAGE_KEYS.GROUP_ORDER, JSON.stringify(INITIAL_GROUP_ORDER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MISSIONS)) {
      localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(MISSIONS_SEED));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REWARDS)) {
      localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(REWARDS_SEED));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(NOTIFICATIONS_SEED));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['food_1', 'food_5', 'food_13']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      // Seed with one past order
      const initialPastOrder: Order = {
        id: 'BP1038',
        timestamp: 'Today, 11:20 AM',
        outletId: 'outlet_central',
        outletName: 'Central Canteen',
        items: [
          {
            id: 'past_1',
            foodItem: FOOD_ITEMS_SEED[0],
            quantity: 1,
            customization: { size: 'Regular', spiceLevel: 'Medium', selectedExtras: [], removedIngredients: [] },
            totalPrice: 90,
          },
        ],
        subtotal: 90,
        discount: 20,
        total: 70,
        orderType: 'PICKUP',
        paymentMethod: 'UPI',
        queuePosition: 0,
        initialQueuePosition: 5,
        estimatedReadyMin: 0,
        stage: 'COMPLETED',
        pickupPin: '4821',
      };
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([initialPastOrder]));
    }
  }

  // --- Live Pulse & Queue Simulation ---
  private startLiveSimulation() {
    // Every 12 seconds simulate subtle crowd fluctuations and active order progress
    setInterval(() => {
      this.advanceActiveOrders();
    }, 8000);
  }

  // Advance order stages: RECEIVED -> PREPARING -> ALMOST_READY -> READY -> COMPLETED
  private advanceActiveOrders() {
    const orders = this.getOrders();
    let hasChanges = false;

    const updated = orders.map((ord) => {
      if (ord.stage === 'RECEIVED') {
        hasChanges = true;
        return { ...ord, stage: 'PREPARING' as const, queuePosition: Math.max(1, ord.queuePosition - 1) };
      }
      if (ord.stage === 'PREPARING') {
        hasChanges = true;
        return { ...ord, stage: 'ALMOST_READY' as const, queuePosition: 1, estimatedReadyMin: 2 };
      }
      if (ord.stage === 'ALMOST_READY') {
        hasChanges = true;
        this.addNotification({
          title: 'Order Ready for Pickup! 🔔',
          message: `Your order #${ord.id} at ${ord.outletName} is ready! Pickup PIN is ${ord.pickupPin}.`,
          type: 'ORDER_UPDATE',
          targetScreen: 'tracker',
        });
        return { ...ord, stage: 'READY' as const, queuePosition: 0, estimatedReadyMin: 0 };
      }
      return ord;
    });

    if (hasChanges) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      this.notify();
    }
  }

  // --- Food Items ---
  public getAllFoodItems(): FoodItem[] {
    return FOOD_ITEMS_SEED;
  }

  public getFoodItemById(id: string): FoodItem | undefined {
    return FOOD_ITEMS_SEED.find((f) => f.id === id);
  }

  public getTrendingFoodItems(): FoodItem[] {
    return FOOD_ITEMS_SEED.filter((f) => f.isTrending).sort(
      (a, b) => (a.trendingRank || 99) - (b.trendingRank || 99)
    );
  }

  public getFoodRescueItems(): FoodItem[] {
    return FOOD_ITEMS_SEED.filter((f) => f.isFoodRescue);
  }

  // --- Outlets ---
  public getOutlets(): FoodOutlet[] {
    const data = localStorage.getItem(STORAGE_KEYS.OUTLETS);
    return data ? JSON.parse(data) : INITIAL_OUTLETS;
  }

  public updateOutletCrowd(outletId: string, crowdLevel: FoodOutlet['crowdLevel'], waitMin: number) {
    const outlets = this.getOutlets().map((o) =>
      o.id === outletId ? { ...o, crowdLevel, estimatedQueueMin: waitMin } : o
    );
    localStorage.setItem(STORAGE_KEYS.OUTLETS, JSON.stringify(outlets));
    this.notify();
  }

  // --- Cart Management ---
  public getCart(): CartItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    return data ? JSON.parse(data) : [];
  }

  public addToCart(
    foodItem: FoodItem,
    customization: CustomizationOptions,
    quantity = 1,
    addedBy?: string
  ): CartItem {
    const cart = this.getCart();
    const extrasTotal = customization.selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const sizeMultiplier = customization.size === 'Large' ? 1.3 : 1.0;
    const itemUnitPrice = Math.round(foodItem.price * sizeMultiplier) + extrasTotal;

    const newItem: CartItem = {
      id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      foodItem,
      quantity,
      customization,
      totalPrice: itemUnitPrice * quantity,
      addedBy,
    };

    cart.push(newItem);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.notify();
    return newItem;
  }

  public updateCartQuantity(cartItemId: string, delta: number) {
    let cart = this.getCart();
    const itemIndex = cart.findIndex((i) => i.id === cartItemId);
    if (itemIndex > -1) {
      const item = cart[itemIndex];
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        cart = cart.filter((i) => i.id !== cartItemId);
      } else {
        const unitPrice = item.totalPrice / item.quantity;
        cart[itemIndex] = {
          ...item,
          quantity: newQty,
          totalPrice: unitPrice * newQty,
        };
      }
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      this.notify();
    }
  }

  public removeFromCart(cartItemId: string) {
    const cart = this.getCart().filter((i) => i.id !== cartItemId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.notify();
  }

  public clearCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    this.notify();
  }

  // --- Orders ---
  public getOrders(): Order[] {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  }

  public getActiveOrder(): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.stage !== 'COMPLETED');
  }

  public createOrder(params: {
    items: CartItem[];
    outletId: string;
    outletName: string;
    subtotal: number;
    discount: number;
    total: number;
    orderType: 'PICKUP' | 'DINE_IN';
    paymentMethod: 'UPI' | 'CAMPUS_CARD' | 'CASH_COUNTER';
    groupCode?: string;
  }): Order {
    const orders = this.getOrders();
    const orderNumber = 1040 + orders.length + 1;
    const pickupPin = Math.floor(1000 + Math.random() * 9000).toString();

    // Determine initial queue position from outlet
    const outlet = this.getOutlets().find((o) => o.id === params.outletId);
    const initialPos = outlet ? Math.max(2, Math.floor(outlet.estimatedQueueMin / 2)) : 4;
    const estTime = outlet ? outlet.estimatedQueueMin : 8;

    const newOrder: Order = {
      id: `BP${orderNumber}`,
      timestamp: 'Just now',
      outletId: params.outletId,
      outletName: params.outletName,
      items: params.items,
      subtotal: params.subtotal,
      discount: params.discount,
      total: params.total,
      orderType: params.orderType,
      paymentMethod: params.paymentMethod,
      queuePosition: initialPos,
      initialQueuePosition: initialPos,
      estimatedReadyMin: estTime,
      stage: 'RECEIVED',
      pickupPin,
      groupCode: params.groupCode,
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Clear user cart if not group order
    this.clearCart();

    // Reward BitePoints (+10 per order, +15 if group, +20 if food rescue)
    let pointsToAdd = params.groupCode ? 15 : 10;
    const hasRescue = params.items.some((i) => i.foodItem.isFoodRescue);
    if (hasRescue) pointsToAdd += 20;
    this.addPoints(pointsToAdd);

    // Update Passport stats
    const user = this.getUser();
    user.foodsTriedCount += params.items.length;
    user.moneySavedRupees += params.discount;
    if (hasRescue) user.foodRescueSavesCount += 1;
    this.updateUser(user);

    // Add alert notification
    this.addNotification({
      title: `Order #${newOrder.id} Placed! 🚀`,
      message: `You're queue #${initialPos} at ${newOrder.outletName}. Est. wait: ${estTime} mins.`,
      type: 'ORDER_UPDATE',
      targetScreen: 'tracker',
    });

    this.notify();
    return newOrder;
  }

  // --- Group Order Simulation ---
  public getGroupOrder(): GroupOrder {
    const data = localStorage.getItem(STORAGE_KEYS.GROUP_ORDER);
    return data ? JSON.parse(data) : INITIAL_GROUP_ORDER;
  }

  public createGroupOrder(title: string, outletName: string): GroupOrder {
    const code = `BP${Math.floor(200 + Math.random() * 800)}`;
    const newGroup: GroupOrder = {
      code,
      title: title || 'ROOM SQUAD LUNCH',
      hostName: this.getUser().studentName,
      outletName: outletName || 'Central Canteen',
      createdAt: 'Just now',
      isLocked: false,
      members: [
        {
          id: 'host_mem',
          name: `${this.getUser().studentName} (Host)`,
          avatarColor: '#D95F39',
          items: [],
          subtotal: 0,
        },
      ],
    };
    localStorage.setItem(STORAGE_KEYS.GROUP_ORDER, JSON.stringify(newGroup));
    this.notify();
    return newGroup;
  }

  public joinGroupOrder(code: string, friendName = 'Friend'): boolean {
    const group = this.getGroupOrder();
    if (group.code.toUpperCase() !== code.toUpperCase()) {
      return false;
    }
    // Add friend member if not exists
    const exists = group.members.find((m) => m.name.toLowerCase() === friendName.toLowerCase());
    if (!exists) {
      group.members.push({
        id: `mem_${Date.now()}`,
        name: friendName,
        avatarColor: '#7A8B5A',
        items: [
          {
            id: `grp_f_${Date.now()}`,
            foodItem: FOOD_ITEMS_SEED[8], // Mumbai Sandwich
            quantity: 1,
            customization: { size: 'Regular', spiceLevel: 'Medium', selectedExtras: [], removedIngredients: [] },
            totalPrice: 60,
            addedBy: friendName,
          },
        ],
        subtotal: 60,
      });
      localStorage.setItem(STORAGE_KEYS.GROUP_ORDER, JSON.stringify(group));
      this.addNotification({
        title: 'Friend Joined Group Order 👥',
        message: `${friendName} joined squad ${group.code} and added Mumbai Sandwich.`,
        type: 'GROUP',
        targetScreen: 'group',
      });
      this.notify();
    }
    return true;
  }

  public addItemToGroupOrder(foodItem: FoodItem, memberName = 'Vini (You)') {
    const group = this.getGroupOrder();
    let member = group.members.find((m) => m.name.includes('Vini') || m.name === memberName);
    if (!member) {
      member = {
        id: `mem_user`,
        name: memberName,
        avatarColor: '#F28C28',
        items: [],
        subtotal: 0,
      };
      group.members.push(member);
    }
    const cartItem: CartItem = {
      id: `grp_it_${Date.now()}`,
      foodItem,
      quantity: 1,
      customization: { size: 'Regular', spiceLevel: 'Medium', selectedExtras: [], removedIngredients: [] },
      totalPrice: foodItem.price,
      addedBy: member.name,
    };
    member.items.push(cartItem);
    member.subtotal += foodItem.price;

    localStorage.setItem(STORAGE_KEYS.GROUP_ORDER, JSON.stringify(group));
    this.notify();
  }

  public placeGroupOrder(paymentMethod: 'UPI' | 'CAMPUS_CARD' | 'CASH_COUNTER'): Order {
    const group = this.getGroupOrder();
    const allItems: CartItem[] = [];
    let groupSubtotal = 0;

    group.members.forEach((m) => {
      m.items.forEach((it) => {
        allItems.push(it);
        groupSubtotal += it.totalPrice;
      });
    });

    const order = this.createOrder({
      items: allItems,
      outletId: 'outlet_central',
      outletName: group.outletName,
      subtotal: groupSubtotal,
      discount: 30, // Group bundle discount
      total: Math.max(0, groupSubtotal - 30),
      orderType: 'PICKUP',
      paymentMethod,
      groupCode: group.code,
    });

    // Mark group as locked
    group.isLocked = true;
    localStorage.setItem(STORAGE_KEYS.GROUP_ORDER, JSON.stringify(group));
    this.notify();
    return order;
  }

  // --- User & Taste Passport ---
  public getUser(): TastePassportData {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : INITIAL_USER;
  }

  public updateUser(user: TastePassportData) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    this.notify();
  }

  public addPoints(amount: number) {
    const user = this.getUser();
    user.bitePoints += amount;
    this.updateUser(user);
  }

  public deductPoints(amount: number): boolean {
    const user = this.getUser();
    if (user.bitePoints < amount) return false;
    user.bitePoints -= amount;
    this.updateUser(user);
    return true;
  }

  public getBadges() {
    const user = this.getUser();
    return BADGES_SEED.map((b) => ({
      ...b,
      isUnlocked: user.unlockedBadgeIds.includes(b.id),
    }));
  }

  // --- Favorites ---
  public getFavorites(): string[] {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  }

  public toggleFavorite(foodId: string): boolean {
    let favs = this.getFavorites();
    const isFav = favs.includes(foodId);
    if (isFav) {
      favs = favs.filter((id) => id !== foodId);
    } else {
      favs.push(foodId);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    this.notify();
    return !isFav;
  }

  public isFavorite(foodId: string): boolean {
    return this.getFavorites().includes(foodId);
  }

  // --- Coupons ---
  public getCoupons(): Coupon[] {
    return COUPONS_SEED;
  }

  public applyCoupon(code: string, subtotal: number): { discount: number; message: string; valid: boolean } {
    const coupon = COUPONS_SEED.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { discount: 0, message: 'Invalid promo code. Try CAMPUS50 or PULSE20', valid: false };
    }
    if (subtotal < coupon.minOrderValue) {
      return {
        discount: 0,
        message: `Min. order ₹${coupon.minOrderValue} required for code ${coupon.code}`,
        valid: false,
      };
    }
    let discount = 0;
    if (coupon.discountType === 'FLAT') {
      discount = coupon.discountValue;
    } else {
      discount = Math.min(40, Math.round((subtotal * coupon.discountValue) / 100));
    }
    return {
      discount,
      message: `Promo ${coupon.code} applied! Saved ₹${discount}`,
      valid: true,
    };
  }

  // --- Missions ---
  public getMissions(): BiteMission[] {
    const data = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    return data ? JSON.parse(data) : MISSIONS_SEED;
  }

  public claimMission(missionId: string): boolean {
    const missions = this.getMissions();
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.isClaimed) return false;

    mission.isCompleted = true;
    mission.isClaimed = true;
    this.addPoints(mission.pointsReward);

    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
    this.addNotification({
      title: 'Mission Reward Claimed! 🏆',
      message: `+${mission.pointsReward} BitePoints added to your wallet for completing: ${mission.title}`,
      type: 'POINTS',
      targetScreen: 'rewards',
    });
    this.notify();
    return true;
  }

  // --- Rewards ---
  public getRewards(): RewardItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.REWARDS);
    return data ? JSON.parse(data) : REWARDS_SEED;
  }

  public redeemReward(rewardId: string): { success: boolean; message: string; voucher?: string } {
    const rewards = this.getRewards();
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return { success: false, message: 'Reward not found' };

    const success = this.deductPoints(reward.pointsCost);
    if (!success) {
      return { success: false, message: `Insufficient points! You need ${reward.pointsCost} BitePoints.` };
    }

    reward.isRedeemed = true;
    localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
    this.addNotification({
      title: 'Perk Redeemed! 🎁',
      message: `You unlocked "${reward.title}". Voucher Code: ${reward.voucherCode}`,
      type: 'POINTS',
      targetScreen: 'rewards',
    });
    this.notify();
    return { success: true, message: `Successfully redeemed! Voucher: ${reward.voucherCode}`, voucher: reward.voucherCode };
  }

  // --- Notifications ---
  public getNotifications(): NotificationItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : NOTIFICATIONS_SEED;
  }

  public addNotification(item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) {
    const notifs = this.getNotifications();
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      isRead: false,
      ...item,
    };
    notifs.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.notify();
  }

  public markNotificationRead(id: string) {
    const notifs = this.getNotifications().map((n) => (n.id === id ? { ...n, isRead: true } : n));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.notify();
  }

  // --- Auth State ---
  public isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) !== 'false';
  }

  public setLoggedIn(status: boolean) {
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, status ? 'true' : 'false');
    this.notify();
  }
}

export const localDb = new LocalDatabase();
