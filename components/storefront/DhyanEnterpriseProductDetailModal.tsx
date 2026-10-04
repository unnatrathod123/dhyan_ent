'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency, formatProductPrice } from '@/lib/utils/formatters';
import {
  X,
  Star,
  ShieldCheck,
  Building2,
  Truck,
  RotateCcw,
  Zap,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Info
} from 'lucide-react';

interface DhyanEnterpriseProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function DhyanEnterpriseProductDetailModal({
  product,
  onClose
}: DhyanEnterpriseProductDetailModalProps) {
  const { currentUser, currency, addToCart } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [qty, setQty] = useState<number>(1);

  if (!product) return null;

  const isB2BApproved = currentUser?.role === 'b2b' && currentUser.b2bStatus === 'approved';
  const isB2BPending = currentUser?.role === 'b2b' && currentUser.b2bStatus === 'pending';

  const defaultVariant = selectedVariant || product.variants[0] || 'Standard';
  const defaultColor = selectedColor || product.colors[0]?.name || 'Standard';
  const moq = isB2BApproved ? product.moq || 5 : 1;
  const currentQty = Math.max(qty, moq);

  // Price calculations with fallback
  const retailPrice =
    (currency === 'USD'
      ? product.retailPriceUSD ?? Math.round(product.retailPrice / 83)
      : product.retailPrice) || 0;

  const wholesaleBasePrice =
    (currency === 'USD'
      ? product.wholesalePriceUSD ?? Math.round(product.wholesalePrice / 83)
      : product.wholesalePrice) || 0;

  // Check volume tiers if available
  let activeUnitPrice = isB2BApproved ? wholesaleBasePrice : retailPrice;
  if (isB2BApproved && product.volumeTiers && product.volumeTiers.length > 0) {
    for (const tier of product.volumeTiers) {
      if (currentQty >= tier.minQty && (!tier.maxQty || currentQty <= tier.maxQty)) {
        activeUnitPrice = currency === 'USD' ? tier.priceUSD : tier.priceINR;
      }
    }
  }

  const totalPrice = activeUnitPrice * currentQty;


  const handleAddToCart = () => {
    addToCart(product.id, defaultVariant, defaultColor, currentQty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              {product.brand} • {product.category.replace('_', ' ')}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-start">
            {/* Left: Product Image */}
            <div className="relative aspect-square sm:aspect-square w-full rounded-2xl bg-white border border-slate-100 p-4 sm:p-6 flex items-center justify-center max-h-[280px] sm:max-h-none mx-auto">
              {product.imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  No image preview
                </div>
              )}

              {isB2BApproved && (
                <div className="absolute top-3 left-3 bg-[#2563eb] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Wholesale Trade Tier
                </div>
              )}
            </div>

            {/* Right: Info & Pricing */}
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {product.title}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{product.reviewsCount} reviews</span>
                  <span>•</span>
                  <span className="font-mono text-slate-400">SKU: {product.sku}</span>
                </div>
              </div>

              {/* Price Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {formatCurrency(activeUnitPrice, currency)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ unit</span>

                  {isB2BApproved && (
                    <span className="text-sm text-slate-400 line-through ml-2">
                      {formatCurrency(retailPrice, currency)}
                    </span>
                  )}
                </div>

                {isB2BApproved ? (
                  <p className="text-xs font-semibold text-[#2563eb]">
                    Wholesale Dealer Rate applied • Minimum Order: {product.moq} units
                  </p>
                ) : isB2BPending ? (
                  <p className="text-xs text-amber-700">
                    Retail rate displayed • Wholesale dealer application under admin review
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Direct Consumer (B2C) Price • Standard warranty included
                  </p>
                )}
              </div>

              {/* Wholesale Volume Tier Table (B2B Approved Only) */}
              {isB2BApproved && product.volumeTiers && (
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-100 px-3 py-1.5 font-bold uppercase tracking-wider text-slate-600">
                    Volume Tier Bulk Pricing
                  </div>
                  <div className="divide-y divide-slate-100">
                    {product.volumeTiers.map((tier, idx) => {
                      const tierPrice = currency === 'USD' ? tier.priceUSD : tier.priceINR;
                      const isActiveTier =
                        currentQty >= tier.minQty && (!tier.maxQty || currentQty <= tier.maxQty);

                      return (
                        <div
                          key={idx}
                          className={`px-3 py-2 flex items-center justify-between transition ${
                            isActiveTier ? 'bg-blue-50/70 font-semibold text-[#2563eb]' : 'text-slate-700'
                          }`}
                        >
                          <span>
                            {tier.minQty}
                            {tier.maxQty ? ` – ${tier.maxQty} units` : '+ units'}
                          </span>
                          <span>{formatCurrency(tierPrice, currency)} / unit</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Finish Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Select Color: <span className="font-bold text-slate-900">{defaultColor}</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => {
                      const isSelected = defaultColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition ${
                            isSelected
                              ? 'border-[#2563eb] bg-blue-50/70 text-[#2563eb] font-semibold ring-1 ring-blue-500/20 shadow-2xs'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                          {isSelected && <Check size={12} className="text-[#2563eb]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Variants Selector */}
              {product.variants.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Option / Specification
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                          defaultVariant === v
                            ? 'border-[#2563eb] bg-blue-50/60 text-[#2563eb] font-semibold'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Quantity {isB2BApproved && `(MOQ: ${moq})`}
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                    <button
                      onClick={() => setQty((prev) => Math.max(moq, prev - (isB2BApproved ? 5 : 1)))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 active:scale-95 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-slate-800 min-w-[48px] text-center">
                      {currentQty}
                    </span>
                    <button
                      onClick={() => setQty((prev) => prev + (isB2BApproved ? 5 : 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 active:scale-95 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-xs text-slate-500">
                    Total: <strong className="text-slate-900">{formatCurrency(totalPrice, currency)}</strong>
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#2563eb] hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>
                  {isB2BApproved
                    ? `Add Wholesale Pack (${currentQty} units • ${formatCurrency(totalPrice, currency)})`
                    : `Add to Cart (${formatCurrency(totalPrice, currency)})`}
                </span>
              </button>

              {/* Product Specs List */}
              <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                <p className="font-semibold text-slate-800 mb-1">Specifications:</p>
                {product.specs.powerOutput && <div>• <strong>Power:</strong> {product.specs.powerOutput}</div>}
                {product.specs.material && <div>• <strong>Material:</strong> {product.specs.material}</div>}
                {product.specs.compatibility && <div>• <strong>Compatibility:</strong> {product.specs.compatibility}</div>}
                {product.specs.display && <div>• <strong>Display:</strong> {product.specs.display}</div>}
                {product.specs.battery && <div>• <strong>Battery:</strong> {product.specs.battery}</div>}
                <div>• <strong>Warranty:</strong> {product.warranty}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
