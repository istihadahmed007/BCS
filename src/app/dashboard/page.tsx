'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  GraduationCap,
  Play,
  RotateCcw,
  Sparkles,
  Stethoscope,
  Target,
  Zap,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId, StudyPlan, StudyTask, TopicMastery } from '@/types';
import { ReadinessIndicator, WeaknessAnalysisEngine } from '@/services/weakness';
import { SYLLABUS_TOPICS } from '@/data/syllabus';

export default function DashboardPage() {
  const [track, setTrack] = useState<ExamTrackId>('special_bcs_health_51_2026');
  const [stream, setStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [dailyBudget, setDailyBudget] = useState<number>(120);

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [readiness, setReadiness] = useState<ReadinessIndicator | null>(null);
  const [masteries, setMasteries] = useState<TopicMastery[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage or API
  useEffect(() => {
    const saved = localStorage.getItem('bcs_enrollment');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.trackId) setTrack(parsed.trackId);
        if (parsed.stream) setStream(parsed.stream);
        if (parsed.dailyMinutes) setDailyBudget(parsed.dailyMinutes);
      } catch (e) {}
    }

    loadDashboardData(track, stream, dailyBudget);
  }, []);

  const loadDashboardData = async (
    t: ExamTrackId,
    s: ProfessionalStreamId,
    budget: number
  ) => {
    setLoading(true);
    try {
      // 1. Fetch study plan
      const planRes = await fetch('/api/planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'candidate-user-1',
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

      // 2. Fetch mock masteries or calculate readiness
      const mockMasteries: TopicMastery[] = [
        {
          topicId: 'top-med-anatomy-embryology',
          topicCode: 'MED1-01',
          titleEn: 'Gross Anatomy & Neuroanatomy',
          titleBn: 'অ্যানাটমি ও নিউরোঅ্যানাটমি',
          subjectCode: 'MED_SCI_1',
          totalAttempts: 5,
          correctAttempts: 1,
          accuracyPct: 20,
          avgTimeSeconds: 50,
          weaknessLabel: 'knowledge_gap',
        },
        {
          topicId: 'top-bng-grammar',
          topicCode: 'BNG-01',
          titleEn: 'Bangla Grammar & Linguistics',
          titleBn: 'বাংলা ব্যাকরণ ও ভাষাতত্ত্ব',
          subjectCode: 'BANGLA',
          totalAttempts: 4,
          correctAttempts: 3,
          accuracyPct: 75,
          avgTimeSeconds: 16,
          weaknessLabel: 'careless_error',
        },
        {
          topicId: 'top-bda-constitution-governance',
          topicCode: 'BDA-02',
          titleEn: 'Constitution of Bangladesh',
          titleBn: 'বাংলাদেশের সংবিধান ও শাসনব্যবস্থা',
          subjectCode: 'BD_AFFAIRS',
          totalAttempts: 6,
          correctAttempts: 5,
          accuracyPct: 83,
          avgTimeSeconds: 38,
          weaknessLabel: 'mastered',
        },
      ];

      setMasteries(mockMasteries);
      const computedReadiness = WeaknessAnalysisEngine.calculateReadiness(mockMasteries);
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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dashboard Header & Track Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <Stethoscope className="h-3.5 w-3.5" />
                <span>
                  {track === 'general_bcs'
                    ? 'General BCS Track'
                    : stream === 'assistant_surgeon'
                    ? '51st Special BCS — Assistant Surgeon (MBBS)'
                    : '51st Special BCS — Assistant Dental Surgeon (BDS)'}
                </span>
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Daily Budget: {dailyBudget} mins
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Candidate Study Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRecoverPlan}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-amber-500" />
              <span>Missed Study? Recover Plan</span>
            </button>

            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/20"
            >
              <Target className="h-4 w-4" />
              <span>Start Mock Exam</span>
            </Link>
          </div>
        </div>

        {/* Readiness Heuristic Banner */}
        {readiness && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                  Transparent Preparation Readiness Heuristic
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {readiness.overallScore}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Based on {readiness.assessedTopicsCount} of {readiness.totalTopicsCount} syllabus topics
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="italic max-w-sm">{readiness.disclaimer}</span>
              </div>
            </div>

            {/* Component Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Accuracy (40%)</span>
                  <span className="text-emerald-600">{readiness.accuracyComponent}%</span>
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
                  <span className="text-slate-500">Coverage (30%)</span>
                  <span className="text-sky-600">{readiness.coverageComponent}%</span>
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
                  <span className="text-slate-500">Retention (20%)</span>
                  <span className="text-purple-600">{readiness.retentionComponent}%</span>
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
                  <span className="text-slate-500">Pacing (10%)</span>
                  <span className="text-amber-600">{readiness.timeComponent}%</span>
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

        {/* Main Grid: Today's Tasks + Weakness Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols): Today's Schedule */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Today&apos;s Bounded Study Schedule
                  </h2>
                </div>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  Target: {dailyBudget} Mins Total
                </span>
              </div>

              {todayTasks.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    No Pending Tasks for Today!
                  </div>
                  <p className="text-xs text-slate-500 bangla-font">
                    আজকের নির্ধারিত পড়াশোনা সফলভাবে সম্পন্ন হয়েছে অথবা নতুন মক টেস্ট শুরু করতে পারেন।
                  </p>
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
                            {t.estimatedMinutes} mins
                          </span>
                        </div>
                        <h3 className={`font-bold text-sm text-slate-900 dark:text-white bangla-font ${
                          t.status === 'completed' ? 'line-through text-slate-400' : ''
                        }`}>
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          <span className="font-semibold text-slate-600 dark:text-slate-400">Why assigned: </span>
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
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Upcoming Spaced Repetitions (Next 7 Days)
                  </h3>
                </div>
                <span className="text-xs text-purple-600 font-semibold font-mono">
                  {remainingTasks.length} Scheduled
                </span>
              </div>

              <div className="space-y-2">
                {remainingTasks.slice(0, 3).map((rt) => (
                  <div
                    key={rt.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 bangla-font">
                        {rt.title}
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        Scheduled on {rt.scheduledDate}
                      </span>
                    </div>
                    <span className="font-mono text-slate-500">{rt.estimatedMinutes}m</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 col): Diagnosed Weaknesses & Fast Action */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Diagnosed Weaknesses
                </h3>
                <span className="text-xs text-slate-400 font-medium">Evidence-Based</span>
              </div>

              <div className="space-y-3">
                {masteries.map((m) => {
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
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {insight.actionEn}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/mistake-notebook"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                >
                  <FileText className="h-3.5 w-3.5 text-rose-500" />
                  <span>Open Mistake Notebook</span>
                </Link>
              </div>
            </div>

            {/* Quick Practice Launcher */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white space-y-4">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-base">Quick 5-Minute Sprint</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed bangla-font">
                ব্যস্ততার মাঝেও প্রতিদিন অন্তত ৫টি হাই-ইল্ড প্রশ্নের সমাধান করে প্রস্তুতি ধরে রাখুন।
              </p>
              <Link
                href="/test"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-950 text-xs font-bold shadow-md hover:bg-slate-100 transition-colors"
              >
                <span>Take Quick Drill</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
