'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  Building2,
  PhoneCall,
  MessageCircle,
  CreditCard,
  FileText,
  ScanLine,
  FileSpreadsheet,
  Receipt,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Maximize2,
  Bell,
  Truck,
  Plus,
  Minus,
  Sparkles,
  ChevronRight,
  Layers,
  ShoppingBag
} from 'lucide-react';

export default function StitchB2BView() {
  const { setTab, showToast } = useStore();

  const [activeBrand, setActiveBrand] = useState('All Brands');
  const [op12Qty, setOp12Qty] = useState(5);
  const [s24Qty, setS24Qty] = useState(2);
  const [activeB2BTab, setActiveB2BTab] = useState('hub');

  const handleAddToPO = (name: string, qty: number, total: number) => {
    showToast(`Added ${qty} units of ${name} (₹${total.toLocaleString('en-IN')}) to Purchase Order!`, 'success');
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-full pb-20 font-sans">
      {/* 1. TOP HEADER (Stitch Exact) */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-[#e5eeff] sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="relative h-6 w-24 sm:w-28 cursor-pointer" onClick={() => setTab('storefront')}>
            <Image
              src="/Dhyan_Logo.png"
              alt="Dhyan Enterprise"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
          <span className="bg-[#ecfdf5] border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Tier 1 Partner
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Full Screen Mode Activated', 'normal')}
            className="p-1.5 text-slate-500 hover:text-slate-700 transition"
            title="Expand"
          >
            <Maximize2 size={17} />
          </button>
          <div className="relative p-1.5 text-slate-500 hover:text-slate-700 cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#0076df] text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm">
            SG
          </div>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3.5">
        {/* Subtitle */}
        <div className="text-[11px] font-extrabold tracking-wider text-[#005db3] uppercase -mt-1">
          B2B WHOLESALE HUB • MUMBAI REGION
        </div>

        {/* 2. BLUE FESTIVE ANNOUNCEMENT CARD */}
        <div className="bg-gradient-to-r from-[#005db3] to-[#0076df] text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-amber-950 font-black text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase">
              FESTIVE INVENTORY ALLOCATION
            </span>
            <span className="text-[10px] text-blue-100 flex items-center gap-1 font-semibold">
              <Clock size={11} /> Closes in 02d 14h
            </span>
          </div>

          <h3 className="text-base font-black leading-tight text-white mb-1.5">
            Diwali Festive Stock Pre-Booking Open
          </h3>
          <p className="text-xs text-blue-100 leading-relaxed max-w-sm mb-3">
            Lock guaranteed allocation on upcoming flagship batches with just 10% advance credit hold.
          </p>

          <button
            onClick={() => showToast('Allocations Opened: OnePlus 12 & S24 Ultra reserved', 'success')}
            className="bg-white hover:bg-blue-50 text-[#005db3] text-xs font-extrabold px-3.5 py-1.5 rounded-xl shadow transition flex items-center gap-1.5"
          >
            <span>Pre-Book Allocation</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 3. PARTNER PROFILE CARD */}
        <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold bg-[#eff4ff] text-[#005db3] px-2 py-0.5 rounded">
              GST: 27AAGCS1234F1Z8
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              CREDIT ID: DH-B2B-7821
            </span>
          </div>

          <h2 className="text-base font-black text-[#0b1c30] tracking-tight">
            Shree Ganesh Mobiles & Telecom
          </h2>
          <div className="text-xs text-slate-500 mb-3">
            Shop 12, Lamington Road Commercial Hub, Mumbai 400007
          </div>

          {/* Key Account Manager Bar */}
          <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#005db3] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                VM
              </div>
              <div>
                <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Dedicated Key Account Manager
                </div>
                <div className="text-xs font-bold text-[#0b1c30]">
                  Vikram Mehta <span className="text-slate-400 font-normal">(Fleet Lead)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href="tel:+919820012345"
                className="w-8 h-8 rounded-lg bg-white border border-[#e2e8f0] text-[#005db3] flex items-center justify-center hover:bg-blue-50 transition shadow-xs"
              >
                <PhoneCall size={14} />
              </a>
              <button
                onClick={() => showToast('Opening WhatsApp with Key Account Manager...', 'normal')}
                className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-emerald-600 transition shadow-xs"
              >
                <MessageCircle size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. B2B REVOLVING CREDIT LINE CARD */}
        <div className="bg-white rounded-2xl p-4 border border-[#d3e4fe] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#0076df] flex items-center justify-center">
                <CreditCard size={18} />
              </div>
              <div>
                <div className="text-xs font-black text-[#0b1c30]">B2B Revolving Credit Line</div>
                <div className="text-[10px] text-slate-500">Approved Limit: ₹15,00,000</div>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#005db3] border border-blue-200 px-2 py-0.5 rounded-full">
              Net-30 Terms
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#f8f9ff] rounded-xl p-3 border border-[#e2e8f0]">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Available Credit
              </div>
              <div className="text-lg font-black text-emerald-700 tracking-tight mt-0.5">
                ₹8,45,200
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Ready for instant checkout</div>
            </div>

            <div className="bg-[#f8f9ff] rounded-xl p-3 border border-[#e2e8f0]">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Outstanding Due
              </div>
              <div className="text-lg font-black text-rose-600 tracking-tight mt-0.5">
                ₹6,54,800
              </div>
              <div className="text-[10px] text-rose-500 font-medium mt-0.5">Due in 11 days (07 Oct)</div>
            </div>
          </div>

          {/* Utilization Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1">
              <span>Credit Line Utilization</span>
              <span className="font-bold text-[#0b1c30]">43.6% Active (₹6.54L of ₹15.0L)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0076df] to-[#005db3] rounded-full w-[43.6%]"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Opening NEFT/UPI Settlement Portal...', 'normal')}
              className="py-2.5 px-3 bg-[#005db3] hover:bg-[#004a91] text-white text-xs font-black rounded-xl shadow transition flex items-center justify-center gap-1.5"
            >
              <CreditCard size={14} />
              <span>Pay Outstanding</span>
            </button>
            <button
              onClick={() => showToast('Downloading Statement & TDS Ledger PDF...', 'normal')}
              className="py-2.5 px-3 bg-[#eff4ff] hover:bg-[#e0ecff] text-[#005db3] border border-[#d3e4fe] text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <FileText size={14} />
              <span>Statement & TDS</span>
            </button>
          </div>
        </div>

        {/* 5. AVAILABLE OPERATIONS GRID (4 Cards) */}
        <div>
          <div className="text-xs font-black text-[#0b1c30] uppercase tracking-wider mb-2">
            Wholesale Operations
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Operation 1 */}
            <div
              onClick={() => showToast('Launching Barcode/IMEI Inward Scanner...', 'normal')}
              className="bg-white p-3 rounded-2xl border border-[#e2e8f0] shadow-2xs hover:border-[#0076df] cursor-pointer transition"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0076df] flex items-center justify-center mb-2">
                <ScanLine size={18} />
              </div>
              <div className="text-xs font-extrabold text-[#0b1c30]">Scan Box / IMEI</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Instant dispatch warranty registration
              </div>
            </div>

            {/* Operation 2 */}
            <div
              onClick={() => showToast('Opening Bulk Order CSV Upload Sheet...', 'normal')}
              className="bg-white p-3 rounded-2xl border border-[#e2e8f0] shadow-2xs hover:border-[#0076df] cursor-pointer transition"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <FileSpreadsheet size={18} />
              </div>
              <div className="text-xs font-extrabold text-[#0b1c30]">Bulk Order CSV</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Upload master SKU spreadsheet
              </div>
            </div>

            {/* Operation 3 */}
            <div
              onClick={() => showToast('Generating 18% Input Tax Credit Invoices...', 'normal')}
              className="bg-white p-3 rounded-2xl border border-[#e2e8f0] shadow-2xs hover:border-[#0076df] cursor-pointer transition"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Receipt size={18} />
              </div>
              <div className="text-xs font-extrabold text-[#0b1c30]">GST Invoices</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Claim 18% input tax credit e-bills
              </div>
            </div>

            {/* Operation 4 */}
            <div
              onClick={() => showToast('Checking Price Protection Eligibility...', 'normal')}
              className="bg-white p-3 rounded-2xl border border-[#e2e8f0] shadow-2xs hover:border-[#0076df] cursor-pointer transition"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs font-extrabold text-[#0b1c30]">Price Protection</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Claim margin credit on OEM price cuts
              </div>
            </div>
          </div>
        </div>

        {/* 6. TOP MOVING FLAGSHIP SKUS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#0b1c30] tracking-tight">Top Moving Flagship SKUs</h3>
              <p className="text-[11px] text-slate-500">Direct dispatch from Central Hub stock</p>
            </div>
            <button
              onClick={() => showToast('Opening complete 190+ SKU Wholesale Catalog', 'normal')}
              className="text-xs font-bold text-[#005db3] hover:underline flex items-center gap-0.5"
            >
              <span>View All 190+</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Brand Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['All Brands', 'OnePlus', 'Samsung', 'Xiaomi', 'Realme'].map((b) => (
              <button
                key={b}
                onClick={() => setActiveBrand(b)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  activeBrand === b
                    ? 'bg-[#005db3] text-white shadow-xs'
                    : 'bg-white border border-[#e2e8f0] text-slate-600 hover:bg-slate-50'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* SKU 1: OnePlus 12 */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm">
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-xl bg-[#f0fdf4] border border-emerald-100 relative overflow-hidden shrink-0 flex items-center justify-center">
                <Image
                  src="/images/oneplus_12.jpg"
                  alt="OnePlus 12"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[9px] font-black bg-[#ecfdf5] text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                    180 IN STOCK
                  </span>
                  <span className="text-[10px] text-slate-400">Min Order: 2 units</span>
                </div>

                <h4 className="text-xs font-black text-[#0b1c30] leading-snug">
                  OnePlus 12 5G (Emerald Green, 16GB+512GB)
                </h4>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  MRP: <span className="line-through">₹69,999</span> • B2B: <span className="text-[#005db3] font-bold">₹59,200</span>
                </div>
              </div>
            </div>

            {/* Volume Tier Table */}
            <div className="mt-3 bg-[#f8f9ff] rounded-xl border border-[#e2e8f0] overflow-hidden">
              <div className="px-3 py-1.5 bg-[#eff4ff] border-b border-[#e2e8f0] flex items-center justify-between text-[10px] font-bold text-[#005db3]">
                <span>VOLUME TIER</span>
                <span>WHOLESALE BUY UNIT PRICE (EXCL. GST)</span>
              </div>
              <div className="divide-y divide-[#e2e8f0] text-xs">
                <div className="px-3 py-1.5 flex items-center justify-between">
                  <span className="text-slate-600 text-[11px]">1 - 4 units (Basic)</span>
                  <span className="font-mono font-bold text-[#0b1c30]">₹59,200 / unit</span>
                </div>
                <div className="px-3 py-1.5 flex items-center justify-between bg-emerald-50/40">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-800 font-bold text-[11px]">5 - 19 units</span>
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1 rounded">
                      4.2% Margin
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800">₹56,400 / unit</span>
                </div>
                <div className="px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-600 text-[11px]">20+ units</span>
                    <span className="text-[9px] font-black bg-blue-100 text-[#005db3] px-1 rounded">
                      Master Lot
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#005db3]">₹54,650 / unit</span>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Add to PO */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center border border-[#e2e8f0] rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setOp12Qty(Math.max(2, op12Qty - 1))}
                  className="p-2 text-slate-500 hover:text-slate-800 transition"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 text-center text-xs font-black font-mono">{op12Qty}</span>
                <button
                  onClick={() => setOp12Qty(op12Qty + 1)}
                  className="p-2 text-slate-500 hover:text-slate-800 transition"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button
                onClick={() => handleAddToPO('OnePlus 12 5G (512GB)', op12Qty, op12Qty * (op12Qty >= 5 ? 56400 : 59200))}
                className="flex-1 bg-[#005db3] hover:bg-[#004a91] text-white py-2 px-3 rounded-xl text-xs font-black shadow transition flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                <span>
                  Add {formatCurrency(op12Qty * (op12Qty >= 5 ? 56400 : 59200))} to PO
                </span>
              </button>
            </div>
          </div>

          {/* SKU 2: Samsung S24 Ultra */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm">
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-xl bg-[#f8fafc] border border-slate-200 relative overflow-hidden shrink-0 flex items-center justify-center">
                <Image
                  src="/images/s24_ultra.jpg"
                  alt="Samsung Galaxy S24 Ultra"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[9px] font-black bg-[#ecfdf5] text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                    94 IN STOCK
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold">Financed Available</span>
                </div>

                <h4 className="text-xs font-black text-[#0b1c30] leading-snug">
                  Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)
                </h4>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  MRP: <span className="line-through">₹1,34,999</span> • Wholesale: <span className="text-[#005db3] font-bold">₹1,09,200</span>
                </div>
              </div>
            </div>

            {/* Tier chips */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-[#f8f9ff] p-2 rounded-xl border border-[#e2e8f0] text-center">
                <div className="text-[10px] text-slate-500">Single (1 - 3 Units)</div>
                <div className="font-mono font-black text-xs text-[#0b1c30]">₹1,09,200</div>
              </div>
              <div className="bg-blue-50/50 p-2 rounded-xl border border-blue-200 text-center">
                <div className="text-[10px] text-blue-700 font-bold">Lot (4+ Units)</div>
                <div className="font-mono font-black text-xs text-[#005db3]">₹1,04,500</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center border border-[#e2e8f0] rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setS24Qty(Math.max(1, s24Qty - 1))}
                  className="p-2 text-slate-500 hover:text-slate-800 transition"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 text-center text-xs font-black font-mono">{s24Qty}</span>
                <button
                  onClick={() => setS24Qty(s24Qty + 1)}
                  className="p-2 text-slate-500 hover:text-slate-800 transition"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button
                onClick={() => handleAddToPO('Samsung S24 Ultra 5G', s24Qty, s24Qty * (s24Qty >= 4 ? 104500 : 109200))}
                className="flex-1 bg-[#005db3] hover:bg-[#004a91] text-white py-2 px-3 rounded-xl text-xs font-black shadow transition flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                <span>
                  Add {formatCurrency(s24Qty * (s24Qty >= 4 ? 104500 : 109200))} to PO
                </span>
              </button>
            </div>
          </div>

          {/* SKU 3: SUPERVOOC Charger Box */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                <Layers size={22} className="text-[#005db3]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black bg-emerald-50 text-emerald-800 px-1 rounded">
                    175 FULL BOXES MIN
                  </span>
                </div>
                <h4 className="text-xs font-black text-[#0b1c30] mt-0.5">
                  SUPERVOOC 100W Chargers (Carton of 20)
                </h4>
                <div className="text-[11px] font-mono text-[#005db3] font-extrabold mt-0.5">
                  ₹38,000 <span className="text-[10px] text-slate-400 font-normal">/ 20-pack (₹1,900/pc)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleAddToPO('SUPERVOOC 100W 20-Pack Carton', 1, 38000)}
              className="bg-[#005db3] hover:bg-[#004a91] text-white py-2 px-3 rounded-xl text-xs font-extrabold shadow transition flex items-center gap-1 shrink-0"
            >
              <Plus size={13} />
              <span>Quick Add Carton</span>
            </button>
          </div>
        </div>

        {/* 7. RECENT PURCHASE ORDERS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-[#0b1c30] uppercase tracking-wider">
              Recent Purchase Orders
            </h3>
            <button
              onClick={() => showToast('Opening PO archive and tracking portal...', 'normal')}
              className="text-xs font-bold text-[#005db3] hover:underline"
            >
              All Orders &gt;
            </button>
          </div>

          {/* PO 1 */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-xs text-[#0b1c30]">PO-8197-B2B-0842</span>
                <span className="text-[9px] font-bold bg-blue-50 text-[#005db3] border border-blue-200 px-1.5 py-0.2 rounded">
                  In Transit (Fleet 02)
                </span>
              </div>
              <button
                onClick={() => showToast('Downloading Tax Invoice GST-INV-8197.pdf...', 'success')}
                className="text-[10px] font-bold text-[#005db3] hover:underline flex items-center gap-0.5"
              >
                <span>Download</span>
              </button>
            </div>

            <div className="text-xs text-slate-600">
              20 units (OnePlus 12 + 100W Chargers) • Value: <span className="font-mono font-bold text-[#0b1c30]">₹11,04,000</span>
            </div>

            <div className="bg-[#f8f9ff] rounded-xl p-2 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Truck size={13} className="text-[#0076df]" />
                <span>Dispatched from Central Warehouse (Hub 01)</span>
              </div>
              <span className="text-[#005db3] font-bold cursor-pointer hover:underline">Track GPS</span>
            </div>
          </div>

          {/* PO 2 */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-xs text-[#0b1c30]">PO-8041-B2B-0720</span>
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded">
                  Delivered
                </span>
              </div>
              <span className="text-[10px] text-slate-400">19.09.2026</span>
            </div>

            <div className="text-xs text-slate-600">
              15 units (Samsung S24 Ultra) • Value: <span className="font-mono font-bold text-[#0b1c30]">₹15,20,000</span>
            </div>

            <div className="text-[10px] text-emerald-700 bg-emerald-50/60 rounded-lg p-1.5 flex items-center gap-1.5">
              <CheckCircle2 size={12} />
              <span>100% Bill paid via Net-30 Credit Line • TDS Deducted @ 0.1%</span>
            </div>
          </div>
        </div>

        {/* 8. TRUST STRIP */}
        <div className="bg-white rounded-xl p-3 border border-[#e2e8f0] flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#0076df]" />
            <span className="font-semibold text-[11px]">
              100% Brand Sealed • Official OEM Warranty Guaranteed
            </span>
          </div>
          <span className="text-[#005db3] text-[11px] font-bold cursor-pointer hover:underline">
            Dhyan B2B Desk
          </span>
        </div>
      </div>

      {/* 9. B2B BOTTOM NAVIGATION (Stitch Exact) */}
      <div className="sticky bottom-0 left-0 right-0 w-full bg-white/98 backdrop-blur-md border-t border-[#e2e8f0] px-4 py-2 flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => setActiveB2BTab('hub')}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold transition ${
            activeB2BTab === 'hub' ? 'text-[#005db3]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Building2 size={18} />
          <span className="text-[10px]">Wholesale Hub</span>
        </button>

        <button
          onClick={() => {
            setActiveB2BTab('orders');
            showToast('Opening Bulk Purchase Orders tab', 'normal');
          }}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold transition ${
            activeB2BTab === 'orders' ? 'text-[#005db3]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileSpreadsheet size={18} />
          <span className="text-[10px]">Bulk Orders</span>
        </button>

        <button
          onClick={() => {
            setTab('khata');
          }}
          className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition"
        >
          <CreditCard size={18} />
          <span className="text-[10px]">Credit & Ledger</span>
        </button>

        <button
          onClick={() => {
            setTab('storefront');
          }}
          className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition"
        >
          <ShoppingBag size={18} />
          <span className="text-[10px]">Retail Store</span>
        </button>
      </div>
    </div>
  );
}
