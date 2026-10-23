'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  RotateCcw,
  Sparkles,
  Stethoscope,
  Target,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId, TestType } from '@/types';

export default function MockTestHubPage() {
  const router = useRouter();
  const [selectedTrack, setSelectedTrack] = useState<ExamTrackId>('special_bcs_health_51_2026');
  const [selectedStream, setSelectedStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [isLaunching, setIsLaunching] = useState(false);

  const startTest = async (testType: TestType, title: string, durationMinutes?: number) => {
    setIsLaunching(true);
    try {
      const res = await fetch('/api/test/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'candidate-user-1',
          examTrackId: selectedTrack,
          professionalStream: selectedTrack === 'general_bcs' ? 'general' : selectedStream,
          testType,
          title,
          durationMinutes,
        }),
      });

      const json = await res.json();
      if (json.success && json.data?.id) {
        router.push(`/test/${json.data.id}`);
      } else {
        alert(json.error || 'Failed to start test session');
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
      {/* Hub Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold mb-2">
            <Target className="h-3.5 w-3.5" />
            <span>Server-Authoritative Mock Test Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            BCS Examination Testing Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 bangla-font mt-1">
            প্রকৃত পরীক্ষার নিয়মে নির্ভুল সার্ভার স্কোরিং (+১.০০ ও -০.৫০ নেগেটিভ মার্কিং) এবং রিয়েল-টাইম টাইমার।
          </p>
        </div>

        {/* Track Selector Toggle */}
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            type="button"
            onClick={() => setSelectedTrack('special_bcs_health_51_2026')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTrack === 'special_bcs_health_51_2026'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            51st Special Health
          </button>
          <button
            type="button"
            onClick={() => setSelectedTrack('general_bcs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTrack === 'general_bcs'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            General BCS
          </button>
        </div>
      </div>

        {/* If Special Health, Stream Switcher */}
        {selectedTrack === 'special_bcs_health_51_2026' && (
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                  Special Health Professional Stream
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 bangla-font">
                  মেডিকেল ও ডেন্টাল সায়েন্সের ১০০ নম্বরের প্রফেশনাল পার্ট আলাদা।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedStream('assistant_surgeon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  selectedStream === 'assistant_surgeon'
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Assistant Surgeon (MBBS)
              </button>
              <button
                type="button"
                onClick={() => setSelectedStream('assistant_dental_surgeon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  selectedStream === 'assistant_dental_surgeon'
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Dental Surgeon (BDS)
              </button>
            </div>
          </div>
        )}

        {/* Test Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Professional Medical / Dental Part (100 Marks) */}
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              {selectedStream === 'assistant_surgeon' ? 'MBBS Part' : 'BDS Part'}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  100 MCQs / 60 Min
                </span>
                <Stethoscope className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Professional Part Model Test
                </h3>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {selectedStream === 'assistant_surgeon'
                    ? 'সহকারী সার্জন (মেডিকেল ১ম ও ২য় পত্র)'
                    : 'সহকারী ডেন্টাল সার্জন (ডেন্টাল ১ম ও ২য় পত্র)'}
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed bangla-font">
                অফিসিয়াল সিলেবাসের ৫০ নম্বর ১ম পত্র + ৫০ নম্বর ২য় পত্রের সমন্বয়ে ১০০ নম্বরের স্বতন্ত্র প্রফেশনাল মডেল টেস্ট।
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">100 Professional MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">60 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Scoring:</span>
                  <span className="font-semibold text-emerald-600">+1.0 / -0.50 Mark</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() =>
                  startTest(
                    'subject_test',
                    selectedStream === 'assistant_surgeon'
                      ? '51st Special BCS Medical Science Professional Model Test (100 Marks)'
                      : '51st Special BCS Dental Science Professional Model Test (100 Marks)',
                    60
                  )
                }
                disabled={isLaunching}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Begin 100M Professional Test</span>
              </button>
            </div>
          </div>

          {/* Card 2: General Part (100 Marks) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-bold">
                  100 MCQs / 60 Min
                </span>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  General Part Model Test
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  আবশ্যিক সাধারণ ৬টি বিষয়
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed bangla-font">
                বাংলা ২০, ইংরেজি ২০, বাংলাদেশ ২০, আন্তর্জাতিক ২০, গণিত ১০ এবং মানসিক দক্ষতা ১০ নম্বরের ১০০ নম্বরের টেস্ট।
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">100 General MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">60 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Scoring:</span>
                  <span className="font-semibold text-emerald-600">+1.0 / -0.50 Mark</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() =>
                  startTest(
                    'subject_test',
                    '51st Special BCS Health General Part Model Test (100 Marks)',
                    60
                  )
                }
                disabled={isLaunching}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Begin 100M General Test</span>
              </button>
            </div>
          </div>

          {/* Card 3: Full-Length Official Mock Exam (200 Marks) */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-2 border-emerald-500/60 rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Circular 200 Marks
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  200 MCQs / 120 Min
                </span>
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  51st Special BCS Full Mock
                </h3>
                <p className="text-xs font-semibold text-emerald-300 mt-0.5">
                  সাধারণ ১০০ + প্রফেশনাল ১০০
                </p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bangla-font">
                অফিসিয়াল সার্কুলার অনুযায়ী হুবহু ১২০ মিনিটের পরীক্ষা, আলাদা সেকশন ফলাফল এবং -০.৫০ নেগেটিভ মার্কিং।
              </p>
              <div className="space-y-1.5 text-xs text-slate-300 pt-1 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-slate-400">Questions:</span>
                  <span className="font-semibold text-white">200 MCQs (100G + 100P)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-semibold text-amber-300 font-mono">120 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scoring:</span>
                  <span className="font-semibold text-emerald-400">+1.0 / -0.50 Mark</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() =>
                  startTest(
                    'full_mock',
                    `51st Special BCS Health Full Mock Test (200 Marks - ${
                      selectedStream === 'assistant_surgeon' ? 'Assistant Surgeon' : 'Dental Surgeon'
                    })`,
                    120
                  )
                }
                disabled={isLaunching}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Target className="h-3.5 w-3.5" />
                <span>Begin 120M Full Simulation</span>
              </button>
            </div>
          </div>

          {/* Card 4: Diagnostic Baseline & Rapid Drills */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-bold">
                  Quick Practice
                </span>
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Diagnostic Baseline
                </h3>
                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
                  ১০ মিনিটের প্রস্তুতি পরীক্ষা
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed bangla-font">
                ১০টি বাছাইকৃত প্রশ্নের মাধ্যমে আপনার বর্তমান প্রস্তুতি ও টপিকভিত্তিক দুর্বলতা যাচাই করুন।
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">10 High-Yield MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">10 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Scoring:</span>
                  <span className="font-semibold text-rose-600">-0.50 Penalty</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => startTest('diagnostic', 'Diagnostic Readiness Baseline', 10)}
                disabled={isLaunching}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs transition-colors disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Launch Diagnostic Test</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scoring & Anti-Cheat Rules Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Server-Side Deterministic Scoring Rules</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
            পরীক্ষা শুরু হওয়ার সাথে সাথেই প্রতিটি প্রশ্নের স্ন্যাপশট ও সঠিক উত্তর সার্ভারে সংরক্ষিত হয়। কোনো ব্রাউজার রিকোয়েস্টের মাধ্যমে মার্ক বা টাইমার পরিবর্তন করা সম্ভব নয়। ভুল উত্তরের জন্য ০.৫০ নম্বর স্বয়ংক্রিয়ভাবে কর্তন করা হবে।
          </p>
        </div>
    </div>
  );
}
