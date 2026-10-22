'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Eye,
  EyeOff,
  Flame,
  HelpCircle,
  Library,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Trophy,
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

interface DailyChallengeData {
  date: string;
  challengeId: string;
  totalQuestions: number;
  questions: QuestionBankItem[];
}

interface DailyChallengeScore {
  correct: number;
  wrong: number;
  unanswered: number;
  finalScore: number;
  percentage: number;
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

function getDhakaDateString(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(date);
  } catch {
    return date.toISOString().split('T')[0];
  }
}

function formatBengaliDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const monthsBn = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ];
    const toBengaliDigits = (num: number | string) =>
      num.toString().replace(/\d/g, (ch) => '০১২৩৪৫৬৭৮৯'[parseInt(ch, 10)]);

    return `${toBengaliDigits(d)} ${monthsBn[m - 1]} ${toBengaliDigits(y)}`;
  } catch {
    return dateStr;
  }
}

function toBnDigits(num: number | string): string {
  return num.toString().replace(/\d/g, (ch) => '০১২৩৪৫৬৭৮৯'[parseInt(ch, 10)]);
}

/**
 * Calculates a window of page numbers to display with ellipses
 */
function getVisiblePages(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push('ellipsis');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(1);
    pages.push('ellipsis');
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push('ellipsis');
    pages.push(currentPage - 1);
    pages.push(currentPage);
    pages.push(currentPage + 1);
    pages.push('ellipsis');
    pages.push(totalPages);
  }

  return pages;
}

export default function QuestionBankExplorerPage() {
  // Questions Bank Repository State
  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [manifest, setManifest] = useState<ManifestSummary | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Filters State
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [jumpPageInput, setJumpPageInput] = useState<string>('1');

  // Interactive Question State
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ----------------------------------------------------
  // DAILY CHALLENGE STATE
  // ----------------------------------------------------
  const [dailyData, setDailyData] = useState<DailyChallengeData | null>(null);
  const [dailyAnswers, setDailyAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [dailySubmitted, setDailySubmitted] = useState<boolean>(false);
  const [dailyScore, setDailyScore] = useState<DailyChallengeScore | null>(null);
  const [dailyLoading, setDailyLoading] = useState<boolean>(true);
  const [dailyError, setDailyError] = useState<string | null>(null);
  const [activeDailyIndex, setActiveDailyIndex] = useState<number>(0);
  const [viewAllDaily, setViewAllDaily] = useState<boolean>(false);
  const [savedToMistakes, setSavedToMistakes] = useState<Record<string, boolean>>({});

  const todayStr = getDhakaDateString();

  // Load Daily Challenge & restore student's daily progress
  const loadDailyChallenge = useCallback(async () => {
    setDailyLoading(true);
    setDailyError(null);
    try {
      const res = await fetch(`/api/questions/daily-challenge?date=${todayStr}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to load daily challenge');
      }

      setDailyData(json);

      // Restore preserved progress from localStorage
      try {
        const storageKey = `bcs_daily_challenge_${todayStr}`;
        const savedProgress = localStorage.getItem(storageKey);
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          if (parsed && parsed.date === todayStr) {
            if (parsed.answers) {
              setDailyAnswers(parsed.answers);
            }
            if (parsed.isSubmitted) {
              setDailySubmitted(true);
              if (parsed.score) {
                setDailyScore(parsed.score);
              }
            }
          }
        }
      } catch {
        // localStorage might be blocked or empty
      }
    } catch (err: any) {
      setDailyError(err.message || 'Could not load Daily Challenge');
    } finally {
      setDailyLoading(false);
    }
  }, [todayStr]);

  useEffect(() => {
    loadDailyChallenge();
  }, [loadDailyChallenge]);

  // Load Question Bank MCQs whenever filters or pagination parameters change
  useEffect(() => {
    let isCancelled = false;

    const loadQuestions = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('limit', pageSize.toString());

        if (selectedSubject !== 'all') params.set('subject', selectedSubject);
        if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty);
        if (selectedBatch) params.set('batch', selectedBatch);
        if (appliedSearch) params.set('search', appliedSearch);

        const res = await fetch(`/api/questions?${params.toString()}`);
        const json = await res.json();

        if (isCancelled) return;

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
        if (!isCancelled) {
          setErrorMsg(err.message || 'Error connecting to question bank');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      isCancelled = true;
    };
  }, [currentPage, pageSize, selectedSubject, selectedDifficulty, selectedBatch, appliedSearch]);

  // Sync jump input with currentPage
  useEffect(() => {
    setJumpPageInput(currentPage.toString());
  }, [currentPage]);

  // Search Submission: Always resets to page 1
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchInput.trim());
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Clear Search: Resets search and returns to page 1
  const handleClearSearch = () => {
    setSearchInput('');
    setAppliedSearch('');
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Subject Pill Filter: Resets to page 1
  const handleSelectSubject = (subj: string) => {
    setSelectedSubject(subj);
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Difficulty Filter: Resets to page 1
  const handleSelectDifficulty = (diff: string) => {
    setSelectedDifficulty(diff);
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Batch Filter: Resets to page 1
  const handleSelectBatch = (batch: string) => {
    setSelectedBatch(batch);
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Page Size: Resets to page 1
  const handleSelectPageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Reset All Filters: Resets to page 1
  const handleResetFilters = () => {
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setSelectedBatch('');
    setSearchInput('');
    setAppliedSearch('');
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Page Change Handler
  const handlePageChange = (newPage: number) => {
    const safe = Math.max(1, Math.min(totalPages, newPage));
    setCurrentPage(safe);
    setJumpPageInput(safe.toString());
  };

  // Jump to page form submit
  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else {
      setJumpPageInput(currentPage.toString());
    }
  };

  // Interactive Question State Handlers
  const handleSelectOption = (questionId: string, optionId: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleRevealAnswer = (questionId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // ----------------------------------------------------
  // DAILY CHALLENGE HANDLERS
  // ----------------------------------------------------
  const handleDailySelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (dailySubmitted) return; // Locked once submitted

    const next = { ...dailyAnswers, [questionId]: optionKey };
    setDailyAnswers(next);

    // Persist immediately to localStorage
    try {
      localStorage.setItem(
        `bcs_daily_challenge_${todayStr}`,
        JSON.stringify({
          date: todayStr,
          answers: next,
          isSubmitted: false,
          savedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage error
    }
  };

  const handleDailySubmit = () => {
    if (!dailyData || dailyData.questions.length === 0) return;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    dailyData.questions.forEach((q) => {
      const ans = dailyAnswers[q.id];
      if (!ans) {
        unanswered++;
      } else if (ans === q.correct_option) {
        correct++;
      } else {
        wrong++;
      }
    });

    const rawScore = correct - wrong * 0.5;
    const finalScore = Math.max(0, Math.round(rawScore * 100) / 100);
    const percentage = Math.round((correct / dailyData.totalQuestions) * 100);

    const calculatedScore: DailyChallengeScore = {
      correct,
      wrong,
      unanswered,
      finalScore,
      percentage,
    };

    setDailyScore(calculatedScore);
    setDailySubmitted(true);

    // Save submission to localStorage
    try {
      localStorage.setItem(
        `bcs_daily_challenge_${todayStr}`,
        JSON.stringify({
          date: todayStr,
          answers: dailyAnswers,
          isSubmitted: true,
          score: calculatedScore,
          submittedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage error
    }

    // Optional background sync with server
    fetch('/api/questions/daily-challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: todayStr,
        answers: dailyAnswers,
      }),
    }).catch(() => {
      // Non-blocking
    });
  };

  const handleDailyRetake = () => {
    setDailyAnswers({});
    setDailySubmitted(false);
    setDailyScore(null);
    setActiveDailyIndex(0);

    try {
      localStorage.removeItem(`bcs_daily_challenge_${todayStr}`);
    } catch {
      // Ignore
    }
  };

  const handleSaveToMistakes = (q: QuestionBankItem) => {
    try {
      const existing = JSON.parse(localStorage.getItem('bcs_mistake_notebook') || '[]');
      if (!existing.some((item: any) => item.id === q.id || item.questionId === q.id)) {
        existing.push({
          id: q.id,
          questionId: q.id,
          subject: q.subject,
          topic: q.topic,
          question_bn: q.question_bn,
          question_en: q.question_en,
          correct_option: q.correct_option,
          explanation_bn: q.explanation_bn,
          savedAt: new Date().toISOString(),
        });
        localStorage.setItem('bcs_mistake_notebook', JSON.stringify(existing));
      }
      setSavedToMistakes((prev) => ({ ...prev, [q.id]: true }));
    } catch {
      // Ignore storage error
    }
  };

  const dailyQuestions = dailyData?.questions || [];
  const dailyTotal = dailyQuestions.length;
  const dailyAnsweredCount = Object.keys(dailyAnswers).length;
  const currentDailyQ = dailyQuestions[activeDailyIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-800">
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-pulse text-emerald-400" />
              <span>BPSC Syllabus Aligned • 20,000 Questions Repository</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              BCS Question Bank{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                (২০,০০০ প্রশ্নভাণ্ডার)
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed bangla-font max-w-3xl">
              বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)-এর ১০টি সাধারণ বিষয়ের ওপর তৈরি ২০,০০০ সংরক্ষিত প্রশ্ন (৮১টি ব্যাচে বিন্যস্ত: ব্যাচ ১–২ এ ১০০-১৫০টি ও ব্যাচ ৩–৮১ এ ২৫০টি প্রশ্ন)। প্রতিটি প্রশ্নের সাথে বাংলা ও ইংরেজি অনুবাদ, সঠিক উত্তর এবং বিশদ রেফারেন্সযুক্ত ব্যাখ্যা।
            </p>

            {/* Quick KPI Stat Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                  {manifest ? manifest.totalQuestions.toLocaleString() : '20,000'}
                </div>
                <div className="text-xs text-emerald-200">মোট প্রশ্ন (৮১ ব্যাচ)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">১০টি বিষয়</div>
                <div className="text-xs text-teal-200">পূর্ণাঙ্গ সিলেবাস কাভারেজ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-300">৮১ ব্যাচ</div>
                <div className="text-xs text-sky-200">স্ট্রাকচার্ড ডাটাবেজ ভলিউম</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">৭৫০+</div>
                <div className="text-xs text-amber-200">বিশেষজ্ঞ-নিরীক্ষিত কোর প্রশ্ন</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DAILY CHALLENGE SECTION FOR STUDENTS                                  */}
        {/* ========================================================================= */}
        <section
          aria-labelledby="daily-challenge-heading"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-900/10 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border-2 border-emerald-500/30 p-5 sm:p-8 shadow-md transition-all space-y-6"
        >
          {/* Top Banner / Status Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold shadow-sm">
                  <Flame className="h-4 w-4 animate-bounce text-amber-300 fill-amber-300" />
                  <span>আজকের ডেইলি চ্যালেঞ্জ</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-700">
                  <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{formatBengaliDate(todayStr)}</span>
                </span>
                {dailySubmitted ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 text-xs font-bold border border-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>চ্যালেঞ্জ সম্পন্ন</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 text-xs font-semibold border border-amber-300">
                    <Clock className="h-3.5 w-3.5 text-amber-600" />
                    <span>আজকের জন্য সক্রিয়</span>
                  </span>
                )}
              </div>

              <h2
                id="daily-challenge-heading"
                className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white bangla-font tracking-tight pt-1"
              >
                {dailyLoading
                  ? 'আজকের ডেইলি বিসিএস প্র্যাকটিস চ্যালেঞ্জ'
                  : `ডেইলি বিসিএস প্র্যাকটিস চ্যালেঞ্জ (${toBnDigits(dailyTotal)}টি বাছাইকৃত প্রশ্ন)`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 bangla-font">
                প্রতিদিন সকল বিসিএস পরীক্ষার্থীদের জন্য নির্ধারিত ৫টি বিশেষ প্রশ্ন। প্রতিদিনের ফলাফল ও অগ্রগতি স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে।
              </p>
            </div>

            {/* Score & Progress Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-emerald-500/20 shadow-sm flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    অগ্রগতি (Progress)
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {dailyLoading
                      ? 'লোড হচ্ছে...'
                      : `${toBnDigits(dailyAnsweredCount)} / ${toBnDigits(dailyTotal)} সম্পন্ন`}
                  </div>
                </div>
              </div>

              {dailySubmitted && dailyScore && (
                <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-amber-300" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-100">আপনার স্কোর</div>
                    <div className="text-base font-black">
                      {dailyScore.finalScore.toFixed(2)} / {dailyTotal}.00 ({toBnDigits(dailyScore.percentage)}%)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>চ্যালেঞ্জ অগ্রগতি</span>
              <span>
                {dailyLoading
                  ? 'লোড হচ্ছে...'
                  : `${Math.round((dailyAnsweredCount / (dailyTotal || 1)) * 100)}% সম্পন্ন`}
              </span>
            </div>
            <div
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={dailyAnsweredCount}
              aria-valuemin={0}
              aria-valuemax={dailyTotal}
            >
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${dailyLoading ? 0 : (dailyAnsweredCount / (dailyTotal || 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Daily Challenge Loading & Error State */}
          {dailyLoading && (
            <div className="py-12 text-center space-y-3">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-r-transparent" />
              <p className="text-xs sm:text-sm text-slate-500">আজকের ডেইলি চ্যালেঞ্জ প্রশ্নপত্র তৈরি হচ্ছে...</p>
            </div>
          )}

          {!dailyLoading && (dailyError || dailyQuestions.length === 0) && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-sm">
                    {dailyError || 'আজকের ডেইলি চ্যালেঞ্জ প্রশ্ন সাময়িকভাবে লোড করা যায়নি'}
                  </div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">
                    অনুগ্রহ করে নিচের বাটনে ক্লিক করে পুনরায় চেষ্টা করুন।
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => loadDailyChallenge()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-sm"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>পুনরায় চেষ্টা করুন (Retry)</span>
              </button>
            </div>
          )}

          {/* Completed Message Banner */}
          {!dailyLoading && !dailyError && dailySubmitted && dailyScore && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg space-y-3">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                    <Award className="h-7 w-7 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold bangla-font">
                      {dailyScore.percentage >= 80
                        ? 'অভিনন্দন! চমৎকার প্রস্তুতি! 🎉'
                        : dailyScore.percentage >= 60
                        ? 'ভালো প্রচেষ্টা! দারুণ কাজ করেছেন! 👍'
                        : 'চ্যালেঞ্জ সমাপ্ত! নিয়মিত অনুশীলনে উন্নতি হবে! 📚'}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 bangla-font">
                      আপনার আজকের স্কোর: <strong>{dailyScore.finalScore.toFixed(2)}</strong> (সঠিক:{' '}
                      {toBnDigits(dailyScore.correct)}, ভুল: {toBnDigits(dailyScore.wrong)}, অনুত্তরিত:{' '}
                      {toBnDigits(dailyScore.unanswered)}) • নেগেটিভ মার্কিং: -০.৫০
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDailyRetake}
                  className="px-4 py-2 bg-white text-emerald-800 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors shrink-0 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>পুনরায় প্র্যাকটিস</span>
                </button>
              </div>

              <div className="text-[11px] text-emerald-100 pt-1 border-t border-white/20 flex flex-wrap items-center justify-between gap-2">
                <span>আজকের ফলাফল স্বয়ংক্রিয়ভাবে সংরক্ষিত রয়েছে। প্রতিটি প্রশ্নের সঠিক উত্তর ও ব্যাখ্যা নিচে প্রদর্শিত হচ্ছে।</span>
                <span className="font-mono text-emerald-200">পরবর্তী চ্যালেঞ্জ: আগামীকাল রাত ১২:০০ টায়</span>
              </div>
            </div>
          )}

          {/* Question Stepper Tabs & Controls */}
          {!dailyLoading && !dailyError && dailyQuestions.length > 0 && (
            <div className="space-y-4">
              {/* Stepper Navigation Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  className="flex flex-wrap items-center gap-2"
                  role="tablist"
                  aria-label="Daily challenge question selector"
                >
                  {dailyQuestions.map((q, idx) => {
                    const isAnswered = Boolean(dailyAnswers[q.id]);
                    const isSelectedTab = !viewAllDaily && activeDailyIndex === idx;
                    const isCorrect = dailySubmitted && dailyAnswers[q.id] === q.correct_option;
                    const isWrong =
                      dailySubmitted && isAnswered && dailyAnswers[q.id] !== q.correct_option;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelectedTab}
                        aria-label={`Question ${idx + 1}: ${q.subject}`}
                        onClick={() => {
                          setViewAllDaily(false);
                          setActiveDailyIndex(idx);
                        }}
                        className={`h-9 sm:h-10 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                          isSelectedTab
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-1 ring-emerald-500 scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span>প্রশ্ন {toBnDigits(idx + 1)}</span>
                        {dailySubmitted ? (
                          isCorrect ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : isWrong ? (
                            <XCircle className="h-3.5 w-3.5 text-rose-400" />
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-slate-400" />
                          )
                        ) : isAnswered ? (
                          <span className="h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-300 animate-pulse" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* View All / Single Stepper Toggle */}
                <button
                  type="button"
                  onClick={() => setViewAllDaily(!viewAllDaily)}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{viewAllDaily ? 'একক প্রশ্ন ভিউ (Single Mode)' : 'সব প্রশ্ন একসাথে দেখুন (View All)'}</span>
                </button>
              </div>

              {/* Question Content Display (Single Stepper OR All 5 Questions) */}
              <div className="space-y-4">
                {(viewAllDaily ? dailyQuestions : [currentDailyQ]).filter(Boolean).map((q, idx) => {
                  const actualIndex = viewAllDaily ? idx : activeDailyIndex;
                  const meta = SUBJECT_METADATA[q.subject];
                  const chosenOption = dailyAnswers[q.id];
                  const isSubmitted = dailySubmitted;
                  const isMistakeSaved = savedToMistakes[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4"
                    >
                      {/* Question Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-bold text-[11px]">
                            প্রশ্ন {toBnDigits(actualIndex + 1)} / {toBnDigits(dailyTotal)}
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
                              ? 'সহজ'
                              : q.difficulty === 'medium'
                              ? 'মাঝারি'
                              : 'কঠিন'}
                          </span>

                          {isSubmitted && chosenOption && chosenOption !== q.correct_option && (
                            <button
                              type="button"
                              onClick={() => handleSaveToMistakes(q)}
                              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                                isMistakeSaved
                                  ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                                  : 'text-slate-500 hover:text-slate-800 border-slate-200 dark:border-slate-700'
                              }`}
                              title="মিস্টেক নোটবুকে সংরক্ষণ করুন"
                            >
                              <BookCheck className="h-3.5 w-3.5" />
                              <span>{isMistakeSaved ? 'নোটবুকে সেভড' : 'নোটবুকে যোগ'}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Question Stem */}
                      <div className="space-y-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white bangla-font leading-snug">
                          <span className="text-emerald-600 mr-2 font-mono">
                            {toBnDigits(actualIndex + 1)}.
                          </span>
                          {q.question_bn}
                        </h3>
                        {q.question_en && (
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                            {q.question_en}
                          </p>
                        )}
                      </div>

                      {/* Interactive Options Grid */}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
                        role="radiogroup"
                        aria-label={`Options for question ${actualIndex + 1}`}
                      >
                        {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                          const optionText = q.options[optKey];
                          const isCorrect = q.correct_option === optKey;
                          const isSelected = chosenOption === optKey;

                          let optionStyle =
                            'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

                          if (isSubmitted) {
                            if (isCorrect) {
                              optionStyle =
                                'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500';
                            } else if (isSelected && !isCorrect) {
                              optionStyle =
                                'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                            }
                          } else if (isSelected) {
                            optionStyle =
                              'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500 font-semibold';
                          }

                          return (
                            <button
                              key={optKey}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              tabIndex={0}
                              disabled={isSubmitted}
                              onClick={() => handleDailySelectOption(q.id, optKey)}
                              onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                  e.preventDefault();
                                  handleDailySelectOption(q.id, optKey);
                                }
                              }}
                              className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${optionStyle}`}
                            >
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                  isSubmitted && isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : isSubmitted && isSelected && !isCorrect
                                    ? 'bg-rose-600 text-white'
                                    : isSelected
                                    ? 'bg-emerald-600 text-white'
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

                      {/* Explanation & Source (Revealed upon Submission) */}
                      {isSubmitted && (
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm space-y-2.5">
                          <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span>
                              সঠিক উত্তর: ({q.correct_option}) {q.options[q.correct_option]}
                            </span>
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

                          <div className="pt-1 text-[11px] text-slate-500 flex items-center justify-between">
                            <span>
                              উৎস: {q.source_title}{' '}
                              {q.source_page_or_section ? `(${q.source_page_or_section})` : ''}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Daily Challenge Action Buttons & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                {!viewAllDaily ? (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      disabled={activeDailyIndex === 0}
                      onClick={() => setActiveDailyIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>আগের প্রশ্ন</span>
                    </button>

                    <button
                      type="button"
                      disabled={activeDailyIndex === dailyTotal - 1}
                      onClick={() => setActiveDailyIndex((prev) => Math.min(dailyTotal - 1, prev + 1))}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span>পরের প্রশ্ন</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div />
                )}

                {!dailySubmitted ? (
                  <button
                    type="button"
                    onClick={handleDailySubmit}
                    disabled={dailyAnsweredCount === 0}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>
                      {dailyAnsweredCount === dailyTotal
                        ? 'চ্যালেঞ্জ সাবমিট করুন (Submit Challenge)'
                        : `উত্তর সাবমিট করুন (${toBnDigits(dailyAnsweredCount)}/${toBnDigits(dailyTotal)} সম্পন্ন)`}
                    </span>
                  </button>
                ) : (
                  <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>আজকের ডেইলি চ্যালেঞ্জ সম্পন্ন ও সংরক্ষিত হয়েছে।</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 1. QUESTION BANK FILTERS & SEARCH                                         */}
        {/* ========================================================================= */}

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
              onClick={() => handleSelectSubject('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
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
                    onClick={() => handleSelectSubject(subj)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search input"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Search className="h-4 w-4" />
              <span>সার্চ (Search)</span>
            </button>
          </form>

          {/* Secondary Filter Dropdowns */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">কঠিনতা (Difficulty):</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => handleSelectDifficulty(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                  onChange={(e) => handleSelectBatch(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <option value="">সকল ব্যাচ (All 81 Batches • ২০,০০০ প্রশ্ন)</option>
                  {Array.from({ length: 81 }, (_, i) => i + 1).map((b) => {
                    const count = b === 1 ? 100 : b === 2 ? 150 : 250;
                    return (
                      <option key={b} value={b.toString()}>
                        ব্যাচ {b.toString().padStart(3, '0')} ({toBnDigits(count)}টি প্রশ্ন)
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">প্রতি পেজে:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handleSelectPageSize(parseInt(e.target.value, 10))}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
              appliedSearch) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>ফিল্টার রিসেট করুন (Reset Filters)</span>
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
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                        className={`p-1.5 rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
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
                          className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-start gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${optionStyle}`}
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded p-1"
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
                      উৎস: {q.source_title}{' '}
                      {q.source_page_or_section ? `(${q.source_page_or_section})` : ''}
                    </span>
                  </div>

                  {/* Detailed Explanation Panel */}
                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm space-y-2.5">
                      <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>
                          সঠিক উত্তর: ({q.correct_option}) {q.options[q.correct_option]}
                        </span>
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

        {/* ========================================================================= */}
        {/* 1. FIXED ACCESSIBLE & RESPONSIVE PAGINATION CONTROLS                      */}
        {/* ========================================================================= */}
        {!isLoading && totalPages > 1 && (
          <nav
            aria-label="Question bank pagination"
            className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Page Count & Total MCQs Status */}
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              পেজ <span className="font-bold text-slate-900 dark:text-white font-mono">{currentPage}</span> /{' '}
              <span className="font-mono">{totalPages}</span> (মোট{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                {totalQuestions.toLocaleString()}
              </span>{' '}
              টি প্রশ্ন)
            </div>

            {/* Pagination Button Controls */}
            <div className="flex flex-wrap items-center justify-center gap-1.5" role="navigation">
              {/* First Page Shortcut */}
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                aria-label="First page"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-slate-700 dark:text-slate-300 transition-colors"
                title="প্রথম পেজ (First Page)"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              {/* Previous Page Control */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
                <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">(পূর্ববর্তী)</span>
              </button>

              {/* Numbered Page Buttons with Ellipses */}
              {getVisiblePages(currentPage, totalPages).map((p, idx) => {
                if (p === 'ellipsis') {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      aria-hidden="true"
                      className="px-2 py-1 text-slate-400 dark:text-slate-600 font-bold select-none text-xs"
                    >
                      …
                    </span>
                  );
                }

                const isCurrent = p === currentPage;
                return (
                  <button
                    key={`page-${p}`}
                    type="button"
                    onClick={() => handlePageChange(p)}
                    aria-label={`Go to page ${p}`}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`min-w-[36px] h-9 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-500 scale-105'
                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              {/* Next Page Control */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span>Next</span>
                <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">(পরবর্তী)</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Last Page Shortcut */}
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-slate-700 dark:text-slate-300 transition-colors"
                title="শেষ পেজ (Last Page)"
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
                aria-label="Enter page number to jump to"
                className="w-16 px-2 py-1.5 text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                যান
              </button>
            </form>
          </nav>
        )}

        {/* Bottom Call-to-Action: Direct Mock Test & Practice */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold bangla-font">
              এই ২০,০০০ প্রশ্ন নিয়ে এখনই মক টেস্ট দিন!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 bangla-font max-w-xl">
              টাইমড পরীক্ষা ও নেগেティブ মার্কিং (-০.৫০)-এর সাথে আপনার রিয়েল প্রস্তুতি যাচাই করুন।
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
