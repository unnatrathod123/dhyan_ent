'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatters';
import { CheckCircle2, QrCode, ShieldCheck, MapPin, Clock, ArrowRight, X } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderConfirmationModal({ order, onClose }: OrderConfirmationModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-emerald-500 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={24} className="stroke-[2.5]" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-90">Order Confirmed</div>
              <div className="text-base font-extrabold font-mono-tech">#{order.orderId}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Details */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Pickup PIN & Secret QR Section */}
          <div className="bg-[#0F172A] text-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Counter Handover Secret PIN
            </div>
            <div className="text-4xl font-black font-mono-tech tracking-widest my-2 text-white">
              {order.pickupPin}
            </div>
            <p className="text-[11px] text-slate-300">
              Present this 4-digit PIN or scan the QR code at Counter Desk #02 to receive your inspected device.
            </p>

            {/* Dynamic QR Mock */}
            <div className="mt-3 bg-white p-3 rounded-xl inline-block shadow-inner">
              <svg width="110" height="110" viewBox="0 0 100 100" fill="none" className="mx-auto">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {/* QR corners */}
                <rect x="10" y="10" width="24" height="24" rx="4" fill="#0F172A" />
                <rect x="15" y="15" width="14" height="14" rx="2" fill="white" />
                <rect x="19" y="19" width="6" height="6" fill="#0076DF" />

                <rect x="66" y="10" width="24" height="24" rx="4" fill="#0F172A" />
                <rect x="71" y="15" width="14" height="14" rx="2" fill="white" />
                <rect x="75" y="19" width="6" height="6" fill="#0076DF" />

                <rect x="10" y="66" width="24" height="24" rx="4" fill="#0F172A" />
                <rect x="15" y="71" width="14" height="14" rx="2" fill="white" />
                <rect x="19" y="75" width="6" height="6" fill="#0076DF" />

                {/* QR data pixels */}
                <rect x="42" y="12" width="6" height="6" fill="#0F172A" />
                <rect x="52" y="18" width="6" height="6" fill="#0F172A" />
                <rect x="42" y="28" width="8" height="6" fill="#0076DF" />
                <rect x="38" y="42" width="24" height="6" fill="#0F172A" />
                <rect x="66" y="42" width="10" height="10" fill="#0F172A" />
                <rect x="44" y="62" width="6" height="16" fill="#0076DF" />
                <rect x="62" y="66" width="16" height="6" fill="#0F172A" />
                <rect x="72" y="76" width="12" height="12" fill="#0F172A" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-400 font-mono-tech mt-1">{order.pickupQr}</div>
          </div>

          {/* Station Road Desk Information */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-[#0076DF] shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">{order.pickupHub}</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">
                Opp. City Post Office, Station Road, Surat, Gujarat • +91 98250 12345
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Clock size={12} />
                <span>Ready for pickup in 15 minutes</span>
              </div>
            </div>
          </div>

          {/* 4-Stage Live Tracking Stepper */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 space-y-3">
            <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Live Order Status
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-[#0F172A]">Order Received & Billed</div>
                  <div className="text-[10px] text-[#64748B]">{order.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-[#0F172A]">Hardware & IMEI Verified</div>
                  <div className="text-[10px] text-[#64748B]">Assigned IMEI: {order.items[0]?.imei || '864920061234501'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0076DF] text-white flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
                  ●
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-[#0076DF]">Ready for Counter Handover</div>
                  <div className="text-[10px] text-[#64748B]">Waiting at Station Road Desk #02</div>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-40">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">
                  4
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-slate-600">Collected by Customer</div>
                  <div className="text-[10px] text-slate-400">Pending PIN verification</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Items Summary */}
          <div className="border border-[#E2E8F0] rounded-2xl p-3 bg-[#F8FAFC]">
            <div className="text-xs font-bold text-[#0F172A] mb-2">Order Items ({order.items.length})</div>
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#F1F5F9] last:border-none">
                <div>
                  <div className="font-semibold text-[#0F172A]">{it.title}</div>
                  <div className="text-[10px] text-[#64748B] font-mono-tech">
                    {it.variant} • {it.color} (Qty: {it.qty})
                  </div>
                </div>
                <div className="font-bold text-[#0F172A] font-mono-tech">
                  {formatCurrency(it.price * it.qty)}
                </div>
              </div>
            ))}

            <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-extrabold text-[#0F172A]">
              <span>Total Paid (incl. GST)</span>
              <span className="text-sm font-mono-tech text-[#0076DF]">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E2E8F0] shrink-0">
          <button
            onClick={onClose}
            className="w-full h-[48px] rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white font-bold text-sm shadow-md transition"
          >
            Done & Back to Storefront
          </button>
        </div>
      </div>
    </div>
  );
}
