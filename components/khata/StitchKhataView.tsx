'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  Search,
  Plus,
  Send,
  CheckCircle2,
  Share2,
  FileText,
  CreditCard,
  Building2,
  Phone,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function StitchKhataView() {
  const { showToast } = useStore();

  const [activeFilter, setActiveFilter] = useState('all');
  const [payMobile, setPayMobile] = useState('9820144819');
  const [payAmount, setPayAmount] = useState('5,000');
  const [payMode, setPayMode] = useState('cash');

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Recorded ₹${payAmount} payment for ${payMobile} via ${payMode.toUpperCase()}!`, 'success');
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-full pb-20">
      {/* 1. STORE HEADER (Stitch Exact) */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-[#e5eeff] text-xs">
        <div className="font-extrabold text-[#0b1c30] flex items-center gap-1">
          <span>Store #104 ▾</span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-mono-tech">
            DHYAN ENTERPRISE • ONLINE
          </span>
        </div>
        <div className="text-[10px] text-emerald-700 font-bold bg-[#ecfdf5] border border-emerald-200 px-2 py-0.5 rounded-full">
          ● UPI Soundbox Synced
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Title */}
        <div>
          <div className="text-[10px] font-bold text-[#005db3] uppercase tracking-wider">
            KHATA LEDGER MANAGEMENT
          </div>
          <h1 className="text-xl font-black text-[#0b1c30]">Customer Credit &amp; Khata</h1>
        </div>

        {/* 2. SEARCH BAR (Stitch Exact) */}
        <div className="bg-white border border-[#d3e4fe] rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-2xs">
          <Search size={16} className="text-[#717784]" />
          <input
            type="text"
            placeholder="Search customer name, mobile (+91), bill #"
            className="w-full text-xs text-[#0b1c30] outline-none"
          />
        </div>

        {/* 3. FILTER CHIPS (Stitch Exact) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              activeFilter === 'all'
                ? 'bg-[#005db3] text-white shadow-xs'
                : 'bg-white text-[#414753] border border-[#d3e4fe]'
            }`}
          >
            All Customers (102)
          </button>
          <button
            onClick={() => setActiveFilter('overdue')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              activeFilter === 'overdue'
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-600 border border-red-200'
            }`}
          >
            ● Due Exceeded (4)
          </button>
          <button
            onClick={() => setActiveFilter('soon')}
            className="px-3 py-1.5 rounded-full bg-white text-[#005db3] border border-blue-200 text-xs font-bold shrink-0"
          >
            ● Due Soon
          </button>
        </div>

        {/* 4. TOTAL OUTSTANDING METRIC CARD (Stitch Exact) */}
        <div className="bg-white rounded-2xl border border-[#d3e4fe] p-4 shadow-2xs space-y-3">
          <div className="text-[10px] font-bold text-[#717784] uppercase tracking-wider">
            TOTAL OUTSTANDING DUE (102 ACCOUNTS)
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0b1c30] font-mono-tech">
              ₹3,18,450
            </span>
            <span className="text-xs text-[#717784]">32 accounts</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#ecfdf5] border border-emerald-200 rounded-xl p-2.5">
              <div className="text-[10px] font-bold text-emerald-800">🟢 Collected (Mo)</div>
              <div className="text-base font-black text-emerald-800 font-mono-tech mt-0.5">
                ₹1,84,200
              </div>
              <div className="text-[9px] text-emerald-700">78% of last month</div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-2.5">
              <div className="text-[10px] font-bold text-red-700">🔴 Overdue &gt; 15d</div>
              <div className="text-base font-black text-red-700 font-mono-tech mt-0.5">
                ₹42,500
              </div>
              <div className="text-[9px] text-red-600">4 high-risk accounts</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => showToast('Opening New Khata Account Form...', 'normal')}
              className="py-2.5 px-3 rounded-xl bg-[#005db3] hover:bg-[#0076df] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <Plus size={15} />
              <span>+ New Khata</span>
            </button>

            <button
              onClick={() => showToast('Dispatched automated payment reminder SMS to 4 accounts!', 'success')}
              className="py-2.5 px-3 rounded-xl bg-[#eff4ff] hover:bg-blue-100 text-[#005db3] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#d3e4fe] transition"
            >
              <Send size={14} />
              <span>Bulk Reminder</span>
            </button>
          </div>
        </div>

        {/* 5. ACTIVE CUSTOMER ACCOUNTS LIST (Stitch Exact) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-[#0b1c30]">
              Active Customer Accounts
            </span>
            <span className="text-[10px] text-[#0076df] font-bold">Sort by Urgency ▾</span>
          </div>

          <div className="space-y-3">
            {/* Account 1: Rajesh Sharma (Overdue) */}
            <div className="bg-white rounded-2xl border border-red-200 p-3.5 space-y-2.5 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center">
                    RS
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-[#0b1c30]">Rajesh Sharma</span>
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    </div>
                    <div className="text-[10px] text-[#717784]">
                      +91 98201 44819 • Malabar Hill
                    </div>
                  </div>
                </div>

                <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  Overdue 4d
                </span>
              </div>

              {/* Balance bar */}
              <div className="bg-[#eff4ff] p-2.5 rounded-xl space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[10px] text-[#717784]">Due Balance</span>
                  <div>
                    <span className="font-mono-tech font-black text-base text-red-600">₹34,500</span>
                    <span className="text-[10px] text-[#717784]"> / ₹100k limit</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[35%] h-full bg-red-600"></div>
                </div>
                <div className="flex justify-between text-[9px] text-[#717784]">
                  <span>35% credit utilized</span>
                  <span className="text-red-600 font-bold">Payment promise was 18 Mar</span>
                </div>
              </div>

              <div className="text-[10px] text-[#414753] bg-slate-50 p-2 rounded-xl border border-slate-100">
                📦 OnePlus 12 5G + Silicone Case (Bill #120-8812 • ₹20,499 paid via UPI, ₹34,500 on Khata)
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => showToast('Generated WhatsApp UPI payment link to Rajesh!', 'success')}
                  className="py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Share2 size={13} />
                  <span>WhatsApp UPI</span>
                </button>

                <button
                  onClick={() => showToast('Recorded Cash settlement of ₹34,500!', 'success')}
                  className="py-2 px-3 rounded-xl bg-[#005db3] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Record Cash</span>
                </button>
              </div>
            </div>

            {/* Account 2: Anita Verma (Good Standing) */}
            <div className="bg-white rounded-2xl border border-[#d3e4fe] p-3.5 space-y-2.5 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-[#005db3] font-black text-xs flex items-center justify-center">
                    AV
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-[#0b1c30]">Anita Verma</span>
                      <span className="text-[9px] font-bold text-[#005db3] bg-blue-50 px-1.5 py-0.2 rounded">
                        GST Reg
                      </span>
                    </div>
                    <div className="text-[10px] text-[#717784]">
                      +91 98450 11234 • Bandra West
                    </div>
                  </div>
                </div>

                <span className="bg-blue-50 text-[#005db3] text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  Due in 6d
                </span>
              </div>

              <div className="bg-[#eff4ff] p-2.5 rounded-xl space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[10px] text-[#717784]">Outstanding</span>
                  <div>
                    <span className="font-mono-tech font-black text-base text-[#005db3]">₹18,900</span>
                    <span className="text-[10px] text-[#717784]"> / ₹50k limit</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[38%] h-full bg-[#0076df]"></div>
                </div>
                <div className="flex justify-between text-[9px] text-[#717784]">
                  <span>₹31,100 Credit Available</span>
                  <span className="text-emerald-700 font-bold">Excellent credit history</span>
                </div>
              </div>

              <div className="text-[10px] text-[#717784]">
                Last Received: ₹25,000 via HDFC UPI • 28 Feb (Ref: HDF-20182)
              </div>

              <button
                onClick={() => showToast('Recorded ₹10,000 payment from Anita Verma', 'success')}
                className="w-full py-2 rounded-xl bg-[#005db3] text-white text-xs font-bold shadow-sm"
              >
                Record ₹10.0k Payment
              </button>
            </div>
          </div>
        </div>

        {/* 6. INSTANT PAYMENT ENTRY CARD (Stitch Exact) */}
        <form onSubmit={handleRecordPayment} className="bg-white rounded-2xl border border-[#d3e4fe] p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">💳</span>
              <div>
                <div className="font-extrabold text-xs text-[#0b1c30]">Instant Payment Entry</div>
                <div className="text-[9px] text-[#717784]">Direct Cash or UPI settlement to Khata</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-bold text-[#414753] block mb-1">
                Customer Mobile
              </label>
              <input
                type="text"
                value={payMobile}
                onChange={(e) => setPayMobile(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#d3e4fe] rounded-xl px-3 py-1.5 font-mono-tech text-xs outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#414753] block mb-1">
                Amount Received (₹)
              </label>
              <input
                type="text"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#d3e4fe] rounded-xl px-3 py-1.5 font-mono-tech font-bold text-xs outline-none text-[#005db3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'cash', label: 'Cash Counter' },
              { id: 'upi', label: 'UPI Soundbox' },
              { id: 'neft', label: 'NEFT / Bank' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPayMode(m.id)}
                className={`py-1.5 text-[11px] font-bold rounded-lg border transition ${
                  payMode === m.id
                    ? 'bg-[#005db3] text-white border-[#005db3]'
                    : 'bg-white text-[#414753] border-[#d3e4fe]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#005db3] hover:bg-[#0076df] text-white font-extrabold text-xs shadow-md transition"
          >
            Record &amp; Send Digital Receipt
          </button>
        </form>
      </div>
    </div>
  );
}
