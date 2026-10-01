'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { ProductVisual } from './ProductCard';
import { X, ShieldCheck, Cpu, Battery, Camera, Smartphone, Check, ShoppingBag, Zap } from 'lucide-react';

export default function ProductDetailSheet() {
  const {
    selectedProduct,
    isProductDetailOpen,
    setIsProductDetailOpen,
    addToCart,
    setIsCartOpen,
    currentRole
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!isProductDetailOpen || !selectedProduct) return null;

  const currentVariant = selectedVariant || selectedProduct.variants[0] || 'Standard';
  const currentColor = selectedColor || selectedProduct.colors[0]?.name || 'Standard';
  const isB2B = currentRole === 'b2b';
  const price = isB2B ? selectedProduct.wholesalePrice : selectedProduct.retailPrice;

  const handleAddAndClose = () => {
    addToCart(selectedProduct.id, currentVariant, currentColor, 1);
    setIsProductDetailOpen(false);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct.id, currentVariant, currentColor, 1);
    setIsProductDetailOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Pill & Close Button */}
        <div className="relative pt-3 pb-2 px-4 flex items-center justify-between border-b border-[#F1F5F9]">
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 sm:hidden"></div>
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            {selectedProduct.brand} • {selectedProduct.sku}
          </span>
          <button
            onClick={() => setIsProductDetailOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Top Visual & Badges */}
          <div className="relative aspect-[16/10] bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] overflow-hidden flex items-center justify-center">
            <ProductVisual
              category={selectedProduct.category}
              brand={selectedProduct.brand}
              colorHex={selectedProduct.colors.find((c) => c.name === currentColor)?.hex}
            />

            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>{selectedProduct.warranty}</span>
            </div>

            <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
              Ready for Instant Pickup
            </div>
          </div>

          {/* Title & Price Header */}
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] leading-tight">
              {selectedProduct.title}
            </h2>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0F172A] font-mono-tech">
                {formatCurrency(price)}
              </span>
              <span className="text-xs text-slate-400 line-through">
                MRP {formatCurrency(selectedProduct.mrp)}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {selectedProduct.discount}
              </span>
            </div>
          </div>

          {/* Variant Selector (Storage / RAM) */}
          {selectedProduct.variants && selectedProduct.variants.length > 0 && (
            <div>
              <div className="text-xs font-bold text-[#0F172A] mb-1.5">
                Configuration & Memory
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.variants.map((v) => {
                  const isSelected = v === currentVariant;
                  return (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-tech transition ${
                        isSelected
                          ? 'bg-[#0076DF] text-white shadow-sm ring-2 ring-[#0076DF]/20'
                          : 'bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] hover:bg-white'
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div>
              <div className="text-xs font-bold text-[#0F172A] mb-1.5 flex items-center justify-between">
                <span>Color Finish</span>
                <span className="text-xs text-[#0076DF] font-semibold">{currentColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {selectedProduct.colors.map((c) => {
                  const isSelected = c.name === currentColor;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition ring-offset-2 ${
                        isSelected ? 'ring-2 ring-[#0076DF]' : 'border border-slate-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <Check size={14} className="text-white drop-shadow-md stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tech Specifications Matrix */}
          <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#0F172A] mb-2 flex items-center justify-between">
              <span>Hardware Specifications</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100/60 px-2 py-0.5 rounded-full">
                ● {selectedProduct.stockCount} IMEIs Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 bg-white p-2 rounded-xl border border-[#F1F5F9]">
                <Cpu size={16} className="text-[#0076DF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#64748B]">Processor</div>
                  <div className="font-semibold text-[#0F172A] line-clamp-1">{selectedProduct.specs.processor}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-2 rounded-xl border border-[#F1F5F9]">
                <Battery size={16} className="text-[#0076DF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#64748B]">Battery</div>
                  <div className="font-semibold text-[#0F172A] line-clamp-1">{selectedProduct.specs.battery}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-2 rounded-xl border border-[#F1F5F9]">
                <Camera size={16} className="text-[#0076DF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#64748B]">Camera</div>
                  <div className="font-semibold text-[#0F172A] line-clamp-1">{selectedProduct.specs.camera}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-2 rounded-xl border border-[#F1F5F9]">
                <Smartphone size={16} className="text-[#0076DF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#64748B]">Display</div>
                  <div className="font-semibold text-[#0F172A] line-clamp-1">{selectedProduct.specs.display}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-white border-t border-[#E2E8F0] grid grid-cols-2 gap-3 shrink-0">
          <button
            onClick={handleAddAndClose}
            className="flex items-center justify-center gap-1.5 h-[50px] rounded-xl border border-[#0076DF] text-[#0076DF] font-bold text-sm hover:bg-[#0076DF]/5 active:scale-98 transition"
          >
            <ShoppingBag size={17} />
            <span>Add to Bag</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1.5 h-[50px] rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white font-bold text-sm shadow-md active:scale-98 transition"
          >
            <Zap size={17} />
            <span>Proceed to Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
