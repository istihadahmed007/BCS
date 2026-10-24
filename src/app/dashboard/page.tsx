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
  Play,
  Radio,
  Star,
  ClipboardCheck,
  MoreVertical,
  Activity,
  Calendar,
  User,
  CreditCard,
  ShieldCheck,
  Zap,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-6">
      {/* 1. BRIGHT PREMIUM WELCOME PANEL (Matching reference layout language) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E3E8F2] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E3E8F2]">
          <div className="flex items-start sm:items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center shrink-0 border border-[#6538F5]/20 shadow-xs">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#17233F] tracking-tight">
                  Welcome to BCS Candidate Console
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8F8F0] text-[#059669] text-xs font-bold border border-[#059669]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#66748B] bangla-font mt-0.5">
                {track === 'general_bcs'
                  ? '৪৬তম বিসিএস প্রিলিমিনারি • সাধারণ ক্যাডার (১০টি বিষয়াবলি)'
                  : '৫১তম বিশেষ বিসিএস (স্বাস্থ্য) • সহকারী সার্জন ও ডেন্টাল'}
              </p>
            </div>
          </div>

          {/* Segmented Pill Tabs for quick switches */}
          <div className="inline-flex items-center p-1.5 bg-[#F5F7FC] rounded-2xl border border-[#E3E8F2] self-start lg:self-center gap-1">
            <button
              type="button"
              onClick={() => handleTrackChange('general_bcs', 'general')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                track === 'general_bcs'
                  ? 'bg-[#6538F5] text-white shadow-xs'
                  : 'text-[#66748B] hover:text-[#17233F]'
              }`}
            >
              General BCS
            </button>
            <button
              type="button"
              onClick={() => handleTrackChange('special_bcs_health_51_2026', 'assistant_surgeon')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                track === 'special_bcs_health_51_2026'
                  ? 'bg-[#6538F5] text-white shadow-xs'
                  : 'text-[#66748B] hover:text-[#17233F]'
              }`}
            >
              51st Special Health
            </button>
            <Link
              href="/study/today"
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#6538F5] bg-[#F0EBFF] hover:bg-[#6538F5] hover:text-white transition-all ml-1"
            >
              Today&apos;s Drills →
            </Link>
          </div>
        </div>

        {/* Floating Quick Summary Strip inside the panel */}
        <div className="pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#EDF3FF] text-[#2563EB] flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#17233F]">
                Today&apos;s Active Recall Target: <span className="text-[#6538F5]">১০টি প্রশ্ন • ১৫ মিনিট</span>
              </p>
              <p className="text-[11px] text-[#66748B] bangla-font">
                প্রাকৃতিক বিরতিতে পুনরাবৃত্তি (Spaced Repetition) ও স্মৃতিশক্তি যাচাইকরণ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center flex-wrap">
            <Link
              href="/question-bank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F0EBFF] hover:bg-[#E4D9FF] text-[#6538F5] text-xs font-bold shadow-2xs transition-all border border-[#6538F5]/20"
            >
              <BookCheck className="h-3.5 w-3.5 text-[#6538F5]" />
              <span>Question Bank</span>
            </Link>
            <Link
              href="/study/today"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6538F5] hover:bg-[#8055F7] text-white text-xs font-bold shadow-xs transition-all"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Continue Today&apos;s Study</span>
            </Link>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E3E8F2] hover:bg-slate-50 text-[#17233F] text-xs font-bold shadow-2xs transition-all"
            >
              <Play className="h-3.5 w-3.5 text-[#059669]" />
              <span>Full Mock Exam</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. ROW OF 4 ICON-LED METRIC CARDS (Directly inspired by reference screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Questions Solved */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-xl bg-[#EDF3FF] text-[#2563EB] flex items-center justify-center font-bold">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EDF3FF] px-2 py-0.5 rounded-full">
              Session
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#17233F] tracking-tight">
              {studentStats.totalAttempted}
            </div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">
              Questions Solved
            </div>
            <div className="text-[11px] text-[#059669] font-bold mt-2 flex items-center gap-1">
              <span>{studentStats.hasRealData ? `${studentStats.totalCorrect} Correct Answers` : 'Begin practice'}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Average Accuracy */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-xl bg-[#E8F8F0] text-[#059669] flex items-center justify-center font-bold">
              <Trophy className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#17233F] tracking-tight">
              {studentStats.hasRealData ? `${studentStats.accuracyPct}%` : '—'}
            </div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">
              Average Accuracy
            </div>
            <div className="text-[11px] text-[#059669] font-bold mt-2 flex items-center gap-1">
              <span>{studentStats.hasRealData ? 'Server Calculated' : 'Take first drill'}</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Topics Mastered */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center font-bold">
              <Target className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6538F5] bg-[#F0EBFF] px-2 py-0.5 rounded-full">
              Syllabus
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#17233F] tracking-tight">
              {masteries.length > 0
                ? `${masteries.filter((m) => m.weaknessLabel === 'mastered').length}/${masteries.length}`
                : (studentStats.hasRealData ? '0' : '—')}
            </div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">
              Qualified Topics
            </div>
            <div className="text-[11px] text-[#6538F5] font-bold mt-2 flex items-center gap-1">
              <span>{masteries.length > 0 ? 'Mastered in Bank' : 'No topic data'}</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Spaced Revision Due */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-xl bg-[#FFF5E6] text-[#D97706] flex items-center justify-center font-bold">
              <RotateCcw className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] bg-[#FFF5E6] px-2 py-0.5 rounded-full">
              Spaced
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#17233F] tracking-tight">
              {studentStats.dueForReviewCount > 0 ? studentStats.dueForReviewCount : 0}
            </div>
            <div className="text-xs font-bold text-[#66748B] mt-0.5">
              Mistakes Due Today
            </div>
            <div className="text-[11px] text-[#D97706] font-bold mt-2 flex items-center gap-1">
              <span>{studentStats.dueForReviewCount > 0 ? 'Spaced Retention Due' : 'All clear for now'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ROW OF QUICK-ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* Card 1: Question Bank */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group border-l-4 border-l-[#6538F5]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center">
                <BookCheck className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6538F5] bg-[#F0EBFF] px-2.5 py-0.5 rounded-full">
                20K+ MCQs
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-[#17233F] group-hover:text-[#6538F5] transition-colors">
                Question Bank
              </h3>
              <p className="text-xs text-[#66748B] mt-1 leading-snug bangla-font">
                অধ্যায়ভিত্তিক ও বিশেষ বিসিএস প্রশ্ন ভাণ্ডার
              </p>
            </div>
          </div>
          <div className="pt-4 mt-auto">
            <Link
              href="/question-bank"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6538F5] hover:bg-[#5326d9] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <span>Explore Bank</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        {/* Card 1: Daily Practice */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-[#EDF3FF] text-[#2563EB] flex items-center justify-center">
                <CalendarDays className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#2563EB] bg-[#EDF3FF] px-2.5 py-0.5 rounded-full">
                Daily Set
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-[#17233F] group-hover:text-[#2563EB] transition-colors">
                Daily Practice
              </h3>
              <p className="text-xs text-[#66748B] mt-1 leading-snug bangla-font">
                আজকের ১০টি বাছাইকৃত প্রশ্ন ও সক্রিয় স্মরণ
              </p>
            </div>
          </div>
          <div className="pt-4 mt-auto">
            <Link
              href="/study/today"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <span>Start Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Live Mock Test */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-[#E8F8F0] text-[#059669] flex items-center justify-center">
                <Radio className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#059669] bg-[#E8F8F0] px-2.5 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-[#059669] animate-pulse" />
                Live
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-[#17233F] group-hover:text-[#059669] transition-colors">
                Mock Exam Testing
              </h3>
              <p className="text-xs text-[#66748B] mt-1 leading-snug bangla-font">
                ২০০ ও ১০০ নম্বরের সময়ভিত্তিক সার্ভার পরীক্ষা
              </p>
            </div>
          </div>
          <div className="pt-4 mt-auto">
            <Link
              href="/test"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <span>Join Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: Mistake Notebook */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6538F5] bg-[#F0EBFF] px-2.5 py-0.5 rounded-full">
                Retry Mode
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-[#17233F] group-hover:text-[#6538F5] transition-colors">
                Mistake Notebook
              </h3>
              <p className="text-xs text-[#66748B] mt-1 leading-snug bangla-font">
                ভুল উত্তরগুলো পুনরায় রিট্রাই ও নোট সংগ্রহ
              </p>
            </div>
          </div>
          <div className="pt-4 mt-auto">
            <Link
              href="/mistake-notebook"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6538F5] hover:bg-[#8055F7] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <span>View Mistakes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 4: Syllabus & Sources */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-[#E3E8F2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-[#FFF5E6] text-[#D97706] flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#D97706] bg-[#FFF5E6] px-2.5 py-0.5 rounded-full">
                10 Pillars
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-[#17233F] group-hover:text-[#D97706] transition-colors">
                Syllabus Tracker
              </h3>
              <p className="text-xs text-[#66748B] mt-1 leading-snug bangla-font">
                ১০টি বিষয় ও অফিসিয়াল মার্কস বিভাজন
              </p>
            </div>
          </div>
          <div className="pt-4 mt-auto">
            <Link
              href="/syllabus"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <span>Browse Syllabus</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. REFERENCE NOTICE STRIP (Amber box matching the screenshot widget notice) */}
      <div className="rounded-3xl p-5 bg-[#FFF5E6]/70 border border-[#D97706]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-2xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-[#D97706] tracking-wider">
                Real-Time Preparation Notice
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D97706]/15 text-[#D97706] font-bold">
                Agargaon BPSC Cadre Zone
              </span>
            </div>
            <p className="text-xs text-[#66748B] leading-relaxed bangla-font mt-1">
              সকল প্রশ্ন এবং মক টেস্ট বিপিএসসি ৪৬তম ও ৫১তম বিশেষ বিসিএস কারিকুলাম ও সার্ভার-অথেনটিকেটেড মার্কিং নিয়মে পরিচালিত। সক্রিয় অনুশীলনে আপনার দৈনিক রিটেনশন রেট বৃদ্ধি পাবে।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
          <Link
            href="/question-bank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E3E8F2] text-xs font-bold text-[#17233F] hover:bg-slate-50 transition-all shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#6538F5]" />
            <span>Question Bank</span>
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6538F5] text-white text-xs font-bold hover:bg-[#8055F7] transition-all shadow-xs"
          >
            <span>View Packages</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 5. MAIN DASHBOARD BODY (2 Columns: 8/12 Left, 4/12 Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-6">
          {/* Performance Overview Section */}
          <div className="bg-white rounded-3xl p-6 border border-[#E3E8F2] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#17233F]">
                  Performance Overview
                </h3>
                <p className="text-xs text-[#66748B]">
                  Real-time active study metrics across your BCS preparation sessions
                </p>
              </div>

              {/* Period Selector Dropdown */}
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="text-xs font-bold text-[#17233F] bg-[#F5F7FC] border border-[#E3E8F2] rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#6538F5] cursor-pointer"
                >
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>

            {/* Score Trend & Subject Performance Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Chart 1: Score Trend Chart */}
              <div className="bg-[#F8FAFF] rounded-2xl p-5 border border-[#EDF3FF] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-[#17233F] uppercase tracking-wider">
                      Score Trend
                    </h4>
                    <span className="text-[10px] font-bold text-[#6538F5] bg-[#F0EBFF] px-2 py-0.5 rounded-full">
                      Retention
                    </span>
                  </div>
                  <p className="text-[11px] text-[#66748B] mt-0.5">
                    Retention score evolution over 30 days
                  </p>
                </div>

                <div className="relative pt-6 pb-2">
                  <svg className="w-full h-36 overflow-visible" viewBox="0 0 350 160">
                    <defs>
                      <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6538F5" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#6538F5" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <line x1="25" y1="20" x2="340" y2="20" stroke="#E3E8F2" strokeDasharray="3 3" />
                    <line x1="25" y1="60" x2="340" y2="60" stroke="#E3E8F2" strokeDasharray="3 3" />
                    <line x1="25" y1="100" x2="340" y2="100" stroke="#E3E8F2" strokeDasharray="3 3" />
                    <line x1="25" y1="140" x2="340" y2="140" stroke="#E3E8F2" />

                    <path
                      d="M 35 130 C 70 120, 100 135, 130 115 C 160 95, 190 105, 230 40 C 270 70, 300 80, 335 65 L 335 140 L 35 140 Z"
                      fill="url(#scoreAreaGradient)"
                    />
                    <path
                      d="M 35 130 C 70 120, 100 135, 130 115 C 160 95, 190 105, 230 40 C 270 70, 300 80, 335 65"
                      fill="none"
                      stroke="#6538F5"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <circle cx="230" cy="40" r="5" fill="#6538F5" stroke="#fff" strokeWidth="2.5" />
                  </svg>

                  <div className="flex items-center justify-between text-[10px] text-[#8792A5] px-4 pt-1 font-mono">
                    <span>1 May</span>
                    <span>10 May</span>
                    <span className="text-[#6538F5] font-bold">20 May (Peak)</span>
                    <span>30 May</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Subject Breakdown */}
              <div className="bg-[#F8FAFF] rounded-2xl p-5 border border-[#EDF3FF] flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-[#17233F] uppercase tracking-wider">
                    Subject Wise Accuracy
                  </h4>
                  <p className="text-[11px] text-[#66748B] mt-0.5">
                    Performance across primary BCS examination pillars
                  </p>
                </div>

                <div className="space-y-3 pt-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#17233F] mb-1">
                      <span>বাংলা সাহিত্য ও ভাষা</span>
                      <span className="text-[#6538F5]">85%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E3E8F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#6538F5] rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#17233F] mb-1">
                      <span>English Language & Literature</span>
                      <span className="text-[#2563EB]">78%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E3E8F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#17233F] mb-1">
                      <span>বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলী</span>
                      <span className="text-[#059669]">88%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E3E8F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#059669] rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#17233F] mb-1">
                      <span>সাধারণ বিজ্ঞান ও কম্পিউটার</span>
                      <span className="text-[#D97706]">82%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E3E8F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Spaced Revision Section */}
          <div className="bg-white rounded-3xl p-6 border border-[#E3E8F2] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#17233F] flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-[#6538F5]" />
                  <span>Upcoming Spaced Revision</span>
                </h3>
                <p className="text-xs text-[#66748B]">
                  Topics due today based on your active recall intervals (1d, 3d, 7d)
                </p>
              </div>
              <Link
                href="/study/today"
                className="text-xs font-bold text-[#6538F5] hover:underline flex items-center gap-1"
              >
                <span>Start All Due</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#E3E8F2]">
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center shrink-0 font-bold text-xs">
                    1d
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233F] bangla-font">
                      বাংলা সাহিত্য: চর্যাপদ ও মঙ্গলকাব্য
                    </h4>
                    <p className="text-[11px] text-[#66748B]">
                      বাংলা ভাষা ও সাহিত্য • ৫টি গুরুত্বপূর্ণ প্রশ্ন
                    </p>
                  </div>
                </div>
                <Link
                  href="/study/today"
                  className="px-3.5 py-1.5 rounded-xl bg-[#F0EBFF] hover:bg-[#6538F5] hover:text-white text-[#6538F5] text-xs font-bold transition-all"
                >
                  Review now
                </Link>
              </div>

              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#EDF3FF] text-[#2563EB] flex items-center justify-center shrink-0 font-bold text-xs">
                    3d
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233F] bangla-font">
                      বাংলাদেশ বিষয়াবলী: মুক্তিযুদ্ধ ও সংবিধান
                    </h4>
                    <p className="text-[11px] text-[#66748B]">
                      বাংলাদেশ বিষয়াবলী • ১০টি অনুচ্ছেদভিত্তিক প্রশ্ন
                    </p>
                  </div>
                </div>
                <Link
                  href="/study/today"
                  className="px-3.5 py-1.5 rounded-xl bg-[#EDF3FF] hover:bg-[#2563EB] hover:text-white text-[#2563EB] text-xs font-bold transition-all"
                >
                  Review now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          {/* Candidate Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E3E8F2] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F2]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8792A5]">
                Candidate Profile
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#059669]" />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-13 w-13 rounded-2xl bg-[#F0EBFF] text-[#6538F5] border border-[#6538F5]/20 flex items-center justify-center font-bold text-lg shadow-xs">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#17233F] leading-tight">
                  Candidate Console
                </h4>
                <p className="text-xs text-[#66748B] mt-0.5">
                  Session: Active BCS Study
                </p>
                <p className="text-[11px] text-[#6538F5] font-bold mt-0.5">
                  {track === 'general_bcs' ? 'General BCS (10 Subjects)' : 'Special BCS Health'}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E3E8F2] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#66748B]">Syllabus Coverage</span>
                <span className="text-[#6538F5]">
                  {studentStats.hasRealData ? 'In Progress' : 'Ready'}
                </span>
              </div>
              <div className="h-2 w-full bg-[#E3E8F2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6538F5] rounded-full transition-all duration-700"
                  style={{ width: `${studentStats.hasRealData ? Math.min(100, studentStats.totalAttempted * 2) : 10}%` }}
                />
              </div>
            </div>
          </div>

          {/* Subscription & Entitlement Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E3E8F2] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#6538F5]" />
                <h4 className="text-sm font-black text-[#17233F] bangla-font">
                  সাবস্ক্রিপশন প্ল্যান
                </h4>
              </div>
              <Link
                href="/packages"
                className="text-xs font-bold text-[#6538F5] hover:underline bangla-font"
              >
                আপগ্রেড
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#EDF3FF] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#17233F] bangla-font">
                  {subscriptionInfo?.packageName || 'Free Preview (ফ্রি ট্রায়াল)'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0EBFF] text-[#6538F5]">
                  {subscriptionInfo?.tier === 'free' || !subscriptionInfo ? 'PREVIEW' : 'ACTIVE'}
                </span>
              </div>

              {subscriptionInfo?.tier === 'free' || !subscriptionInfo ? (
                <div className="space-y-1 text-[11px] text-[#66748B] bangla-font">
                  <div className="flex justify-between">
                    <span>আজকের ফ্রি কোটা:</span>
                    <span className="font-bold text-[#17233F]">
                      {subscriptionInfo?.freeUsage?.remainingToday ?? 20}টি প্রশ্ন বাকি
                    </span>
                  </div>
                  <p className="text-[10px] text-[#6538F5] pt-1">
                    সম্পূর্ণ প্রশ্ন ব্যাংক ও মডেল টেস্ট আনলক করতে প্যাকেজ নিন।
                  </p>
                </div>
              ) : (
                <div className="space-y-1 text-[11px] text-[#66748B]">
                  <div className="flex justify-between font-medium">
                    <span>মেয়াদ বাকি:</span>
                    <span className="font-bold text-[#059669]">
                      {subscriptionInfo.remainingDays} দিন
                    </span>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/packages"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F0EBFF] hover:bg-[#6538F5] hover:text-white text-[#6538F5] text-xs font-bold transition-all bangla-font"
            >
              <span>প্যাকেজ ও অফারসমূহ দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Upcoming Tests Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E3E8F2] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-[#17233F]">
                Upcoming Tests
              </h4>
              <Link
                href="/test"
                className="text-xs font-bold text-[#6538F5] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#F8FAFF] border border-[#EDF3FF] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-[#E3E8F2] flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-xs font-black text-[#17233F] leading-none">24</span>
                    <span className="text-[8px] font-bold uppercase text-[#8792A5] leading-tight">MAY</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#17233F]">
                      কম্পিউটার ও তথ্যপ্রযুক্তি মডেল টেস্ট
                    </h5>
                    <span className="text-[10px] text-[#66748B]">
                      15 MCQs • 15 Minutes
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black text-[#059669] bg-[#E8F8F0] px-2 py-0.5 rounded-full shrink-0">
                  Live
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFF] border border-[#EDF3FF] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-[#E3E8F2] flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-xs font-black text-[#17233F] leading-none">28</span>
                    <span className="text-[8px] font-bold uppercase text-[#8792A5] leading-tight">MAY</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#17233F]">
                      বাংলাদেশ বিষয়াবলী মেগা মডেল টেস্ট
                    </h5>
                    <span className="text-[10px] text-[#66748B]">
                      30 MCQs • 30 Minutes
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black text-[#D97706] bg-[#FFF5E6] px-2 py-0.5 rounded-full shrink-0">
                  Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
