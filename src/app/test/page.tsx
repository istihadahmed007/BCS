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
  Info,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Zap,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-6">
      {/* Top Banner / Pill Nav Bar inspired by reference screenshot */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E3E8F2] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[#E3E8F2]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center shrink-0 border border-[#6538F5]/15">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#17233F] tracking-tight">
                  BCS Examination Testing Center
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#059669] text-[11px] font-bold border border-[#059669]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                  Live Exam Engine
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#66748B] bangla-font mt-0.5">
                প্রকৃত বিসিএস পরীক্ষার নিয়মে সার্ভার-ভেরিফাইড প্রশ্নপত্র, -০.৫০ নেগেটিভ মার্কিং এবং নিখুঁত টাইমার।
              </p>
            </div>
          </div>

          {/* Segmented Pill Tabs for Tracks */}
          <div className="inline-flex items-center p-1.5 bg-[#F5F7FC] rounded-2xl border border-[#E3E8F2] self-start lg:self-center">
            <button
              type="button"
              onClick={() => setSelectedTrack('special_bcs_health_51_2026')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTrack === 'special_bcs_health_51_2026'
                  ? 'bg-[#6538F5] text-white shadow-sm'
                  : 'text-[#66748B] hover:text-[#17233F]'
              }`}
            >
              ৫১তম বিশেষ বিসিএস (স্বাস্থ্য)
            </button>
            <button
              type="button"
              onClick={() => setSelectedTrack('general_bcs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTrack === 'general_bcs'
                  ? 'bg-[#6538F5] text-white shadow-sm'
                  : 'text-[#66748B] hover:text-[#17233F]'
              }`}
            >
              সাধারণ বিসিএস ক্যাডার
            </button>
          </div>
        </div>

        {/* If Special Health, Professional Stream Selector bar */}
        {selectedTrack === 'special_bcs_health_51_2026' && (
          <div className="mt-4 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFF] p-3.5 rounded-2xl border border-[#EDF3FF]">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#E8F8F0] text-[#059669] flex items-center justify-center shrink-0">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#17233F]">
                  প্রফেশনাল ক্যাডার স্ট্রিম নির্বাচন করুন
                </p>
                <p className="text-[11px] text-[#66748B] bangla-font">
                  সহকারী সার্জন (MBBS) ও সহকারী ডেন্টাল সার্জন (BDS) এর জন্য স্বতন্ত্র ১০০ নম্বরের সিলেবাস
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 self-start sm:self-center">
              <button
                type="button"
                onClick={() => setSelectedStream('assistant_surgeon')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedStream === 'assistant_surgeon'
                    ? 'border-[#059669] bg-[#059669] text-white shadow-xs'
                    : 'border-[#E3E8F2] bg-white text-[#17233F] hover:bg-slate-50'
                }`}
              >
                Assistant Surgeon (MBBS)
              </button>
              <button
                type="button"
                onClick={() => setSelectedStream('assistant_dental_surgeon')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedStream === 'assistant_dental_surgeon'
                    ? 'border-[#059669] bg-[#059669] text-white shadow-xs'
                    : 'border-[#E3E8F2] bg-white text-[#17233F] hover:bg-slate-50'
                }`}
              >
                Dental Surgeon (BDS)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Test Options Grid - 4 Bright Cards matching reference layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: 100M Professional Part (for Health) or Special Subject Part */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#059669]/30 flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#059669] text-white text-[10px] font-black px-3.5 py-1 rounded-bl-2xl uppercase tracking-wider">
            {selectedStream === 'assistant_surgeon' ? 'MBBS Part' : 'BDS Part'}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#E8F8F0] text-[#059669] text-xs font-black">
                100 MCQs • 60 Min
              </span>
              <div className="h-8 w-8 rounded-xl bg-[#E8F8F0] text-[#059669] flex items-center justify-center">
                <Stethoscope className="h-4 w-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#17233F] group-hover:text-[#059669] transition-colors">
                Professional Part Model Test
              </h3>
              <p className="text-xs font-bold text-[#059669] mt-0.5">
                {selectedStream === 'assistant_surgeon'
                  ? 'সহকারী সার্জন (মেডিকেল ১ম ও ২য় পত্র)'
                  : 'সহকারী ডেন্টাল সার্জন (ডেন্টাল ১ম ও ২য় পত্র)'}
              </p>
            </div>

            <p className="text-xs text-[#66748B] leading-relaxed bangla-font">
              অফিসিয়াল সিলেবাসের ৫০ নম্বর ১ম পত্র + ৫০ নম্বর ২য় পত্রের সমন্বয়ে ১০০ নম্বরের স্বতন্ত্র প্রফেশনাল মডেল টেস্ট।
            </p>

            <div className="space-y-2 text-xs text-[#66748B] pt-3 border-t border-[#E3E8F2]">
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Question Pool:</span>
                <span className="font-bold text-[#17233F]">100 Pro MCQs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Exam Duration:</span>
                <span className="font-bold text-[#17233F] font-mono">60 Minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Scoring Rules:</span>
                <span className="font-bold text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-md">+1.0 / -0.50</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E3E8F2]">
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
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Begin 100M Professional Test</span>
            </button>
          </div>
        </div>

        {/* Card 2: 100M General Part */}
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8F2] flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#EDF3FF] text-[#2563EB] text-xs font-black">
                100 MCQs • 60 Min
              </span>
              <div className="h-8 w-8 rounded-xl bg-[#EDF3FF] text-[#2563EB] flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#17233F] group-hover:text-[#2563EB] transition-colors">
                General Part Model Test
              </h3>
              <p className="text-xs font-bold text-[#2563EB] mt-0.5">
                আবশ্যিক সাধারণ ৬টি বিষয়
              </p>
            </div>

            <p className="text-xs text-[#66748B] leading-relaxed bangla-font">
              বাংলা ২০, ইংরেজি ২০, বাংলাদেশ ২০, আন্তর্জাতিক ২০, গণিত ১০ এবং মানসিক দক্ষতা ১০ নম্বরের সমন্বিত টেস্ট।
            </p>

            <div className="space-y-2 text-xs text-[#66748B] pt-3 border-t border-[#E3E8F2]">
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Question Pool:</span>
                <span className="font-bold text-[#17233F]">100 General MCQs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Exam Duration:</span>
                <span className="font-bold text-[#17233F] font-mono">60 Minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Scoring Rules:</span>
                <span className="font-bold text-[#2563EB] bg-[#EDF3FF] px-2 py-0.5 rounded-md">+1.0 / -0.50</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E3E8F2]">
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
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Begin 100M General Test</span>
            </button>
          </div>
        </div>

        {/* Card 3: 200M Official Full Mock Simulation (Now Bright White with Purple Glow) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#6538F5] flex flex-col justify-between shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#6538F5] text-white text-[10px] font-black px-3.5 py-1 rounded-bl-2xl uppercase tracking-wider">
            Official 200 Marks
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#F0EBFF] text-[#6538F5] text-xs font-black">
                200 MCQs • 120 Min
              </span>
              <div className="h-8 w-8 rounded-xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center">
                <Target className="h-4 w-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#17233F] group-hover:text-[#6538F5] transition-colors">
                Full-Length Simulation
              </h3>
              <p className="text-xs font-bold text-[#6538F5] mt-0.5">
                সাধারণ ১০০ + প্রফেশনাল ১০০
              </p>
            </div>

            <p className="text-xs text-[#66748B] leading-relaxed bangla-font">
              অফিসিয়াল বিপিএসসি সার্কুলার অনুযায়ী হুবহু ১২০ মিনিটের পরীক্ষা, আলাদা সেকশন ফলাফল এবং স্বয়ংক্রিয় নেগেটিভ মার্কিং।
            </p>

            <div className="space-y-2 text-xs text-[#66748B] pt-3 border-t border-[#E3E8F2]">
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Question Pool:</span>
                <span className="font-bold text-[#17233F]">200 MCQs (100G + 100P)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Exam Duration:</span>
                <span className="font-bold text-[#6538F5] font-mono">120 Minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Scoring Rules:</span>
                <span className="font-bold text-[#6538F5] bg-[#F0EBFF] px-2 py-0.5 rounded-md">+1.0 / -0.50</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E3E8F2]">
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
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#6538F5] hover:bg-[#8055F7] text-white font-bold text-xs shadow-md shadow-[#6538F5]/25 transition-all disabled:opacity-50"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Begin 120M Full Simulation</span>
            </button>
          </div>
        </div>

        {/* Card 4: Diagnostic Baseline & Rapid Drills */}
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8F2] flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FFF5E6] text-[#D97706] text-xs font-black">
                Rapid Drill • 10 Min
              </span>
              <div className="h-8 w-8 rounded-xl bg-[#FFF5E6] text-[#D97706] flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#17233F] group-hover:text-[#D97706] transition-colors">
                Diagnostic Baseline
              </h3>
              <p className="text-xs font-bold text-[#D97706] mt-0.5">
                ১০ মিনিটের প্রস্তুতি যাচাই
              </p>
            </div>

            <p className="text-xs text-[#66748B] leading-relaxed bangla-font">
              ১০টি বাছাইকৃত হাই-ইল্ড প্রশ্নের মাধ্যমে আপনার বর্তমান প্রস্তুতি ও টপিকভিত্তিক দুর্বলতা দ্রুত শনাক্ত করুন।
            </p>

            <div className="space-y-2 text-xs text-[#66748B] pt-3 border-t border-[#E3E8F2]">
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Question Pool:</span>
                <span className="font-bold text-[#17233F]">10 High-Yield MCQs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Exam Duration:</span>
                <span className="font-bold text-[#17233F] font-mono">10 Minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8792A5]">Scoring Rules:</span>
                <span className="font-bold text-[#DC2626] bg-[#FEF0F0] px-2 py-0.5 rounded-md">-0.50 Penalty</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E3E8F2]">
            <button
              type="button"
              onClick={() => startTest('diagnostic', 'Diagnostic Readiness Baseline', 10)}
              disabled={isLaunching}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#17233F] hover:bg-[#203158] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Launch Diagnostic Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notice & Server Integrity Box - Styled exactly like reference widget notice box */}
      <div className="rounded-3xl p-5 sm:p-6 bg-[#FFF5E6]/60 border border-[#D97706]/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-2xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-[#D97706] tracking-wider">
                Exam Integrity & Anti-Cheat Protocol
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706] font-bold">
                Server-Side Verified
              </span>
            </div>
            <p className="text-xs text-[#66748B] leading-relaxed bangla-font mt-1">
              পরীক্ষা শুরু হওয়ার সাথে সাথেই প্রতিটি প্রশ্নের স্ন্যাপশট ও অফিশিয়াল উত্তর সার্ভারে সংরক্ষিত হয়। কোনো ব্রাউজার রিকোয়েস্টের মাধ্যমে মার্ক বা টাইমার পরিবর্তন করা সম্ভব নয়। ভুল উত্তরের জন্য ০.৫০ নম্বর স্বয়ংক্রিয়ভাবে কর্তন করা হবে।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <Link
            href="/syllabus"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E3E8F2] text-xs font-bold text-[#17233F] hover:bg-slate-50 shadow-2xs transition-all"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#6538F5]" />
            <span>Syllabus Breakdown</span>
          </Link>
          <Link
            href="/question-bank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6538F5] text-white text-xs font-bold hover:bg-[#8055F7] shadow-xs transition-all"
          >
            <span>Browse Question Bank</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
