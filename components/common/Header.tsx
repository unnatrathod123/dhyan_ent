'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import { Search, ScanBarcode, Bookmark, ShoppingBag, WifiOff, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const {
    cart,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setRole,
    offlineMode,
    syncOfflineQueue,
    offlineQueue,
    setTab,
    showToast
  } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shrink-0">

      {/* Offline Alert Banner */}
      {offlineMode && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-900 font-medium animate-in fade-in">
          <div className="flex items-center gap-2">
            <WifiOff size={14} className="text-amber-700 shrink-0" />
            <span>Working in Offline Mode. Transactions cached locally.</span>
          </div>
          <button
            onClick={syncOfflineQueue}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-2.5 py-1 rounded-md text-[11px] transition"
          >
            <RefreshCw size={11} />
            <span>Sync ({offlineQueue.length})</span>
          </button>
        </div>
      )}

      {/* Main App Brand & Action Row */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          {/* Brand & Location */}
          <div className="cursor-pointer flex items-center gap-3" onClick={() => setTab('storefront')}>
            <div className="relative h-8 w-28 sm:w-32">
              <Image
                src="/Dhyan_Logo.png"
                alt="Dhyan Enterprise"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
            <div className="text-[11px] text-[#64748B] font-medium hidden sm:flex items-center gap-1 border-l border-slate-200 pl-2.5">
              <span>Desk #02</span>
              <span className="text-emerald-600 font-semibold">• Open</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTab('storefront');
                showToast('Loaded full inventory catalog!', 'normal');
              }}
              className="w-9 h-9 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0076DF] transition active:scale-95"
              title="Saved Wishlist"
            >
              <Bookmark size={18} />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-9 h-9 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0076DF] transition relative active:scale-95"
              title="Shopping Bag"
            >
              <ShoppingBag size={18} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0076DF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Global Search Bar with Integrated Barcode Scanner Trigger */}
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-[#94A3B8] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onOpenSearch}
            placeholder="Search phones, SKUs, GaN chargers..."
            className="w-full bg-[#F8FAFC] hover:bg-white focus:bg-white text-sm text-[#0F172A] pl-9 pr-11 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0076DF] focus:ring-2 focus:ring-[#0076DF]/20 outline-none transition placeholder:text-[#94A3B8]"
          />
          <button
            onClick={() => {
              setRole('pos');
              showToast('Switched to Barcode POS Scanner!', 'normal');
            }}
            className="absolute right-1.5 w-8 h-8 rounded-lg text-[#0076DF] hover:bg-[#0076DF]/10 flex items-center justify-center transition active:scale-90"
            title="Scan Hardware Barcode"
          >
            <ScanBarcode size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
