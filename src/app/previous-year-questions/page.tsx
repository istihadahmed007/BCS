'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowRight,
  BookCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Filter,
  GraduationCap,
  HelpCircle,
  History,
  Layers,
  Lightbulb,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  XCircle,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

interface PreviousYearPaper {
  id: string;
  examTitle: string;
  examTitleBn: string;
  examYear: string;
  trackId: ExamTrackId;
  stream: ProfessionalStreamId | 'all';
  totalQuestions: number;
  durationMinutes: number;
  passMarks: number;
  isAuthenticPaper: boolean;
  verificationStatus: 'verified' | 'needs_review';
  subjectBreakdown: Record<string, number>;
}

interface PaperQuestion {
  id: string;
  subject: string;
  topic: string;
  subtopic: string;
  question_bn: string;
  question_en: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation_bn: string;
  explanation_en: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source_title: string;
  source_page_or_section: string;
  verification_status: string;
}

export default function PreviousYearQuestionsPage() {
  const router = useRouter();

  const [selectedTrack, setSelectedTrack] = useState<ExamTrackId>('general_bcs');
  const [papers, setPapers] = useState<PreviousYearPaper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<PreviousYearPaper | null>(null);

  // Active Paper Questions Mode
  const [activeMode, setActiveMode] = useState<'catalog' | 'practice'>('catalog');
  const [paperQuestions, setPaperQuestions] = useState<PaperQuestion[]>([]);
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<string>('all');
  const [isLoadingPaper, setIsLoadingPaper] = useState(false);

  // Practice state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isLaunchingSimulation, setIsLaunchingSimulation] = useState(false);

  // Fetch Papers List
  useEffect(() => {
    async function loadPapers() {
      try {
        const res = await fetch(`/api/previous-years?track=${selectedTrack}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setPapers(json.data);
        }
      } catch (err) {
        console.error('Failed to load past papers:', err);
      }
    }
    loadPapers();
  }, [selectedTrack]);

  // Load Authentic Questions for Selected Paper
  const handleOpenPaperPractice = async (paper: PreviousYearPaper, subjectFilter = 'all') => {
    setSelectedPaper(paper);
    setActiveSubjectFilter(subjectFilter);
    setIsLoadingPaper(true);
    setActiveMode('practice');
    setSelectedAnswers({});

    try {
      const res = await fetch(
        `/api/previous-years?paperId=${paper.id}&subject=${subjectFilter !== 'all' ? subjectFilter : ''}`
      );
      const json = await res.json();
      if (json.success && json.data) {
        setPaperQuestions(json.data.questions || []);
      }
    } catch (e) {
      console.error('Failed to load paper questions:', e);
    } finally {
      setIsLoadingPaper(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Launch Full Timed Mock Test for this paper
  const handleStartTimedExam = async (paper: PreviousYearPaper) => {
    setIsLaunchingSimulation(true);
    try {
      const res = await fetch('/api/test/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'candidate-student-1',
          examTrackId: paper.trackId,
          professionalStream: paper.stream === 'all' ? 'general' : paper.stream,
          testType: 'previous_year',
          title: paper.examTitleBn || paper.examTitle,
          durationMinutes: paper.durationMinutes,
        }),
      });
      const json = await res.json();
      if (json.success && json.data?.id) {
        router.push(`/test/${json.data.id}`);
      } else {
        alert(json.error || 'পরীক্ষা শুরু করতে ব্যর্থ হয়েছে');
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setIsLaunchingSimulation(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E3E8F2] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[#E3E8F2]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center shrink-0 border border-[#6538F5]/15">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#17233F] tracking-tight">
                  Authentic Previous-Year Examination Papers
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#059669] text-xs font-bold border border-[#059669]/20">
                  <ShieldCheck className="h-3 w-3" />
                  বিপিএসসি অফিসিয়াল প্রশ্ন
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#66748B] bangla-font mt-0.5">
                বিগত সকল বিসিএস পরীক্ষার মূল প্রশ্নপত্রের সঠিক ক্রমবিন্যাস, পূর্ণাঙ্গ পেপার এবং বিষয়ভিত্তিক পর্যালোচনা।
              </p>
            </div>
          </div>

          {/* Exam Track Pill Selector */}
          <div className="inline-flex items-center p-1 bg-[#F5F7FC] rounded-2xl border border-[#E3E8F2] self-start lg:self-center">
            <button
              type="button"
              onClick={() => {
                setSelectedTrack('general_bcs');
                setActiveMode('catalog');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTrack === 'general_bcs'
                  ? 'bg-[#6538F5] text-white shadow-xs'
                  : 'text-[#66748B] hover:text-[#17233F]'
              }`}
            >
              সাধারণ বিসিএস প্রশ্নপত্র
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedTrack('special_bcs_health_51_2026');
                setActiveMode('catalog');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTrack === 'special_bcs_health_51_2026'
                  ? 'bg-[#6538F5] text-white shadow-xs'
                  : 'text-[#66748B] hover:text-[#17233F]'
              }`}
            >
              বিশেষ বিসিএস (স্বাস্থ্য)
            </button>
          </div>
        </div>

        {/* Informational Guidance Notice */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#66748B] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span>
              মূল প্রশ্নপত্রের আসল ক্রম (Original Question Order) শতভাগ অক্ষুণ্ণ রাখা হয়েছে।
            </span>
          </div>
          {activeMode === 'practice' && (
            <button
              type="button"
              onClick={() => setActiveMode('catalog')}
              className="text-xs font-bold text-[#6538F5] hover:underline flex items-center gap-1"
            >
              ← বিগত বছরের সকল প্রশ্নপত্রে ফিরে যান
            </button>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* MODE 1: Catalog of Available Past Papers                          */}
      {/* ================================================================= */}
      {activeMode === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-2xl p-5 border border-[#E3E8F2] hover:border-[#6538F5]/30 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#6538F5] bg-[#F0EBFF] px-2.5 py-0.5 rounded-full">
                    {paper.examYear} সার্কুলার
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-md">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Paper
                  </span>
                </div>

                <h3 className="text-base font-black text-[#17233F] leading-snug bangla-font">
                  {paper.examTitleBn}
                </h3>
                <p className="text-xs text-[#66748B] mt-1">{paper.examTitle}</p>

                {/* Paper Quick Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#E3E8F2]/60 text-center">
                  <div className="bg-[#F5F7FC] p-2 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-[#8792A5]">মোট প্রশ্ন</div>
                    <div className="text-sm font-black text-[#17233F]">{paper.totalQuestions}</div>
                  </div>
                  <div className="bg-[#F5F7FC] p-2 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-[#8792A5]">সময়</div>
                    <div className="text-sm font-black text-[#17233F]">{paper.durationMinutes} মি.</div>
                  </div>
                  <div className="bg-[#F5F7FC] p-2 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-[#8792A5]">নেগেটিভ মার্ক</div>
                    <div className="text-sm font-black text-red-600">-০.৫০</div>
                  </div>
                </div>

                {/* Subject Breakdown Badges */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-[11px] font-bold text-[#8792A5] uppercase tracking-wider">
                    বিষয়ভিত্তিক প্রশ্ন বন্টন:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(paper.subjectBreakdown).map(([subj, count]) => (
                      <span
                        key={subj}
                        className="text-[11px] font-medium bg-[#F5F7FC] text-[#17233F] px-2 py-0.5 rounded-md border border-[#E3E8F2]"
                      >
                        {subj}: <strong className="text-[#6538F5]">{count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenPaperPractice(paper, 'all')}
                  className="w-full py-2.5 rounded-xl text-xs font-black bg-[#6538F5] text-white shadow-xs hover:bg-[#5326d9] transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="h-4 w-4" />
                  প্রশ্নপত্র পড়ুন ও অনুশীলন করুন
                </button>
                <button
                  type="button"
                  onClick={() => handleStartTimedExam(paper)}
                  disabled={isLaunchingSimulation}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-[#F5F7FC] text-[#17233F] border border-[#E3E8F2] hover:bg-white hover:border-[#6538F5]/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="h-3.5 w-3.5 text-[#059669]" />
                  টাইমড এক্সাম সিমুলেশন দিন
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================================================= */}
      {/* MODE 2: Interactive Question Practice of Selected Paper          */}
      {/* ================================================================= */}
      {activeMode === 'practice' && selectedPaper && (
        <div className="space-y-6">
          {/* Paper Control Header & Subject Pills */}
          <div className="bg-white rounded-2xl p-5 border border-[#E3E8F2] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase text-[#6538F5] bg-[#F0EBFF] px-2.5 py-0.5 rounded-full">
                  {selectedPaper.examYear} অফিসিয়াল প্রশ্নপত্র
                </span>
                <h2 className="text-lg font-black text-[#17233F] mt-1 bangla-font">
                  {selectedPaper.examTitleBn}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleStartTimedExam(selectedPaper)}
                disabled={isLaunchingSimulation}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#059669] text-white shadow-xs hover:bg-[#047857] flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Play className="h-3.5 w-3.5" />
                পরীক্ষা দিন (১২০ মিনিট)
              </button>
            </div>

            {/* Subject Filters inside Paper */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E3E8F2]/60">
              <span className="text-xs font-bold text-[#8792A5] mr-1">বিষয় ফিল্টার:</span>
              <button
                type="button"
                onClick={() => handleOpenPaperPractice(selectedPaper, 'all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSubjectFilter === 'all'
                    ? 'bg-[#17233F] text-white'
                    : 'bg-[#F5F7FC] text-[#66748B] hover:text-[#17233F]'
                }`}
              >
                সকল বিষয় ({selectedPaper.totalQuestions})
              </button>
              {Object.entries(selectedPaper.subjectBreakdown).map(([subj, count]) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => handleOpenPaperPractice(selectedPaper, subj)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeSubjectFilter === subj
                      ? 'bg-[#6538F5] text-white shadow-xs'
                      : 'bg-[#F5F7FC] text-[#66748B] hover:text-[#17233F]'
                  }`}
                >
                  {subj} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Questions Stream in Canonical Order */}
          {isLoadingPaper ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E3E8F2] shadow-xs flex flex-col items-center justify-center gap-3">
              <RefreshCw className="h-7 w-7 text-[#6538F5] animate-spin" />
              <p className="text-xs font-bold text-[#66748B] bangla-font">
                অফিসিয়াল প্রশ্নপত্র প্রস্তুত হচ্ছে...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {paperQuestions.map((q, idx) => {
                const userSelected = selectedAnswers[q.id];
                const isAnswered = Boolean(userSelected);

                return (
                  <div
                    key={q.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8F2] hover:border-[#6538F5]/30 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E3E8F2]/60">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-black text-[#6538F5] bg-[#F0EBFF] px-2.5 py-0.5 rounded-md text-[11px]">
                          প্রশ্ন #{idx + 1}
                        </span>
                        <span className="font-bold text-[#17233F] bg-[#F5F7FC] px-2 py-0.5 rounded-md text-[11px] border border-[#E3E8F2]">
                          {q.subject}
                        </span>
                        <span className="text-[10px] font-bold text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-md border border-[#059669]/20">
                          {selectedPaper.examYear} Official
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 pb-4">
                      <h3 className="text-sm sm:text-base font-bold text-[#17233F] leading-relaxed bangla-font">
                        {q.question_bn || q.question_en}
                      </h3>
                      {q.question_en && q.question_bn && (
                        <p className="text-xs text-[#66748B] mt-1 font-sans">{q.question_en}</p>
                      )}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                        const optText = q.options[optKey];
                        const isSelected = userSelected === optKey;
                        const isCorrect = q.correct_option === optKey;

                        let style =
                          'bg-[#F5F7FC] border-[#E3E8F2] text-[#17233F] hover:bg-[#F0EBFF] hover:border-[#6538F5]/30';

                        if (isAnswered) {
                          if (isCorrect) {
                            style = 'bg-[#E8F8F0] border-[#059669] text-[#059669] font-bold';
                          } else if (isSelected && !isCorrect) {
                            style = 'bg-[#FEE2E2] border-[#DC2626] text-[#DC2626] font-bold';
                          } else {
                            style = 'bg-[#F5F7FC] border-[#E3E8F2] text-[#8792A5] opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optKey}
                            type="button"
                            onClick={() =>
                              setSelectedAnswers((prev) => ({ ...prev, [q.id]: optKey }))
                            }
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 ${style}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                                isAnswered && isCorrect
                                  ? 'bg-[#059669] text-white'
                                  : isAnswered && isSelected && !isCorrect
                                  ? 'bg-[#DC2626] text-white'
                                  : isSelected
                                  ? 'bg-[#6538F5] text-white'
                                  : 'bg-white text-[#66748B] border border-[#E3E8F2]'
                              }`}
                            >
                              {optKey}
                            </span>
                            <span className="mt-0.5 leading-snug bangla-font">{optText}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Verified Explanation upon answer */}
                    {isAnswered && (
                      <div className="mt-4 pt-3 border-t border-[#E3E8F2] bg-[#FAFBFD] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-2xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold">
                          {userSelected === q.correct_option ? (
                            <span className="text-[#059669] flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" /> সঠিক উত্তর (+১.০)
                            </span>
                          ) : (
                            <span className="text-[#DC2626] flex items-center gap-1">
                              <XCircle className="h-4 w-4" /> ভুল উত্তর! সঠিক অপশন ({q.correct_option})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#17233F] bg-white p-3 rounded-xl border border-[#E3E8F2] bangla-font">
                          <strong className="text-[#6538F5]">অফিসিয়াল ব্যাখ্যা: </strong>
                          {q.explanation_bn || q.explanation_en || 'বিপিএসসি সিলেবাস অনুযায়ী সঠিক ও যাচাইকৃত উত্তর।'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
