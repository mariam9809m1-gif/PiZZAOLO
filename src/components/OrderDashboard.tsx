/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClipboardList, Clock, Flame, Bike, CheckCircle2, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderDashboardProps {
  orders: Order[];
  onRefreshOrders: () => void;
  onSimulateStatus: (orderId: string) => void;
}

export default function OrderDashboard({ orders, onRefreshOrders, onSimulateStatus }: OrderDashboardProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Auto-select latest active order if available and none selected yet
  React.useEffect(() => {
    if (orders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  const activeOrder = orders.find(o => o.id === selectedOrderId);

  // Status mapping visual states
  const statusSteps: { status: OrderStatus; label: string; desc: string; icon: any; color: string }[] = [
    { 
      status: 'Pending', 
      label: 'Order Raised', 
      desc: 'Our chefs are verifying and allocating coordinates', 
      icon: ClipboardList, 
      color: 'text-amber-500 bg-amber-50 border-amber-200' 
    },
    { 
      status: 'In the Oven', 
      label: 'In Oven (485°C)', 
      desc: 'Sourdough baking and cheese swelling on oak embers', 
      icon: Flame, 
      color: 'text-orange-500 bg-orange-50 border-orange-200' 
    },
    { 
      status: 'Out for Delivery', 
      label: 'Out For Delivery', 
      desc: 'Courier speed transit to your coordinates', 
      icon: Bike, 
      color: 'text-blue-500 bg-blue-50 border-blue-200' 
    },
    { 
      status: 'Delivered', 
      label: 'Delivered', 
      desc: 'Buon Appetito! Wood-fired perfection received', 
      icon: CheckCircle2, 
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200' 
    }
  ];

  const getStepProgressIndex = (status: OrderStatus) => {
    if (status === 'Pending') return 0;
    if (status === 'In the Oven') return 1;
    if (status === 'Out for Delivery') return 2;
    if (status === 'Delivered') return 3;
    return 0;
  };

  const getPizzaFormattedName = (item: any) => {
    if (!item.isCustom) {
      return item.presetPizza?.name || 'Traditional Recipe';
    }
    return `Custom Base (${item.customPizza?.size || 'Medium'})`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* List of orders Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-gray-400 font-bold tracking-widest">
            ORDER LOGS ({orders.length})
          </h3>
          <button 
            onClick={onRefreshOrders}
            className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-600 font-display font-bold py-1 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100/60 border border-amber-100 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>sync logs</span>
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
            <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h4 className="text-sm font-display font-bold text-gray-700">No active sessions</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Place a custom or recipe pizza order from our main tabs to see active telemetry monitoring.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {orders.map((ord) => {
              const active = selectedOrderId === ord.id;
              const date = new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <button
                  key={ord.id}
                  onClick={() => setSelectedOrderId(ord.id)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all ${
                    active
                      ? 'border-amber-600 bg-amber-50/20 shadow-xs'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-800">{ord.id}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{date}</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 mt-1 block truncate">
                      {ord.items.length} Pizzas • Total: ${ord.total.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      ord.status === 'Delivered' 
                        ? 'bg-emerald-50 text-emerald-800' 
                        : ord.status === 'Out for Delivery' 
                        ? 'bg-blue-50 text-blue-800'
                        : ord.status === 'In the Oven'
                        ? 'bg-orange-50 text-orange-850'
                        : 'bg-amber-50 text-amber-850'
                    }`}>
                      {ord.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main progression telemetry board */}
      <div className="lg:col-span-8">
        {!activeOrder ? (
          <div className="bg-slate-50 border border-gray-100 rounded-3xl p-12 text-center text-gray-400 h-full flex flex-col items-center justify-center">
            <Clock className="w-12 h-12 text-gray-300 mb-3" />
            <span className="font-display font-extrabold text-gray-750">Select an Order</span>
            <p className="text-xs text-gray-400 max-w-xs mt-1">Select an active order thread from the log to see kitchen status.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8 space-y-6">
            
            {/* Header coordinates */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-450 block">LIVE TELEMETRY</span>
                <h3 className="text-xl font-display font-extrabold text-slate-900 mt-0.5 flex items-center gap-2">
                  <span>Order ID:</span>
                  <span className="font-mono text-amber-600 text-lg">{activeOrder.id}</span>
                </h3>
              </div>

              {/* Advanced Interactive Testing - Manual override button */}
              <button
                onClick={() => onSimulateStatus(activeOrder.id)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                title="Manually accelerate order state to test the steps instantly"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]" />
                Advance Status (interactive test)
              </button>
            </div>

            {/* Simulated Kitchen Timeline Steps */}
            <div className="space-y-6 relative pl-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {statusSteps.map((step, index) => {
                const orderProgressIndex = getStepProgressIndex(activeOrder.status);
                const isCompleted = orderProgressIndex >= index;
                const isCurrent = orderProgressIndex === index;
                const Icon = step.icon;

                return (
                  <div 
                    key={step.status}
                    className={`relative ${isCompleted ? 'opacity-100' : 'opacity-40 transition-opacity'}`}
                  >
                    {/* Node Pointer icon */}
                    <div className={`absolute -left-[30px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCurrent 
                        ? 'bg-amber-600 border-amber-600 text-white shadow-md shadow-amber-500/20' 
                        : isCompleted 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-white border-gray-200 text-gray-300'
                    }`}>
                      {isCompleted && !isCurrent ? (
                        <span className="text-[10.5px] font-bold">✓</span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold">{index + 1}</span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h4 className={`text-sm font-display font-extrabold ${isCurrent ? 'text-amber-600 font-extrabold' : 'text-gray-900'}`}>
                          {step.label} {isCurrent && '• ACTIVE NOW'}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                      
                      {isCurrent && (
                        <span className="text-[10px] font-mono leading-none bg-amber-50 text-amber-800 font-bold px-2 py-1 rounded-md border border-amber-100 shrink-0 self-start">
                          Estimated Cooking...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recipe summary panel inside details */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-gray-100/60 mt-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block mb-3">
                CRUST RECIPE SPECIFICATIONS
              </span>
              <div className="space-y-3.5 divide-y divide-gray-100 text-xs">
                {activeOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 pt-3.5 first:pt-0">
                    <div>
                      <h5 className="font-display font-extrabold text-slate-900">
                        {getPizzaFormattedName(it)}
                      </h5>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                        {it.isCustom && it.customPizza
                          ? `Crust: ${it.customPizza.crust} • Sauce: ${it.customPizza.sauce}`
                          : `Original recipe configuration • Size: ${it.customPizza?.size || 'Medium'}`
                        }
                      </p>
                    </div>
                    <span className="font-mono text-gray-600 shrink-0">
                      Qty: <strong>{it.quantity}</strong> • ${(it.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                {/* Subtotals */}
                <div className="pt-3.5 text-xs text-gray-500 font-mono space-y-1">
                  <div className="flex justify-between"><span>Subtotal:</span><span>${activeOrder.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Delivery sales taxes:</span><span>${activeOrder.tax.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Courier transport:</span><span>${activeOrder.deliveryFee.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-slate-900 font-display font-extrabold pt-2">
                    <span>Total Paid:</span>
                    <span className="text-amber-600">${activeOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400">SHIPPING NAME</span>
                <p className="text-slate-800 font-display font-bold mt-1 text-sm">{activeOrder.customerDetails.name}</p>
                <p className="text-gray-500 mt-0.5 font-mono">{activeOrder.customerDetails.phone}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400">DESTINATION COORDS</span>
                <p className="text-slate-800 font-display font-bold mt-1 leading-relaxed">{activeOrder.customerDetails.address}</p>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
