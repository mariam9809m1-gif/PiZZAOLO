import React from 'react';
import { Flame, Clock, Award, ShieldCheck, ArrowRight, Star, Heart, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { PresetPizza, PizzaSize } from '../types';

interface HomeProps {
  popularItems: PresetPizza[];
  onNavigate: (page: 'menu' | 'about' | 'gallery' | 'contact' | 'order' | 'customizer') => void;
  onQuickOrder: (pizza: PresetPizza) => void;
}

const TESTIMONIALS = [
  {
    name: 'Marco Rossi',
    role: 'Naples Native & Food Critic',
    comment: 'The crust is charred to perfection at 485°C. Exactly like the pizzerias on Via dei Tribunali in Napoli. Truly extraordinary craftsmanship.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Sophia Laurent',
    role: 'Culinary Blogger',
    comment: 'No sugar, 48-hour fermented dough, and DOP San Marzano tomatoes. You can taste the purity of ingredients in every single bite.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Alessandro Greco',
    role: 'Loyal Customer',
    comment: 'Fast 12-15 min preparation time and arrives piping hot. The Salsiccia Calabrese is my absolute weekend obsession!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export default function Home({ popularItems, onNavigate, onQuickOrder }: HomeProps) {
  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION REDESIGN */}
      <section className="relative min-h-[620px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl mx-4 mt-2">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1800" 
            alt="Woodfired Artisan Oven Pizza" 
            className="w-full h-full object-cover brightness-[0.45] scale-105 transition-transform duration-1000 ease-out hover:scale-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
              (e.currentTarget as HTMLImageElement).onerror = null;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20 text-white space-y-8">
          {/* Est. Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C41E3A]/90 text-white border border-red-400/40 text-xs font-mono font-bold uppercase tracking-widest shadow-lg animate-fade-in">
            <Flame className="w-4 h-4 text-[#FFD700]" />
            <span>PIZZAIOLO • EST. Napoli 1982</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-[#FFF8E7] leading-[1.1]">
            Authentic Neapolitan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF8E7] to-[#008C45]">
              Woodfired Pizza
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-sans leading-relaxed">
            Crafted with 48-hour fermented sourdough, imported Campania DOP buffalo mozzarella, and blistered in our custom 485°C oakwood oven. Ready in just 12-15 minutes.
          </p>

          {/* 2 CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto bg-[#C41E3A] hover:bg-[#a0182f] text-white font-display text-base font-bold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 cursor-pointer border border-red-400/30"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('order')}
              className="w-full sm:w-auto bg-[#008C45] hover:bg-[#007037] text-white font-display text-base font-bold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 cursor-pointer border border-green-400/30"
            >
              <span>Order Online Now</span>
              <Flame className="w-5 h-5 text-[#FFD700]" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 max-w-3xl mx-auto text-left sm:text-center">
            <div className="flex items-center sm:justify-center gap-2 text-xs font-semibold text-[#FFF8E7]">
              <Clock className="w-5 h-5 text-[#FFD700] shrink-0" />
              <span>Ready in 12-15 Mins</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-semibold text-[#FFF8E7]">
              <Flame className="w-5 h-5 text-[#C41E3A] shrink-0" />
              <span>485°C Oakwood Oven</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-semibold text-[#FFF8E7]">
              <Award className="w-5 h-5 text-[#008C45] shrink-0" />
              <span>Fresh Daily Ingredients</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-semibold text-[#FFF8E7]">
              <ShieldCheck className="w-5 h-5 text-[#FFD700] shrink-0" />
              <span>Free Local Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS BANNER */}
      <section className="mx-4">
        <div className="bg-gradient-to-r from-[#C41E3A] via-slate-900 to-[#008C45] p-1 rounded-3xl shadow-xl">
          <div className="bg-slate-950 rounded-[22px] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-md bg-[#FFD700] text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-widest">
                💥 Limited Time Offer
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#FFF8E7]">
                Two-For-Tuesday Feast
              </h2>
              <p className="text-slate-300 text-sm max-w-xl">
                Order any two Neapolitan Classic or Specialty pizzas online and receive complimentary Truffle Parmigiano Fries & Woodfired Garlic Dough Balls!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <div className="bg-white/10 px-6 py-3 rounded-xl border border-white/20 text-center font-mono">
                <span className="text-[10px] text-slate-400 block uppercase">Use Promo Code</span>
                <span className="text-lg font-bold text-[#FFD700] tracking-widest">NAPOLI2026</span>
              </div>
              <button
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#e6c200] text-slate-950 font-display font-bold px-8 py-4 rounded-xl transition-transform hover:scale-105 cursor-pointer shadow-lg"
              >
                Claim Offer Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RESTAURANT HERITAGE & 3 FEATURE BULLETS */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C41E3A]">
            • OUR PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 leading-tight">
            Born in Naples. <br />
            <span className="text-[#008C45]">Perfected for You.</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed font-sans">
            Founded in 1982 by Master Pizzaiolo Gennaro Esposito, PIZZAIOLO brings the uncompromising standards of true Neapolitan street food directly to your table. We believe great pizza is an art form of restraint — relying purely on exceptional flour, clean water, sea salt, and time.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFF8E7]/60 border border-amber-200/50">
              <div className="p-2.5 rounded-xl bg-[#C41E3A] text-white mt-0.5 shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">00 Caputo Italian Flour</h4>
                <p className="text-xs text-slate-600 mt-1">
                  We use strictly finely milled Italian Tipo &apos;00&apos; wheat flour for a light, digestible, and airy charred honeycomb crust.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFF8E7]/60 border border-amber-200/50">
              <div className="p-2.5 rounded-xl bg-[#008C45] text-white mt-0.5 shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">Zero Added Sugars or Preservatives</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Our rustic marinara is crafted naturally from vine-ripened San Marzano plum tomatoes grown in the volcanic soil of Mount Vesuvius.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFF8E7]/60 border border-amber-200/50">
              <div className="p-2.5 rounded-xl bg-[#FFD700] text-slate-950 mt-0.5 shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">Fresh Daily Hand-Pulled Cheese</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Our Fior di Latte and Campania Buffalo Mozzarella arrive fresh every single morning for unmistakable creamy richness.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600" 
              alt="Artisan Woodfired Pizza" 
              className="rounded-3xl object-cover h-64 w-full shadow-lg translate-y-8"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
            <img 
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600" 
              alt="Neapolitan Pizza Preparation" 
              className="rounded-3xl object-cover h-64 w-full shadow-lg -translate-y-4"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
          </div>
          {/* Badge Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 text-white p-6 rounded-3xl shadow-2xl border border-[#FFD700]/40 text-center space-y-1 min-w-[200px]">
            <span className="text-3xl font-display font-black text-[#FFD700]">485°C</span>
            <span className="text-xs font-mono block text-slate-300 uppercase tracking-wider">Oakwood Blistered</span>
          </div>
        </div>
      </section>

      {/* POPULAR BESTSELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="text-left">
            <span className="text-xs font-mono font-bold text-[#C41E3A] uppercase tracking-widest">• CROWD FAVORITES</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-1">
              Most Popular Masterpieces
            </h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="text-sm font-display font-bold text-[#008C45] hover:text-[#006030] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularItems.slice(0, 3).map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-2xl text-left group"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                    (e.currentTarget as HTMLImageElement).onerror = null;
                  }}
                />
                <div className="absolute top-4 left-4 bg-[#C41E3A] text-white text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                  <span>Bestseller</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md text-[#FFD700] px-3 py-1 rounded-xl text-sm font-mono font-bold shadow-md">
                  From ${(item.basePrice - 2).toFixed(2)}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-[#C41E3A] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => onQuickOrder(item)}
                  className="w-full bg-slate-900 hover:bg-[#C41E3A] text-white font-display text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Add to Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="bg-[#FFF8E7] py-16 px-6 rounded-3xl mx-4 border border-amber-200/40">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#C41E3A] uppercase tracking-widest">• LOVED BY THOUSANDS</span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900">
              What Our Diners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-amber-100 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    &quot;{t.comment}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#008C45]" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop";
                      (e.currentTarget as HTMLImageElement).onerror = null;
                    }}
                  />
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">{t.name}</h4>
                    <span className="text-[11px] text-slate-500 font-sans block">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGNUP (MOCK) */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#C41E3A]/10 rounded-full blur-3xl" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#008C45]/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#FFF8E7]">
              Join the Naples Secret Club
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Subscribe to get secret off-menu recipes, priority weekend reservations, and an instant 15% discount voucher on your first order.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Grazie! Check your inbox for your 15% discount code.'); }} className="pt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                required 
                placeholder="Enter your email address..." 
                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-4 py-3.5 flex-1 focus:outline-none focus:border-[#FFD700]"
              />
              <button 
                type="submit" 
                className="bg-[#C41E3A] hover:bg-[#a0182f] text-white font-display text-xs font-bold px-6 py-3.5 rounded-xl cursor-pointer transition-transform hover:scale-105 shadow-md"
              >
                Join & Save 15%
              </button>
            </form>
            <span className="text-[10px] text-slate-500 block">No spam ever. Unsubscribe anytime with one click.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
