'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  Package,
  Plus,
  Trash2,
  Search,
  RotateCcw,
  Tag,
  Building2,
  TrendingUp,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight
} from 'lucide-react';

interface TechHubAdminPortalProps {
  onReturnToStore?: () => void;
}

export default function TechHubAdminPortal({ onReturnToStore }: TechHubAdminPortalProps) {
  const {
    products,
    currency,
    setIsAddNewProductOpen,
    deleteProduct,
    resetCatalog,
    currentUser,
    loginUser,
    showToast
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const isAdmin = currentUser?.role === 'admin';

  // State 1: Access Denied / Admin Authentication Required (Strict Admin Guard)
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 animate-in fade-in">
        <div className="bg-white rounded-3xl border border-indigo-100 shadow-xl p-6 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock size={32} />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              <AlertCircle size={13} />
              <span>Restricted Access: Store Administrators Only</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Administrator Authentication Required
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Adding new products, configuring wholesale dealer discounts, and managing stock counts are strictly restricted to verified TechHub store administrators.
            </p>
          </div>

          {currentUser ? (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-sm mx-auto text-xs text-slate-600">
              <span>Currently signed in as: </span>
              <strong className="text-slate-900 block mt-0.5">{currentUser.fullName}</strong>
              <span className="text-[11px] text-slate-500 block mt-1">
                Account Type: {currentUser.role === 'b2b' ? '🏢 Wholesale Dealer' : '👤 Personal Shopper (B2C)'}
              </span>
              <span className="inline-block mt-1 text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                ✕ Non-Admin: Access to Add Products Prohibited
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-sm mx-auto text-xs text-slate-500">
              You are currently browsing as a <strong>Guest Visitor</strong>.
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => loginUser('admin@techhub.me', 'admin')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition active:scale-98 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>👑 Sign In as Store Administrator</span>
            </button>

            {onReturnToStore && (
              <button
                onClick={onReturnToStore}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
              >
                ← Return to Marketplace Storefront
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Filter products
  const filtered = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchTitle && !matchSku && !matchBrand) return false;
    }
    return true;
  });

  const totalStockUnits = products.reduce((acc, p) => acc + (p.stockCount || 0), 0);
  const totalCategories = new Set(products.map((p) => p.category)).size;
  const totalBrands = new Set(products.map((p) => p.brand)).size;

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in">
      {/* Top Banner: Admin Status & Quick Switch */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-400/30">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>HQ Administrator Privileges Active</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Inventory & Catalog Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Add new products, configure dual-currency retail prices, wholesale dealer volume tiers, minimum order quantities (MOQ), and monitor stock.
          </p>
        </div>

        {/* Action Button: Add New Product */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddNewProductOpen(true)}
            className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition active:scale-98 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>+ Add New Product</span>
          </button>

          <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/10 text-xs text-indigo-200">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span className="truncate">Admin Verified: {currentUser?.fullName}</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Total Products</span>
            <Package size={16} className="text-[#2563eb]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            {products.length} SKUs
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">● Live in Catalog</div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Total Stock Units</span>
            <Layers size={16} className="text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            {totalStockUnits.toLocaleString()} units
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Available Warehouse Units</div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Active Brands</span>
            <Tag size={16} className="text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            {totalBrands} Brands
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Samsung, Apple, Nothing...</div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Wholesale Categories</span>
            <Building2 size={16} className="text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            {totalCategories} Depts
          </div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">With MOQ & Tier Pricing</div>
        </div>
      </div>

      {/* Product Management Table Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Filter & Search Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by title, SKU, brand..."
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white capitalize"
            >
              <option value="all">All Categories</option>
              <option value="phones">Phones</option>
              <option value="cables">Cables</option>
              <option value="chargers">Chargers</option>
              <option value="spare_parts">Spare Parts</option>
              <option value="accessories">Accessories</option>
            </select>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => setIsAddNewProductOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Plus size={15} />
              <span>Add Product</span>
            </button>

            <button
              onClick={resetCatalog}
              title="Restore default factory demo products"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Product & Image</th>
                <th className="py-3.5 px-4">Brand & Category</th>
                <th className="py-3.5 px-4">Retail Price (B2C)</th>
                <th className="py-3.5 px-4">Wholesale Price (B2B)</th>
                <th className="py-3.5 px-4">MOQ</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => {
                const retUSD = prod.retailPriceUSD ?? Math.round(prod.retailPrice / 83);
                const wsUSD = prod.wholesalePriceUSD ?? Math.round(prod.wholesalePrice / 83);
                const margin = retUSD > wsUSD ? Math.round(((retUSD - wsUSD) / retUSD) * 100) : 0;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                    {/* Product & Image */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          {prod.imageUrl ? (
                            <Image
                              src={prod.imageUrl}
                              alt={prod.title}
                              fill
                              sizes="44px"
                              className="object-contain"
                            />
                          ) : (
                            <Package size={18} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1">{prod.title}</div>
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">{prod.sku}</div>
                          {prod.colors && prod.colors.length > 0 && (
                            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                              {prod.colors.map((c, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium border border-slate-200"
                                  title={`${c.name} (${c.hex})`}
                                >
                                  <span
                                    className="w-2 h-2 rounded-full border border-black/15 shrink-0 shadow-2xs"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                  <span className="truncate max-w-[70px]">{c.name}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Brand & Category */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{prod.brand}</span>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider capitalize mt-0.5">
                        {prod.category.replace('_', ' ')}
                      </div>
                    </td>

                    {/* Retail Price */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        {currency === 'USD' ? `$${retUSD.toFixed(2)}` : formatCurrency(prod.retailPrice, 'INR')}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {currency === 'USD' ? formatCurrency(prod.retailPrice, 'INR') : `$${retUSD.toFixed(2)}`}
                      </div>
                    </td>

                    {/* Wholesale Price */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#2563eb]">
                        {currency === 'USD' ? `$${wsUSD.toFixed(2)}` : formatCurrency(prod.wholesalePrice, 'INR')}
                      </div>
                      <span className="inline-block text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5">
                        +{margin}% Margin
                      </span>
                    </td>

                    {/* MOQ */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full text-xs">
                        {prod.moq || 5} units
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-700">
                        <span className={`w-2 h-2 rounded-full ${prod.stockCount > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span>{prod.stockCount || 20}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${prod.title}" from catalog?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Package size={32} className="mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No products match your filter.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                }}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
