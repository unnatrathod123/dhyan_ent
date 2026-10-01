'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { Home, Grid, FileText, ShoppingBag } from 'lucide-react';

export default function BottomNav() {
  const { currentTab, setTab, cart } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // If in POS, Khata, B2B, or Checkout (orders), those screens provide their own dedicated actions
  if (currentTab === 'pos' || currentTab === 'khata' || currentTab === 'b2b' || currentTab === 'orders') {
    return null;
  }

  const activeTab: string = currentTab;

  return (
    <footer className="bg-white/98 backdrop-blur-md border-t border-[#e5eeff] shrink-0 sticky bottom-0 z-30 shadow-lg">
      <div className="grid grid-cols-4 py-2 px-2 max-w-lg mx-auto">
        {/* Tab 1: Home */}
        <button
          onClick={() => setTab('storefront')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition ${
            currentTab === 'storefront'
              ? 'text-[#005db3] font-black'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Home size={20} strokeWidth={currentTab === 'storefront' ? 2.5 : 2} />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Tab 2: Catalog */}
        <button
          onClick={() => setTab('catalog')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition ${
            currentTab === 'catalog'
              ? 'text-[#005db3] font-black'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Grid size={20} strokeWidth={currentTab === 'catalog' ? 2.5 : 2} />
          <span className="text-[10px] tracking-tight">Catalog</span>
        </button>

        {/* Tab 3: Orders */}
        <button
          onClick={() => setTab('orders')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition ${
            activeTab === 'orders'
              ? 'text-[#005db3] font-black'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <FileText size={20} strokeWidth={activeTab === 'orders' ? 2.5 : 2} />
          <span className="text-[10px] tracking-tight">Orders</span>
        </button>

        {/* Tab 4: Cart */}
        <button
          onClick={() => setTab('orders')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition relative ${
            activeTab === 'orders'
              ? 'text-[#005db3] font-black'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={activeTab === 'orders' ? 2.5 : 2} />
            <span className="absolute -top-1.5 -right-2 bg-[#0076df] text-white font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {totalCartCount > 0 ? totalCartCount : 2}
            </span>
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>
      </div>
    </footer>
  );
}
