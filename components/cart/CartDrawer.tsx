'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { X, Plus, Minus, Trash2, MapPin, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import OrderConfirmationModal from '../orders/OrderConfirmationModal';
import { Order } from '@/lib/types';

export default function CartDrawer() {
  const {
    cart,
    products,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    clearCart,
    currentRole,
    createOrder
  } = useStore();

  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('pickup');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCartOpen) return null;

  const isB2B = currentRole === 'b2b';

  // Calculate bill totals
  let subtotal = 0;
  const detailedItems = cart.map((c) => {
    const p = products.find((prod) => prod.id === c.productId);
    const unitPrice = p ? (isB2B ? p.wholesalePrice : p.retailPrice) : 0;
    const itemTotal = unitPrice * c.qty;
    subtotal += itemTotal;
    return {
      ...c,
      product: p,
      unitPrice,
      itemTotal
    };
  });

  const gst = Math.round(subtotal * 0.18);
  const deliveryFee = deliveryMode === 'delivery' ? 149 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    const order = createOrder(deliveryMode);
    if (order) {
      setConfirmedOrder(order);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
        <div
          className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative pt-3 pb-3 px-4 flex items-center justify-between border-b border-[#F1F5F9] shrink-0">
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 sm:hidden"></div>
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#0076DF]" />
              <span className="font-extrabold text-sm sm:text-base text-[#0F172A]">
                Your Order Bag ({cart.length})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Fulfillment Mode Switcher Tabs */}
          <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] shrink-0">
            <div className="grid grid-cols-2 p-1 bg-slate-200/80 rounded-xl gap-1">
              <button
                onClick={() => setDeliveryMode('pickup')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition ${
                  deliveryMode === 'pickup'
                    ? 'bg-white text-[#0076DF] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin size={14} />
                <span>Counter Pickup (15m)</span>
              </button>

              <button
                onClick={() => setDeliveryMode('delivery')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition ${
                  deliveryMode === 'delivery'
                    ? 'bg-white text-[#0076DF] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Truck size={14} />
                <span>Doorstep Express</span>
              </button>
            </div>

            {/* Selected Fulfillment Hub Banner */}
            <div className="mt-2.5 p-2.5 rounded-xl bg-blue-50 border border-blue-200/60 flex items-start gap-2.5">
              <span className="text-base">📍</span>
              <div className="text-xs">
                <div className="font-bold text-[#0F172A]">Station Road Flagship Desk #02</div>
                <div className="text-[11px] text-[#64748B]">
                  {deliveryMode === 'pickup'
                    ? 'Guaranteed ready in 15 mins. Secret 4-digit pickup PIN provided upon booking.'
                    : 'Dispatched via express store courier within 2-4 hours.'}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3">
            {cart.length === 0 ? (
              /* Empty Cart State (Stitch Screen 6b1a17f3) */
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingBag size={30} />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">Your Bag is Currently Empty</h3>
                <p className="text-xs text-[#64748B] mt-1 max-w-xs">
                  Discover flagship smartphones, GaN fast chargers, and accessories available at our Station Road desk.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 bg-[#0076DF] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              detailedItems.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.variant}-${item.color}`}
                  className="p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-[#0076DF] uppercase">
                      {item.product?.brand || 'Electronics'}
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                      {item.product?.title || 'Electronics Item'}
                    </div>
                    <div className="text-[11px] text-[#64748B] font-mono-tech mt-0.5">
                      {item.variant} • {item.color}
                    </div>
                    <div className="text-xs font-extrabold text-[#0F172A] font-mono-tech mt-1">
                      {formatCurrency(item.unitPrice)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden bg-[#F8FAFC]">
                      <button
                        onClick={() => updateCartQty(item.productId, item.variant, item.color, -1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono-tech">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.productId, item.variant, item.color, 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId, item.variant, item.color)}
                      className="text-red-500 hover:text-red-700 p-1 transition"
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Bill Summary Breakdown */}
            {cart.length > 0 && (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="font-bold text-[#0F172A] text-xs uppercase tracking-wider mb-1">
                  Tax Invoice Breakdown
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Items Subtotal</span>
                  <span className="font-mono-tech font-semibold text-[#0F172A]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Estimated GST (18% Included)</span>
                  <span className="font-mono-tech font-semibold text-[#0F172A]">{formatCurrency(gst)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Delivery Charges</span>
                  <span className="font-mono-tech font-semibold text-emerald-600">
                    {deliveryFee === 0 ? 'FREE (Counter Pickup)' : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E2E8F0] flex justify-between font-extrabold text-[#0F172A] text-sm">
                  <span>Grand Total</span>
                  <span className="text-base text-[#0076DF] font-mono-tech">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E2E8F0] shrink-0">
              <button
                onClick={handleCheckout}
                className="w-full h-[52px] rounded-xl bg-[#0076DF] hover:bg-[#005DB3] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] transition"
              >
                <span>Proceed to {deliveryMode === 'pickup' ? 'Counter Pickup' : 'Express Delivery'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Confirmation Modal after checkout */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}
    </>
  );
}
