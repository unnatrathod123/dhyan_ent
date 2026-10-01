'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      {toasts.map((toast) => {
        let bgStyle = 'bg-slate-900 border-slate-700 text-white';
        let Icon = Info;
        if (toast.type === 'success') {
          bgStyle = 'bg-[#0F172A] border-emerald-500/80 text-white';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-[#1C160C] border-amber-500 text-amber-200';
          Icon = AlertTriangle;
        } else if (toast.type === 'error') {
          bgStyle = 'bg-[#220B0B] border-red-500 text-red-200';
          Icon = XCircle;
        }

        return (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border shadow-xl text-xs font-medium backdrop-blur-md animate-in slide-in-from-bottom-2 fade-in transition-all cursor-pointer ${bgStyle}`}
          >
            <Icon size={16} className={toast.type === 'success' ? 'text-emerald-400 shrink-0' : 'shrink-0'} />
            <span className="flex-1 leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
