'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';

import { Product } from '@/lib/types';
import DhyanEnterpriseHeader from '@/components/common/DhyanEnterpriseHeader';
import DhyanEnterpriseHero from '@/components/storefront/DhyanEnterpriseHero';
import DhyanEnterpriseBrandRow from '@/components/storefront/DhyanEnterpriseBrandRow';
import DhyanEnterpriseFeaturedDeals from '@/components/storefront/DhyanEnterpriseFeaturedDeals';
import DhyanEnterpriseProductDetailModal from '@/components/storefront/DhyanEnterpriseProductDetailModal';
import DhyanEnterpriseAuthModal from '@/components/auth/DhyanEnterpriseAuthModal';
import DhyanEnterpriseB2BPortal from '@/components/b2b/DhyanEnterpriseB2BPortal';
import DhyanEnterpriseAdminPortal from '@/components/admin/DhyanEnterpriseAdminPortal';
import DhyanEnterpriseAdminAddProductModal from '@/components/admin/DhyanEnterpriseAdminAddProductModal';
import CartDrawer from '@/components/cart/CartDrawer';
import ToastContainer from '@/components/common/ToastContainer';
import { Sparkles, Layers, ShieldCheck, ArrowRight, Building2, Package, Lock } from 'lucide-react';

export default function DhyanEnterpriseMainView() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    currentUser,
    currentRole,
    setRole,
    setIsAuthModalOpen,
    setAuthModalTab
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'storefront' | 'b2b_portal' | 'admin_portal'>('storefront');

  // Filter products based on search, category, and brand
  const filteredProducts = products.filter((p) => {
    // 1. Category Filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'phones' && p.category !== 'phones' && p.category !== 'smartphones') return false;
      if (activeCategory === 'cables' && p.category !== 'cables') return false;
      if (activeCategory === 'chargers' && p.category !== 'chargers') return false;
      if (activeCategory === 'spare_parts' && p.category !== 'spare_parts') return false;
    }

    // 2. Brand Filter
    if (activeBrand !== 'All' && p.brand.toLowerCase() !== activeBrand.toLowerCase()) {
      return false;
    }

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchCategory && !matchSku) return false;
    }

    return true;
  });

  // Featured 4 Deals from the screenshot (DuraLink cable, SwiftPort charger, iPhone screen, MagBoost powerbank)
  const featuredDealProducts = products.filter((p) =>
    ['prod_duralink_cable', 'prod_swiftport_charger', 'prod_ip13_screen', 'prod_magboost_powerbank'].includes(
      p.id
    )
  );

  const handleShopAllCategories = () => {
    setActiveCategory('all');
    setActiveBrand('All');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFindYourPart = () => {
    setActiveCategory('spare_parts');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header matching screenshot */}
      <DhyanEnterpriseHeader
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setViewMode('storefront');
          setActiveCategory(cat);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateTab={(tab) => setViewMode(tab)}
        activeViewMode={viewMode}
      />

      {/* Mode Sub-navigation: Storefront vs B2B Wholesale Portal vs Admin Console */}
      <div className="bg-slate-50 border-b border-slate-200/60 py-2 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setViewMode('storefront')}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition ${
                viewMode === 'storefront'
                  ? 'bg-white text-[#2563eb] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Marketplace Storefront
            </button>

            <button
              onClick={() => setViewMode('b2b_portal')}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                viewMode === 'b2b_portal'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Building2 size={13} />
              <span>B2B Wholesale Hub</span>
            </button>

            {currentUser?.role === 'admin' ? (
              <button
                onClick={() => setViewMode('admin_portal')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === 'admin_portal'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <ShieldCheck size={13} />
                <span>Admin Console</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  viewMode === 'admin_portal' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  + Add Product
                </span>
              </button>
            ) : (
              <button
                onClick={() => setViewMode('admin_portal')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === 'admin_portal'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Admin Authentication Required"
              >
                <Lock size={12} className="text-slate-400" />
                <span>Admin (Staff Only)</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 hidden md:flex items-center gap-2">
            <span>Customer Persona:</span>
            <span className="font-bold text-slate-800">
              {currentUser
                ? currentUser.role === 'admin'
                  ? '👑 System Administrator (Authorized to Add Products)'
                  : currentUser.role === 'b2b'
                  ? currentUser.b2bStatus === 'approved'
                    ? '🏢 Wholesale Dealer (Verified)'
                    : '⏳ Wholesale Review Pending'
                  : '👤 Personal Shopper (B2C)'
                : 'Guest Visitor (Redirects to Register on Add to Cart)'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {viewMode === 'b2b_portal' ? (
          <DhyanEnterpriseB2BPortal />
        ) : viewMode === 'admin_portal' ? (
          <DhyanEnterpriseAdminPortal onReturnToStore={() => setViewMode('storefront')} />
        ) : (
          <>
            {/* 2. Hero Section matching screenshot */}
            <DhyanEnterpriseHero
              onShopAllCategories={handleShopAllCategories}
              onFindYourPart={handleFindYourPart}
            />

            {/* 3. Shop by Brand Row matching screenshot */}
            <DhyanEnterpriseBrandRow
              activeBrand={activeBrand}
              onSelectBrand={(brand) => {
                setActiveBrand(brand);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 4. Featured Deals (The 4 exact cards from screenshot) */}
            {activeBrand === 'All' && activeCategory === 'all' && !searchQuery && (
              <DhyanEnterpriseFeaturedDeals
                products={featuredDealProducts}
                onOpenProductDetail={(prod) => setSelectedModalProduct(prod)}
              />
            )}

            {/* 5. Complete Catalog Grid */}
            <section id="catalog-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {activeCategory !== 'all'
                      ? `${activeCategory.replace('_', ' ').toUpperCase()} Catalog`
                      : activeBrand !== 'All'
                      ? `${activeBrand} Hardware & Accessories`
                      : 'All Products & Components'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {filteredProducts.length} verified authentic products
                  </p>
                </div>

                {/* Filter tags */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {['all', 'phones', 'cables', 'chargers', 'spare_parts', 'accessories'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium capitalize border transition ${
                        activeCategory === cat
                          ? 'bg-[#2563eb] text-white border-[#2563eb]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Deals Grid */}
              <DhyanEnterpriseFeaturedDeals
                products={filteredProducts}
                onOpenProductDetail={(prod) => setSelectedModalProduct(prod)}
              />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 sm:py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="relative h-9 w-40 mb-3">
              <Image
                src="/Dhyan_Logo_white.png"
                alt="Dhyan Enterprise"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-3 text-slate-400 leading-relaxed text-xs">

              Your one-stop tech marketplace for flagship smartphones, GaN charging adapters, military-grade cables, and certified OEM spare parts.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Customer Portals</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setAuthModalTab('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="hover:text-white transition"
                >
                  Personal Shopper Account (B2C)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setViewMode('b2b_portal');
                  }}
                  className="hover:text-white transition"
                >
                  Wholesale Dealer Network (B2B)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setViewMode('b2b_portal');
                  }}
                  className="hover:text-white transition"
                >
                  Khata Net-30 Credit Line
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setViewMode('admin_portal');
                  }}
                  className="hover:text-indigo-400 text-indigo-300 font-semibold transition flex items-center gap-1.5"
                >
                  <span>👑 Admin Inventory & Add Products</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveCategory('phones')} className="hover:text-white transition">Smartphones & Flagships</button></li>
              <li><button onClick={() => setActiveCategory('cables')} className="hover:text-white transition">Braided Cables & Adapters</button></li>
              <li><button onClick={() => setActiveCategory('chargers')} className="hover:text-white transition">GaN Fast Wall Chargers</button></li>
              <li><button onClick={() => setActiveCategory('spare_parts')} className="hover:text-white transition">OLED Displays & Spare Parts</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Direct Support</h4>
            <p className="text-slate-400">Desk #02, Flagship Station Road Hub</p>
            <p className="text-slate-400 mt-1">support@dhyanenterprise.com • Mon - Sat 9AM - 8PM</p>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              © 2026 Dhyan Enterprise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <DhyanEnterpriseAuthModal />
      <DhyanEnterpriseAdminAddProductModal />
      <DhyanEnterpriseProductDetailModal
        product={selectedModalProduct}
        onClose={() => setSelectedModalProduct(null)}
      />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
