'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Sparkles,
  Clock,
  LogOut,
  CreditCard,
  LogIn,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import GoogleLoginModal from '@/components/auth/GoogleLoginModal';

interface HeaderProps {
  onToggleSidebar: () => void;
  selectedTrack?: string;
  onTrackChange?: (track: string) => void;
}

export default function Header({
  onToggleSidebar,
  selectedTrack = 'general_bcs',
  onTrackChange,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // User auth state
  const [user, setUser] = useState<{
    id: string;
    email: string;
    fullName: string;
    role: string;
    avatarUrl?: string;
  } | null>(null);
  const [subscription, setSubscription] = useState<{
    packageName: string;
    tier: string;
    remainingDays: number;
  } | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated) {
        setUser(data.user);
        setSubscription(data.subscription);
      }
    } catch (e) {}
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setSubscription(null);
      setShowProfileMenu(false);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 'notif-1',
      title: 'BPSC Notice: ৪৬তম প্রিলিমিনারি সার্কুলার ২০২৬',
      desc: 'পরীক্ষার্থীদের আসন বিন্যাস ও কেন্দ্র নির্দেশিকা সংক্রান্ত নোটিশ।',
      time: '১০ মিনিট আগে',
    },
    {
      id: 'notif-2',
      title: 'স্পেসড রিভিশন রিমাইন্ডার',
      desc: 'বাংলা সাহিত্যের চর্যাপদ ও মঙ্গলকাব্য আজ রিভিশনের জন্য নির্ধারিত।',
      time: '১ ঘণ্টা আগে',
    },
    {
      id: 'notif-3',
      title: 'প্রশ্ন ব্যাংক আপডেট',
      desc: '২০,০০০ ভেরিফাইড বিসিএস প্রশ্ন ব্যাংকের সকল ব্যাচ সক্রিয় রয়েছে।',
      time: 'আজ সকালে',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E3E8F2] h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors shadow-xs">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-[#66748B] hover:text-[#17233F] hover:bg-[#F0EBFF] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-[#17233F] flex items-center gap-2">
              <span>Online Exam Portal</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#059669]">
                <CheckCircle2 className="h-3 w-3" />
                Live Server
              </span>
            </h1>
            <p className="text-[11px] text-[#66748B] font-medium hidden sm:block">
              Smart Exams, Better Future &bull; বাংলাদেশ সিভিল সার্ভিস প্রস্তুতি
            </p>
          </div>
        </div>

        {/* Center: Search Field */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/question-bank?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="relative w-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, questions, subjects..."
              className="w-full pl-4 pr-10 py-2 rounded-full text-xs sm:text-sm bg-[#F5F7FC] border border-[#E3E8F2] text-[#17233F] placeholder-[#8792A5] focus:outline-hidden focus:ring-2 focus:ring-[#6538F5]/20 focus:border-[#6538F5] transition-all"
              aria-label="Search questions and topics"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8792A5] hover:text-[#6538F5] transition-colors"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Package Pill */}
          <Link
            href="/packages"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0EBFF] border border-purple-200 text-[#6538F5] text-xs font-bold hover:bg-purple-100 transition-colors bangla-font shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#6538F5]" />
            <span>{subscription?.packageName || 'প্যাকেজ ও প্ল্যান'}</span>
          </Link>

          {/* Notifications Icon & Popover */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="p-2 rounded-full text-[#66748B] hover:text-[#17233F] hover:bg-[#F5F7FC] relative transition-colors"
              aria-label="View notifications"
              aria-expanded={showNotifications}
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#6538F5] rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E3E8F2] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-[#E3E8F2] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17233F] bangla-font">
                    বিজ্ঞপ্তি ও নোটিশ (Notifications)
                  </span>
                  <span className="text-[10px] font-bold text-[#6538F5] bg-[#F0EBFF] px-2 py-0.5 rounded-full">
                    ৩টি নতুন
                  </span>
                </div>
                <div className="divide-y divide-[#E3E8F2]/60 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3.5 hover:bg-[#F8FAFF] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#17233F] bangla-font">
                          {n.title}
                        </h4>
                        <span className="h-2 w-2 rounded-full bg-[#6538F5] shrink-0 mt-1" />
                      </div>
                      <p className="text-[11px] text-[#66748B] mt-1 bangla-font line-clamp-2">
                        {n.desc}
                      </p>
                      <span className="text-[10px] text-[#8792A5] mt-1.5 block">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-4 pt-2 border-t border-[#E3E8F2] text-center">
                  <Link
                    href="/dashboard"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-bold text-[#6538F5] hover:underline bangla-font"
                  >
                    সব নোটিশ দেখুন (View All)
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown or Sign In */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full hover:bg-[#F5F7FC] transition-colors"
                aria-label="Student profile menu"
                aria-expanded={showProfileMenu}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full border border-purple-200 object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center font-bold text-xs border border-purple-200">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left hidden md:block">
                  <span className="block text-xs font-bold text-[#17233F] leading-tight">
                    {user.fullName}
                  </span>
                  <span className="block text-[10px] font-medium text-[#66748B]">
                    {subscription?.packageName || 'Candidate'}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#8792A5]" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E3E8F2] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-[#E3E8F2]">
                    <p className="text-xs font-bold text-[#17233F]">
                      {user.fullName}
                    </p>
                    <p className="text-[11px] text-[#66748B] font-mono truncate">
                      {user.email}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold bg-[#F0EBFF] text-[#6538F5] px-2 py-0.5 rounded-full bangla-font">
                        {subscription?.packageName || 'Free Preview'}
                      </span>
                    </div>
                  </div>

                  <div className="py-1 text-xs font-medium">
                    <Link
                      href="/packages"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-[#6538F5] hover:bg-[#F0EBFF] font-bold bangla-font"
                    >
                      <CreditCard className="h-4 w-4 text-[#6538F5]" />
                      <span>প্যাকেজ ও সাবস্ক্রিপশন</span>
                    </Link>
                    <Link
                      href="/onboarding"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-[#66748B] hover:text-[#17233F] hover:bg-[#F8FAFF] bangla-font"
                    >
                      <User className="h-4 w-4 text-[#8792A5]" />
                      <span>প্রোফাইল ও ট্র্যাক সেটিংস</span>
                    </Link>
                    <Link
                      href="/mistake-notebook"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-[#66748B] hover:text-[#17233F] hover:bg-[#F8FAFF] bangla-font"
                    >
                      <Clock className="h-4 w-4 text-[#8792A5]" />
                      <span>ভুল খাতা (Mistake Notebook)</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-[#E3E8F2]">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEF0F0] text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>লগআউট (Log Out)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setLoginModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6538F5] hover:bg-[#8055F7] text-white text-xs font-bold shadow-sm transition-colors bangla-font"
            >
              <LogIn className="h-4 w-4" />
              <span>সাইন-ইন করুন</span>
            </button>
          )}
        </div>
      </header>

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => {
          setLoginModalOpen(false);
          fetchSession();
        }}
      />
    </>
  );
}
