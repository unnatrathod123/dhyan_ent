'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  ScanBarcode,
  Camera,
  Trash2,
  Printer,
  QrCode,
  Banknote,
  CreditCard,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Share2,
  PauseCircle,
  Plus,
  Minus
} from 'lucide-react';
import ThermalReceiptModal from './ThermalReceiptModal';

export default function StitchPOSView() {
  const {
    products,
    generatePOSBill,
    setIsThermalReceiptOpen,
    showToast,
    setTab
  } = useStore();

  const [barcodeInput, setBarcodeInput] = useState('864920061298412');
  const [paymentChannel, setPaymentChannel] = useState<'upi' | 'cash' | 'card' | 'khata'>('upi');
  const [items, setItems] = useState([
    {
      id: 'item_1',
      title: 'OnePlus 12 5G (Emerald Green)',
      tag: 'Mobile Phone',
      inStock: true,
      imei: '864920061298412',
      qty: 1,
      discountBadge: '-₹5,000 Store Off',
      mrp: 69999,
      price: 63499
    },
    {
      id: 'item_2',
      title: 'Dhyan Care 1-Year Screen Protection',
      tag: 'Ranger Protect',
      inStock: true,
      imei: 'Linked to OnePlus 12',
      qty: 1,
      desc: 'Instant activation + Free liquid & screen replacement',
      price: 1499
    },
    {
      id: 'item_3',
      title: 'Apple 20W USB-C Power Adapter',
      tag: 'Accessory',
      sku: '#000720490798',
      desc: 'Genuine Foxconn SKU • 6M Warranty',
      qty: 1,
      discountBadge: 'Buy 2 Free Combo Off',
      mrp: 1999,
      price: 1699
    }
  ]);

  const grossSubtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const storeDiscount = 1500;
  const netPayable = grossSubtotal - storeDiscount;
  const cgst = netPayable * 0.09;
  const sgst = netPayable * 0.09;

  const handleChargeAndPrint = () => {
    generatePOSBill('Walk-in Retail Buyer', '+91 98920 12345', paymentChannel === 'khata' ? 'khata' : paymentChannel === 'cash' ? 'cash' : 'upi');
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Removed line item from POS bill', 'normal');
  };

  const handleClearAll = () => {
    setItems([]);
    showToast('Cleared POS terminal cart', 'normal');
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-full pb-20">
      {/* 1. STATUS REGISTER BAR (Stitch Exact) */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-[#e5eeff] text-[11px] font-bold text-[#414753]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Counter Register #01 - 30-NOV-2024</span>
        </div>
        <div className="text-emerald-700 flex items-center gap-1">
          <span>Thermal Printer Ready</span>
          <span>🟢</span>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* 2. CUSTOMER INFO CARD (Stitch Exact) */}
        <div className="bg-white rounded-2xl border border-[#d3e4fe] p-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#dae2fd] text-[#005db3] flex items-center justify-center font-bold">
              👤
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-[#0b1c30]">Walk-in Retail Buyer</span>
                <span className="bg-[#eff4ff] text-[#005db3] text-[9px] font-bold px-1.5 py-0.2 rounded">
                  Standard
                </span>
              </div>
              <div className="text-[10px] text-[#717784]">
                Cash/UPI • Direct Invoice (+91 - 9892...)
              </div>
            </div>
          </div>

          <button
            onClick={() => setTab('khata')}
            className="flex items-center gap-1 bg-[#eff4ff] hover:bg-blue-100 text-[#005db3] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#d3e4fe] transition"
          >
            <span>Khata</span>
          </button>
        </div>

        {/* 3. BARCODE SCANNER FIELD (Stitch Exact) */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white border-2 border-[#0076df]/40 rounded-2xl px-3 py-2 flex items-center gap-2 shadow-2xs">
            <ScanBarcode size={18} className="text-[#0076df]" />
            <input
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              className="w-full text-xs font-mono-tech font-bold text-[#0b1c30] outline-none"
            />
            <button className="text-[#717784] hover:text-[#0b1c30]">
              <Camera size={16} />
            </button>
          </div>

          <button
            onClick={() => {
              showToast(`Scanned IMEI ${barcodeInput}!`, 'success');
            }}
            className="h-10 px-4 rounded-xl bg-[#005db3] hover:bg-[#0076df] text-white text-xs font-bold shadow-md transition"
          >
            + Add
          </button>
        </div>

        {/* 4. QUICK FILTER CHIPS (Stitch Exact) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button className="px-3.5 py-1.5 rounded-full bg-[#005db3] text-white text-xs font-bold shrink-0 shadow-xs">
            📱 Smartphones
          </button>
          <button className="px-3.5 py-1.5 rounded-full bg-white text-[#414753] border border-[#d3e4fe] text-xs font-bold shrink-0 hover:bg-[#eff4ff]">
            ⚡ Fast Chargers
          </button>
          <button className="px-3.5 py-1.5 rounded-full bg-white text-[#414753] border border-[#d3e4fe] text-xs font-bold shrink-0 hover:bg-[#eff4ff]">
            🛡️ Cases &amp; Covers
          </button>
        </div>

        {/* 5. CART ITEMS LIST (Stitch Exact 3 Items) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-[#0b1c30]">
              Cart Items ({items.length})
            </span>
            <button
              onClick={handleClearAll}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2.5">
            {items.map((it) => (
              <div
                key={it.id}
                className="bg-white rounded-2xl border border-[#d3e4fe] p-3 shadow-2xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="bg-[#eff4ff] text-[#005db3] text-[9px] font-bold px-1.5 py-0.2 rounded">
                        {it.tag}
                      </span>
                      {it.inStock && (
                        <span className="bg-[#ecfdf5] text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                          🟢 In Stock
                        </span>
                      )}
                    </div>
                    <div className="font-extrabold text-xs text-[#0b1c30]">{it.title}</div>
                    {it.imei && (
                      <div className="text-[10px] text-[#0076df] font-mono-tech mt-0.5">
                        IMEI: {it.imei}
                      </div>
                    )}
                    {it.desc && (
                      <div className="text-[10px] text-[#717784] mt-0.5">{it.desc}</div>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(it.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#f1f5f9]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#414753]">Qty: {it.qty}</span>
                    {it.discountBadge && (
                      <span className="bg-red-50 text-red-700 text-[9px] font-bold px-1.5 py-0.2 rounded border border-red-200">
                        {it.discountBadge}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    {it.mrp && (
                      <div className="text-[9px] text-[#717784] line-through">
                        {formatCurrency(it.mrp)}
                      </div>
                    )}
                    <div className="text-sm font-black text-[#0b1c30] font-mono-tech">
                      {formatCurrency(it.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. TAX INVOICE BREAKDOWN (Stitch Exact) */}
        <div className="bg-white rounded-2xl border border-[#d3e4fe] p-3.5 space-y-2 text-xs shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
            <span className="font-extrabold text-[#0b1c30]">🧾 Tax Invoice Breakdown</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-[#ecfdf5] px-2 py-0.5 rounded-full">
              GST Inclusive (18%)
            </span>
          </div>

          <div className="flex justify-between text-[#414753]">
            <span>Gross Subtotal (3 items)</span>
            <span className="font-mono-tech font-bold text-[#0b1c30]">
              {formatCurrency(grossSubtotal)}.00
            </span>
          </div>

          <div className="flex justify-between text-[#717784]">
            <span>CGST @ 9.0%</span>
            <span className="font-mono-tech">₹{cgst.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-[#717784]">
            <span>SGST @ 9.0%</span>
            <span className="font-mono-tech">₹{sgst.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-emerald-700 font-bold">
            <span>🟢 Store Coins Discount</span>
            <span className="font-mono-tech">- {storeDiscount.toFixed(2)}</span>
          </div>

          <div className="bg-[#eff4ff] rounded-xl p-2.5 flex items-center justify-between mt-2">
            <div>
              <div className="font-extrabold text-xs text-[#0b1c30]">Total Amount Payable</div>
              <div className="text-[9px] text-[#717784]">All Taxes &amp; Round-off Inclusive</div>
            </div>
            <span className="text-xl font-black text-[#005db3] font-mono-tech">
              {formatCurrency(netPayable)}
            </span>
          </div>
        </div>

        {/* 7. SELECT PAYMENT CHANNEL (Stitch Exact 4 Channels) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#0b1c30]">
            <span>Select Payment Channel</span>
            <span className="text-emerald-700 text-[10px]">● Instant Soundbox Synced</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'upi', name: 'Dynamic UPI QR', sub: 'Paytm | GPay | PhonePe', icon: '📱' },
              { id: 'cash', name: 'Cash Counter', sub: 'Tender change payout', icon: '💵' },
              { id: 'card', name: 'POS EDC Card', sub: 'Pinelabs / MSwipe Sync', icon: '💳' },
              { id: 'khata', name: 'Split / Khata', sub: 'Customer Credit Entry', icon: '📑' }
            ].map((ch) => {
              const isSelected = paymentChannel === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setPaymentChannel(ch.id as any)}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition ${
                    isSelected
                      ? 'border-[#0076df] bg-[#eff6ff] shadow-sm'
                      : 'border-[#d3e4fe] bg-white'
                  }`}
                >
                  <span className="text-lg">{ch.icon}</span>
                  <div>
                    <div className="font-extrabold text-xs text-[#0b1c30]">{ch.name}</div>
                    <div className="text-[10px] text-[#717784] leading-snug">{ch.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. SOUNDBOX LIVE UPI BOX (Stitch Exact) */}
        <div className="bg-white border border-[#d3e4fe] rounded-2xl p-3 flex items-center gap-3 shadow-2xs">
          <div className="w-14 h-14 bg-slate-900 rounded-xl p-1 flex items-center justify-center shrink-0">
            <QrCode size={36} className="text-white" />
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[10px] uppercase">
              <span>🔊 SOUNDBOX LIVE</span>
            </div>
            <div className="font-extrabold text-[#0b1c30] font-mono-tech mt-0.5">
              UPI ID: dhyanpos@icici
            </div>
            <p className="text-[10px] text-[#717784] mt-0.5">
              Scan to pay exact {formatCurrency(netPayable)} without manual amount input.
            </p>
          </div>
        </div>

        {/* 9. BOTTOM ACTIONS (Stitch Exact) */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleChargeAndPrint}
            className="w-full h-12 rounded-xl bg-[#005db3] hover:bg-[#0076df] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-[0.99]"
          >
            <Printer size={16} />
            <span>Charge {formatCurrency(netPayable)} &amp; Print GST Invoice</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Order held & parked in Drawer Slot 2', 'warning')}
              className="py-2.5 px-3 rounded-xl bg-white border border-[#d3e4fe] text-[#414753] hover:bg-[#eff4ff] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <PauseCircle size={15} />
              <span>Hold / Park Cart</span>
            </button>

            <button
              onClick={() => showToast('WhatsApp digital bill shared to +91 98920 12345!', 'success')}
              className="py-2.5 px-3 rounded-xl bg-white border border-[#d3e4fe] text-emerald-700 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Share2 size={15} />
              <span>WhatsApp Bill</span>
            </button>
          </div>
        </div>
      </div>

      <ThermalReceiptModal />
    </div>
  );
}
