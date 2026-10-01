'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { Building2, Plus, ShieldCheck, Zap, ArrowRight, Layers } from 'lucide-react';

export default function B2BWholesaleView() {
  const { products, khataCustomer, addToCart, setIsCartOpen, setTab, showToast } = useStore();

  const handleBulkAdd = (productId: string, variant: string, color: string, qty: number) => {
    addToCart(productId, variant, color, qty);
    showToast(`Added ${qty} units to Wholesale Bag!`, 'success');
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {/* Wholesale Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0F172A] text-white rounded-2xl p-4 shadow-md border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Building2 size={22} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Authorized Electronics Merchant
              </div>
              <h2 className="text-base font-extrabold">{khataCustomer.name}</h2>
              <div className="text-xs text-slate-400 font-mono-tech">GSTIN: {khataCustomer.gstin}</div>
            </div>
          </div>

          <button
            onClick={() => setTab('khata')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white text-xs font-bold shadow transition"
          >
            <span>Open Khata Ledger</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Wholesale Catalog Matrix */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="p-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="font-bold text-xs text-[#0F172A] flex items-center gap-1.5">
            <Layers size={16} className="text-[#0076DF]" />
            <span>B2B Wholesale Price Tier Matrix</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
            Tier-1 Verified Margins
          </span>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {products.map((prod) => {
            const margin = prod.retailPrice - prod.wholesalePrice;
            const marginPct = Math.round((margin / prod.retailPrice) * 100);

            return (
              <div key={prod.id} className="p-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-[#F8FAFC] transition">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F172A]">{prod.title}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-1.5 py-0.2 rounded">
                      {marginPct}% Margin (₹{margin.toLocaleString('en-IN')})
                    </span>
                  </div>

                  <div className="text-[11px] text-[#64748B] font-mono-tech mt-0.5">
                    SKU: {prod.sku} • Stock: {prod.stockCount} Available
                  </div>

                  <div className="mt-1 flex items-baseline gap-3">
                    <div>
                      <span className="text-[10px] text-[#64748B]">B2B Price: </span>
                      <span className="font-mono-tech font-extrabold text-sm text-[#0076DF]">
                        {formatCurrency(prod.wholesalePrice)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#64748B]">Retail MRP: </span>
                      <span className="font-mono-tech text-xs text-slate-500 line-through">
                        {formatCurrency(prod.mrp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bulk Order Multipliers */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleBulkAdd(prod.id, prod.variants[0] || 'Default', prod.colors[0]?.name || 'Standard', 1)}
                    className="px-2.5 py-1.5 rounded-xl border border-[#E2E8F0] hover:border-[#0076DF] text-xs font-bold text-slate-700 hover:text-[#0076DF] transition"
                  >
                    +1 Unit
                  </button>

                  <button
                    onClick={() => handleBulkAdd(prod.id, prod.variants[0] || 'Default', prod.colors[0]?.name || 'Standard', 5)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition"
                  >
                    +5 Units (Bulk)
                  </button>

                  <button
                    onClick={() => handleBulkAdd(prod.id, prod.variants[0] || 'Default', prod.colors[0]?.name || 'Standard', 10)}
                    className="px-3 py-1.5 rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-xs font-bold text-white shadow-sm transition"
                  >
                    +10 Master Pack
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
