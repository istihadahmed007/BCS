'use client';

import { useEffect, useState } from 'react';
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
  FileText,
  GraduationCap,
  Layers,
  Play,
  Repeat,
  RotateCcw,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId, StudyPlan, StudyTask, TopicMastery } from '@/types';
import { ReadinessIndicator, WeaknessAnalysisEngine } from '@/services/weakness';
import { GENERAL_BCS_SUBJECTS, SPECIAL_BCS_HEALTH_SUBJECTS } from '@/data/exam-configs';

export default function DashboardPage() {
  const [track, setTrack] = useState<ExamTrackId>('special_bcs_health_51_2026');
  const [stream, setStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [dailyBudget, setDailyBudget] = useState<number>(120);

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [readiness, setReadiness] = useState<ReadinessIndicator | null>(null);
  const [masteries, setMasteries] = useState<TopicMastery[]>([]);
  const [loading, setLoading] = useState(true);

  // Real student stats aggregated from attempts
  const [studentStats, setStudentStats] = useState<{
    totalAttempted: number;
    totalCorrect: number;
    accuracyPct: number;
    dueForReviewCount: number;
    resolvedMistakesCount: number;
  }>({
    totalAttempted: 0,
    totalCorrect: 0,
    accuracyPct: 0,
    dueForReviewCount: 0,
    resolvedMistakesCount: 0,
  });

  // Load enrollment from localStorage on mount
  useEffect(() => {
    let t: ExamTrackId = 'special_bcs_health_51_2026';
    let s: ProfessionalStreamId = 'assistant_surgeon';
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

  const handleTrackChange = (newTrack: ExamTrackId, newStream: ProfessionalStreamId = 'assistant_surgeon') => {
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
      let activeUid = 'student_dr_rahim';
      try {
        const savedUser = localStorage.getItem('bcs_active_user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed.id) activeUid = parsed.id;
        }
      } catch (e) {}

      // 1. Fetch real study plan
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

      // Compute aggregated masteries from actual student attempts
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

      // Overall stats
      const totalAtt = answers.length;
      const totalCorr = answers.filter((a) => a.isCorrect).length;
      const accPct = totalAtt > 0 ? Number(((totalCorr / totalAtt) * 100).toFixed(1)) : 0;

      setStudentStats({
        totalAttempted: totalAtt,
        totalCorrect: totalCorr,
        accuracyPct: accPct,
        dueForReviewCount: dueReview,
        resolvedMistakesCount: resolvedCount,
      });

      setMasteries(computedMasteries);

      // Compute readiness heuristic
      const computedReadiness = WeaknessAnalysisEngine.calculateReadiness(computedMasteries);
      setReadiness(computedReadiness);
    } catch (e: any) {
      console.error('Error loading dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t))
    );
  };

  const handleRecoverPlan = async () => {
    if (!plan) return;
    try {
      const res = await fetch('/api/planner/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPlan: plan,
          missedDaysCount: 2,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setPlan(json.data);
        setTasks(json.data.tasks || []);
        alert('Recovery Plan applied! Tasks reallocated without exceeding your daily budget.');
      }
    } catch (e: any) {
      alert('Error triggering plan recovery: ' + e.message);
    }
  };

  const [todayStr, setTodayStr] = useState<string>('');

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0]);
  }, []);

  const todayTasks = tasks.filter((t) => t.scheduledDate === todayStr);
  const remainingTasks = tasks.filter((t) => t.scheduledDate !== todayStr);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Track Switcher Navigation Strip */}
        <div className="bg-white dark:bg-slate-900 p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 px-2">পরীক্ষার ট্র্যাক:</span>
            <button
              type="button"
              onClick={() => handleTrackChange('general_bcs', 'general')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                track === 'general_bcs'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>সাধারণ বিসিএস প্রিলিমিনারি (General BCS • ১০ বিষয়)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTrackChange('special_bcs_health_51_2026', 'assistant_surgeon')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                track === 'special_bcs_health_51_2026' && stream === 'assistant_surgeon'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Stethoscope className="h-3.5 w-3.5" />
              <span>৫১তম বিশেষ বিসিএস (সহকারী সার্জন • MBBS)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTrackChange('special_bcs_health_51_2026', 'assistant_dental_surgeon')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                track === 'special_bcs_health_51_2026' && stream === 'assistant_dental_surgeon'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>৫১তম বিশেষ বিসিএস (ডেন্টাল সার্জন • BDS)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 px-2 text-xs text-slate-500 font-mono">
            <span>দৈনিক বাজেট: {dailyBudget} মিনিট</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. OBVIOUS PRIMARY NEXT ACTION (Hero Card)                               */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-800/80">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="h-4 w-4 animate-pulse text-amber-300" />
                <span>আজকের জন্য নির্ধারিত পরবর্তী কার্যকর পদক্ষেপ</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bangla-font">
                আজকের পড়াশোনা ও রিটেনশন সেশন শুরু করুন
              </h1>

              <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed bangla-font max-w-2xl">
                {track === 'general_bcs'
                  ? 'বিপিএসসি সাধারণ বিসিএস প্রিলিমিনারি সিলেবাস অনুযায়ী ১০টি বাছাইকৃত প্রশ্ন। সক্রিয় অ্যাক্টিভ রিকল ও স্পেসড রিভিশনের মাধ্যমে স্মৃতি ধরে রাখুন।'
                  : '৫১তম বিশেষ বিসিএস স্বাস্থ্য ক্যাডার প্রস্তুতি: সাধারণ বিষয় ও ক্লিনিক্যাল বিষয়ের সমন্বিত ১০টি প্রশ্ন।'}
              </p>

              {/* One obvious primary CTA button */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/study/today"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm sm:text-base font-extrabold transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2 group"
                >
                  <Play className="h-5 w-5 fill-slate-950 group-hover:scale-110 transition-transform" />
                  <span>আজকের স্টাডি সেশন শুরু করুন (১০টি প্রশ্ন • ১৫ মিনিট)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/question-bank"
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center gap-2"
                >
                  <BookCheck className="h-4 w-4 text-emerald-300" />
                  <span>ডেইলি চ্যালেঞ্জ (৫টি প্রশ্ন)</span>
                </Link>
              </div>
            </div>

            {/* Quick KPI Snapshot on the right */}
            <div className="grid grid-cols-2 gap-3 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-extrabold text-emerald-300">
                  {studentStats.totalAttempted}
                </div>
                <div className="text-xs text-emerald-100">মোট অনুশীলিত প্রশ্ন</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-extrabold text-teal-300">
                  {studentStats.accuracyPct}%
                </div>
                <div className="text-xs text-teal-100">বাস্তব সঠিকতার হার</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-extrabold text-rose-300">
                  {studentStats.dueForReviewCount}
                </div>
                <div className="text-xs text-rose-100">আজকের রিভিশন ডিউ</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-extrabold text-amber-300">
                  {studentStats.resolvedMistakesCount}
                </div>
                <div className="text-xs text-amber-100">দুর্বলতা সমাধানকৃত</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE 5-STEP CORE LEARNING LOOP WIDGET                                  */}
        {/* ========================================================================= */}
        <section
          aria-labelledby="learning-loop-heading"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Repeat className="h-5 w-5 text-emerald-600" />
                <h2 id="learning-loop-heading" className="text-lg font-bold text-slate-900 dark:text-white bangla-font">
                  বিসিএস স্মরণশক্তি ও রিটেনশন লুপ (Core 5-Step Learning Loop)
                </h2>
              </div>
              <p className="text-xs text-slate-500 bangla-font mt-0.5">
                পরীক্ষার জন্য তথ্য মুখস্থ করে দীর্ঘমেয়াদী স্মৃতিতে রূপান্তরের বৈজ্ঞানিক পর্যায়ক্রম।
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl">
              সক্রিয় অ্যাক্টিভ রিকল ফ্রেমওয়ার্ক
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                step: '১',
                title: 'ছোট টপিক জানুন',
                subtitle: 'Learn a Small Topic',
                desc: 'সিলেবাসের নির্দিষ্ট অংশ স্বল্প সময়ে পড়ুন',
                icon: BookOpen,
                color: 'text-blue-600',
                bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
              },
              {
                step: '২',
                title: 'স্মৃতি থেকে স্মরণ',
                subtitle: 'Active Retrieval',
                desc: 'বই বন্ধ করে মূল ধারণাগুলো মনে করার চেষ্টা',
                icon: Sparkles,
                color: 'text-amber-600',
                bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
              },
              {
                step: '৩',
                title: 'প্রশ্ন সমাধান',
                subtitle: 'Practice MCQs',
                desc: 'উত্তর দেখার আগে নিজে সঠিক অপশন নির্বাচন',
                icon: Target,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
              },
              {
                step: '৪',
                title: 'ভুল পর্যালোচনা',
                subtitle: 'Review Mistakes',
                desc: 'মিস্টেক নোটবুকে সঠিক ব্যাখ্যা ও ভুল বিশ্লেষণ',
                icon: AlertCircle,
                color: 'text-rose-600',
                bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
              },
              {
                step: '৫',
                title: 'স্পেসড রিভিশন',
                subtitle: 'Spaced Revisit',
                desc: '১, ৩ ও ৭ দিন পর পুনরাবৃত্তি করে দীর্ঘস্থায়ী স্মৃতি',
                icon: Clock,
                color: 'text-purple-600',
                bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
              },
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${st.bg}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 shadow-xs">
                      ধাপ {st.step}
                    </span>
                    <Icon className={`h-4 w-4 ${st.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white bangla-font">
                      {st.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium block">
                      {st.subtitle}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TRANSPARENT READINESS HEURISTIC (Evidence-Based)                       */}
        {/* ========================================================================= */}
        {readiness && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                  প্রস্তুতি ট্র্যাকার (Preparation Progress Estimate)
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {readiness.overallScore}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium bangla-font">
                    মোট {readiness.totalTopicsCount}টি সিলেবাস টপিকের মধ্যে {readiness.assessedTopicsCount}টি টপিকে অনুশীলন মূল্যায়ন সম্পন্ন
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="italic max-w-sm">
                  {readiness.disclaimer || 'এটি বাস্তব অনুশীলনের তথ্যের ওপর নির্ভরশীল একটি আনুমানিক হিসাব; কোনো অফিশিয়াল নম্বর বা ফলাফল নিশ্চয়তা নয়।'}
                </span>
              </div>
            </div>

            {/* Component Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">সঠিকতা (Accuracy 40%)</span>
                  <span className="text-emerald-600 font-bold">{readiness.accuracyComponent}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${readiness.accuracyComponent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">সিলেবাস কাভারেজ (30%)</span>
                  <span className="text-sky-600 font-bold">{readiness.coverageComponent}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${readiness.coverageComponent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">স্মৃতি ধারণ (Retention 20%)</span>
                  <span className="text-purple-600 font-bold">{readiness.retentionComponent}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${readiness.retentionComponent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">সময় ব্যবস্থাপনা (Pacing 10%)</span>
                  <span className="text-amber-600 font-bold">{readiness.timeComponent}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${readiness.timeComponent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. MAIN WORKSPACE GRID: SCHEDULE & WEAKNESSES                             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols): Today's Schedule & Spaced Repetition */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white bangla-font">
                    আজকের নির্ধারিত পড়াশোনার সূচি (Today&apos;s Schedule)
                  </h2>
                </div>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  দৈনিক টার্গেট: {dailyBudget} মিনিট
                </span>
              </div>

              {todayTasks.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    আজকের নির্ধারিত রুটিন সম্পন্ন!
                  </div>
                  <p className="text-xs text-slate-500 bangla-font max-w-md mx-auto">
                    আপনার আজকের দিনের নির্ধারিত পড়া শেষ হয়েছে। অতিরিক্ত অনুশীলনের জন্য প্রশ্ন ব্যাংক থেকে প্রশ্ন সমাধান অথবা একটি মক টেস্ট দিতে পারেন।
                  </p>
                  <Link
                    href="/study/today"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>দৈনিক প্র্যাকটিস সেশন চালু করুন</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayTasks.map((t) => (
                    <div
                      key={t.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        t.status === 'completed'
                          ? 'border-emerald-500/20 bg-emerald-500/5 opacity-75'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleTask(t.id)}
                        className={`h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          t.status === 'completed'
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                        }`}
                      >
                        {t.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                            {t.subjectNameBn}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {t.estimatedMinutes} মিনিট
                          </span>
                        </div>
                        <h3
                          className={`font-bold text-sm text-slate-900 dark:text-white bangla-font ${
                            t.status === 'completed' ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          <span className="font-semibold text-slate-600 dark:text-slate-400">কেন নির্ধারিত: </span>
                          {t.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Spaced Repetitions */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white bangla-font">
                    আসন্ন স্পেসড রিভিশন সূচি (আগামী ৭ দিন)
                  </h3>
                </div>
                <span className="text-xs text-purple-600 font-semibold font-mono">
                  {remainingTasks.length}টি নির্ধারিত
                </span>
              </div>

              <div className="space-y-2">
                {remainingTasks.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center bangla-font">
                    কোনো স্পেসড রিভিশন পেন্ডিং নেই।
                  </p>
                ) : (
                  remainingTasks.slice(0, 4).map((rt) => (
                    <div
                      key={rt.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 bangla-font">
                          {rt.title}
                        </span>
                        <span className="block text-[11px] text-slate-500">
                          তারিখ: {rt.scheduledDate}
                        </span>
                      </div>
                      <span className="font-mono text-slate-500">{rt.estimatedMinutes} মি.</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column (1 col): Diagnosed Weaknesses & Fast Action */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white bangla-font">
                  বাস্তব দুর্বলতা বিশ্লেষণ
                </h3>
                <span className="text-xs text-slate-400 font-medium">অনুশীলন ভিত্তিক</span>
              </div>

              {masteries.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-500 bangla-font leading-relaxed">
                    এখনো কোনো প্রশ্ন অনুশীলন করা হয়নি। প্রতিদিন অন্তত ১০টি প্রশ্ন সমাধান করলে আপনার ভুল ও দুর্বল বিষয়ের স্বয়ংক্রিয় বিশ্লেষণ এখানে প্রদর্শিত হবে।
                  </p>
                  <Link
                    href="/study/today"
                    className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    <span>প্রথম প্র্যাকটিস শুরু করুন</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {masteries.slice(0, 4).map((m) => {
                    const insight = WeaknessAnalysisEngine.getWeaknessInsight(m.weaknessLabel);
                    return (
                      <div
                        key={m.topicId}
                        className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200 bangla-font">
                            {m.titleBn}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${insight.badgeColor}`}>
                            {insight.titleEn}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>সঠিক: {m.correctAttempts}/{m.totalAttempts} ({m.accuracyPct}%)</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {insight.actionEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-2">
                <Link
                  href="/mistake-notebook"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 text-rose-500" />
                  <span>মিস্টেক নোটবুক খুলুন ({studentStats.dueForReviewCount}টি ডিউ)</span>
                </Link>
              </div>
            </div>

            {/* Quick Drill Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white space-y-4">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-base bangla-font">দ্রুত ৫ মিনিটের স্প্রিন্ট</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed bangla-font">
                ব্যস্ততার মাঝেও প্রতিদিন অন্তত ৫টি সিলেবাস-ম্যাপড প্রশ্নের সমাধান করে নিয়মিত প্রস্তুতি বজায় রাখুন।
              </p>
              <Link
                href="/test"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-950 text-xs font-bold shadow-md hover:bg-slate-100 transition-colors"
              >
                <span>মক টেস্ট ড্রিল শুরু করুন</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
