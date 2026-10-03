'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  Menu,
  Search,
  Bell,
  Mic,
  QrCode,
  Heart,
  ShoppingCart,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Zap,
  Shield,
  Headphones,
  RotateCcw,
  CreditCard,
  Plus,
  PhoneCall,
  Flame,
  Star
} from 'lucide-react';

export default function StitchHomeView() {
  const {
    products,
    cart,
    setSelectedProduct,
    setIsProductDetailOpen,
    addToCart,
    setIsCartOpen,
    showToast
  } = useStore();

  // Flash deals countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 32 });
  const [activeBrand, setActiveBrand] = useState('All');
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashDealProducts = products.filter(
    (p) =>
      p.category === 'smartphones' &&
      (activeBrand === 'All' || p.brand.toLowerCase() === activeBrand.toLowerCase()) &&
      (!searchVal.trim() ||
        p.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchVal.toLowerCase()))
  );

  const accessoryProducts = products.filter(
    (p) =>
      p.category !== 'smartphones' &&
      (!searchVal.trim() ||
        p.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchVal.toLowerCase()))
  );

  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart(product.id, product.variants[0] || 'Standard', product.colors[0]?.name || 'Standard', 1);
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-full pb-10">
      {/* 1. TOP APP BAR (Stitch Exact) */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-[#e5eeff] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button className="text-[#0b1c30] hover:text-[#005db3] transition p-1">
            <Menu size={22} />
          </button>

          {/* Dhyan Enterprise Official Logo */}
          <div
            className="cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative h-7 w-28 sm:w-32">
              <Image
                src="/Dhyan_Logo.png"
                alt="Dhyan Enterprise"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                priority
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Green Status Pill */}
          <div className="hidden min-[380px]:flex items-center gap-1.5 bg-[#ecfdf5] border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>STORE OPEN • TILL 10PM</span>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#414753] hover:bg-[#eff4ff] relative transition cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0076df] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>

          <button
            onClick={() => showToast('Store open till 10:00 PM tonight', 'normal')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#414753] hover:bg-[#eff4ff] relative cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>

          {/* Profile / Verified Store Badge */}
          <div
            className="w-7 h-7 rounded-lg bg-[#dae2fd] text-[#004689] font-bold text-[11px] flex items-center justify-center border border-[#c1c6d5] shadow-2xs"
            title="Dhyan Enterprise Official Hub"
          >
            DE
          </div>
        </div>
      </div>

      {/* 2. SEARCH BAR (Stitch Exact with Mic & QR Button) */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative flex items-center bg-[#eff4ff] border border-[#d3e4fe] rounded-full px-3.5 py-2 shadow-inner">
          <Search size={17} className="text-[#717784] mr-2 shrink-0" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search 5G phones, chargers, earbuds..."
            className="w-full bg-transparent text-xs text-[#0b1c30] placeholder:text-[#717784] outline-none"
          />
          <div className="flex items-center gap-2 pl-2">
            <button
              onClick={() => showToast('Voice search listening...', 'normal')}
              className="text-[#717784] hover:text-[#0b1c30]"
              title="Voice Search"
            >
              <Mic size={16} />
            </button>
            <button
              onClick={() => showToast('Barcode camera active for quick SKU scan', 'normal')}
              className="w-6 h-6 rounded-full bg-[#0076df] text-white flex items-center justify-center shadow-sm"
              title="Barcode Scanner"
            >
              <QrCode size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. STORE DISPATCH HUB BANNER (Stitch Exact) */}
      <div className="px-4 py-1.5">
        <div className="bg-[#eff6ff] border border-[#d3e4fe] rounded-xl px-3.5 py-2 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shrink-0"></span>
            <div>
              <div className="text-[11px] font-bold text-[#0b1c30]">
                Express Store Dispatch Hub 02
              </div>
              <div className="text-[10px] text-[#414753]">
                2-Hour Local Pickup • Same-Day Courier
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#717784]" />
        </div>
      </div>

      {/* 4. EXCHANGE & UPGRADE HERO BANNER (Stitch Exact) */}
      <div className="px-4 py-2">
        <div
          onClick={() => {
            const op = products.find((p) => p.id === 'prod_op12') || products[0];
            setSelectedProduct(op);
            setIsProductDetailOpen(true);
          }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#005db3] via-[#0076df] to-[#0284c7] p-5 text-white shadow-md cursor-pointer active:scale-[0.99] transition"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#004689]/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-300 border border-emerald-400/30 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>MEGA FESTIVE CARNIVAL</span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
            Exchange & Upgrade
          </h2>
          <p className="text-xs text-blue-100 font-medium mt-1 max-w-[260px] leading-relaxed">
            Upto ₹10,000 Off on genuine 5G smartphones with 0% Down Payment EMI.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <button className="bg-white text-[#005db3] font-bold text-xs px-4 py-1.5 rounded-full shadow hover:bg-blue-50 transition">
              Explore Deals →
            </button>

            <div className="text-right">
              <div className="text-[10px] text-blue-100">No Cost EMI from</div>
              <div className="text-xs font-black text-white font-mono-tech">₹1,999/mo*</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. AUTHORIZED BRANDS RAIL (Stitch Exact) */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-extrabold text-[#0b1c30]">Authorized Brands</h3>
          <span className="text-[11px] font-bold text-[#0076df] cursor-pointer hover:underline">
            All Brands &gt;
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'All', label: '5G All', icon: '' },
            { id: 'Apple', label: 'Apple', icon: '' },
            { id: 'Samsung', label: 'SAMSUNG', icon: '' },
            { id: 'OnePlus', label: 'OnePlus', icon: '1+' },
            { id: 'Xiaomi', label: 'Xiaomi', icon: 'mi' }
          ].map((br) => {
            const isActive = activeBrand === br.id;
            return (
              <button
                key={br.id}
                onClick={() => setActiveBrand(br.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#005db3] text-white shadow-sm'
                    : 'bg-white text-[#414753] border border-[#d3e4fe] hover:bg-[#eff4ff]'
                }`}
              >
                {br.icon && <span className="text-xs font-black">{br.icon}</span>}
                <span>{br.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. FLASH DEALS WITH TIMER (Stitch Exact) */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Flame size={17} className="text-red-500 fill-red-500" />
            <h3 className="text-sm font-extrabold text-[#0b1c30]">Flash Deals</h3>
          </div>

          {/* Countdown Boxes */}
          <div className="flex items-center gap-1 text-[11px] font-black font-mono-tech text-[#0b1c30]">
            <span className="bg-[#0b1c30] text-white px-1.5 py-0.5 rounded">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-[#0b1c30] text-white px-1.5 py-0.5 rounded">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-[#0b1c30] text-white px-1.5 py-0.5 rounded">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* 2-Column Product Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {flashDealProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleCardClick(prod)}
              className="bg-white rounded-2xl border border-[#d3e4fe] p-2.5 flex flex-col justify-between shadow-xs hover:shadow-md transition cursor-pointer group active:scale-[0.98]"
            >
              {/* Product Photo Container */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-2">
                {/* Top Badges */}
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span className="bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                    {prod.discount}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`Saved ${prod.title} to Wishlist!`, 'normal');
                  }}
                  className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-white/80 hover:bg-white text-slate-500 flex items-center justify-center shadow-xs"
                >
                  <Heart size={13} />
                </button>

                {prod.imageUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={prod.imageUrl}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                      unoptimized={prod.imageUrl.startsWith('data:')}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    <Smartphone size={32} />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-[#006c49]">
                  <Star size={11} className="fill-emerald-600 text-emerald-600" />
                  <span>{prod.rating}</span>
                  <span className="text-[#717784]">({(prod.reviewsCount / 1000).toFixed(1)}k)</span>
                  <span className="text-[#717784]">• 5G</span>
                </div>

                <h4 className="font-extrabold text-xs text-[#0b1c30] mt-0.5 truncate group-hover:text-[#005db3]">
                  {prod.title}
                </h4>

                <div className="text-[10px] text-[#414753] truncate font-medium">
                  {prod.variants[0]}
                </div>

                <div className="text-[9px] text-[#717784] line-through mt-1">
                  {formatCurrency(prod.mrp)}
                </div>

                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-sm font-black text-[#005db3] font-mono-tech">
                    {formatCurrency(prod.retailPrice)}
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(e, prod)}
                    className="w-7 h-7 rounded-full bg-[#005db3] hover:bg-[#0076df] text-white flex items-center justify-center shadow-sm transition active:scale-90"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. EXPLORE CATEGORIES (Stitch Exact) */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-extrabold text-[#0b1c30]">Explore Categories</h3>
          <span className="text-[11px] font-bold text-[#0076df] cursor-pointer hover:underline">
            See All
          </span>
        </div>

        {/* Hero 5G Category Card */}
        <div className="bg-[#eff6ff] border border-[#d3e4fe] rounded-2xl p-3.5 flex items-center justify-between mb-2 shadow-2xs">
          <div>
            <div className="text-[10px] font-bold text-[#005db3] uppercase tracking-wider">
              Flagships & Budgets
            </div>
            <div className="text-sm font-extrabold text-[#0b1c30] mt-0.5">5G Smartphones</div>
            <div className="text-[10px] text-[#414753] font-bold mt-0.5">140+ MODELS IN STOCK</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center text-[#005db3]">
            <Smartphone size={22} />
          </div>
        </div>

        {/* 2x2 Category Cards Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border border-[#e5eeff] rounded-xl p-2.5 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RotateCcw size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">Pre-Owned</div>
              <div className="text-[9px] text-[#717784]">32-Point Checked</div>
            </div>
          </div>

          <div className="bg-white border border-[#e5eeff] rounded-xl p-2.5 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Zap size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">Fast Chargers</div>
              <div className="text-[9px] text-[#717784]">Up to 120W GaN</div>
            </div>
          </div>

          <div className="bg-white border border-[#e5eeff] rounded-xl p-2.5 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Shield size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">Armor Cases</div>
              <div className="text-[9px] text-[#717784]">Military Drop Tested</div>
            </div>
          </div>

          <div className="bg-white border border-[#e5eeff] rounded-xl p-2.5 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Headphones size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">TWS & Audio</div>
              <div className="text-[9px] text-[#717784]">Active Noise Cancel</div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. WHY BUY FROM DHYAN ENTERPRISE (Stitch Exact Trust Grid) */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-white rounded-2xl border border-[#d3e4fe] p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 mb-3">
            <ShieldCheck size={16} className="text-[#005db3]" />
            <h3 className="text-xs font-extrabold text-[#0b1c30]">
              Why Buy From Dhyan Enterprise
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#0b1c30]">1-Year Warranty</div>
                <div className="text-[10px] text-[#717784]">100% Brand Certified</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Smartphone size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#0b1c30]">Free Data Setup</div>
                <div className="text-[10px] text-[#717784]">In-Store Precision Apply</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <RotateCcw size={16} className="text-teal-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#0b1c30]">Instant Buyback</div>
                <div className="text-[10px] text-[#717784]">Top Valuation Rate</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CreditCard size={16} className="text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#0b1c30]">0% Easy EMI</div>
                <div className="text-[10px] text-[#717784]">Bajaj, HDFC, ICICI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. TRENDING ACCESSORIES RACK (Stitch Exact) */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Zap size={16} className="text-[#0076df]" />
            <h3 className="text-xs font-extrabold text-[#0b1c30]">
              Trending Accessories Rack
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#0076df]">Fast Moving Fast</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {accessoryProducts.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-2xl border border-[#d3e4fe] p-2.5 flex flex-col justify-between shadow-2xs"
            >
              <div className="aspect-[4/3] bg-slate-50 rounded-xl flex items-center justify-center p-2 mb-2">
                <Zap size={28} className="text-[#0076df]" />
              </div>

              <div>
                <div className="text-[9px] font-bold text-[#005db3]">{acc.brand}</div>
                <div className="font-bold text-xs text-[#0b1c30] truncate">{acc.title}</div>
                <div className="text-[9px] text-[#717784] line-through mt-0.5">
                  {formatCurrency(acc.mrp)}
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs font-black text-[#005db3] font-mono-tech">
                    {formatCurrency(acc.retailPrice)}
                  </span>
                  <button
                    onClick={(e) => handleQuickAdd(e, acc)}
                    className="w-6 h-6 rounded-full bg-[#0076df] text-white flex items-center justify-center shadow-xs"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. CONCIERGE BANNER (Stitch Exact) */}
      <div className="px-4 pt-2">
        <div className="bg-[#0b1c30] text-white rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0076df] flex items-center justify-center shrink-0">
              <PhoneCall size={16} className="text-white" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">
                Need bulk deal or store visit?
              </div>
              <div className="text-[10px] text-slate-300">
                Speak with Dhyan Tech Concierge
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('Connecting to Dhyan Tech Concierge at +91 98250 12345', 'normal')}
            className="bg-black hover:bg-slate-800 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-full border border-slate-700 shrink-0"
          >
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}
