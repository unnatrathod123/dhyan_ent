'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import {
  ChevronLeft,
  Share2,
  Check,
  Store,
  Truck,
  BadgeCheck,
  Clock,
  Phone,
  Shield,
  Trash2,
  Tag,
  ChevronUp,
  ArrowRight,
  Zap,
  QrCode,
  ShieldCheck,
  Plus,
  Minus
} from 'lucide-react';

export default function StitchCheckoutView() {
  const { setTab, showToast, clearCart } = useStore();

  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('pickup');
  const [hasDamageCover, setHasDamageCover] = useState(true);
  const [hasScreenGuard, setHasScreenGuard] = useState(false);
  const [couponApplied, setCouponApplied] = useState(true);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [item1Qty, setItem1Qty] = useState(1);
  const [item2Qty, setItem2Qty] = useState(1);
  const [item1Removed, setItem1Removed] = useState(false);
  const [item2Removed, setItem2Removed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  // Exact Price calculations from Stitch HTML
  const item1Price = 64999;
  const item2Price = 2999;
  const activeItemsCount = (item1Removed ? 0 : item1Qty) + (item2Removed ? 0 : item2Qty);
  const itemsTotal = (item1Removed ? 0 : item1Qty * item1Price) + (item2Removed ? 0 : item2Qty * item2Price);
  const retailDiscount = itemsTotal > 0 ? 4000 : 0;
  const couponDiscount = couponApplied && itemsTotal > 0 ? 1000 : 0;
  const accidentalCover = hasDamageCover && itemsTotal > 0 ? 2499 : 0;
  const screenGuardCover = hasScreenGuard && itemsTotal > 0 ? 499 : 0;
  const totalPayable = Math.max(0, itemsTotal - retailDiscount - couponDiscount + accidentalCover + screenGuardCover);
  const totalSavings = retailDiscount + couponDiscount;

  const handleProceedToPay = () => {
    const orderData = {
      orderId: `DHYAN-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      customerName: 'Aarav Patel',
      customerPhone: '+91 98200 12345',
      items: [
        ...(!item1Removed ? [{
          productId: '1',
          title: 'OnePlus 12 5G (Silky Black, 16GB + 512GB)',
          variant: '16GB + 512GB',
          color: 'Silky Black',
          qty: item1Qty,
          price: item1Price
        }] : []),
        ...(!item2Removed ? [{
          productId: '4',
          title: 'OnePlus SUPERVOOC 100W Dual-Port Adapter',
          variant: 'Standard',
          color: 'White',
          qty: item2Qty,
          price: item2Price
        }] : [])
      ],
      deliveryMode: deliveryMode,
      pickupHub: 'Shop #12, Galaxy Commercial Arcade, Mumbai Central, Mumbai 400034',
      pickupPin: `${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'ready_for_pickup' as const,
      subtotal: itemsTotal,
      gst: Math.round(totalPayable * 0.18),
      deliveryFee: 0,
      total: totalPayable
    };

    clearCart();
    setConfirmedOrder(orderData);
    showToast('Payment Authorized! OTP & In-Store Pickup Pass Generated.', 'success');
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex flex-col font-sans antialiased selection:bg-[#d5e3ff] selection:text-[#001b3c]">
      {/* 1. TOP APP BAR (Stitch Exact) */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]">
        <div className="h-14 sm:h-16 px-3 sm:px-4 flex items-center justify-between gap-2 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => setTab('storefront')}
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-slate-200/50 active:scale-95 transition-all"
              type="button"
            >
              <ChevronLeft size={22} />
            </button>
            <h1 className="font-bold text-lg sm:text-[20px] text-[#0b1c30] tracking-tight truncate">
              Checkout Flow
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => showToast('Checkout link copied to clipboard!', 'normal')}
              aria-label="Share"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#414753] hover:text-[#0b1c30] hover:bg-slate-200/50 active:scale-95 transition-all"
              type="button"
            >
              <Share2 size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#005db3] to-[#0076df] text-white flex items-center justify-center text-xs font-bold ml-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)] ring-2 ring-white select-none">
              AP
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 pb-28">
        {/* Step Tracker Progress Bar */}
        <section className="px-3 py-3 bg-white rounded-2xl shadow-xs mb-3 border border-[#e5eeff]/80">
          <div className="relative px-6 max-w-md mx-auto">
            {/* Track Background Line - precisely vertically centered through 28px (h-7) step circles at y=14px */}
            <div className="absolute left-8 right-8 top-[14px] -translate-y-1/2 h-[3px] bg-[#e5eeff] rounded-full z-0">
              <div className="h-full bg-[#005db3] rounded-full w-1/2 transition-all duration-300"></div>
            </div>

            <div className="flex items-center justify-between relative z-10">
              {/* Step 1: Completed */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[#005db3] text-white flex items-center justify-center shadow-xs">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-[10px] text-[#005db3] font-bold">1. Cart</span>
              </div>

              {/* Step 2: Active */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[#0076df] text-white flex items-center justify-center ring-4 ring-[#d5e3ff]/80 shadow-xs animate-pulse">
                  <Store size={14} />
                </div>
                <span className="text-[10px] text-[#0b1c30] font-bold">2. Pickup / Ship</span>
              </div>

              {/* Step 3: Pending */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[#e5eeff] text-[#717784] flex items-center justify-center border border-slate-200">
                  <QrCode size={13} />
                </div>
                <span className="text-[10px] text-[#717784] font-semibold">3. Payment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Grid Layout (Single Column on Mobile, 2 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Left Column: Flow Options, Items, Plans & Coupon (7 Columns on Desktop) */}
          <div className="md:col-span-7 flex flex-col gap-3">
            {/* Fulfillment Preference Toggle Tabs */}
            <div className="bg-[#eff4ff] p-1 rounded-xl flex gap-1 shadow-2xs border border-[#dce9ff]">
              <button
                onClick={() => setDeliveryMode('pickup')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-left flex items-start gap-2.5 transition-all ${
                  deliveryMode === 'pickup'
                    ? 'bg-white shadow-xs'
                    : 'bg-transparent opacity-70 hover:opacity-100'
                }`}
                id="tab-pickup"
                type="button"
              >
                <Store
                  size={20}
                  className={`shrink-0 mt-0.5 ${
                    deliveryMode === 'pickup' ? 'text-[#005db3]' : 'text-[#565e74]'
                  }`}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-[#0b1c30] font-bold truncate">Store Pickup</p>
                    <span className="bg-[#6ffbbe] text-[#002113] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      Free
                    </span>
                  </div>
                  <p className="text-xs text-[#006c49] font-semibold truncate mt-0.5">Ready in 30 Mins</p>
                </div>
              </button>

              <button
                onClick={() => setDeliveryMode('delivery')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-left flex items-start gap-2.5 transition-all ${
                  deliveryMode === 'delivery'
                    ? 'bg-white shadow-xs'
                    : 'bg-transparent opacity-70 hover:opacity-100'
                }`}
                id="tab-delivery"
                type="button"
              >
                <Truck
                  size={20}
                  className={`shrink-0 mt-0.5 ${
                    deliveryMode === 'delivery' ? 'text-[#005db3]' : 'text-[#565e74]'
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-xs text-[#0b1c30] font-bold truncate">Express Delivery</p>
                  <p className="text-xs text-[#565e74] truncate mt-0.5">By Today 7 PM</p>
                </div>
              </button>
            </div>

            {/* Selected Store Location Card */}
            <div className="bg-white p-3.5 rounded-2xl shadow-xs relative overflow-hidden border border-[#e5eeff]">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#d5e3ff]/30 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex p-1 rounded-md bg-[#d5e3ff] text-[#001b3c]">
                    <BadgeCheck size={16} />
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-[#0b1c30] tracking-tight">
                    Dhyan Enterprise Retail Hub
                  </h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#414753] text-[10px] font-semibold shrink-0">
                  0.8 km away
                </span>
              </div>

              <p className="text-xs text-[#565e74] mb-3 leading-relaxed pl-7 sm:pl-8">
                Shop #12, Galaxy Commercial Arcade, Mumbai Central, Mumbai 400034
              </p>

              <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-dashed border-[#c1c6d5]/50 gap-2">
                <div className="flex items-center gap-1.5 text-[#565e74] text-xs">
                  <Clock size={14} className="text-[#006c49]" />
                  <span className="text-[11px] font-medium">10:00 AM - 9:30 PM Today</span>
                </div>
                <a
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#005db3] active:scale-95 transition-transform hover:underline"
                  href="tel:+919820012345"
                >
                  <Phone size={13} />
                  <span>+91 98200 12345</span>
                </a>
              </div>
            </div>

            {/* Cart Items Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-[#0b1c30]">
                  Cart Items ({activeItemsCount})
                </h3>
                <span className="text-[10px] text-[#005db3] font-semibold flex items-center gap-1">
                  <Shield size={12} className="text-[#005db3]" /> Instant Stock Reserved
                </span>
              </div>

              {/* Item 1: OnePlus 12 5G */}
              {!item1Removed && (
                <div className="bg-white p-3.5 rounded-2xl shadow-xs flex gap-3 border border-[#e5eeff]">
                  <div className="w-20 h-20 bg-[#eff4ff] rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center p-1 border border-slate-100">
                    <img
                      className="w-full h-full object-contain rounded-lg"
                      alt="OnePlus 12 5G"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWyHzw4xvwV7nsmZI12N19HVDs26Uy1PjC0I1cTv2GDyeFc9bGmryLGO0ZrUXPrak-WdjcwqITsiWa-z-j28hYtoxbQsNX4jJNxmx1Y4BV-WzysqxDaGKdL36wZzoOndg4AZ9RpJRIpjXiBWTy6sJwLSbkHslcGRA6p3LhU2xtqc-diwEzIb0Y3_i4hDngOmpVHOCkCpBoLeuE3n18j7S3fqZvHktUPMvNpPVNLNqy"
                    />
                    <span className="absolute bottom-1 left-1 bg-[#d3e4fe]/90 text-[#0b1c30] text-[9px] px-1 rounded font-bold">
                      512GB
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#0b1c30] leading-snug line-clamp-1">
                          OnePlus 12 5G
                        </h4>
                        <button
                          onClick={() => {
                            setItem1Removed(true);
                            showToast('OnePlus 12 removed from bag', 'normal');
                          }}
                          aria-label="Remove item"
                          className="text-[#717784] hover:text-[#ba1a1a] active:scale-90 transition-transform p-0.5"
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-[#565e74] truncate mt-0.5">Silky Black, 16GB + 512GB</p>
                      <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#6ffbbe]/70 text-[#002113] text-[10px] font-semibold">
                        <span>Free Tempered Glass Included</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                      <span className="text-sm font-extrabold text-[#0b1c30]">₹64,999</span>
                      <div className="flex items-center gap-2 bg-[#eff4ff] rounded-lg p-0.5 shadow-inner">
                        <button
                          onClick={() => setItem1Qty(Math.max(1, item1Qty - 1))}
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-[#0b1c30] active:scale-95 shadow-xs text-sm font-bold hover:bg-slate-50"
                          type="button"
                        >
                          -
                        </button>
                        <span className="text-xs text-[#0b1c30] px-1 font-bold">{item1Qty}</span>
                        <button
                          onClick={() => setItem1Qty(item1Qty + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-[#0b1c30] active:scale-95 shadow-xs text-sm font-bold hover:bg-slate-50"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Item 2: OnePlus SUPERVOOC Charger */}
              {!item2Removed && (
                <div className="bg-white p-3.5 rounded-2xl shadow-xs flex gap-3 border border-[#e5eeff]">
                  <div className="w-20 h-20 bg-[#eff4ff] rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center p-1 border border-slate-100">
                    <img
                      className="w-full h-full object-contain rounded-lg"
                      alt="OnePlus 100W SUPERVOOC"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDfpK5xYx1fPwrX9FQ46ci37_GxhNvyUaWGZk6AczkULDbgLlrQ0G7GrAi8If5I6TnwOHUbZOIeXAivWBxapFowT9IEr0Uy1BsV0muxXVITsJHz0IVOV8eKTDYqXEQoIRuQr49SYQ03TwrTb9xamhIYz3LN9wG8D4L-T2YeqWdtJn7U5ujgz1Urh4rXvOoVcvVpwTWGiNyu4K0ndI5ezyAvGgqtyhl3TqBgiKodeL8"
                    />
                    <span className="absolute top-1 left-1 bg-[#00885d] text-white text-[9px] px-1 rounded font-bold">
                      14% OFF
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#0b1c30] leading-snug line-clamp-1">
                          OnePlus SUPERVOOC 100W Dual-Port
                        </h4>
                        <button
                          onClick={() => {
                            setItem2Removed(true);
                            showToast('Charger removed from bag', 'normal');
                          }}
                          aria-label="Remove item"
                          className="text-[#717784] hover:text-[#ba1a1a] active:scale-90 transition-transform p-0.5"
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-[#565e74] truncate mt-0.5">Ultra-Fast Wall Adapter</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold text-[#0b1c30]">₹2,999</span>
                        <span className="text-xs text-[#717784] line-through">₹3,499</span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#eff4ff] rounded-lg p-0.5 shadow-inner">
                        <button
                          onClick={() => setItem2Qty(Math.max(1, item2Qty - 1))}
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-[#0b1c30] active:scale-95 shadow-xs text-sm font-bold hover:bg-slate-50"
                          type="button"
                        >
                          -
                        </button>
                        <span className="text-xs text-[#0b1c30] px-1 font-bold">{item2Qty}</span>
                        <button
                          onClick={() => setItem2Qty(item2Qty + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-[#0b1c30] active:scale-95 shadow-xs text-sm font-bold hover:bg-slate-50"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Retail Upsell & Protection Checklist */}
            <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e5eeff]">
              <div className="flex items-center gap-2 mb-2.5">
                <ShieldCheck size={18} className="text-[#006c49]" />
                <h3 className="text-xs font-bold text-[#0b1c30]">Device Protection Plans</h3>
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-2.5 p-2 rounded-xl bg-[#eff4ff] cursor-pointer active:opacity-90 transition-all border border-transparent hover:border-[#d5e3ff]">
                  <input
                    checked={hasDamageCover}
                    onChange={(e) => setHasDamageCover(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#005db3] rounded accent-[#005db3]"
                    type="checkbox"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold text-[#0b1c30]">
                        1-Year Complete Accidental &amp; Liquid Damage
                      </p>
                      <span className="text-[11px] font-bold text-[#005db3]">+₹2,499</span>
                    </div>
                    <p className="text-xs text-[#565e74] mt-0.5">
                      Direct replacement guarantee backed by Dhyan Retail Care
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2 rounded-xl bg-[#eff4ff]/60 hover:bg-[#eff4ff] cursor-pointer active:opacity-90 transition-all border border-transparent hover:border-[#d5e3ff]">
                  <input
                    checked={hasScreenGuard}
                    onChange={(e) => setHasScreenGuard(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#005db3] rounded accent-[#005db3]"
                    type="checkbox"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-[#0b1c30]">
                        VIP Lifetime Screen Guard Replacement
                      </p>
                      <span className="text-[11px] font-bold text-[#565e74]">+₹499</span>
                    </div>
                    <p className="text-xs text-[#565e74] mt-0.5">
                      Unlimited replacements at any Dhyan branch
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Store Coupon Box */}
            <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e5eeff]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
                  <Tag size={15} className="text-[#005db3]" />
                  Apply Store Coupon
                </span>
                <span className="text-[11px] font-bold text-[#006c49]">1 Offer Applied</span>
              </div>

              {couponApplied ? (
                <div className="flex items-center justify-between p-2.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#6ffbbe] flex items-center justify-center text-[#002113] shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-[#0b1c30] tracking-wider font-mono">
                          DHYANFESTIVE
                        </span>
                        <span className="bg-[#6ffbbe] text-[#002113] text-[9px] px-1 py-0.2 rounded uppercase font-bold">
                          Applied
                        </span>
                      </div>
                      <p className="text-xs text-[#006c49] font-semibold mt-0.5">
                        Instant Retail Festival Savings of ₹1,000
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCouponApplied(false);
                      showToast('Coupon removed', 'normal');
                    }}
                    className="text-xs text-[#ba1a1a] font-bold px-2 py-1 active:scale-95 transition-transform hover:underline"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCouponApplied(true);
                    showToast('Coupon DHYANFESTIVE applied!', 'success');
                  }}
                  className="w-full py-2 border-2 border-dashed border-[#0076df] text-[#0076df] text-xs font-bold rounded-xl hover:bg-blue-50 transition"
                >
                  + Apply &apos;DHYANFESTIVE&apos; (Save ₹1,000)
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Price Breakdown Summary & Desktop Actions (5 Columns on Desktop) */}
          <div className="md:col-span-5 flex flex-col gap-3 md:sticky md:top-20">
            {/* Price Breakdown Summary */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs flex flex-col gap-2.5 border border-[#e5eeff]">
              <h3 className="text-xs sm:text-sm font-bold text-[#0b1c30] border-b border-[#e5eeff] pb-2">
                Price Breakdown
              </h3>

              <div className="flex justify-between items-center text-xs text-[#565e74]">
                <span>Items Total ({activeItemsCount} items)</span>
                <span className="text-[#0b1c30] font-medium">₹{itemsTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-[#006c49]">
                <span>Retail Discount</span>
                <span className="font-semibold">-₹{retailDiscount.toLocaleString('en-IN')}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between items-center text-xs text-[#006c49]">
                  <span>Store Coupon (DHYANFESTIVE)</span>
                  <span className="font-semibold">-₹1,000</span>
                </div>
              )}

              {hasDamageCover && (
                <div className="flex justify-between items-center text-xs text-[#565e74]">
                  <span>Accidental Damage Cover</span>
                  <span className="text-[#0b1c30] font-medium">+₹2,499</span>
                </div>
              )}

              {hasScreenGuard && (
                <div className="flex justify-between items-center text-xs text-[#565e74]">
                  <span>Lifetime Screen Guard</span>
                  <span className="text-[#0b1c30] font-medium">+₹499</span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-[#565e74]">
                <span>Pickup &amp; In-Store Setup Fee</span>
                <span className="text-[#006c49] font-bold uppercase">FREE</span>
              </div>

              <div className="pt-2.5 border-t border-[#e5eeff] flex justify-between items-center">
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0b1c30]">Total Payable</span>
                  <p className="text-xs text-[#006c49] font-semibold">
                    Total Savings: ₹{totalSavings.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-black text-[#005db3]">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Desktop Proceed to Pay Button (Integrated in Right Summary Column) */}
              <div className="hidden md:block pt-2">
                <button
                  onClick={handleProceedToPay}
                  className="w-full h-12 bg-[#0076df] hover:bg-[#005db3] active:scale-[0.98] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#0076df]/25 transition-all"
                  type="button"
                >
                  <span>Proceed to Pay</span>
                  <ArrowRight size={18} />
                </button>
                <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-[#565e74]">
                  <span className="flex items-center gap-0.5 text-[#006c49]">
                    <Zap size={11} /> UPI / GPay
                  </span>
                  <span>•</span>
                  <span>Credit Cards</span>
                  <span>•</span>
                  <span className="text-[#005db3] font-bold">Pay at Desk #02</span>
                </div>
              </div>
            </div>

            {/* Trust Stamp */}
            <div className="flex items-center justify-center gap-3 py-1 opacity-75">
              <div className="flex items-center gap-1 text-[#717784] text-[11px] font-semibold">
                <ShieldCheck size={14} className="text-[#005db3]" />
                100% Genuine Tech
              </div>
              <span className="text-[#717784]">•</span>
              <div className="flex items-center gap-1 text-[#717784] text-[11px] font-semibold">
                <span>📄</span>
                GST Invoice Provided
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer Payment CTA (Exact Stitch Spec, Contained in Mobile / Small Screens) */}
      <div className="md:hidden sticky bottom-0 inset-x-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl p-2.5 pb-safe z-40 border-t border-[#e5eeff]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-[#0b1c30]">
                ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={() => setShowBreakdownModal(!showBreakdownModal)}
              className="text-[10px] text-[#005db3] font-bold hover:underline flex items-center gap-0.5"
              type="button"
            >
              <span>View detailed breakup</span>
              <ChevronUp size={13} />
            </button>
          </div>

          <button
            onClick={handleProceedToPay}
            className="flex-1 max-w-[220px] h-12 bg-[#0076df] hover:bg-[#005db3] active:scale-[0.98] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#0076df]/25 transition-all"
            type="button"
          >
            <span>Proceed to Pay</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Micro-badges for payments supported */}
        <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-[#565e74]">
          <span className="flex items-center gap-1 text-[#006c49]">
            <Zap size={11} /> UPI / GPay
          </span>
          <span>•</span>
          <span>Credit &amp; Debit Cards</span>
          <span>•</span>
          <span className="text-[#005db3] font-bold">Pay at Store (Cash/UPI)</span>
        </div>
      </div>

      {/* Order Confirmation Modal with Pickup PIN & QR Code */}
      {confirmedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl text-center space-y-4 border border-[#e5eeff]">
            <div className="w-14 h-14 rounded-full bg-[#6ffbbe]/40 text-[#006c49] flex items-center justify-center mx-auto border border-[#6ffbbe]">
              <Check size={30} strokeWidth={3} />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#6ffbbe] text-[#002113] px-2.5 py-0.5 rounded-full">
                READY FOR EXPRESS PICKUP
              </span>
              <h3 className="text-lg font-black text-[#0b1c30] mt-1.5">Order Placed Successfully!</h3>
              <p className="text-xs text-[#565e74] font-mono mt-0.5">
                Order ID: {confirmedOrder.orderId}
              </p>
            </div>

            {/* In-Store Pickup Pass Card */}
            <div className="bg-[#f8f9ff] border-2 border-dashed border-[#0076df] rounded-2xl p-4 text-center">
              <div className="text-[11px] font-extrabold text-[#005db3] uppercase tracking-wider">
                Store Pickup Pass
              </div>
              <div className="text-2xl font-black font-mono tracking-widest text-[#0b1c30] my-2">
                PIN: {confirmedOrder.pickupPin}
              </div>
              <div className="w-32 h-32 bg-white rounded-xl mx-auto p-2 border border-slate-200 flex items-center justify-center shadow-xs">
                <QrCode size={100} className="text-[#0b1c30]" />
              </div>
              <div className="text-[10px] text-[#565e74] mt-2.5 leading-relaxed">
                Show this PIN or QR to Desk #02 at Galaxy Commercial Arcade, Mumbai Central
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  setTab('storefront');
                }}
                className="flex-1 py-3 bg-[#0076df] hover:bg-[#005db3] text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                Done • Back to Store
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
