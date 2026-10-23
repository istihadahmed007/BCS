'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import GoogleLoginModal from '@/components/auth/GoogleLoginModal';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect') || '/dashboard';
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(error);

  const handleDirectGoogleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const res = await fetch(`/api/auth/google/url?redirect=${encodeURIComponent(redirect)}`);
      const data = await res.json();
      if (!data.success || !data.url) {
        throw new Error(data.error || 'Google login URL generation failed');
      }
      if (!data.configured) {
        setModalOpen(true);
        setIsLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch (err: any) {
      setLoginError(err.message || 'Google সাইন-ইন সংযোগে সমস্যা হয়েছে।');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm text-center space-y-6">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 border border-blue-100 dark:border-blue-900 mx-auto">
          <Sparkles className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white bangla-font">
            বিসিএস ক্র্যাক অ্যাকাউন্টে প্রবেশ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 bangla-font mt-1.5 leading-relaxed">
            Google সাইন-ইন করে ফ্রি প্র্যাকটিস প্রশ্ন, ভুল খাতা ও প্রিমিয়াম বিসিএস প্যাকেজে যুক্ত হোন।
          </p>
        </div>

        {loginError && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs text-left">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block">লগইনে সমস্যা হয়েছে:</span>
              <span className="break-all">{loginError}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleDirectGoogleLogin}
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
            <span>{isLoading ? 'Google-এ সংযোগ হচ্ছে...' : 'Continue with Google'}</span>
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 text-left space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs bangla-font">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>নতুন ব্যবহারকারীরা তাৎক্ষণিক যা পাবেন:</span>
          </div>
          <ul className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 list-disc list-inside bangla-font">
            <li>ফ্রি বাছাইকৃত প্রশ্ন অনুশীলনের সুযোগ</li>
            <li>দৈনিক সক্রিয় প্রশ্ন সমাধানের কোটা</li>
            <li>ডায়াগনস্টিক টেস্ট ও ভুল খাতা ট্র্যাকার</li>
          </ul>
        </div>
      </div>

      <GoogleLoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        redirectUrl={redirect}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">লোড হচ্ছে...</div>}>
      <LoginContent />
    </Suspense>
  );
}
