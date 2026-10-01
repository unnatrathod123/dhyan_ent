'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { Plus, ShieldCheck, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductVisual({ category, brand, colorHex }: { category: string; brand: string; colorHex?: string }) {
  if (category === 'audio') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 p-4">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <circle cx="50" cy="50" r="42" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2" />
          <path d="M30 40C30 28.9543 38.9543 20 50 20C61.0457 20 70 28.9543 70 40V65C70 70.5228 65.5228 75 60 75H40C34.4772 75 30 70.5228 30 65V40Z" fill="#0F172A" />
          <circle cx="36" cy="55" r="8" fill="#0076DF" />
          <circle cx="64" cy="55" r="8" fill="#0076DF" />
          <path d="M30 40C30 29 38 22 50 22C62 22 70 29 70 40" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (category === 'chargers') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 p-4">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <rect x="25" y="25" width="50" height="50" rx="12" fill="#0F172A" stroke="#0076DF" strokeWidth="2" />
          <rect x="42" y="15" width="6" height="12" rx="2" fill="#CBD5E1" />
          <rect x="52" y="15" width="6" height="12" rx="2" fill="#CBD5E1" />
          <path d="M52 38L40 52H50L45 66L58 48H50L52 38Z" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  if (category === 'protection') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-blue-50/40 p-4">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm">
          <rect x="30" y="16" width="40" height="68" rx="8" fill="#EFF6FF" stroke="#0076DF" strokeWidth="2" />
          <path d="M44 46L48 50L56 42" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="38" y1="24" x2="62" y2="24" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <line x1="45" y1="80" x2="55" y2="80" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Default Smartphone graphic
  const fillAccent = colorHex || (brand === 'Apple' ? '#c7b299' : brand === 'Samsung' ? '#636569' : '#0e4438');

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50/70 p-4">
      <svg width="86" height="96" viewBox="0 0 100 110" fill="none" className="drop-shadow-md">
        <rect x="24" y="10" width="52" height="88" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />
        <rect x="28" y="14" width="44" height="80" rx="8" fill="#1E293B" />
        <rect x="30" y="16" width="40" height="76" rx="6" fill={fillAccent} fillOpacity="0.4" />
        <circle cx="50" cy="20" r="2.5" fill="#0076DF" />
        <rect x="42" y="90" width="16" height="2" rx="1" fill="#64748B" />
        {/* Camera bump */}
        <circle cx="38" cy="28" r="5" fill="#0F172A" stroke="#475569" strokeWidth="1" />
        <circle cx="38" cy="40" r="5" fill="#0F172A" stroke="#475569" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setSelectedProduct, setIsProductDetailOpen, addToCart, currentRole } = useStore();
  const isB2B = currentRole === 'b2b';

  const handleCardClick = () => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, product.variants[0] || 'Default', product.colors[0]?.name || 'Standard', 1);
  };

  const displayPrice = isB2B ? product.wholesalePrice : product.retailPrice;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all cursor-pointer group active:scale-[0.98]"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#F8FAFC] border-b border-[#F1F5F9] overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-[#ECFDF5] text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>{product.stockCount} in stock</span>
          </span>

          <span className="bg-[#0076DF]/10 text-[#0076DF] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {product.discount}
          </span>
        </div>

        {/* Visual Graphic */}
        <ProductVisual
          category={product.category}
          brand={product.brand}
          colorHex={product.colors[0]?.hex}
        />
      </div>

      {/* Content Details */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-[#64748B] mb-0.5">
            <span className="font-semibold text-[#0076DF]">{product.brand}</span>
            <span>•</span>
            <span className="font-mono-tech">{product.sku}</span>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-[#0F172A] line-clamp-2 leading-snug group-hover:text-[#0076DF] transition-colors">
            {product.title}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-[#64748B]">
            <div className="flex items-center text-amber-500 font-bold">
              <Star size={11} className="fill-amber-400 text-amber-400 mr-0.5" />
              <span>{product.rating}</span>
            </div>
            <span>({product.reviewsCount})</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium truncate">{product.warranty}</span>
          </div>
        </div>

        {/* Price & Quick Add Button */}
        <div className="mt-3 pt-2 border-t border-[#F1F5F9] flex items-center justify-between gap-1">
          <div>
            {isB2B && (
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.2 rounded block w-fit mb-0.5">
                B2B Wholesale
              </span>
            )}
            <div className="text-[10px] text-[#94A3B8] line-through">
              {formatCurrency(product.mrp)}
            </div>
            <div className="text-sm sm:text-base font-extrabold text-[#0F172A] font-mono-tech leading-none">
              {formatCurrency(displayPrice)}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className="w-8 h-8 rounded-full bg-[#0076DF] hover:bg-[#005DB3] text-white flex items-center justify-center shadow-md transition-transform active:scale-90"
            title="Quick Add to Bag"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
