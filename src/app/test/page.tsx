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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hub Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-2">
              <Target className="h-3.5 w-3.5" />
              <span>Server-Authoritative Mock Test Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              BCS Examination Testing Center
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 bangla-font mt-1">
              প্রকৃত পরীক্ষার নিয়মে নির্ভুল সার্ভার স্কোরিং (+১.০০ ও -০.৫০ নেগেটিভ মার্কিং) এবং রিয়েল-টাইম টাইমার।
            </p>
          </div>

          {/* Track Selector Toggle */}
          <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedTrack('special_bcs_health_51_2026')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTrack === 'special_bcs_health_51_2026'
                  ? 'bg-emerald-600 text-white shadow-sm'
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
                  ? 'bg-sky-600 text-white shadow-sm'
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Diagnostic Test */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  Recommended First
                </span>
                <Clock className="h-4 w-4 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Diagnostic Baseline Test
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed bangla-font">
                ১০ মিনিটের দ্রুত ডায়াগনস্টিক পরীক্ষার মাধ্যমে আপনার বর্তমান প্রস্তুতি ও সিলেবাস কভারেজের প্রারম্ভিক ভিত্তি (Baseline) নির্ধারণ।
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">10 High-Yield MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">10 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Negative Marking:</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">-0.50 Mark</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => startTest('diagnostic', 'Diagnostic Readiness Baseline', 10)}
                disabled={isLaunching}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Launch Diagnostic Test</span>
              </button>
            </div>
          </div>

          {/* Card 2: Full-Length Official Mock Exam */}
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Full Circular Match
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-400 text-xs font-bold">
                  200 MCQs / 120 Min
                </span>
                <Clock className="h-4 w-4 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                51st Special BCS Full Mock Exam
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed bangla-font">
                অফিসিয়াল সার্কুলার অনুযায়ী ২০০টি প্রশ্ন, ১২০ মিনিট, সাধারণ বিষয় ১০০ + প্রফেশনাল ১০০ এবং -০.৫০ নেগেটিভ মার্কিং।
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">200 Written MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">120 Minutes (7,200s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Correct / Wrong:</span>
                  <span className="font-semibold text-emerald-600">+1.0 / -0.50</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => startTest('full_mock', '51st Special BCS Health Full Mock Test', 120)}
                disabled={isLaunching}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Target className="h-3.5 w-3.5" />
                <span>Begin 120-Minute Full Mock</span>
              </button>
            </div>
          </div>

          {/* Card 3: Rapid Topic Practice Drill */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-bold">
                  Quick Sprint
                </span>
                <Clock className="h-4 w-4 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Focused Topic Quiz Drill
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed bangla-font">
                নির্দিষ্ট টপিকের দুর্বলতা কাটাতে স্বল্প সময়ের ৫-১০টি প্রশ্নের দ্রুত সমাধান ও তাৎক্ষণিক ব্যাখ্যা।
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">5 High-Yield MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">5 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Outcome:</span>
                  <span className="font-semibold text-purple-600">Immediate Error Insights</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => startTest('topic_quiz', 'High-Yield Topic Quiz Drill', 5)}
                disabled={isLaunching}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs transition-colors disabled:opacity-50"
              >
                <BookOpen className="h-3.5 w-3.5 text-purple-600" />
                <span>Start Rapid Topic Drill</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scoring & Anti-Cheat Rules Box */}
        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Server-Side Deterministic Scoring Rules</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
            পরীক্ষা শুরু হওয়ার সাথে সাথেই প্রতিটি প্রশ্নের স্ন্যাপশট ও সঠিক উত্তর সার্ভারে সংরক্ষিত হয়। কোনো ব্রাউজার রিকোয়েস্টের মাধ্যমে মার্ক বা টাইমার পরিবর্তন করা সম্ভব নয়। ভুল উত্তরের জন্য ০.৫০ নম্বর স্বয়ংক্রিয়ভাবে কর্তন করা হবে।
          </p>
        </div>
      </div>
    </div>
  );
}
