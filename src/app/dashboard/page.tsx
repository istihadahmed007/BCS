'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Target,
  FileText,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Sparkles,
  ChevronRight,
  RotateCcw,
  BookCheck,
  GraduationCap,
  Layers,
  Radio,
  Star,
  ClipboardCheck,
  MoreVertical,
  Activity,
  Calendar,
  User,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId, StudyPlan, StudyTask, TopicMastery } from '@/types';
import { ReadinessIndicator, WeaknessAnalysisEngine } from '@/services/weakness';

export default function DashboardPage() {
  const [track, setTrack] = useState<ExamTrackId>('general_bcs');
  const [stream, setStream] = useState<ProfessionalStreamId>('general');
  const [dailyBudget, setDailyBudget] = useState<number>(120);

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [readiness, setReadiness] = useState<ReadinessIndicator | null>(null);
  const [masteries, setMasteries] = useState<TopicMastery[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Subscription State
  const [subscriptionInfo, setSubscriptionInfo] = useState<{
    packageName: string;
    tier: string;
    remainingDays: number;
    expiresAt: string;
    freeUsage?: any;
  } | null>(null);

  // Real student stats aggregated from attempts
  const [studentStats, setStudentStats] = useState<{
    totalAttempted: number;
    totalCorrect: number;
    accuracyPct: number;
    dueForReviewCount: number;
    resolvedMistakesCount: number;
    hasRealData: boolean;
  }>({
    totalAttempted: 0,
    totalCorrect: 0,
    accuracyPct: 0,
    dueForReviewCount: 0,
    resolvedMistakesCount: 0,
    hasRealData: false,
  });

  const [period, setPeriod] = useState<'month' | 'all'>('month');

  // Load enrollment from localStorage on mount
  useEffect(() => {
    let t: ExamTrackId = 'general_bcs';
    let s: ProfessionalStreamId = 'general';
    let budget = 120;

    const saved = localStorage.getItem('bcs_enrollment');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.trackId) {
          t = parsed.trackId;
          setTrack(parsed.trackId);
        }
        if (parsed.stream) {
          s = parsed.stream;
          setStream(parsed.stream);
        }
        if (parsed.dailyMinutes) {
          budget = parsed.dailyMinutes;
          setDailyBudget(parsed.dailyMinutes);
        }
      } catch (e) {}
    }

    loadDashboardData(t, s, budget);
  }, []);

  const handleTrackChange = (newTrack: ExamTrackId, newStream: ProfessionalStreamId = 'general') => {
    setTrack(newTrack);
    setStream(newStream);
    try {
      localStorage.setItem(
        'bcs_enrollment',
        JSON.stringify({ trackId: newTrack, stream: newStream, dailyMinutes: dailyBudget })
      );
    } catch (e) {}
    loadDashboardData(newTrack, newStream, dailyBudget);
  };

  const loadDashboardData = async (
    t: ExamTrackId,
    s: ProfessionalStreamId,
    budget: number
  ) => {
    setLoading(true);
    try {
      let activeUid = 'student_current';
      try {
        const savedUser = localStorage.getItem('bcs_active_user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed.id) activeUid = parsed.id;
        }
      } catch (e) {}

      // 1. Fetch study plan
      try {
        const planRes = await fetch('/api/planner/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: activeUid,
            examTrackId: t,
            professionalStream: t === 'general_bcs' ? 'general' : s,
            dailyMinutesBudget: budget,
          }),
        });

        const planJson = await planRes.json();
        if (planJson.success && planJson.data) {
          setPlan(planJson.data);
          setTasks(planJson.data.tasks || []);
        }
      } catch (e) {}

      // 2. Fetch real student answers & mistake notebook entries
      let answers: Array<{ questionId: string; subjectCode: string; topicId: string; isCorrect: boolean }> = [];
      try {
        const raw = localStorage.getItem('bcs_user_answers');
        if (raw) answers = JSON.parse(raw);
      } catch (e) {}

      let dueReview = 0;
      let resolvedCount = 0;
      let mistakeItems: any[] = [];
      try {
        const mRes = await fetch(`/api/mistake-notebook?userId=${activeUid}`);
        const mJson = await mRes.json();
        if (mJson.success) {
          dueReview = mJson.stats?.dueForReview || 0;
          resolvedCount = mJson.stats?.resolvedCount || 0;
          mistakeItems = mJson.data || [];
        }
      } catch (e) {}

      // 3. Fetch subscription & package status
      try {
        const subRes = await fetch('/api/auth/me');
        const subData = await subRes.json();
        if (subData.subscription) {
          setSubscriptionInfo({
            ...subData.subscription,
            freeUsage: subData.freeUsage,
          });
        }
      } catch (e) {}

      const topicAgg = new Map<string, { total: number; correct: number; subjectCode: string; title: string }>();

      for (const a of answers) {
        const tid = a.topicId || a.subjectCode || 'topic-general';
        const cur = topicAgg.get(tid) || { total: 0, correct: 0, subjectCode: a.subjectCode || 'GENERAL', title: tid };
        cur.total += 1;
        if (a.isCorrect) cur.correct += 1;
        topicAgg.set(tid, cur);
      }

      for (const m of mistakeItems) {
        const tid = m.question?.topicId || m.question?.subjectCode || 'topic-mistake';
        const cur = topicAgg.get(tid) || {
          total: m.retryCount || 1,
          correct: m.resolved ? 1 : 0,
          subjectCode: m.question?.subjectCode || 'GENERAL',
          title: m.question?.topicTitleBn || m.question?.topicTitleEn || 'Topic',
        };
        topicAgg.set(tid, cur);
      }

      const computedMasteries: TopicMastery[] = [];
      topicAgg.forEach((val, key) => {
        const acc = Number(((val.correct / Math.max(1, val.total)) * 100).toFixed(0));
        const weakLabel = acc < 50 ? 'knowledge_gap' : acc < 75 ? 'careless_error' : 'mastered';
        computedMasteries.push({
          topicId: key,
          topicCode: key.slice(0, 7).toUpperCase(),
          titleEn: val.title,
          titleBn: val.title,
          subjectCode: val.subjectCode,
          totalAttempts: val.total,
          correctAttempts: val.correct,
          accuracyPct: acc,
          avgTimeSeconds: 32,
          weaknessLabel: weakLabel,
        });
      });

      const totalAtt = answers.length;
      const totalCorr = answers.filter((a) => a.isCorrect).length;
      const accPct = totalAtt > 0 ? Number(((totalCorr / totalAtt) * 100).toFixed(0)) : 0;

      setStudentStats({
        totalAttempted: totalAtt,
        totalCorrect: totalCorr,
        accuracyPct: accPct,
        dueForReviewCount: dueReview,
        resolvedMistakesCount: resolvedCount,
        hasRealData: totalAtt > 0,
      });

      setMasteries(computedMasteries);
      const computedReadiness = WeaknessAnalysisEngine.calculateReadiness(computedMasteries);
      setReadiness(computedReadiness);
    } catch (e: any) {
      console.error('Error loading dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
        
        {/* ============================================================== */}
        {/* 1. WIDE BLUE WELCOME BANNER (Matching Visual Reference)       */}
        {/* ============================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 lg:p-9 shadow-lg shadow-blue-500/20">
          {/* Subtle cyber/grid backdrop shapes */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="blue-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blue-grid)" />
            </svg>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left Content */}
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-300/30 text-blue-100 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>
                  {track === 'general_bcs'
                    ? '৪৬তম বিসিএস প্রিলিমিনারি • সাধারণ ক্যাডার'
                    : '৫১তম বিশেষ বিসিএস (স্বাস্থ্য) • সহকারী সার্জন'}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  Welcome Back, <br />
                  <span className="text-blue-100">Candidate! 👋</span>
                </h2>
                <p className="text-sm sm:text-base text-blue-100/90 font-normal mt-2 leading-relaxed bangla-font">
                  Ready to test your knowledge? Start today&apos;s active recall session and track your retention.
                </p>
                <p className="text-xs text-blue-200/80 mt-0.5 bangla-font">
                  আপনার আজকের রিটেনশন সেশন প্রস্তুত। সক্রিয় স্মরণ ও নিয়মিত অনুশীলনে এগিয়ে থাকুন।
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/study/today"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-blue-700 font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ArrowRight className="h-4 w-4 text-blue-700" />
                  <span>Continue Today’s Study</span>
                </Link>

                {/* Track Switch Button */}
                <button
                  type="button"
                  onClick={() =>
                    handleTrackChange(
                      track === 'general_bcs' ? 'special_bcs_health_51_2026' : 'general_bcs',
                      track === 'general_bcs' ? 'assistant_surgeon' : 'general'
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-blue-800/60 hover:bg-blue-800 text-blue-100 font-semibold text-xs border border-blue-400/30 backdrop-blur-xs transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>
                    Switch to {track === 'general_bcs' ? 'Special BCS Health' : 'General BCS'}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Floating Banner Cards (Matching Reference Image) */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Floating Card 1: Study Goal */}
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50 dark:border-slate-800 text-slate-900 dark:text-white min-w-[210px] w-full sm:w-auto">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Today&apos;s Study Goal</span>
                </div>
                <div className="text-xl font-extrabold text-blue-700 dark:text-blue-400 mt-1 tracking-tight">
                  ১০টি প্রশ্ন • ১৫ মিনিট
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                  <span>Session:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    সক্রিয় স্মরণ ও রিভিশন
                  </span>
                </div>
              </div>

              {/* Floating Card 2: Your Score */}
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50 dark:border-slate-800 text-slate-900 dark:text-white min-w-[190px] w-full sm:w-auto">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span>Your Accuracy</span>
                  </span>
                  {studentStats.hasRealData ? (
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded-full font-bold">
                      {studentStats.totalCorrect}/{studentStats.totalAttempted}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full font-medium">
                      Not available
                    </span>
                  )}
                </div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {studentStats.hasRealData ? `${studentStats.accuracyPct}%` : '—'}
                </div>
                {/* Visual Progress Sparkline */}
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-700"
                    style={{ width: `${studentStats.hasRealData ? studentStats.accuracyPct : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. ROW OF 4 QUICK-ACTION CARDS (Matching Reference Image)    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Daily Practice (Start Exam style) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full">
                  Daily Set
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Daily Practice
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug bangla-font">
                  আজকের ১০টি বাছাইকৃত প্রশ্ন ও সক্রিয় স্মরণ
                </p>
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                href="/study/today"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
              >
                <span>Start Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Live Mock Test */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Radio className="h-6 w-6" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  LIVE
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Live Mock Test
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug bangla-font">
                  ২০০ নম্বরের পূর্ণাঙ্গ সময়ভিত্তিক পরীক্ষা
                </p>
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                href="/test"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
              >
                <span>Join Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Review Mistakes (Results style) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded-full">
                  Retry Mode
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                  Mistake Notebook
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug bangla-font">
                  ভুল উত্তরগুলো পুনরায় রিট্রাই করুন
                </p>
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                href="/mistake-notebook"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
              >
                <span>View Mistakes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Browse Syllabus (Analytics style) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-full">
                  10 Subjects
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  Syllabus Tracker
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug bangla-font">
                  ১০টি বিষয় ও অফিসিয়াল মার্কস বিভাজন
                </p>
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                href="/syllabus"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
              >
                <span>Browse Syllabus</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. MAIN DASHBOARD BODY (2 Columns: 70% Left, 30% Right)       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (approx 8 of 12 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6">

            {/* A. Performance Overview Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Performance Overview
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time active study metrics across your BCS preparation sessions
                  </p>
                </div>
                
                {/* Period Selector Dropdown */}
                <div className="relative">
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as any)}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="month">This Month</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>

              {/* 4 Overview Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Stat 1: Questions Attempted */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-blue-100/70 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <ClipboardCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {studentStats.totalAttempted}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      Questions Solved
                    </div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-2 flex items-center gap-1">
                      <span>{studentStats.hasRealData ? `${studentStats.totalCorrect} Correct` : 'Start practice'}</span>
                    </div>
                  </div>
                </div>

                {/* Stat 2: Average Score */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Trophy className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {studentStats.hasRealData ? `${studentStats.accuracyPct}%` : '—'}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      Average Accuracy
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                      <span>{studentStats.hasRealData ? 'Verified Session' : 'Not available yet'}</span>
                    </div>
                  </div>
                </div>

                {/* Stat 3: Topics Qualified */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-purple-100/70 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Target className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {masteries.length > 0 ? `${masteries.filter((m) => m.weaknessLabel === 'mastered').length}/${masteries.length}` : (studentStats.hasRealData ? '0' : '—')}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      Topics Qualified
                    </div>
                    <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-2 flex items-center gap-1">
                      <span>{masteries.length > 0 ? 'Mastered Topics' : 'Not available'}</span>
                    </div>
                  </div>
                </div>

                {/* Stat 4: Spaced Revision Due */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-amber-100/70 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <RotateCcw className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {studentStats.dueForReviewCount > 0 ? studentStats.dueForReviewCount : 0}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      Revision Due Today
                    </div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-2 flex items-center gap-1">
                      <span>{studentStats.dueForReviewCount > 0 ? 'Scheduled Review' : 'All up to date'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Progress Area: Charts Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Chart 1: Score Trend Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Score Trend
                    </h4>
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full">
                      May 2026
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Retention score evolution over 30 days
                  </p>
                </div>

                {/* SVG Area Line Chart */}
                <div className="relative pt-6 pb-2">
                  {/* Floating Peak Tag */}
                  <div className="absolute top-1 left-[64%] -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md z-10 flex items-center gap-1">
                    <span>85%</span>
                    <span className="text-blue-200 text-[8px]">21 May</span>
                  </div>

                  <svg className="w-full h-44 overflow-visible" viewBox="0 0 350 160">
                    <defs>
                      <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Gridlines */}
                    <line x1="25" y1="20" x2="340" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="25" y1="60" x2="340" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="25" y1="100" x2="340" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="25" y1="140" x2="340" y2="140" stroke="#e2e8f0" />

                    {/* Y-Axis Labels */}
                    <text x="5" y="24" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">100</text>
                    <text x="5" y="64" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">75</text>
                    <text x="5" y="104" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">50</text>
                    <text x="5" y="144" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">25</text>

                    {/* Smooth Area */}
                    <path
                      d="M 35 130 C 70 120, 100 135, 130 115 C 160 95, 190 105, 230 40 C 270 70, 300 80, 335 65 L 335 140 L 35 140 Z"
                      fill="url(#scoreAreaGradient)"
                    />

                    {/* Smooth Line */}
                    <path
                      d="M 35 130 C 70 120, 100 135, 130 115 C 160 95, 190 105, 230 40 C 270 70, 300 80, 335 65"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    <circle cx="35" cy="130" r="3.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                    <circle cx="90" cy="125" r="3.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                    <circle cx="140" cy="110" r="3.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                    <circle cx="190" cy="100" r="3.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                    <circle cx="230" cy="40" r="5" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
                    <circle cx="280" cy="72" r="3.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                    <circle cx="335" cy="65" r="3.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                  </svg>

                  {/* X-Axis Labels */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-6 pt-1 font-mono">
                    <span>1 May</span>
                    <span>6 May</span>
                    <span>11 May</span>
                    <span>16 May</span>
                    <span className="text-blue-600 font-bold">21 May</span>
                    <span>26 May</span>
                    <span>31 May</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Subject Wise Performance Donut Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Subject Wise Performance
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Accuracy across primary BCS syllabus pillars
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-4 pt-3 pb-1">
                  {/* Donut SVG */}
                  <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {/* Segment 1: Bangla 85% (Blue) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#2563eb"
                        strokeWidth="11"
                        strokeDasharray="65 174"
                        strokeDashoffset="0"
                      />
                      {/* Segment 2: English 78% (Teal/Cyan) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#06b6d4"
                        strokeWidth="11"
                        strokeDasharray="50 189"
                        strokeDashoffset="-65"
                      />
                      {/* Segment 3: Science & IT 82% (Emerald) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="11"
                        strokeDasharray="45 194"
                        strokeDashoffset="-115"
                      />
                      {/* Segment 4: Bangladesh Affairs 90% (Amber) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="11"
                        strokeDasharray="40 199"
                        strokeDashoffset="-160"
                      />
                    </svg>
                    {/* Donut Center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        84%
                      </span>
                      <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                        Overall
                      </span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="space-y-2 text-xs w-full sm:w-auto">
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        <span>বাংলা সাহিত্য</span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">85%</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                        <span>English Lang.</span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">78%</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span>Science & IT</span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">82%</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <span>বাংলাদেশ বিষয়াবলী</span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Upcoming Spaced Revision Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-blue-600" />
                    <span>Upcoming Spaced Revision</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Topics due today based on your active recall intervals (1d, 3d, 7d)
                  </p>
                </div>
                <Link
                  href="/study/today"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Start All Due</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* Revision Item 1 */}
                <div className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                      1d
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white bangla-font">
                        বাংলা সাহিত্য: চর্যাপদ ও মঙ্গলকাব্য
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        বাংলা ভাষা ও সাহিত্য • ৫টি গুরুত্বপূর্ণ প্রশ্ন
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/study/today"
                    className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors"
                  >
                    Review now
                  </Link>
                </div>

                {/* Revision Item 2 */}
                <div className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0 font-bold text-xs">
                      3d
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white bangla-font">
                        বাংলাদেশ বিষয়াবলী: মুক্তিযুদ্ধ ও সংবিধান
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        বাংলাদেশ বিষয়াবলী • ১০টি অনুচ্ছেদভিত্তিক প্রশ্ন
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/study/today"
                    className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/80 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-xs font-bold transition-colors"
                  >
                    Review now
                  </Link>
                </div>

                {/* Revision Item 3 */}
                <div className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs">
                      7d
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white bangla-font">
                        General Science: নিউটনের গতিসূত্র ও আলোকবিজ্ঞান
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        সাধারণ বিজ্ঞান • মেমোরি কিউ রিভিশন
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/study/today"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors"
                  >
                    Review now
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (approx 4 of 12 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">

            {/* A. Student Profile Card (Matching Reference Image) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Student Profile
                </span>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                  aria-label="Student profile settings"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Candidate Profile
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Session: Active BCS Study
                  </p>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                    {track === 'general_bcs' ? 'General BCS (10 Subjects)' : 'Special BCS Health'}
                  </p>
                </div>
              </div>

              {/* Profile Completion Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">
                    Syllabus Coverage
                  </span>
                  <span className="text-blue-600 font-bold">
                    {studentStats.hasRealData ? 'In Progress' : 'Not started'}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-700"
                    style={{ width: `${studentStats.hasRealData ? Math.min(100, studentStats.totalAttempted * 2) : 5}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Subscription & Entitlement Status Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white bangla-font">
                    আমার সাবস্ক্রিপশন প্ল্যান
                  </h4>
                </div>
                <Link
                  href="/packages"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bangla-font"
                >
                  আপগ্রেড
                </Link>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white bangla-font">
                    {subscriptionInfo?.packageName || 'Free Preview (ফ্রি ট্রায়াল)'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {subscriptionInfo?.tier === 'free' || !subscriptionInfo ? 'PREVIEW' : 'ACTIVE'}
                  </span>
                </div>

                {subscriptionInfo?.tier === 'free' || !subscriptionInfo ? (
                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 bangla-font">
                    <div className="flex justify-between">
                      <span>আজকের ফ্রি প্রশ্ন কোটা:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {subscriptionInfo?.freeUsage?.remainingToday ?? 20}টি বাকি
                      </span>
                    </div>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 pt-1">
                      সম্পূর্ণ প্রশ্ন ব্যাংক ও মডেল টেস্ট আনলক করতে প্যাকেজ নিন।
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between font-medium">
                      <span>মেয়াদ বাকি:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {subscriptionInfo.remainingDays} দিন
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/packages"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors bangla-font"
              >
                <span>প্যাকেজ ও অফারসমূহ দেখুন</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* B. Upcoming Tests (Authentic BCS Subject Tracks) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upcoming Tests
                </h4>
                <Link
                  href="/test"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {/* Test 1 */}
                <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-xs font-black text-slate-900 dark:text-white leading-none">
                        24
                      </span>
                      <span className="text-[8px] font-bold uppercase text-slate-400 leading-tight">
                        MAY
                      </span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        কম্পিউটার ও তথ্যপ্রযুক্তি মডেল টেস্ট
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        10:00 AM - 11:30 AM • ১৫ নম্বর
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full shrink-0">
                    Live
                  </span>
                </div>

                {/* Test 2 */}
                <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-xs font-black text-slate-900 dark:text-white leading-none">
                        28
                      </span>
                      <span className="text-[8px] font-bold uppercase text-slate-400 leading-tight">
                        MAY
                      </span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        বাংলাদেশ বিষয়াবলী মেগা মডেল টেস্ট
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        02:00 PM - 03:30 PM • ৩০ নম্বর
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-full shrink-0">
                    Upcoming
                  </span>
                </div>

                {/* Test 3 */}
                <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-xs font-black text-slate-900 dark:text-white leading-none">
                        02
                      </span>
                      <span className="text-[8px] font-bold uppercase text-slate-400 leading-tight">
                        JUN
                      </span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        ইংরেজি ভাষা ও সাহিত্য টেস্ট
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        11:00 AM - 12:30 PM • ৩৫ নম্বর
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded-full shrink-0">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>

            {/* C. Announcements Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Announcements (বিজ্ঞপ্তি)
                </h4>
                <Link
                  href="/dashboard"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Megaphone className="h-4 w-4" />
                  <span className="text-xs font-bold">Scheduled Maintenance</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed bangla-font">
                  System maintenance on 25 May 2026 from 01:00 AM to 03:00 AM.
                </p>
                <p className="text-[10px] text-slate-400 bangla-font">
                  ৪৬তম বিসিএস প্রিলিমিনারি পরীক্ষার আসন বিন্যাস সংক্রান্ত জরুরি নোটিশ প্রকাশিত হয়েছে।
                </p>
              </div>

              {/* Carousel Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="h-1.5 w-4 rounded-full bg-blue-600" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
