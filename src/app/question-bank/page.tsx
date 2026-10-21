'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookCheck,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Eye,
  EyeOff,
  Filter,
  GraduationCap,
  HelpCircle,
  Layers,
  Library,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react';

interface QuestionBankItem {
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

interface ManifestSummary {
  totalQuestions: number;
  subjectStats: Record<string, number>;
  difficultyStats: Record<string, number>;
  totalBatches: number;
}

const SUBJECT_METADATA: Record<
  string,
  { nameBn: string; color: string; badgeBg: string; border: string; iconBg: string }
> = {
  Bangla: {
    nameBn: 'বাংলা ভাষা ও সাহিত্য',
    color: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    iconBg: 'from-rose-500 to-pink-600',
  },
  English: {
    nameBn: 'ইংরেজি ভাষা ও সাহিত্য',
    color: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'from-blue-500 to-indigo-600',
  },
  'Bangladesh Affairs': {
    nameBn: 'বাংলাদেশ বিষয়াবলী',
    color: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconBg: 'from-emerald-500 to-teal-600',
  },
  'International Affairs': {
    nameBn: 'আন্তর্জাতিক বিষয়াবলী',
    color: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    iconBg: 'from-purple-500 to-violet-600',
  },
  Science: {
    nameBn: 'সাধারণ বিজ্ঞান',
    color: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    iconBg: 'from-amber-500 to-orange-600',
  },
  'Computer and Information Technology': {
    nameBn: 'কম্পিউটার ও তথ্যপ্রযুক্তি',
    color: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-800',
    iconBg: 'from-cyan-500 to-blue-600',
  },
  Mathematics: {
    nameBn: 'গাণিতিক যুক্তি',
    color: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800',
    iconBg: 'from-indigo-500 to-sky-600',
  },
  'Mental Ability': {
    nameBn: 'মানসিক দক্ষতা',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-300',
    border: 'border-fuchsia-200 dark:border-fuchsia-800',
    iconBg: 'from-fuchsia-500 to-pink-600',
  },
  'Geography and Environment': {
    nameBn: 'ভূগোল ও পরিবেশ',
    color: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800',
    iconBg: 'from-teal-500 to-emerald-600',
  },
  'Ethics, Values and Good Governance': {
    nameBn: 'নৈতিকতা ও সুশাসন',
    color: 'text-sky-600 dark:text-sky-400',
    badgeBg: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800',
    iconBg: 'from-sky-500 to-teal-600',
  },
};

export default function QuestionBankExplorerPage() {
  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [manifest, setManifest] = useState<ManifestSummary | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [jumpPageInput, setJumpPageInput] = useState<string>('1');

  // Interactive Question State (selected option per question ID)
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Load questions when page, size, subject, difficulty, or batch changes
  useEffect(() => {
    fetchQuestions();
  }, [currentPage, pageSize, selectedSubject, selectedDifficulty, selectedBatch]);

  const fetchQuestions = async (searchTerm = searchQuery) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', pageSize.toString());

      if (selectedSubject !== 'all') params.set('subject', selectedSubject);
      if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty);
      if (selectedBatch) params.set('batch', selectedBatch);
      if (searchTerm.trim()) params.set('search', searchTerm.trim());

      const res = await fetch(`/api/questions?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to load questions');
      }

      setQuestions(json.data || []);
      setTotalQuestions(json.total || 0);
      setTotalPages(json.totalPages || 1);
      if (json.manifest) {
        setManifest(json.manifest);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to question bank');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setJumpPageInput('1');
    fetchQuestions(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setJumpPageInput('1');
    fetchQuestions('');
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleSelectOption = (questionId: string, optionId: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleRevealAnswer = (questionId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedIds((prev) => {
      const next = { ...prev, [questionId]: !prev[questionId] };
      return next;
    });
  };

  const handleResetFilters = () => {
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setSelectedBatch('');
    setSearchQuery('');
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-800">
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-pulse text-emerald-400" />
              <span>100% Certified Syllabus-Compliant MCQ Repository</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              BCS Question Bank{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                (২০,০০০ ভেরিফায়েড প্রশ্ন)
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed bangla-font max-w-3xl">
              বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)-এর ১০টি সাধারণ বিষয়ের ওপর তৈরি ২০,০০০ নির্ভরযোগ্য প্রশ্ন, প্রতিটি প্রশ্নের সাথে বাংলা ও ইংরেজি অনুবাদ, সঠিক উত্তর এবং প্রমাণভিত্তিক বিস্তারিত ব্যাখ্যা।
            </p>

            {/* Quick KPI Stat Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                  {manifest ? manifest.totalQuestions.toLocaleString() : '20,000'}
                </div>
                <div className="text-xs text-emerald-200">মোট পরীক্ষিত প্রশ্ন</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">১০টি বিষয়</div>
                <div className="text-xs text-teal-200">পূর্ণ সিলেবাস কাভারেজ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-300">৮১ ব্যাচ</div>
                <div className="text-xs text-sky-200">স্ট্রাকচার্ড JSONL ভলিউম</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">১০০%</div>
                <div className="text-xs text-amber-200">নির্ভুল ডাটাবেজ সার্টিফিকেট</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Library className="h-4 w-4 text-emerald-600" />
              <span>বিষয়ভিত্তিক ব্রাউজ করুন (Subjects)</span>
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {totalQuestions.toLocaleString()} টি প্রশ্ন পাওয়া গেছে
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedSubject('all');
                setCurrentPage(1);
                setJumpPageInput('1');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                selectedSubject === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>সকল বিষয় (All)</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedSubject === 'all'
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {manifest ? manifest.totalQuestions.toLocaleString() : '20,000'}
              </span>
            </button>

            {manifest &&
              Object.entries(manifest.subjectStats).map(([subj, count]) => {
                const meta = SUBJECT_METADATA[subj];
                const isSelected = selectedSubject === subj;
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(subj);
                      setCurrentPage(1);
                      setJumpPageInput('1');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{meta?.nameBn || subj}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        isSelected
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {count.toLocaleString()}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Live Search and Secondary Filters Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="প্রশ্ন, টপিক বা ব্যাকরণ/ব্যাখ্যার শব্দ লিখে সার্চ করুন (বাংলা ও English)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>সার্চ</span>
            </button>
          </form>

          {/* Secondary Filter Dropdowns */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">কঠিনতা (Difficulty):</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium"
                >
                  <option value="all">সকল মাত্রা (All)</option>
                  <option value="easy">সহজ (Easy)</option>
                  <option value="medium">মাঝারি (Medium)</option>
                  <option value="hard">কঠিন (Hard)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">ব্যাচ (Batch 1–81):</span>
                <select
                  value={selectedBatch}
                  onChange={(e) => {
                    setSelectedBatch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium"
                >
                  <option value="">সকল ব্যাচ (All 81 Batches)</option>
                  {Array.from({ length: 81 }, (_, i) => i + 1).map((b) => (
                    <option key={b} value={b.toString()}>
                      Batch {b.toString().padStart(3, '0')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">প্রতি পেজে:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium"
                >
                  <option value="10">১০টি</option>
                  <option value="20">২০টি</option>
                  <option value="50">৫০টি</option>
                  <option value="100">১০০টি</option>
                </select>
              </div>
            </div>

            {(selectedSubject !== 'all' ||
              selectedDifficulty !== 'all' ||
              selectedBatch ||
              searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>ফিল্টার রিসেট করুন</span>
              </button>
            )}
          </div>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="py-20 text-center space-y-3">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-r-transparent" />
            <p className="text-sm text-slate-500">প্রশ্ন ব্যাংক লোড হচ্ছে...</p>
          </div>
        )}

        {errorMsg && !isLoading && (
          <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Questions List */}
        {!isLoading && !errorMsg && questions.length === 0 && (
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
            <HelpCircle className="h-12 w-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              কোনো প্রশ্ন পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              আপনার নির্বাচিত ফিল্টার বা সার্চ শব্দের সাথে কোনো প্রশ্ন মিলেনি। অন্য কোনো ফিল্টার নির্বাচন করুন অথবা রিসেট করুন।
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
            >
              ফিল্টার রিসেট
            </button>
          </div>
        )}

        {!isLoading && !errorMsg && questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const meta = SUBJECT_METADATA[q.subject];
              const isRevealed = revealedAnswers[q.id];
              const selectedOption = userAnswers[q.id];
              const isBookmarked = bookmarkedIds[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700 space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                        {q.id}
                      </span>
                      <span
                        className={`font-semibold px-2.5 py-1 rounded-md ${
                          meta?.badgeBg || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {meta?.nameBn || q.subject}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        • {q.topic} {q.subtopic ? `(${q.subtopic})` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                          q.difficulty === 'easy'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : q.difficulty === 'medium'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {q.difficulty === 'easy'
                          ? 'সহজ (Easy)'
                          : q.difficulty === 'medium'
                          ? 'মাঝারি (Medium)'
                          : 'কঠিন (Hard)'}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleBookmark(q.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950 dark:text-amber-400'
                            : 'text-slate-400 hover:text-slate-600 border-slate-200 dark:border-slate-700'
                        }`}
                        title="নোটবুকে সংরক্ষণ করুন"
                      >
                        <BookCheck className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white bangla-font leading-snug">
                      <span className="text-emerald-600 mr-2 font-mono">
                        {(currentPage - 1) * pageSize + idx + 1}.
                      </span>
                      {q.question_bn}
                    </h3>
                    {q.question_en && (
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                        {q.question_en}
                      </p>
                    )}
                  </div>

                  {/* Options Grid (Interactive Click to test) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                      const optionText = q.options[optKey];
                      const isCorrect = q.correct_option === optKey;
                      const isSelected = selectedOption === optKey;

                      let optionStyle =
                        'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

                      if (isRevealed) {
                        if (isCorrect) {
                          optionStyle =
                            'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                        } else if (isSelected && !isCorrect) {
                          optionStyle =
                            'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                        }
                      } else if (isSelected) {
                        optionStyle =
                          'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-100';
                      }

                      return (
                        <button
                          key={optKey}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optKey)}
                          className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-start gap-2.5 ${optionStyle}`}
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-600 text-white'
                                : isRevealed && isSelected && !isCorrect
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span className="bangla-font leading-relaxed pt-0.5">{optionText}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions & Reveal Accordion */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleRevealAnswer(q.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          <span>উত্তর ও ব্যাখ্যা লুকান</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          <span>উত্তর ও ব্যাখ্যা দেখুন (Show Answer & Explanation)</span>
                        </>
                      )}
                    </button>

                    <span className="text-[11px] text-slate-400">
                      উৎস: {q.source_title} {q.source_page_or_section ? `(${q.source_page_or_section})` : ''}
                    </span>
                  </div>

                  {/* Detailed Explanation Panel */}
                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm space-y-2.5">
                      <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>সঠিক উত্তর: ({q.correct_option}) {q.options[q.correct_option]}</span>
                      </div>

                      {q.explanation_bn && (
                        <div className="bangla-font text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/70 p-3 rounded-lg border border-emerald-500/10">
                          <strong className="block text-emerald-900 dark:text-emerald-400 mb-1">
                            বিস্তারিত ব্যাখ্যা (বাংলা):
                          </strong>
                          {q.explanation_bn}
                        </div>
                      )}

                      {q.explanation_en && (
                        <div className="text-slate-600 dark:text-slate-400 leading-relaxed bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-emerald-500/10">
                          <strong className="block text-slate-700 dark:text-slate-300 mb-1">
                            English Reference Note:
                          </strong>
                          {q.explanation_en}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination & Jump-to-Page Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              পেজ <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> / {totalPages} (মোট {totalQuestions.toLocaleString()} টি প্রশ্ন)
            </div>

            {/* Pagination Button Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage(1);
                  setJumpPageInput('1');
                }}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                title="প্রথম পেজ"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const prev = Math.max(1, currentPage - 1);
                  setCurrentPage(prev);
                  setJumpPageInput(prev.toString());
                }}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>আগের পেজ</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const next = Math.min(totalPages, currentPage + 1);
                  setCurrentPage(next);
                  setJumpPageInput(next.toString());
                }}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <span>পরের পেজ</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentPage(totalPages);
                  setJumpPageInput(totalPages.toString());
                }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                title="শেষ পেজ"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>

            {/* Jump to Page Form */}
            <form onSubmit={handleJumpToPage} className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">পেজে যান:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                className="w-16 px-2 py-1.5 text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold"
              >
                যান
              </button>
            </form>
          </div>
        )}

        {/* Bottom Call-to-Action: Direct Mock Test & Practice */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold bangla-font">
              এই ২০,০০০ প্রশ্ন নিয়ে এখনই মক টেস্ট দিন!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 bangla-font max-w-xl">
              টাইমড পরীক্ষা ও নেগেটিভ মার্কিং (-০.৫০)-এর সাথে আপনার রিয়েল প্রস্তুতি যাচাই করুন।
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/study/today"
              className="px-5 py-3 rounded-xl bg-white text-emerald-800 font-bold text-sm shadow hover:bg-emerald-50 transition-colors"
            >
              ডেইলি প্র্যাকটিস শুরু করুন
            </Link>
            <Link
              href="/test"
              className="px-5 py-3 rounded-xl bg-emerald-950/40 border border-white/20 text-white font-bold text-sm hover:bg-emerald-950/60 transition-colors"
            >
              ফুল মক টেস্ট দিন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
