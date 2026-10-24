'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookCheck,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  Flag,
  HelpCircle,
  Layers,
  Lightbulb,
  ListFilter,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  X,
  XCircle,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

interface RawQuestionItem {
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
  question_type: string;
  source_title: string;
  source_url: string | null;
  source_page_or_section: string;
  rights_status: string;
  verification_status: string;
  review_notes: string;
}

interface TaxonomyTopic {
  topic: string;
  subtopicCount: number;
  questionCount: number;
  subtopics: Array<{ subtopic: string; questionCount: number }>;
}

interface TaxonomySubject {
  subject: string;
  subjectBn: string;
  subjectCode: string;
  totalQuestions: number;
  topics: TaxonomyTopic[];
}

export default function StudyQuestionBankPage() {
  // Track & Stream
  const [selectedTrack, setSelectedTrack] = useState<ExamTrackId>('general_bcs');
  const [selectedStream, setSelectedStream] = useState<ProfessionalStreamId>('assistant_surgeon');

  // Study Mode vs Practice Mode
  const [studyStyle, setStudyStyle] = useState<'learn' | 'practice'>('learn');

  // Taxonomy & Filters
  const [taxonomy, setTaxonomy] = useState<TaxonomySubject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('verified'); // 'verified' | 'all' | 'needs_review'
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(20); // 10, 20, 30, 50
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Questions Data
  const [questions, setQuestions] = useState<RawQuestionItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Student Responses during session: questionId -> selectedOption ('A'|'B'|'C'|'D')
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Bookmarked questions: Set of IDs
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  // Mistakes added to notebook: Set of IDs
  const [savedMistakes, setSavedMistakes] = useState<Set<string>>(new Set());

  // Practice Mode Submitted State
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);

  // Report Modal State
  const [reportingQuestion, setReportingQuestion] = useState<RawQuestionItem | null>(null);
  const [reportReason, setReportReason] = useState<string>('wrong_answer');
  const [reportComment, setReportComment] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  // Mobile filters drawer open
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Parse initial query params from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTrack = urlParams.get('track');
      const urlStream = urlParams.get('stream');
      const urlSubject = urlParams.get('subject');
      const urlSearch = urlParams.get('search');

      if (urlTrack === 'special_bcs_health_51_2026' || urlTrack === 'general_bcs') {
        setSelectedTrack(urlTrack as ExamTrackId);
      }
      if (urlStream === 'assistant_surgeon' || urlStream === 'assistant_dental_surgeon') {
        setSelectedStream(urlStream as ProfessionalStreamId);
      }
      if (urlSubject) {
        setSelectedSubject(urlSubject);
      }
      if (urlSearch) {
        setSearchQuery(urlSearch);
      }
    }
  }, []);

  // 1. Fetch Taxonomy Tree on Track or Stream Change
  useEffect(() => {
    async function loadTaxonomy() {
      try {
        const streamParam = selectedTrack === 'special_bcs_health_51_2026' ? selectedStream : 'general';
        const res = await fetch(`/api/questions/taxonomy?track=${selectedTrack}&stream=${streamParam}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTaxonomy(json.data);
        }
      } catch (err) {
        console.error('Failed to load taxonomy:', err);
      }
    }
    loadTaxonomy();
  }, [selectedTrack, selectedStream]);

  // 2. Fetch Questions based on Filters & Pagination
  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('limit', String(pageSize));
      params.set('track', selectedTrack);

      if (selectedTrack === 'special_bcs_health_51_2026') {
        params.set('stream', selectedStream);
      } else {
        params.set('stream', 'general');
      }

      if (selectedSubject !== 'all') params.set('subject', selectedSubject);
      if (selectedTopic !== 'all') params.set('topic', selectedTopic);
      if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty);
      if (selectedStatus !== 'all') params.set('reviewStatus', selectedStatus);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());

      const res = await fetch(`/api/questions?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setQuestions(json.data || []);
        setTotalCount(json.total || 0);
        setTotalPages(json.totalPages || 1);
      } else {
        setErrorMsg(json.error || 'Failed to load questions.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to question bank service.');
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    pageSize,
    selectedTrack,
    selectedStream,
    selectedSubject,
    selectedTopic,
    selectedDifficulty,
    selectedStatus,
    searchQuery,
  ]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Answer selection handler
  const handleSelectOption = (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
    // In practice mode after submit, answers are locked
    if (studyStyle === 'practice' && practiceSubmitted) return;

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));

    // In learn mode, if incorrect, offer auto-sync to mistake notebook
    if (studyStyle === 'learn') {
      const q = questions.find((item) => item.id === questionId);
      if (q && q.correct_option !== option) {
        // Tag incorrect answer automatically
        saveToMistakeNotebook(q, option);
      }
    }
  };

  // Toggle Bookmark
  const toggleBookmark = (questionId: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  // Save to Mistake Notebook
  const saveToMistakeNotebook = async (question: RawQuestionItem, userOption: 'A' | 'B' | 'C' | 'D') => {
    if (savedMistakes.has(question.id)) return;
    try {
      await fetch('/api/mistake-notebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          userSelectedOptionId: userOption,
          errorType: 'knowledge_gap',
          candidateNotes: `স্টাডি মোডে ভুল উত্তর দেওয়া হয়েছে। সঠিক উত্তর: ${question.correct_option}`,
        }),
      });
      setSavedMistakes((prev) => new Set(prev).add(question.id));
    } catch (e) {
      console.error('Failed to sync to mistake notebook:', e);
    }
  };

  // Submit Practice Batch
  const handleSubmitPractice = () => {
    setPracticeSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset Practice Batch
  const handleResetPractice = () => {
    setPracticeSubmitted(false);
    setSelectedAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate Practice Score
  const calculatePracticeScore = () => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q) => {
      const ans = selectedAnswers[q.id];
      if (!ans) {
        unanswered++;
      } else if (ans === q.correct_option) {
        correct++;
      } else {
        wrong++;
      }
    });

    const netScore = Math.max(0, correct * 1.0 - wrong * 0.5);
    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : '0';

    return { correct, wrong, unanswered, netScore: netScore.toFixed(2), accuracy };
  };

  // Handle Question Report Submit
  const handleReportSubmit = async () => {
    if (!reportingQuestion) return;
    try {
      const res = await fetch('/api/questions/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: reportingQuestion.id,
          reason: reportReason,
          comment: reportComment,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setReportSuccess('প্রশ্নটির ত্রুটি পর্যালোচনার জন্য গৃহীত হয়েছে। ধন্যবাদ!');
        setTimeout(() => {
          setReportingQuestion(null);
          setReportSuccess(null);
          setReportComment('');
        }, 1500);
      }
    } catch (e: any) {
      alert('ত্রুটি পাঠানো ব্যর্থ হয়েছে: ' + e.message);
    }
  };

  // Current active subject topics
  const currentSubjectObj = taxonomy.find((s) => s.subject === selectedSubject);
  const currentTopics = currentSubjectObj ? currentSubjectObj.topics : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ================================================================= */}
      {/* 1. Header Banner & Study Style Controls                           */}
      {/* ================================================================= */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E3E8F2] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[#E3E8F2]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center shrink-0 border border-[#6538F5]/15">
              <BookCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#17233F] tracking-tight">
                  Question Bank
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#059669] text-xs font-bold border border-[#059669]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                  {totalCount > 0 ? `${totalCount.toLocaleString()}টি ভেরিফাইড প্রশ্ন` : '২০,২০০+ ভেরিফাইড প্রশ্ন'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#66748B] bangla-font mt-0.5">
                {selectedTrack === 'special_bcs_health_51_2026'
                  ? selectedStream === 'assistant_surgeon'
                    ? '৫১তম বিশেষ বিসিএস (স্বাস্থ্য) — সহকারী সার্জন (MBBS): চিকিৎসা বিজ্ঞান ১ম ও ২য় পত্র এবং সাধারণ বিষয়ের প্রশ্ন সম্ভার।'
                    : '৫১তম বিশেষ বিসিএস (স্বাস্থ্য) — সহকারী ডেন্টাল সার্জন (BDS): ডেন্টাল সায়েন্স ১ম ও ২য় পত্র এবং সাধারণ বিষয়ের প্রশ্ন সম্ভার।'
                  : 'Study MCQs & Precision Practice • বিষয় ও অধ্যায়ভিত্তিক পুঙ্খানুপুঙ্খ অনুশীলন, তথ্যবহুল ব্যাখ্যা ও রেফারেন্স।'}
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
                  setSelectedSubject('all');
                  setSelectedTopic('all');
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                  setSelectedSubject('all');
                  setSelectedTopic('all');
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                  onClick={() => {
                    setSelectedStream('assistant_surgeon');
                    setSelectedSubject('all');
                    setSelectedTopic('all');
                    setCurrentPage(1);
                  }}
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
                  onClick={() => {
                    setSelectedStream('assistant_dental_surgeon');
                    setSelectedSubject('all');
                    setSelectedTopic('all');
                    setCurrentPage(1);
                  }}
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

        {/* Study Style & Quick Stats Bar */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#66748B] uppercase tracking-wider">পদ্ধতি:</span>
            <div className="inline-flex p-1 bg-[#F5F7FC] rounded-xl border border-[#E3E8F2]">
              <button
                type="button"
                onClick={() => {
                  setStudyStyle('learn');
                  setPracticeSubmitted(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  studyStyle === 'learn'
                    ? 'bg-white text-[#6538F5] shadow-xs'
                    : 'text-[#66748B] hover:text-[#17233F]'
                }`}
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                শিখন মোড (Learn Mode)
              </button>
              <button
                type="button"
                onClick={() => {
                  setStudyStyle('practice');
                  setPracticeSubmitted(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  studyStyle === 'practice'
                    ? 'bg-white text-[#6538F5] shadow-xs'
                    : 'text-[#66748B] hover:text-[#17233F]'
                }`}
              >
                <Target className="h-3.5 w-3.5 text-[#059669]" />
                অনুশীলন মোড (Practice Mode)
              </button>
            </div>

            <span className="text-[11px] text-[#8792A5] hidden sm:inline">
              {studyStyle === 'learn'
                ? '• সাথে সাথে সঠিক উত্তর ও ব্যাখ্যা দেখতে পাবেন'
                : '• সবগুলো উত্তর শেষ করে একসাথে রেজাল্ট ও ব্যাখ্যা যাচাই'}
            </span>
          </div>

          {/* Question Count Per Page Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-[#66748B] font-medium">প্রতি পেজে প্রশ্ন:</span>
            {[10, 20, 30, 50].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => {
                  setPageSize(count);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                  pageSize === count
                    ? 'bg-[#17233F] text-white border-[#17233F]'
                    : 'bg-white text-[#66748B] border-[#E3E8F2] hover:bg-[#F5F7FC]'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. Practice Mode Score Summary Banner (If Submitted)               */}
      {/* ================================================================= */}
      {studyStyle === 'practice' && practiceSubmitted && (
        <div className="bg-gradient-to-r from-[#F0EBFF] to-[#E8F8F0] border-2 border-[#6538F5]/30 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#059669]" />
                <h3 className="text-base font-black text-[#17233F]">অনুশীলন ব্যাচ সমাপ্ত হয়েছে!</h3>
              </div>
              <p className="text-xs text-[#66748B] bangla-font mt-0.5">
                বিপিএসসি নিয়ম অনুযায়ী -০.৫০ নেগেটিভ মার্কিং সহ আপনার অর্জিত স্কোর নিচে দেখানো হলো:
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetPractice}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#17233F] border border-[#E3E8F2] shadow-xs hover:bg-[#F5F7FC]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              আবার অনুশীলন করুন
            </button>
          </div>

          {/* Metric cards */}
          {(() => {
            const stats = calculatePracticeScore();
            return (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                <div className="bg-white/80 p-3 rounded-xl border border-white/60">
                  <div className="text-[11px] font-bold text-[#8792A5] uppercase">মোট প্রশ্ন</div>
                  <div className="text-lg font-black text-[#17233F]">{questions.length}</div>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-white/60">
                  <div className="text-[11px] font-bold text-[#059669] uppercase">সঠিক (+১.০)</div>
                  <div className="text-lg font-black text-[#059669]">{stats.correct}</div>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-white/60">
                  <div className="text-[11px] font-bold text-[#DC2626] uppercase">ভুল (-০.৫০)</div>
                  <div className="text-lg font-black text-[#DC2626]">{stats.wrong}</div>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-white/60">
                  <div className="text-[11px] font-bold text-[#8792A5] uppercase">উত্তর দেওয়া হয়নি</div>
                  <div className="text-lg font-black text-[#66748B]">{stats.unanswered}</div>
                </div>
                <div className="bg-white/90 p-3 rounded-xl border border-[#6538F5]/30 col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-bold text-[#6538F5] uppercase">নেট স্কোর</div>
                  <div className="text-xl font-black text-[#6538F5]">
                    {stats.netScore} <span className="text-xs text-[#8792A5]">/ {questions.length}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ================================================================= */}
      {/* 3. Search & Interactive Filters Bar                              */}
      {/* ================================================================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E3E8F2] shadow-xs space-y-4">
        {/* Top row: Search input + Subject & Topic dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8792A5]" />
            <input
              type="text"
              placeholder="প্রশ্নের মূলভাব বা কীওয়ার্ড খুঁজুন..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F7FC] border border-[#E3E8F2] rounded-xl text-xs font-medium text-[#17233F] placeholder-[#8792A5] focus:outline-hidden focus:border-[#6538F5] focus:bg-white transition-all"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic('all');
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-[#F5F7FC] border border-[#E3E8F2] rounded-xl text-xs font-bold text-[#17233F] focus:outline-hidden focus:border-[#6538F5] focus:bg-white"
            >
              <option value="all">
                {selectedTrack === 'special_bcs_health_51_2026'
                  ? `সকল বিষয় — পেশাগত ও সাধারণ (${taxonomy.reduce((acc, s) => acc + s.totalQuestions, 0).toLocaleString()}টি প্রশ্ন)`
                  : `সকল বিষয় (${taxonomy.reduce((acc, s) => acc + s.totalQuestions, 0).toLocaleString()}টি প্রশ্ন)`}
              </option>
              {selectedTrack === 'special_bcs_health_51_2026' && (
                <option value="professional">
                  {selectedStream === 'assistant_surgeon'
                    ? `শুধুমাত্র পেশাগত চিকিৎসা বিজ্ঞান (${taxonomy.filter((s) => s.subject.toLowerCase().includes('medical')).reduce((acc, s) => acc + s.totalQuestions, 0)}টি প্রশ্ন)`
                    : `শুধুমাত্র পেশাগত ডেন্টাল সায়েন্স (${taxonomy.filter((s) => s.subject.toLowerCase().includes('dental')).reduce((acc, s) => acc + s.totalQuestions, 0)}টি প্রশ্ন)`}
                </option>
              )}
              {taxonomy.map((s) => (
                <option key={s.subject} value={s.subject}>
                  {s.subjectBn || s.subject} ({s.totalQuestions})
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentPage(1);
              }}
              disabled={selectedSubject === 'all'}
              className="w-full px-3 py-2 bg-[#F5F7FC] border border-[#E3E8F2] rounded-xl text-xs font-medium text-[#17233F] disabled:opacity-50 focus:outline-hidden focus:border-[#6538F5] focus:bg-white"
            >
              <option value="all">সকল টপিক / অধ্যায়</option>
              {currentTopics.map((t) => (
                <option key={t.topic} value={t.topic}>
                  {t.topic} ({t.questionCount})
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-[#F5F7FC] border border-[#E3E8F2] rounded-xl text-xs font-medium text-[#17233F] focus:outline-hidden focus:border-[#6538F5] focus:bg-white"
            >
              <option value="all">সকল কাঠিন্য মাত্রা (Difficulty)</option>
              <option value="easy">সহজ (Easy)</option>
              <option value="medium">মাঝারি (Medium)</option>
              <option value="hard">উচ্চতর (Hard)</option>
            </select>
          </div>
        </div>

        {/* Bottom row: Active Filter Chips & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E3E8F2]/60">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#66748B]">
            <span className="font-bold text-[#17233F]">ফিল্টার ফলাফল:</span>
            <span className="px-2 py-0.5 rounded-md bg-[#F0EBFF] text-[#6538F5] font-black">
              {totalCount.toLocaleString()} টি প্রশ্ন পাওয়া গেছে
            </span>
            {selectedSubject !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F5F7FC] border border-[#E3E8F2]">
                {selectedSubject}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubject('all');
                    setSelectedTopic('all');
                  }}
                  className="hover:text-red-500 p-0.5 rounded"
                  aria-label={`Remove subject filter ${selectedSubject}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedTopic !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F5F7FC] border border-[#E3E8F2]">
                টপিক: {selectedTopic}
                <button
                  type="button"
                  onClick={() => setSelectedTopic('all')}
                  className="hover:text-red-500 p-0.5 rounded"
                  aria-label={`Remove topic filter ${selectedTopic}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F5F7FC] border border-[#E3E8F2]">
                অনুসন্ধান: &ldquo;{searchQuery}&rdquo;
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-500 p-0.5 rounded"
                  aria-label="Clear search query"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>

          {(selectedSubject !== 'all' || selectedTopic !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedSubject('all');
                setSelectedTopic('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-xs text-[#6538F5] hover:underline font-bold"
            >
              সকল ফিল্টার রিসেট
            </button>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 4. Question Cards List                                            */}
      {/* ================================================================= */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E3E8F2] shadow-xs flex flex-col items-center justify-center gap-3">
          <RefreshCw className="h-7 w-7 text-[#6538F5] animate-spin" />
          <p className="text-xs font-bold text-[#66748B] bangla-font">প্রশ্নাবলী লোড করা হচ্ছে...</p>
        </div>
      ) : errorMsg ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
          <p className="text-xs font-bold text-red-700">{errorMsg}</p>
          <button
            type="button"
            onClick={fetchQuestions}
            className="mt-3 px-4 py-1.5 text-xs font-bold bg-white text-red-700 border border-red-300 rounded-xl hover:bg-red-100"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E3E8F2] shadow-xs">
          <BookOpen className="h-10 w-10 text-[#8792A5] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[#17233F]">কোন প্রশ্ন পাওয়া যায়নি</h3>
          <p className="text-xs text-[#66748B] mt-1 max-w-md mx-auto">
            আপনার নির্বাচিত ফিল্টার বা অনুসন্ধানে কোনো অনুমোদিত প্রশ্ন মেলেনি। ফিল্টার রিসেট করে পুনরায় চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSubject('all');
              setSelectedTopic('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#6538F5] text-white shadow-xs"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const questionNumber = (currentPage - 1) * pageSize + idx + 1;
            const selectedOpt = selectedAnswers[q.id];
            const isBookmarked = bookmarks.has(q.id);
            const isSavedMistake = savedMistakes.has(q.id);

            // Determine if explanation should be shown
            const showFeedback =
              studyStyle === 'learn' ? Boolean(selectedOpt) : practiceSubmitted;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8F2] hover:border-[#6538F5]/30 transition-all shadow-xs relative"
              >
                {/* Question Header: Badges & Actions */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E3E8F2]/60">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-black text-[#6538F5] bg-[#F0EBFF] px-2 py-0.5 rounded-md text-[11px]">
                      Q #{questionNumber}
                    </span>
                    <span className="font-bold text-[#17233F] bg-[#F5F7FC] px-2 py-0.5 rounded-md text-[11px] border border-[#E3E8F2]">
                      {q.subject}
                    </span>
                    {q.topic && (
                      <span className="text-[#66748B] text-[11px] hidden sm:inline">
                        • {q.topic}
                      </span>
                    )}
                    {q.verification_status === 'verified' &&
                    !q.options?.A?.includes('Option A for question') &&
                    !q.options?.A?.includes('বিকল্প ক (Option A') &&
                    !q.question_en?.includes('Which of the following is accurate?') ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-md border border-[#059669]/20">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </span>
                    ) : q.verification_status === 'reported_for_correction' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300">
                        <ShieldAlert className="h-3 w-3" />
                        Reported for Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300">
                        <AlertCircle className="h-3 w-3" />
                        Needs Review
                      </span>
                    )}
                  </div>

                  {/* Actions: Bookmark & Report */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked
                          ? 'bg-[#F0EBFF] text-[#6538F5] border-[#6538F5]/30'
                          : 'bg-white text-[#8792A5] border-[#E3E8F2] hover:text-[#17233F]'
                      }`}
                      title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক করুন'}
                      aria-label="Bookmark"
                    >
                      {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReportingQuestion(q)}
                      className="p-1.5 rounded-lg border bg-white text-[#8792A5] border-[#E3E8F2] hover:text-red-600 hover:border-red-200 transition-colors"
                      title="ভুল রিপোর্ট করুন"
                      aria-label="Report mistake"
                    >
                      <Flag className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Question Stem */}
                <div className="pt-4 pb-4">
                  <h2 className="text-sm sm:text-base font-bold text-[#17233F] leading-relaxed bangla-font">
                    {q.question_bn || q.question_en}
                  </h2>
                  {q.question_en && q.question_bn && (
                    <p className="text-xs text-[#66748B] mt-1 font-sans">{q.question_en}</p>
                  )}
                </div>

                {/* Options Grid (A, B, C, D) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                    const optText = q.options[optKey];
                    const isSelected = selectedOpt === optKey;
                    const isCorrect = q.correct_option === optKey;

                    let optStyle =
                      'bg-[#F5F7FC] border-[#E3E8F2] text-[#17233F] hover:bg-[#F0EBFF] hover:border-[#6538F5]/30';

                    if (showFeedback) {
                      if (isCorrect) {
                        optStyle = 'bg-[#E8F8F0] border-[#059669] text-[#059669] font-bold shadow-xs';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-[#FEE2E2] border-[#DC2626] text-[#DC2626] font-bold shadow-xs';
                      } else {
                        optStyle = 'bg-[#F5F7FC] border-[#E3E8F2] text-[#8792A5] opacity-70';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-[#F0EBFF] border-[#6538F5] text-[#6538F5] font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={optKey}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optKey)}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 ${optStyle}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                            showFeedback && isCorrect
                              ? 'bg-[#059669] text-white'
                              : showFeedback && isSelected && !isCorrect
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

                {/* Explanation & Source Box (Visible when answered in Learn Mode, or after submit in Practice Mode) */}
                {showFeedback && (
                  <div className="mt-4 pt-4 border-t border-[#E3E8F2] space-y-3 bg-[#FAFBFD] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 sm:p-5 rounded-b-2xl">
                    {/* Status Banner */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {selectedOpt === q.correct_option ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                            <CheckCircle2 className="h-4 w-4" />
                            সঠিক উত্তর! (+১.০)
                          </span>
                        ) : selectedOpt ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626]">
                            <XCircle className="h-4 w-4" />
                            ভুল উত্তর! সঠিক উত্তর হলো: ({q.correct_option})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#66748B]">
                            উত্তর দেওয়া হয়নি। সঠিক উত্তর হলো: ({q.correct_option})
                          </span>
                        )}
                      </div>

                      {/* Add to Mistake Notebook action */}
                      {selectedOpt && selectedOpt !== q.correct_option && (
                        <div className="text-[11px]">
                          {isSavedMistake ? (
                            <span className="inline-flex items-center gap-1 text-[#6538F5] font-bold">
                              <Check className="h-3.5 w-3.5" />
                              ভুল খাতায় সংরক্ষিত
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => saveToMistakeNotebook(q, selectedOpt)}
                              className="text-xs font-bold text-[#6538F5] hover:underline"
                            >
                              + ভুল খাতায় যুক্ত করুন
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Verified Explanation */}
                    {(q.explanation_bn || q.explanation_en) && (
                      <div className="text-xs sm:text-sm text-[#17233F] leading-relaxed bg-white p-3 rounded-xl border border-[#E3E8F2]">
                        <div className="font-bold text-[#6538F5] text-xs mb-1 flex items-center gap-1">
                          <Lightbulb className="h-3.5 w-3.5" />
                          যাচাইকৃত ব্যাখ্যা:
                        </div>
                        <p className="bangla-font">{q.explanation_bn || q.explanation_en}</p>
                      </div>
                    )}

                    {/* Source Citation & Provenance */}
                    {q.source_title && (
                      <div className="flex items-center gap-2 text-[11px] text-[#66748B] flex-wrap">
                        <span className="font-bold text-[#8792A5]">উৎস ও রেফারেন্স:</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-[#E3E8F2] text-[#17233F]">
                          {q.source_title}
                        </span>
                        {q.source_page_or_section && (
                          <span className="text-[#8792A5]">• {q.source_page_or_section}</span>
                        )}
                        {q.source_url && (
                          <a
                            href={q.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[#6538F5] hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            অফিসিয়াল লিংক
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================================================================= */}
      {/* 5. Practice Mode Submit Button                                    */}
      {/* ================================================================= */}
      {studyStyle === 'practice' && !practiceSubmitted && questions.length > 0 && (
        <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#6538F5]/30 shadow-lg flex items-center justify-between gap-4">
          <div className="text-xs text-[#17233F]">
            উত্তর দেওয়া হয়েছে:{' '}
            <span className="font-black text-[#6538F5]">
              {Object.keys(selectedAnswers).length}
            </span>{' '}
            / {questions.length} টি প্রশ্ন
          </div>
          <button
            type="button"
            onClick={handleSubmitPractice}
            className="px-6 py-2.5 rounded-xl text-xs font-black bg-[#6538F5] text-white shadow-md hover:bg-[#5326d9] transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            অনুশীলন ব্যাচ সাবমিট করুন
          </button>
        </div>
      )}

      {/* ================================================================= */}
      {/* 6. Robust Pagination Controls                                      */}
      {/* ================================================================= */}
      {!isLoading && totalPages > 1 && (
        <div className="bg-white rounded-2xl p-4 border border-[#E3E8F2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#66748B]">
            পেজ <span className="font-bold text-[#17233F]">{currentPage}</span> / {totalPages} (মোট{' '}
            <span className="font-bold text-[#17233F]">{totalCount.toLocaleString()}</span> টি প্রশ্ন)
          </div>

          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage <= 1}
              className="p-2 rounded-xl border border-[#E3E8F2] bg-white text-[#17233F] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#F5F7FC]"
              title="প্রথম পেজ"
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            {/* Previous Page */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded-xl border border-[#E3E8F2] bg-white text-xs font-bold text-[#17233F] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#F5F7FC] flex items-center gap-1"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              পূর্ববর্তী
            </button>

            {/* Page Jump Numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage;
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                if (pageNum < 1 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#6538F5] text-white shadow-xs'
                        : 'bg-white text-[#66748B] border border-[#E3E8F2] hover:bg-[#F5F7FC]'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-xl border border-[#E3E8F2] bg-white text-xs font-bold text-[#17233F] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#F5F7FC] flex items-center gap-1"
              aria-label="Next page"
            >
              পরবর্তী
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last Page */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage(totalPages);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage >= totalPages}
              className="p-2 rounded-xl border border-[#E3E8F2] bg-white text-[#17233F] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#F5F7FC]"
              title="সর্বশেষ পেজ"
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 7. Error Reporting Modal                                          */}
      {/* ================================================================= */}
      {reportingQuestion && (
        <div className="fixed inset-0 z-50 bg-[#17233F]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-[#E3E8F2] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F2]">
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-red-600" />
                <h3 className="text-base font-black text-[#17233F]">প্রশ্নের ত্রুটি রিপোর্ট করুন</h3>
              </div>
              <button
                type="button"
                onClick={() => setReportingQuestion(null)}
                className="p-1 rounded-lg text-[#8792A5] hover:text-[#17233F]"
                aria-label="Close error report dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs text-[#66748B]">
              <span className="font-bold text-[#17233F]">প্রশ্ন আইডি:</span> {reportingQuestion.id}
            </div>

            <p className="text-xs font-medium text-[#17233F] bangla-font bg-[#F5F7FC] p-3 rounded-xl border border-[#E3E8F2]">
              {reportingQuestion.question_bn || reportingQuestion.question_en}
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#17233F] mb-1">সমস্যার ধরন:</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F7FC] border border-[#E3E8F2] rounded-xl text-xs font-medium text-[#17233F] focus:bg-white"
                >
                  <option value="wrong_answer">সঠিক উত্তর ভুল চিহ্নিত আছে</option>
                  <option value="stem_typo">প্রশ্নপত্রে বানান বা তথ্যগত ভুল</option>
                  <option value="explanation_inaccurate">ব্যাখ্যা অসম্পূর্ণ বা বিভ্রান্তিকর</option>
                  <option value="syllabus_mismatch">সিলেবাস বা বিষয় কোড অমিল</option>
                  <option value="other">অন্যান্য সমস্যা</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17233F] mb-1">
                  আপনার মন্তব্য / রেফারেন্স (ঐচ্ছিক):
                </label>
                <textarea
                  rows={3}
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  placeholder="সঠিক রেফারেন্স বা বইয়ের নাম উল্লেখ করতে পারেন..."
                  className="w-full p-3 bg-[#F5F7FC] border border-[#E3E8F2] rounded-xl text-xs text-[#17233F] placeholder-[#8792A5] focus:bg-white focus:border-[#6538F5]"
                />
              </div>
            </div>

            {reportSuccess ? (
              <div className="p-3 bg-[#E8F8F0] text-[#059669] text-xs font-bold rounded-xl text-center">
                {reportSuccess}
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportingQuestion(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F5F7FC] text-[#66748B] hover:text-[#17233F]"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={handleReportSubmit}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#6538F5] text-white shadow-xs hover:bg-[#5326d9]"
                >
                  জমা দিন
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
