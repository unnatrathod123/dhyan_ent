'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { ScanBarcode, Plus, Trash2, Printer, Landmark, Check, CreditCard, QrCode, Banknote } from 'lucide-react';
import ThermalReceiptModal from './ThermalReceiptModal';
import CashierShiftModal from './CashierShiftModal';

export default function POSTerminalView() {
  const {
    products,
    posCart,
    addToPosCart,
    updatePosCartItem,
    removePosCartItem,
    clearPosCart,
    generatePOSBill,
    cashierShift,
    setIsShiftModalOpen,
    showToast
  } = useStore();

  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [custName, setCustName] = useState<string>('Jatin Dave');
  const [custPhone, setCustPhone] = useState<string>('+91 98250 12345');
  const [tenderMode, setTenderMode] = useState<'cash' | 'upi' | 'khata'>('cash');

  // Handle barcode / SKU scan
  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    const query = barcodeInput.trim().toLowerCase();
    const matched = products.find(
      (p) =>
        p.sku.toLowerCase() === query ||
        p.title.toLowerCase().includes(query) ||
        (p.imeis && p.imeis.some((im) => im.toLowerCase() === query))
    );

    if (matched) {
      const assignedImei =
        matched.imeis?.find((im) => im.toLowerCase() === query) || matched.imeis?.[0] || '';
      addToPosCart(matched.id, assignedImei);
      setBarcodeInput('');
    } else {
      showToast(`SKU/Barcode "${barcodeInput}" not recognized`, 'error');
    }
  };

  // Quick items shelf
  const quickItems = products.slice(0, 5);

  // Totals
  let subtotal = 0;
  posCart.forEach((item) => {
    const prod = products.find((p) => p.id === item.productId);
    const price = prod ? prod.retailPrice : 0;
    const discounted = price * (1 - (item.discountPct || 0) / 100);
    subtotal += discounted * item.qty;
  });

  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal;

  const handleGenerateBill = () => {
    generatePOSBill(custName, custPhone, tenderMode);
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {/* Top POS Terminal Header & Shift Bar */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#0076DF]/10 text-[#0076DF] flex items-center justify-center font-black">
            <ScanBarcode size={22} />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base text-[#0F172A] flex items-center gap-1.5">
              <span>Quick Counter Billing Terminal</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-[#64748B]">Desk #02 • Shift Float: ₹10,000 • Live Tax POS</div>
          </div>
        </div>

        <button
          onClick={() => setIsShiftModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          <Landmark size={14} className="text-[#0076DF]" />
          <span>Cashier Drawer Shift</span>
        </button>
      </div>

      {/* Barcode & SKU Scanner Input */}
      <form onSubmit={handleScanSubmit} className="relative flex items-center">
        <ScanBarcode size={18} className="absolute left-3.5 text-[#0076DF]" />
        <input
          type="text"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
          placeholder="Scan barcode or type SKU (e.g. OP12-512G-GRN, IP16P, 864920061234501)..."
          className="w-full bg-white text-sm font-mono-tech pl-10 pr-24 py-3 rounded-2xl border-2 border-[#0076DF]/30 focus:border-[#0076DF] focus:ring-4 focus:ring-[#0076DF]/10 outline-none shadow-sm transition"
        />
        <button
          type="submit"
          className="absolute right-2 bg-[#0076DF] hover:bg-[#005DB3] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow transition active:scale-95"
        >
          Scan / Add
        </button>
      </form>

      {/* Quick Add Fast Tap Pills */}
      <div>
        <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
          Fast-Billing Quick Items
        </div>
        <div className="flex flex-wrap gap-2">
          {quickItems.map((prod) => (
            <button
              key={prod.id}
              onClick={() => addToPosCart(prod.id)}
              className="px-3 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#0076DF] rounded-xl text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 shadow-2xs hover:bg-[#F8FAFC] transition active:scale-95"
            >
              <Plus size={13} className="text-[#0076DF]" />
              <span>{prod.title.split(' ')[0]} {prod.title.split(' ')[1]}</span>
              <span className="font-mono-tech text-[11px] text-[#0076DF]">
                {formatCurrency(prod.retailPrice)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Billing Cart Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="font-bold text-xs text-[#0F172A]">
            Current Bill Line Items ({posCart.length})
          </div>
          {posCart.length > 0 && (
            <button
              onClick={clearPosCart}
              className="text-xs font-semibold text-red-500 hover:text-red-700"
            >
              Clear Terminal
            </button>
          )}
        </div>

        <div className="p-3 overflow-x-auto">
          {posCart.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#64748B]">
              No hardware added to bill. Scan an IMEI barcode or select from quick items above.
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#F1F5F9] text-[#64748B] text-left">
                  <th className="pb-2 font-bold">ITEM & SKU</th>
                  <th className="pb-2 font-bold">ASSIGNED IMEI</th>
                  <th className="pb-2 font-bold text-center">QTY</th>
                  <th className="pb-2 font-bold text-right">RATE</th>
                  <th className="pb-2 font-bold text-right">TOTAL</th>
                  <th className="pb-2 font-bold text-center">ACT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {posCart.map((item, index) => {
                  const prod = products.find((p) => p.id === item.productId);
                  const price = prod ? prod.retailPrice : 0;
                  const itemTotal = price * item.qty;

                  return (
                    <tr key={index} className="hover:bg-[#F8FAFC]">
                      <td className="py-2.5 pr-2">
                        <div className="font-bold text-[#0F172A] truncate max-w-[160px]">
                          {prod?.title || 'Unknown Product'}
                        </div>
                        <div className="text-[10px] text-[#0076DF] font-mono-tech">{prod?.sku}</div>
                      </td>

                      <td className="py-2.5 px-2">
                        <input
                          type="text"
                          value={item.imei || ''}
                          onChange={(e) => updatePosCartItem(index, { imei: e.target.value })}
                          placeholder="Assign IMEI..."
                          className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2 py-1 font-mono-tech text-[11px] w-36 outline-none focus:border-[#0076DF]"
                        />
                      </td>

                      <td className="py-2.5 px-2 text-center font-mono-tech font-bold">
                        {item.qty}
                      </td>

                      <td className="py-2.5 px-2 text-right font-mono-tech text-slate-600">
                        {formatCurrency(price)}
                      </td>

                      <td className="py-2.5 px-2 text-right font-mono-tech font-extrabold text-[#0F172A]">
                        {formatCurrency(itemTotal)}
                      </td>

                      <td className="py-2.5 pl-2 text-center">
                        <button
                          onClick={() => removePosCartItem(index)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Customer & Tender Bar */}
        {posCart.length > 0 && (
          <div className="p-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-3">
            {/* Customer Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-1.5 text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  Customer Mobile Phone
                </label>
                <input
                  type="text"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-1.5 text-xs font-mono-tech outline-none"
                />
              </div>
            </div>

            {/* Split Tender Selector */}
            <div>
              <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                Tender Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTenderMode('cash')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition ${
                    tenderMode === 'cash'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow'
                      : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                >
                  <Banknote size={15} />
                  <span>Cash Tender</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTenderMode('upi')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition ${
                    tenderMode === 'upi'
                      ? 'bg-[#0076DF] text-white border-[#0076DF] shadow'
                      : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                >
                  <QrCode size={15} />
                  <span>UPI QR Scan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTenderMode('khata')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition ${
                    tenderMode === 'khata'
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow'
                      : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                >
                  <CreditCard size={15} />
                  <span>Khata Ledger</span>
                </button>
              </div>
            </div>

            {/* Totals & Submit */}
            <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-[#64748B]">GST 18% included: {formatCurrency(gst)}</div>
                <div className="text-xl font-black text-[#0F172A] font-mono-tech">
                  Total: {formatCurrency(grandTotal)}
                </div>
              </div>

              <button
                onClick={handleGenerateBill}
                className="flex items-center gap-2 h-12 px-6 rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white font-extrabold text-sm shadow-lg active:scale-98 transition"
              >
                <Printer size={18} />
                <span>Generate Bill & Print Slip</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ThermalReceiptModal />
      <CashierShiftModal />
    </div>
  );
}
