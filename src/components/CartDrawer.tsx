/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, ShoppingCart, ShoppingBag, MapPin, Phone, CreditCard, ChevronRight, User } from 'lucide-react';
import { CartItem, User as AuthUser, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: AuthUser | null;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckoutSuccess: (order: Order) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess
}: CartDrawerProps) {
  // Navigation inside sliding cart (Cart List vs Checkout Address vs Payment processed)
  const [step, setStep] = useState<'cart' | 'details' | 'payment'>('cart');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  
  // Checkout Form Details state
  const [customerDetails, setCustomerDetails] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  });

  // Stripe Mock parameters
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('321');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Sync details if currentUser gets logged initializers mid-session
  React.useEffect(() => {
    if (currentUser) {
      setCustomerDetails(prev => ({
        ...prev,
        name: prev.name || currentUser.name,
        email: prev.email || currentUser.email,
        phone: prev.phone || currentUser.phone,
        address: prev.address || currentUser.address,
      }));
    }
  }, [currentUser]);

  // Math Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.085; // 8.5%
  const deliveryFee = deliveryMethod === 'delivery' ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleInputChange = (field: string, val: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: val }));
    setErrorMessage('');
  };

  const handleDetailsProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name.trim()) return setErrorMessage('Full Name is required');
    if (!customerDetails.email.trim()) return setErrorMessage('Email Address is required');
    if (!customerDetails.phone.trim()) return setErrorMessage('Phone Number is required');
    if (deliveryMethod === 'delivery' && !customerDetails.address.trim()) {
      return setErrorMessage('Delivery Address is required for courier transport');
    }
    setStep('payment');
  };

  const submitOrderToServer = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser?.id,
          customerDetails: {
            ...customerDetails,
            address: deliveryMethod === 'pickup' ? 'Store Pickup (Naples Yard 1A)' : customerDetails.address
          },
          items: cartItems,
          subtotal: Number(subtotal.toFixed(2)),
          tax: Number(tax.toFixed(2)),
          deliveryFee: Number(deliveryFee.toFixed(2)),
          total: Number(total.toFixed(2)),
          paymentToken: 'tok_mock_' + Math.random().toString(36).substr(5)
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server rejected order request');
      }

      // Success callback
      onCheckoutSuccess(data.order);
      setStep('cart'); // Reset step state
      onClose(); // Hide slide drawer
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment system sync offline');
    } finally {
      setLoading(false);
    }
  };

  const getPizzaDescription = (item: CartItem) => {
    if (!item.isCustom) {
      return `${item.presetPizza?.name} (${item.customPizza?.size || 'Medium'})`;
    }
    const pizza = item.customPizza!;
    const toppingsStr = pizza.toppings.length > 0 
      ? `Toppings: ${pizza.toppings.length} selected`
      : 'No toppings chosen';
    return `Custom Base: ${pizza.size}, ${pizza.crust}, ${pizza.sauce} (${toppingsStr})`;
  };

  return (
    <div id="sliding-cart-drawer" className="fixed inset-0 z-50 overflow-hidden">
      {/* Background overlay backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-gray-100">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-display font-extrabold tracking-tight">
                {step === 'cart' ? 'Shopping Cart' : step === 'details' ? 'Delivery Details' : 'Secure Checkout'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Workflow container */}
          <div className="flex-1 overflow-y-auto p-6 focus:outline-none">
            {errorMessage && (
              <div className="mb-4 bg-red-50 border border-red-100 text-red-900 p-3 rounded-lg flex items-start gap-2 text-xs">
                <span className="font-bold underline">Error:</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Cart step panel */}
            {step === 'cart' && (
              <div className="h-full flex flex-col justify-between">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                      <ShoppingCart className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-gray-800">Your basket is empty</h3>
                    <p className="text-xs text-gray-400 max-w-xs mt-1.5">
                      Select built-in recipes from the menu or construct your personal combination in the customizer tab to get fired up!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Items List */}
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div 
                          key={item.cartId}
                          className="flex items-start gap-4 pb-4 border-b border-gray-50 text-left"
                        >
                          <div className="w-12 h-12 bg-slate-50 border border-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                            🍕
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-display font-bold text-gray-900 truncate">
                              {getPizzaDescription(item)}
                            </h4>
                            <span className="text-[10px] font-mono font-semibold text-amber-700 mt-1 block">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                              <button 
                                onClick={() => onUpdateQuantity(item.cartId, -1)}
                                className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-black hover:bg-white rounded-md cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-bold text-gray-800">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => onUpdateQuantity(item.cartId, 1)}
                                className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-black hover:bg-white rounded-md cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemoveItem(item.cartId)}
                              className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Method Toggle */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold block mb-2">
                        FULFILLMENT METHOD
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setDeliveryMethod('delivery')}
                          className={`py-2 px-3 text-xs font-display font-medium rounded-lg transition-all ${
                            deliveryMethod === 'delivery'
                              ? 'bg-amber-600 text-white font-bold'
                              : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Delivery (+$3.99)
                        </button>
                        <button
                          onClick={() => setDeliveryMethod('pickup')}
                          className={`py-2 px-3 text-xs font-display font-medium rounded-lg transition-all ${
                            deliveryMethod === 'pickup'
                              ? 'bg-amber-600 text-white font-bold'
                              : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Pickup (Free)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Address Details Step */}
            {step === 'details' && (
              <form onSubmit={handleDetailsProceed} className="space-y-4 text-left">
                <span className="text-[10px] font-mono text-gray-400 font-bold tracking-widest block mb-1">
                  SHIPPING COORDINATES
                </span>

                <div className="space-y-3.5">
                  <div>
                    <label className="text-xs font-display font-bold text-gray-700 block mb-1.5">Full Recipient Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><User className="w-4 h-4" /></span>
                      <input 
                        type="text" 
                        required
                        className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-9 py-2.5 w-full focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        value={customerDetails.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Garibaldi Garofalo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-display font-bold text-gray-700 block mb-1.5">E-Mail Address (For notifications)</label>
                    <input 
                      type="email" 
                      required
                      className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-3 py-2.5 w-full focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="g.garofalo@naples.it"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-display font-bold text-gray-700 block mb-1.5">Contact Phone Line</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Phone className="w-4 h-4" /></span>
                      <input 
                        type="tel" 
                        required
                        className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-9 py-2.5 w-full focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        value={customerDetails.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+39 344 982312"
                      />
                    </div>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div>
                      <label className="text-xs font-display font-bold text-gray-700 block mb-1.5">Exact Delivery Address</label>
                      <div className="relative">
                        <span className="absolute left-3 top-[14px] text-gray-400"><MapPin className="w-4 h-4" /></span>
                        <textarea 
                          required
                          rows={2}
                          className="bg-slate-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2.5 w-full focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          value={customerDetails.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Vico Tre Re a Toledo 14, Second Floor, Naples"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-display text-xs font-bold py-3 rounded-xl cursor-pointer"
                  >
                    Back to cart
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-display text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Review Billing <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Payment step panel */}
            {step === 'payment' && (
              <div className="space-y-5 text-left">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 font-bold tracking-widest block mb-1">
                    CONFIRM YOUR ORDER SUMMARY
                  </span>
                  <div className="bg-slate-50 rounded-xl p-3 border border-gray-100 text-xs space-y-1.5 text-gray-700">
                    <div className="flex justify-between"><span>Recipient:</span><strong className="text-gray-900">{customerDetails.name}</strong></div>
                    <div className="flex justify-between"><span>fulfillment:</span><strong className="text-gray-900 uppercase font-mono">{deliveryMethod}</strong></div>
                    <div className="flex justify-between"><span>Phone:</span><strong className="text-gray-900">{customerDetails.phone}</strong></div>
                    {deliveryMethod === 'delivery' && (
                      <div className="flex justify-between items-start">
                        <span className="shrink-0 mr-4">Address:</span>
                        <strong className="text-gray-900 truncate max-w-[200px]">{customerDetails.address}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Simulated Stripe container */}
                <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-amber-800 font-bold tracking-wider block mb-2">
                    🛡️ SECURED STRIPE MOCK GATEWAY
                  </span>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-amber-900/80 font-bold block mb-1">Simulated Card Details</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><CreditCard className="w-4 h-4" /></span>
                        <input 
                          type="text" 
                          className="bg-white border border-gray-200 text-xs rounded-lg px-9 py-2 w-full font-mono text-gray-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-amber-900/80 font-bold block mb-1">Expiry</label>
                        <input 
                          type="text" 
                          className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2 w-full font-mono text-gray-800 focus:outline-none"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-amber-900/80 font-bold block mb-1">CVC Code</label>
                        <input 
                          type="text" 
                          className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2 w-full font-mono text-gray-800 focus:outline-none"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <span className="text-[8px] text-amber-800/60 font-mono mt-3 block text-center">
                    Mock transactions are simulated immediately. No actual cards are charged.
                  </span>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setStep('details')}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-display text-xs font-bold py-3 rounded-xl disabled:opacity-40 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={submitOrderToServer}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-700 text-white font-display text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-80"
                  >
                    {loading ? (
                      <span className="animate-spin text-sm">✦</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay ${total.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Drawer Footer (Sums summary in Cart tab) */}
          {step === 'cart' && cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-500 font-mono">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Campania sales tax (8.5%):</span>
                  <span className="text-gray-900 font-semibold">${tax.toFixed(2)}</span>
                </div>
                {deliveryMethod === 'delivery' && (
                  <div className="flex items-center justify-between">
                    <span>Fitted delivery courier fee:</span>
                    <span className="text-gray-900 font-semibold">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-gray-200/60 pt-2.5 text-sm text-gray-900 font-display font-extrabold">
                  <span>Total Amount:</span>
                  <span className="text-amber-600 text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('details')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer"
              >
                Continue to delivery specs
                <ChevronRight className="w-4.5 h-4.5 ml-1" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
