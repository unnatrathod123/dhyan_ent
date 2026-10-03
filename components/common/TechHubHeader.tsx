'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency, formatProductPrice } from '@/lib/utils/formatters';
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  LogOut,
  Layers,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

interface TechHubHeaderProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

export default function TechHubHeader({ onSelectCategory, activeCategory }: TechHubHeaderProps) {
  const {
    currentUser,
    cart,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsAuthModalOpen,
    setAuthModalTab,
    toggleB2BApproval,
    logoutUser,
    products,
    searchQuery,
    setSearchQuery,
    setTab
  } = useStore();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Compute cart total
  const cartTotalCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const cartTotalPrice = cart.reduce((acc, item) => {
    const prod = products.find((p) => p.id === item.productId);
    if (!prod) return acc;
    const isApprovedB2B = currentUser?.role === 'b2b' && currentUser.b2bStatus === 'approved';
    let unitPrice = 0;
    if (currency === 'USD') {
      unitPrice = isApprovedB2B
        ? prod.wholesalePriceUSD ?? Math.round(prod.wholesalePrice / 83)
        : prod.retailPriceUSD ?? Math.round(prod.retailPrice / 83);
    } else {
      unitPrice = isApprovedB2B ? prod.wholesalePrice : prod.retailPrice;
    }
    return acc + (unitPrice || 0) * item.qty;
  }, 0);


  const navCategories = [
    { id: 'phones', label: 'Phones' },
    { id: 'cables', label: 'Cables' },
    { id: 'chargers', label: 'Chargers' },
    { id: 'spare_parts', label: 'Spare Parts' }
  ];

  const brandsList = ['Samsung', 'Apple', 'Anker', 'Belkin', 'Nothing', 'Xiaomi', 'TechHub'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Notice for B2B verification status */}
      {currentUser?.role === 'b2b' && (
        <div
          className={`px-4 py-1.5 text-xs flex items-center justify-between font-medium ${
            currentUser.b2bStatus === 'approved'
              ? 'bg-blue-50 text-blue-900 border-b border-blue-100'
              : 'bg-amber-50 text-amber-900 border-b border-amber-200'
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {currentUser.b2bStatus === 'approved' ? (
                <>
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>
                    <strong>Wholesale Dealer Verified:</strong> {currentUser.businessName || 'Your Business'} • Bulk volume tiered pricing active.
                  </span>
                </>
              ) : (
                <>
                  <Clock size={14} className="text-amber-600 animate-pulse" />
                  <span>
                    <strong>Verification Under Review:</strong> Your B2B Wholesale account is pending manual compliance review. (Option B selected)
                  </span>
                </>
              )}
            </div>

            {/* Quick Admin Simulation Toggle to test both states */}
            <button
              onClick={toggleB2BApproval}
              className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border transition ${
                currentUser.b2bStatus === 'approved'
                  ? 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                  : 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700'
              }`}
              title="Toggle between pending review and approved wholesale dealer mode"
            >
              {currentUser.b2bStatus === 'approved' ? '↺ Reset to Pending' : '⚡ Simulate Admin Approval'}
            </button>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* 1. Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-slate-900"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div
              onClick={() => {
                onSelectCategory?.('all');
                if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="relative h-9 w-32 sm:w-36">
                <Image
                  src="/Dhyan_Logo.png"
                  alt="Dhyan Enterprise"
                  fill
                  sizes="(max-width: 640px) 128px, 144px"
                  priority
                  className="object-contain object-left"
                />
              </div>
            </div>
          </div>


          {/* 2. Navigation Category Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.id)}
                className={`transition hover:text-[#2563eb] pb-0.5 ${
                  activeCategory === cat.id ? 'text-[#2563eb] font-semibold border-b-2 border-[#2563eb]' : ''
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Brands Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsBrandsDropdownOpen(!isBrandsDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#2563eb] transition"
              >
                <span>Brands</span>
                <ChevronDown size={14} className={isBrandsDropdownOpen ? 'rotate-180 transition' : 'transition'} />
              </button>

              {isBrandsDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setIsBrandsDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Popular Brands
                  </div>
                  {brandsList.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSearchQuery(brand);
                        setIsBrandsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#2563eb] transition"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* 3. Search Bar */}
          <div className="flex-1 max-w-md relative">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-full pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 4. Right Controls: Currency Toggle, Account & Cart */}
          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-full font-medium transition ${
                  currency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-0.5 rounded-full font-medium transition ${
                  currency === 'INR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ₹ INR
              </button>
            </div>

            {/* User Account / Profile */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-full border text-xs font-medium transition ${
                    currentUser.role === 'b2b'
                      ? currentUser.b2bStatus === 'approved'
                        ? 'bg-blue-50/80 border-blue-200 text-blue-800'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <User size={16} />
                  <span className="hidden md:inline max-w-[120px] truncate">
                    {currentUser.role === 'b2b'
                      ? currentUser.businessName || currentUser.fullName
                      : currentUser.fullName}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                      currentUser.role === 'b2b'
                        ? currentUser.b2bStatus === 'approved'
                          ? 'bg-blue-600 text-white'
                          : 'bg-amber-500 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {currentUser.role === 'b2b'
                      ? currentUser.b2bStatus === 'approved'
                        ? 'B2B'
                        : 'Review'
                      : 'B2C'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-[#2563eb] p-1.5 rounded-lg text-sm font-medium transition"
                  title="Sign In or Register"
                >
                  <User size={19} />
                  <span className="hidden sm:inline text-xs font-semibold">Sign In</span>
                </button>
              )}

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && currentUser && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">{currentUser.fullName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                    <div className="mt-1">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                          currentUser.role === 'b2b'
                            ? currentUser.b2bStatus === 'approved'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {currentUser.role === 'b2b'
                          ? currentUser.b2bStatus === 'approved'
                            ? '🏢 Wholesale Dealer (Verified)'
                            : '⏳ Wholesale Review Pending'
                          : '👤 Personal Shopper (B2C)'}
                      </span>
                    </div>
                  </div>

                  {currentUser.role === 'b2b' && (
                    <div className="px-3 py-2 border-b border-slate-100 text-xs">
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Credit Limit:</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(currentUser.creditLimit, currency)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          toggleB2BApproval();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left text-[11px] font-semibold text-blue-600 hover:underline mt-1"
                      >
                        ⚡ Simulate Admin Approval Toggle
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      logoutUser();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#2563eb] p-1.5 rounded-lg transition relative"
              title="View Cart"
            >
              <ShoppingCart size={20} />
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline">
                {formatCurrency(cartTotalPrice, currency)}
              </span>

              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2563eb] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2 animate-in fade-in">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory?.(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-1.5 text-sm font-medium text-slate-700 hover:text-[#2563eb]"
              >
                {cat.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2">
              <span className="text-xs text-slate-500 font-medium">Currency:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-0.5 rounded text-xs ${currency === 'USD' ? 'bg-[#2563eb] text-white' : 'bg-slate-100'}`}
                >
                  $ USD
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-2 py-0.5 rounded text-xs ${currency === 'INR' ? 'bg-[#2563eb] text-white' : 'bg-slate-100'}`}
                >
                  ₹ INR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
