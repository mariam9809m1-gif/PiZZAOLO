import React from 'react';
import { Award, Flame, Heart, MapPin, Users, CheckCircle2, Star, Clock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-left">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C41E3A]/10 text-[#C41E3A] text-xs font-mono font-bold uppercase tracking-widest">
          <Flame className="w-4 h-4 text-[#C41E3A]" />
          <span>ESTABLISHED 1982 • NAPOLI</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
          Our Heritage & Passion
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
          From a humble woodfired stall in the alleys of Spaccanapoli to an award-winning Neapolitan culinary institution.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" 
            alt="Traditional Neapolitan Restaurant" 
            className="rounded-3xl object-cover w-full h-[450px] shadow-2xl"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
              (e.currentTarget as HTMLImageElement).onerror = null;
            }}
          />
          <div className="absolute -bottom-6 -right-6 bg-[#FFF8E7] p-6 rounded-3xl shadow-xl border border-amber-200 hidden sm:block">
            <div className="flex items-center gap-3">
              <Award className="w-10 h-10 text-[#008C45]" />
              <div>
                <strong className="text-xl font-display font-black text-slate-900 block">AVPN Certified</strong>
                <span className="text-xs text-slate-600">Associazione Verace Pizza Napoletana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-xs font-mono font-bold text-[#008C45] uppercase tracking-widest">• THE BEGINNING</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 leading-tight">
            Preserving the Soul of True Neapolitan Street Food
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            In 1982, Nonno Gennaro Esposito built our first brick oven by hand using volcanic stone harvested from the slopes of Mount Vesuvius. His mission was uncompromising: serve pizzas that honor the centuries-old traditions of Naples, without shortcuts, commercial additives, or rushed fermentation.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Today, the second and third generations of the Esposito family continue that exact legacy. Every dough ball is naturally leavened for 48 hours, hand-stretched without rolling pins, and blistered at 485°C for exactly 90 seconds.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <span className="text-3xl font-display font-black text-[#C41E3A]">48 hrs</span>
              <span className="text-xs text-slate-500 block font-mono">Dough Fermentation</span>
            </div>
            <div>
              <span className="text-3xl font-display font-black text-[#008C45]">100% DOP</span>
              <span className="text-xs text-slate-500 block font-mono">Imported Campania Cheese</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chef Bio Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-4">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600" 
              alt="Master Pizzaiolo Marco Esposito" 
              className="rounded-2xl object-cover w-full h-80 shadow-lg border-2 border-[#FFD700]/30 mx-auto"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-[#FFD700] text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider">
              Meet Master Pizzaiolo
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#FFF8E7]">
              Chef Gennaro &quot;Rino&quot; Esposito Jr.
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              &quot;To make a Neapolitan pizza is to engage in a dialogue with fire and humidity. You cannot force the dough; you must listen to it. When our diners bite into the charred honeycomb crust and taste the sweetness of the San Marzano tomatoes, they are tasting 44 years of our family&apos;s devotion.&quot;
            </p>
            <div className="flex flex-wrap gap-6 pt-2 text-xs text-[#FFD700] font-mono">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-[#FFD700]" /> 3x World Pizza Champion</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Gambero Rosso Tre Spicchi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="space-y-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#C41E3A] uppercase tracking-widest">• SACRED INGREDIENTS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
            No Compromise. Ever.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-3">
            <img 
              src="https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?auto=format&fit=crop&q=80&w=400" 
              alt="Mozzarella" 
              className="w-full h-40 object-cover rounded-xl" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
            <h4 className="font-display font-bold text-slate-900 text-base">Mozzarella di Bufala</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Flown in directly from Caserta, Campania. Creamy, tangy, and rich in fresh milk flavor.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-3">
            <img 
              src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400" 
              alt="Tomatoes" 
              className="w-full h-40 object-cover rounded-xl" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
            <h4 className="font-display font-bold text-slate-900 text-base">San Marzano DOP</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Sweet plum tomatoes grown in the volcanic ash of Vesuvius. Low acidity and zero added sugar.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-3">
            <img 
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400" 
              alt="Flour" 
              className="w-full h-40 object-cover rounded-xl" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
            <h4 className="font-display font-bold text-slate-900 text-base">Caputo Tipo &apos;00&apos;</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Ultra-fine milled Italian soft wheat flour that creates our signature tender, airy cornione (crust).</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-3">
            <img 
              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400" 
              alt="Olive Oil" 
              className="w-full h-40 object-cover rounded-xl" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
            <h4 className="font-display font-bold text-slate-900 text-base">Extra Virgin Olive Oil</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Cold-pressed Sicilian organic olive oil finished over every slice right as it exits the wood oven.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
