'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { Printer, X } from 'lucide-react';

export default function ThermalReceiptModal() {
  const { lastGeneratedBill, isThermalReceiptOpen, setIsThermalReceiptOpen } = useStore();

  if (!isThermalReceiptOpen || !lastGeneratedBill) return null;

  const bill = lastGeneratedBill;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-center p-3 animate-in fade-in">
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions */}
        <div className="p-3 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Printer size={16} className="text-[#0076DF]" />
            <span>80mm Thermal Receipt Slip</span>
          </div>
          <button
            onClick={() => setIsThermalReceiptOpen(false)}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition"
          >
            <X size={15} />
          </button>
        </div>

        {/* Printable Monospace Thermal Slip */}
        <div className="p-4 overflow-y-auto bg-amber-50/20 font-mono text-xs text-black">
          <div id="printableThermalSlip" className="bg-white p-4 border border-dashed border-slate-300 rounded-lg shadow-sm">
            {/* Store Header */}
            <div className="text-center pb-2 border-b border-dashed border-slate-400">
              <h1 className="font-extrabold text-sm uppercase tracking-wider">DHYAN ENTERPRISE</h1>
              <p className="text-[10px] text-slate-600">Mobile Retail & Wholesale Distribution Hub</p>
              <p className="text-[10px] text-slate-600">Station Road Desk #02, Surat, Gujarat</p>
              <p className="text-[10px] font-bold text-slate-800">GSTIN: 24AAACD1234F1Z5</p>
              <p className="text-[10px] text-slate-600">Ph: +91 98250 12345</p>
            </div>

            {/* Bill Meta */}
            <div className="py-2 border-b border-dashed border-slate-400 text-[10px] space-y-0.5">
              <div className="flex justify-between">
                <span>INVOICE: <strong>{bill.billNo}</strong></span>
                <span>DESK: #02</span>
              </div>
              <div className="flex justify-between">
                <span>DATE: {bill.date}</span>
                <span>TENDER: {bill.tender.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>CUST: {bill.customerName}</span>
                <span>{bill.customerPhone}</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-2 border-b border-dashed border-slate-400">
              <div className="flex justify-between font-bold text-[10px] border-b border-slate-200 pb-1 mb-1">
                <span className="w-1/2">ITEM / IMEI</span>
                <span className="w-1/6 text-center">QTY</span>
                <span className="w-1/3 text-right">TOTAL</span>
              </div>

              {bill.items.map((it, idx) => (
                <div key={idx} className="py-1 text-[10px] border-b border-slate-100 last:border-none">
                  <div className="font-bold">{it.title}</div>
                  {it.imei && (
                    <div className="text-[9px] text-slate-600 tracking-wider">
                      IMEI: {it.imei}
                    </div>
                  )}
                  <div className="flex justify-between text-slate-700">
                    <span className="text-[9px]">Rate: ₹{it.rate}</span>
                    <span>x{it.qty}</span>
                    <span className="font-bold">₹{it.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Calculations */}
            <div className="py-2 border-b border-dashed border-slate-400 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span>SUBTOTAL (Net):</span>
                <span>₹{(bill.subtotal * 0.82).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (9%):</span>
                <span>₹{(bill.gstTotal / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (9%):</span>
                <span>₹{(bill.gstTotal / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-xs pt-1 border-t border-slate-300">
                <span>GRAND TOTAL:</span>
                <span>₹{bill.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Simulated Barcode */}
            <div className="pt-3 text-center">
              <div className="h-9 w-44 mx-auto flex items-center justify-center gap-0.5 bg-slate-900 p-1">
                {[4, 2, 6, 1, 3, 2, 5, 2, 4, 1, 3, 2, 6, 2, 4, 1, 5, 3].map((w, i) => (
                  <div key={i} className="bg-white h-full" style={{ width: `${w}px` }}></div>
                ))}
              </div>
              <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-1">
                *{bill.billNo}*
              </p>
              <p className="text-[10px] font-bold text-slate-700 mt-2">
                THANK YOU FOR YOUR VISIT!
              </p>
              <p className="text-[9px] text-slate-500">
                1 Year Brand Warranty valid with this GST Invoice
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 bg-white border-t border-[#E2E8F0] grid grid-cols-2 gap-2 shrink-0">
          <button
            onClick={() => setIsThermalReceiptOpen(false)}
            className="py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="py-2 px-3 rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition"
          >
            <Printer size={15} />
            <span>Print Thermal Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
