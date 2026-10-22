'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Bell,
  Mail,
  ChevronDown,
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
  Stethoscope,
  CheckCircle2,
  Clock,
  Layers,
  LogOut,
} from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 'notif-1',
      title: 'BPSC Notice: ৪৬তম প্রিলিমিনারি আসন বিন্যাস',
      desc: 'পরীক্ষার্থীদের আসন বিন্যাস ও কেন্দ্র নির্দেশিকা প্রকাশিত হয়েছে।',
      time: '১০ মিনিট আগে',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'স্পেসড রিভিশন রিমাইন্ডার',
      desc: 'বাংলা সাহিত্যের চর্যাপদ ও মঙ্গলকাব্য আজ রিভিশনের জন্য নির্ধারিত।',
      time: '১ ঘণ্টা আগে',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'নতুন প্রশ্ন ব্যাংক আপডেট',
      desc: '২০,০০০ ভেরিফাইড বিসিএস প্রশ্ন ব্যাংকে নতুন ব্যাচ যুক্ত হয়েছে।',
      time: 'গতকাল',
      unread: true,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 h-16 sm:h-18 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Online Exam Portal</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            Smart Exams, Better Future • বাংলাদেশ সিভিল সার্ভিস প্রস্তুতি
          </p>
        </div>
      </div>

      {/* Center: Search Field */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, questions, subjects..."
            className="w-full pl-4 pr-10 py-2 rounded-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Track Badge (Desktop) */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <GraduationCap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>৪৬তম বিসিএস প্রিলিমিনারি</span>
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-3 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  বিজ্ঞপ্তি ও নোটিশ (Notifications)
                </span>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full">
                  ৩টি নতুন
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white bangla-font">
                        {n.title}
                      </h4>
                      <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 bangla-font line-clamp-2">
                      {n.desc}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1.5 block">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  href="/dashboard"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  সব নোটিশ দেখুন (View All)
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Message / Streak Icon */}
        <Link
          href="/study/today"
          className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
          title="Daily Study Streak"
        >
          <Mail className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
            2
          </span>
        </Link>

        {/* Student Profile Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Student profile menu"
          >
            {/* Avatar */}
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white dark:ring-slate-800 shadow-xs">
              তা
            </div>
            <div className="text-left hidden md:block">
              <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Hi, তানভীর
              </span>
              <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                Student • 46th BCS
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  তানভীর আহমেদ (Aryan)
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Roll: 2026-BCS-9402
                </p>
                <span className="inline-block mt-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  General & Special BCS
                </span>
              </div>

              <div className="py-1 text-xs font-medium">
                <Link
                  href="/onboarding"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  <span>প্রোফাইল সেটিংস (Profile)</span>
                </Link>
                <Link
                  href="/syllabus"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span>সিলেবাস ট্র্যাকার (Syllabus)</span>
                </Link>
                <Link
                  href="/mistake-notebook"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>ভুল খাতা (Mistake Notebook)</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/onboarding"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <LogOut className="h-4 w-4" />
                  <span>ট্র্যাক পরিবর্তন / লগআউট</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
