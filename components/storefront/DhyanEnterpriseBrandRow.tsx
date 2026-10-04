'use client';

import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface DhyanEnterpriseBrandRowProps {
  activeBrand: string;
  onSelectBrand: (brand: string) => void;
}

const BRANDS = [
  { name: 'All', label: 'All Brands', icon: '★' },
  { name: 'Samsung', label: 'SAMSUNG', isText: true },
  { name: 'Apple', label: '', isApple: true },
  { name: 'Anker', label: 'ANKER', isText: true },
  { name: 'Belkin', label: 'belkin', isText: true },
  { name: 'Nothing', label: '•••', isDot: true },
  { name: 'OnePlus', label: '1+', isText: true },
  { name: 'Xiaomi', label: 'mi', isText: true },
  { name: 'Dhyan Enterprise', label: 'Dhyan Enterprise', isText: true }
];

export default function DhyanEnterpriseBrandRow({ activeBrand, onSelectBrand }: DhyanEnterpriseBrandRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Shop by Brand</h2>
        <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Swipe or click to filter</span>
      </div>

      <div className="relative flex items-center group/carousel">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex flex-shrink-0 mr-2 w-8 h-8 rounded-full border border-slate-200 bg-white shadow-xs hover:bg-slate-50 items-center justify-center text-slate-600 hover:text-slate-900 transition z-10"
          title="Scroll left"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Horizontal scrollable brands list matching screenshot */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-1 w-full"
          style={{
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {BRANDS.map((b) => {
            const isSelected = activeBrand.toLowerCase() === b.name.toLowerCase();

            return (
              <button
                key={b.name}
                onClick={() => onSelectBrand(b.name)}
                className={`flex-shrink-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-95 group shadow-xs ${
                  isSelected
                    ? 'border-[#2563eb] bg-blue-50/60 ring-2 ring-blue-500/30'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
                title={`Filter by ${b.name}`}
              >
                {b.isApple ? (
                  <span className="text-lg sm:text-2xl text-slate-800 font-bold group-hover:scale-110 transition">
                    
                  </span>
                ) : b.isDot ? (
                  <div className="flex gap-1 group-hover:scale-110 transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  </div>
                ) : (
                  <span
                    className={`text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-tight text-center px-1 truncate max-w-[48px] xs:max-w-[54px] sm:max-w-[60px] ${
                      isSelected ? 'text-[#2563eb]' : 'text-slate-800'
                    }`}
                  >
                    {b.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 ml-2 w-8 h-8 rounded-full border border-slate-200 bg-white shadow-xs hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition z-10"
          title="Scroll right"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
