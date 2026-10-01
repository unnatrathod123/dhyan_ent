'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { X, PlusCircle } from 'lucide-react';

export default function AddCreditModal() {
  const { isGiveCreditOpen, setIsGiveCreditOpen, giveKhataCredit } = useStore();

  const [amount, setAmount] = useState<string>('30000');
  const [description, setDescription] = useState<string>('Wholesale Stock Invoice (Accessories & GaN Chargers)');
  const [refNo, setRefNo] = useState<string>('INV-WH-8902');

  if (!isGiveCreditOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (num > 0) {
      giveKhataCredit(num, description, refNo);
      setIsGiveCreditOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle size={20} />
            <span className="font-extrabold text-sm">Issue Stock Credit Invoice</span>
          </div>
          <button
            onClick={() => setIsGiveCreditOpen(false)}
            className="w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center text-white"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1">
              Credit Invoice Value (₹)
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-base font-mono-tech font-black outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1">
              Invoice Description / Items Billed
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1">
              Wholesale Tax Invoice Number
            </label>
            <input
              type="text"
              required
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs font-mono-tech outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Debit Partner Khata & Dispatch Stock
          </button>
        </form>
      </div>
    </div>
  );
}
