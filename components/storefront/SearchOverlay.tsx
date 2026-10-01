'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { Search, X, ScanBarcode, ArrowRight, PackageOpen } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const {
    products,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    setIsProductDetailOpen,
    setRole,
    setCategory
  } = useStore();

  if (!isOpen) return null;

  const filtered = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-start p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg mx-auto bg-white rounded-b-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-[#E2E8F0] flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <Search size={18} className="absolute left-3 text-[#94A3B8]" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones, SKUs, GaN chargers..."
              className="w-full bg-[#F8FAFC] text-sm text-[#0F172A] pl-10 pr-9 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0076DF] focus:ring-2 focus:ring-[#0076DF]/20 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setRole('pos');
              onClose();
            }}
            className="p-2.5 rounded-xl bg-blue-50 text-[#0076DF] hover:bg-blue-100 transition"
            title="Scan Hardware Barcode"
          >
            <ScanBarcode size={18} />
          </button>

          <button
            onClick={onClose}
            className="px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Cancel
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {searchQuery.trim() === '' ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['OnePlus 12', 'iPhone 16 Pro', '100W GaN Charger', 'Samsung S24 Ultra', 'Tempered Glass'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#334155] hover:bg-white hover:border-[#0076DF] transition"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
                Matching Hardware ({filtered.length})
              </div>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-[#F1F5F9] hover:border-[#0076DF] hover:bg-[#F8FAFC] transition cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                      <span className="font-semibold text-[#0076DF]">{item.brand}</span>
                      <span>•</span>
                      <span className="font-mono-tech">{item.sku}</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[#0F172A] mt-0.5">
                      {item.title}
                    </div>
                    <div className="text-xs font-extrabold text-[#0076DF] font-mono-tech mt-0.5">
                      {formatCurrency(item.retailPrice)}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#94A3B8]" />
                </div>
              ))}
            </div>
          ) : (
            /* No Results Fallback View (Stitch Screen e1ae86dc) */
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <PackageOpen size={28} />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">No Hardware Results Found</h3>
              <p className="text-xs text-[#64748B] mt-1 max-w-xs">
                We could not find any active product matching &quot;{searchQuery}&quot;. Try checking the SKU or filter by brand.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => {
                    setCategory('smartphones');
                    onClose();
                  }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-[#0076DF] hover:bg-blue-100"
                >
                  View All Smartphones
                </button>
                <button
                  onClick={() => {
                    setCategory('chargers');
                    onClose();
                  }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  GaN Chargers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
