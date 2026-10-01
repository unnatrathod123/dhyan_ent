'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { Landmark, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function CashierShiftModal() {
  const { cashierShift, isShiftModalOpen, setIsShiftModalOpen, showToast } = useStore();

  const [actualCash, setActualCash] = useState<string>('');
  const [shiftClosed, setShiftClosed] = useState<boolean>(false);

  if (!isShiftModalOpen) return null;

  const expectedCash = cashierShift.cashFloat + cashierShift.cashCollected;
  const counted = actualCash ? parseFloat(actualCash) : expectedCash;
  const variance = counted - expectedCash;

  const handleReconcile = () => {
    setShiftClosed(true);
    showToast('Cashier shift drawer reconciled and locked!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-[#0076DF]" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Shift Reconciliation</div>
              <div className="text-sm font-extrabold">Counter Cashier Shift #02</div>
            </div>
          </div>
          <button
            onClick={() => setIsShiftModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5 overflow-y-auto">
          {shiftClosed ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 size={44} className="text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-[#0F172A]">Shift Reconciled & Closed</h3>
              <p className="text-xs text-[#64748B]">
                Drawer tally submitted to Store Manager. Opening float of ₹10,000 carried forward to Morning Shift.
              </p>
              <button
                onClick={() => {
                  setShiftClosed(false);
                  setIsShiftModalOpen(false);
                }}
                className="mt-4 px-4 py-2 bg-[#0076DF] text-white text-xs font-bold rounded-xl"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {/* Tally Summary Card */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-[#64748B]">
                  <span>Opening Cash Float</span>
                  <span className="font-mono-tech font-bold text-[#0F172A]">{formatCurrency(cashierShift.cashFloat)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Today Cash Sales Billed</span>
                  <span className="font-mono-tech font-bold text-emerald-600">+{formatCurrency(cashierShift.cashCollected)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>UPI / QR Digital Collections</span>
                  <span className="font-mono-tech font-bold text-[#0076DF]">{formatCurrency(cashierShift.upiCollected)}</span>
                </div>
                <div className="pt-2 border-t border-[#E2E8F0] flex justify-between font-extrabold text-[#0F172A]">
                  <span>Expected Physical Cash in Drawer</span>
                  <span className="font-mono-tech text-base text-[#0076DF]">{formatCurrency(expectedCash)}</span>
                </div>
              </div>

              {/* Physical Cash Count Input */}
              <div>
                <label className="text-xs font-bold text-[#0F172A] mb-1 block">
                  Physical Cash Counted in Drawer (₹)
                </label>
                <input
                  type="number"
                  placeholder={expectedCash.toString()}
                  value={actualCash}
                  onChange={(e) => setActualCash(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-sm font-mono-tech font-bold outline-none focus:border-[#0076DF]"
                />
              </div>

              {/* Variance indicator */}
              {actualCash && (
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                    variance === 0
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert size={16} />
                    <span>Drawer Variance:</span>
                  </div>
                  <span className="font-mono-tech font-bold">
                    {variance === 0 ? 'Exact Match (₹0)' : formatCurrency(variance)}
                  </span>
                </div>
              )}

              {/* Submit Trigger */}
              <button
                onClick={handleReconcile}
                className="w-full h-[48px] rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white font-bold text-sm shadow-md transition active:scale-[0.99]"
              >
                Reconcile & Lock Drawer Shift
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
