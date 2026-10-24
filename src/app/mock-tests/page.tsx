'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  Play,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { ExamTrackId, MockTestCategory, MockTestDefinition, ProfessionalStreamId } from '@/types';

const CATEGORIES: Array<{
  id: MockTestCategory | 'all';
  labelEn: string;
  labelBn: string;
  badge?: string;
}> = [
  { id: 'all', labelEn: 'All Tests', labelBn: 'সকল টেস্ট' },
  { id: 'full_length', labelEn: 'Full-Length Official Mock', labelBn: 'পূর্ণাঙ্গ মডেল টেস্ট (২০০)', badge: 'Official' },
  { id: 'subject_wise', labelEn: 'Subject-Wise Mock', labelBn: 'বিষয়ভিত্তিক টেস্ট' },
  { id: 'topic_wise', labelEn: 'Topic-Wise Mock', labelBn: 'অধ্যায়ভিত্তিক স্পেশাল' },
  { id: 'mixed_practice', labelEn: 'Mixed Practice Tests', labelBn: 'মিক্সড প্র্যাকটিস টেস্ট' },
  { id: 'previous_year', labelEn: 'Past Paper Simulations', labelBn: 'বিগত বছরের সিমুলেশন', badge: 'Authentic' },
  { id: 'special_bcs_health', labelEn: 'Special BCS Health', labelBn: 'বিশেষ বিসিএস (স্বাস্থ্য)', badge: 'Health' },
];

export default function MockTestsHubPage() {
  const router = useRouter();

  const [selectedTrack, setSelectedTrack] = useState<ExamTrackId>('general_bcs');
  const [selectedStream, setSelectedStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [selectedCategory, setSelectedCategory] = useState<MockTestCategory | 'all'>('all');

  const [tests, setTests] = useState<MockTestDefinition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Pre-test instruction preview modal
  const [activeTestModal, setActiveTestModal] = useState<MockTestDefinition | null>(null);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  // Load Mock Tests
  useEffect(() => {
    async function fetchTests() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('track', selectedTrack);
        if (selectedTrack === 'special_bcs_health_51_2026') {
          params.set('stream', selectedStream);
        }
        if (selectedCategory !== 'all') {
          params.set('category', selectedCategory);
        }

        const res = await fetch(`/api/mock-tests?${params.toString()}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTests(json.data);
        }
      } catch (err) {
        console.error('Failed to load mock tests:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTests();
  }, [selectedTrack, selectedStream, selectedCategory]);

  // Start Test Attempt
  const handleConfirmStart = async () => {
    if (!activeTestModal) return;
    setIsLaunching(true);

    try {
      const res = await fetch('/api/mock-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: activeTestModal.id,
          userId: 'candidate-student-1',
        }),
      });

      const json = await res.json();
      if (json.success && json.data?.id) {
        router.push(`/mock-tests/${json.data.id}`);
      } else {
        alert(json.error || 'পরীক্ষা শুরু করতে ব্যর্থ হয়েছে');
      }
    } catch (e: any) {
      alert('Error launching test: ' + e.message);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E3E8F2] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[#E3E8F2]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center shrink-0 border border-[#6538F5]/15">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#17233F] tracking-tight">
                  BCS Mock Test Examination Center
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#059669] text-xs font-bold border border-[#059669]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                  Live Exam Simulation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#66748B] bangla-font mt-0.5">
                বিপিএসসি অফিসিয়াল পরীক্ষার নিয়মে -০.৫০ নেগেটিভ মার্কিং, নিখুঁত টাইমার এবং পুঙ্খানুপুঙ্খ পারফরম্যান্স অ্যানালিটিক্স।
              </p>
            </div>
          </div>

          {/* Exam Track Pill Selector */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <div className="inline-flex items-center p-1 bg-[#F5F7FC] rounded-2xl border border-[#E3E8F2]">
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('general_bcs');
                  setSelectedCategory('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTrack === 'general_bcs'
                    ? 'bg-[#6538F5] text-white shadow-xs'
                    : 'text-[#66748B] hover:text-[#17233F]'
                }`}
              >
                সাধারণ বিসিএস
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('special_bcs_health_51_2026');
                  setSelectedCategory('special_bcs_health');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTrack === 'special_bcs_health_51_2026'
                    ? 'bg-[#6538F5] text-white shadow-xs'
                    : 'text-[#66748B] hover:text-[#17233F]'
                }`}
              >
                ৫১তম বিশেষ (স্বাস্থ্য)
              </button>
            </div>

            {/* Special BCS Stream Selector */}
            {selectedTrack === 'special_bcs_health_51_2026' && (
              <div className="inline-flex items-center p-1 bg-[#F0EBFF] rounded-2xl border border-[#6538F5]/20">
                <button
                  type="button"
                  onClick={() => setSelectedStream('assistant_surgeon')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedStream === 'assistant_surgeon'
                      ? 'bg-white text-[#6538F5] shadow-xs'
                      : 'text-[#66748B] hover:text-[#17233F]'
                  }`}
                >
                  <Stethoscope className="h-3.5 w-3.5" />
                  সহকারী সার্জন (MBBS)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStream('assistant_dental_surgeon')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedStream === 'assistant_dental_surgeon'
                      ? 'bg-white text-[#6538F5] shadow-xs'
                      : 'text-[#66748B] hover:text-[#17233F]'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  সহকারী ডেন্টাল সার্জন (BDS)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 6 Required Category Pill Tabs */}
        <div className="pt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#17233F] text-white shadow-xs'
                    : 'bg-[#F5F7FC] text-[#66748B] border border-[#E3E8F2] hover:bg-white hover:text-[#17233F]'
                }`}
              >
                <span>{cat.labelBn}</span>
                {cat.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#F0EBFF] text-[#6538F5]'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mock Tests Cards Grid */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E3E8F2] shadow-xs flex flex-col items-center justify-center gap-3">
          <RefreshCw className="h-7 w-7 text-[#6538F5] animate-spin" />
          <p className="text-xs font-bold text-[#66748B] bangla-font">মডেল টেস্ট লোড করা হচ্ছে...</p>
        </div>
      ) : tests.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E3E8F2] shadow-xs">
          <Target className="h-10 w-10 text-[#8792A5] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[#17233F]">কোন মডেল টেস্ট পাওয়া যায়নি</h3>
          <p className="text-xs text-[#66748B] mt-1 max-w-md mx-auto">
            নির্বাচিত ক্যাটাগরিতে এই মুহূর্তে কোনো পরীক্ষা উপলব্ধ নেই। অন্য ক্যাটাগরি নির্বাচন করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-5 border border-[#E3E8F2] hover:border-[#6538F5]/30 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase text-[#6538F5] bg-[#F0EBFF] px-2.5 py-0.5 rounded-full">
                    {test.category.replace('_', ' ')}
                  </span>
                  {test.isOfficialPattern && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-md">
                      <ShieldCheck className="h-3 w-3" />
                      Official Pattern
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-[#17233F] leading-snug bangla-font">
                  {test.titleBn || test.title}
                </h3>
                <p className="text-xs text-[#66748B] mt-1">{test.description}</p>

                {/* Metrics Box */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#E3E8F2]/60 text-center">
                  <div className="bg-[#F5F7FC] p-2 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-[#8792A5]">প্রশ্ন</div>
                    <div className="text-sm font-black text-[#17233F]">{test.totalQuestions}</div>
                  </div>
                  <div className="bg-[#F5F7FC] p-2 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-[#8792A5]">সময়</div>
                    <div className="text-sm font-black text-[#17233F]">{test.durationMinutes} মি.</div>
                  </div>
                  <div className="bg-[#F5F7FC] p-2 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-[#8792A5]">মার্কস</div>
                    <div className="text-sm font-black text-[#6538F5]">{test.totalMarks}</div>
                  </div>
                </div>

                {/* Scheme pill */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#66748B] bg-[#FAFBFD] p-2 rounded-xl border border-[#E3E8F2]">
                  <span>সঠিক উত্তর: <strong className="text-[#059669]">+{test.correctMark.toFixed(1)}</strong></span>
                  <span>ভুল উত্তর: <strong className="text-red-600">-{test.wrongPenalty.toFixed(2)}</strong></span>
                  <span>অনুত্তরিত: <strong>০.০</strong></span>
                </div>
              </div>

              {/* Action Button: Opens Pre-Exam Instructions */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTestModal(test)}
                  className="w-full py-2.5 rounded-xl text-xs font-black bg-[#6538F5] text-white shadow-xs hover:bg-[#5326d9] transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="h-4 w-4" />
                  টেস্ট শুরু করুন (Start Test)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================================================= */}
      {/* Pre-Test Instruction & Confirmation Modal                         */}
      {/* ================================================================= */}
      {activeTestModal && (
        <div className="fixed inset-0 z-50 bg-[#17233F]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E3E8F2] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F2]">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#6538F5]" />
                <h3 className="text-base font-black text-[#17233F]">
                  পরীক্ষার নিয়মাবলী ও নির্দেশনা
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTestModal(null)}
                className="p-1 rounded-lg text-[#8792A5] hover:text-[#17233F]"
                aria-label="Close instructions dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Test Details */}
            <div>
              <span className="text-[11px] font-black uppercase text-[#6538F5] bg-[#F0EBFF] px-2.5 py-0.5 rounded-full">
                {activeTestModal.category.replace('_', ' ')}
              </span>
              <h2 className="text-lg font-black text-[#17233F] mt-1.5 bangla-font">
                {activeTestModal.titleBn || activeTestModal.title}
              </h2>
              <p className="text-xs text-[#66748B] mt-1">{activeTestModal.description}</p>
            </div>

            {/* Crucial Exam Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-[#F5F7FC] p-2.5 rounded-xl border border-[#E3E8F2]">
                <div className="text-[10px] uppercase font-bold text-[#8792A5]">মোট প্রশ্ন</div>
                <div className="text-base font-black text-[#17233F]">{activeTestModal.totalQuestions} টি</div>
              </div>
              <div className="bg-[#F5F7FC] p-2.5 rounded-xl border border-[#E3E8F2]">
                <div className="text-[10px] uppercase font-bold text-[#8792A5]">মোট সময়</div>
                <div className="text-base font-black text-[#17233F]">{activeTestModal.durationMinutes} মিনিট</div>
              </div>
              <div className="bg-[#F5F7FC] p-2.5 rounded-xl border border-[#E3E8F2]">
                <div className="text-[10px] uppercase font-bold text-[#059669]">সঠিক উত্তর</div>
                <div className="text-base font-black text-[#059669]">+{activeTestModal.correctMark.toFixed(1)}</div>
              </div>
              <div className="bg-[#F5F7FC] p-2.5 rounded-xl border border-[#E3E8F2]">
                <div className="text-[10px] uppercase font-bold text-red-600">নেগেটিভ মার্ক</div>
                <div className="text-base font-black text-red-600">-{activeTestModal.wrongPenalty.toFixed(2)}</div>
              </div>
            </div>

            {/* Official Rules Checklist */}
            <div className="bg-[#FAFBFD] p-3.5 rounded-2xl border border-[#E3E8F2] space-y-2 text-xs text-[#17233F]">
              <div className="font-bold text-[#6538F5] flex items-center gap-1.5">
                <Info className="h-4 w-4" />
                গুরুত্বপূর্ণ নির্দেশনাবলী:
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#66748B] pl-4 list-disc bangla-font">
                <li>&lsquo;পরীক্ষা শুরু করুন&rsquo; বাটনে ক্লিক করার সাথে সাথে সার্ভার টাইমার গণনা শুরু হবে।</li>
                <li>নির্ধারিত সময় শেষ হওয়া মাত্র পরীক্ষা স্বয়ংক্রিয়ভাবে (Auto-submit) জমা হয়ে যাবে।</li>
                <li>প্রতিটি ভুল উত্তরের জন্য ০.৫০ নম্বর কাটা যাবে, যা আপনার মোট অর্জিত নম্বর থেকে বাদ পড়বে।</li>
                <li>পরীক্ষা চলাকালীন যেকোনো প্রশ্নে রিভিউ (Flag) করার এবং পরবর্তীতে ফিরে আসার সুযোগ রয়েছে।</li>
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setActiveTestModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F5F7FC] text-[#66748B] hover:text-[#17233F]"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmStart}
                disabled={isLaunching}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-[#6538F5] text-white shadow-md hover:bg-[#5326d9] flex items-center gap-2"
              >
                {isLaunching ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    পরীক্ষা প্রস্তুত হচ্ছে...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    আমি প্রস্তুত, পরীক্ষা শুরু করুন
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
