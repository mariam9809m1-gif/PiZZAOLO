/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Pizza, 
  BookOpen, 
  ShoppingCart, 
  LogOut, 
  User as UserIcon, 
  ClipboardList, 
  Compass, 
  Wrench, 
  Flame, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { Topping, PresetPizza, CartItem, User, Order, CustomPizza } from './types';
import PizzaCustomizer from './components/PizzaCustomizer';
import Menu from './components/Menu';
import CartDrawer from './components/CartDrawer';
import OrderDashboard from './components/OrderDashboard';
import AuthModal from './components/AuthModal';

export default function App() {
  // Global States
  const [activePlatformTab, setActivePlatformTab] = useState<'menu' | 'customizer' | 'orders'>('menu');
  
  // Cart, Orders & Catalogues
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toppingsCatalog, setToppingsCatalog] = useState<Topping[]>([]);
  const [presetPizzas, setPresetPizzas] = useState<PresetPizza[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // User Authentication
  const [token, setToken] = useState<string | null>(localStorage.getItem('pizzaiolo_token'));
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modal open states
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Global Toast HUD banner notifications
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Trigger brief alert HUD
  const alertToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  // Initial Data Fetching from fullstack endpoints
  useEffect(() => {
    const initData = async () => {
      try {
        const [resMenu, resToppings] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/toppings')
        ]);
        
        if (resMenu.ok) setPresetPizzas(await resMenu.json());
        if (resToppings.ok) setToppingsCatalog(await resToppings.json());
      } catch (err) {
        console.error('Core catalog sync failed:', err);
      }
    };
    initData();
  }, []);

  // Fetch current user details if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setCurrentUser(null);
        return;
      }
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const profile = await response.json();
          setCurrentUser(profile);
          alertToast(`Bentornato, ${profile.name}! Logged in securely.`, 'success');
        } else {
          // Token expired or invalid
          handleLogout();
        }
      } catch (err) {
        console.error('Profile sync errored:', err);
      }
    };
    fetchProfile();
  }, [token]);

  // Fetch orders when user profile updates or guest email changes
  const refreshOrders = async () => {
    let queryParams = '';
    if (currentUser) {
      queryParams = `?userId=${currentUser.id}`;
    } else {
      // Look up via guest cart session cookies/states cached or memory
      const storedGuestEmail = localStorage.getItem('pizzaiolo_guest_email');
      if (storedGuestEmail) {
        queryParams = `?email=${encodeURIComponent(storedGuestEmail)}`;
      } else {
        return; // Empty
      }
    }

    try {
      const res = await fetch(`/api/orders${queryParams}`);
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error('Orders synchronization errored:', err);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, [currentUser]);

  // ---------------- Core Cart Operations ----------------

  const addPresetToCart = (pizza: PresetPizza, size: CustomPizza['size'], crust: string, sauce: string) => {
    const calculatedPrice = size === 'Small' 
      ? pizza.basePrice - 2.00 
      : size === 'Large' 
      ? pizza.basePrice + 3.50 
      : pizza.basePrice;

    const cartId = 'item_' + Math.random().toString(36).substr(2, 9);
    const newCartItem: CartItem = {
      cartId,
      isCustom: false,
      presetPizza: pizza,
      quantity: 1,
      price: Number(calculatedPrice.toFixed(2)),
      customPizza: {
        size,
        crust,
        sauce,
        toppings: pizza.defaultToppings,
        price: Number(calculatedPrice.toFixed(2))
      }
    };

    setCartItems(prev => [...prev, newCartItem]);
    alertToast(`Recipe "${pizza.name}" added to cart!`, 'success');
  };

  const addCustomToCart = (customConfig: CustomPizza) => {
    const cartId = 'cust_' + Math.random().toString(36).substr(2, 9);
    const newCartItem: CartItem = {
      cartId,
      isCustom: true,
      customPizza: customConfig,
      quantity: 1,
      price: customConfig.price
    };

    setCartItems(prev => [...prev, newCartItem]);
    alertToast('Gourmet custom creation added to your cart!', 'success');
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const nextQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: nextQty };
      }
      return item;
    }));
  };

  const removeItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    alertToast('Item removed from cart basket.', 'info');
  };

  // Auth Success helper
  const handleAuthSuccess = (newToken: string, userProfile: User) => {
    localStorage.setItem('pizzaiolo_token', newToken);
    setToken(newToken);
    setCurrentUser(userProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem('pizzaiolo_token');
    setToken(null);
    setCurrentUser(null);
    setOrders([]);
    alertToast('Successfully signed out of profile.', 'info');
  };

  const handleCheckoutSuccess = (completedOrder: Order) => {
    // If guest checked out, store email to cache search listings
    if (!currentUser) {
      localStorage.setItem('pizzaiolo_guest_email', completedOrder.customerDetails.email);
    }
    
    setCartItems([]); // Empty cart items
    setOrders(prev => [completedOrder, ...prev]);
    setActivePlatformTab('orders'); // Jump to track orders history screen immediately!
    alertToast('Order paid successfully via Stripe! Baking started.', 'success');
  };

  // Status Simulation advances order kitchen progress steps instantly
  const handleSimulateStatus = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/simulate`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        alertToast(`Simulated status: ${data.order.status}`, 'info');
        refreshOrders(); // Sync dynamic UI
      }
    } catch {
      alertToast('Simulator connection offline', 'error');
    }
  };

  const totalCartBadgeCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs px-4 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand identity signature */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
            <Pizza className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-xl font-display font-black text-gray-950 leading-none tracking-tight">PIZZAIOLO</h1>
            <span className="text-[9px] font-mono font-bold tracking-widest text-amber-800 uppercase block mt-1">Artisanal Laboratory</span>
          </div>
        </div>

        {/* Right Authentication & Cart triggers */}
        <div className="flex items-center gap-3.5">
          {/* JWT User authentication Badge */}
          {currentUser ? (
            <div className="flex items-center gap-2.5 bg-slate-50 border border-gray-200 pl-3 pr-2 py-1.5 rounded-xl">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-gray-400 font-mono">CLIENT PROFILE</span>
                <span className="text-xs font-display font-bold text-slate-800">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-gray-400 transition-all cursor-pointer"
                title="Sign out of account"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="bg-white border border-gray-200 hover:border-amber-250 text-slate-800 hover:text-amber-900 text-xs font-display font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In / Join</span>
            </button>
          )}

          {/* Cart sliding drawer toggle */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white p-3 rounded-xl shadow-md shadow-amber-600/10 flex items-center justify-center transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4.5 h-4.5" />
            {totalCartBadgeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-amber-400 text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                {totalCartBadgeCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. Global Alert HUD notifications */}
      {notification && (
        <div className="fixed top-20 right-6 z-40 animate-slide-in">
          <div className={`p-4 rounded-2xl border text-xs font-medium font-display shadow-lg flex items-center gap-3 w-72 max-w-sm ${
            notification.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-100' 
              : notification.type === 'error'
              ? 'bg-red-50 text-red-900 border-red-100'
              : 'bg-indigo-50 text-indigo-900 border-indigo-100'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-650 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* 3. Main Workspace viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        
        {/* Interactive Live ordering platform website */}
        <div className="space-y-8">
          
          {/* Secondary navigation bar context */}
          <div className="flex items-center justify-start gap-1 p-1 bg-white border border-gray-100 rounded-2xl shadow-xs max-w-md">
            <button
              onClick={() => setActivePlatformTab('menu')}
              className={`flex-1 text-xs font-display font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                activePlatformTab === 'menu'
                  ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse Menu</span>
            </button>
            <button
              onClick={() => setActivePlatformTab('customizer')}
              className={`flex-1 text-xs font-display font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                activePlatformTab === 'customizer'
                  ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Pizza Builder</span>
            </button>
            <button
              onClick={() => {
                setActivePlatformTab('orders');
                refreshOrders();
              }}
              className={`flex-1 text-xs font-display font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer relative ${
                activePlatformTab === 'orders'
                  ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Track Orders</span>
              {orders.some(o => o.status !== 'Delivered') && (
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full absolute top-2 right-2 animate-ping" />
              )}
            </button>
          </div>

          {/* Platform screens switcher */}
          <div className="animate-fade-in">
            {activePlatformTab === 'menu' && (
              <Menu 
                presetPizzas={presetPizzas} 
                onOrderPreset={addPresetToCart} 
              />
            )}

            {activePlatformTab === 'customizer' && (
              <PizzaCustomizer 
                toppingsCatalog={toppingsCatalog} 
                onAddToCart={addCustomToCart} 
              />
            )}

            {activePlatformTab === 'orders' && (
              <OrderDashboard 
                orders={orders} 
                onRefreshOrders={refreshOrders} 
                onSimulateStatus={handleSimulateStatus}
              />
            )}
          </div>

        </div>

      </main>

      {/* 4. Sliding Global Cart drawer inside sidebar */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* 5. Authentication login register Modal */}
      <AuthModal 
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* 6. Footer section */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800 text-center space-y-4 px-4 mt-12 w-full">
        <div className="flex justify-center items-center gap-2 text-white">
          <Pizza className="w-4 h-4 text-amber-400" />
          <span className="font-display font-bold">Pizzaiolo Culinary Systems Inc.</span>
        </div>
        <p className="max-w-md mx-auto text-[11px] text-slate-500 leading-relaxed">
          Crafted in Campania with 485°C sourdough yeast culture databases. JWT user authentication certificates integrated automatically. Simulated microtransactions secure.
        </p>
        <div className="text-[10px] font-mono text-amber-500/80">
          © 1982-2026 Pizzaiolo • Full-stack Prototype Version • Live active now
        </div>
      </footer>

    </div>
  );
}
