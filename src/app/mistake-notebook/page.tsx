'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  Flame,
  HelpCircle,
  Layers,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Tag,
  Trash2,
  XCircle,
} from 'lucide-react';
import {
  ExamTrackId,
  MistakeClassificationType,
  MistakeNotebookEntry,
  ProfessionalStreamId,
  Question,
} from '@/types';
import { GENERAL_BCS_SUBJECTS, SPECIAL_BCS_HEALTH_SUBJECTS } from '@/data/exam-configs';

// Comprehensive subject list covering General BCS and Special BCS Health
const ALL_NOTEBOOK_SUBJECTS = [
  { code: 'BANGLA', nameBn: 'বাংলা ভাষা ও সাহিত্য' },
  { code: 'ENGLISH', nameBn: 'ইংরেজি ভাষা ও সাহিত্য' },
  { code: 'BD_AFFAIRS', nameBn: 'বাংলাদেশ বিষয়াবলী' },
  { code: 'INT_AFFAIRS', nameBn: 'আন্তর্জাতিক বিষয়াবলী' },
  { code: 'MATH', nameBn: 'গাণিতিক যুক্তি' },
  { code: 'MENTAL_ABILITY', nameBn: 'মানসিক দক্ষতা' },
  { code: 'G_SCIENCE', nameBn: 'সাধারণ বিজ্ঞান' },
  { code: 'G_COMPUTER', nameBn: 'কম্পিউটার ও তথ্যপ্রযুক্তি' },
  { code: 'G_GEOGRAPHY', nameBn: 'ভূগোল ও পরিবেশ' },
  { code: 'G_ETHICS', nameBn: 'নৈতিকতা ও সুশাসন' },
  { code: 'MED_SCI_1', nameBn: 'চিকিৎসা বিজ্ঞান — ১ম পত্র (Basic Medical Science)' },
  { code: 'MED_SCI_2', nameBn: 'চিকিৎসা বিজ্ঞান — ২য় পত্র (Clinical Medical Science)' },
  { code: 'DENTAL_SCI_1', nameBn: 'দন্ত চিকিৎসা বিজ্ঞান — ১ম পত্র' },
  { code: 'DENTAL_SCI_2', nameBn: 'দন্ত চিকিৎসা বিজ্ঞান — ২য় পত্র' },
];

export default function MistakeNotebookPage() {
  const router = useRouter();

  // User session state (persisted across refreshes)
  const [userId, setUserId] = useState<string>('student_current');
  const [userName, setUserName] = useState<string>('Student');

  // Mistakes and stats
  const [mistakes, setMistakes] = useState<MistakeNotebookEntry[]>([]);
  const [stats, setStats] = useState<{
    totalMistakes: number;
    dueForReview: number;
    resolvedCount: number;
    unresolvedCount: number;
    bySubject: Record<string, number>;
    byErrorType: Record<string, number>;
  }>({
    totalMistakes: 0,
    dueForReview: 0,
    resolvedCount: 0,
    unresolvedCount: 0,
    bySubject: {},
    byErrorType: {},
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters
  const [activeTab, setActiveTab] = useState<'all' | 'due_today' | 'frequently_repeated' | 'upcoming' | 'resolved'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedErrorType, setSelectedErrorType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Editing state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Practice drill generation
  const [isGeneratingDrill, setIsGeneratingDrill] = useState<boolean>(false);

  // Active retry state for individual mistake cards
  const [retryActive, setRetryActive] = useState<Record<string, boolean>>({});
  const [retrySelections, setRetrySelections] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [retrySubmitted, setRetrySubmitted] = useState<Record<string, boolean>>({});

  // Load persistent user session
  useEffect(() => {
    const savedUser = localStorage.getItem('bcs_active_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.id) setUserId(parsed.id);
        if (parsed.name) setUserName(parsed.name);
      } catch (e) {}
    } else {
      localStorage.setItem(
        'bcs_active_user',
        JSON.stringify({ id: 'student_current', name: 'Student', role: 'student' })
      );
    }
  }, []);

  const fetchMistakes = async (uid = userId) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const params = new URLSearchParams({ userId: uid });
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      if (selectedErrorType !== 'all') params.append('errorType', selectedErrorType);
      if (activeTab !== 'all') params.append('reviewStatus', activeTab);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/mistake-notebook?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setMistakes(json.data || []);
        if (json.stats) setStats(json.stats);
      } else {
        setErrorMsg(json.error || 'Failed to load mistake notebook');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error fetching mistakes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMistakes(userId);
    }
  }, [userId, activeTab, selectedSubject, selectedErrorType, searchQuery]);

  const handleToggleResolve = async (entry: MistakeNotebookEntry) => {
    try {
      const res = await fetch(`/api/mistake-notebook/${entry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          resolved: !entry.resolved,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({
          type: 'success',
          message: !entry.resolved
            ? 'প্রশ্নটি সমাধানকৃত (Resolved) হিসেবে চিহ্নিত হয়েছে!'
            : 'প্রশ্নটি পুনরায় সক্রিয় রিভিশনে যোগ করা হয়েছে।',
        });
        await fetchMistakes(userId);
      }
    } catch (err) {
      alert('Failed to update resolution state');
    }
  };

  const handleSaveNotes = async (entryId: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/mistake-notebook/${entryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          candidateNotes: notesDraft,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setEditingNotesId(null);
        setNotification({ type: 'success', message: 'ব্যক্তিগত স্টাডি নোট সফলভাবে সংরক্ষিত হয়েছে।' });
        await fetchMistakes(userId);
      }
    } catch (err) {
      alert('Failed to save notes');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateClassification = async (entryId: string, errorType: MistakeClassificationType) => {
    try {
      const res = await fetch(`/api/mistake-notebook/${entryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          errorType,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ type: 'success', message: 'ভুলের কারণ শ্রেণীকরণ হালনাগাদ করা হয়েছে।' });
        await fetchMistakes(userId);
      }
    } catch (err) {
      alert('Failed to update error type');
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই প্রশ্নটি মিস্টেক নোটবুক থেকে মুছে ফেলতে চান?')) return;

    try {
      const res = await fetch(`/api/mistake-notebook/${entryId}?userId=${encodeURIComponent(userId)}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ type: 'success', message: 'প্রশ্নটি মিস্টেক নোটবুক থেকে অপসারিত হয়েছে।' });
        await fetchMistakes(userId);
      }
    } catch (err) {
      alert('Failed to delete mistake');
    }
  };

  const handleStartMistakePractice = async () => {
    setIsGeneratingDrill(true);
    try {
      const res = await fetch('/api/mistake-notebook/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          subject: selectedSubject !== 'all' ? selectedSubject : undefined,
          questionCount: 10,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        // Navigate directly to study player with this mistake practice set
        router.push(`/study/today?mode=mistake_notebook&setId=${json.data.id}`);
      } else {
        alert(json.error || 'No unresolved mistakes available for retake practice.');
      }
    } catch (err) {
      alert('Failed to generate practice drill');
    } finally {
      setIsGeneratingDrill(false);
    }
  };

  const getErrorTypeLabel = (type: string) => {
    switch (type) {
      case 'conceptual_misunderstanding':
        return { label: 'ধারনামূলক অস্পষ্টতা (Conceptual)', bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' };
      case 'forgotten_fact':
        return { label: 'তথ্যগত বিস্মৃতি (Forgotten Fact)', bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' };
      case 'confused_options':
        return { label: 'অনুরূপ অপশনে বিভ্রান্তি (Confused Options)', bg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' };
      case 'misread_question':
        return { label: 'প্রশ্ন পড়তে ভুল (Misread Question)', bg: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' };
      case 'calculation_error':
        return { label: 'হিসাব বা তথ্যের ভুল (Calculation Error)', bg: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' };
      case 'guessing_or_low_confidence':
        return { label: 'অনুমান বা আত্মবিশ্বাসের ঘাটতি (Guessing)', bg: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' };
      default:
        return { label: 'নলেজ গ্যাপ (Knowledge Gap)', bg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold mb-2">
            <BookMarked className="h-3.5 w-3.5" />
            <span>Evidence-Backed Personal Error Journal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ব্যক্তিগত মিস্টেক নোটবুক ও রিভিশন ড্রিল
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed bangla-font">
            অনুশীলন ও মক টেস্টে ভুল হওয়া প্রশ্নগুলোর স্বয়ংক্রিয় সংরক্ষণাগার। নির্ভুল শ্রেণীকরণ, ব্যক্তিগত স্টাডি নোট এবং স্পেসড রিপিটেশন নিয়মে দুর্বলতা দূরীকরণ।
          </p>
        </div>

        {/* User Session Badge & Retake Practice Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-semibold">Active Session</span>
          </div>

            <button
              onClick={handleStartMistakePractice}
              disabled={isGeneratingDrill || stats.unresolvedCount === 0}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-rose-600/20 flex items-center gap-2"
            >
              {isGeneratingDrill ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>ড্রিল তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  <span>ভুল প্রশ্নগুলো পুনরায় অনুশীলন করুন ({stats.unresolvedCount})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {notification && (
          <div
            className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
              notification.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-xs font-bold opacity-70">
              ✕
            </button>
          </div>
        )}

        {/* Real Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] font-bold uppercase text-slate-500">মোট সংরক্ষিত ভুল</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {stats.totalMistakes}
            </p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">প্র্যাকটিস ও মক টেস্ট হতে</span>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-rose-600">আজকের রিভিশন ডিউ</span>
              <Clock className="h-4 w-4 text-rose-600" />
            </div>
            <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
              {stats.dueForReview}
            </p>
            <span className="text-[11px] text-rose-600/80 font-semibold mt-0.5 block">
              Spaced Repetition Due
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-600">সমাধানকৃত (Resolved)</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {stats.resolvedCount}
            </p>
            <span className="text-[11px] text-emerald-600/80 font-semibold mt-0.5 block">
              সফলভাবে আয়েত্তে আনা
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] font-bold uppercase text-amber-600">প্রধান ভুলের কারণ</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">
              {Object.keys(stats.byErrorType).length > 0
                ? getErrorTypeLabel(
                    Object.entries(stats.byErrorType).sort((a, b) => b[1] - a[1])[0][0]
                  ).label.split('(')[0]
                : 'বিশ্লেষণাধীন'}
            </p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">দুর্বলতা অনুযায়ী রিভিশন প্রয়োজন</span>
          </div>
        </div>

        {/* Spaced Repetition Workflow Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `সকল ভুল প্রশ্ন (${stats.totalMistakes})`, icon: Layers },
            { id: 'due_today', label: `আজকের রিভিশন (${stats.dueForReview})`, icon: Clock },
            { id: 'frequently_repeated', label: 'বারবার ভুল হওয়া (3+ Retries)', icon: AlertTriangle },
            { id: 'upcoming', label: 'আসন্ন রিভিশন', icon: Calendar },
            { id: 'resolved', label: `সমাধানকৃত (${stats.resolvedCount})`, icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="প্রশ্ন, টপিক বা ব্যক্তিগত নোট খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
            >
              <option value="all">সকল বিষয় (All Subjects)</option>
              {ALL_NOTEBOOK_SUBJECTS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.nameBn}
                </option>
              ))}
            </select>

            <select
              value={selectedErrorType}
              onChange={(e) => setSelectedErrorType(e.target.value)}
              className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
            >
              <option value="all">সকল ভুলের কারণ (All Error Types)</option>
              <option value="conceptual_misunderstanding">ধারনামূলক অস্পষ্টতা (Conceptual)</option>
              <option value="forgotten_fact">তথ্যগত বিস্মৃতি (Forgotten Fact)</option>
              <option value="confused_options">অনুরূপ অপশনে বিভ্রান্তি (Confused Options)</option>
              <option value="misread_question">প্রশ্ন পড়তে ভুল (Misread Question)</option>
              <option value="calculation_error">হিসাব বা তথ্যের ভুল (Calculation Error)</option>
              <option value="guessing_or_low_confidence">অনুমান বা আত্মবিশ্বাসের ঘাটতি (Guessing)</option>
            </select>
          </div>

          <button
            onClick={() => fetchMistakes(userId)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1.5"
            title="Refresh List"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Mistakes List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-16 text-center text-slate-400 text-xs">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-rose-600" />
              <span>মিস্টেক নোটবুক লোড হচ্ছে...</span>
            </div>
          ) : mistakes.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 space-y-3">
              <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-500" />
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
                এই ফিল্টারে কোনো ভুল প্রশ্ন নেই!
              </h3>
              <p className="text-xs max-w-md mx-auto leading-relaxed">
                অনুশীলন বা মক টেস্টের সময় যেসকল প্রশ্ন ভুল হবে, সেগুলো স্বয়ংক্রিয়ভাবে এখানে যুক্ত হবে যাতে আপনি সহজে দুর্বলতা দূর করতে পারেন।
              </p>
              <Link
                href="/study/today"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors mt-2"
              >
                <span>আজকের প্র্যাকটিস শুরু করুন</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            mistakes.map((entry, idx) => {
              const q = entry.question;
              const errorInfo = getErrorTypeLabel(entry.errorType);
              const isEditingNotes = editingNotesId === entry.id;

              return (
                <div
                  key={entry.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl border transition-all p-6 shadow-xs ${
                    entry.resolved
                      ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        #{idx + 1} • {q.subjectCode.toUpperCase()}
                      </span>

                      {/* Error Classification Tag */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${errorInfo.bg}`}>
                        {errorInfo.label}
                      </span>

                      {/* Retries Badge */}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        ভুল হয়েছে: {entry.retryCount} বার
                      </span>

                      {/* Next Scheduled Review */}
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="h-3 w-3 text-rose-500" />
                        <span>
                          রিভিশন:{' '}
                          {new Date(entry.scheduledReviewAt) <= new Date()
                            ? 'আজকে ডিউ'
                            : new Date(entry.scheduledReviewAt).toLocaleDateString()}
                        </span>
                      </span>
                    </div>

                    {/* Resolved Status Toggle, Retry & Delete */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setRetryActive((prev) => ({ ...prev, [entry.id]: !prev[entry.id] }));
                          setRetrySelections((prev) => ({ ...prev, [entry.id]: null }));
                          setRetrySubmitted((prev) => ({ ...prev, [entry.id]: false }));
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          retryActive[entry.id]
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                            : 'border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-100'
                        }`}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>{retryActive[entry.id] ? 'রিভিউ মোড' : 'রিট্রাই (Retry)'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleResolve(entry)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          entry.resolved
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                            : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{entry.resolved ? 'Resolved' : 'Mark Resolved'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-50 text-rose-600 text-xs"
                        title="Delete from Notebook"
                        aria-label="Delete from Notebook"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="my-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white bangla-font leading-relaxed">
                      {q.stemBn}
                    </h3>
                    {q.stemEn && q.stemEn !== q.stemBn && (
                      <p className="text-xs text-slate-500 italic mt-0.5">{q.stemEn}</p>
                    )}
                  </div>

                  {/* Active Retry Mode vs Static Options Comparison */}
                  {retryActive[entry.id] ? (
                    <div className="space-y-3 mb-4 p-4 rounded-2xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900">
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        <span>অ্যাক্টিভ রিকল মোড: সঠিক উত্তরটি নির্বাচন করে রিট্রাই করুন</span>
                        {retrySubmitted[entry.id] && (
                          <span
                            className={
                              retrySelections[entry.id] === q.correctAnswerId ? 'text-emerald-600' : 'text-rose-600'
                            }
                          >
                            {retrySelections[entry.id] === q.correctAnswerId ? 'সঠিক উত্তর! 🎉' : 'ভুল উত্তর! ❌'}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isSelected = retrySelections[entry.id] === opt.id;
                          const isSubmitted = retrySubmitted[entry.id];
                          const isCorrect = opt.id === q.correctAnswerId;

                          let btnStyle =
                            'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400';
                          if (isSelected) {
                            btnStyle =
                              'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500';
                          }
                          if (isSubmitted) {
                            if (isCorrect) {
                              btnStyle =
                                'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle =
                                'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              disabled={isSubmitted}
                              onClick={() => setRetrySelections((prev) => ({ ...prev, [entry.id]: opt.id }))}
                              className={`p-3 rounded-xl border text-xs text-left flex items-center gap-2.5 transition-all ${btnStyle}`}
                            >
                              <span
                                className={`h-5 w-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                                }`}
                              >
                                {opt.id}
                              </span>
                              <span className="bangla-font leading-relaxed">{opt.textBn}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {!retrySubmitted[entry.id] ? (
                          <button
                            type="button"
                            disabled={!retrySelections[entry.id]}
                            onClick={() => setRetrySubmitted((prev) => ({ ...prev, [entry.id]: true }))}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            উত্তর যাচাই করুন (Submit Answer)
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            {retrySelections[entry.id] === q.correctAnswerId ? (
                              <button
                                type="button"
                                onClick={() => handleToggleResolve(entry)}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>সমাধান হিসেবে চিহ্নিত করুন (Mark Resolved)</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setRetrySelections((prev) => ({ ...prev, [entry.id]: null }));
                                  setRetrySubmitted((prev) => ({ ...prev, [entry.id]: false }));
                                }}
                                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100"
                              >
                                আবার চেষ্টা করুন
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Options Comparison (Student Chosen vs Correct) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {q.options.map((opt) => {
                        const isCorrect = opt.id === q.correctAnswerId;
                        const isSelected = opt.id === entry.userSelectedOption;

                        let style =
                          'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300';
                        if (isCorrect) {
                          style =
                            'border-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-bold';
                        } else if (isSelected) {
                          style =
                            'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 font-bold';
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${style}`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-5 w-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                                  isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : isSelected
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {opt.id}
                              </span>
                              <span className="bangla-font">{opt.textBn}</span>
                            </div>

                            <div className="text-[10px] font-bold">
                              {isCorrect && <span className="text-emerald-700 dark:text-emerald-400">সঠিক উত্তর ✓</span>}
                              {isSelected && !isCorrect && (
                                <span className="text-rose-700 dark:text-rose-400">আপনার ভুল উত্তর ✗</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Verified Explanation & Traceable Evidence */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs mb-4 space-y-2">
                    <div>
                      <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">
                        যাচাইকৃত সঠিক ব্যাখ্যা:
                      </strong>
                      <p className="text-slate-800 dark:text-slate-200 bangla-font leading-relaxed">
                        {q.explanationBn}
                      </p>
                    </div>

                    {/* Source Evidence Indicator */}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>
                          {q.sourceReference || (q.sourceEvidence?.[0]?.citationText) || 'Official BPSC Question Paper & Syllabus'}
                        </span>
                      </div>
                      <Link
                        href="/admin/sources"
                        className="text-[10px] text-slate-400 hover:text-indigo-600 hover:underline flex items-center gap-0.5"
                      >
                        <span>সোর্স রেজিস্ট্রি দেখুন</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Candidate Study Notes Section */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Edit3 className="h-3.5 w-3.5 text-indigo-600" />
                        <span>আপনার ব্যক্তিগত স্টাডি নোট ও রিভিশন টিপস:</span>
                      </span>

                      {!isEditingNotes && (
                        <button
                          onClick={() => {
                            setEditingNotesId(entry.id);
                            setNotesDraft(entry.candidateNotes || '');
                          }}
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                        >
                          {entry.candidateNotes ? 'নোট সম্পাদনা করুন' : '+ নোট লিখুন'}
                        </button>
                      )}
                    </div>

                    {isEditingNotes ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={notesDraft}
                          onChange={(e) => setNotesDraft(e.target.value)}
                          placeholder="ভুলের কারণ ও মনে রাখার কৌশল নোট করুন..."
                          className="w-full p-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 text-xs bangla-font text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <div className="flex items-center justify-between">
                          {/* Quick classification selector */}
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[11px] text-slate-400 font-semibold">ভুলের কারণ:</span>
                            <select
                              value={entry.errorType}
                              onChange={(e) =>
                                handleUpdateClassification(entry.id, e.target.value as MistakeClassificationType)
                              }
                              className="text-[11px] p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                            >
                              <option value="conceptual_misunderstanding">ধারনামূলক অস্পষ্টতা</option>
                              <option value="forgotten_fact">তথ্যগত বিস্মৃতি</option>
                              <option value="confused_options">অনুরূপ অপশনে বিভ্রান্তি</option>
                              <option value="misread_question">প্রশ্ন পড়তে ভুল</option>
                              <option value="calculation_error">হিসাব বা তথ্যের ভুল</option>
                              <option value="guessing_or_low_confidence">অনুমান বা আত্মবিশ্বাসের ঘাটতি</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingNotesId(null)}
                              className="px-3 py-1 rounded-lg border border-slate-300 text-slate-600 text-xs"
                            >
                              বাতিল
                            </button>
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => handleSaveNotes(entry.id)}
                              className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                            >
                              সংরক্ষণ করুন (Save)
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic bangla-font bg-slate-50/60 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        {entry.candidateNotes || 'কোনো ব্যক্তিগত নোট যোগ করা হয়নি। উপরে "+ নোট লিখুন" ক্লিক করে যোগ করুন।'}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
  );
}
