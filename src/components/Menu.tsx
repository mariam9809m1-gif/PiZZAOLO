/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Pizza, Flame, ShieldAlert, Heart, Info, Clock, AlertCircle } from 'lucide-react';
import { PresetPizza, PizzaSize } from '../types';

interface MenuProps {
  presetPizzas: PresetPizza[];
  onOrderPreset: (pizza: PresetPizza, size: PizzaSize, crust: string, sauce: string) => void;
}

const DEALS = [
  {
    id: 'd1',
    title: 'Two-for-Tuesday Traditional',
    description: 'Get 2 Medium Margherita Classica pizzas with premium fresh buffalo mozzarella for just $18.99.',
    badge: 'Limited Deal',
    code: 'CLASSIC2'
  },
  {
    id: 'd2',
    title: 'The Weekend Green Feast',
    description: 'Double up on any plant-based or Vegan garden harvest slices and get a complimentary white pesto sauce upgrade.',
    badge: 'Vegan Weekend',
    code: 'PLANTLOVE'
  }
];

export default function Menu({ presetPizzas, onOrderPreset }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Classic' | 'Premium' | 'Vegan' | 'Vegetarian'>('All');
  const [pizzaSizes, setPizzaSizes] = useState<Record<string, PizzaSize>>({});

  const filteredPizzas = presetPizzas.filter(pizza => 
    selectedCategory === 'All' || pizza.category === selectedCategory
  );

  const getPizzaSelectedSize = (pizzaId: string, defaultSize: PizzaSize): PizzaSize => {
    return pizzaSizes[pizzaId] || defaultSize;
  };

  const handleSizeChange = (pizzaId: string, sz: PizzaSize) => {
    setPizzaSizes(prev => ({ ...prev, [pizzaId]: sz }));
  };

  const calculateDynamicPrice = (basePrice: number, sz: PizzaSize) => {
    if (sz === 'Small') return basePrice - 2.00;
    if (sz === 'Large') return basePrice + 3.50;
    return basePrice; // Medium
  };

  return (
    <div className="space-y-12">
      {/* 1. Daily Deals Banner Grid */}
      <div id="promotions-section">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-display font-extrabold text-gray-900 tracking-tight">Today's Hot Deals</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEALS.map((deal) => (
            <div 
              key={deal.id}
              className="bg-amber-50/50 rounded-2xl border border-amber-100/70 p-5 flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/5 rounded-full -mr-10 -mt-10" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-100/50 px-2.5 py-1 rounded-full">
                  {deal.badge}
                </span>
                <h3 className="text-lg font-display font-bold text-amber-950 mt-2">{deal.title}</h3>
                <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">{deal.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-amber-100/40 pt-3 text-xs">
                <span className="text-gray-500 font-mono">Use coupon promo code:</span>
                <span className="bg-amber-600/10 text-amber-900 text-xs font-mono font-bold px-3 py-1 rounded-lg border-dashed border border-amber-500/30">
                  {deal.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Restaurant Story & Integrity Section */}
      <div id="our-story-section" className="bg-slate-900 rounded-3xl p-6 lg:p-10 text-white relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-cover bg-center brightness-[0.12]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200')` }} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">EST. Napoli 1982</span>
            <h2 className="text-4xl font-display font-extrabold text-white mt-1.5 leading-none tracking-tight">The Pizzaiolo Legacy</h2>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              For generations, our oven fire has burned at 485°C. Pizzaiolo combines authentic ancient yeast cultures from Campania, organic cold-pressed sea salts, and imported San Marzano tomatoes. Every pizza represents physical craftsmanship: hand-torn basil, high-hydration flour bases, and a smokey oak wood fired charred crust.
            </p>
            <div className="flex items-center gap-6 mt-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-gray-300">Ready in 12-15 Mins</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-gray-300">485°C Oakwood Oven</span>
              </div>
            </div>
          </div>
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-display font-extrabold text-amber-300 mb-2">Our Culinary Anchors</h3>
            <ul className="space-y-3.5 text-xs text-gray-200">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 mt-0.5">✔</span>
                <span><strong>Imported Sourced Flour:</strong> Premium Tipo 00 soft winter wheat for standard stretchy hydration.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 mt-0.5">✔</span>
                <span><strong>No Artificial Sugars:</strong> Tomato sauce relies purely on organic vine nectar extraction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 mt-0.5">✔</span>
                <span><strong>Fresh Craft Cheeses:</strong> Daily deliveries of hand-stretched local buffalo curd.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. The Pizzeria Menu with Categories */}
      <div id="menu-catalogue-section" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">Our Artisanal Menu</h2>
            <p className="text-xs text-gray-500">Pick from our traditional family recipe configurations</p>
          </div>
          
          {/* Menu categories navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {(['All', 'Classic', 'Premium', 'Vegan', 'Vegetarian'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-display font-bold px-3.5 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/10'
                    : 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pizzas grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPizzas.map((pizza) => {
            const currentSize = getPizzaSelectedSize(pizza.id, pizza.defaultSize);
            const currentPrice = calculateDynamicPrice(pizza.basePrice, currentSize);
            
            return (
              <div 
                key={pizza.id}
                className="bg-white rounded-2xl border border-gray-100 hover:border-amber-100 hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Visual Pizza Image */}
                <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-display font-extrabold text-white bg-slate-900/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {pizza.category}
                    </span>
                  </div>
                </div>

                {/* Info & Configurations */}
                <div className="w-full sm:w-3/5 p-5 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-gray-900">{pizza.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">{pizza.description}</p>
                    
                    <div className="text-[10px] text-gray-400 font-mono mt-2 flex flex-wrap gap-x-2 gap-y-0.5">
                      <span>Crust: <strong>{pizza.defaultCrust}</strong></span>
                      <span>•</span>
                      <span>Sauce: <strong>{pizza.defaultSauce}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-3.5 border-t border-gray-50 pt-3">
                    {/* Size selector buttons inside recipe card */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-mono text-gray-400">Diameter:</span>
                      <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-mono font-medium">
                        {(['Small', 'Medium', 'Large'] as PizzaSize[]).map((sz) => {
                          const sizeActive = currentSize === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => handleSizeChange(pizza.id, sz)}
                              className={`px-2 py-0.5 rounded-md text-[10px] transition-all cursor-pointer ${
                                sizeActive 
                                  ? 'bg-white text-gray-900 font-bold shadow-xs' 
                                  : 'text-gray-400 hover:text-gray-700'
                              }`}
                            >
                              {sz[0]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order action button and pricing details */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-mono text-gray-400">Recipe Price</span>
                        <span className="text-lg font-display font-extrabold text-amber-600">${currentPrice.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => onOrderPreset(pizza, currentSize, pizza.defaultCrust, pizza.defaultSauce)}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-display text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
