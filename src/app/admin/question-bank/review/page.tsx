'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  Clock,
  ExternalLink,
  Eye,
  FileCheck2,
  Filter,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Trash2,
  XCircle,
} from 'lucide-react';
import { IngestionItem, IngestionStatus, Question } from '@/types';

export default function AdminQuestionReviewPage() {
  const [items, setItems] = useState<IngestionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Review decision state
  const [reviewerFeedback, setReviewerFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  const fetchReviewItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ingestion/review');
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
        if (json.data.length > 0 && !selectedItemId) {
          setSelectedItemId(json.data[0].id);
        }
      } else {
        setErrorMsg(json.error || 'Failed to load review queue');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error fetching items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewItems();
  }, []);

  const handleReviewDecision = async (
    itemId: string,
    decision: 'approved' | 'rejected' | 'needs_answer_verification' | 'needs_syllabus_mapping'
  ) => {
    setIsSubmitting(true);
    setActionSuccessNotice(null);
    try {
      const res = await fetch('/api/ingestion/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId,
          decision,
          reviewerFeedback: reviewerFeedback || undefined,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setActionSuccessNotice(`Question successfully updated: [${decision.toUpperCase()}]`);
        setReviewerFeedback('');
        await fetchReviewItems();
      } else {
        alert(json.error || 'Review decision failed');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkApprove = async () => {
    const unapproved = items.filter((i) => i.status !== 'approved' && i.status !== 'rejected');
    if (unapproved.length === 0) {
      alert('No eligible questions pending review.');
      return;
    }

    if (!confirm(`Are you sure you want to approve all ${unapproved.length} pending questions into the verified bank?`)) {
      return;
    }

    setIsSubmitting(true);
    try {
      for (const item of unapproved) {
        await fetch('/api/ingestion/review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            itemId: item.id,
            decision: 'approved',
            reviewerFeedback: 'Bulk verified via admin verification suite',
          }),
        });
      }
      setActionSuccessNotice(`Bulk approved ${unapproved.length} questions into the verified question bank.`);
      await fetchReviewItems();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Bulk approval failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const stem = (item.parsedPayload?.stemBn || item.parsedPayload?.stemEn || '').toLowerCase();
      const subject = (item.parsedPayload?.subjectCode || '').toLowerCase();
      return stem.includes(q) || subject.includes(q) || item.id.toLowerCase().includes(q);
    }
    return true;
  });

  const selectedItem = items.find((i) => i.id === selectedItemId);

  const pendingCount = items.filter((i) => i.status !== 'approved' && i.status !== 'rejected').length;
  const approvedCount = items.filter((i) => i.status === 'approved').length;
  const rejectedCount = items.filter((i) => i.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
            <FileCheck2 className="h-4 w-4" />
            <span>Stage G: Human-in-the-Loop Review Queue</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Question Verification & Publication Workflow
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Only approved questions enter the verified question bank and live mock exams. Inspect exact answer keys, source provenance, medical/dental science stream partitioning, and syllabus tags.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBulkApprove}
            disabled={isSubmitting || pendingCount === 0}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5"
          >
            <CheckSquare className="h-4 w-4" />
            <span>Bulk Approve Eligible ({pendingCount})</span>
          </button>
        </div>
      </div>

      {actionSuccessNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{actionSuccessNotice}</span>
          </div>
          <button
            onClick={() => setActionSuccessNotice(null)}
            className="text-xs text-emerald-600 hover:text-emerald-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-500">Total in Queue</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{items.length}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-amber-600">Pending Review</span>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">{pendingCount}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-emerald-600">Approved & Published</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{approvedCount}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-rose-600">Rejected / Archived</span>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">{rejectedCount}</p>
        </div>
      </div>

      {/* Split Queue Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Item List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Filters */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search stem or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Status</option>
              <option value="imported">Imported</option>
              <option value="needs_answer_verification">Needs Verification</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={fetchReviewItems}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 text-xs"
              title="Refresh"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* List */}
          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-400">
                No questions match the current filter.
              </div>
            ) : (
              filteredItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                const p = item.parsedPayload;

                let statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
                if (item.status === 'approved') statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
                if (item.status === 'rejected') statusBadge = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono font-bold text-slate-500 text-[10px]">
                        {item.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusBadge}`}>
                        {item.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-900 dark:text-white line-clamp-2 bangla-font">
                      {p?.stemBn || p?.stemEn || item.rawText}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold">
                        {p?.subjectCode || 'General'}
                      </span>
                      <span>Confidence: {item.extractionConfidence * 100}%</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Review Workspace (7 cols) */}
        <div className="lg:col-span-7">
          {selectedItem ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-slate-400 block">ID: {selectedItem.id}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      Status: {selectedItem.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Mapping: {selectedItem.mappingStatus}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400 font-mono">
                  Job: {selectedItem.jobId}
                </div>
              </div>

              {/* Duplicate Fingerprint Alert */}
              {selectedItem.duplicateHash && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>
                    Normalized fingerprint: <code className="font-mono">{selectedItem.duplicateHash}</code> (Duplicate check passed).
                  </span>
                </div>
              )}

              {/* Question Stems */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Question Stem (Bangla)
                </h4>
                <p className="text-xl font-bold text-slate-900 dark:text-white bangla-font leading-relaxed">
                  {selectedItem.parsedPayload?.stemBn || '(Bangla stem missing)'}
                </p>

                {selectedItem.parsedPayload?.stemEn && (
                  <div className="mt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      Question Stem (English)
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic font-medium">
                      {selectedItem.parsedPayload.stemEn}
                    </p>
                  </div>
                )}
              </div>

              {/* Options Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Answer Options & Verified Answer Key
                </h4>
                <div className="space-y-2">
                  {selectedItem.parsedPayload?.options?.map((opt) => {
                    const isCorrect = opt.id === selectedItem.parsedPayload?.correctAnswerId;
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 font-bold text-emerald-950 dark:text-emerald-100'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-6 w-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="bangla-font text-sm">{opt.textBn}</span>
                          {opt.textEn && opt.textEn !== opt.textBn && (
                            <span className="text-slate-400 text-xs italic">({opt.textEn})</span>
                          )}
                        </div>

                        {isCorrect && (
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Verified Key</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation & Source Provenance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                    Verified Explanation
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed bangla-font">
                    {selectedItem.parsedPayload?.explanationBn || 'No explanation provided yet.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                    Source Attribution & Provenance
                  </span>
                  <div className="space-y-1 text-slate-700 dark:text-slate-300">
                    <p>
                      <strong>Citation:</strong> {selectedItem.parsedPayload?.sourceCitation || 'BPSC Document'}
                    </p>
                    <p>
                      <strong>Year:</strong> {selectedItem.parsedPayload?.examinationYear || 'N/A'}
                    </p>
                    <p>
                      <strong>Origin:</strong> {selectedItem.parsedPayload?.contentOrigin || 'past_paper'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviewer Feedback Input */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Reviewer Notes / Verification Audit Log
                </label>
                <input
                  type="text"
                  placeholder="e.g. Verified against official BPSC 42nd special paper answer key..."
                  value={reviewerFeedback}
                  onChange={(e) => setReviewerFeedback(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                />
              </div>

              {/* Review Decision Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleReviewDecision(selectedItem.id, 'rejected')}
                  className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject Question</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleReviewDecision(selectedItem.id, 'needs_answer_verification')}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    Flag for Verification
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting || selectedItem.status === 'approved'}
                    onClick={() => handleReviewDecision(selectedItem.id, 'approved')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{selectedItem.status === 'approved' ? 'Already Approved' : 'Approve & Publish'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 text-sm">
              Select a question from the queue on the left to inspect, verify, and publish.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
