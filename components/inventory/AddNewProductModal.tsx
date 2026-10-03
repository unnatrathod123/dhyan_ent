'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import { Product, ProductCategory } from '@/lib/types';
import {
  X,
  Plus,
  ScanBarcode,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Check,
  Smartphone,
  Layers,
  HelpCircle,
  Tag
} from 'lucide-react';
import Image from 'next/image';

const PRESET_IMAGES = [
  {
    name: 'S24 Ultra',
    url: '/images/s24_ultra.jpg',
    brand: 'Samsung'
  },
  {
    name: 'iPhone 15 Pro',
    url: '/images/iphone_15_pro.jpg',
    brand: 'Apple'
  },
  {
    name: 'OnePlus 12',
    url: '/images/oneplus_12.jpg',
    brand: 'OnePlus'
  },
  {
    name: 'Redmi Note 13',
    url: '/images/redmi_note_13.jpg',
    brand: 'Xiaomi'
  },
  {
    name: 'Pixel 8 Pro',
    url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    brand: 'Google'
  },
  {
    name: 'Nothing Phone',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    brand: 'Nothing'
  },
  {
    name: 'Wireless Earbuds',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    brand: 'Audio'
  },
  {
    name: 'Fast Charger',
    url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    brand: 'Accessories'
  }
];

export default function AddNewProductModal() {
  const { isAddNewProductOpen, setIsAddNewProductOpen, addNewProduct, showToast } = useStore();

  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('OnePlus');
  const [category, setCategory] = useState<ProductCategory>('smartphones');
  const [retailPrice, setRetailPrice] = useState('34999');
  const [wholesalePrice, setWholesalePrice] = useState('31000');
  const [mrp, setMrp] = useState('39999');
  const [warranty, setWarranty] = useState('1 Year Official Brand Warranty');
  const [description, setDescription] = useState('Certified genuine hardware stock with complete factory accessories and Dhyan warranty coverage.');

  // Image states
  const [imageTab, setImageTab] = useState<'preset' | 'url' | 'upload'>('preset');
  const [imageUrl, setImageUrl] = useState('/images/oneplus_12.jpg');
  const [customUrl, setCustomUrl] = useState('');

  // Specs
  const [processor, setProcessor] = useState('Snapdragon 8s Gen 3 (4nm)');
  const [battery, setBattery] = useState('5500 mAh (100W SuperVOOC)');
  const [camera, setCamera] = useState('50MP Sony LYT-600 OIS + 8MP Wide');
  const [display, setDisplay] = useState('6.74" 1.5K 120Hz AMOLED 2160Hz PWM');

  // Variant & Color
  const [variant, setVariant] = useState('256GB Storage • 12GB RAM');
  const [colorName, setColorName] = useState('Phantom Black');
  const [colorHex, setColorHex] = useState('#18181b');

  // IMEIs
  const [imeisText, setImeisText] = useState(
    '864920068800101\n864920068800102\n864920068800103'
  );

  if (!isAddNewProductOpen) return null;

  // Auto generate 3 random valid IMEI format strings
  const handleGenerateImeis = () => {
    const tac = '86' + Math.floor(100000 + Math.random() * 900000);
    const newImeis = [
      `${tac}${Math.floor(10000 + Math.random() * 90000)}01`,
      `${tac}${Math.floor(10000 + Math.random() * 90000)}02`,
      `${tac}${Math.floor(10000 + Math.random() * 90000)}03`,
      `${tac}${Math.floor(10000 + Math.random() * 90000)}04`,
      `${tac}${Math.floor(10000 + Math.random() * 90000)}05`
    ];
    setImeisText(newImeis.join('\n'));
    showToast('Generated 5 serialized IMEI barcodes!', 'normal');
  };

  // Quick fill sample gadget
  const handleFillSample = () => {
    setTitle('Nothing Phone (2a) Plus 5G');
    setSku('NTH-2AP-256G-GRY');
    setBrand('Nothing');
    setCategory('smartphones');
    setRetailPrice('27999');
    setWholesalePrice('24800');
    setMrp('31999');
    setImageUrl('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80');
    setProcessor('MediaTek Dimensity 7350 Pro 5G (4nm)');
    setBattery('5000 mAh (50W Fast Charging)');
    setCamera('50MP Dual Rear + 50MP Selfie');
    setDisplay('6.7" Flexible AMOLED 120Hz 1300 nits');
    setVariant('256GB Storage • 12GB RAM');
    setColorName('Metallic Gray');
    setColorHex('#4b5563');
    setWarranty('1 Year Nothing Care Warranty');
    setDescription('Unique Glyph Interface, transparent aesthetics, clean Nothing OS 2.6 with zero bloatware.');
    handleGenerateImeis();
    showToast('Loaded Nothing Phone (2a) sample data!', 'success');
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size exceeds 2MB limit', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setImageUrl(event.target.result);
        showToast('Image loaded successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imeisArray = imeisText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const rPrice = parseFloat(retailPrice) || 29999;
    const wPrice = parseFloat(wholesalePrice) || 26500;
    const mPrice = parseFloat(mrp) || 34999;

    const discountPct = Math.max(0, Math.round(((mPrice - rPrice) / mPrice) * 100));

    const newProd: Product = {
      id: 'prod_' + Date.now(),
      sku: sku.trim().toUpperCase() || 'SKU-' + Math.floor(1000 + Math.random() * 9000),
      title: title.trim() || 'New Hardware Device',
      brand,
      category,
      retailPrice: rPrice,
      wholesalePrice: wPrice,
      mrp: mPrice,
      discount: discountPct > 0 ? `-${discountPct}% OFF` : 'Best Deal',
      rating: 4.8,
      reviewsCount: 1,
      stockCount: imeisArray.length > 0 ? imeisArray.length : 5,
      warranty: warranty.trim() || '1 Year Brand Warranty',
      description: description.trim() || 'Brand new certified stock registered via Inventory Manager desk.',
      imageUrl: imageUrl || '/images/oneplus_12.jpg',
      specs: {
        processor: processor.trim() || 'Octa-Core High Performance IC',
        battery: battery.trim() || '5000 mAh Fast Charge',
        camera: camera.trim() || '50MP Ultra High Definition',
        display: display.trim() || '120Hz Pro Display'
      },
      variants: [variant.trim() || '256GB / 12GB'],
      colors: [{ name: colorName.trim() || 'Cosmic Black', hex: colorHex }],
      imeis: imeisArray.length > 0 ? imeisArray : ['86' + Math.floor(1000000000000 + Math.random() * 9000000000000)]
    };

    addNewProduct(newProd);
    setIsAddNewProductOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
      <div
        className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 bg-[#0b1320] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0076df] flex items-center justify-center text-white">
              <ScanBarcode size={18} />
            </div>
            <div>
              <span className="font-extrabold text-sm block leading-tight">Register New Product & SKU</span>
              <span className="text-[10px] text-slate-400">Instantly syncs across Storefront, B2B wholesale, & POS</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleFillSample}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-400 text-[11px] font-bold rounded-lg border border-slate-700 transition"
              title="Populate sample Nothing Phone (2a) data"
            >
              <Sparkles size={13} />
              <span>Sample Demo</span>
            </button>

            <button
              onClick={() => setIsAddNewProductOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[calc(94vh-130px)]">
          {/* Quick Sample Button for Mobile */}
          <div className="sm:hidden flex justify-end">
            <button
              type="button"
              onClick={handleFillSample}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#0076df] text-[11px] font-bold rounded-lg transition"
            >
              <Sparkles size={12} />
              <span>Auto-Fill Demo Product</span>
            </button>
          </div>

          {/* Section 1: Basic Identifiers */}
          <div className="space-y-3 bg-[#f8faff] p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-black text-[#0b1c30] uppercase tracking-wider">
              <Tag size={13} className="text-[#0076df]" />
              <span>1. Basic Identity & Categorization</span>
            </div>

            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. OnePlus 12 5G (Flowy Emerald, 512GB)"
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-[#0076DF] focus:ring-1 focus:ring-[#0076DF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">
                  SKU Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="OP12-512G-GRN"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-mono-tech uppercase outline-none focus:border-[#0076DF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#0076DF]"
                >
                  <option value="OnePlus">OnePlus</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Google">Google</option>
                  <option value="Nothing">Nothing</option>
                  <option value="Realme">Realme</option>
                  <option value="Vivo">Vivo</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#0076DF]"
                >
                  <option value="smartphones">Smartphones (Flash Deals)</option>
                  <option value="chargers">Fast Chargers</option>
                  <option value="audio">Audio & Earbuds</option>
                  <option value="protection">Screen Protection / Cases</option>
                  <option value="accessories">General Accessories</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Product Image & Thumbnail */}
          <div className="space-y-3 bg-[#f8faff] p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-[#0b1c30] uppercase tracking-wider">
                <ImageIcon size={13} className="text-[#0076df]" />
                <span>2. Product Image & Visual Assets</span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold">Live Preview</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              {/* Image Preview Box */}
              <div className="relative w-28 h-28 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    sizes="112px"
                    unoptimized={imageUrl.startsWith('data:')}
                    className="object-cover"
                  />
                ) : (
                  <Smartphone size={32} className="text-slate-300" />
                )}
                <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                  HD
                </span>
              </div>

              {/* Selector Tabs */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setImageTab('preset')}
                    className={`flex-1 py-1 rounded-lg transition ${
                      imageTab === 'preset' ? 'bg-white text-[#0076df] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Catalog Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    className={`flex-1 py-1 rounded-lg transition ${
                      imageTab === 'url' ? 'bg-white text-[#0076df] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    className={`flex-1 py-1 rounded-lg transition ${
                      imageTab === 'upload' ? 'bg-white text-[#0076df] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                {imageTab === 'preset' && (
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => setImageUrl(img.url)}
                        className={`p-1.5 rounded-lg border text-left transition flex flex-col items-center gap-1 ${
                          imageUrl === img.url
                            ? 'border-[#0076df] bg-blue-50/60 ring-1 ring-[#0076df]'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="relative w-8 h-8 rounded-md overflow-hidden bg-slate-100">
                          <Image
                            src={img.url}
                            alt={img.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-[9px] font-bold text-slate-700 truncate w-full text-center">
                          {img.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {imageTab === 'url' && (
                  <div className="flex gap-2 items-center pt-1">
                    <input
                      type="url"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="https://example.com/phone-image.jpg"
                      className="flex-1 bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customUrl) {
                          setImageUrl(customUrl);
                          showToast('Image URL applied!', 'success');
                        }
                      }}
                      className="px-3 py-2 bg-[#0076df] text-white rounded-xl text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {imageTab === 'upload' && (
                  <div className="pt-1">
                    <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-[#0076df] rounded-xl p-3 bg-white cursor-pointer transition text-xs font-bold text-slate-600">
                      <Upload size={16} className="text-[#0076df]" />
                      <span>Choose Photo from Device (JPG/PNG/WEBP)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Wholesale Margin */}
          <div className="space-y-3 bg-[#f8faff] p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-[#0b1c30] uppercase tracking-wider">
                <Layers size={13} className="text-[#0076df]" />
                <span>3. Multi-Channel Pricing (Retail, B2B, MRP)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                Margin Preview
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">
                  Retail Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-mono-tech font-bold outline-none focus:border-[#0076DF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">
                  Wholesale B2B (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-mono-tech font-bold outline-none focus:border-[#0076DF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">
                  MRP (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-mono-tech font-bold outline-none focus:border-[#0076DF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-500">
                Customer Discount:{' '}
                <strong className="text-red-600">
                  {Math.max(0, Math.round(((parseFloat(mrp) - parseFloat(retailPrice)) / parseFloat(mrp)) * 100))}% OFF
                </strong>
              </span>
              <span className="text-slate-500">
                B2B Partner Margin:{' '}
                <strong className="text-emerald-600">
                  ₹{(parseFloat(retailPrice) - parseFloat(wholesalePrice) || 0).toLocaleString('en-IN')} / unit
                </strong>
              </span>
            </div>
          </div>

          {/* Section 4: Specifications & Variants */}
          <div className="space-y-3 bg-[#f8faff] p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-black text-[#0b1c30] uppercase tracking-wider">
              <Smartphone size={13} className="text-[#0076df]" />
              <span>4. Technical Specifications & Color Variant</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Storage & RAM Variant</label>
                <input
                  type="text"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  placeholder="256GB Storage • 12GB RAM"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Color Variant</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    className="w-9 h-9 p-0.5 rounded-xl border border-slate-200 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    placeholder="Cosmic Black"
                    className="flex-1 bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Processor</label>
                <input
                  type="text"
                  value={processor}
                  onChange={(e) => setProcessor(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Battery & Charging</label>
                <input
                  type="text"
                  value={battery}
                  onChange={(e) => setBattery(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Camera Setup</label>
                <input
                  type="text"
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1">Display Quality</label>
                <input
                  type="text"
                  value={display}
                  onChange={(e) => setDisplay(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0076DF]"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Batch Serialized IMEIs */}
          <div className="space-y-3 bg-[#f8faff] p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-[#0b1c30] uppercase tracking-wider">
                <ScanBarcode size={13} className="text-[#0076df]" />
                <span>5. Serialized Barcodes / IMEIs (1 per unit)</span>
              </div>
              <button
                type="button"
                onClick={handleGenerateImeis}
                className="text-[10px] font-bold text-[#0076df] hover:underline"
              >
                + Generate 5 IMEIs
              </button>
            </div>

            <textarea
              rows={3}
              value={imeisText}
              onChange={(e) => setImeisText(e.target.value)}
              placeholder="Paste 15-digit IMEI serial numbers, one per line..."
              className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-mono-tech outline-none focus:border-[#0076DF]"
            />
            <div className="text-[10px] text-slate-500 flex items-center justify-between">
              <span>
                Total Units to Stock:{' '}
                <strong className="text-[#0b1c30]">
                  {imeisText.split('\n').filter((s) => s.trim().length > 0).length} devices
                </strong>
              </span>
              <span>Individual IMEI tracking enabled for POS billing & warranty</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#0076df] to-[#005db3] hover:from-[#0069c7] hover:to-[#004f98] text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Check size={16} />
              <span>Register Product & Put In Stock</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
