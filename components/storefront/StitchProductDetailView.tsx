'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  CreditCard,
  CheckCircle2,
  PhoneCall,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Cpu,
  Battery,
  Camera,
  Smartphone
} from 'lucide-react';

export default function StitchProductDetailView() {
  const {
    selectedProduct,
    setSelectedProduct,
    setIsProductDetailOpen,
    addToCart,
    setTab,
    showToast
  } = useStore();

  const [selectedStorage, setSelectedStorage] = useState('512GB');
  const [selectedColor, setSelectedColor] = useState('Flowy Emerald');
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!selectedProduct) return null;

  const handleBack = () => {
    setIsProductDetailOpen(false);
  };

  const getPrice = () => {
    if (selectedStorage === '256GB') return 58999;
    if (selectedStorage === '1TB') return 69999;
    return 64999;
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct.id, `${selectedStorage} Storage`, selectedColor, 1);
    showToast('Added OnePlus 12 5G to your Bag!', 'success');
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct.id, `${selectedStorage} Storage`, selectedColor, 1);
    setTab('orders'); // takes to checkout flow
    setIsProductDetailOpen(false);
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] h-full flex flex-col overflow-hidden">
      {/* 1. TOP HEADER (Stitch Exact - Stuck firmly at top of screen) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-[#e5eeff] shrink-0 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-xs font-bold text-[#0b1c30] hover:text-[#005db3] transition-colors py-1 cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>Product Details</span>
        </button>

        <div className="flex items-center gap-2.5 text-[#414753]">
          <button
            onClick={() => showToast('Shared link copied to clipboard!', 'normal')}
            className="p-1 hover:text-[#0b1c30] transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => showToast('Saved to Wishlist!', 'normal')}
            className="p-1 hover:text-red-500 transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* 2. SCROLLABLE PRODUCT DETAILS (Scrolls smoothly between header & footer) */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* 2. IMAGE CAROUSEL CONTAINER (Stitch Exact) */}
          <div className="bg-white p-4 border-b border-[#e5eeff] relative">
        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#0076df] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
            1+ OFFICIAL
          </span>
          <span className="bg-[#ecfdf5] border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            <span>Best Seller</span>
          </span>
        </div>

        {/* Product Photo */}
        <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-slate-50">
          <Image
            src={selectedProduct.imageUrl || '/images/oneplus_12.jpg'}
            alt={selectedProduct.title || 'Product Image'}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            priority
            className="object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            360°
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {[0, 1, 2, 3].map((idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                activeImgIndex === idx ? 'bg-[#005db3] w-5' : 'bg-slate-300'
              }`}
            ></span>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 3. TITLE & SPECS SUBTITLE (Stitch Exact) */}
        <div>
          <div className="text-[11px] font-bold text-[#0076df] uppercase tracking-wider">
            ONEPLUS OFFICIAL • Model: CPH2581
          </div>
          <h1 className="text-xl font-black text-[#0b1c30] mt-0.5">
            OnePlus 12 5G ({selectedColor})
          </h1>
          <p className="text-xs text-[#414753] mt-1 leading-relaxed">
            Snapdragon 8 Gen 3 | 50MP Hasselblad Camera | 5400mAh 100W SUPERVOOC
          </p>

          <div className="flex items-center gap-3 mt-2 text-xs">
            <div className="flex items-center gap-1 bg-[#ecfdf5] text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
              <Star size={12} className="fill-emerald-600 text-emerald-600" />
              <span>4.8</span>
              <span className="text-[#414753] font-normal">(2,438 reviews)</span>
            </div>
            <span className="text-[#717784]">•</span>
            <span className="text-emerald-700 font-bold">180+ sold in-store this week</span>
          </div>
        </div>

        {/* 4. PRICE BLOCK (Stitch Exact) */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#d3e4fe] shadow-2xs">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#0b1c30] font-mono-tech">
              {formatCurrency(getPrice())}
            </span>
            <span className="text-xs text-[#717784] line-through">₹69,999</span>
            <span className="bg-[#ecfdf5] text-emerald-800 font-extrabold text-xs px-2 py-0.5 rounded-md border border-emerald-200">
              Save ₹5,000 (7% OFF)
            </span>
          </div>
          <p className="text-[10px] text-[#414753] mt-1">
            Inclusive of all taxes • Free express doorstep &amp; store dispatch
          </p>
        </div>

        {/* 5. SMART EASY FINANCING CARD (Stitch Exact) */}
        <div className="bg-[#eff6ff] border border-[#d3e4fe] rounded-2xl p-3 flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 text-[#005db3] shrink-0">
            <CreditCard size={18} />
          </div>
          <div className="text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#005db3]">Smart Easy Financing</span>
              <span className="bg-white text-[#005db3] font-bold text-[10px] px-2 py-0.2 rounded-full border border-blue-200">
                No Cost EMI
              </span>
            </div>
            <p className="text-[11px] text-[#414753] mt-1 leading-snug">
              Or pay <strong className="text-[#005db3]">₹3,550/mo</strong> on HDFC/ICICI cards receive ₹5,000 Instant Bank Discount at final checkout.
            </p>
          </div>
        </div>

        {/* 6. COLOR VARIANT (Stitch Exact) */}
        <div>
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-[#0b1c30]">Color Variant</span>
            <span className="text-[#0076df]">{selectedColor}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { name: 'Silky Black', hex: '#18181b', bg: 'bg-[#18181b]' },
              { name: 'Flowy Emerald', hex: '#0e4438', bg: 'bg-[#0e4438]' },
              { name: 'Glacial White', hex: '#f1f5f9', bg: 'bg-[#f1f5f9] border border-slate-300' }
            ].map((col) => {
              const isSelected = selectedColor === col.name;
              return (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`p-2 rounded-xl border flex items-center gap-2 text-xs font-bold transition ${
                    isSelected
                      ? 'border-[#0076df] bg-[#eff6ff] text-[#005db3] shadow-xs'
                      : 'border-[#d3e4fe] bg-white text-[#414753]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${col.bg}`}></span>
                  <span className="truncate">{col.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. RAM & STORAGE CONFIGURATION (Stitch Exact) */}
        <div>
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-[#0b1c30]">RAM &amp; Storage Configuration</span>
            <span className="text-emerald-700 flex items-center gap-1 text-[11px]">
              <ShieldCheck size={13} />
              <span>Genuine Warranty</span>
            </span>
          </div>

          <div className="space-y-2">
            {[
              {
                id: '256GB',
                title: '12GB RAM + 256GB Storage',
                desc: 'LPDDR5X + UFS 4.0',
                price: '₹58,999'
              },
              {
                id: '512GB',
                title: '16GB RAM + 512GB Storage',
                desc: 'Peak Multi-tasking Speed',
                badge: 'POPULAR',
                price: '₹64,999'
              },
              {
                id: '1TB',
                title: '16GB RAM + 1TB Storage',
                desc: 'Pro Creator Edition',
                price: '₹69,999'
              }
            ].map((cfg) => {
              const isSelected = selectedStorage === cfg.id;
              return (
                <button
                  key={cfg.id}
                  onClick={() => setSelectedStorage(cfg.id)}
                  className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition ${
                    isSelected
                      ? 'border-[#0076df] bg-[#eff6ff] shadow-sm'
                      : 'border-[#d3e4fe] bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-[#0b1c30]">{cfg.title}</span>
                      {cfg.badge && (
                        <span className="bg-[#005db3] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                          {cfg.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#717784] mt-0.5">{cfg.desc}</div>
                  </div>
                  <span className="text-sm font-black font-mono-tech text-[#0b1c30]">
                    {cfg.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. DHYAN ENTERPRISE CERTIFIED BANNER (Stitch Exact) */}
        <div className="bg-white border border-[#d3e4fe] rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0076df] text-white flex items-center justify-center font-bold text-xs">
                D
              </div>
              <span className="font-extrabold text-xs text-[#0b1c30]">
                Dhyan Enterprise Certified • Authorized Premium Dealer
              </span>
            </div>
            <span className="bg-[#ecfdf5] border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Pickup Ready
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#414753] pt-1">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Free Tempered Glass &amp; Rugged Case pre-applied safely by expert at counter pickup.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Zero-Wait Express Store Pickup ready within 15 minutes at Desk 2 Mumbai Flagship store.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>100% Free Data Migration including WhatsApp, photos &amp; credentials transferred on-site.</span>
            </div>
          </div>
        </div>

        {/* 9. TRADE-IN EXCHANGE BONUS (Stitch Exact) */}
        <div className="bg-white border border-[#d3e4fe] rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0b1c30]">Trade-In Exchange Bonus</span>
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                  ₹6,000 Extra
                </span>
              </div>
              <div className="text-[10px] text-[#717784]">Get maximum value upto ₹18,000</div>
            </div>
          </div>

          <button
            onClick={() => showToast('Opening Trade-In Value Estimator...', 'normal')}
            className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#005db3] hover:bg-blue-100 text-xs font-bold transition"
          >
            Check Value
          </button>
        </div>

        {/* 10. TECHNICAL SPECIFICATIONS (Stitch Exact) */}
        <div>
          <div className="flex justify-between items-center mb-2 text-xs font-extrabold text-[#0b1c30]">
            <span>Technical Specifications</span>
            <span className="text-[#0076df] font-semibold text-[11px] cursor-pointer">Full Sheet</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white border border-[#d3e4fe] rounded-2xl p-3 shadow-2xs">
              <div className="text-[10px] font-bold text-[#005db3] uppercase">Display</div>
              <div className="text-xs font-extrabold text-[#0b1c30] mt-0.5">6.82&quot; 2K ProXDR</div>
              <div className="text-[10px] text-[#717784] mt-0.5">120Hz (LTPO 4.0 AMOLED), 4500 nits peak</div>
            </div>

            <div className="bg-white border border-[#d3e4fe] rounded-2xl p-3 shadow-2xs">
              <div className="text-[10px] font-bold text-[#005db3] uppercase">Chipset</div>
              <div className="text-xs font-extrabold text-[#0b1c30] mt-0.5">Snapdragon 8 Gen 3</div>
              <div className="text-[10px] text-[#717784] mt-0.5">4nm | Adreno 750 with Dual Cryo-Velocity VC</div>
            </div>

            <div className="bg-white border border-[#d3e4fe] rounded-2xl p-3 shadow-2xs">
              <div className="text-[10px] font-bold text-[#005db3] uppercase">Hasselblad</div>
              <div className="text-xs font-extrabold text-[#0b1c30] mt-0.5">50MP + 64MP + 48MP</div>
              <div className="text-[10px] text-[#717784] mt-0.5">3X Periscope Telephoto with OIS</div>
            </div>

            <div className="bg-white border border-[#d3e4fe] rounded-2xl p-3 shadow-2xs">
              <div className="text-[10px] font-bold text-[#005db3] uppercase">Battery</div>
              <div className="text-xs font-extrabold text-[#0b1c30] mt-0.5">5400 mAh Cell</div>
              <div className="text-[10px] text-[#717784] mt-0.5">100W SUPERVOOC + 50W AIRVOOC</div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>

      {/* 11. PINNED BOTTOM ACTION BAR (Always stuck firmly at bottom of Product Detail) */}
      <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#d3e4fe] p-3 flex items-center gap-2 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <button
          onClick={() => showToast('Calling Desk 2 Store Representative...', 'normal')}
          className="p-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          title="Call Store Desk"
        >
          <PhoneCall size={18} />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 h-12 rounded-xl bg-[#eff4ff] text-[#005db3] hover:bg-blue-100 font-extrabold text-xs flex items-center justify-center gap-1.5 transition"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 h-12 rounded-xl bg-[#0076df] hover:bg-[#005db3] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
        >
          <span>Buy Now / Pickup</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
