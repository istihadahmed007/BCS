'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  BookCheck,
  Target,
  BookOpen,
  FileText,
  User,
  Settings,
  LogOut,
  GraduationCap,
  Sparkles,
  X,
  Stethoscope,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Dashboard',
      nameBn: 'ড্যাশবোর্ড',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Daily Practice',
      nameBn: 'দৈনিক অনুশীলন',
      href: '/study/today',
      icon: CalendarDays,
    },
    {
      name: 'Question Bank',
      nameBn: 'প্রশ্ন ব্যাংক (২০k)',
      href: '/question-bank',
      icon: BookCheck,
    },
    {
      name: 'Mock Tests',
      nameBn: 'মডেল টেস্ট',
      href: '/test',
      icon: Target,
    },
    {
      name: 'Syllabus',
      nameBn: 'সিলেবাস',
      href: '/syllabus',
      icon: BookOpen,
    },
    {
      name: 'Mistake Notebook',
      nameBn: 'ভুল খাতা',
      href: '/mistake-notebook',
      icon: FileText,
    },
    {
      name: 'Profile & Settings',
      nameBn: 'প্রোফাইল ও সেটিংস',
      href: '/onboarding',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Logo & Close Button (Mobile) */}
          <div className="flex items-center justify-between px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
              onClick={onClose}
            >
              {/* Colorful Geometric Logo Icon matching EDTECH reference */}
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 p-1.5 flex items-center justify-center shadow-xs border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  <div className="bg-red-500 rounded-xs" />
                  <div className="bg-blue-600 rounded-xs" />
                  <div className="bg-amber-500 rounded-xs" />
                  <div className="bg-emerald-500 rounded-xs" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    BCS<span className="text-blue-600">Crack</span>
                  </span>
                </div>
                <span className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                  Smart Exams, Better Future
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-600'
                    }`}
                  />
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span
                      className={`text-[10px] font-normal leading-tight ${
                        isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {item.nameBn}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Motivation Card & Logout */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
          {/* Motivation Box from Reference Image */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/80 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700/80 rounded-2xl p-3.5 text-center shadow-xs">
            <div className="mx-auto w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mb-2">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Prepare. Practice. Perform.
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Excellence is every Student&apos;s goal.
            </p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-1.5 bangla-font">
              একনিষ্ঠ অনুশীলনেই বিসিএস ক্যাডার।
            </p>
          </div>

          {/* User Signout / Switch */}
          <Link
            href="/onboarding"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Switch Track / Log out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
