'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Cpu, Wrench, ShieldCheck, Zap } from 'lucide-react';

interface TechHubHeroProps {
  onShopAllCategories?: () => void;
  onFindYourPart?: () => void;
}

export default function TechHubHero({
  onShopAllCategories,
  onFindYourPart
}: TechHubHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f1fd] via-[#f2f7fe] to-[#f8fafc] border-b border-slate-200/60 pt-10 pb-16 lg:py-20">
      {/* Decorative ambient subtle background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text & CTAs Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold uppercase tracking-tight text-slate-900 leading-[1.15]">
              YOUR ONE-STOP TECH MARKETPLACE
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Explore thousands of genuine mobile devices, accessories, and spare parts from leading brands.
            </p>

            {/* CTAs matching screenshot */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopAllCategories}
                className="bg-[#2563eb] hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/15 transition-all duration-200"
              >
                SHOP ALL CATEGORIES
              </button>

              <button
                onClick={onFindYourPart}
                className="border-2 border-blue-400/80 bg-white/70 hover:bg-blue-50/80 active:scale-98 text-[#2563eb] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                FIND YOUR PART
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>100% Genuine Parts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={16} className="text-amber-500" />
                <span>Same-Day Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu size={16} className="text-indigo-600" />
                <span>Direct Wholesale Tiers</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Cluster (Matching Screenshot) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-lg mx-auto aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
              {/* Product 1: iPhone center-left */}
              <div className="absolute left-2 sm:left-6 top-2 sm:top-4 w-36 sm:w-48 aspect-[9/19] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-900/10 bg-slate-950 transform -rotate-3 transition hover:rotate-0 hover:scale-105 duration-300 z-20">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/iphone_15_pro.jpg"
                    alt="iPhone flagship"
                    fill
                    sizes="(max-width: 640px) 144px, 192px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Product 2: Coiled Braided Cable right-top */}
              <div className="absolute right-2 sm:right-6 top-0 w-36 sm:w-44 aspect-square rounded-2xl p-2 bg-white/95 shadow-xl border border-slate-100 transition hover:scale-105 duration-300 z-30">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/duralink_cable.jpg"
                    alt="DuraLink Braided Cable"
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product 3: GaN Wall Charger center-right */}
              <div className="absolute right-12 sm:right-24 bottom-6 sm:bottom-10 w-28 sm:w-36 aspect-square rounded-2xl p-2 bg-white/95 shadow-xl border border-slate-100 transition hover:scale-105 duration-300 z-30">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/swiftport_charger.jpg"
                    alt="GaN Charger"
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product 4: Screen Assembly module bottom-right */}
              <div className="absolute right-0 bottom-0 w-28 sm:w-32 aspect-square rounded-2xl p-2 bg-white/90 shadow-lg border border-slate-100 transition hover:scale-105 duration-300 z-10">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/screen_assembly.jpg"
                    alt="Screen Assembly"
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product 5: MagBoost Power bank center */}
              <div className="absolute left-28 sm:left-40 bottom-2 sm:bottom-4 w-32 sm:w-40 aspect-square rounded-2xl p-2 bg-white/90 shadow-xl border border-slate-100 transition hover:scale-105 duration-300 z-20">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/magboost_powerbank.jpg"
                    alt="MagBoost Power Bank"
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
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
