'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  Lock,
  User,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export default function AccessDeniedPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
    fullName: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        }
      } catch (e) {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const handleSignOutAndSwitch = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login?redirect=/admin');
    } catch {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f3f8] flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Decorative soft background elements */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-88 h-88 rounded-full bg-[#f0f3f8] pointer-events-none"
        style={{
          boxShadow: '16px 16px 32px rgba(166, 180, 200, 0.4), -16px -16px 32px rgba(255, 255, 255, 0.85)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#f0f3f8] pointer-events-none"
        style={{
          boxShadow: '18px 18px 36px rgba(166, 180, 200, 0.35), -18px -18px 36px rgba(255, 255, 255, 0.85)',
        }}
      />

      <main className="relative z-10 w-full max-w-[460px]">
        <div
          className="bg-white rounded-[32px] p-7 sm:p-9 border border-white/70 transition-all duration-300 text-center"
          style={{
            boxShadow:
              '0 24px 48px -12px rgba(15, 23, 42, 0.1), 0 4px 16px -2px rgba(15, 23, 42, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          {/* Top Shield Alert Icon in soft recessed amber/red circular pod */}
          <div className="flex justify-center mb-5">
            <div
              className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200/60 shadow-xs"
              style={{
                boxShadow:
                  'inset 2px 2px 5px rgba(217, 119, 6, 0.15), inset -2px -2px 5px rgba(255, 255, 255, 0.95)',
              }}
              aria-hidden="true"
            >
              <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Access Denied</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/70 py-1 px-3 rounded-full inline-block mt-2">
            Super Admin Permissions Required
          </p>

          <p className="text-xs text-slate-500 font-medium leading-relaxed mt-3">
            You do not have the required administrative permissions to access this area. Administrative routes and governance features are strictly restricted to verified Super Admin accounts.
          </p>

          {/* Current Authenticated User Card */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 font-medium pb-1.5 border-b border-slate-200/60">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Signed-in Account
              </span>
              <span className="font-mono text-[11px] text-slate-700 font-semibold">
                {currentUser?.email || (loading ? 'Checking...' : 'Anonymous')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Current Role:</span>
              <span className="font-semibold text-slate-800 uppercase text-[11px] bg-slate-200/70 px-2 py-0.5 rounded-md">
                {currentUser?.role || 'Guest'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Required Role:</span>
              <span className="font-semibold text-amber-800 uppercase text-[11px] bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-700" />
                Super Admin
              </span>
            </div>

            <div className="pt-1.5 text-[11px] text-slate-400 border-t border-slate-200/60 flex items-start gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Authorized Super Admin accounts include{' '}
                <strong className="text-slate-600 font-medium">istihadahmed1163@gmail.com</strong>.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5">
            <Link
              href="/dashboard"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20"
            >
              <LayoutDashboard className="w-4 h-4" />
              Return to Student Dashboard
            </Link>

            <button
              type="button"
              onClick={handleSignOutAndSwitch}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              Sign in with Super Admin Account
            </button>

            <Link
              href="/"
              className="w-full py-2 px-4 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to BCS Crack Homepage
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
