'use client';

import { useEffect, useState, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Clock,
  Layers,
  ArrowRight,
  AlertCircle,
  Lock,
  GraduationCap,
  HelpCircle,
  ChevronDown,
  X,
  Stethoscope,
  QrCode,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { PackagePlan, PaymentGatewayType, UserSubscription } from '@/types';
import GoogleLoginModal from '@/components/auth/GoogleLoginModal';

function PackagesContent() {
  const searchParams = useSearchParams();

  const [packages, setPackages] = useState<PackagePlan[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<UserSubscription | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; fullName: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals & Selection
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackagePlan | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<PaymentGatewayType>('paymently');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isConfirmingTrx, setIsConfirmingTrx] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Status banners from payment callbacks
  const [paymentNotice, setPaymentNotice] = useState<{ type: 'success' | 'failed' | 'cancelled'; message: string } | null>(null);

  // Initial Data Fetch
  useEffect(() => {
    // Check callback status from URL
    const paymentStatus = searchParams.get('payment');
    const orderId = searchParams.get('orderId');
    const reason = searchParams.get('reason');

    if (paymentStatus === 'success') {
      setPaymentNotice({
        type: 'success',
        message: `পেমেন্ট সফলভাবে সম্পন্ন হয়েছে! আপনার প্যাকেজটি সক্রিয় করা হয়েছে (অর্ডার: ${orderId || 'N/A'})।`,
      });
    } else if (paymentStatus === 'failed') {
      setPaymentNotice({
        type: 'failed',
        message: `পেমেন্ট সম্পন্ন হয়নি (${reason || 'লেনদেন বাতিল বা ত্রুটিপূর্ণ'})। অনুগ্রহ করে পুনরায় চেষ্টা করুন।`,
      });
    }

    loadData();
  }, [searchParams]);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch packages
      const pkgRes = await fetch('/api/packages');
      const pkgData = await pkgRes.json();
      if (pkgData.success) {
        setPackages(pkgData.packages || []);
      }

      // Fetch user session and subscription
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();
      if (meData.authenticated) {
        setCurrentUser(meData.user);
        setActiveSubscription(meData.subscription);
      }
    } catch (err) {
      console.error('Failed to load packages data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPackage = (pkg: PackagePlan) => {
    // If not logged in, prompt Google Login first
    if (!currentUser) {
      setSelectedPackage(pkg);
      setLoginModalOpen(true);
      return;
    }

    // If package is free preview, show info
    if (pkg.tier === 'free') {
      alert('আপনি বর্তমানে ফ্রি প্রিভিউ প্ল্যানে আছেন।');
      return;
    }

    // Check if user already has an active subscription for this package
    if (activeSubscription && activeSubscription.packageId === pkg.id && activeSubscription.status === 'active') {
      const remaining = activeSubscription.expiresAt
        ? Math.ceil((new Date(activeSubscription.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 0;
      alert(`আপনার এই প্যাকেজটি ইতোমধ্যেই সক্রিয় রয়েছে (${remaining} দিন বাকি)।`);
      return;
    }

    setSelectedPackage(pkg);
    setCheckoutError(null);
    setCheckoutModalOpen(true);
  };

  const handleProceedToPayment = async () => {
    if (!selectedPackage || !currentUser) return;
    setIsProcessingOrder(true);
    setCheckoutError(null);

    try {
      // 1. Create order
      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          paymentGateway,
          metadata: { phone },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.error || 'অর্ডার তৈরিতে সমস্যা হয়েছে।');
      }

      const order = orderData.order;

      // 2. Initiate Payment Session
      const initRes = await fetch('/api/payments/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          phone,
        }),
      });

      const initData = await initRes.json();
      if (!initData.success) {
        throw new Error(initData.error || 'পেমেন্ট গেটওয়ে চালুকরণে সমস্যা হয়েছে।');
      }

      // 3. In sandbox mode: simulate immediate server verification
      if (initData.initiation.mode === 'sandbox' || paymentGateway === 'sandbox') {
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            simulatePaymentSuccess: true,
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setCheckoutModalOpen(false);
          setPaymentNotice({
            type: 'success',
            message: `পেমেন্ট সফলভাবে যাচাই হয়েছে! ${selectedPackage.name} প্যাকেজটি সক্রিয় হয়েছে।`,
          });
          loadData();
          return;
        }
      }

      // In real production gateway: redirect user to payment gateway checkout URL
      window.location.href = initData.initiation.redirectUrl;
    } catch (err: any) {
      setCheckoutError(err.message || 'পেমেন্ট প্রক্রিয়া শুরু করা যায়নি।');
      setIsProcessingOrder(false);
    }
  };

  const handleCopyPaymentlyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://vartualtutor.paymently.io/paymentlink/default/BDT');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleConfirmPaymentlyTrxId = async () => {
    if (!selectedPackage || !currentUser) return;
    if (!trxId || trxId.trim().length < 4) {
      setCheckoutError('অনুগ্রহ করে সঠিক bKash/Nagad ট্রানজেকশন আইডি (TrxID) লিখুন।');
      return;
    }

    setIsConfirmingTrx(true);
    setCheckoutError(null);

    try {
      // 1. Create order
      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          paymentGateway: 'paymently',
          metadata: { phone, trxId: trxId.trim() },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.error || 'অর্ডার তৈরিতে সমস্যা হয়েছে।');
      }

      // 2. Confirm TrxID
      const confirmRes = await fetch('/api/payments/paymently/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.order.id,
          trxId: trxId.trim(),
          senderPhone: phone,
        }),
      });

      const confirmData = await confirmRes.json();
      if (!confirmData.success) {
        throw new Error(confirmData.error || 'TrxID যাচাইকরণে সমস্যা হয়েছে।');
      }

      setCheckoutModalOpen(false);
      setPaymentNotice({
        type: 'success',
        message: `পেমেন্ট সফলভাবে যাচাই হয়েছে! ${selectedPackage.nameBn || selectedPackage.name} প্যাকেজটি সক্রিয় হয়েছে। (TrxID: ${trxId.trim()})`,
      });
      loadData();
    } catch (err: any) {
      setCheckoutError(err.message || 'পেমেন্ট নিশ্চিতকরণ সম্পন্ন হয়নি।');
    } finally {
      setIsConfirmingTrx(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Payment Callback Notification Banner */}
        {paymentNotice && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm bangla-font ${
              paymentNotice.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/60 border-red-200 text-red-800 dark:text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {paymentNotice.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
              )}
              <span>{paymentNotice.message}</span>
            </div>
            <button
              onClick={() => setPaymentNotice(null)}
              className="p-1 rounded-lg hover:bg-black/5 text-slate-500"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EBFF] text-[#6538F5] border border-[#6538F5]/20 text-xs font-bold bangla-font">
            <Sparkles className="h-3.5 w-3.5 text-[#6538F5]" />
            <span>বিসিএস ক্র্যাক সাবস্ক্রিপশন ও প্রিপারেশন প্যাকেজ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#17233F] tracking-tight bangla-font">
            আপনার বিসিএস লক্ষ্য অনুযায়ী সেরা প্যাকেজটি বেছে নিন
          </h1>
          <p className="text-sm sm:text-base text-[#66748B] max-w-2xl mx-auto bangla-font leading-relaxed">
            কোনো প্রকার অস্পষ্টতা ছাড়াই সম্পূর্ণ স্বচ্ছ মূল্যে ২০,০০০+ ভেরিফাইড প্রশ্ন ব্যাংক, বিগত প্রশ্ন সমাধান এবং ৫১তম বিশেষ বিসিএস মেডিক্যাল পার্টের প্রস্তুতি নিন।
          </p>
        </div>

        {/* Active Subscription Status Banner (If User Logged In) */}
        {currentUser && activeSubscription && (
          <div className="bg-white border border-[#E3E8F2] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8792A5] uppercase tracking-wider">
                  বর্তমান স্ট্যাটাস:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0EBFF] text-[#6538F5] text-xs font-bold bangla-font">
                  {activeSubscription.packageName}
                </span>
                <span className="flex h-2 w-2 rounded-full bg-[#059669] animate-pulse" />
              </div>
              <p className="text-xs text-[#66748B] bangla-font">
                অ্যাকাউন্ট: <span className="font-semibold text-[#17233F]">{currentUser.email}</span>
                {activeSubscription.tier !== 'free' && (
                  <>
                    {' '}• মেয়াদ শেষ হবে:{' '}
                    <span className="font-semibold text-[#17233F]">
                      {new Date(activeSubscription.expiresAt).toLocaleDateString('bn-BD')}
                    </span>
                  </>
                )}
              </p>
            </div>
            <Link
              href="/study/today"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6538F5] hover:bg-[#8055F7] text-white text-xs font-bold shadow-xs transition-all bangla-font"
            >
              <span>দৈনিক অনুশীলনে যান</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const isCurrentPlan = activeSubscription?.packageId === pkg.id && activeSubscription.status === 'active';

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl border flex flex-col justify-between transition-all ${
                  pkg.isPopular
                    ? 'border-[#6538F5] shadow-md ring-2 ring-[#6538F5]/10'
                    : 'border-[#E3E8F2] shadow-xs hover:border-slate-300'
                } p-6`}
              >
                {/* Popular or Current Badge */}
                {isCurrentPlan ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#059669] text-white text-[11px] font-bold shadow-xs bangla-font">
                    আপনার বর্তমান প্ল্যান
                  </div>
                ) : pkg.isPopular ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#6538F5] text-white text-[11px] font-bold shadow-xs bangla-font">
                    সর্বাধিক জনপ্রিয়
                  </div>
                ) : null}

                <div className="space-y-4">
                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white bangla-font">
                      {pkg.nameBn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug bangla-font">
                      {pkg.descriptionBn}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        {pkg.priceBDT === 0 ? 'ফ্রি' : `৳${pkg.priceBDT}`}
                      </span>
                      {pkg.originalPriceBDT && (
                        <span className="text-xs text-slate-400 line-through">
                          ৳{pkg.originalPriceBDT}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bangla-font mt-0.5 block">
                      {pkg.durationDays === 0 ? 'লাইফটাইম প্রিভিউ' : `${pkg.durationDays} দিন মেয়াদ`}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider block">
                      সুবিধাসমূহ:
                    </span>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 bangla-font">
                      {pkg.featuresBn.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all bangla-font ${
                      isCurrentPlan
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 cursor-default'
                        : pkg.isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-500/25 hover:scale-[1.01]'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                    }`}
                  >
                    {isCurrentPlan
                      ? 'বর্তমান প্ল্যান সক্রিয়'
                      : pkg.tier === 'free'
                      ? 'ফ্রি ট্রায়াল'
                      : 'প্যাকেজটি আনলক করুন'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Security Assurance Strip */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white bangla-font">
                ১০০% নিরাপদ ও ভেরিফাইড পেমেন্ট
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 bangla-font mt-0.5">
                বিকাশ, নগদ, রকেট, উপায় এবং যেকোনো বাংলাদেশি ডেবিট/ক্রেডিট কার্ডের মাধ্যমে তাৎক্ষণিক প্যাকেজ অ্যাক্টিভেশন।
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono">bKash</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono">Nagad</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono">Rocket</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono">Cards</span>
          </div>
        </div>
      </div>

      {/* Checkout & Payment Gateway Modal */}
      {checkoutModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close checkout modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white bangla-font">
                প্যাকেজ ক্রয় ও অ্যাক্টিভেশন
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 bangla-font">
                নিরাপদ পেমেন্ট সম্পন্ন করে তাৎক্ষণিক প্রিপারেশন শুরু করুন
              </p>
            </div>

            {/* Selected Package Details */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white bangla-font">
                  {selectedPackage.nameBn}
                </span>
                <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                  ৳{selectedPackage.priceBDT}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center justify-between bangla-font">
                <span>মেয়াদ: {selectedPackage.durationDays} দিন</span>
                <span>মুদ্রা: BDT (বাংলাদেশী টাকা)</span>
              </div>
            </div>

            {checkoutError && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{checkoutError}</span>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 dark:text-white bangla-font block">
                পেমেন্ট গেটওয়ে নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {/* 1. Paymently (Primary / Featured) */}
                <button
                  type="button"
                  onClick={() => setPaymentGateway('paymently')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    paymentGateway === 'paymently'
                      ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="absolute -top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                    ইনস্ট্যান্ট
                  </span>
                  <div className="font-bold flex items-center gap-1.5">
                    <span>Paymently</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 bangla-font leading-tight">
                    বিকাশ, নগদ, রকেট ও বাংলা QR
                  </div>
                </button>

                {/* 2. SSLCommerz */}
                <button
                  type="button"
                  onClick={() => setPaymentGateway('sslcommerz')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentGateway === 'sslcommerz'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold">SSLCommerz</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 bangla-font leading-tight">
                    কার্ড ও ইন্টারনেট ব্যাংকিং
                  </div>
                </button>

                {/* 3. aamarPay */}
                <button
                  type="button"
                  onClick={() => setPaymentGateway('aamarpay')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentGateway === 'aamarpay'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold">aamarPay</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 bangla-font leading-tight">
                    মোবাইল ও নেট ব্যাংকিং
                  </div>
                </button>
              </div>
            </div>

            {/* Paymently Interactive Details (When Selected) */}
            {paymentGateway === 'paymently' && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-emerald-900 dark:text-emerald-200 bangla-font flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    Paymently অফিসিয়াল পেমেন্ট লিংক:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPaymentlyLink}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedLink ? 'কপি হয়েছে' : 'লিংক কপি করুন'}</span>
                  </button>
                </div>

                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 truncate">
                    https://vartualtutor.paymently.io/paymentlink/default/BDT
                  </span>
                  <a
                    href="https://vartualtutor.paymently.io/paymentlink/default/BDT"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>যান</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* QR Code Toggle & Display */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowQrCode((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 transition-colors bangla-font"
                  >
                    <QrCode className="h-4 w-4 text-emerald-600" />
                    <span>{showQrCode ? 'QR কোড লুকান' : 'বাংলা QR কোড স্ক্যান করে পেমেন্ট করুন'}</span>
                  </button>

                  {showQrCode && (
                    <div className="mt-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center space-y-2">
                      <img
                        src="/images/paymently-qr.png"
                        alt="Paymently Bangla QR Code"
                        className="w-44 h-44 object-contain rounded-lg border border-slate-100 dark:border-slate-800 shadow-xs"
                      />
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bangla-font">
                        যেকোনো ব্যাংক বা বিকাশ/নগদ অ্যাপের <span className="font-bold text-slate-700 dark:text-slate-300">বাংলা QR</span> অপশন দিয়ে স্ক্যান করুন
                      </p>
                    </div>
                  )}
                </div>

                {/* Direct TrxID Confirmation Input */}
                <div className="pt-1 border-t border-emerald-200/60 dark:border-emerald-800/40 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200 bangla-font block">
                    পেমেন্ট শেষে bKash/Nagad TrxID থাকলে লিখুন (ইনস্ট্যান্ট অ্যাক্টিভেশন):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                      placeholder="যেমন: BLA9382JK2"
                      className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleConfirmPaymentlyTrxId}
                      disabled={isConfirmingTrx || !trxId.trim()}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs bangla-font transition-all shrink-0"
                    >
                      {isConfirmingTrx ? 'যাচাই হচ্ছে...' : 'TrxID নিশ্চিত করুন'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Number for SMS confirmation */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 bangla-font">
                মোবাইল নম্বর (পেমেন্ট কনফার্মেশনের জন্য):
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={isProcessingOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 bangla-font"
              >
                {isProcessingOrder ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>পেমেন্ট গেটওয়েতে সংযোগ হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>{paymentGateway === 'paymently' ? 'Paymently-তে সরাসরি পেমেন্ট করুন' : 'পেমেন্ট গেটওয়েতে যান'} (৳{selectedPackage.priceBDT})</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Login Modal Prompt */}
      <GoogleLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => {
          setLoginModalOpen(false);
          loadData();
        }}
        title="প্যাকেজ ক্রয়ের পূর্বে সাইন-ইন করুন"
        subtitle="আপনার প্যাকেজটি নিরাপদ রাখতে আপনার Google অ্যাকাউন্টে লগইন করুন।"
      />
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">লোড হচ্ছে...</div>}>
      <PackagesContent />
    </Suspense>
  );
}
