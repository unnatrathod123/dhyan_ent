'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';

export default function DevSimulatorBar() {
  const {
    currentTab,
    setTab,
    setIsProductDetailOpen,
    isCreateAccountOpen,
    setIsCreateAccountOpen,
    viewportMode,
    setViewport,
    offlineMode,
    toggleOffline,
    showToast,
    setIsAddNewProductOpen
  } = useStore();

  const isStorefrontActive =
    !isCreateAccountOpen &&
    (currentTab === 'storefront' ||
      currentTab === 'catalog' ||
      currentTab === 'orders' ||
      currentTab === 'warranty');

  const isB2bActive = !isCreateAccountOpen && currentTab === 'b2b';
  const isPosActive = !isCreateAccountOpen && (currentTab === 'pos' || currentTab === 'khata');
  const isInventoryActive = !isCreateAccountOpen && currentTab === 'inventory';

  const handleSelectTab = (tab: 'storefront' | 'b2b' | 'pos' | 'inventory') => {
    setIsProductDetailOpen(false);
    setIsCreateAccountOpen(false);
    setTab(tab);
  };

  return (
    <header className="bg-[#0b1320] border-b border-slate-800 text-white px-4 py-2 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
        {/* Group 1: Module Switcher (Customer Storefront, B2B Wholesale Hub, POS Terminal, Inventory Manager) */}
        <div className="inline-flex items-center bg-[#131d2e] border border-slate-700/60 rounded-full p-1 shrink-0">
          <button
            onClick={() => handleSelectTab('storefront')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isStorefrontActive
                ? 'bg-[#0076df] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>🛒</span>
            <span>Customer Storefront</span>
          </button>

          <button
            onClick={() => handleSelectTab('b2b')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isB2bActive
                ? 'bg-[#0076df] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>🏢</span>
            <span>B2B Wholesale Hub</span>
          </button>

          <button
            onClick={() => handleSelectTab('pos')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isPosActive
                ? 'bg-[#0076df] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>POS Terminal</span>
          </button>

          <button
            onClick={() => handleSelectTab('inventory')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isInventoryActive
                ? 'bg-[#0076df] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>📦</span>
            <span>Inventory Manager</span>
          </button>
        </div>

        {/* Quick Action: Register Product Modal */}
        <button
          onClick={() => {
            setIsProductDetailOpen(false);
            setIsAddNewProductOpen(true);
          }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full px-3.5 py-1.5 text-xs font-bold shadow-md transition-all shrink-0 cursor-pointer active:scale-95"
          title="Register New Hardware Product & Stock"
        >
          <span className="font-extrabold text-sm leading-none">+</span>
          <span>Register Product</span>
        </button>

        {/* Group 2: Viewport Switcher (390px Mobile, Full Width) */}
        <div className="inline-flex items-center bg-[#131d2e] border border-slate-700/60 rounded-full p-1 shrink-0">
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewportMode === 'mobile'
                ? 'bg-[#0076df] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>📱</span>
            <span>390px Mobile</span>
          </button>

          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewportMode === 'desktop'
                ? 'bg-[#0076df] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>💻</span>
            <span>Full Width</span>
          </button>
        </div>

        {/* Group 3: Online / Offline Toggle & Create Account */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              toggleOffline();
              showToast(
                offlineMode ? 'Switched to Online Mode' : 'Switched to Offline Mode (Cached)',
                offlineMode ? 'success' : 'normal'
              );
            }}
            className="inline-flex items-center gap-2 bg-[#131d2e] border border-slate-700/60 hover:border-slate-500 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all shrink-0 cursor-pointer"
            title="Toggle Online / Offline Network Simulation"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                offlineMode
                  ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                  : 'bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse'
              }`}
            ></span>
            <span>Online / Offline</span>
          </button>

          <button
            onClick={() => {
              setIsProductDetailOpen(false);
              setIsCreateAccountOpen(!isCreateAccountOpen);
            }}
            className={`inline-flex items-center gap-1.5 border rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              isCreateAccountOpen
                ? 'bg-[#0076df] border-[#0076df] text-white shadow-sm'
                : 'bg-[#131d2e] border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500'
            }`}
            title="Open Create Account / Registration Page"
          >
            <span>📝</span>
            <span>Register</span>
          </button>
        </div>
      </div>
    </header>
  );
}
