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
  const [modalOpen, setModalOpen] = useState(true);

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

        {error && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs text-left">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>লগইনে সমস্যা হয়েছে: {error}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 bangla-font"
        >
          <span>Continue with Google</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-[11px] text-slate-400">
          নতুন ব্যবহারকারীরা স্বয়ংক্রিয়ভাবে <span className="font-semibold text-slate-700 dark:text-slate-300">Free Preview</span> প্ল্যান পাবেন।
        </p>
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
