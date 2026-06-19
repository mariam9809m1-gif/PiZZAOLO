/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Pizza, Check, Disc, Flame, Waves, Plus, Minus, HelpCircle } from 'lucide-react';
import { Topping, PizzaSize, CustomPizza } from '../types';

interface PizzaCustomizerProps {
  toppingsCatalog: Topping[];
  onAddToCart: (customPizza: CustomPizza) => void;
}

const SIZE_PRICES: Record<PizzaSize, number> = {
  Small: 8.99,
  Medium: 11.99,
  Large: 14.99,
};

const CRUST_OPTIONS = [
  { id: 'c_thin', name: 'Classic Thin Crust', price: 0 },
  { id: 'c_neapolitan', name: 'Artisanal Neapolitan', price: 1.50 },
  { id: 'c_glutenfree', name: 'Alternative Gluten-Free', price: 2.50 },
  { id: 'c_stuffed', name: 'Double Cheese Stuffed', price: 3.50 }
];

const SAUCE_OPTIONS = [
  { id: 's_marinara', name: 'Rustic Marinara', price: 0, color: 'bg-red-600' },
  { id: 's_spicy', name: 'Fiery Arrabbiata', price: 0, color: 'bg-red-800' },
  { id: 's_garlic', name: 'White Garlic Cream', price: 0.50, color: 'bg-yellow-50' },
  { id: 's_pesto', name: 'Genovese Basil Pesto', price: 1.00, color: 'bg-green-700' }
];

export default function PizzaCustomizer({ toppingsCatalog, onAddToCart }: PizzaCustomizerProps) {
  // Configured Interactive Choices
  const [size, setSize] = useState<PizzaSize>('Medium');
  const [selectedCrust, setSelectedCrust] = useState('c_thin');
  const [selectedSauce, setSelectedSauce] = useState('s_marinara');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['t_mozzarella']);
  const [customName, setCustomName] = useState('My Masterpiece');
  const [activeTab, setActiveTab] = useState<'cheese' | 'meat' | 'veg'>('cheese');

  // Math variables
  const currentCrust = useMemo(() => CRUST_OPTIONS.find(c => c.id === selectedCrust)!, [selectedCrust]);
  const currentSauce = useMemo(() => SAUCE_OPTIONS.find(s => s.id === selectedSauce)!, [selectedSauce]);
  
  const toppingsPrice = useMemo(() => {
    return selectedToppings.reduce((sum, tid) => {
      const topping = toppingsCatalog.find(t => t.id === tid);
      return sum + (topping ? topping.price : 0);
    }, 0);
  }, [selectedToppings, toppingsCatalog]);

  const totalPrice = useMemo(() => {
    return SIZE_PRICES[size] + currentCrust.price + currentSauce.price + toppingsPrice;
  }, [size, currentCrust, currentSauce, toppingsPrice]);

  // Handlers
  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId) 
        : [...prev, toppingId]
    );
  };

  const handleCreatePizza = () => {
    const finalCrust = currentCrust.name;
    const finalSauce = currentSauce.name;
    
    const configuredPizza: CustomPizza = {
      size,
      crust: finalCrust,
      sauce: finalSauce,
      toppings: [...selectedToppings],
      price: Number(totalPrice.toFixed(2))
    };

    onAddToCart(configuredPizza);
  };

  // Filter toppings by category
  const filteredToppings = toppingsCatalog.filter(t => t.category === activeTab);

  // Simulated coordinate offsets to disperse topping visualizers on the visual Pizza
  const toppingOffsets = useMemo(() => {
    const seedPoints = [
      { x: '35%', y: '30%' }, { x: '65%', y: '35%' }, { x: '50%', y: '60%' },
      { x: '25%', y: '55%' }, { x: '70%', y: '55%' }, { x: '45%', y: '20%' },
      { x: '55%', y: '45%' }, { x: '30%', y: '42%' }, { x: '62%', y: '22%' },
      { x: '40%', y: '72%' }, { x: '52%', y: '34%' }, { x: '23%', y: '31%' },
      { x: '77%', y: '46%' }, { x: '46%', y: '48%' }, { x: '60%', y: '70%' }
    ];
    // Map each topping in the catalog to a stable subset of offsets so they don't jump around on repaint
    const mapping: Record<string, typeof seedPoints> = {};
    toppingsCatalog.forEach((top, index) => {
      // Pick 4 coordinates for each topping to disperse
      const subset: typeof seedPoints = [];
      for (let i = 0; i < 4; i++) {
        const pointIndex = (index * 3 + i * 7) % seedPoints.length;
        subset.push(seedPoints[pointIndex]);
      }
      mapping[top.id] = subset;
    });
    return mapping;
  }, [toppingsCatalog]);

  const sauceColorClass = () => {
    switch (selectedSauce) {
      case 's_marinara': return 'bg-red-600 border-red-800';
      case 's_spicy': return 'bg-red-800 border-red-950';
      case 's_garlic': return 'bg-yellow-100 border-yellow-200';
      case 's_pesto': return 'bg-emerald-800 border-emerald-900';
      default: return 'bg-red-600 border-red-800';
    }
  };

  return (
    <div id="pizza-customizer-component" className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <span className="text-amber-600 text-xs font-display font-bold uppercase tracking-wider bg-amber-50 px-3 py-1.5 rounded-full">
            Artisanal Laboratory
          </span>
          <h2 className="text-3xl font-display font-extrabold text-gray-900 mt-2 tracking-tight">
            Build Your Perfect Crust
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Specify size, crust density, gourmet sauces, and lay down unlimited premium toppings.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          <span className="text-xs font-mono font-medium text-gray-400 pl-2">Pizza Name:</span>
          <input
            id="builder-name-input"
            type="text"
            className="bg-white border border-gray-200 text-sm font-display font-bold text-gray-800 rounded-lg px-3 py-1 focus:ring-2 focus:ring-amber-500 focus:outline-none w-full sm:w-48 text-right"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Visual Cooking Pan Canvas */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start">
          <div className="sticky top-6 w-full flex flex-col items-center">
            
            {/* Visual Screen wrapper */}
            <div className="relative w-full aspect-square max-w-[340px] lg:max-w-full rounded-2xl bg-slate-50 flex items-center justify-center p-8 overflow-hidden border border-gray-100 shadow-inner">
              
              {/* Outer Pizza Box / Pan */}
              <div className="absolute inset-4 rounded-full border-4 border-dashed border-gray-200 pointer-events-none animate-[spin_120s_linear_infinite]" />

              {/* Pizza Board Shadow */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-amber-950/5 blur-xl mt-6 pointer-events-none" />

              {/* The Pizza Itself */}
              <div 
                id="interactive-pizza-disc"
                className={`relative rounded-full aspect-square flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-none ease-out border-8 border-orange-100 ${
                  size === 'Small' ? 'w-[70%]' : size === 'Medium' ? 'w-[85%]' : 'w-full'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #dfa26b 0%, #bd7e47 100%)',
                  boxShadow: '0 12px 28px -4px rgba(45,20,5,0.25), inset 0 2px 4px rgba(255,255,255,0.4)'
                }}
              >
                {/* Golden Brown Crust Edge Detail */}
                <div className="absolute inset-2 rounded-full border-4 border-amber-500/20 mix-blend-overlay" />
                
                {/* Sauce Layer */}
                <div className={`absolute inset-4 rounded-full border transition-all duration-300 shadow-inner ${sauceColorClass()}`} />

                {/* Baked Cheese Base - Golden speckled or vegan cheese specs */}
                {selectedToppings.includes('t_vegan_cheese') ? (
                  <div className="absolute inset-5 rounded-full bg-yellow-50/70 backdrop-blur-[0.5px] border border-yellow-200/50 flex flex-wrap gap-2 p-4 justify-center items-center opacity-90 transition-all duration-300">
                    <span className="w-1.5 h-6 bg-yellow-200 rounded-full rotate-45" />
                    <span className="w-1.5 h-6 bg-yellow-200 rounded-full -rotate-12" />
                    <span className="w-1.5 h-6 bg-yellow-100 rounded-full rotate-85" />
                    <span className="w-1.5 h-6 bg-yellow-200 rounded-full -rotate-45" />
                  </div>
                ) : (
                  // Classic Golden Bubbly Mozzarella Specs
                  <div className="absolute inset-5 rounded-full bg-yellow-100/90 shadow-inner flex flex-wrap gap-1 p-2 justify-center items-center opacity-95 transition-all duration-300">
                    <div className="absolute inset-1 rounded-full bg-radial from-yellow-50/50 to-orange-400/20 mix-blend-multiply" />
                    {/* Simulated specks of cooked cheese & herbs */}
                    <span className="absolute top-[20%] left-[40%] text-[8px] text-amber-700 font-bold">●</span>
                    <span className="absolute top-[65%] left-[25%] text-[7px] text-amber-800 font-bold">●</span>
                    <span className="absolute top-[50%] left-[75%] text-[9px] text-amber-900 opacity-60 font-bold">●</span>
                    <span className="absolute top-[30%] left-[80%] text-[6px] text-emerald-800 font-bold">✿</span>
                    <span className="absolute top-[75%] left-[55%] text-[6px] text-emerald-900 font-bold">✿</span>
                  </div>
                )}

                {/* Toppings Dispenser Overlays */}
                {selectedToppings.map(toppingId => {
                  const offsets = toppingOffsets[toppingId] || [];
                  const color = toppingId.includes('cheese') 
                    ? 'text-yellow-600 bg-yellow-100' 
                    : toppingId.includes('pepperoni') || toppingId.includes('sausage') || toppingId.includes('bacon') 
                    ? 'text-red-800 bg-red-100 border-red-900/10' 
                    : 'text-emerald-900 bg-emerald-100';

                  const symbol = toppingId === 't_pepperoni' ? '🔴'
                    : toppingId === 't_mushrooms' ? '🍄'
                    : toppingId === 't_olives' ? '🌑'
                    : toppingId === 't_spinach' ? '🍃'
                    : toppingId === 't_jalapenos' ? '🌶️'
                    : toppingId === 't_sausage' ? '🟤'
                    : toppingId === 't_bacon' ? '🥓'
                    : toppingId === 't_chicken' ? '🍗'
                    : toppingId === 't_artichokes' ? '🥬'
                    : toppingId === 't_bell_peppers' ? '🫑'
                    : toppingId === 't_onions' ? '🧅'
                    : '✦';

                  return offsets.map((point, i) => (
                    <span
                      key={`${toppingId}-${i}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 text-lg sm:text-xl drop-shadow-md animate-scale-in"
                      style={{
                        top: point.y,
                        left: point.x,
                        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                      }}
                    >
                      {symbol}
                    </span>
                  ));
                })}
              </div>
            </div>

            {/* Current Custom Stats Panel */}
            <div className="mt-6 text-center w-full bg-amber-50/50 rounded-2xl p-4 border border-amber-100">
              <span className="text-xs font-mono text-amber-800 uppercase tracking-widest font-bold block mb-1">
                Selected Coordinates
              </span>
              <div className="text-xs text-gray-600 font-mono flex justify-center gap-4 flex-wrap">
                <span>Size: <strong className="text-amber-900">{size}</strong></span>
                <span>Crust: <strong className="text-amber-900">{currentCrust.name.replace('Crust', '')}</strong></span>
                <span>Sauce: <strong className="text-amber-900">{currentSauce.name}</strong></span>
                <span>ToppingsCount: <strong className="text-amber-900">{selectedToppings.length}</strong></span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Build Panel Controls */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* 1. Size Selection */}
          <div id="size-selection-panel">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5">
              <span>01.</span> SELECT PIZZA DIAMETER
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(SIZE_PRICES) as PizzaSize[]).map((sz) => {
                const active = size === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      active
                        ? 'border-amber-600 bg-amber-50/40 text-amber-900 shadow-sm ring-1 ring-amber-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold text-gray-400 mb-0.5">{sz === 'Small' ? '10"' : sz === 'Medium' ? '12"' : '14"'}</span>
                    <span className="text-sm font-display font-extrabold">{sz}</span>
                    <span className="text-xs font-mono font-medium text-amber-700/80 mt-1">${SIZE_PRICES[sz].toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Crust Type Selection */}
          <div id="crust-selection-panel" className="border-t border-gray-100 pt-5">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5">
              <span>02.</span> CRUST THICKNESS & STYLE
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {CRUST_OPTIONS.map((cro) => {
                const active = selectedCrust === cro.id;
                return (
                  <button
                    key={cro.id}
                    onClick={() => setSelectedCrust(cro.id)}
                    className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all ${
                      active
                        ? 'border-amber-600 bg-amber-50/40 text-amber-950 shadow-sm ring-1 ring-amber-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <Disc className={`w-4 h-4 shrink-0 mt-0.5 ${active ? 'text-amber-600' : 'text-gray-300'}`} />
                    <div className="flex flex-col">
                      <span className="text-sm font-display font-bold leading-none">{cro.name}</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {cro.price === 0 ? 'Included' : `+$${cro.price.toFixed(2)}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Base Sauce */}
          <div id="sauce-selection-panel" className="border-t border-gray-100 pt-5">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5">
              <span>03.</span> SPREAD BASE SAUCE
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAUCE_OPTIONS.map((sao) => {
                const active = selectedSauce === sao.id;
                return (
                  <button
                    key={sao.id}
                    onClick={() => setSelectedSauce(sao.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                      active
                        ? 'border-amber-600 bg-amber-50/40 text-amber-950 shadow-sm ring-1 ring-amber-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border border-gray-100 mb-2 ${sao.color}`} />
                    <span className="text-xs font-display font-bold leading-tight">{sao.name}</span>
                    <span className="text-[10px] text-gray-500 mt-1">
                      {sao.price === 0 ? 'Included' : `+$${sao.price.toFixed(2)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Topping categories selection */}
          <div id="toppings-selection-panel" className="border-t border-gray-100 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <span>04.</span> SELECT UNLIMITED TOPPINGS
              </h3>
              
              {/* Category tabs */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {(['cheese', 'meat', 'veg'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`text-xs font-display font-medium px-3 py-1 rounded-lg transition-all capitalize ${
                      activeTab === cat 
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {cat === 'veg' ? 'Veggies' : cat === 'cheese' ? 'Cheeses' : 'Meats'}
                  </button>
                ))}
              </div>
            </div>

            {/* List Toppings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
              {filteredToppings.map(topping => {
                const isSelected = selectedToppings.includes(topping.id);
                return (
                  <button
                    key={topping.id}
                    onClick={() => toggleTopping(topping.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/20 text-amber-950/90'
                        : 'border-gray-100 bg-slate-50 hover:bg-gray-100/70 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-5 h-5 flex items-center justify-center rounded-md border text-xs ${
                        isSelected 
                          ? 'bg-amber-600 border-amber-700 text-white' 
                          : 'bg-white border-gray-200 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-display font-bold truncate">{topping.name}</span>
                    </div>
                    <span className="text-xs font-mono text-amber-800 font-bold ml-2 shrink-0">
                      +${topping.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Total Summary Bar */}
          <div className="mt-4 p-5 rounded-2xl bg-gray-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-gray-400 block">TOTAL VALUE DETECTED</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-display font-extrabold text-amber-400">${totalPrice.toFixed(2)}</span>
                <span className="text-xs font-mono text-gray-400">All coordinates included</span>
              </div>
            </div>
            
            <button
              onClick={handleCreatePizza}
              className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-gray-900 font-display font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm cursor-pointer whitespace-nowrap"
            >
              <Pizza className="w-4 h-4 text-gray-900" />
              Add custom pizza to cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
