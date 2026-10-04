'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  Building2,
  ShieldCheck,
  Clock,
  CreditCard,
  FileSpreadsheet,
  Receipt,
  Download,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function DhyanEnterpriseB2BPortal() {
  const {
    currentUser,
    currency,
    products,
    ledger,
    addToCart,
    toggleB2BApproval,
    setIsAuthModalOpen,
    setAuthModalTab,
    recordKhataPayment,
    showToast
  } = useStore();

  const [bulkQuantities, setBulkQuantities] = useState<{ [key: string]: number }>({});
  const [bulkColors, setBulkColors] = useState<{ [key: string]: string }>({});
  const [repayAmount, setRepayAmount] = useState<string>('500');

  const isB2B = currentUser?.role === 'b2b';
  const isApproved = isB2B && currentUser.b2bStatus === 'approved';
  const isPending = isB2B && currentUser.b2bStatus === 'pending';

  const handleBulkQtyChange = (productId: string, val: number, moq: number) => {
    setBulkQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, val)
    }));
  };

  const handleAddBulkToCart = (productId: string, moq: number) => {
    const qty = bulkQuantities[productId] || moq;
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const chosenColor = bulkColors[productId] || prod.colors[0]?.name || 'Standard';
    addToCart(productId, prod.variants[0] || 'Standard', chosenColor, qty);
    showToast(`Added ${qty} units of ${prod.title} (${chosenColor}) to wholesale order!`, 'success');
  };

  const handleRepay = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(repayAmount);
    if (val > 0) {
      recordKhataPayment(val, 'RTGS Payment received via Bank Transfer');
      setRepayAmount('');
    }
  };

  // State 1: Unregistered or Not B2B
  if (!isB2B) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-[#60a5fa]">
            <Building2 size={36} />
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dhyan Enterprise B2B Wholesale Portal
            </h1>
            <p className="text-sm sm:text-base text-blue-100 font-normal">
              Specialized pricing, bulk cartons, digital Khata credit terms, and GST tax invoices for mobile retailers, repair workshops, and electronics distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left py-4">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
              <div className="font-bold text-sm text-blue-200">Wholesale Bulk Tiers</div>
              <div className="text-xs text-blue-100 mt-1">Up to 45% off retail rates on cables, GaN chargers, and display assemblies.</div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
              <div className="font-bold text-sm text-blue-200">Net-30 Khata Credit</div>
              <div className="text-xs text-blue-100 mt-1">Pre-approved credit line up to $5,000 / ₹2,00,000 for regular shop accounts.</div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
              <div className="font-bold text-sm text-blue-200">GST Input Tax Credit</div>
              <div className="text-xs text-blue-100 mt-1">Automated tax compliant invoices with instant download and HSN codes.</div>
            </div>
          </div>

          <button
            onClick={() => {
              setAuthModalTab('register');
              setIsAuthModalOpen(true);
            }}
            className="bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition active:scale-95 inline-flex items-center gap-2"
          >
            <span>Apply for B2B Wholesale Account</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // State 2: Registered but Pending Approval (Option B)
  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-3xl border border-amber-200 p-8 shadow-md space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Clock size={28} className="animate-spin" />
            </div>
            <div>
              <div className="inline-block bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                APPLICATION UNDER COMPLIANCE REVIEW (Option B)
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Wholesale Account Verification in Progress
              </h2>
              <p className="text-xs text-slate-500">
                Business: <strong>{currentUser.businessName || 'Your Business'}</strong> • Tax ID / GSTIN: <strong className="font-mono">{currentUser.gstin || 'N/A'}</strong>
              </p>
            </div>
          </div>

          {/* Verification Timeline */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Verification Progress
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 text-xs">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">1. Details Submitted</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Clock size={18} className="text-amber-600 shrink-0 animate-pulse" />
                <span className="font-semibold text-amber-900">2. Compliance Review</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">
                  3
                </div>
                <span>3. Wholesale Rates Active</span>
              </div>
            </div>
          </div>

          {/* Testing Tool Simulation Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                <span>⚡ Interactive Demo Controller</span>
              </div>
              <p className="text-[11px] text-blue-800">
                Want to test the approved B2B wholesale features right now? Click to approve this account instantly.
              </p>
            </div>

            <button
              onClick={toggleB2BApproval}
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs shrink-0"
            >
              Simulate Instant Admin Approval
            </button>
          </div>
        </div>
      </div>
    );
  }

  // State 3: Approved Wholesale Dealer
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dealer Greeting & Metrics */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Verified Wholesale Retailer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {currentUser.businessName || currentUser.fullName}
            </h1>
            <p className="text-xs text-slate-300">
              GSTIN: <span className="font-mono text-blue-300">{currentUser.gstin || '24AAACD1234F1Z5'}</span> • Assigned Dispatch Desk: Flagship Station Hub #02
            </p>
          </div>

          {/* Credit & Terms Card */}
          <div className="bg-white/10 rounded-2xl p-3.5 sm:p-4 border border-white/15 backdrop-blur-xs grid grid-cols-2 gap-3 sm:gap-6 text-left">
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Khata Credit Limit</div>
              <div className="text-base sm:text-xl font-extrabold text-white mt-0.5 truncate">
                {formatCurrency(currentUser.creditLimit || 50000, currency)}
              </div>
              <div className="text-[9px] sm:text-[10px] text-emerald-300 font-semibold mt-0.5">● Net-30 Active</div>
            </div>

            <div className="border-l border-white/15 pl-3 sm:pl-6">
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Available Balance</div>
              <div className="text-base sm:text-xl font-extrabold text-blue-300 mt-0.5 truncate">
                {formatCurrency(
                  (currentUser.creditLimit || 50000) - (currentUser.usedCredit || 0),
                  currency
                )}
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-300 mt-0.5">0 Overdue Invoices</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Quick-Order Sheet */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-[#2563eb] shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Wholesale Bulk Quick-Order Sheet</h2>
              <p className="text-[11px] sm:text-xs text-slate-500">Order by cartons or case packs directly with volume discounts</p>
            </div>
          </div>

          <span className="text-[10px] text-[#2563eb] bg-blue-50 px-2.5 py-0.5 rounded-full font-medium sm:hidden self-start">
            ← Swipe to view all pricing columns →
          </span>
        </div>

        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-6">Product & SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">MOQ</th>
                <th className="py-3 px-4">Wholesale Rate</th>
                <th className="py-3 px-4">Retail Price</th>
                <th className="py-3 px-4">Profit Margin</th>
                <th className="py-3 px-6 text-right">Bulk Quantity & Add</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const wsPrice =
                  (currency === 'USD'
                    ? p.wholesalePriceUSD ?? Math.round(p.wholesalePrice / 83)
                    : p.wholesalePrice) || 0;
                const retPrice =
                  (currency === 'USD'
                    ? p.retailPriceUSD ?? Math.round(p.retailPrice / 83)
                    : p.retailPrice) || 0;
                const marginPct =
                  retPrice > wsPrice ? Math.round(((retPrice - wsPrice) / retPrice) * 100) : 0;
                const currentQty = bulkQuantities[p.id] || p.moq || 5;


                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-6">
                      <div className="font-semibold text-slate-900">{p.title}</div>
                      <div className="text-[11px] font-mono text-slate-400">{p.sku}</div>
                      {p.colors && p.colors.length > 0 && (
                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-medium mr-0.5">Finish:</span>
                          {p.colors.map((c) => {
                            const isSelected = (bulkColors[p.id] || p.colors[0]?.name) === c.name;
                            return (
                              <button
                                key={c.name}
                                type="button"
                                onClick={() => setBulkColors((prev) => ({ ...prev, [p.id]: c.name }))}
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border transition ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-300 ring-1 ring-blue-400/30 font-semibold'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                                title={`Select ${c.name}`}
                              >
                                <span
                                  className="w-2 h-2 rounded-full border border-black/15 shrink-0"
                                  style={{ backgroundColor: c.hex }}
                                />
                                <span>{c.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600 capitalize">
                      {p.category.replace('_', ' ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {p.moq || 5} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                      {formatCurrency(wsPrice, currency)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 line-through">
                      {formatCurrency(retPrice, currency)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                        +{marginPct}% Margin
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              handleBulkQtyChange(p.id, currentQty - (p.moq || 5), p.moq || 5)
                            }
                            className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-10 text-center font-bold text-slate-800 text-xs">
                            {currentQty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleBulkQtyChange(p.id, currentQty + (p.moq || 5), p.moq || 5)
                            }
                            className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddBulkToCart(p.id, p.moq || 5)}
                          className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition active:scale-95"
                        >
                          Add Pack
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Khata Credit Ledger & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ledger Statement */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt size={18} className="text-[#2563eb]" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Recent Khata Credit Ledger
              </h3>
            </div>
            <span className="text-xs text-slate-500">Live Statements</span>
          </div>

          <div className="space-y-3">
            {ledger.slice(0, 4).map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800">{tx.description}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {tx.date} • Ref: {tx.refNo}
                  </div>
                </div>

                <div className="text-right">
                  {tx.debit > 0 ? (
                    <div className="font-bold text-rose-600">
                      +{formatCurrency(tx.debit, currency)}
                    </div>
                  ) : (
                    <div className="font-bold text-emerald-600">
                      -{formatCurrency(tx.credit, currency)}
                    </div>
                  )}
                  <div className="text-[10px] text-slate-500">
                    Bal: {formatCurrency(tx.balance, currency)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repay / Bank Transfer Card */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Khata Settlement & Repayment</h3>
            <p className="text-xs text-slate-500 mt-1">
              Clear your wholesale credit balance via RTGS, IMPS, or corporate UPI.
            </p>

            <form onSubmit={handleRepay} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Repayment Amount ({currency})
                </label>
                <input
                  type="number"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] bg-white font-mono font-bold"
                  placeholder="500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
              >
                Record Repayment
              </button>
            </form>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600">
            <strong>Bank Wire Account:</strong> Dhyan Enterprise Wholesale • Bank of America / HDFC • IFSC/Routing #998822
          </div>
        </div>
      </div>
    </div>
  );
}
