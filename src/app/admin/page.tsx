'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileCheck,
  FileText,
  Filter,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  Upload,
  UserCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { EXAM_CONFIG_VERSIONS, EXAM_TRACKS, SPECIAL_BCS_HEALTH_SUBJECTS } from '@/data/exam-configs';
import { ALL_RESOURCES, OFFICIAL_SOURCES, REFERENCE_CATALOG } from '@/data/catalog';
import { SEED_QUESTIONS } from '@/data/seed-questions';
import { SYLLABUS_TOPICS } from '@/data/syllabus';
import { Question, ReviewStatus, UserRole } from '@/types';

export default function AdminPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [activeTab, setActiveTab] = useState<'configs' | 'questions' | 'resources' | 'audit'>('configs');

  // Question bank state
  const [questionsList, setQuestionsList] = useState<Question[]>(SEED_QUESTIONS);
  const [questionSearch, setQuestionSearch] = useState('');
  const [filterTrack, setFilterTrack] = useState<string>('all');
  const [filterReview, setFilterReview] = useState<string>('all');

  // JSON bulk import state
  const [jsonImportText, setJsonImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Filtered questions
  const filteredQuestions = questionsList.filter((q) => {
    if (filterTrack !== 'all' && q.examTrackId !== filterTrack) return false;
    if (filterReview !== 'all' && q.reviewStatus !== filterReview) return false;
    if (questionSearch.trim()) {
      const s = questionSearch.toLowerCase();
      return (
        q.stemBn.toLowerCase().includes(s) ||
        q.stemEn.toLowerCase().includes(s) ||
        q.subjectCode.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const handleUpdateStatus = (qid: string, newStatus: ReviewStatus) => {
    setQuestionsList((prev) =>
      prev.map((q) => (q.id === qid ? { ...q, reviewStatus: newStatus } : q))
    );
  };

  const handleBulkImport = () => {
    try {
      const parsed = JSON.parse(jsonImportText);
      const items = Array.isArray(parsed) ? parsed : [parsed];

      // Validate schema
      for (const item of items) {
        if (!item.stemEn && !item.stemBn) throw new Error('Question must have stemEn or stemBn');
        if (!item.options || item.options.length < 2) throw new Error('Question must have at least 2 options');
        if (!item.correctAnswerId) throw new Error('Question must have correctAnswerId');
      }

      const formatted: Question[] = items.map((item, i) => ({
        id: item.id || `imported-${Date.now()}-${i}`,
        examTrackId: item.examTrackId || 'special_bcs_health_51_2026',
        professionalStream: item.professionalStream || 'assistant_surgeon',
        subjectId: item.subjectId || 'sub-sbcs-med-sci-1',
        subjectCode: item.subjectCode || 'MED_SCI_1',
        topicId: item.topicId || 'top-med-anatomy-embryology',
        topicTitleEn: item.topicTitleEn || 'Clinical Anatomy',
        topicTitleBn: item.topicTitleBn || 'ক্লিনিক্যাল অ্যানাটমি',
        stemEn: item.stemEn || '',
        stemBn: item.stemBn || '',
        options: item.options,
        correctAnswerId: item.correctAnswerId,
        explanationEn: item.explanationEn || '',
        explanationBn: item.explanationBn || '',
        difficulty: item.difficulty || 'medium',
        contentOrigin: item.contentOrigin || 'expert_authored',
        rightsStatus: item.rightsStatus || 'original',
        reviewStatus: 'under_review', // Imported questions start in review queue
        revisionNumber: 1,
      }));

      setQuestionsList((prev) => [...formatted, ...prev]);
      setImportStatus(`Successfully ingested ${formatted.length} question(s) into the review queue.`);
      setJsonImportText('');
    } catch (e: any) {
      setImportStatus(`Import Error: ${e.message}`);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Role Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Administrative & Editorial Governance Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              BCS Crack System Control
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 bangla-font mt-1">
              পরীক্ষা কনফিগারেশন ভার্সনিং, প্রশ্ন ব্যাংক রিভিউ, ক্যাটালগ ইনজেশন ও অডিট ট্রেইল।
            </p>
          </div>

          {/* Role Impersonation Toolbar */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-semibold text-slate-500 px-2">Active Role:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="font-bold border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="super_admin">Super Admin</option>
              <option value="exam_manager">Exam Manager</option>
              <option value="content_reviewer">Content Reviewer</option>
              <option value="content_editor">Content Editor</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: 'configs', label: 'Exam Tracks & Config Versions', icon: ShieldCheck },
            { id: 'questions', label: `Question Bank & Review (${questionsList.length})`, icon: FileCheck },
            { id: 'resources', label: `Resource Catalog Management (${ALL_RESOURCES.length})`, icon: BookOpen },
            { id: 'audit', label: 'System Audit Logs', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: EXAM TRACKS & CONFIG VERSIONS
        ========================================================================== */}
        {activeTab === 'configs' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Published Examination Configurations
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Configurations are immutable once published. Rule changes create a new version with required 2-person sign-off.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  2 Tracks Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 51st Special Health Card */}
                <div className="p-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                      51st-Special-Circular-2026-v1
                    </span>
                    <span className="text-xs font-bold text-emerald-600 uppercase">Published</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    51st Special BCS 2026 (Health Cadre)
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Questions / Marks:</span>
                      <span className="font-mono font-bold">200 MCQs / 200.00 Marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-mono font-bold">120 Minutes (7,200s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct / Wrong:</span>
                      <span className="font-mono font-bold text-emerald-600">+1.00 / -0.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Viva Marks (Pass):</span>
                      <span className="font-mono font-bold">100 (Pass 50)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dual Review Status:</span>
                      <span className="font-bold text-emerald-600">✓ 2-Person Verified</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-[11px] text-slate-500 border border-slate-200 dark:border-slate-800">
                    Source: BPSC Official Circular published 24 Sep 2026. 5,000 Cadre Vacancies (4,700 Assistant Surgeons + 300 Assistant Dental Surgeons).
                  </div>
                </div>

                {/* General BCS Card */}
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-600 text-white">
                      general-bcs-standard-v1
                    </span>
                    <span className="text-xs font-bold text-sky-600 uppercase">Published</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    General BCS Preliminary
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Questions / Marks:</span>
                      <span className="font-mono font-bold">200 MCQs / 200.00 Marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-mono font-bold">120 Minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negative Penalty:</span>
                      <span className="font-mono font-bold text-rose-500">-0.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subjects:</span>
                      <span className="font-mono font-bold">10 General Subjects</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 border border-slate-200 dark:border-slate-800">
                    Standard preliminary pattern across General & Technical cadres. Isolated from medical/dental subjects.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: QUESTION BANK & REVIEW QUEUE
        ========================================================================== */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Question Bank Management & Editorial Review
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Only questions in &apos;approved&apos; status appear in verified mock exams. AI-generated drafts are quarantined.
                  </p>
                </div>

                {/* Filter Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterReview}
                    onChange={(e) => setFilterReview(e.target.value)}
                    className="text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved ({questionsList.filter(q => q.reviewStatus === 'approved').length})</option>
                    <option value="under_review">Under Review ({questionsList.filter(q => q.reviewStatus === 'under_review').length})</option>
                    <option value="unverified_ai">Unverified AI</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* JSON Bulk Ingestion Section */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Upload className="h-4 w-4 text-emerald-600" />
                    <span>Structured JSON Question Ingestion</span>
                  </span>
                  <span className="text-[11px] text-slate-500">Auto-routes to &apos;under_review&apos;</span>
                </div>

                <textarea
                  rows={3}
                  value={jsonImportText}
                  onChange={(e) => setJsonImportText(e.target.value)}
                  placeholder='Paste JSON array of questions, e.g. [{"stemBn": "...", "options": [{"id": "A", "textBn": "..."}, ...], "correctAnswerId": "A"}]'
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />

                <div className="flex items-center justify-between">
                  {importStatus && (
                    <span className="text-xs font-bold text-emerald-600">{importStatus}</span>
                  )}
                  <button
                    type="button"
                    onClick={handleBulkImport}
                    disabled={!jsonImportText.trim()}
                    className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold disabled:opacity-40"
                  >
                    <span>Validate & Ingest Questions</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {q.id}
                        </span>
                        <span className="font-semibold text-emerald-600">{q.subjectCode}</span>
                        <span className="text-slate-500">{q.topicTitleBn}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            q.reviewStatus === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : q.reviewStatus === 'under_review'
                              ? 'bg-amber-500/10 text-amber-600'
                              : 'bg-rose-500/10 text-rose-600'
                          }`}
                        >
                          {q.reviewStatus}
                        </span>

                        {/* Action buttons */}
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(q.id, 'approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(q.id, 'rejected')}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px]"
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white bangla-font">
                      {q.stemBn || q.stemEn}
                    </h3>

                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Correct Answer: </span>
                      <span className="font-bold text-emerald-600 font-mono">Option {q.correctAnswerId}</span>
                      {q.sourceReference && (
                        <span className="ml-3 text-slate-400">Provenance: {q.sourceReference}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: RESOURCE CATALOG PREVIEW
        ========================================================================== */}
        {activeTab === 'resources' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Ingestion Review: Excel Catalog (B01–B19)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Preview metadata from BCS_51st_Special_Health_Book_and_Question_Bank_Catalog.xlsx.
                </p>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-400">
                19 Books + 3 BPSC Sources
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-bold">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Code</th>
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">Publisher</th>
                    <th className="py-2.5 px-3">Observed Price</th>
                    <th className="py-2.5 px-3">Rights Status</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {ALL_RESOURCES.map((r) => (
                    <tr key={r.id}>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-600">{r.code}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white max-w-xs truncate bangla-font">
                        {r.title}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{r.publisher || 'BPSC'}</td>
                      <td className="py-2.5 px-3 font-mono">{r.retailPriceObs || 'N/A'}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {r.rightsStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <button
                          type="button"
                          onClick={() => alert(`Reviewing metadata for ${r.code}: ${r.title}`)}
                          className="text-xs text-emerald-600 hover:underline font-bold"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: AUDIT LOGS
        ========================================================================== */}
        {activeTab === 'audit' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Immutable System Audit Logs
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 'aud-001',
                  time: '2026-10-21 14:15:00',
                  actor: 'BPSC Exam Manager',
                  action: 'PUBLISH_EXAM_CONFIG',
                  entity: 'special_bcs_health_51_2026 (v1.0)',
                  details: 'Published 200 MCQ / 120 Min / -0.50 wrong penalty configuration.',
                },
                {
                  id: 'aud-002',
                  time: '2026-10-21 14:20:00',
                  actor: 'Medical Content Lead',
                  action: 'APPROVE_QUESTION_BATCH',
                  entity: 'MED_SCI_1 & MED_SCI_2',
                  details: 'Validated clinical anatomy and pharmacology answer keys.',
                },
                {
                  id: 'aud-003',
                  time: '2026-10-21 14:30:00',
                  actor: 'Catalog Manager',
                  action: 'SYNC_EXCEL_CATALOG',
                  entity: 'BCS_51st_Special_Health_Book_and_Question_Bank_Catalog.xlsx',
                  details: 'Ingested 19 reference books B01–B19 with metadata confidence scoring.',
                },
              ].map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white font-mono">
                        [{log.action}]
                      </span>
                      <span className="font-semibold text-emerald-600">{log.entity}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{log.details}</p>
                    <span className="text-[11px] text-slate-400">Actor: {log.actor}</span>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
