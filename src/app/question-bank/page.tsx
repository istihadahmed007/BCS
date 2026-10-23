'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Flag,
  HelpCircle,
  Layers,
  Library,
  ListFilter,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId } from '@/types';
import { SYLLABUS_TOPICS } from '@/data/syllabus';
import MCQPEDIA_SETS from '@/data/curriculum/mcqpediabd_324_sets.json';

interface ExamSetItem {
  course: string;
  category: string;
  examId: number;
  examTitle: string;
  questionCount: number;
}

const SET_CATEGORIES = [
  { id: 'all', nameBn: 'সকল প্রশ্ন সেট', count: 324, icon: '📚' },
  { id: 'Session Wise', nameBn: 'Session Wise (মেডিকেল ও ডেন্টাল)', count: 24, icon: '🎓' },
  { id: 'Anatomy', nameBn: 'অ্যানাটমি (Anatomy)', count: 50, icon: '🩻' },
  { id: 'Physiology & Biochemistry', nameBn: 'ফিজিওলজি ও বায়োকেমিস্ট্রি', count: 50, icon: '🧬' },
  { id: 'Pathology & Microbiology', nameBn: 'প্যাথলজি ও মাইক্রোবায়োলজি', count: 40, icon: '🔬' },
  { id: 'Medicine', nameBn: 'মেডিসিন ও সহযোগী বিষয়', count: 80, icon: '💊' },
  { id: 'Community Medicine', nameBn: 'কমিউনিটি মেডিসিন', count: 10, icon: '🏥' },
  { id: 'Forensic Medicine', nameBn: 'ফরেনসিক মেডিসিন', count: 10, icon: '⚖️' },
  { id: 'Pharmacology', nameBn: 'ফার্মাকোলজি', count: 20, icon: '🧪' },
  { id: 'Surgery', nameBn: 'সার্জারি ও সহযোগী বিষয়', count: 40, icon: '🩺' },
];

const SET_CATEGORY_THEME: Record<string, { bg: string; text: string; border: string; pill: string }> = {
  'Session Wise': { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800', pill: 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200' },
  'Anatomy': { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800', pill: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200' },
  'Physiology & Biochemistry': { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800', pill: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200' },
  'Pathology & Microbiology': { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800', pill: 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200' },
  'Medicine': { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800', pill: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200' },
  'Community Medicine': { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800', pill: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200' },
  'Forensic Medicine': { bg: 'bg-slate-50 dark:bg-slate-900', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-300 dark:border-slate-700', pill: 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200' },
  'Pharmacology': { bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800', pill: 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200' },
  'Surgery': { bg: 'bg-teal-50 dark:bg-teal-950/40', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800', pill: 'bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200' },
};

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
  'Medical Science Part I': {
    nameBn: 'মেডিক্যাল সায়েন্স ১ম পত্র (Basic Medical Science)',
    color: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800',
    iconBg: 'from-teal-500 to-emerald-600',
  },
  'Medical Science Part II': {
    nameBn: 'মেডিক্যাল সায়েন্স ২য় পত্র (Clinical Medical Science)',
    color: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-800',
    iconBg: 'from-cyan-500 to-blue-600',
  },
  'Dental Science Part I': {
    nameBn: 'ডেন্টাল সায়েন্স ১ম পত্র (Basic Dental Science)',
    color: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800',
    iconBg: 'from-indigo-500 to-purple-600',
  },
  'Dental Science Part II': {
    nameBn: 'ডেন্টাল সায়েন্স ২য় পত্র (Clinical Dental Science)',
    color: 'text-violet-600 dark:text-violet-400',
    badgeBg: 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800',
    iconBg: 'from-violet-500 to-pink-600',
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
  const router = useRouter();

  // Track and Stream Enrollment State
  const [track, setTrack] = useState<ExamTrackId>('special_bcs_health_51_2026');
  const [stream, setStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [isLaunchingTest, setIsLaunchingTest] = useState<boolean>(false);

  // Initialize track and stream from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bcs_enrollment');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.trackId) setTrack(parsed.trackId);
        if (parsed.stream) setStream(parsed.stream);
      }
    } catch {}
  }, []);

  const handleStreamChange = (newTrack: ExamTrackId, newStream: ProfessionalStreamId) => {
    setTrack(newTrack);
    setStream(newStream);
    setSelectedSubject('all');
    setSelectedBatch('');
    setCurrentPage(1);
    setJumpPageInput('1');
    try {
      localStorage.setItem(
        'bcs_enrollment',
        JSON.stringify({ trackId: newTrack, stream: newStream, dailyMinutes: 120 })
      );
    } catch {}
  };

  const handleLaunchTest = async (
    testType: 'full_mock' | 'subject_test',
    title: string,
    durationMinutes: number
  ) => {
    setIsLaunchingTest(true);
    try {
      const res = await fetch('/api/test/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'candidate-user-1',
          examTrackId: track,
          professionalStream: track === 'general_bcs' ? 'general' : stream,
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
    } catch (err: any) {
      alert('Error starting test: ' + err.message);
    } finally {
      setIsLaunchingTest(false);
    }
  };

  // Questions Bank Repository State
  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [manifest, setManifest] = useState<ManifestSummary | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Filters State
  const [bankArea, setBankArea] = useState<'all' | 'general' | 'professional'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedReviewStatus, setSelectedReviewStatus] = useState<string>('all');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [jumpPageInput, setJumpPageInput] = useState<string>('1');

  // Practice Mode State
  const [practiceMode, setPracticeMode] = useState<'batch' | 'single'>('batch');
  const [singleFocusIndex, setSingleFocusIndex] = useState<number>(0);

  // 324 Question Sets Navigation State
  const [activeMainSection, setActiveMainSection] = useState<'sets' | 'explorer'>('sets');
  const [selectedSetCategory, setSelectedSetCategory] = useState<string>('all');
  const [setSearchTerm, setSetSearchTerm] = useState<string>('');
  const [setPage, setSetPage] = useState<number>(1);
  const setsPerPage = 24;

  const filteredSets = (MCQPEDIA_SETS as ExamSetItem[]).filter((s) => {
    const matchesCategory = selectedSetCategory === 'all' || s.category === selectedSetCategory;
    const matchesSearch =
      !setSearchTerm ||
      s.examTitle.toLowerCase().includes(setSearchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(setSearchTerm.toLowerCase()) ||
      String(s.examId).includes(setSearchTerm);
    return matchesCategory && matchesSearch;
  });

  const totalSetPages = Math.max(1, Math.ceil(filteredSets.length / setsPerPage));
  const currentSetsPageItems = filteredSets.slice(
    (setPage - 1) * setsPerPage,
    setPage * setsPerPage
  );

  // Flag Question Error Modal State
  const [flagModalQuestion, setFlagModalQuestion] = useState<QuestionBankItem | null>(null);
  const [flagReason, setFlagReason] = useState<string>('wrong_answer');
  const [flagComment, setFlagComment] = useState<string>('');
  const [isFlagSubmitting, setIsFlagSubmitting] = useState<boolean>(false);
  const [flagSuccessMsg, setFlagSuccessMsg] = useState<string | null>(null);

  // Topic-Wise Performance Tracker (Attempted, Correct, Wrong)
  const [topicStats, setTopicStats] = useState<Record<string, { attempted: number; correct: number; wrong: number }>>({});

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
        if (selectedTopic !== 'all') params.set('topic', selectedTopic);
        if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty);
        if (selectedReviewStatus !== 'all') params.set('review_status', selectedReviewStatus);
        if (selectedBatch) params.set('batch', selectedBatch);
        if (appliedSearch) params.set('search', appliedSearch);
        params.set('track', track);
        params.set('stream', stream);

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
  }, [
    currentPage,
    pageSize,
    selectedSubject,
    selectedTopic,
    selectedDifficulty,
    selectedReviewStatus,
    selectedBatch,
    appliedSearch,
    track,
    stream,
  ]);

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

  // Topic Filter: Resets to page 1
  const handleSelectTopic = (top: string) => {
    setSelectedTopic(top);
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Review Status Filter: Resets to page 1
  const handleSelectReviewStatus = (status: string) => {
    setSelectedReviewStatus(status);
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  // Bank Area Switcher (General vs Professional vs All)
  const handleSelectBankArea = (area: 'all' | 'general' | 'professional') => {
    setBankArea(area);
    setSelectedTopic('all');
    setCurrentPage(1);
    setJumpPageInput('1');
    if (area === 'general') {
      setSelectedSubject('Bangla');
    } else if (area === 'professional') {
      setSelectedSubject(
        stream === 'assistant_surgeon' ? 'Medical Science Part I' : 'Dental Science Part I'
      );
    } else {
      setSelectedSubject('all');
    }
  };

  // Reset All Filters: Resets to page 1
  const handleResetFilters = () => {
    setSelectedSubject('all');
    setSelectedTopic('all');
    setSelectedDifficulty('all');
    setSelectedReviewStatus('all');
    setSelectedBatch('');
    setBankArea('all');
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

    // Track Topic Performance
    const q = questions.find((item) => item.id === questionId);
    if (q) {
      const topicKey = q.topic || q.subject || 'সাধারণ বিষয়';
      const isCorrect = q.correct_option === optionId;
      setTopicStats((prev) => {
        const cur = prev[topicKey] || { attempted: 0, correct: 0, wrong: 0 };
        return {
          ...prev,
          [topicKey]: {
            attempted: cur.attempted + 1,
            correct: cur.correct + (isCorrect ? 1 : 0),
            wrong: cur.wrong + (isCorrect ? 0 : 1),
          },
        };
      });
    }
  };

  // Flag Question Error Submission
  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagModalQuestion) return;
    setIsFlagSubmitting(true);
    setFlagSuccessMsg(null);
    try {
      const res = await fetch('/api/questions/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: flagModalQuestion.id,
          reason: flagReason,
          comment: flagComment,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFlagSuccessMsg(json.message || 'Error flagged successfully');
        setTimeout(() => {
          setFlagModalQuestion(null);
          setFlagSuccessMsg(null);
          setFlagComment('');
        }, 1800);
      } else {
        alert(json.error || 'Failed to submit flag');
      }
    } catch (err: any) {
      alert('Error submitting report: ' + err.message);
    } finally {
      setIsFlagSubmitting(false);
    }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-8">
      {/* ========================================================================= */}
      {/* 1. CANDIDATE STREAM & TRACK SWITCHER                                      */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ক্যান্ডিডেট স্ট্রিম নির্বাচন করুন (Candidate Stream)
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                ৫১তম বিশেষ বিসিএস
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium bangla-font mt-0.5">
              আপনার পদ অনুসারে প্রফেশনাল ১০০ মার্ক (মেডিকেল/ডেন্টাল) ও পূর্ণাঙ্গ ২০০ নম্বরের মডেল টেস্ট ফিল্টার হবে।
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleStreamChange('special_bcs_health_51_2026', 'assistant_surgeon')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              track === 'special_bcs_health_51_2026' && stream === 'assistant_surgeon'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>🩺</span>
            <span>সহকারী সার্জন (MBBS)</span>
          </button>

          <button
            type="button"
            onClick={() => handleStreamChange('special_bcs_health_51_2026', 'assistant_dental_surgeon')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              track === 'special_bcs_health_51_2026' && stream === 'assistant_dental_surgeon'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>🦷</span>
            <span>সহকারী ডেন্টাল সার্জন (BDS)</span>
          </button>

          <button
            type="button"
            onClick={() => handleStreamChange('general_bcs', 'general')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              track === 'general_bcs'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-2 ring-blue-500'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>📘</span>
            <span>সাধারণ বিসিএস (General)</span>
          </button>
        </div>
      </div>

      {/* Reference Alert / Disclaimer Strip */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-[#FFF5E6]/70 border border-[#D97706]/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-[#D97706] tracking-wider">
                বিসিএস পরীক্ষা প্রস্তুতি নির্দেশিকা (Educational Practice Notice)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D97706]/15 text-[#D97706] font-bold">
                BPSC 51st Special & 46th General Aligned
              </span>
            </div>
            <p className="text-xs text-[#66748B] leading-relaxed bangla-font mt-0.5">
              এই প্রশ্নভাণ্ডারের সকল সাধারণ, মেডিকেল ও ডেন্টাল বিষয়ক প্রশ্নাবলী বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)-এর সার্কুলার ও সিলেবাস অনুযায়ী কেবলমাত্র পরীক্ষার অনুশীলন ও আত্মমূল্যায়নের উদ্দেশ্যে প্রণীত।
            </p>
          </div>
        </div>
      </div>

      {/* Primary Area Switcher: Segmented Pill Control */}
      <div className="bg-white p-2 rounded-2xl border border-[#E3E8F2] flex flex-wrap items-center gap-2 shadow-xs">
        <button
          type="button"
          onClick={() => handleSelectBankArea('all')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            bankArea === 'all'
              ? 'bg-[#6538F5] text-white shadow-xs'
              : 'text-[#66748B] hover:text-[#17233F]'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>সম্মিলিত প্রশ্নভাণ্ডার (All Bank — ২০,২০০ প্রশ্ন)</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectBankArea('general')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            bankArea === 'general'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#66748B] hover:text-[#17233F]'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>General Part (আবশ্যিক সাধারণ — ১০০ নম্বর)</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectBankArea('professional')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            bankArea === 'professional'
              ? 'bg-[#059669] text-white shadow-xs'
              : 'text-[#66748B] hover:text-[#17233F]'
          }`}
        >
          <Stethoscope className="h-4 w-4" />
          <span>Professional Part (মেডিকেল ও ডেন্টাল — ১০০ নম্বর)</span>
        </button>
      </div>

      {/* Hero Header: Bright White Panel with 4 Metric Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E3E8F2] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EBFF] border border-[#6538F5]/20 text-[#6538F5] text-xs font-black">
              <Sparkles className="h-3.5 w-3.5" />
              <span>BPSC Official Syllabus • ২০,২০০টি সংরক্ষিত প্রশ্নভাণ্ডার ও ৩২৪টি সেট</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#17233F] tracking-tight">
              BCS Question Bank & Examination Center
            </h1>

            <p className="text-xs sm:text-sm text-[#66748B] font-normal leading-relaxed bangla-font">
              বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)-এর সার্কুলার অনুযায়ী সাধারণ অংশ (১০০ মার্ক) এবং প্রফেশনাল পার্ট (মেডিকেল ও ডেন্টাল সায়েন্স ১০০ মার্ক)-এর সমন্বয়ে গঠিত স্বয়ংসম্পূর্ণ বিসিএস প্রস্তুতি প্ল্যাটফর্ম।
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6538F5] hover:bg-[#8055F7] text-white text-xs font-bold shadow-xs transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Start Mock Test</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards Row (Inspired by reference screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-[#E3E8F2]">
          <div className="bg-[#F8FAFF] rounded-2xl p-4 border border-[#EDF3FF]">
            <div className="text-2xl sm:text-3xl font-black text-[#17233F]">
              {manifest ? manifest.totalQuestions.toLocaleString() : '20,200'}
            </div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">মোট প্রশ্ন (৮৫ ব্যাচ)</div>
            <span className="inline-block mt-2 text-[10px] font-bold text-[#6538F5] bg-[#F0EBFF] px-2 py-0.5 rounded-md">
              Verified MCQs
            </span>
          </div>

          <div className="bg-[#F8FAFF] rounded-2xl p-4 border border-[#EDF3FF]">
            <div className="text-2xl sm:text-3xl font-black text-[#2563EB]">১৪টি বিষয়</div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">সাধারণ + মেডিকেল + ডেন্টাল</div>
            <span className="inline-block mt-2 text-[10px] font-bold text-[#2563EB] bg-[#EDF3FF] px-2 py-0.5 rounded-md">
              100% Curated
            </span>
          </div>

          <div className="bg-[#F8FAFF] rounded-2xl p-4 border border-[#EDF3FF]">
            <div className="text-2xl sm:text-3xl font-black text-[#059669]">৩২৪টি সেট</div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">১৭,৪০০টি প্র্যাকটিস প্রশ্ন</div>
            <span className="inline-block mt-2 text-[10px] font-bold text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-md">
              Instant Tests
            </span>
          </div>

          <div className="bg-[#F8FAFF] rounded-2xl p-4 border border-[#EDF3FF]">
            <div className="text-2xl sm:text-3xl font-black text-[#D97706]">১০০%</div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">সিলেবাস কাভারেজ</div>
            <span className="inline-block mt-2 text-[10px] font-bold text-[#D97706] bg-[#FFF5E6] px-2 py-0.5 rounded-md">
              BPSC Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Primary Section Switcher: 324 Exam Sets vs Question Explorer */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-white rounded-2xl border border-[#E3E8F2] shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveMainSection('sets')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeMainSection === 'sets'
                ? 'bg-[#059669] text-white shadow-xs'
                : 'text-[#66748B] hover:text-[#17233F]'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>৩২৪টি প্র্যাকটিস প্রশ্ন সেট (১৭,৪০০ MCQ)</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
              324 Sets
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainSection('explorer')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeMainSection === 'explorer'
                ? 'bg-[#6538F5] text-white shadow-xs'
                : 'text-[#66748B] hover:text-[#17233F]'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>বিষয়ভিত্তিক প্রশ্ন এক্সপ্লোরার (২০,২০০ MCQ)</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
              Explorer
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden md:block">
          {activeMainSection === 'sets'
            ? 'ক্যাটাগরি ও বিষয় অনুযায়ী ৩২৪টি সুবিন্যস্ত প্রশ্ন সেট'
            : 'সকল ব্যাচ ও বিষয়ের বিশদ প্রশ্নভাণ্ডার ফিল্টার'}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 324 QUESTION SETS SECTION                                                */}
      {/* ========================================================================= */}
      {activeMainSection === 'sets' && (
        <section aria-labelledby="question-sets-heading" className="space-y-6 pt-1">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-700">
                  ৩২৪টি পরীক্ষা সেট • ১৭,৪০০টি প্রশ্ন
                </span>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
                  {selectedSetCategory === 'all' ? 'সকল ক্যাটাগরি' : selectedSetCategory}
                </span>
              </div>
              <h2 id="question-sets-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white bangla-font mt-2">
                বিসিএস মেডিকেল ও ডেন্টাল প্র্যাকটিস প্রশ্ন সেট (Question Sets Bank)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 bangla-font mt-1">
                মেডিকেল ও ডেন্টাল প্রশ্নব্যাংক এবং স্পেশাল বিসিএস মেডিকেল পার্ট অনলাইন প্র্যাকটিস এক্সাম ব্যাচের প্রতিটি সেটের বিস্তারিত তালিকা। সরাসরি যে কোনো সেটে মক টেস্ট শুরু করুন।
              </p>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-80 relative">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={setSearchTerm}
                onChange={(e) => {
                  setSetSearchTerm(e.target.value);
                  setSetPage(1);
                }}
                placeholder="সেটের নাম বা বিষয় লিখে খুঁজুন..."
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-xs"
              />
              {setSearchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSetSearchTerm('');
                    setSetPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {SET_CATEGORIES.map((cat) => {
              const isSelected = selectedSetCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedSetCategory(cat.id);
                    setSetPage(1);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isSelected
                        ? 'bg-emerald-700 text-emerald-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sets Results Status & Count */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
            <span>
              মোট <strong className="text-emerald-600 dark:text-emerald-400">{filteredSets.length}</strong>টি সেট পাওয়া গেছে
              {selectedSetCategory !== 'all' ? ` (${selectedSetCategory})` : ''}
              {setSearchTerm ? ` • ফিল্টার: "${setSearchTerm}"` : ''}
            </span>
            <span>
              পৃষ্ঠা {toBnDigits(setPage)} / {toBnDigits(totalSetPages)}
            </span>
          </div>

          {/* Sets Grid */}
          {currentSetsPageItems.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
              <div className="text-base font-bold text-slate-800 dark:text-slate-200">
                কোনো প্রশ্ন সেট পাওয়া যায়নি
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                আপনার খোঁজার সাথে মেলে এমন কোনো সেট নেই। দয়া করে অনুসন্ধান পরিবর্তন করুন বা অন্য ক্যাটাগরি নির্বাচন করুন।
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSetCategory('all');
                  setSetSearchTerm('');
                  setSetPage(1);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
              >
                সকল সেট দেখান
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentSetsPageItems.map((s) => {
                const theme = SET_CATEGORY_THEME[s.category] || {
                  bg: 'bg-slate-50 dark:bg-slate-900',
                  text: 'text-slate-700 dark:text-slate-300',
                  border: 'border-slate-200 dark:border-slate-800',
                  pill: 'bg-slate-100 text-slate-700',
                };
                const durationMins = s.questionCount === 100 ? 60 : 30;

                return (
                  <div
                    key={`${s.category}-${s.examId}`}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.pill}`}>
                          {s.category}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-slate-400">
                          ID: #{s.examId}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {s.examTitle}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          {s.course}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 block">প্রশ্ন ও পূর্ণমান</span>
                          <span className="font-extrabold text-slate-800 dark:text-slate-200">
                            {toBnDigits(s.questionCount)} MCQ ({toBnDigits(s.questionCount)} মার্ক)
                          </span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 block">নির্ধারিত সময়</span>
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                            {toBnDigits(durationMins)} মিনিট
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleLaunchTest(
                            'subject_test',
                            `${s.examTitle} (${s.category})`,
                            durationMins
                          )
                        }
                        disabled={isLaunchingTest}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <Play className="h-3.5 w-3.5 fill-white" />
                        <span>মক টেস্ট দিন</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMainSection('explorer');
                          setSelectedSubject(
                            s.category.includes('Dental')
                              ? 'Dental Science Part I'
                              : 'Medical Science Part I'
                          );
                          setSearchInput(s.examTitle.replace(/^[0-9.]+\s*/, '').replace(/\s*Set\s+[A-Z]$/, ''));
                          setAppliedSearch(s.examTitle.replace(/^[0-9.]+\s*/, '').replace(/\s*Set\s+[A-Z]$/, ''));
                          setCurrentPage(1);
                        }}
                        title="প্রশ্নভাণ্ডারে এই সেটের প্রশ্ন দেখুন"
                        className="py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sets Pagination Controls */}
          {totalSetPages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                ৩২৪টি সেটের মধ্যে {(setPage - 1) * setsPerPage + 1} থেকে{' '}
                {Math.min(setPage * setsPerPage, filteredSets.length)} দেখাচ্ছে
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={setPage === 1}
                  onClick={() => setSetPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>আগের পাতা</span>
                </button>

                <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {toBnDigits(setPage)} / {toBnDigits(totalSetPages)}
                </div>

                <button
                  type="button"
                  disabled={setPage === totalSetPages}
                  onClick={() => setSetPage((p) => Math.min(totalSetPages, p + 1))}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 flex items-center gap-1"
                >
                  <span>পরের পাতা</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. THREE CORE QUESTION-BANK ENTRY POINTS                                 */}
      {/* ========================================================================= */}
      {activeMainSection === 'explorer' && (
        <>
      <section aria-labelledby="qb-entry-points-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 id="qb-entry-points-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              তিনটি প্রধান প্রস্তুতি এন্ট্রি পয়েন্ট (Three Question-Bank Entry Points)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 bangla-font mt-0.5">
              সাধারণ বিষয় ১০০ মার্ক, প্রফেশনাল স্পেশাল ১০০ মার্ক অথবা ২০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট নির্বাচন করুন।
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-fit">
            সিলেবাস-ভিত্তিক সুনির্দিষ্ট বিভাজন
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card A: General Part — 100 Marks */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                  আবশ্যিক সাধারণ অংশ
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                  ১০০ নম্বর
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  General Part — 100 Marks
                </h3>
                <p className="text-xs text-slate-500 bangla-font mt-1 leading-relaxed">
                  সকল বিসিএস প্রার্থীর জন্য আবশ্যিক ৬টি বিষয়ের ১০০ নম্বরের প্রশ্নভাণ্ডার ও পূর্ণাঙ্গ অনুশীলন।
                </p>
              </div>

              {/* 6 Subject quotas */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">বাংলা ভাষা ও সাহিত্য</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">২০</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">ইংরেজি ভাষা ও সাহিত্য</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">২০</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">বাংলাদেশ বিষয়াবলী</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">২০</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">আন্তর্জাতিক বিষয়াবলী</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">২০</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">গাণিতিক যুক্তি</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">১০</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">মানসিক দক্ষতা</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">১০</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => handleLaunchTest('subject_test', 'General Part (100 Marks) Official Model Test', 60)}
                disabled={isLaunchingTest}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                <span>১০০ নম্বরের সাধারণ মডেল টেস্ট দিন (৬০ মিনিট)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubject('all');
                  document.getElementById('question-explorer')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Library className="h-3.5 w-3.5 text-blue-500" />
                <span>সাধারণ প্রশ্নভাণ্ডার ব্রাউজ করুন</span>
              </button>
            </div>
          </div>

          {/* Card B: Professional Part — 100 Marks */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                  {stream === 'assistant_surgeon'
                    ? 'মেডিকেল সায়েন্স (MBBS)'
                    : stream === 'assistant_dental_surgeon'
                    ? 'ডেন্টাল সায়েন্স (BDS)'
                    : 'সাধারণ ক্যাডার'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                  ১০০ নম্বর
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {stream === 'assistant_surgeon'
                    ? 'Medical Science — 100 Marks'
                    : stream === 'assistant_dental_surgeon'
                    ? 'Dental Science — 100 Marks'
                    : 'Professional Specialty Section'}
                </h3>
                <p className="text-xs text-slate-500 bangla-font mt-1 leading-relaxed">
                  {stream === 'assistant_surgeon'
                    ? '৫১তম বিশেষ বিসিএস সহকারী সার্জন (স্বাস্থ্য) অফিসিয়াল সিলেবাস অনুযায়ী ১০০ নম্বরের প্রফেশনাল পার্ট।'
                    : stream === 'assistant_dental_surgeon'
                    ? '৫১তম বিশেষ বিসিএস সহকারী ডেন্টাল সার্জন অফিসিয়াল সিলেবাস অনুযায়ী ১০০ নম্বরের ডেন্টাল পার্ট।'
                    : 'সাধারণ বিসিএস প্রার্থীরা ১০টি সাধারণ বিষয়ের পূর্ণাঙ্গ ২০০ নম্বরের পেপারে অংশ নেন।'}
                </p>
              </div>

              {/* Stream Breakdown */}
              {stream === 'assistant_surgeon' && (
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                    <div className="flex justify-between items-center font-bold text-teal-900 dark:text-teal-300">
                      <span>মেডিক্যাল সায়েন্স ১ম পত্র (Part I)</span>
                      <span className="font-mono">৫০ নম্বর</span>
                    </div>
                    <p className="text-[11px] text-teal-700 dark:text-teal-400 mt-1">
                      Anatomy, Physiology & Biochem, Pathology & Microbio, Pharmacology, Community & Forensic Med
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                    <div className="flex justify-between items-center font-bold text-cyan-900 dark:text-cyan-300">
                      <span>মেডিক্যাল সায়েন্স ২য় পত্র (Part II)</span>
                      <span className="font-mono">৫০ নম্বর</span>
                    </div>
                    <p className="text-[11px] text-cyan-700 dark:text-cyan-400 mt-1">
                      Internal Medicine & Allied, General Surgery & Allied, Obs & Gynae, Pediatrics
                    </p>
                  </div>
                </div>
              )}

              {stream === 'assistant_dental_surgeon' && (
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex justify-between items-center font-bold text-indigo-900 dark:text-indigo-300">
                      <span>ডেন্টাল সায়েন্স ১ম পত্র (Part I)</span>
                      <span className="font-mono">৫০ নম্বর</span>
                    </div>
                    <p className="text-[11px] text-indigo-700 dark:text-indigo-400 mt-1">
                      Dental Anatomy, Histology, Materials, Oral Pathology & Microbiology, Basic Sciences
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-50/70 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800">
                    <div className="flex justify-between items-center font-bold text-violet-900 dark:text-violet-300">
                      <span>ডেন্টাল সায়েন্স ২য় পত্র (Part II)</span>
                      <span className="font-mono">৫০ নম্বর</span>
                    </div>
                    <p className="text-[11px] text-violet-700 dark:text-violet-400 mt-1">
                      Oral Surgery & Anesthesia, Conservative Dentistry & Endodontics, Orthodontics, Periodontology
                    </p>
                  </div>
                </div>
              )}

              {track === 'general_bcs' && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
                  সাধারণ বিসিএসের সিলেবাসে কোনো মেডিক্যাল বা ডেন্টাল অংশ থাকে না। এতে বিজ্ঞান, কম্পিউটার, ভূগোল ও সুশাসনসহ মোট ১০টি সাধারণ বিষয় অন্তর্ভুক্ত থাকে।
                </div>
              )}
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              {track !== 'general_bcs' ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleLaunchTest(
                        'subject_test',
                        stream === 'assistant_surgeon'
                          ? 'Medical Science (100 Marks) Official Model Test'
                          : 'Dental Science (100 Marks) Official Model Test',
                        60
                      )
                    }
                    disabled={isLaunchingTest}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>
                      ১০০ নম্বরের {stream === 'assistant_surgeon' ? 'মেডিকেল' : 'ডেন্টাল'} মডেল টেস্ট দিন (৬০ মিনিট)
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubject(
                        stream === 'assistant_surgeon' ? 'Medical Science Part I' : 'Dental Science Part I'
                      );
                      document.getElementById('question-explorer')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Stethoscope className="h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      {stream === 'assistant_surgeon' ? 'মেডিকেল' : 'ডেন্টাল'} প্রশ্নভাণ্ডার ব্রাউজ করুন
                    </span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubject('Science');
                    document.getElementById('question-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  <span>সাধারণ বিজ্ঞান ও প্রযুক্তি ব্রাউজ করুন</span>
                </button>
              )}
            </div>
          </div>

          {/* Card C: Full Mock Test — 200 Marks */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-2 border-emerald-500/50 rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              BPSC সার্কুলার সিমুলেশন
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  পূর্ণাঙ্গ মডেল টেস্ট
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">২০০ নম্বর</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">
                  Full Mock Test — 200 Marks
                </h3>
                <p className="text-xs text-slate-300 bangla-font mt-1 leading-relaxed">
                  ১০০ নম্বর সাধারণ + ১০০ নম্বর প্রফেশনাল পার্টের সমন্বয়ে অফিসিয়াল পরীক্ষার হুবহু পূর্ণাঙ্গ মডেল টেস্ট।
                </p>
              </div>

              {/* Exam rules strip */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-400">মোট প্রশ্ন:</span>
                  <span className="font-bold text-white">২০০টি MCQ (১০০ সাধারণ + ১০০ প্রফেশনাল)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-400">পরীক্ষার সময়:</span>
                  <span className="font-bold text-amber-300 font-mono">১২০ মিনিট (২ ঘণ্টা)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-400">সঠিক / ভুল উত্তর:</span>
                  <span className="font-bold text-emerald-400 font-mono">+১.০০ / -০.৫০ মার্ক</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-400">প্রফেশনাল ধারা:</span>
                  <span className="font-semibold text-white">
                    {stream === 'assistant_surgeon'
                      ? 'মেডিকেল সায়েন্স (MBBS)'
                      : stream === 'assistant_dental_surgeon'
                      ? 'ডেন্টাল সায়েন্স (BDS)'
                      : 'সাধারণ বিসিএস'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={() =>
                  handleLaunchTest(
                    'full_mock',
                    track === 'special_bcs_health_51_2026'
                      ? `51st Special BCS Health Full Mock Test (200 Marks - ${
                          stream === 'assistant_surgeon' ? 'Assistant Surgeon' : 'Dental Surgeon'
                        })`
                      : 'General BCS Full Mock Test (200 Marks)',
                    120
                  )
                }
                disabled={isLaunchingTest}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Target className="h-4 w-4" />
                <span>পূর্ণাঙ্গ ১২০ মিনিটের মক টেস্ট শুরু করুন</span>
              </button>
              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  নেগেটিভ মার্কিং (-০.৫০) সার্ভার প্রান্তে স্বয়ংক্রিয়ভাবে কার্যকর হবে
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DAILY CHALLENGE SECTION FOR STUDENTS                                  */}
      {/* ========================================================================= */}
      <section
        aria-labelledby="daily-challenge-heading"
        className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs p-5 sm:p-8 space-y-6"
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
        <div id="question-explorer" className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Library className="h-4 w-4 text-emerald-600" />
              <span>
                বিষয়ভিত্তিক ব্রাউজ করুন ({stream === 'assistant_surgeon' ? 'সাধারণ + মেডিকেল সায়েন্স' : stream === 'assistant_dental_surgeon' ? 'সাধারণ + ডেন্টাল সায়েন্স' : '১০টি সাধারণ বিষয়'})
              </span>
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
              {totalQuestions.toLocaleString()} টি প্রশ্ন ফিল্টার হয়েছে
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
              <span>সকল অনুমোদিত বিষয় (All)</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedSubject === 'all'
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {totalQuestions.toLocaleString()}
              </span>
            </button>

            {manifest &&
              Object.entries(manifest.subjectStats)
                .filter(([subj]) => {
                  if (stream === 'assistant_surgeon') {
                    return subj !== 'Dental Science Part I' && subj !== 'Dental Science Part II';
                  }
                  if (stream === 'assistant_dental_surgeon') {
                    return subj !== 'Medical Science Part I' && subj !== 'Medical Science Part II';
                  }
                  if (track === 'general_bcs' || stream === 'general') {
                    return (
                      subj !== 'Medical Science Part I' &&
                      subj !== 'Medical Science Part II' &&
                      subj !== 'Dental Science Part I' &&
                      subj !== 'Dental Science Part II'
                    );
                  }
                  return true;
                })
                .map(([subj, count]) => {
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
                placeholder="প্রশ্ন, বিষয় বা মেডিক্যাল/ডেন্টাল টপিকের নাম লিখে সার্চ করুন (বাংলা ও English)..."
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
              {/* Topic Filter Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">টপিক (Topic):</span>
                <select
                  value={selectedTopic}
                  onChange={(e) => handleSelectTopic(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 max-w-[210px] truncate"
                >
                  <option value="all">সকল টপিক (All Topics)</option>
                  {SYLLABUS_TOPICS.filter((t) => {
                    if (selectedSubject === 'all') {
                      if (stream === 'assistant_surgeon') {
                        return !t.subjectId.includes('den-sci');
                      }
                      if (stream === 'assistant_dental_surgeon') {
                        return !t.subjectId.includes('med-sci');
                      }
                      return true;
                    }
                    if (selectedSubject.includes('Medical Science Part I')) return t.subjectId === 'sub-sbcs-med-sci-1';
                    if (selectedSubject.includes('Medical Science Part II')) return t.subjectId === 'sub-sbcs-med-sci-2';
                    if (selectedSubject.includes('Dental Science Part I')) return t.subjectId === 'sub-sbcs-den-sci-1';
                    if (selectedSubject.includes('Dental Science Part II')) return t.subjectId === 'sub-sbcs-den-sci-2';
                    if (selectedSubject.includes('Bangla')) return t.subjectId === 'sub-sbcs-bangla';
                    if (selectedSubject.includes('English')) return t.subjectId === 'sub-sbcs-english';
                    if (selectedSubject.includes('Bangladesh Affairs')) return t.subjectId === 'sub-sbcs-bdaffairs';
                    if (selectedSubject.includes('International Affairs')) return t.subjectId === 'sub-sbcs-intaffairs';
                    if (selectedSubject.includes('Mathematics')) return t.subjectId === 'sub-sbcs-math';
                    if (selectedSubject.includes('Mental Ability')) return t.subjectId === 'sub-sbcs-mental';
                    if (selectedSubject.includes('Science')) return t.subjectId === 'sub-gbcs-science';
                    if (selectedSubject.includes('Computer')) return t.subjectId === 'sub-gbcs-computer';
                    if (selectedSubject.includes('Geography')) return t.subjectId === 'sub-gbcs-geography';
                    if (selectedSubject.includes('Ethics')) return t.subjectId === 'sub-gbcs-ethics';
                    return true;
                  }).map((top) => (
                    <option key={top.id} value={top.titleEn}>
                      {top.topicCode}: {top.titleBn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Status Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">রিভিউ স্ট্যাটাস:</span>
                <select
                  value={selectedReviewStatus}
                  onChange={(e) => handleSelectReviewStatus(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <option value="all">সকল প্রশ্ন (All Status)</option>
                  <option value="approved">অনুমোদিত ও যাচাইকৃত (Approved)</option>
                  <option value="under_review">পর্যালোচনাধীন (Under Review)</option>
                  <option value="draft">খসড়া / ড্রাফট (Draft)</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">কঠিনতা:</span>
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

              {/* Batch Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">ব্যাচ:</span>
                <select
                  value={selectedBatch}
                  onChange={(e) => handleSelectBatch(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <option value="">সকল ব্যাচ (All Batches)</option>
                  {stream === 'assistant_surgeon' && (
                    <optgroup label="🩺 প্রফেশনাল অংশ (Medical Science)">
                      <option value="82">ব্যাচ ০৮২: মেডিক্যাল সায়েন্স ১ম পত্র (৫০টি প্রশ্ন)</option>
                      <option value="83">ব্যাচ ০৮৩: মেডিক্যাল সায়েন্স ২য় পত্র (৫০টি প্রশ্ন)</option>
                    </optgroup>
                  )}
                  {stream === 'assistant_dental_surgeon' && (
                    <optgroup label="🦷 প্রফেশনাল অংশ (Dental Science)">
                      <option value="84">ব্যাচ ০৮৪: ডেন্টাল সায়েন্স ১ম পত্র (৫০টি প্রশ্ন)</option>
                      <option value="85">ব্যাচ ০৮৫: ডেন্টাল সায়েন্স ২য় পত্র (৫০টি প্রশ্ন)</option>
                    </optgroup>
                  )}
                  <optgroup label="📘 সাধারণ অংশ (General Batches 1–81)">
                    {Array.from({ length: 81 }, (_, i) => i + 1).map((b) => {
                      const count = b === 1 ? 100 : b === 2 ? 150 : 250;
                      return (
                        <option key={b} value={b.toString()}>
                          ব্যাচ {b.toString().padStart(3, '0')} ({toBnDigits(count)}টি প্রশ্ন)
                        </option>
                      );
                    })}
                  </optgroup>
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

              {/* Practice Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setPracticeMode('batch')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    practiceMode === 'batch'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  তালিকা ভিউ (Batch)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPracticeMode('single');
                    setSingleFocusIndex(0);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    practiceMode === 'single'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  একক ফোকাস (Single Drill)
                </button>
              </div>
            </div>

            {(selectedSubject !== 'all' ||
              selectedTopic !== 'all' ||
              selectedDifficulty !== 'all' ||
              selectedReviewStatus !== 'all' ||
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

        {/* Topic-Wise Practice Performance Tracker */}
        {Object.keys(topicStats).length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/30 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-600" />
                <span>টপিকভিত্তিক অনুশীলন অগ্রগতি ও ফলাফল (Topic-Wise Practice Tracker)</span>
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                রিয়েল-টাইম পারফরম্যান্স ট্র্যাকিং
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(topicStats).map(([topicName, stats]) => {
                const total = stats.attempted;
                const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
                return (
                  <div
                    key={topicName}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-2"
                  >
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                      {topicName}
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-center text-[11px]">
                      <div className="p-1 rounded bg-slate-200/60 dark:bg-slate-700/60">
                        <span className="text-[10px] text-slate-500 block">উত্তর দেওয়া</span>
                        <span className="font-bold">{stats.attempted}</span>
                      </div>
                      <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                        <span className="text-[10px] block">সঠিক</span>
                        <span className="font-bold">+{stats.correct}</span>
                      </div>
                      <div className="p-1 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300">
                        <span className="text-[10px] block">ভুল</span>
                        <span className="font-bold">-{stats.wrong}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>নির্ভুলতার হার:</span>
                      <span className={`font-bold ${accuracy >= 70 ? 'text-emerald-600' : accuracy >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {accuracy}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Practice Mode: Single Question Focus Drill View */}
        {!isLoading && !errorMsg && questions.length > 0 && practiceMode === 'single' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-md space-y-6">
            {(() => {
              const safeIndex = Math.min(singleFocusIndex, questions.length - 1);
              const q = questions[safeIndex];
              const meta = SUBJECT_METADATA[q.subject];
              const isRevealed = revealedAnswers[q.id];
              const selectedOption = userAnswers[q.id];
              const isBookmarked = bookmarkedIds[q.id];

              return (
                <div className="space-y-6">
                  {/* Focus Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold font-mono">
                        প্রশ্ন {toBnDigits(safeIndex + 1)} / {toBnDigits(questions.length)}
                      </span>
                      <span className={`font-semibold px-2.5 py-1 rounded-md ${meta?.badgeBg || 'bg-slate-100 text-slate-700'}`}>
                        {meta?.nameBn || q.subject}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                        • {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFlagModalQuestion(q)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 font-medium flex items-center gap-1"
                        title="ত্রুটি রিপোর্ট করুন"
                      >
                        <Flag className="h-3.5 w-3.5" />
                        <span>রিপোর্ট</span>
                      </button>

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

                  {/* Stem */}
                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white bangla-font leading-relaxed">
                      {q.question_bn}
                    </h2>
                    {q.question_en && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                        {q.question_en}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                      const optionText = q.options[optKey];
                      const isCorrect = q.correct_option === optKey;
                      const isSelected = selectedOption === optKey;

                      let optStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100';
                      if (isRevealed) {
                        if (isCorrect) {
                          optStyle = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500';
                        } else if (isSelected && !isCorrect) {
                          optStyle = 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-900 dark:text-rose-100 line-through';
                        }
                      } else if (isSelected) {
                        optStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900';
                      }

                      return (
                        <button
                          key={optKey}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optKey)}
                          className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-start gap-3 ${optStyle}`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
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

                  {/* Explanation panel */}
                  {isRevealed && (
                    <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm space-y-2.5">
                      <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>সঠিক উত্তর: ({q.correct_option}) {q.options[q.correct_option]}</span>
                      </div>
                      {q.explanation_bn && (
                        <p className="bangla-font text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-emerald-500/10">
                          {q.explanation_bn}
                        </p>
                      )}
                      {q.explanation_en && (
                        <p className="text-slate-600 dark:text-slate-400 italic bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-emerald-500/10">
                          {q.explanation_en}
                        </p>
                      )}
                      <span className="text-[11px] text-slate-400 block pt-1">
                        উৎস: {q.source_title} {q.source_page_or_section ? `(${q.source_page_or_section})` : ''}
                      </span>
                    </div>
                  )}

                  {/* Prev / Next Drill Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      disabled={safeIndex === 0}
                      onClick={() => setSingleFocusIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>পূর্ববর্তী প্রশ্ন</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleRevealAnswer(q.id)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                    >
                      {isRevealed ? 'উত্তর লুকান' : 'উত্তর ও ব্যাখ্যা দেখুন'}
                    </button>

                    <button
                      type="button"
                      disabled={safeIndex === questions.length - 1}
                      onClick={() => setSingleFocusIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <span>পরবর্তী প্রশ্ন</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Questions List (Batch View) */}
        {!isLoading && !errorMsg && questions.length > 0 && practiceMode === 'batch' && (
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
                        className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                          q.verification_status === 'verified' || q.verification_status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {q.verification_status === 'verified' || q.verification_status === 'approved'
                          ? 'অনুমোদিত'
                          : 'পর্যালোচনাধীন'}
                      </span>

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
                        onClick={() => setFlagModalQuestion(q)}
                        className="p-1.5 rounded-lg border text-slate-400 hover:text-rose-600 hover:border-rose-300 dark:border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                        title="প্রশ্নে কোনো ভুল থাকলে রিপোর্ট করুন"
                      >
                        <Flag className="h-4 w-4" />
                      </button>

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
              এই ২০,২০০টি প্রশ্ন নিয়ে এখনই পূর্ণাঙ্গ মক টেস্ট দিন!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 bangla-font max-w-xl">
              টাইমড পরীক্ষা ও নেগেティブ মার্কিং (-০.৫০)-এর সাথে আপনার রিয়েল প্রস্তুতি যাচাই করুন। সাধারণ ও প্রফেশনাল বিষয়ের সমন্বিত পরীক্ষা।
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
              ফুল মক টেস্ট হাব
            </Link>
          </div>
        </div>
        </>
      )}

      {/* Flag Question Error Modal */}
      {flagModalQuestion && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="flag-modal-title"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
                  <Flag className="h-5 w-5 shrink-0" />
                  <h3 id="flag-modal-title" className="font-bold text-base sm:text-lg bangla-font text-slate-900 dark:text-white">
                    প্রশ্নে ভুল বা অসঙ্গতি রিপোর্ট করুন
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setFlagModalQuestion(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="বন্ধ করুন"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="text-[11px] font-mono text-slate-400">প্রশ্ন আইডি: {flagModalQuestion.id}</div>
                <div className="bangla-font font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                  {flagModalQuestion.question_bn}
                </div>
              </div>

              {flagSuccessMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{flagSuccessMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleFlagSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      ভুলের ধরন নির্বাচন করুন:
                    </label>
                    <select
                      value={flagReason}
                      onChange={(e) => setFlagReason(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <option value="wrong_answer">সঠিক উত্তর চিহ্নিতকরণ ভুল (Wrong Key)</option>
                      <option value="wrong_explanation">ব্যাখ্যায় ভুল বা বিভ্রান্তিকর তথ্য (Inaccurate Explanation)</option>
                      <option value="typo_language">বানান, ব্যাকরণ বা অনুবাদের ভুল (Typo / Translation)</option>
                      <option value="out_of_syllabus">সিলেবাসের বাইরের প্রশ্ন (Out of Syllabus)</option>
                      <option value="duplicate_question">পুনরাবৃত্ত বা ডুপ্লিকেট প্রশ্ন (Duplicate)</option>
                      <option value="other">অন্যান্য সমস্যা (Other)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      বিস্তারিত মন্তব্য বা সঠিক তথ্য (ঐচ্ছিক):
                    </label>
                    <textarea
                      rows={3}
                      value={flagComment}
                      onChange={(e) => setFlagComment(e.target.value)}
                      placeholder="সঠিক রেফারেন্স বা পাঠ্যপুস্তকের তথ্য এখানে লিখুন..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setFlagModalQuestion(null)}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      disabled={isFlagSubmitting}
                      className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isFlagSubmitting ? 'জমা হচ্ছে...' : 'রিপোর্ট জমা দিন'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
  );
}
