'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  CheckCircle2,
  Database,
  FileCheck2,
  FileUp,
  Globe2,
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin',
      label: 'Admin Overview',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      href: '/admin/sources',
      label: 'Source Registry',
      icon: Globe2,
      active: pathname === '/admin/sources',
    },
    {
      href: '/admin/question-bank/imports',
      label: 'Question Imports',
      icon: FileUp,
      active: pathname === '/admin/question-bank/imports',
    },
    {
      href: '/admin/packages',
      label: 'Packages & Pricing',
      icon: Database,
      active: pathname === '/admin/packages',
    },
    {
      href: '/admin/orders',
      label: 'Orders & Payments',
      icon: ShieldCheck,
      active: pathname === '/admin/orders',
    },
    {
      href: '/admin/users',
      label: 'Users & Subscriptions',
      icon: ShieldAlert,
      active: pathname === '/admin/users',
    },
    {
      href: '/admin/question-access',
      label: 'Free vs Premium Access',
      icon: FileCheck2,
      active: pathname === '/admin/question-access',
    },
    {
      href: '/admin/question-bank/review',
      label: 'Review Queue',
      icon: FileCheck2,
      active: pathname === '/admin/question-bank/review',
    },
    {
      href: '/admin/question-bank/coverage',
      label: 'Coverage & Traceability',
      icon: BarChart3,
      active: pathname === '/admin/question-bank/coverage',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      {/* Sub-header Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                Governance & Verification Control
              </span>
            </div>

            <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      item.active
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {children}
      </div>
    </div>
  );
}
