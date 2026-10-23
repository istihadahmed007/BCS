'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  LayoutDashboard,
  BookCheck,
  CalendarDays,
  Target,
  BookOpen,
  FileText,
  Library,
  Stethoscope,
  CheckCircle2,
} from 'lucide-react';
import PortalShell from '@/components/portal/PortalShell';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages that use the new Online Exam Portal design system (Sidebar + Compact Header)
  const isPortalRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/study') ||
    pathname.startsWith('/question-bank') ||
    pathname.startsWith('/test') ||
    pathname.startsWith('/packages') ||
    pathname.startsWith('/syllabus') ||
    pathname.startsWith('/mistake-notebook') ||
    pathname.startsWith('/resources');

  if (isPortalRoute) {
    return <PortalShell>{children}</PortalShell>;
  }

  // Public Landing / Onboarding / Admin Shell
  return (
    <div className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top BPSC Official Info Strip */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-medium bangla-font">
              ৪৬তম সাধারণ বিসিএস ও ৫১তম বিশেষ বিসিএস (স্বাস্থ্য) সার্কুলার ২০২৬
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-blue-400">Written MCQ: 200 Marks | 120 Min</span>
            <span className="text-red-400">Penalty: -0.50</span>
            <a
              href="https://bpsc.gov.bd/pages/psc-exams"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Official BPSC
            </a>
          </div>
        </div>
      </div>

      {/* Landing Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 p-1.5 flex items-center justify-center shadow-xs border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                <div className="bg-red-500 rounded-xs" />
                <div className="bg-blue-600 rounded-xs" />
                <div className="bg-amber-500 rounded-xs" />
                <div className="bg-emerald-500 rounded-xs" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                BCS<span className="text-blue-600">Crack</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Precision Exam Portal
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-blue-600" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/question-bank"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 transition-colors font-bold border border-blue-200 dark:border-blue-800 shadow-xs"
            >
              <BookCheck className="h-4 w-4 text-blue-600" />
              <span>Question Bank (২০k)</span>
            </Link>
            <Link
              href="/study/today"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <CalendarDays className="h-4 w-4 text-blue-600" />
              <span>Daily Practice</span>
            </Link>
            <Link
              href="/packages"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold"
            >
              <span>প্যাকেজ ও মূল্য</span>
            </Link>
            <Link
              href="/test"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Target className="h-4 w-4 text-emerald-600" />
              <span>Mock Tests</span>
            </Link>
            <Link
              href="/syllabus"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="h-4 w-4 text-amber-600" />
              <span>Syllabus</span>
            </Link>
          </nav>

          {/* Quick Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors"
            >
              <span>সাইন-ইন</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Enter Exam Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Landing Footer */}
      <footer className="bg-[#0c2461] border-t border-blue-950 text-slate-300 text-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span>BCS Crack</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bangla-font">
              বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)-এর অফিসিয়াল সিলেবাস অনুযায়ী সাধারণ বিসিএস ও বিশেষ বিসিএস প্রস্তুতির আধুনিক অনলাইন এক্সাম পোর্টাল।
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              স্টুডেন্ট টুলস
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  ড্যাশবোর্ড
                </Link>
              </li>
              <li>
                <Link href="/question-bank" className="hover:text-white transition-colors">
                  ২০,০০০ ভেরিফাইড প্রশ্ন ব্যাংক
                </Link>
              </li>
              <li>
                <Link href="/study/today" className="hover:text-white transition-colors">
                  দৈনিক সক্রিয় স্মরণ
                </Link>
              </li>
              <li>
                <Link href="/test" className="hover:text-white transition-colors">
                  মডেল টেস্ট
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              সিলেবাস ও ট্র্যাক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/syllabus" className="hover:text-white transition-colors">
                  সাধারণ বিসিএস প্রিলিমিনারি (১০ বিষয়)
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="hover:text-white transition-colors">
                  ৫১তম বিশেষ বিসিএস (সহকারী সার্জন)
                </Link>
              </li>
              <li>
                <Link href="/mistake-notebook" className="hover:text-white transition-colors">
                  ভুল খাতা ও রিট্রাই
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              কনটেন্ট ও অ্যাডমিন
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin/sources" className="hover:text-white transition-colors">
                  সোর্স ম্যানেজমেন্ট
                </Link>
              </li>
              <li>
                <Link href="/admin/question-bank/review" className="hover:text-white transition-colors">
                  প্রশ্ন ব্যাংক রিভিউ
                </Link>
              </li>
              <li>
                <Link href="/admin/question-bank/coverage" className="hover:text-white transition-colors">
                  সিলেবাস কভারেজ অডিট
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-blue-900/60 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} BCS Crack. All Rights Reserved.</p>
          <p className="bangla-font">সর্বস্বত্ব সংরক্ষিত • বিসিএস প্রিলিমিনারি প্রস্তুতি পোর্টাল</p>
        </div>
      </footer>
    </div>
  );
}
