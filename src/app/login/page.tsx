'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, Check, AlertCircle, Plus, X, ShieldAlert } from 'lucide-react';
import GoogleLoginModal from '@/components/auth/GoogleLoginModal';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const reasonParam = searchParams.get('reason');
  const redirect = searchParams.get('redirect') || '/dashboard';

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Status & Validation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Modal states
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  // Validate fields
  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    return nextErrors;
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const vErrors = validate();
    setErrors((prev) => ({
      ...prev,
      [field]: vErrors[field],
      general: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          rememberMe,
          redirect,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials or login failed');
      }

      setLoginSuccess(true);
      setTimeout(() => {
        router.push(data.redirectUrl || redirect);
      }, 700);
    } catch (err: any) {
      setErrors({ general: err.message || 'Unable to log in. Please try again.' });
      setIsSubmitting(false);
    }
  };

  // Google OAuth flow
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrors({});
    try {
      const res = await fetch(`/api/auth/google/url?redirect=${encodeURIComponent(redirect)}`);
      const data = await res.json();
      if (!data.success || !data.url) {
        throw new Error(data.error || 'Google login URL generation failed');
      }
      if (!data.configured) {
        setGoogleModalOpen(true);
        setIsGoogleLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch (err: any) {
      setErrors({ general: err.message || 'Google sign-in connection failed.' });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f0f3f8] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* ============================================================= */}
      {/* Neumorphic / Soft Decorative Background Floating Elements     */}
      {/* ============================================================= */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#f0f3f8] pointer-events-none"
        style={{
          boxShadow: '16px 16px 32px rgba(166, 180, 200, 0.4), -16px -16px 32px rgba(255, 255, 255, 0.85)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-[#f0f3f8] pointer-events-none"
        style={{
          boxShadow: '14px 14px 28px rgba(166, 180, 200, 0.35), -14px -14px 28px rgba(255, 255, 255, 0.85)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-1/4 w-88 h-88 rounded-full bg-[#f0f3f8] pointer-events-none"
        style={{
          boxShadow: '18px 18px 36px rgba(166, 180, 200, 0.35), -18px -18px 36px rgba(255, 255, 255, 0.85)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-16 -left-12 w-44 h-44 rounded-full bg-[#f0f3f8] pointer-events-none"
        style={{
          boxShadow: '10px 10px 20px rgba(166, 180, 200, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.85)',
        }}
      />

      {/* ============================================================= */}
      {/* Centered White Login Card                                      */}
      {/* ============================================================= */}
      <main className="relative z-10 w-full max-w-[400px]">
        <div
          className="bg-white rounded-[32px] p-7 sm:p-9 border border-white/60 transition-all duration-300"
          style={{
            boxShadow:
              '0 24px 48px -12px rgba(15, 23, 42, 0.08), 0 4px 16px -2px rgba(15, 23, 42, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          {/* Top Blue Lock Icon in soft recessed circular pod */}
          <div className="flex justify-center mb-4">
            <div
              className="w-14 h-14 rounded-full bg-[#f0f4f9] flex items-center justify-center text-blue-600 transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow:
                  'inset 3px 3px 6px rgba(166, 180, 200, 0.35), inset -3px -3px 6px rgba(255, 255, 255, 0.95), 0 2px 4px rgba(15, 23, 42, 0.02)',
              }}
              aria-hidden="true"
            >
              <Lock className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          {/* Welcoming Heading & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Login to continue your journey</p>
          </div>

          {/* Single Concurrent Device / Superseded Session Notification */}
          {reasonParam === 'session_superseded' && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex items-start gap-2.5 animate-fadeIn shadow-xs"
            >
              <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <strong className="block font-semibold text-amber-950 text-[13px] mb-0.5">
                  Signed Out: Account Active on Another Device
                </strong>
                Your session has ended because this account signed in on another device. Each account is limited to one active device at a time. Please log in again to continue on this device.
              </div>
            </div>
          )}

          {/* General or OAuth Error Alert */}
          {(errors.general || errorParam) && (
            <div
              role="alert"
              className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-start gap-2 animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-tight">
                {errors.general || (errorParam === 'missing_auth_code' ? 'Authentication code missing. Please try again.' : errorParam)}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  onBlur={() => handleBlur('email')}
                  placeholder="name@example.com"
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 bg-[#f4f7fb] border transition-all duration-200 outline-hidden ${
                    touched.email && errors.email
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-3 focus:ring-red-500/15'
                      : 'border-slate-200/80 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15'
                  }`}
                  style={{
                    boxShadow: 'inset 1px 1px 2px rgba(166, 180, 200, 0.15)',
                  }}
                />
              </div>
              {touched.email && errors.email && (
                <p id="email-error" className="text-[11px] font-medium text-red-600 mt-1.5 ml-1 flex items-center gap-1">
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  aria-invalid={touched.password && !!errors.password}
                  aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 bg-[#f4f7fb] border transition-all duration-200 outline-hidden ${
                    touched.password && errors.password
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-3 focus:ring-red-500/15'
                      : 'border-slate-200/80 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15'
                  }`}
                  style={{
                    boxShadow: 'inset 1px 1px 2px rgba(166, 180, 200, 0.15)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-hidden focus:text-blue-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p id="password-error" className="text-[11px] font-medium text-red-600 mt-1.5 ml-1 flex items-center gap-1">
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                    rememberMe
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                      : 'bg-[#f4f7fb] border-slate-300 group-hover:border-slate-400'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors font-medium">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotSent(false);
                  setForgotModalOpen(true);
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 focus:outline-hidden focus:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Prominent Blue Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || loginSuccess}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-hidden focus:ring-3 focus:ring-blue-500/35 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : loginSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Success! Redirecting...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Prompt beneath button */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Don&apos;t have an account?</span>
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 transition-all shadow-2xs font-bold"
              title="Create new account"
              aria-label="Create new account"
            >
              <Plus className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/onboarding"
              className="font-semibold text-blue-600 hover:text-blue-700 focus:outline-hidden focus:underline transition-colors ml-0.5"
            >
              Sign up
            </Link>
          </div>

          {/* Subtle Divider for Google Alternative */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">or</span>
            </div>
          </div>

          {/* Quick Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2.5 focus:outline-hidden focus:ring-2 focus:ring-slate-300"
          >
            {isGoogleLoading ? (
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </button>
        </div>
      </main>

      {/* ============================================================= */}
      {/* Forgot Password Modal                                         */}
      {/* ============================================================= */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>

            <h2 className="text-lg font-bold text-slate-800">Reset your password</h2>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              Enter your registered email address and we&apos;ll send you instructions to reset your password.
            </p>

            {forgotSent ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 mb-4">
                <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Password reset instructions have been sent to your email.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (forgotEmail.trim()) {
                    setForgotSent(true);
                  }
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="w-full mt-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Back to login
            </button>
          </div>
        </div>
      )}

      {/* Google Fallback Modal */}
      <GoogleLoginModal
        isOpen={googleModalOpen}
        onClose={() => setGoogleModalOpen(false)}
        redirectUrl={redirect}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f3f8] flex items-center justify-center text-slate-400 text-sm">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
