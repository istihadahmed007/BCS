'use client';

import Link from 'next/link';
import { Lock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PackageTier } from '@/types';

interface PremiumLockScreenProps {
  title?: string;
  description?: string;
  requiredTier?: PackageTier;
  actionText?: string;
}

export default function PremiumLockScreen({
  title = 'এই কনটেন্টটি প্রিমিয়াম প্যাকেজের অন্তর্ভুক্ত',
  description = 'সম্পূর্ণ ২০,০০০+ ভেরিফাইড প্রশ্ন ব্যাংক, বিগত বিসিএস সমাধান, আনলিমিটেড দৈনিক সক্রিয় স্মরণ ও পূর্ণাঙ্গ মডেল টেস্টে অ্যাক্সেস পেতে প্রিমিয়াম প্যাকেজটি আনলক করুন।',
  requiredTier = 'standard',
  actionText = 'প্যাকেজসমূহ দেখুন ও আনলক করুন',
}: PremiumLockScreenProps) {
  const getTierBadge = () => {
    switch (requiredTier) {
      case 'medical':
        return '৫১তম বিশেষ বিসিএস (স্বাস্থ্য) মেডিক্যাল প্যাকেজ';
      case 'complete':
        return 'কমপ্লিট বিসিএস মাস্টার প্ল্যান';
      case 'standard':
      default:
        return 'বিসিএস প্রিপারেশন স্ট্যান্ডার্ড প্যাকেজ';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-8 sm:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-center space-y-6">
      {/* Restrained Lock Emblem */}
      <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
        <Lock className="h-8 w-8" />
      </div>

      {/* Required Plan Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold bangla-font">
        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
        <span>প্রয়োজনীয় প্ল্যান: {getTierBadge()}</span>
      </div>

      {/* Main Lock Heading */}
      <div className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white bangla-font">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 bangla-font leading-relaxed max-w-lg mx-auto">
          {description}
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 bangla-font">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>অফিসিয়াল বিপিএসসি কি ও ব্যাখ্যা</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 bangla-font">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>-০.৫০ নেগেটিভ মার্কিং অ্যানালাইসিস</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 bangla-font">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>ভুল খাতা ও দুর্বলতা ট্র্যাকার</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 bangla-font">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>আনলিমিটেড দৈনিক মিক্সড অনুশীলন</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <Link
          href="/packages"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] bangla-font"
        >
          <span>{actionText}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
