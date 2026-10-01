'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { Product, ProductCategory } from '@/lib/types';
import { X, Plus, ScanBarcode } from 'lucide-react';

export default function AddNewProductModal() {
  const { isAddNewProductOpen, setIsAddNewProductOpen, addNewProduct } = useStore();

  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('OnePlus');
  const [category, setCategory] = useState<ProductCategory>('smartphones');
  const [retailPrice, setRetailPrice] = useState('29999');
  const [wholesalePrice, setWholesalePrice] = useState('26500');
  const [mrp, setMrp] = useState('32999');
  const [imeisText, setImeisText] = useState('864920069900101\n864920069900102\n864920069900103');

  if (!isAddNewProductOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imeisArray = imeisText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newProd: Product = {
      id: 'prod_' + Date.now(),
      sku: sku || 'SKU-' + Math.floor(1000 + Math.random() * 9000),
      title: title || 'New Hardware Device',
      brand,
      category,
      retailPrice: parseFloat(retailPrice) || 29999,
      wholesalePrice: parseFloat(wholesalePrice) || 26500,
      mrp: parseFloat(mrp) || 32999,
      discount: '10% OFF',
      rating: 4.8,
      reviewsCount: 1,
      stockCount: imeisArray.length || 5,
      warranty: '1 Year Brand Warranty',
      description: 'Brand new certified stock registered via Inventory Manager desk.',
      specs: {
        processor: 'Octa-Core High Performance IC',
        battery: '5000 mAh Fast Charge',
        camera: '50MP Ultra High Definition',
        display: '120Hz Pro Display'
      },
      variants: ['128GB / 8GB', '256GB / 12GB'],
      colors: [{ name: 'Cosmic Black', hex: '#18181b' }],
      imeis: imeisArray
    };

    addNewProduct(newProd);
    setIsAddNewProductOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanBarcode size={20} className="text-[#0076DF]" />
            <span className="font-extrabold text-sm">Add New Product & SKU Stock</span>
          </div>
          <button
            onClick={() => setIsAddNewProductOpen(false)}
            className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3 overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1">Product Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. OnePlus Nord CE 4 5G (Dark Chrome)"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1">SKU Code</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="OP-CE4-256G"
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-mono-tech outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none"
              >
                <option value="OnePlus">OnePlus</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Nothing">Nothing</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1">Retail Price (₹)</label>
              <input
                type="number"
                required
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-xs font-mono-tech outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1">Wholesale (₹)</label>
              <input
                type="number"
                required
                value={wholesalePrice}
                onChange={(e) => setWholesalePrice(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-xs font-mono-tech outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1">MRP (₹)</label>
              <input
                type="number"
                required
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-xs font-mono-tech outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1">
              Batch IMEI Numbers (1 per line)
            </label>
            <textarea
              rows={4}
              value={imeisText}
              onChange={(e) => setImeisText(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-mono-tech outline-none focus:border-[#0076DF]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#0076DF] hover:bg-[#005DB3] text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Register SKU & Stock Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
