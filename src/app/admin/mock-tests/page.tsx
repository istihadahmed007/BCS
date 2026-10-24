'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Eye,
  FileCheck,
  Layers,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Target,
  Trash2,
} from 'lucide-react';
import { MockTestCategory, MockTestDefinition } from '@/types';

export default function AdminMockTestsPage() {
  const [tests, setTests] = useState<MockTestDefinition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [trackFilter, setTrackFilter] = useState<string>('all');

  // Preview modal
  const [previewTest, setPreviewTest] = useState<MockTestDefinition | null>(null);

  const fetchTests = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/mock-tests');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTests(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const filteredTests = tests.filter((t) => {
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    if (trackFilter !== 'all' && t.examTrackId !== trackFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.titleBn && t.titleBn.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Mock Test Configuration & Exam Builder
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            মডেল টেস্ট কনফিগারেশন, সিলেবাস অনুযায়ী প্রশ্ন বন্টন, টাইমার ও নেগেটিভ মার্কিং ব্যবস্থাপনা।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            মোট টেস্ট: {tests.length} টি
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="টেস্টের শিরোনাম খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium"
          >
            <option value="all">সকল ক্যাটাগরি</option>
            <option value="full_length">Full-Length Official</option>
            <option value="subject_wise">Subject-Wise</option>
            <option value="topic_wise">Topic-Wise</option>
            <option value="mixed_practice">Mixed Practice</option>
            <option value="previous_year">Previous-Year Full Paper</option>
            <option value="special_bcs_health">Special BCS Health</option>
          </select>

          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium"
          >
            <option value="all">সকল ট্র্যাক</option>
            <option value="general_bcs">General BCS</option>
            <option value="special_bcs_health_51_2026">Special BCS Health (51st)</option>
          </select>
        </div>

        <button
          type="button"
          onClick={fetchTests}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-600"
          title="রিফ্রেশ"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Tests Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">লোড হচ্ছে...</div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">আইডি ও শিরোনাম</th>
                  <th className="py-3 px-4">ক্যাটাগরি</th>
                  <th className="py-3 px-4">ট্র্যাক / স্ট্রিম</th>
                  <th className="py-3 px-4 text-center">প্রশ্ন সংখ্যা</th>
                  <th className="py-3 px-4 text-center">সময়</th>
                  <th className="py-3 px-4 text-center">মার্কিং স্কিম</th>
                  <th className="py-3 px-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white bangla-font">
                        {test.titleBn || test.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{test.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-semibold text-[10px] uppercase">
                        {test.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-700 dark:text-slate-300 font-medium">
                        {test.examTrackId === 'general_bcs' ? 'General BCS' : 'Special BCS Health'}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize">{test.professionalStream}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 dark:text-white">
                      {test.totalQuestions}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                      {test.durationMinutes} মি.
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-[11px]">
                      <span className="text-emerald-600 font-bold">+{test.correctMark}</span> /{' '}
                      <span className="text-red-600 font-bold">-{test.wrongPenalty}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewTest(test)}
                          className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                          title="প্রিভিউ"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <Link
                          href="/mock-tests"
                          target="_blank"
                          className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-600"
                          title="লাইভ প্রিভিউ"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTest && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                মডেল টেস্ট কনফিগারেশন বিবরণ
              </h3>
              <button
                type="button"
                onClick={() => setPreviewTest(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                  {previewTest.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 bangla-font">
                  {previewTest.titleBn || previewTest.title}
                </h4>
                <p className="text-slate-500 mt-1">{previewTest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">মোট প্রশ্ন:</span>
                  <div className="font-bold">{previewTest.totalQuestions} টি</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">মোট সময়:</span>
                  <div className="font-bold">{previewTest.durationMinutes} মিনিট</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">সঠিক উত্তর:</span>
                  <div className="font-bold text-emerald-600">+{previewTest.correctMark} মার্ক</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">নেগেটিভ পেনাল্টি:</span>
                  <div className="font-bold text-red-600">-{previewTest.wrongPenalty} মার্ক</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500">
                ক্যানোনিকাল আইডি: <strong className="font-mono text-slate-700 dark:text-slate-300">{previewTest.id}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setPreviewTest(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
