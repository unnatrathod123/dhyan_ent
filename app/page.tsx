'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import DevSimulatorBar from '@/components/common/DevSimulatorBar';
import BottomNav from '@/components/common/BottomNav';
import ToastContainer from '@/components/common/ToastContainer';

// Stitch Exact Screens
import StitchHomeView from '@/components/storefront/StitchHomeView';
import StitchProductDetailView from '@/components/storefront/StitchProductDetailView';
import StitchCreateAccountView from '@/components/auth/StitchCreateAccountView';
import StitchCheckoutView from '@/components/cart/StitchCheckoutView';
import StitchPOSView from '@/components/pos/StitchPOSView';
import StitchKhataView from '@/components/khata/StitchKhataView';
import StitchB2BView from '@/components/b2b/StitchB2BView';

// Enterprise Modals & Supplementary Views
import InventoryManagerView from '@/components/inventory/InventoryManagerView';
import WarrantyView from '@/components/warranty/WarrantyView';
import ThermalReceiptModal from '@/components/pos/ThermalReceiptModal';
import CashierShiftModal from '@/components/pos/CashierShiftModal';
import RecordPaymentModal from '@/components/khata/RecordPaymentModal';
import AddCreditModal from '@/components/khata/AddCreditModal';

export default function Home() {
  const { currentTab, isProductDetailOpen, isCreateAccountOpen, viewportMode } = useStore();

  const isMobile = viewportMode === 'mobile';

  return (
    <div
      className={`h-[100dvh] max-h-[100dvh] flex flex-col font-sans transition-colors duration-300 overflow-hidden ${
        isMobile ? 'bg-[#0b1320]' : 'bg-[#eef2f6]'
      }`}
    >
      {/* Top Prototype Toolbar with One-Click Jump to Any Stitch Screen */}
      <DevSimulatorBar />

      {/* Main Container */}
      <main
        className={`flex-1 min-h-0 flex flex-col justify-center items-center overflow-hidden ${
          isMobile ? 'py-0 sm:py-3 px-0 sm:px-4' : 'py-0 sm:py-2 px-0 sm:px-4'
        }`}
      >
        <div
          className={
            isMobile
              ? 'w-full max-sm:max-w-full sm:max-w-[420px] mx-auto bg-[#f8f9ff] h-full sm:h-full sm:max-h-[850px] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] sm:border-[8px] sm:border-slate-900 flex flex-col overflow-hidden relative'
              : 'w-full max-w-5xl mx-auto bg-[#f8f9ff] h-full sm:rounded-2xl sm:shadow-xl sm:border sm:border-slate-200/80 flex flex-col overflow-hidden relative'
          }
        >
          {/* If create account is open, render StitchCreateAccountView */}
          {isCreateAccountOpen || currentTab === 'register' ? (
            <StitchCreateAccountView />
          ) : isProductDetailOpen ? (
            <StitchProductDetailView />
          ) : (
            <>
              {/* Main Scrollable View Area */}
              <div className="flex-1 overflow-y-auto">
                {/* 1. STITCH STOREFRONT (stitch_home.png) */}
                {(currentTab === 'storefront' || currentTab === 'catalog') && (
                  <StitchHomeView />
                )}

                {/* 2. STITCH CHECKOUT FLOW (stitch_cart.png) */}
                {currentTab === 'orders' && <StitchCheckoutView />}

                {/* 3. STITCH POS BILLING COUNTER (stitch_pos.png) */}
                {currentTab === 'pos' && <StitchPOSView />}

                {/* 4. STITCH KHATA ACCOUNTING LEDGER (stitch_khata.png) */}
                {currentTab === 'khata' && <StitchKhataView />}

                {/* 5. STITCH B2B WHOLESALE HUB (stitch_b2b.png) */}
                {currentTab === 'b2b' && <StitchB2BView />}

                {/* Supplementary Operations */}
                {currentTab === 'inventory' && <InventoryManagerView />}
                {currentTab === 'warranty' && <WarrantyView />}
              </div>

              {/* Stitch 4-Tab Bottom Navigation (Home, Catalog, Orders, Cart) */}
              <BottomNav />
            </>
          )}
        </div>
      </main>

      {/* Modals & Slide-ups */}
      <ThermalReceiptModal />
      <CashierShiftModal />
      <RecordPaymentModal />
      <AddCreditModal />
      <ToastContainer />
    </div>
  );
}
