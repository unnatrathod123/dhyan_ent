'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/StoreContext';
import {
  X,
  User,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Briefcase,
  FileText,
  MapPin,
  ArrowRight,
  Sparkles,
  Clock,
  Info
} from 'lucide-react';

export default function TechHubAuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    pendingCartItem,
    products,
    registerUser,
    loginUser
  } = useStore();

  // Active persona selection in register mode: 'b2c' | 'b2b'
  const [selectedPersona, setSelectedPersona] = useState<'b2c' | 'b2b'>('b2c');

  // Form Fields
  const [fullName, setFullName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [password, setPassword] = useState('TechHubSecure2026!');

  // B2B specific fields
  const [businessName, setBusinessName] = useState('Apex Mobile Solutions & Repair LLC');
  const [gstin, setGstin] = useState('24AAACD1234F1Z5');
  const [businessType, setBusinessType] = useState<'retailer' | 'repair_shop' | 'wholesaler' | 'corporate'>('repair_shop');
  const [address, setAddress] = useState('45 Tech Park Avenue, Suite 102');
  const [city, setCity] = useState('New York');
  const [pincode, setPincode] = useState('10001');

  // Login form field
  const [loginIdentifier, setLoginIdentifier] = useState('');

  if (!isAuthModalOpen) return null;

  // Find pending product name if any
  const pendingProduct = pendingCartItem
    ? products.find((p) => p.id === pendingCartItem.productId)
    : null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      fullName,
      email,
      phone,
      role: selectedPersona,
      businessName: selectedPersona === 'b2b' ? businessName : undefined,
      gstin: selectedPersona === 'b2b' ? gstin : undefined,
      businessType: selectedPersona === 'b2b' ? businessType : undefined,
      address: selectedPersona === 'b2b' ? address : undefined,
      city: selectedPersona === 'b2b' ? city : undefined,
      pincode: selectedPersona === 'b2b' ? pincode : undefined
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(loginIdentifier || 'shopper@techhub.me', selectedPersona);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {authModalTab === 'register' ? 'Join TechHub' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-500">
              {authModalTab === 'register'
                ? 'Select your account type to continue shopping'
                : 'Sign in to access your personal or wholesale account'}
            </p>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Pending Product Notice if triggered by Add to Cart */}
        {pendingProduct && (
          <div className="bg-blue-50/90 border-b border-blue-100 px-6 py-2.5 flex items-center gap-3 text-xs text-blue-900">
            <Sparkles size={16} className="text-[#2563eb] shrink-0" />
            <div className="flex-1">
              <span>Adding <strong>{pendingProduct.title}</strong> to your cart. Please create an account or sign in to complete.</span>
            </div>
          </div>
        )}

        {/* Tab Switcher: Register vs Login */}
        <div className="flex border-b border-slate-100 bg-slate-50/30">
          <button
            onClick={() => setAuthModalTab('register')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition ${
              authModalTab === 'register'
                ? 'border-[#2563eb] text-[#2563eb] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create New Account
          </button>
          <button
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition ${
              authModalTab === 'login'
                ? 'border-[#2563eb] text-[#2563eb] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In Existing Account
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {authModalTab === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              {/* Step 1: Customer Type Selector (B2C vs B2B) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Customer Account Type
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: B2C Direct Consumer */}
                  <div
                    onClick={() => setSelectedPersona('b2c')}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between relative ${
                      selectedPersona === 'b2c'
                        ? 'border-[#2563eb] bg-blue-50/40 shadow-xs ring-1 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {selectedPersona === 'b2c' && (
                      <div className="absolute top-3 right-3 text-[#2563eb]">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563eb] flex items-center justify-center mb-2.5">
                        <User size={18} />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Personal Shopper</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        For individual users buying devices, chargers, and accessories for personal use.
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100/80 text-[10px] text-slate-600 font-medium space-y-0.5">
                      <div>✓ Single unit purchasing</div>
                      <div>✓ 1-Year brand warranty</div>
                      <div>✓ Instant card / UPI checkout</div>
                    </div>
                  </div>

                  {/* Option 2: B2B Wholesale Dealer */}
                  <div
                    onClick={() => setSelectedPersona('b2b')}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between relative ${
                      selectedPersona === 'b2b'
                        ? 'border-[#2563eb] bg-blue-50/40 shadow-xs ring-1 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {selectedPersona === 'b2b' && (
                      <div className="absolute top-3 right-3 text-[#2563eb]">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5">
                        <Building2 size={18} />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Wholesale Dealer</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        For mobile shops, repair technicians, and bulk business buyers.
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100/80 text-[10px] text-slate-600 font-medium space-y-0.5">
                      <div>✓ Tiered volume bulk discounts</div>
                      <div>✓ Khata / Net-30 credit line</div>
                      <div>✓ GST input tax credit invoices</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* B2B Option B Manual Verification Banner */}
              {selectedPersona === 'b2b' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                  <Clock size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">Manual Admin Approval Required (Option B)</p>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Your business registration will be submitted for compliance verification. Once submitted, you can instantly test approved wholesale tiered pricing using the simulation toggle.
                    </p>
                  </div>
                </div>
              )}

              {/* Common Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {selectedPersona === 'b2b' ? 'Authorized Contact Full Name' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                    placeholder="e.g. Alex Johnson"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Additional B2B Business Verification Fields */}
                {selectedPersona === 'b2b' && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Business / Store Name
                        </label>
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                          placeholder="e.g. Apex Electronics Ltd"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          GSTIN / Business Tax ID
                        </label>
                        <input
                          type="text"
                          required
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value.toUpperCase())}
                          className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 font-mono uppercase"
                          placeholder="24AAACD1234F1Z5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Business Type
                        </label>
                        <select
                          value={businessType}
                          onChange={(e: any) => setBusinessType(e.target.value)}
                          className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 bg-white"
                        >
                          <option value="retailer">Mobile & Tech Retail Store</option>
                          <option value="repair_shop">Repair & Spare Parts Center</option>
                          <option value="wholesaler">Regional Distributor / Wholesaler</option>
                          <option value="corporate">Corporate Enterprise Buyer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                          placeholder="New York / Mumbai"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm py-3.5 rounded-xl shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {selectedPersona === 'b2b'
                    ? 'Submit Wholesale Dealer Registration'
                    : pendingProduct
                    ? 'Complete Account & Add Item to Cart'
                    : 'Create Personal Account'}
                </span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* Sign In Tab */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email or Registered Phone
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                  placeholder="name@example.com or 9876543210"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  defaultValue="Password123"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                  placeholder="••••••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm py-3.5 rounded-xl shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to TechHub</span>
                <ArrowRight size={16} />
              </button>

              {/* Fast 1-Click Simulation Buttons for testing */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Demo Accounts:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => loginUser('consumer@techhub.me', 'b2c')}
                    className="p-2.5 text-left border border-slate-200 rounded-xl hover:bg-slate-50 transition text-xs flex items-center gap-2"
                  >
                    <User size={15} className="text-blue-600" />
                    <div>
                      <div className="font-semibold text-slate-800">B2C Personal</div>
                      <div className="text-[10px] text-slate-400">Retail single unit</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginUser('dealer@techhub.me', 'b2b')}
                    className="p-2.5 text-left border border-blue-200 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition text-xs flex items-center gap-2"
                  >
                    <Building2 size={15} className="text-[#2563eb]" />
                    <div>
                      <div className="font-semibold text-blue-900">B2B Wholesale</div>
                      <div className="text-[10px] text-blue-700">Verified bulk tiers</div>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
