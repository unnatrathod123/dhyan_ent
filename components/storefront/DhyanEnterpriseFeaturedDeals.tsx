'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency, formatProductPrice } from '@/lib/utils/formatters';
import { ShoppingCart, Star, ShieldCheck, Building2, Eye, Tag } from 'lucide-react';

interface DhyanEnterpriseFeaturedDealsProps {
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
}

export default function DhyanEnterpriseFeaturedDeals({
  products,
  onOpenProductDetail
}: DhyanEnterpriseFeaturedDealsProps) {
  const { currentUser, currency, addToCart } = useStore();

  const isB2BApproved = currentUser?.role === 'b2b' && currentUser.b2bStatus === 'approved';
  const isB2BPending = currentUser?.role === 'b2b' && currentUser.b2bStatus === 'pending';

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Featured Deals</h2>
          <p className="text-xs text-slate-500 mt-0.5">Handpicked premium tech hardware & essential spare parts</p>
        </div>

        {/* Persona Price Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isB2BApproved ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-50 text-[#2563eb] border border-blue-200">
              <Building2 size={13} />
              <span>Wholesale Bulk Pricing Active</span>
            </span>
          ) : isB2BPending ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <span>Retail Mode • B2B Review Pending</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-slate-100 text-slate-700">
              <Tag size={13} />
              <span>Personal Shopper (B2C)</span>
            </span>
          )}
        </div>
      </div>

      {/* 2-Column Mobile, 2-Column Small Tablet, 3-Column Medium Tablet, 4-Column Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        {products.map((product) => {
          // Calculate active price based on persona with safe fallback
          const regularPrice =
            (currency === 'USD'
              ? product.retailPriceUSD ?? Math.round(product.retailPrice / 83)
              : product.retailPrice) || 0;

          const wholesalePrice =
            (currency === 'USD'
              ? product.wholesalePriceUSD ?? Math.round(product.wholesalePrice / 83)
              : product.wholesalePrice) || 0;

          const activePrice = isB2BApproved ? wholesalePrice : regularPrice;

          // Discount percent if B2B approved
          const wholesaleSavings =
            isB2BApproved && regularPrice > activePrice
              ? Math.round(((regularPrice - activePrice) / regularPrice) * 100)
              : null;

          const defaultVariant = product.variants[0] || 'Standard';
          const defaultColor = product.colors[0]?.name || 'Standard';
          const addQty = isB2BApproved ? product.moq || 5 : 1;

          return (
            <div
              key={product.id}
              onClick={() => onOpenProductDetail(product)}
              className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-5 shadow-xs hover:shadow-xl hover:border-slate-200 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              {/* Product Visual Area */}
              <div>
                <div className="relative w-full aspect-square mb-2.5 sm:mb-4 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1.5 sm:p-2 border border-slate-50">
                  {product.imageUrl ? (
                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                      No Image
                    </div>
                  )}

                  {/* Wholesale Savings Tag */}
                  {isB2BApproved && wholesaleSavings && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-[#2563eb] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
                      Save {wholesaleSavings}%
                    </div>
                  )}

                  {/* Quick preview hover button (Desktop) */}
                  <div className="hidden sm:flex absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center pointer-events-none">
                    <span className="bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye size={13} />
                      View Details
                    </span>
                  </div>
                </div>

                {/* Product Title */}
                <h3 className="font-semibold text-slate-900 text-xs sm:text-sm tracking-tight line-clamp-1 group-hover:text-[#2563eb] transition">
                  {product.title}
                </h3>

                {/* Subtitle / Variant Tag matching screenshot */}
                <p className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5 mb-1 truncate">
                  {product.subtitle || product.brand}
                </p>

                {/* Available Colors Swatches */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center -space-x-1">
                      {product.colors.slice(0, 5).map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-white shadow-2xs shrink-0"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium truncate">
                      {product.colors.length === 1
                        ? product.colors[0].name
                        : `${product.colors.length} colors`}
                    </span>
                  </div>
                )}

                {/* Price Display */}
                <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-2.5 sm:mb-4">
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {formatCurrency(activePrice, currency)}
                  </span>

                  {isB2BApproved && (
                    <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                      {formatCurrency(regularPrice, currency)}
                    </span>
                  )}

                  {isB2BApproved && (
                    <span className="text-[10px] sm:text-[11px] text-[#2563eb] font-semibold ml-auto">
                      MOQ: {product.moq || 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Full-width "Add to Cart" Button (matching screenshot) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product.id, defaultVariant, defaultColor, addQty);
                }}
                className="w-full bg-[#2563eb] hover:bg-blue-700 active:scale-98 text-white font-medium text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl shadow-xs transition-colors duration-150 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <ShoppingCart size={15} />
                <span className="truncate">
                  {isB2BApproved ? `Add (${addQty} MOQ)` : 'Add to Cart'}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
