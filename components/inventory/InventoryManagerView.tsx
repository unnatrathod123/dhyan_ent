'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency, maskIMEI } from '@/lib/utils/formatters';
import { Layers, Plus, ScanBarcode, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import AddNewProductModal from './AddNewProductModal';

export default function InventoryManagerView() {
  const { products, setIsAddNewProductOpen } = useStore();

  const totalSKUs = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stockCount, 0);

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {/* Top Inventory Metrics */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0076DF] flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0F172A]">Real-Time IMEI Stock Manager</h2>
              <div className="text-xs text-[#64748B]">
                {totalSKUs} Active Hardware Models • {totalStockUnits} Serialized Devices in Hub
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAddNewProductOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white text-xs font-bold shadow-md transition"
        >
          <Plus size={16} />
          <span>Register New SKU</span>
        </button>
      </div>

      {/* Product Stock Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="p-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <span className="font-bold text-xs text-[#0F172A]">Serialized Hardware & IMEIs</span>
          <span className="text-[10px] text-emerald-700 bg-emerald-100/60 font-bold px-2 py-0.5 rounded-full">
            All Tested & Verified
          </span>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {products.map((prod) => (
            <div key={prod.id} className="p-4 space-y-2 hover:bg-[#F8FAFC] transition">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-[#0F172A]">{prod.title}</span>
                    <span className="text-[10px] text-[#0076DF] font-bold bg-blue-50 px-2 py-0.2 rounded font-mono-tech">
                      {prod.sku}
                    </span>
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    Category: {prod.category} • Warranty: {prod.warranty}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-extrabold text-[#0F172A] font-mono-tech">
                    {formatCurrency(prod.retailPrice)}
                  </div>
                  <div className={`text-[11px] font-bold ${prod.stockCount <= 10 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    ● {prod.stockCount} units in stock
                  </div>
                </div>
              </div>

              {/* IMEI Chips Drawer */}
              {prod.imeis && prod.imeis.length > 0 && (
                <div className="pt-1">
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                    Registered Serial Barcodes / IMEIs
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {prod.imeis.map((imei, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-[#F1F5F9] border border-[#E2E8F0] text-[#334155] px-2 py-0.5 rounded-lg text-[10px] font-mono-tech font-semibold"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{imei}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AddNewProductModal />
    </div>
  );
}
