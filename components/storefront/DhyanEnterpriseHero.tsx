'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Cpu, Wrench, ShieldCheck, Zap } from 'lucide-react';

interface DhyanEnterpriseHeroProps {
  onShopAllCategories?: () => void;
  onFindYourPart?: () => void;
}

export default function DhyanEnterpriseHero({
  onShopAllCategories,
  onFindYourPart
}: DhyanEnterpriseHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f1fd] via-[#f2f7fe] to-[#f8fafc] border-b border-slate-200/60 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20">
      {/* Decorative ambient subtle background glows */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-6 sm:right-10 w-60 sm:w-80 h-60 sm:h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Text & CTAs Column */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/70 text-blue-800">
              <Zap size={13} className="text-blue-600" />
              <span>Direct OEM Parts & Flagship Electronics</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold uppercase tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.15]">
              YOUR ONE-STOP TECH MARKETPLACE
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Explore thousands of genuine mobile devices, fast GaN chargers, military-grade cables, and certified OEM spare parts.
            </p>

            {/* CTAs: Full width on mobile touch, inline on tablet/desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onShopAllCategories}
                className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/15 transition-all duration-200 text-center flex items-center justify-center gap-2"
              >
                <span>SHOP ALL CATEGORIES</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onFindYourPart}
                className="w-full sm:w-auto border-2 border-blue-400/80 bg-white/70 hover:bg-blue-50/80 active:scale-98 text-[#2563eb] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all duration-200 text-center flex items-center justify-center"
              >
                FIND YOUR PART
              </button>
            </div>

            {/* Trust Badges: 2 cols on mobile, flex wrap on tablet/desktop */}
            <div className="pt-3 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-500 font-medium border-t border-slate-200/50">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                <span className="truncate">100% Genuine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={16} className="text-amber-500 shrink-0" />
                <span className="truncate">Same-Day Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <Cpu size={16} className="text-indigo-600 shrink-0" />
                <span>Direct Wholesale Tiers</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Cluster (Proportionally scaled for mobile, tablet & desktop) */}
          <div className="lg:col-span-6 relative pt-4 sm:pt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-lg mx-auto aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
              {/* Product 1: iPhone center-left */}
              <div className="absolute left-1 sm:left-4 lg:left-6 top-1 sm:top-3 lg:top-4 w-28 sm:w-40 lg:w-48 aspect-[9/19] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border-2 sm:border-4 border-slate-900/10 bg-slate-950 transform -rotate-3 transition hover:rotate-0 hover:scale-105 duration-300 z-20">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/iphone_15_pro.jpg"
                    alt="iPhone flagship"
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 192px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Product 2: Coiled Braided Cable right-top */}
              <div className="absolute right-1 sm:right-4 lg:right-6 top-0 w-26 sm:w-36 lg:w-44 aspect-square rounded-2xl p-1.5 sm:p-2 bg-white/95 shadow-xl border border-slate-100 transition hover:scale-105 duration-300 z-30">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/duralink_cable.jpg"
                    alt="DuraLink Braided Cable"
                    fill
                    sizes="(max-width: 640px) 104px, (max-width: 1024px) 144px, 176px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product 3: GaN Wall Charger center-right */}
              <div className="absolute right-6 sm:right-16 lg:right-24 bottom-4 sm:bottom-8 lg:bottom-10 w-20 sm:w-28 lg:w-36 aspect-square rounded-2xl p-1.5 sm:p-2 bg-white/95 shadow-xl border border-slate-100 transition hover:scale-105 duration-300 z-30">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/swiftport_charger.jpg"
                    alt="GaN Charger"
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 144px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product 4: Screen Assembly module bottom-right */}
              <div className="absolute right-0 bottom-0 w-18 sm:w-24 lg:w-32 aspect-square rounded-xl sm:rounded-2xl p-1.5 sm:p-2 bg-white/90 shadow-lg border border-slate-100 transition hover:scale-105 duration-300 z-10">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/screen_assembly.jpg"
                    alt="Screen Assembly"
                    fill
                    sizes="(max-width: 640px) 72px, (max-width: 1024px) 96px, 128px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product 5: MagBoost Power bank center */}
              <div className="absolute left-18 sm:left-28 lg:left-40 bottom-1 sm:bottom-3 lg:bottom-4 w-22 sm:w-32 lg:w-40 aspect-square rounded-xl sm:rounded-2xl p-1.5 sm:p-2 bg-white/90 shadow-xl border border-slate-100 transition hover:scale-105 duration-300 z-20">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/magboost_powerbank.jpg"
                    alt="MagBoost Power Bank"
                    fill
                    sizes="(max-width: 640px) 88px, (max-width: 1024px) 128px, 160px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
