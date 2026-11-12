import React from 'react';
import { AndroidDeviceFrame } from './components/android/AndroidDeviceFrame';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { RadarScreen } from './components/screens/RadarScreen';
import { MenuOrderScreen } from './components/screens/MenuOrderScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { TastePassportScreen } from './components/screens/TastePassportScreen';
import { OrderTrackerScreen } from './components/screens/OrderTrackerScreen';

// Modals
import { FoodDetailModal } from './components/screens/FoodDetailModal';
import { CheckoutModal } from './components/screens/CheckoutModal';
import { TimeAttackModal } from './components/screens/TimeAttackModal';
import { BudgetModeModal } from './components/screens/BudgetModeModal';
import { GroupOrderModal } from './components/screens/GroupOrderModal';
import { FoodRescueModal } from './components/screens/FoodRescueModal';
import { BiteBotModal } from './components/screens/BiteBotModal';
import { NotificationsModal } from './components/screens/NotificationsModal';
import { AndroidIntentModal } from './components/android/AndroidIntentModal';

// Retained Academic & Submission Assets (Preserved in project codebase for MAD submission)
export { KotlinCodeViewer } from './components/android/KotlinCodeViewer';
export { AcademicDocsViewer } from './components/android/AcademicDocsViewer';
export { SlidesDeckViewer } from './components/android/SlidesDeckViewer';
export { VivaPrepViewer } from './components/android/VivaPrepViewer';

import { FoodItem, FoodOutlet, CustomizationOptions, Order, NavTab } from './types';
import { localDb } from './data/localDatabase';

export default function App() {
  // Application Lifecycle & Screen State
  const [appStage, setAppStage] = React.useState<'splash' | 'onboarding' | 'login' | 'main'>('splash');
  const [currentTab, setCurrentTab] = React.useState<NavTab>('home');
  const [activeTrackingOrderId, setActiveTrackingOrderId] = React.useState<string | null>(null);
  const [showOrderTracker, setShowOrderTracker] = React.useState(false);

  // Modals
  const [selectedFoodForCustomization, setSelectedFoodForCustomization] = React.useState<FoodItem | null>(null);
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [showTimeAttack, setShowTimeAttack] = React.useState(false);
  const [showBudgetMode, setShowBudgetMode] = React.useState(false);
  const [showGroupOrder, setShowGroupOrder] = React.useState(false);
  const [showFoodRescue, setShowFoodRescue] = React.useState(false);
  const [showBiteBot, setShowBiteBot] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  // Android Intent Modal
  const [intentData, setIntentData] = React.useState<{
    isOpen: boolean;
    type: 'SHARE_ORDER' | 'SUPPORT_EMAIL';
    payload: { title: string; text: string };
  }>({
    isOpen: false,
    type: 'SHARE_ORDER',
    payload: { title: 'BitePulse Order', text: '' },
  });

  // Category filter state for menu navigation
  const [menuFilter, setMenuFilter] = React.useState<string>('All');
  const [cartCount, setCartCount] = React.useState<number>(localDb.getCart().length);

  React.useEffect(() => {
    const unsub = localDb.subscribe(() => {
      setCartCount(localDb.getCart().length);
    });
    return unsub;
  }, []);

  // Handlers
  const handleSelectFood = (food: FoodItem) => {
    setSelectedFoodForCustomization(food);
  };

  const handleAddToCart = (food: FoodItem, customization: CustomizationOptions, quantity: number) => {
    localDb.addToCart(food, customization, quantity);
  };

  const handleAddComboToCart = (items: FoodItem[]) => {
    items.forEach((item) => {
      localDb.addToCart(
        item,
        { size: 'Regular', spiceLevel: 'Medium', selectedExtras: [], removedIngredients: [] },
        1
      );
    });
  };

  const handleOrderAheadAtOutlet = (outlet: FoodOutlet) => {
    setMenuFilter('All');
    setCurrentTab('order');
  };

  const handleTriggerShareIntent = (order: Order) => {
    setIntentData({
      isOpen: true,
      type: 'SHARE_ORDER',
      payload: {
        title: `BitePulse Order #${order.id}`,
        text: `Hey! I just placed an order on BitePulse at ${order.outletName}. Order #${order.id} is being prepared! Est. wait: ${order.estimatedReadyMin} mins. Pickup PIN: ${order.pickupPin}.`,
      },
    });
  };

  const handleOrderSuccess = (order: Order) => {
    setActiveTrackingOrderId(order.id);
    setShowOrderTracker(true);
  };

  return (
    <AndroidDeviceFrame>
      <div className="w-full h-full flex flex-col justify-between relative bg-[#050505]">
        {/* Main Display Routing */}
        {appStage === 'splash' && (
          <SplashScreen onFinish={() => setAppStage('onboarding')} />
        )}

        {appStage === 'onboarding' && (
          <OnboardingScreen onComplete={() => setAppStage('login')} />
        )}

        {appStage === 'login' && (
          <LoginScreen onLoginSuccess={() => setAppStage('main')} />
        )}

        {appStage === 'main' && (
          <>
            {/* Screen Viewport Canvas */}
            <div className="flex-1 w-full overflow-hidden relative">
              {showOrderTracker ? (
                <OrderTrackerScreen
                  orderId={activeTrackingOrderId || undefined}
                  onBack={() => setShowOrderTracker(false)}
                  onTriggerShareIntent={handleTriggerShareIntent}
                />
              ) : (
                <>
                  {currentTab === 'home' && (
                    <HomeScreen
                      onOpenRadar={() => setCurrentTab('radar')}
                      onOpenTimeAttack={() => setShowTimeAttack(true)}
                      onOpenBudget={() => setShowBudgetMode(true)}
                      onOpenRescue={() => setShowFoodRescue(true)}
                      onOpenGroupOrder={() => setShowGroupOrder(true)}
                      onOpenNotifications={() => setShowNotifications(true)}
                      onSelectFood={handleSelectFood}
                      onOpenRewards={() => setCurrentTab('rewards')}
                      onOpenCategory={(cat) => {
                        setMenuFilter(cat);
                        setCurrentTab('order');
                      }}
                      onOpenBot={() => setShowBiteBot(true)}
                    />
                  )}

                  {currentTab === 'radar' && (
                    <RadarScreen onOrderAheadAtOutlet={handleOrderAheadAtOutlet} />
                  )}

                  {currentTab === 'order' && (
                    <MenuOrderScreen
                      onSelectFood={handleSelectFood}
                      onOpenCartCheckout={() => setShowCheckout(true)}
                      initialFilter={menuFilter}
                    />
                  )}

                  {currentTab === 'rewards' && <RewardsScreen />}

                  {currentTab === 'profile' && (
                    <TastePassportScreen
                      onOpenOrderHistory={() => setShowOrderTracker(true)}
                      onOpenNotifications={() => setShowNotifications(true)}
                      onLogout={() => {
                        localDb.setLoggedIn(false);
                        setAppStage('login');
                      }}
                      onTrackOrder={(ord) => {
                        setActiveTrackingOrderId(ord.id);
                        setShowOrderTracker(true);
                      }}
                    />
                  )}
                </>
              )}
            </div>

            {/* In-App Bottom Navigation */}
            {!showOrderTracker && (
              <BottomNavBar
                currentTab={currentTab}
                onSelectTab={(tab) => {
                  setCurrentTab(tab);
                }}
                cartCount={cartCount}
              />
            )}
          </>
        )}

        {/* In-App Interactive Modals */}
        <FoodDetailModal
          food={selectedFoodForCustomization}
          isOpen={!!selectedFoodForCustomization}
          onClose={() => setSelectedFoodForCustomization(null)}
          onAddToCart={handleAddToCart}
        />

        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          cartItems={localDb.getCart()}
          onOrderSuccess={handleOrderSuccess}
        />

        <TimeAttackModal
          isOpen={showTimeAttack}
          onClose={() => setShowTimeAttack(false)}
          onSelectFood={handleSelectFood}
        />

        <BudgetModeModal
          isOpen={showBudgetMode}
          onClose={() => setShowBudgetMode(false)}
          onSelectFood={handleSelectFood}
          onAddComboToCart={handleAddComboToCart}
        />

        <GroupOrderModal
          isOpen={showGroupOrder}
          onClose={() => setShowGroupOrder(false)}
          onPlaceGroupOrder={() => {
            const ord = localDb.placeGroupOrder('UPI');
            handleOrderSuccess(ord);
          }}
          onOpenMenuForGroup={() => {
            setCurrentTab('order');
          }}
        />

        <FoodRescueModal
          isOpen={showFoodRescue}
          onClose={() => setShowFoodRescue(false)}
          onSelectFood={handleSelectFood}
        />

        <BiteBotModal
          isOpen={showBiteBot}
          onClose={() => setShowBiteBot(false)}
          onSelectFood={handleSelectFood}
          onOpenRadar={() => setCurrentTab('radar')}
          onOpenRescue={() => setShowFoodRescue(true)}
          onOpenTimeAttack={() => setShowTimeAttack(true)}
          onOpenBudget={() => setShowBudgetMode(true)}
        />

        <NotificationsModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          onNavigateScreen={(target) => {
            if (target === 'radar') setCurrentTab('radar');
            if (target === 'rewards') setCurrentTab('rewards');
            if (target === 'food_rescue') setShowFoodRescue(true);
            if (target === 'group') setShowGroupOrder(true);
            if (target === 'tracker') setShowOrderTracker(true);
          }}
        />

        <AndroidIntentModal
          isOpen={intentData.isOpen}
          onClose={() => setIntentData((prev) => ({ ...prev, isOpen: false }))}
          intentType={intentData.type}
          payload={intentData.payload}
        />
      </div>
    </AndroidDeviceFrame>
  );
}
