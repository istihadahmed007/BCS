'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  AlertTriangle,
  Archive,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Globe2,
  Link2,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  XCircle,
} from 'lucide-react';
import {
  EvidenceType,
  Question,
  QuestionSourceLink,
  SourceRegistryItem,
  SourceType,
  SourceVerificationStatus,
} from '@/types';

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<SourceRegistryItem[]>([]);
  const [stats, setStats] = useState<{
    totalSources: number;
    verifiedSources: number;
    awaitingReviewSources: number;
    unverifiedSources: number;
    questionsLinkedToSources: number;
    questionsWithVerifiedEvidence: number;
    questionsMissingSourceEvidence: number;
    brokenReferencesCount: number;
  }>({
    totalSources: 0,
    verifiedSources: 0,
    awaitingReviewSources: 0,
    unverifiedSources: 0,
    questionsLinkedToSources: 0,
    questionsWithVerifiedEvidence: 0,
    questionsMissingSourceEvidence: 0,
    brokenReferencesCount: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedSourceType, setSelectedSourceType] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Syncing state
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [detailSourceId, setDetailSourceId] = useState<string | null>(null);
  const [detailedSourceData, setDetailedSourceData] = useState<(SourceRegistryItem & { linkedQuestions?: Array<{ question: Question; evidence: QuestionSourceLink }> }) | null>(null);
  const [editingSource, setEditingSource] = useState<SourceRegistryItem | null>(null);

  // Question Link Form State inside Detail Modal
  const [isAttachingQuestion, setIsAttachingQuestion] = useState<boolean>(false);
  const [attachForm, setAttachForm] = useState<{
    questionId: string;
    evidenceType: EvidenceType;
    citationText: string;
    pageNumber: string;
    section: string;
    questionNumber: string;
    paragraph: string;
    examinationYear: string;
    verificationStatus: SourceVerificationStatus;
    reviewerNotes: string;
  }>({
    questionId: '',
    evidenceType: 'exact_question_match',
    citationText: '',
    pageNumber: '',
    section: '',
    questionNumber: '',
    paragraph: '',
    examinationYear: '2026',
    verificationStatus: 'verified',
    reviewerNotes: '',
  });

  // Add Source Form State
  const [newSource, setNewSource] = useState<{
    sourceCode: string;
    name: string;
    sourceType: SourceType;
    priority: 1 | 2 | 3 | 4;
    category: 'official_bpsc' | 'previous_year_archive' | 'authorized_book' | 'expert_authored';
    examinationName: string;
    publicationYear: string;
    author: string;
    publisher: string;
    edition: string;
    pageNumber: string;
    baseUrl: string;
    termsSummary: string;
    rightsStatus: 'public_domain' | 'metadata_only' | 'licensed' | 'restricted';
    syncSchedule: 'manual' | 'daily' | 'weekly';
    verificationStatus: SourceVerificationStatus;
    notes: string;
  }>({
    sourceCode: '',
    name: '',
    sourceType: 'official_bpsc_document',
    priority: 1,
    category: 'official_bpsc',
    examinationName: '51st Special BCS (Health) 2026',
    publicationYear: '2026',
    author: '',
    publisher: 'Bangladesh Public Service Commission',
    edition: '',
    pageNumber: '',
    baseUrl: '',
    termsSummary: 'Official public document from BPSC',
    rightsStatus: 'public_domain',
    syncSchedule: 'manual',
    verificationStatus: 'verified',
    notes: '',
  });

  const fetchSources = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/sources');
      const json = await res.json();
      if (json.success) {
        // Robust array parsing
        const list = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.sources)
          ? json.sources
          : json.data?.sources || [];
        setSources(list);

        if (json.stats) {
          setStats(json.stats);
        }
      } else {
        setErrorMsg(json.error || 'Failed to load source registry');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error fetching sources');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const openSourceDetails = async (id: string) => {
    setDetailSourceId(id);
    setDetailedSourceData(null);
    try {
      const res = await fetch(`/api/sources/${id}`);
      const json = await res.json();
      if (json.success) {
        setDetailedSourceData(json.data);
      }
    } catch (err) {
      console.error('Failed to load source details', err);
    }
  };

  const handleSyncSource = async (sourceId: string) => {
    setSyncingId(sourceId);
    setNotification(null);
    try {
      const res = await fetch('/api/sources/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ type: 'success', message: json.message });
        await fetchSources();
      } else {
        setNotification({ type: 'error', message: `Sync notice: ${json.error}` });
      }
    } catch (err: unknown) {
      setNotification({ type: 'error', message: err instanceof Error ? err.message : 'Sync failed' });
    } finally {
      setSyncingId(null);
    }
  };

  const handleVerifySource = async (sourceId: string, status: SourceVerificationStatus) => {
    try {
      const res = await fetch(`/api/sources/${sourceId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          verifiedBy: 'Super Admin / Lead Content Reviewer',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ type: 'success', message: json.message });
        await fetchSources();
        if (detailSourceId === sourceId) {
          await openSourceDetails(sourceId);
        }
      } else {
        alert(json.error || 'Verification failed');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Verification failed');
    }
  };

  const handleCreateSource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/sources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'super_admin',
        },
        body: JSON.stringify(newSource),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setNotification({ type: 'success', message: `সোর্স [${json.data.sourceCode}] সফলভাবে রেজিস্টার করা হয়েছে!` });
        await fetchSources();
      } else {
        alert(json.error || 'Failed to create source');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Creation failed');
    }
  };

  const handleUpdateSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSource) return;

    try {
      const res = await fetch(`/api/sources/${editingSource.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'super_admin',
        },
        body: JSON.stringify(editingSource),
      });
      const json = await res.json();
      if (json.success) {
        setEditingSource(null);
        setNotification({ type: 'success', message: 'সোর্স তথ্য সফলভাবে আপডেট হয়েছে।' });
        await fetchSources();
        if (detailSourceId === editingSource.id) {
          await openSourceDetails(editingSource.id);
        }
      } else {
        alert(json.error || 'Failed to update source');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleArchiveOrDeleteSource = async (id: string, action: 'archive' | 'delete') => {
    const promptMsg =
      action === 'delete'
        ? 'আপনি কি নিশ্চিত যে এই সোর্সটি স্থায়ীভাবে মুছে ফেলতে চান? (যদি এই সোর্সে প্রশ্ন লিংক করা থাকে তবে সেফগার্ড সক্রিয় হবে)'
        : 'আপনি কি এই সোর্সটিকে আর্কাইভ করতে চান? (আর্কাইভ করলে প্রশ্ন ব্যাংক অখণ্ড থাকবে কিন্তু সোর্স তালিকা থেকে লুপ্ত হবে)';

    if (!confirm(promptMsg)) return;

    try {
      const url = action === 'archive' ? `/api/sources/${id}?action=archive` : `/api/sources/${id}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'x-user-role': 'super_admin' },
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ type: 'success', message: json.message });
        setDetailSourceId(null);
        await fetchSources();
      } else {
        alert(`সেফগার্ড নোটিশ: ${json.error}`);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleAttachQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailSourceId) return;

    try {
      const res = await fetch(`/api/sources/${detailSourceId}/link-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'super_admin',
        },
        body: JSON.stringify(attachForm),
      });
      const json = await res.json();
      if (json.success) {
        setIsAttachingQuestion(false);
        setNotification({ type: 'success', message: 'প্রশ্নটির সাথে সোর্স প্রমাণ সফলভাবে যুক্ত হয়েছে!' });
        await openSourceDetails(detailSourceId);
        await fetchSources();
      } else {
        alert(json.error || 'Failed to link question');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Link operation failed');
    }
  };

  const handleVerifyQuestionEvidence = async (questionId: string, linkId: string, status: SourceVerificationStatus) => {
    try {
      const res = await fetch('/api/sources/verify-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'super_admin',
        },
        body: JSON.stringify({
          questionId,
          linkId,
          status,
          verifiedBy: 'Senior BCS Reviewer',
          reviewerNotes: `Verified as ${status} via Admin Source Inspector`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ type: 'success', message: `প্রশ্নের সোর্স প্রমাণ স্ট্যাটাস [${status}] হিসেবে হালনাগাদ হয়েছে!` });
        if (detailSourceId) {
          await openSourceDetails(detailSourceId);
        }
        await fetchSources();
      }
    } catch (err) {
      alert('Failed to update question evidence');
    }
  };

  // Filter logic
  const filteredSources = sources.filter((s) => {
    if (selectedPriority !== 'all' && s.priority.toString() !== selectedPriority) return false;
    if (selectedSourceType !== 'all' && s.sourceType !== selectedSourceType) return false;
    if (selectedVerification !== 'all' && s.verificationStatus !== selectedVerification) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const code = s.sourceCode.toLowerCase();
      const name = s.name.toLowerCase();
      const url = s.baseUrl.toLowerCase();
      const exam = (s.examinationName || '').toLowerCase();
      const author = (s.author || '').toLowerCase();
      return code.includes(q) || name.includes(q) || url.includes(q) || exam.includes(q) || author.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
            <Globe2 className="h-4 w-4" />
            <span>Legitimate Question-Source Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            সোর্স রেজিস্ট্রি ও এভিডেন্স ভেরিফিকেশন ম্যানেজার
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed bangla-font">
            বিপিএসসি-র অফিশিয়াল গেজেট, বিগত বিসিএস পরীক্ষার প্রশ্নপত্র ও অনুমোদিত রেফারেন্স বইয়ের সূচিপত্রের নির্ভরযোগ্য রেকর্ড। প্রতিটি প্রশ্নের প্রমাণভিত্তিক ভেরিফিকেশন নিশ্চিত করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>নতুন সোর্স যুক্ত করুন (Add Source)</span>
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
            {notification.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            )}
            <span className="font-semibold">{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs font-bold opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Real Database Derived Statistics Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Total Sources</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.totalSources}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-emerald-600">Verified Sources</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{stats.verifiedSources}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-amber-600">Awaiting Review</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{stats.awaitingReviewSources}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-rose-600">Unverified</span>
          <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{stats.unverifiedSources}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-indigo-600">Questions Linked</span>
          <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{stats.questionsLinkedToSources}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-teal-600">Evidence Verified</span>
          <p className="text-xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">{stats.questionsWithVerifiedEvidence}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Missing Evidence</span>
          <p className="text-xl font-extrabold text-slate-600 dark:text-slate-400 mt-1">{stats.questionsMissingSourceEvidence}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-red-500">Broken / Blocked</span>
          <p className="text-xl font-extrabold text-red-500 mt-1">{stats.brokenReferencesCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search code, title, exam, author or URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="all">All Priorities (P1 - P4)</option>
            <option value="1">Priority 1 (Official BPSC)</option>
            <option value="2">Priority 2 (Past Paper Archives)</option>
            <option value="3">Priority 3 (Authorized Books)</option>
            <option value="4">Priority 4 (Verified Practice)</option>
          </select>

          <select
            value={selectedSourceType}
            onChange={(e) => setSelectedSourceType(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="all">All Source Types</option>
            <option value="official_bpsc_document">Official BPSC Document</option>
            <option value="previous_exam_paper">Previous Exam Paper</option>
            <option value="official_gazette">Official Gazette</option>
            <option value="approved_reference_book">Approved Reference Book</option>
            <option value="other">Other Editorial</option>
          </select>

          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="all">All Verification Statuses</option>
            <option value="verified">Verified</option>
            <option value="source_attached">Source Attached</option>
            <option value="needs_review">Needs Review</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>

        <button
          onClick={fetchSources}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1.5"
          title="Refresh List"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Sources List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Priority / Code</th>
                <th className="py-3.5 px-4">Title & Details</th>
                <th className="py-3.5 px-4">Source Type</th>
                <th className="py-3.5 px-4">Evidence Links</th>
                <th className="py-3.5 px-4">Verification State</th>
                <th className="py-3.5 px-4">Sync / Health</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-indigo-600" />
                    <span>Loading source registry...</span>
                  </td>
                </tr>
              ) : filteredSources.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    কোনো সোর্স রেকর্ড পাওয়া যায়নি। (No sources match current filters)
                  </td>
                </tr>
              ) : (
                filteredSources.map((source) => {
                  const isSyncing = syncingId === source.id;

                  let priorityBadge = 'bg-slate-100 text-slate-700';
                  if (source.priority === 1) priorityBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
                  if (source.priority === 2) priorityBadge = 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
                  if (source.priority === 3) priorityBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
                  if (source.priority === 4) priorityBadge = 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';

                  let verificationPill = 'bg-slate-100 text-slate-600';
                  if (source.verificationStatus === 'verified') verificationPill = 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400';
                  if (source.verificationStatus === 'source_attached') verificationPill = 'bg-sky-50 text-sky-700 border border-sky-300 dark:bg-sky-950/40 dark:text-sky-400';
                  if (source.verificationStatus === 'needs_review') verificationPill = 'bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-950/40 dark:text-amber-400';
                  if (source.verificationStatus === 'unverified') verificationPill = 'bg-rose-50 text-rose-700 border border-rose-300 dark:bg-rose-950/40 dark:text-rose-400';

                  return (
                    <tr key={source.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priorityBadge}`}>
                            P{source.priority}
                          </span>
                          <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                            {source.sourceCode}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {source.name}
                        </div>
                        {source.examinationName && (
                          <span className="text-[11px] text-slate-500 block truncate">
                            Exam: {source.examinationName} {source.publicationYear ? `(${source.publicationYear})` : ''}
                          </span>
                        )}
                        <a
                          href={source.baseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 mt-0.5 truncate max-w-xs"
                        >
                          <span>{source.baseUrl}</span>
                          <ArrowUpRight className="h-3 w-3 shrink-0" />
                        </a>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap capitalize text-slate-600 dark:text-slate-400 font-medium">
                        {(source.sourceType || 'document').replace(/_/g, ' ')}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          onClick={() => openSourceDetails(source.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] transition-colors"
                        >
                          <Link2 className="h-3.5 w-3.5" />
                          <span>{source.linkedQuestionsCount || 0} Questions</span>
                        </button>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${verificationPill}`}>
                          {source.verificationStatus === 'verified' && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                          {source.verificationStatus === 'needs_review' && <AlertTriangle className="h-3 w-3 text-amber-600" />}
                          {source.verificationStatus === 'unverified' && <XCircle className="h-3 w-3 text-rose-600" />}
                          <span className="capitalize">{source.verificationStatus.replace(/_/g, ' ')}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-[11px]">
                          {source.lastSyncStatus === 'synced' ? (
                            <span className="text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Synced</span>
                            </span>
                          ) : (
                            <span className="text-rose-600 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>Check</span>
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openSourceDetails(source.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                            title="সোর্সের প্রমাণ ও বিস্তারিত দেখুন"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => setEditingSource(source)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold"
                            title="সোর্স এডিট করুন"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>

                          <button
                            disabled={isSyncing}
                            onClick={() => handleSyncSource(source.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 text-xs disabled:opacity-50"
                            title="চেক ও সিঙ্ক"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                          </button>

                          <button
                            onClick={() => handleArchiveOrDeleteSource(source.id, 'archive')}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-50 text-rose-600 text-xs"
                            title="আর্কাইভ করুন"
                          >
                            <Archive className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL SOURCE DETAILS & LINKED EVIDENCE MODAL */}
      {detailSourceId && detailedSourceData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                    P{detailedSourceData.priority} • {detailedSourceData.sourceCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 capitalize">
                    {detailedSourceData.verificationStatus}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {detailedSourceData.name}
                </h2>
              </div>
              <button
                onClick={() => setDetailSourceId(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 text-base"
              >
                ✕
              </button>
            </div>

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-slate-400 block font-semibold">Source Type</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                  {detailedSourceData.sourceType?.replace(/_/g, ' ') || 'Document'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Examination</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {detailedSourceData.examinationName || 'General BCS'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Publication Year</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {detailedSourceData.publicationYear || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Author / Publisher</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {detailedSourceData.author || detailedSourceData.publisher || 'BPSC Official'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Content Rights</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                  {detailedSourceData.rightsStatus.replace(/_/g, ' ')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Sync Schedule</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                  {detailedSourceData.syncSchedule}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <span className="text-slate-400 block font-semibold">URL / Reference</span>
                <a
                  href={detailedSourceData.baseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline flex items-center gap-1 font-mono break-all"
                >
                  <span>{detailedSourceData.baseUrl}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>
              {detailedSourceData.notes && (
                <div className="col-span-2 sm:col-span-3">
                  <span className="text-slate-400 block font-semibold">Auditor Notes</span>
                  <p className="text-slate-700 dark:text-slate-300 italic">{detailedSourceData.notes}</p>
                </div>
              )}
            </div>

            {/* Quick Verification Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs">
              <span className="font-bold text-indigo-950 dark:text-indigo-200">
                Administrative Verification Status:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVerifySource(detailedSourceData.id, 'verified')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500"
                >
                  Verify Source
                </button>
                <button
                  onClick={() => handleVerifySource(detailedSourceData.id, 'needs_review')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-400"
                >
                  Flag Needs Review
                </button>
              </div>
            </div>

            {/* Linked Questions Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-emerald-600" />
                  <span>
                    এই সোর্সের সাথে প্রমাণসহ যুক্ত প্রশ্নাবলি ({detailedSourceData.linkedQuestions?.length || 0})
                  </span>
                </h3>

                <button
                  onClick={() => setIsAttachingQuestion(!isAttachingQuestion)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Attach Question Evidence</span>
                </button>
              </div>

              {/* Attach Question Sub-form */}
              {isAttachingQuestion && (
                <form
                  onSubmit={handleAttachQuestion}
                  className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 mb-4 space-y-3 text-xs"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    নতুন প্রশ্নের সোর্স প্রমাণ সংযুক্তকরণ
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">Question ID (e.g. q-bng-001)</label>
                      <input
                        required
                        type="text"
                        placeholder="q-med1-001"
                        value={attachForm.questionId}
                        onChange={(e) => setAttachForm({ ...attachForm, questionId: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Evidence Type</label>
                      <select
                        value={attachForm.evidenceType}
                        onChange={(e) => setAttachForm({ ...attachForm, evidenceType: e.target.value as any })}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        <option value="exact_question_match">Exact Question Match (হুবহু বিগত প্রশ্ন)</option>
                        <option value="factual_reference">Factual Reference (তথ্যসূত্র প্রমাণ)</option>
                        <option value="syllabus_objective">Syllabus Objective (সিলেবাস লক্ষ্য)</option>
                        <option value="circular_rule">Circular Rule (গেজেট বিধি)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Citation Text / Description</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 42nd Special BCS Health Preliminary Examination, Q47"
                      value={attachForm.citationText}
                      onChange={(e) => setAttachForm({ ...attachForm, citationText: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="font-semibold block mb-1">Page No.</label>
                      <input
                        type="text"
                        placeholder="14"
                        value={attachForm.pageNumber}
                        onChange={(e) => setAttachForm({ ...attachForm, pageNumber: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Q No.</label>
                      <input
                        type="text"
                        placeholder="34"
                        value={attachForm.questionNumber}
                        onChange={(e) => setAttachForm({ ...attachForm, questionNumber: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Section</label>
                      <input
                        type="text"
                        placeholder="Anatomy"
                        value={attachForm.section}
                        onChange={(e) => setAttachForm({ ...attachForm, section: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Exam Year</label>
                      <input
                        type="text"
                        placeholder="2021"
                        value={attachForm.examinationYear}
                        onChange={(e) => setAttachForm({ ...attachForm, examinationYear: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAttachingQuestion(false)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold"
                    >
                      Save Evidence Link
                    </button>
                  </div>
                </form>
              )}

              {/* Linked Questions List */}
              <div className="space-y-3">
                {!detailedSourceData.linkedQuestions || detailedSourceData.linkedQuestions.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center text-xs text-slate-400">
                    এই সোর্সের সাথে এখনো কোনো প্রশ্ন লিংক করা হয়নি।
                  </div>
                ) : (
                  detailedSourceData.linkedQuestions.map(({ question, evidence }, idx) => (
                    <div
                      key={evidence.id || idx}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                          #{idx + 1} • {question.id} ({question.subjectCode})
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {evidence.verificationStatus}
                          </span>
                          <button
                            onClick={() =>
                              handleVerifyQuestionEvidence(
                                question.id,
                                evidence.id,
                                evidence.verificationStatus === 'verified' ? 'needs_review' : 'verified'
                              )
                            }
                            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-[10px] font-semibold"
                          >
                            Toggle Verify
                          </button>
                        </div>
                      </div>

                      <p className="font-medium text-slate-900 dark:text-slate-100 bangla-font text-sm leading-relaxed">
                        {question.stemBn}
                      </p>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                        <div>
                          <strong>Citation:</strong> {evidence.citationText}
                        </div>
                        <div className="flex flex-wrap gap-4 text-slate-500 font-mono text-[10px]">
                          {evidence.pageNumber && <span>Page: {evidence.pageNumber}</span>}
                          {evidence.questionNumber && <span>Q No: {evidence.questionNumber}</span>}
                          {evidence.section && <span>Section: {evidence.section}</span>}
                          {evidence.examinationYear && <span>Year: {evidence.examinationYear}</span>}
                          <span>Evidence: {evidence.evidenceType}</span>
                        </div>
                        {evidence.reviewerNotes && (
                          <div className="text-slate-400 italic">
                            Reviewer note: {evidence.reviewerNotes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SOURCE MODAL */}
      {editingSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                সোর্স মেটাডাটা সম্পাদনা (Edit Source)
              </h3>
              <button
                onClick={() => setEditingSource(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSource} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Source Name / Document Title</label>
                <input
                  required
                  type="text"
                  value={editingSource.name}
                  onChange={(e) => setEditingSource({ ...editingSource, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Source Type</label>
                  <select
                    value={editingSource.sourceType}
                    onChange={(e) => setEditingSource({ ...editingSource, sourceType: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="official_bpsc_document">Official BPSC Document</option>
                    <option value="previous_exam_paper">Previous Exam Paper</option>
                    <option value="official_gazette">Official Gazette</option>
                    <option value="approved_reference_book">Approved Reference Book</option>
                    <option value="other">Other Editorial</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Verification Status</label>
                  <select
                    value={editingSource.verificationStatus}
                    onChange={(e) => setEditingSource({ ...editingSource, verificationStatus: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="verified">Verified</option>
                    <option value="source_attached">Source Attached</option>
                    <option value="needs_review">Needs Review</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Base / Official URL</label>
                <input
                  required
                  type="url"
                  value={editingSource.baseUrl}
                  onChange={(e) => setEditingSource({ ...editingSource, baseUrl: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Author / Publisher</label>
                  <input
                    type="text"
                    value={editingSource.author || editingSource.publisher || ''}
                    onChange={(e) => setEditingSource({ ...editingSource, author: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Publication Year</label>
                  <input
                    type="text"
                    value={editingSource.publicationYear || ''}
                    onChange={(e) => setEditingSource({ ...editingSource, publicationYear: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Auditor Notes</label>
                <textarea
                  rows={2}
                  value={editingSource.notes || ''}
                  onChange={(e) => setEditingSource({ ...editingSource, notes: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSource(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SOURCE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Register Legitimate Source (নতুন সোর্স রেজিস্ট্রি)
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSource} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Source Code</label>
                  <input
                    required
                    type="text"
                    placeholder="SRC-BPSC-51ST-NOTICES"
                    value={newSource.sourceCode}
                    onChange={(e) => setNewSource({ ...newSource, sourceCode: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Source Type</label>
                  <select
                    value={newSource.sourceType}
                    onChange={(e) => setNewSource({ ...newSource, sourceType: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="official_bpsc_document">Official BPSC Document</option>
                    <option value="previous_exam_paper">Previous Exam Paper</option>
                    <option value="official_gazette">Official Gazette</option>
                    <option value="approved_reference_book">Approved Reference Book</option>
                    <option value="other">Other Editorial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Source Name / Document Title</label>
                <input
                  required
                  type="text"
                  placeholder="51st Special BCS Official Notice and Circular"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Priority</label>
                  <select
                    value={newSource.priority}
                    onChange={(e) => setNewSource({ ...newSource, priority: Number(e.target.value) as any })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value={1}>1: Official BPSC (Primary Authority)</option>
                    <option value={2}>2: Past Paper Archive (Secondary)</option>
                    <option value={3}>3: Authorized Reference Book</option>
                    <option value={4}>4: Expert Reviewed Practice</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Content Rights</label>
                  <select
                    value={newSource.rightsStatus}
                    onChange={(e) => setNewSource({ ...newSource, rightsStatus: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="public_domain">Public Domain (BPSC Gazettes)</option>
                    <option value="metadata_only">Metadata Only (No Mass Scraping)</option>
                    <option value="licensed">Licensed / Authorized</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Base / Official Document URL</label>
                <input
                  required
                  type="url"
                  placeholder="https://bpsc.gov.bd/pages/psc-exams"
                  value={newSource.baseUrl}
                  onChange={(e) => setNewSource({ ...newSource, baseUrl: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Examination Name</label>
                  <input
                    type="text"
                    placeholder="51st Special BCS Health"
                    value={newSource.examinationName}
                    onChange={(e) => setNewSource({ ...newSource, examinationName: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Publication Year</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={newSource.publicationYear}
                    onChange={(e) => setNewSource({ ...newSource, publicationYear: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Terms / Provenance Summary</label>
                <textarea
                  rows={2}
                  placeholder="Summarize permitted usage, robots policy, terms..."
                  value={newSource.termsSummary}
                  onChange={(e) => setNewSource({ ...newSource, termsSummary: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xs"
                >
                  Register Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
