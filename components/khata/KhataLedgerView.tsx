'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { BookOpen, PlusCircle, CheckCircle2, Share2, Building2, Phone, FileText } from 'lucide-react';
import RecordPaymentModal from './RecordPaymentModal';
import AddCreditModal from './AddCreditModal';

export default function KhataLedgerView() {
  const {
    khataCustomer,
    ledger,
    setIsRecordPaymentOpen,
    setIsGiveCreditOpen,
    showToast
  } = useStore();

  const availableCredit = Math.max(0, khataCustomer.creditLimit - khataCustomer.currentBalance);

  const handleWhatsAppShare = () => {
    const text = `*DHYAN ENTERPRISE - KHATA STATEMENT*\nStore: ${khataCustomer.name}\nGSTIN: ${khataCustomer.gstin}\nOutstanding Balance: ${formatCurrency(khataCustomer.currentBalance)}\nCredit Limit: ${formatCurrency(khataCustomer.creditLimit)}\nAvailable Credit: ${formatCurrency(availableCredit)}\nThank you for your business!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
    showToast('Generated WhatsApp billing statement summary!', 'success');
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {/* Partner Identity Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                Wholesale Retail Partner
              </div>
              <h2 className="text-base font-extrabold text-[#0F172A]">
                {khataCustomer.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#64748B]">
                <span className="font-mono-tech font-bold text-slate-700">GSTIN: {khataCustomer.gstin}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone size={11} />
                  <span>{khataCustomer.contact}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs transition"
          >
            <Share2 size={13} />
            <span>Share on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Credit Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Outstanding Balance */}
        <div className="bg-white rounded-2xl border border-red-200/80 p-4 shadow-sm bg-gradient-to-br from-white to-red-50/30">
          <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
            Outstanding Due Balance
          </div>
          <div className="text-2xl font-black text-red-600 font-mono-tech mt-1">
            {formatCurrency(khataCustomer.currentBalance)}
          </div>
          <div className="text-[10px] text-[#64748B] mt-1">Payable by 10th of next month</div>
        </div>

        {/* Total Credit Line */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm">
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Sanctioned Credit Limit
          </div>
          <div className="text-2xl font-black text-[#0F172A] font-mono-tech mt-1">
            {formatCurrency(khataCustomer.creditLimit)}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-1">Approved Distributor Line</div>
        </div>

        {/* Available Credit */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-sm bg-gradient-to-br from-white to-emerald-50/30">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            Available Credit for Orders
          </div>
          <div className="text-2xl font-black text-emerald-600 font-mono-tech mt-1">
            {formatCurrency(availableCredit)}
          </div>
          <div className="text-[10px] text-[#64748B] mt-1">Instant wholesale stock dispatch</div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setIsGiveCreditOpen(true)}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition active:scale-98"
        >
          <PlusCircle size={16} />
          <span>+ Issue Stock Credit Invoice</span>
        </button>

        <button
          onClick={() => setIsRecordPaymentOpen(true)}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition active:scale-98"
        >
          <CheckCircle2 size={16} />
          <span>✓ Record Payment Received</span>
        </button>
      </div>

      {/* Statement of Account Ledger Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="p-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xs text-[#0F172A]">
            <BookOpen size={16} className="text-[#0076DF]" />
            <span>Chronological Statement of Accounts ({ledger.length} entries)</span>
          </div>
          <span className="text-[10px] text-[#64748B] font-mono-tech">FY 2026-27</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#F1F5F9] text-[#64748B] text-left bg-slate-50/50">
                <th className="p-3 font-bold">DATE & TIME</th>
                <th className="p-3 font-bold">DESCRIPTION & REF</th>
                <th className="p-3 font-bold text-right text-red-600">DEBIT (OUT)</th>
                <th className="p-3 font-bold text-right text-emerald-600">CREDIT (IN)</th>
                <th className="p-3 font-bold text-right">RUNNING BAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {ledger.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="p-3 font-mono-tech text-[11px] text-[#64748B] whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-[#0F172A]">{tx.description}</div>
                    {tx.refNo && (
                      <div className="text-[10px] text-[#0076DF] font-mono-tech mt-0.5">
                        Ref: {tx.refNo}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-right font-mono-tech font-bold text-red-600">
                    {tx.debit > 0 ? formatCurrency(tx.debit) : '—'}
                  </td>
                  <td className="p-3 text-right font-mono-tech font-bold text-emerald-600">
                    {tx.credit > 0 ? formatCurrency(tx.credit) : '—'}
                  </td>
                  <td className="p-3 text-right font-mono-tech font-extrabold text-[#0F172A]">
                    {formatCurrency(tx.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <RecordPaymentModal />
      <AddCreditModal />
    </div>
  );
}
