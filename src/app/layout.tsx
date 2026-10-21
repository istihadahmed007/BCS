import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import {
  BookCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Library,
  ShieldCheck,
  Stethoscope,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'BCS Crack — AI-Personalized Bangladesh Civil Service Preparation Platform',
  description:
    'Dedicated Bangladesh Civil Service platform for 51st Special BCS Health (4,700 Assistant Surgeon & 300 Assistant Dental Surgeon vacancies) and General BCS. Grounded AI study coach, deterministic scoring, and adaptive weakness analysis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
        {/* Top Official Banner */}
        <div className="bg-emerald-950 border-b border-emerald-900 text-emerald-200 text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium bangla-font">
                ৫১তম বিশেষ বিসিএস (স্বাস্থ্য) সার্কুলার ২০২৬: ৫,০০০ ক্যাডার পদ (সহকারী সার্জন ৪,৭০০ + সহকারী ডেন্টাল সার্জন ৩০০)
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-emerald-400">Written MCQ: 200 Marks | 120 Min</span>
              <span className="text-red-400">Wrong Penalty: -0.50</span>
              <a
                href="https://bpsc.gov.bd/pages/psc-exams"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white transition-colors"
              >
                Official BPSC Portal
              </a>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                  BCS Crack
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  Precision Prep Platform
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/question-bank"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors font-bold border border-emerald-200 dark:border-emerald-800/80 shadow-sm"
              >
                <BookCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Question Bank</span>
                <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.2 rounded-full">
                  ২০k
                </span>
              </Link>
              <Link
                href="/study/today"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <CalendarDays className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Daily Practice</span>
              </Link>
              <Link
                href="/test"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Target className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span>Mock Tests</span>
              </Link>
              <Link
                href="/syllabus"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Syllabus</span>
              </Link>
              <Link
                href="/resources"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Library className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Catalog</span>
              </Link>
              <Link
                href="/mistake-notebook"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <FileText className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                <span>Mistakes</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Admin</span>
              </Link>
            </nav>

            {/* Quick Diagnostic / Start Button */}
            <div className="flex items-center gap-3">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Start Diagnostic</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Stethoscope className="h-5 w-5 text-emerald-400" />
                <span>BCS Crack</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed bangla-font">
                বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)-এর অফিসিয়াল সিলেবাস ও সার্কুলার অনুযায়ী ৫০তম ও ৫১তম বিশেষ বিসিএস (স্বাস্থ্য) এবং সাধারণ বিসিএস প্রস্তুতির এআই-চালিত লার্নিং প্ল্যাটফর্ম।
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Evidence-Based & Deterministic</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
                Examination Tracks
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/dashboard?track=special_bcs_health_51_2026&stream=assistant_surgeon" className="hover:text-emerald-400 transition-colors">
                    51st Special BCS — Assistant Surgeon (MBBS)
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard?track=special_bcs_health_51_2026&stream=assistant_dental_surgeon" className="hover:text-emerald-400 transition-colors">
                    51st Special BCS — Assistant Dental Surgeon (BDS)
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard?track=general_bcs" className="hover:text-emerald-400 transition-colors">
                    General BCS (Preliminary 200 Marks)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
                Official Sources & Policies
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://bpsc.gov.bd/pages/psc-exams" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                    BPSC Examination Circulars
                  </a>
                </li>
                <li>
                  <Link href="/question-bank" className="hover:text-emerald-400 font-semibold text-emerald-400 transition-colors">
                    Question Bank (২০,০০০ ভেরিফায়েড প্রশ্ন)
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-emerald-400 transition-colors">
                    Bibliographic Research Catalog (B01–B19)
                  </Link>
                </li>
                <li>
                  <Link href="/admin/sources" className="hover:text-emerald-400 transition-colors">
                    Source Registry (সোর্স রেজিস্ট্রি)
                  </Link>
                </li>
                <li>
                  <Link href="/mistake-notebook" className="hover:text-emerald-400 transition-colors">
                    Mistake Notebook (মিস্টেক নোটবুক)
                  </Link>
                </li>
                <li>
                  <span className="text-slate-500 block">Strict Provenance & Zero Piracy Policy</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
                System Integrity Notice
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exam marks, timing enforcement, and negative marking are executed 100% deterministically by the server. AI models act exclusively as contextual study coaches grounded in verified syllabus topics.
              </p>
              <div className="mt-3 text-[11px] text-slate-500">
                © 2026 BCS Crack. Built for Bangladesh BCS Cadre Aspirants.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
