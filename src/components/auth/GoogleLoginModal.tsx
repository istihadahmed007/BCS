'use client';

import { useState } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  redirectUrl?: string;
  title?: string;
  subtitle?: string;
}

export default function GoogleLoginModal({
  isOpen,
  onClose,
  onSuccess,
  redirectUrl = '/dashboard',
  title = 'বিসিএস ক্র্যাক অ্যাকাউন্টে প্রবেশ করুন',
  subtitle = 'Google সাইন-ইন করে ফ্রি প্র্যাকটিস শুরু করুন অথবা আপনার প্যাকেজ পরিচালনা করুন।',
}: GoogleLoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch official Google OAuth URL from backend
      const res = await fetch('/api/auth/google/url');
      const data = await res.json();

      if (data.success && data.url) {
        // In real production environment: redirect directly to Google OAuth authorization endpoint
        // If client ID is set to dummy/development: offer quick dev login or redirect
        if (data.url.includes('dummy-google-client-id') || process.env.NODE_ENV !== 'production') {
          // Dev / local sandbox mock login option
          const devToken = `mock_id_token_${Date.now()}_student`;
          const verifyRes = await fetch('/api/auth/google/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: devToken }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            if (onSuccess) onSuccess();
            window.location.href = redirectUrl;
            return;
          }
        }

        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to initiate Google authentication.');
      }
    } catch (err: any) {
      setError(err.message || 'Google সাইন-ইন সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 border border-blue-100 dark:border-blue-900 mb-1">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white bangla-font">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 bangla-font leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Google Action */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold text-sm shadow-xs transition-all hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{isLoading ? 'প্রক্রিয়াধীন...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Free Preview Perk Note */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 bangla-font">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>নতুন অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে ফ্রি প্রিভিউ পাবে:</span>
          </div>
          <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-1 pl-1 text-[11px] bangla-font">
            <li>বাছাইকৃত ফ্রি প্রশ্ন ব্যাংকে সম্পূর্ণ অ্যাক্সেস</li>
            <li>দৈনিক ২০টি সক্রিয় প্রশ্ন সমাধানের কোটা</li>
            <li>ফ্রি ডায়াগনস্টিক টেস্ট ও ভুল খাতা ট্র্যাকার</li>
          </ul>
        </div>

        {/* Terms & Privacy */}
        <p className="text-[11px] text-slate-400 text-center leading-relaxed">
          সাইন-ইন করার মাধ্যমে আপনি বিসিএস ক্র্যাকের{' '}
          <a href="#" className="underline hover:text-slate-600">গোপনীয়তা নীতি</a>{' '}
          এবং{' '}
          <a href="#" className="underline hover:text-slate-600">ব্যবহারের শর্তাবলী</a>{' '}
          মেনে নিচ্ছেন।
        </p>
      </div>
    </div>
  );
}
