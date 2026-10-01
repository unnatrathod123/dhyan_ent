'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { Zap, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export default function HeroBanner() {
  const { setSelectedProduct, setIsProductDetailOpen, products } = useStore();

  const handleHeroClick = () => {
    const op12 = products.find((p) => p.id === 'prod_op12') || products[0];
    setSelectedProduct(op12);
    setIsProductDetailOpen(true);
  };

  return (
    <div className="px-4 pt-3 pb-2">
      <div
        onClick={handleHeroClick}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#005DB3] via-[#0076DF] to-[#0284C7] p-5 text-white shadow-lg cursor-pointer group transition-transform active:scale-[0.99]"
      >
        {/* Background glow decoration */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-cyan-400/20 rounded-full blur-xl pointer-events-none"></div>

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-300 border border-emerald-400/30">
            <Clock size={12} className="text-emerald-400 animate-pulse" />
            <span>Counter Ready in 15 Mins</span>
          </div>

          <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase">
            FLASHSALE 7% OFF
          </span>
        </div>

        {/* Headline */}
        <div className="pr-12">
          <h2 className="text-xl sm:text-2xl font-extrabold leading-tight tracking-tight">
            OnePlus 12 5G
          </h2>
          <p className="text-xs text-blue-100 font-medium mt-1 line-clamp-1">
            Snapdragon 8 Gen 3 • 5400mAh 100W • Flowy Emerald
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-blue-200 line-through">MRP ₹69,999</div>
            <div className="text-2xl font-black font-mono-tech tracking-tight">
              ₹64,999
            </div>
          </div>

          <button className="flex items-center gap-1 bg-white text-[#005DB3] hover:bg-blue-50 font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition group-hover:translate-x-0.5">
            <span>Inspect</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
