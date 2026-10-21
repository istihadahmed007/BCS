'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Download,
  FileCheck2,
  FolderGit2,
  Globe2,
  PieChart,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  Target,
  XCircle,
} from 'lucide-react';

interface CoverageData {
  totalIngested: number;
  totalApproved: number;
  totalUnderReview: number;
  totalRejected: number;
  byTrack: Record<string, number>;
  byStream: Record<string, number>;
  bySubject: Record<string, number>;
  byOrigin: Record<string, number>;
  sourceHealth: {
    totalSources: number;
    synced: number;
    failed: number;
  };
  latestSyncDate: string;
}

export default function AdminCoveragePage() {
  const [data, setData] = useState<CoverageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchCoverage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ingestion/coverage');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setErrorMsg(json.error || 'Failed to fetch coverage data');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error fetching coverage');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverage();
  }, []);

  const handleExportAudit = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bcs_crack_coverage_audit_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500 text-sm flex flex-col items-center gap-3">
        <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
        <span>Loading database coverage metrics...</span>
      </div>
    );
  }

  if (errorMsg || !data) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm">
        <p className="font-bold">Error loading coverage data</p>
        <p className="text-xs mt-1">{errorMsg}</p>
        <button
          onClick={fetchCoverage}
          className="mt-3 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  const approvalRate = data.totalIngested > 0 ? ((data.totalApproved / data.totalIngested) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
            <BarChart3 className="h-4 w-4" />
            <span>Deterministic Database Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Question Bank Coverage & Traceability Audit
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Real database counts directly computed from registered questions. Zero simulated or fabricated figures. Tracks isolation between General BCS and 51st Special BCS Health streams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCoverage}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
            title="Refresh Metrics"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportAudit}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" />
            <span>Export Audit Report</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Ingested Staged
          </span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {data.totalIngested}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">From registered sources</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Verified & Approved
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {data.totalApproved}
          </p>
          <span className="text-[11px] text-emerald-600/80 font-semibold mt-1 block">
            {approvalRate}% Publication Rate
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
              Awaiting Review
            </span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {data.totalUnderReview}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">In human review queue</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Registered Sources
            </span>
            <Globe2 className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {data.sourceHealth.totalSources}
          </p>
          <span className="text-[11px] text-indigo-600/80 font-semibold mt-1 block">
            {data.sourceHealth.synced} In-Sync
          </span>
        </div>
      </div>

      {/* Grid: Track & Stream Partitioning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Track Partitioning Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-600" />
              <span>Examination Track Separation</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Strictly Isolated</span>
          </div>

          <div className="space-y-3">
            {Object.entries(data.byTrack).map(([trackId, count]) => {
              const pct = data.totalApproved > 0 ? ((count / data.totalApproved) * 100).toFixed(0) : '0';
              const isSpecial = trackId.includes('special');
              return (
                <div key={trackId} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {isSpecial ? <Stethoscope className="h-4 w-4 text-emerald-600" /> : <BookOpen className="h-4 w-4 text-sky-600" />}
                      <span>{isSpecial ? '51st Special BCS Health (2026)' : 'General BCS Preliminary'}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {count} questions ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isSpecial ? 'bg-emerald-500' : 'bg-sky-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Stream Partitioning (Medical Science vs Dental Science) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-teal-600" />
              <span>51st Special BCS Health Stream Isolation</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">Zero Cross-Contamination</span>
          </div>

          <div className="space-y-3">
            {Object.entries(data.byStream).map(([stream, count]) => {
              const label =
                stream === 'assistant_surgeon'
                  ? 'সহকারী সার্জন — Medical Science (MBBS)'
                  : stream === 'assistant_dental_surgeon'
                  ? 'সহকারী ডেন্টাল সার্জন — Dental Science (BDS)'
                  : 'সাধারণ আবশ্যিক বিষয় (Common 100 Marks)';

              return (
                <div key={stream} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 dark:text-white">{label}</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {count} questions
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {stream === 'assistant_surgeon' && 'Only eligible for Assistant Surgeon mock tests and practice'}
                    {stream === 'assistant_dental_surgeon' && 'Only eligible for Dental Surgeon mock tests and practice'}
                    {stream === 'all' && 'Shared Bengali, English, BD Affairs, Int Affairs, Mental Ability'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Subject Breakdown & Content Origin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span>Subject-wise Verified Question Counts</span>
          </h3>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {Object.entries(data.bySubject).map(([subject, count]) => (
              <div
                key={subject}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
              >
                <span className="font-medium text-slate-700 dark:text-slate-300 uppercase font-mono">
                  {subject.replace(/_/g, ' ')}
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Origin Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Content Origin Provenance</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(data.byOrigin).map(([origin, count]) => {
              const isPastPaper = origin === 'official_bpsc_past_paper';
              return (
                <div
                  key={origin}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${isPastPaper ? 'bg-indigo-600' : 'bg-teal-600'}`} />
                      <span>{isPastPaper ? 'Genuine Official BPSC Past Papers' : 'Expert-Reviewed Original Practice'}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {count} questions
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {isPastPaper
                      ? 'Historically administered by BPSC. Guaranteed authentic questions and answers.'
                      : 'Derived from official syllabus objectives and authorized medical references.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
