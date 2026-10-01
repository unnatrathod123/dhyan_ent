'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/StoreContext';
import {
  X,
  HelpCircle,
  CheckCircle2,
  Store,
  User,
  ShieldCheck,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Receipt,
  Check,
  Shield,
  Phone,
  Building2,
  ArrowRight
} from 'lucide-react';

export default function StitchCreateAccountView() {
  const {
    setIsCreateAccountOpen,
    setRole,
    setTab,
    showToast
  } = useStore();

  // Role: Personal Shopper vs Retail Partner B2B
  const [accountType, setAccountType] = useState<'b2c' | 'b2b'>('b2b');

  // Form Fields
  const [fullName, setFullName] = useState('Ramesh Electronics / Amit Patel');
  const [mobileNumber, setMobileNumber] = useState('98765 43210');
  const [email, setEmail] = useState('partner@enterprise.com');
  const [password, setPassword] = useState('DhyanSecure@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [whatsAppUpdates, setWhatsAppUpdates] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // OTP Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['4', '9', '2', '8', '1', '0']);
  const [otpTimer, setOtpTimer] = useState(28);

  // Password Security Calculations
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const securityScore =
    (hasMinLength ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);

  const getSecurityLabel = () => {
    if (password.length === 0) return 'Waiting for input';
    if (securityScore === 1) return 'Weak';
    if (securityScore === 2) return 'Medium';
    return 'Rock Solid 🔒';
  };

  const handleClose = () => {
    setIsCreateAccountOpen(false);
  };

  const handleGetOtp = () => {
    if (!mobileNumber || mobileNumber.replace(/\s+/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setIsOtpModalOpen(true);
    showToast(`SMS OTP sent to +91 ${mobileNumber}`, 'success');
  };

  const handleCompleteRegistration = () => {
    if (!agreeTerms) {
      showToast('Please agree to Terms of Service & Privacy Policy', 'warning');
      return;
    }

    // Set role in global context
    setRole(accountType);

    // Close registration modal & OTP modal
    setIsOtpModalOpen(false);
    setIsCreateAccountOpen(false);

    // Navigate to appropriate landing page
    if (accountType === 'b2b') {
      setTab('b2b');
      showToast(
        'B2B Retail Partner Account Verified! Welcome to Dhyan Wholesale Hub.',
        'success'
      );
    } else {
      setTab('storefront');
      showToast(
        'Account Created Successfully! Welcome to Dhyan Enterprise.',
        'success'
      );
    }
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] h-full flex flex-col overflow-hidden font-sans">
      {/* 1. TOP APP BAR (Stitch Exact) */}
      <div className="bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e5eeff] shrink-0 z-30 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#414753] hover:text-[#0b1c30] hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div>
            <div className="font-extrabold text-sm text-[#0b1c30] tracking-tight">
              Dhyan Enterprise
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {accountType === 'b2b' ? 'Partner Registration' : 'Customer Registration'}
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            showToast('Dhyan Enterprise Registration Desk: +91 98200 12345', 'normal')
          }
          className="text-[#414753] hover:text-[#0076df] p-1.5 transition cursor-pointer"
          title="Registration Help & Guidelines"
        >
          <HelpCircle size={20} />
        </button>
      </div>

      {/* 2. SCROLLABLE REGISTRATION FORM */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6">
          {/* Hero Branding & Logo */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative h-12 w-44">
              <Image
                src="/Dhyan_Logo.png"
                alt="Dhyan Enterprise"
                fill
                sizes="176px"
                priority
                className="object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#ecfdf5] border border-emerald-200 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              <CheckCircle2 size={12} className="text-emerald-600" />
              <span>AUTHORIZED TECH DISTRIBUTOR</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0b1c30] tracking-tight mt-1">
              Create Your Account
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Unlock exclusive smartphone deals, wholesale pricing & fast pickup across our retail hub.
            </p>
          </div>

          {/* Role Switcher: Personal Shopper vs Retail Partner B2B */}
          <div className="bg-[#eff4ff] p-1.5 rounded-2xl flex items-center gap-1.5 border border-[#d5e3ff]">
            <button
              type="button"
              onClick={() => {
                setAccountType('b2c');
                setFullName('Aarav Patel');
                setEmail('aarav.patel@gmail.com');
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                accountType === 'b2c'
                  ? 'bg-[#0076df] text-white shadow-sm'
                  : 'text-[#414753] hover:text-[#0b1c30] hover:bg-white/50'
              }`}
            >
              <User size={15} />
              <span>Personal Shopper</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAccountType('b2b');
                setFullName('Ramesh Electronics / Amit Patel');
                setEmail('partner@enterprise.com');
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                accountType === 'b2b'
                  ? 'bg-[#0076df] text-white shadow-sm'
                  : 'text-[#414753] hover:text-[#0b1c30] hover:bg-white/50'
              }`}
            >
              <Store size={15} />
              <span>Retail Partner</span>
              <span className="bg-[#10b981] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wide">
                B2B
              </span>
            </button>
          </div>

          {/* Dynamic Tier Banner */}
          {accountType === 'b2b' ? (
            <div className="bg-[#eff4ff] border border-[#d5e3ff] rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck size={20} className="text-[#0076df] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#005db3]">
                  Bulk Wholesale Tier Activated
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Provide authorized store credentials to access real-time stock allocation and distributor invoice credits.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-4 flex items-start gap-3">
              <Sparkles size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-800">
                  Personal Shopper Privileges Activated
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                  Instant access to festive flash discounts, zero-downpayment EMI financing, and 15-minute express in-store pickups.
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#e5eeff] shadow-xs">
            {/* Field 1: Name */}
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1.5">
                {accountType === 'b2b'
                  ? 'Business / Store Owner Name'
                  : 'Full Name (As per Aadhaar/PAN)'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  {accountType === 'b2b' ? <Store size={16} /> : <User size={16} />}
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={
                    accountType === 'b2b'
                      ? 'e.g. Ramesh Electronics / Amit Patel'
                      : 'e.g. Aarav Patel'
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl text-[#0b1c30] placeholder-slate-400 focus:outline-none focus:border-[#0076df] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0b1c30]">
                  Mobile Number
                </label>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Zap size={11} className="fill-emerald-600" />
                  <span>Instant SMS OTP</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-slate-700 border-r border-slate-300 pr-2">
                    IN +91
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={11}
                    className="w-full pl-18 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl text-[#0b1c30] font-semibold placeholder-slate-400 focus:outline-none focus:border-[#0076df] focus:bg-white transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGetOtp}
                  className="px-4 py-2.5 bg-[#0076df] hover:bg-[#005db3] text-white text-xs font-extrabold rounded-xl shadow-xs transition cursor-pointer shrink-0"
                >
                  Get OTP
                </button>
              </div>
            </div>

            {/* Field 3: Email Address */}
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1.5">
                {accountType === 'b2b'
                  ? 'Email Address (For Tax Invoices)'
                  : 'Email Address (For Invoices & Order Tracking)'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    accountType === 'b2b'
                      ? 'partner@enterprise.com'
                      : 'aarav.patel@gmail.com'
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl text-[#0b1c30] placeholder-slate-400 focus:outline-none focus:border-[#0076df] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Field 4: Security Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0b1c30]">
                  Set Security Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-bold text-[#0076df] hover:underline cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl text-[#0b1c30] placeholder-slate-400 focus:outline-none focus:border-[#0076df] focus:bg-white transition font-mono"
                />
                <div className="absolute right-3.5 text-slate-400">
                  <Shield size={16} />
                </div>
              </div>
            </div>

            {/* Password Security Level Bar (Screenshot 2 exact) */}
            <div className="pt-1 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-600">Security Level:</span>
                <span
                  className={`font-extrabold ${
                    securityScore === 3
                      ? 'text-emerald-600'
                      : securityScore === 2
                      ? 'text-amber-600'
                      : 'text-slate-500'
                  }`}
                >
                  {getSecurityLabel()}
                </span>
              </div>

              {/* 3-Segment Strength Bar */}
              <div className="grid grid-cols-3 gap-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    securityScore >= 1 ? 'bg-amber-400' : 'bg-slate-200'
                  }`}
                ></div>
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    securityScore >= 2 ? 'bg-amber-400' : 'bg-slate-200'
                  }`}
                ></div>
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    securityScore === 3 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                ></div>
              </div>

              {/* Requirement Checklist */}
              <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      hasMinLength
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'border border-slate-300 text-slate-400'
                    }`}
                  >
                    {hasMinLength ? '✓' : '○'}
                  </span>
                  <span>8+ chars</span>
                </span>

                <span className="flex items-center gap-1">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      hasNumber
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'border border-slate-300 text-slate-400'
                    }`}
                  >
                    {hasNumber ? '✓' : '○'}
                  </span>
                  <span>1 number</span>
                </span>

                <span className="flex items-center gap-1">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      hasSpecial
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'border border-slate-300 text-slate-400'
                    }`}
                  >
                    {hasSpecial ? '✓' : '○'}
                  </span>
                  <span>1 special symbol</span>
                </span>
              </div>
            </div>

            {/* Checkbox 1: WhatsApp Updates (Screenshot 2 exact) */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={whatsAppUpdates}
                  onChange={(e) => setWhatsAppUpdates(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#0076df] focus:ring-[#0076df] border-slate-300 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
                    <span>Receive WhatsApp updates</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Instant alerts for live dispatch, tracking links, price-drop deals & warranty reminders.
                  </div>
                </div>
              </label>
            </div>

            {/* Checkbox 2: Terms & Conditions (Screenshot 2 exact) */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#0076df] focus:ring-[#0076df] border-slate-300 cursor-pointer"
                />
                <span className="text-[11px] text-slate-600 leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Dhyan Enterprise Terms of Service: Authorized Dealer standard agreements apply.', 'normal');
                    }}
                    className="text-[#0076df] font-bold hover:underline"
                  >
                    Terms of Service
                  </button>
                  ,{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Commercial Privacy Policy: Strict encryption and zero third-party disclosure.', 'normal');
                    }}
                    className="text-[#0076df] font-bold hover:underline"
                  >
                    Commercial Privacy Policy
                  </button>
                  , and authentic device IMEI guidelines.
                </span>
              </label>
            </div>
          </div>

          {/* Primary Action Button (Screenshot 2 exact) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGetOtp}
              className="w-full h-13 rounded-2xl bg-[#0076df] hover:bg-[#005db3] text-white font-extrabold text-sm tracking-wide shadow-md transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Verify Mobile Number with OTP to continue</span>
              <Lock size={16} />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold text-center">
              <span className="text-emerald-600 font-bold">🔒</span>
              <span>256-Bit Encrypted Secure Registration</span>
            </div>
          </div>

          {/* Value-Add Feature Cards (Screenshot 2 exact) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Feature Card 1: GST Ready Invoicing */}
            <div className="bg-white border border-[#e5eeff] rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#005db3] flex items-center justify-center shrink-0">
                <Receipt size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0b1c30]">
                  GST Ready Invoicing
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Claim tax input credits instantly on all phones and hardware supplies.
                </div>
              </div>
            </div>

            {/* Feature Card 2: Fast-Track Counter */}
            <div className="bg-white border border-[#e5eeff] rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0b1c30]">
                  Fast-Track Counter
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Skip the line with 15-min in-store express pickup & repair tracking.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE OTP VERIFICATION DIALOG MODAL */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0076df]">
                <ShieldCheck size={24} />
                <h3 className="font-extrabold text-base text-[#0b1c30]">
                  SMS Verification Code
                </h3>
              </div>
              <button
                onClick={() => setIsOtpModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed">
              Enter the 6-digit one-time code sent to{' '}
              <span className="font-bold text-[#0b1c30]">+91 {mobileNumber}</span> to confirm your{' '}
              <span className="font-bold text-[#0076df]">
                {accountType === 'b2b' ? 'Retail Partner' : 'Personal Shopper'}
              </span>{' '}
              account.
            </div>

            {/* 6 Digit Inputs */}
            <div className="flex justify-between gap-2">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newDigits = [...otpDigits];
                    newDigits[idx] = e.target.value;
                    setOtpDigits(newDigits);
                  }}
                  className="w-11 h-12 text-center font-mono font-bold text-lg border-2 border-slate-200 rounded-xl focus:border-[#0076df] focus:outline-none focus:bg-blue-50/30 text-[#0b1c30]"
                />
              ))}
            </div>

            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-2.5 text-center text-[11px] text-blue-800 font-medium">
              Demo Code: <span className="font-bold font-mono">4 9 2 8 1 0</span> (Pre-filled for testing)
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Didn&apos;t receive code?</span>
              <button
                type="button"
                onClick={() => {
                  showToast('New OTP sent via SMS!', 'success');
                  setOtpTimer(30);
                }}
                className="font-bold text-[#0076df] hover:underline cursor-pointer"
              >
                Resend SMS ({otpTimer}s)
              </button>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsOtpModalOpen(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 font-bold text-xs rounded-xl text-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCompleteRegistration}
                className="flex-1 py-3 bg-[#0076df] hover:bg-[#005db3] font-bold text-xs rounded-xl text-white shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Confirm & Login</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
