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
  Settings,
  LogOut,
  GraduationCap,
  Sparkles,
  X,
  CreditCard,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroups = [
    {
      groupLabel: 'OVERVIEW',
      items: [
        {
          name: 'Dashboard',
          nameBn: 'ড্যাশবোর্ড',
          href: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      groupLabel: 'EXAM PREPARATION',
      items: [
        {
          name: 'Question Bank (20k)',
          nameBn: 'প্রশ্ন ব্যাংক (২০k)',
          href: '/question-bank',
          icon: BookCheck,
          badge: '20K',
        },
        {
          name: 'Mock Tests',
          nameBn: 'মডেল টেস্ট',
          href: '/test',
          icon: Target,
        },
        {
          name: 'Daily Practice',
          nameBn: 'দৈনিক অনুশীলন',
          href: '/study/today',
          icon: CalendarDays,
        },
        {
          name: 'Packages & Pricing',
          nameBn: 'প্যাকেজ ও সাবস্ক্রিপশন',
          href: '/packages',
          icon: CreditCard,
        },
      ],
    },
    {
      groupLabel: 'LEARNING & PROGRESS',
      items: [
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
      ],
    },
    {
      groupLabel: 'ACCOUNT & SETTINGS',
      items: [
        {
          name: 'Profile & Track',
          nameBn: 'প্রোফাইল সেটিংস',
          href: '/onboarding',
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#17233F]/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-[#E3E8F2] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Logo & Close Button (Mobile) */}
          <div className="flex items-center justify-between px-2 pb-2 border-b border-[#E3E8F2]/60">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 group"
              onClick={onClose}
            >
              <div className="h-9 w-9 rounded-xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center font-black text-sm shadow-xs border border-purple-100">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-[#17233F]">
                  BCS<span className="text-[#6538F5]">Crack</span>
                </span>
                <span className="block text-[9px] uppercase font-bold text-[#8792A5] tracking-wider">
                  Vartual Tutor Exam Portal
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-[#66748B] hover:text-[#17233F] hover:bg-[#F0EBFF]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="space-y-5 pt-1">
            {navigationGroups.map((group) => (
              <div key={group.groupLabel} className="space-y-1">
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8792A5]">
                  {group.groupLabel}
                </span>

                <div className="space-y-0.5 pt-1">
                  {group.items.map((item) => {
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
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#F0EBFF] text-[#6538F5] font-bold shadow-xs'
                            : 'text-[#66748B] hover:text-[#17233F] hover:bg-[#F8FAFF]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`h-4 w-4 ${
                              isActive ? 'text-[#6538F5]' : 'text-[#8792A5]'
                            }`}
                          />
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-[10px] font-normal text-[#8792A5] bangla-font">
                              {item.nameBn}
                            </span>
                          </div>
                        </div>

                        {item.badge && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#F0EBFF] text-[#6538F5] border border-purple-200">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Motivation Card & Logout */}
        <div className="p-4 border-t border-[#E3E8F2] space-y-3 bg-[#F8FAFF]">
          {/* Motivation Box */}
          <div className="bg-white border border-[#E3E8F2] rounded-2xl p-3 text-center shadow-xs">
            <div className="mx-auto w-8 h-8 rounded-full bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center mb-1.5">
              <GraduationCap className="h-4 w-4" />
            </div>
            <h4 className="text-[11px] font-bold text-[#17233F]">
              Precision Practice
            </h4>
            <p className="text-[10px] text-[#6538F5] font-medium bangla-font mt-0.5">
              একনিষ্ঠ অনুশীলনেই বিসিএস ক্যাডার।
            </p>
          </div>

          {/* User Signout / Switch */}
          <Link
            href="/onboarding"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#66748B] hover:text-[#17233F] hover:bg-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <LogOut className="h-3.5 w-3.5 text-[#8792A5]" />
              <span>Switch Track</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-[#8792A5]" />
          </Link>
        </div>
      </aside>
    </>
  );
}
