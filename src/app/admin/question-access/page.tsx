'use client';

import { useEffect, useState } from 'react';
import { Lock, Unlock, CheckCircle2, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { QuestionAccessTier } from '@/types';

export default function AdminQuestionAccessPage() {
  const [stats, setStats] = useState<{
    totalQuestions: number;
    freePreviewCount: number;
    premiumCount: number;
    freeRatioPercentage: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [targetIds, setTargetIds] = useState('');
  const [selectedTier, setSelectedTier] = useState<QuestionAccessTier>('free_preview');
  const [reason, setReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/questions/access');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const ids = targetIds
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (ids.length === 0) {
      alert('Please enter at least one question ID.');
      return;
    }

    setIsUpdating(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/questions/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionIds: ids,
          accessTier: selectedTier,
          reason: reason || 'Admin batch tier assignment',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Successfully assigned ${data.updatedCount} questions to '${selectedTier}'.`);
        setTargetIds('');
        setReason('');
        loadStats();
      } else {
        alert(data.error || 'Failed to update access tiers');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="h-6 w-6 text-indigo-600" />
          <span>Question Access & Free Preview Governance</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure which questions are designated for Free Preview versus Premium/Package-restricted access.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Total Questions in Bank</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {stats.totalQuestions.toLocaleString()}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Free Preview Accessible</span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {stats.freePreviewCount.toLocaleString()}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Locked Premium Questions</span>
            <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
              {stats.premiumCount.toLocaleString()}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Free Ratio Allocation</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {stats.freeRatioPercentage}%
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Bulk Assignment Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs max-w-2xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600" />
          <span>Bulk Assign Access Tier</span>
        </h3>

        <form onSubmit={handleBulkUpdate} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">
              Question IDs (one per line or comma-separated):
            </label>
            <textarea
              rows={4}
              placeholder="e.g.&#10;q-med1-001&#10;q-bng-001&#10;q-eng-005"
              value={targetIds}
              onChange={(e) => setTargetIds(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Target Access Tier:</label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as QuestionAccessTier)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                <option value="free_preview">Free Preview (Accessible to all)</option>
                <option value="premium">Premium (Active package required)</option>
                <option value="package_restricted">Package Restricted (Specific track required)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Audit Reason / Justification:</label>
              <input
                type="text"
                placeholder="e.g. Sample demo questions for circular"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors disabled:opacity-60"
            >
              {isUpdating ? 'Assigning...' : 'Update Access Tier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
