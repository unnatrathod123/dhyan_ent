'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { ShieldCheck, Search, CheckCircle2, Clock, Wrench, AlertCircle } from 'lucide-react';

export default function WarrantyView() {
  const { warrantyClaims, submitWarrantyClaim, showToast } = useStore();

  const [searchImei, setSearchImei] = useState('864920061234501');
  const [verified, setVerified] = useState<boolean>(true);
  const [issueDesc, setIssueDesc] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchImei.trim()) {
      setVerified(true);
      showToast('IMEI verified: Active 1-Year Manufacturer Warranty found!', 'success');
    }
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDesc.trim()) return;
    submitWarrantyClaim(searchImei, issueDesc);
    setIssueDesc('');
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <ShieldCheck size={26} />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">
            Device Warranty & Service Claim Desk
          </h2>
          <p className="text-xs text-[#64748B]">
            Official warranty verification via device IMEI barcode and instant service submission.
          </p>
        </div>
      </div>

      {/* Search IMEI Form */}
      <form onSubmit={handleVerify} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm space-y-3">
        <label className="text-xs font-bold text-[#0F172A] block">
          Enter 15-Digit Device IMEI / Serial Number
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={searchImei}
            onChange={(e) => setSearchImei(e.target.value)}
            placeholder="e.g. 864920061234501"
            className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs font-mono-tech outline-none focus:border-[#0076DF]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#0076DF] hover:bg-[#005DB3] text-white text-xs font-bold rounded-xl shadow transition"
          >
            Verify Warranty
          </button>
        </div>
      </form>

      {/* Verified Status Banner */}
      {verified && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Warranty Status: ACTIVE (Brand Genuine)
              </span>
            </div>
            <span className="text-xs font-mono-tech font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Valid Till: 14 Jan 2027
            </span>
          </div>

          <div className="text-xs text-slate-700 space-y-1">
            <div>Device: <strong>OnePlus 12 5G (Flowy Emerald - 512GB)</strong></div>
            <div className="font-mono-tech">IMEI: {searchImei}</div>
            <div className="text-[11px] text-slate-500">Authorized Dealer: Dhyan Enterprise (Station Road Desk #02)</div>
          </div>

          {/* Submit Service Claim */}
          <form onSubmit={handleClaim} className="pt-2 border-t border-emerald-200/60 space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              Submit Repair / Replacement Request
            </label>
            <textarea
              rows={3}
              required
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              placeholder="Describe issue (e.g. Ear-speaker audio crackling, camera focus error)..."
              className="w-full bg-white border border-emerald-200 rounded-xl p-2.5 text-xs outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Submit Service Request Ticket
            </button>
          </form>
        </div>
      )}

      {/* Active Service Claims */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-xs text-[#0F172A]">
          Existing Service Claims ({warrantyClaims.length})
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {warrantyClaims.map((claim) => (
            <div key={claim.claimId} className="p-3.5 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Wrench size={14} className="text-[#0076DF]" />
                  <span>Claim #{claim.claimId}</span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {claim.status}
                </span>
              </div>
              <div className="text-[#64748B]">{claim.productTitle} • IMEI: {claim.imei}</div>
              <div className="text-slate-700 font-medium">{claim.issueDescription}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
