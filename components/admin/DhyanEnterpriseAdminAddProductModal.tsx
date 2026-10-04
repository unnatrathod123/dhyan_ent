'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import { Product, ProductCategory, VolumeTier, ProductColor } from '@/lib/types';
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  DollarSign,
  Tag,
  Building2,
  Package,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Check,
  Lock,
  AlertCircle
} from 'lucide-react';

const PRESET_HARDWARE_COLORS: ProductColor[] = [
  { name: 'Obsidian Black', hex: '#18181b' },
  { name: 'Ceramic White', hex: '#ffffff' },
  { name: 'Titanium Gray', hex: '#64748b' },
  { name: 'Natural Titanium', hex: '#94a3b8' },
  { name: 'Glacier Blue', hex: '#3b82f6' },
  { name: 'Emerald Green', hex: '#10b981' },
  { name: 'Deep Violet', hex: '#7c3aed' },
  { name: 'Desert Gold', hex: '#eab308' },
  { name: 'Crimson Red', hex: '#ef4444' },
  { name: 'Rose Gold', hex: '#f43f5e' },
  { name: 'Deep Navy', hex: '#1e3a8a' },
  { name: 'Space Gray', hex: '#374151' }
];

const PRESET_STUDIO_IMAGES = [
  { name: 'iPhone 15 Pro', url: '/images/iphone_15_pro.jpg', brand: 'Apple' },
  { name: 'Galaxy S24 Ultra', url: '/images/s24_ultra.jpg', brand: 'Samsung' },
  { name: 'OnePlus 12 5G', url: '/images/oneplus_12.jpg', brand: 'OnePlus' },
  { name: 'Nothing Phone 2a', url: '/images/nothing_phone_2a.jpg', brand: 'Nothing' },
  { name: 'Redmi Note 13', url: '/images/redmi_note_13.jpg', brand: 'Xiaomi' },
  { name: 'AirPods Pro 2', url: '/images/airpods_pro_2.jpg', brand: 'Apple' },
  { name: 'SwiftPort GaN', url: '/images/swiftport_charger.jpg', brand: 'Dhyan Enterprise' },
  { name: 'CMF 65W GaN', url: '/images/cmf_gan_charger.jpg', brand: 'Nothing' },
  { name: 'DuraLink Cable', url: '/images/duralink_cable.jpg', brand: 'Anker' },
  { name: 'Belkin Flex Cable', url: '/images/belkin_braided_cable.jpg', brand: 'Belkin' },
  { name: 'MagBoost PowerBank', url: '/images/magboost_powerbank.jpg', brand: 'Belkin' },
  { name: 'Galaxy S24 Screen', url: '/images/galaxy_screen_assembly.jpg', brand: 'Samsung' },
  { name: 'iPhone Screen Module', url: '/images/screen_assembly.jpg', brand: 'Apple' },
  { name: 'OEM Battery Pack', url: '/images/oem_battery_pack.jpg', brand: 'Dhyan Enterprise' }
];

export default function DhyanEnterpriseAdminAddProductModal() {
  const {
    isAddNewProductOpen,
    setIsAddNewProductOpen,
    addNewProduct,
    currentUser,
    loginUser,
    showToast
  } = useStore();

  // Basic Information
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [category, setCategory] = useState<ProductCategory>('phones');
  const [subtitle, setSubtitle] = useState('');
  const [sku, setSku] = useState('');

  // Dual Currency Pricing
  const [retailUSD, setRetailUSD] = useState('199.00');
  const [retailINR, setRetailINR] = useState('16999');
  const [wholesaleUSD, setWholesaleUSD] = useState('139.00');
  const [wholesaleINR, setWholesaleINR] = useState('11999');
  const [mrpINR, setMrpINR] = useState('21999');

  // Wholesale Settings
  const [moq, setMoq] = useState('5');
  const [stockCount, setStockCount] = useState('50');
  const [warranty, setWarranty] = useState('1 Year Official Brand Warranty');
  const [description, setDescription] = useState('Verified genuine hardware inventory with factory quality seal and immediate dispatch readiness.');

  // Volume Tiers
  const [volumeTiers, setVolumeTiers] = useState<VolumeTier[]>([
    { minQty: 5, maxQty: 19, priceUSD: 139.0, priceINR: 11999 },
    { minQty: 20, maxQty: 49, priceUSD: 125.0, priceINR: 10499 },
    { minQty: 50, priceUSD: 112.0, priceINR: 9499 }
  ]);

  // Image Selection
  const [selectedImage, setSelectedImage] = useState('/images/iphone_15_pro.jpg');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Specs
  const [specProcessor, setSpecProcessor] = useState('');
  const [specBattery, setSpecBattery] = useState('');
  const [specCamera, setSpecCamera] = useState('');
  const [specDisplay, setSpecDisplay] = useState('');
  const [specPower, setSpecPower] = useState('');
  const [specMaterial, setSpecMaterial] = useState('');

  // Variants & Multiple Colors
  const [variantsText, setVariantsText] = useState('128GB Storage, 256GB Storage');
  const [colors, setColors] = useState<ProductColor[]>([
    { name: 'Space Black', hex: '#18181b' },
    { name: 'Natural Titanium', hex: '#94a3b8' }
  ]);
  const [customColorName, setCustomColorName] = useState('');
  const [customColorHex, setCustomColorHex] = useState('#2563eb');

  if (!isAddNewProductOpen) return null;

  // Strict Admin Role Guard: Non-admin users cannot access the Add Product Modal
  if (currentUser?.role !== 'admin') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
        <div
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock size={28} />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              <AlertCircle size={12} />
              <span>Admin Authorization Required</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Restricted to Administrators
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Adding new products, configuring wholesale dealer discounts, and managing stock counts are strictly restricted to verified Dhyan Enterprise store administrators.
            </p>
          </div>

          {currentUser && (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              Signed in as: <strong className="text-slate-900">{currentUser.fullName}</strong>
              <span className="block text-[11px] text-slate-400 mt-0.5">
                Role: {currentUser.role === 'b2b' ? 'Wholesale Dealer' : 'Personal Shopper'} (Insufficient Permissions)
              </span>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => {
                loginUser('admin@dhyanenterprise.com', 'admin');
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-98 flex items-center justify-center gap-1.5"
            >
              <ShieldCheck size={14} />
              <span>Log in as Admin</span>
            </button>
            <button
              onClick={() => setIsAddNewProductOpen(false)}
              className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Auto-sync INR when USD changes if user wants convenience
  const handleUSDChange = (val: string) => {
    setRetailUSD(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setRetailINR(Math.round(num * 83).toString());
      setWholesaleUSD((num * 0.72).toFixed(2));
      setWholesaleINR(Math.round(num * 0.72 * 83).toString());
      setMrpINR(Math.round(num * 83 * 1.25).toString());
    }
  };

  // Generate suggested SKU
  const handleGenerateSKU = () => {
    const bCode = brand.slice(0, 3).toUpperCase();
    const cCode = category.slice(0, 3).toUpperCase();
    const rand = Math.floor(100 + Math.random() * 900);
    setSku(`${bCode}-${cCode}-${rand}`);
  };

  // Color Handlers
  const handleAddPresetColor = (preset: ProductColor) => {
    if (colors.some((c) => c.name.toLowerCase() === preset.name.toLowerCase())) {
      showToast(`Color "${preset.name}" is already added!`, 'normal');
      return;
    }
    setColors((prev) => [...prev, preset]);
    showToast(`Added ${preset.name} color option`, 'success');
  };

  const handleAddCustomColor = () => {
    if (!customColorName.trim()) {
      showToast('Please enter a color name (e.g. "Phantom Silver")', 'warning');
      return;
    }
    const colorObj: ProductColor = {
      name: customColorName.trim(),
      hex: customColorHex.trim() || '#2563eb'
    };
    if (colors.some((c) => c.name.toLowerCase() === colorObj.name.toLowerCase())) {
      showToast(`Color "${colorObj.name}" is already in the list`, 'warning');
      return;
    }
    setColors((prev) => [...prev, colorObj]);
    setCustomColorName('');
    showToast(`Added custom color "${colorObj.name}"`, 'success');
  };

  const handleRemoveColor = (indexToRemove: number) => {
    if (colors.length <= 1) {
      showToast('Products should ideally have at least 1 color option', 'warning');
    }
    setColors((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentUser?.role !== 'admin') {
      showToast('Restricted: Administrator access required to add products', 'error');
      setIsAddNewProductOpen(false);
      return;
    }

    if (!title.trim()) {
      showToast('Please enter a product title', 'error');
      return;
    }

    if (colors.length === 0) {
      showToast('Please add at least one color option for this product', 'error');
      return;
    }

    const finalSku = sku.trim() || `${brand.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const retUSD = parseFloat(retailUSD) || 99.99;
    const retINR = parseInt(retailINR) || Math.round(retUSD * 83);
    const wsUSD = parseFloat(wholesaleUSD) || Math.round(retUSD * 0.75);
    const wsINR = parseInt(wholesaleINR) || Math.round(wsUSD * 83);
    const mrp = parseInt(mrpINR) || Math.round(retINR * 1.25);
    const discountPct = mrp > retINR ? `-${Math.round(((mrp - retINR) / mrp) * 100)}% OFF` : '-15% OFF';

    const variantsArray = variantsText.split(',').map((s) => s.trim()).filter(Boolean);

    const newProduct: Product = {
      id: 'prod_' + Date.now(),
      sku: finalSku,
      title: title.trim(),
      brand,
      category,
      subtitle: subtitle.trim() || brand,
      retailPrice: retINR,
      wholesalePrice: wsINR,
      retailPriceUSD: retUSD,
      wholesalePriceUSD: wsUSD,
      mrp,
      discount: discountPct,
      rating: 4.8,
      reviewsCount: 1,
      stockCount: parseInt(stockCount) || 20,
      warranty: warranty.trim() || '1 Year Brand Warranty',
      description: description.trim(),
      imageUrl: customImageUrl.trim() || selectedImage,
      specs: {
        processor: specProcessor.trim() || undefined,
        battery: specBattery.trim() || undefined,
        camera: specCamera.trim() || undefined,
        display: specDisplay.trim() || undefined,
        powerOutput: specPower.trim() || undefined,
        material: specMaterial.trim() || undefined,
        warrantyPeriod: warranty.trim() || '12 Months'
      },
      variants: variantsArray.length > 0 ? variantsArray : ['Standard'],
      colors: colors.length > 0 ? colors : [{ name: 'Standard', hex: '#2563eb' }],
      imeis: [],
      moq: parseInt(moq) || 5,
      volumeTiers
    };

    addNewProduct(newProduct);
    setIsAddNewProductOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563eb] flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Admin: Add New Product to Catalog
              </h2>
              <p className="text-xs text-slate-500">
                Publish to both B2C Retail Marketplace and B2B Wholesale Quick-Order Hub
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddNewProductOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {/* Section 1: Basic Product Information */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
              <Tag size={14} className="text-blue-600" />
              <span>1. Basic Product Identity</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Google Pixel 9 Pro 5G"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand *
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] bg-white"
                >
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Nothing">Nothing</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Anker">Anker</option>
                  <option value="Belkin">Belkin</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Dhyan Enterprise">Dhyan Enterprise</option>
                  <option value="Google">Google</option>
                  <option value="Sony">Sony</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] bg-white capitalize"
                >
                  <option value="phones">Smartphones & Flagships</option>
                  <option value="cables">Braided Cables & Adapters</option>
                  <option value="chargers">GaN Fast Chargers</option>
                  <option value="spare_parts">OEM Spare Parts & Screens</option>
                  <option value="accessories">Accessories & Audio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subtitle / Edition
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Obsidian • 256GB"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">SKU Code</label>
                  <button
                    type="button"
                    onClick={handleGenerateSKU}
                    className="text-[10px] text-blue-600 font-semibold hover:underline"
                  >
                    Auto Generate
                  </button>
                </div>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value.toUpperCase())}
                  placeholder="e.g. GOOG-P9P-256"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono uppercase focus:outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Dual Currency Pricing & Wholesale Tiers */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
              <DollarSign size={14} className="text-emerald-600" />
              <span>2. Dual Currency Pricing & Wholesale Margins</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Retail B2C ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={retailUSD}
                    onChange={(e) => handleUSDChange(e.target.value)}
                    className="w-full text-sm pl-7 pr-3 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Retail B2C (₹ INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    value={retailINR}
                    onChange={(e) => setRetailINR(e.target.value)}
                    className="w-full text-sm pl-7 pr-3 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#2563eb] mb-1">
                  Wholesale B2B ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-blue-500 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={wholesaleUSD}
                    onChange={(e) => setWholesaleUSD(e.target.value)}
                    className="w-full text-sm pl-7 pr-3 py-2 rounded-xl border border-blue-200 bg-blue-50/50 font-mono font-bold text-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#2563eb] mb-1">
                  Wholesale B2B (₹ INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-blue-500 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    value={wholesaleINR}
                    onChange={(e) => setWholesaleINR(e.target.value)}
                    className="w-full text-sm pl-7 pr-3 py-2 rounded-xl border border-blue-200 bg-blue-50/50 font-mono font-bold text-blue-900"
                  />
                </div>
              </div>
            </div>

            {/* B2B Wholesale Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  B2B Minimum Order Qty (MOQ)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Initial Inventory Stock
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Warranty Coverage
                </label>
                <input
                  type="text"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Studio Product Image Picker */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Layers size={14} className="text-blue-600" />
                <span>3. Product Image Asset</span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal">Choose preset or custom URL</span>
            </div>

            {/* Image Preview & Preset Carousel */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 max-h-36 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50/50">
              {PRESET_STUDIO_IMAGES.map((img) => {
                const isSelected = selectedImage === img.url && !customImageUrl;
                return (
                  <div
                    key={img.url}
                    onClick={() => {
                      setSelectedImage(img.url);
                      setCustomImageUrl('');
                    }}
                    className={`cursor-pointer rounded-xl p-1 bg-white border-2 flex flex-col items-center transition relative ${
                      isSelected
                        ? 'border-[#2563eb] ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={img.url}
                        alt={img.name}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[9px] font-semibold text-slate-700 text-center truncate w-full mt-1">
                      {img.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Or Custom Image URL
              </label>
              <input
                type="text"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://example.com/product-image.jpg"
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>
          </div>

          {/* Section 4: Product Color Options (Multiple Colors Support) */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Palette size={14} className="text-[#2563eb]" />
                <span>4. Product Color Options & Finishes</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {colors.length} {colors.length === 1 ? 'Color' : 'Colors'} Configured
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Add multiple hardware colors for this product. Customers can select their preferred finish on both the retail storefront and the B2B wholesale order sheet.
            </p>

            {/* Active Colors Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Active Color Options ({colors.length})
              </label>
              {colors.length === 0 ? (
                <div className="p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-xs text-amber-700">
                  No colors added yet. Please click a preset below or type a custom color to add.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {colors.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-xl border border-slate-200 bg-white shadow-2xs text-xs font-medium text-slate-800 animate-in fade-in"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{c.hex}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition"
                        title={`Remove ${c.name}`}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 1-Click Popular Preset Palette */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Quick-Add Popular Electronics Finishes:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_HARDWARE_COLORS.map((preset) => {
                  const isAdded = colors.some((c) => c.name.toLowerCase() === preset.name.toLowerCase());
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleAddPresetColor(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                        isAdded
                          ? 'bg-slate-100 border-slate-300 text-slate-400 cursor-default'
                          : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-slate-700'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span>{preset.name}</span>
                      {isAdded ? (
                        <Check size={11} className="text-emerald-600" />
                      ) : (
                        <Plus size={11} className="text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Input Form */}
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="text-xs font-semibold text-slate-800">
                Or Add Custom Finish / Color:
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={customColorName}
                    onChange={(e) => setCustomColorName(e.target.value)}
                    placeholder="e.g. Cosmic Orange, Desert Sand, Alpine Blue"
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#2563eb]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomColor();
                      }
                    }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                    <input
                      type="color"
                      value={customColorHex}
                      onChange={(e) => setCustomColorHex(e.target.value)}
                      className="w-6 h-6 rounded border-0 cursor-pointer p-0 bg-transparent"
                      title="Pick exact hex color"
                    />
                    <input
                      type="text"
                      value={customColorHex}
                      onChange={(e) => setCustomColorHex(e.target.value)}
                      className="w-18 text-xs font-mono text-slate-700 focus:outline-none uppercase"
                      placeholder="#HEX"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCustomColor}
                    className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
                  >
                    <Plus size={14} />
                    <span>Add Color</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Specifications */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
              <Cpu size={14} className="text-indigo-600" />
              <span>5. Hardware Specifications & Highlights</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Processor / Chipset</label>
                <input
                  type="text"
                  value={specProcessor}
                  onChange={(e) => setSpecProcessor(e.target.value)}
                  placeholder="e.g. Snapdragon 8 Gen 3 (4nm)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Battery & Charging</label>
                <input
                  type="text"
                  value={specBattery}
                  onChange={(e) => setSpecBattery(e.target.value)}
                  placeholder="e.g. 5000 mAh (45W Super Fast)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Display Specification</label>
                <input
                  type="text"
                  value={specDisplay}
                  onChange={(e) => setSpecDisplay(e.target.value)}
                  placeholder="e.g. 6.7” 120Hz LTPO AMOLED 2000 nits"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Camera Module</label>
                <input
                  type="text"
                  value={specCamera}
                  onChange={(e) => setSpecCamera(e.target.value)}
                  placeholder="e.g. 50MP OIS + 48MP Telephoto"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddNewProductOpen(false)}
              className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/15 flex items-center gap-2 active:scale-98 transition"
            >
              <Plus size={16} />
              <span>Publish Product to Marketplace & Wholesale</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
