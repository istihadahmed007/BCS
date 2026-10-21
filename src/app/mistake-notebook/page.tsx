'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Plus,
  RotateCcw,
  Sparkles,
  Tag,
  Trash2,
} from 'lucide-react';
import { SEED_QUESTIONS } from '@/data/seed-questions';
import { Question, WeaknessLabel } from '@/types';
import { WeaknessAnalysisEngine } from '@/services/weakness';

interface MistakeEntry {
  questionId: string;
  errorType: WeaknessLabel;
  candidateNotes: string;
  retryCount: number;
  resolved: boolean;
  question: Question;
}

export default function MistakeNotebookPage() {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [selectedErrorFilter, setSelectedErrorFilter] = useState<string>('all');
  const [activeNotesEdit, setActiveNotesEdit] = useState<{ [qid: string]: string }>({});

  useEffect(() => {
    // Load from localStorage or initialize with seed mistake examples
    const storedIds: string[] = JSON.parse(localStorage.getItem('bcs_mistake_notebook') || '[]');

    const fallbackIds = storedIds.length > 0 ? storedIds : ['q-med1-001', 'q-bng-001'];

    const loadedEntries: MistakeEntry[] = fallbackIds
      .map((id) => {
        const q = SEED_QUESTIONS.find((item) => item.id === id);
        if (!q) return null;
        return {
          questionId: id,
          errorType: 'knowledge_gap' as WeaknessLabel,
          candidateNotes: id === 'q-med1-001' ? 'হিউমেরাস ফ্র্যাকচারের স্পাইরাল গ্রুভ ও রেডিয়াল নার্ভের নার্ভ সাপ্লাই রিভিশন করতে হবে।' : 'ণ-ত্ব ও ষ-ত্ব বিধানের ব্যতিক্রম শব্দগুলো মনে রাখতে হবে।',
          retryCount: 1,
          resolved: false,
          question: q,
        };
      })
      .filter(Boolean) as MistakeEntry[];

    setMistakes(loadedEntries);
  }, []);

  const handleUpdateNotes = (qid: string, notes: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.questionId === qid ? { ...m, candidateNotes: notes } : m))
    );
  };

  const handleUpdateErrorType = (qid: string, type: WeaknessLabel) => {
    setMistakes((prev) =>
      prev.map((m) => (m.questionId === qid ? { ...m, errorType: type } : m))
    );
  };

  const handleToggleResolve = (qid: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.questionId === qid ? { ...m, resolved: !m.resolved } : m))
    );
  };

  const handleDelete = (qid: string) => {
    const remaining = mistakes.filter((m) => m.questionId !== qid);
    setMistakes(remaining);
    const stored: string[] = JSON.parse(localStorage.getItem('bcs_mistake_notebook') || '[]');
    localStorage.setItem('bcs_mistake_notebook', JSON.stringify(stored.filter((id) => id !== qid)));
  };

  const filteredMistakes = mistakes.filter((m) => {
    if (selectedErrorFilter === 'all') return true;
    return m.errorType === selectedErrorFilter;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold mb-2">
              <FileText className="h-3.5 w-3.5" />
              <span>Evidence-Based Mistake Notebook</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Personalized Error Journal & Retake Drill
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 bangla-font mt-1">
              ভুল হওয়া প্রশ্নগুলো সংরক্ষণ করুন, কারণ চিহ্নিত করুন এবং স্পেসড রিভিশনের মাধ্যমে দুর্বলতা দূর করুন।
            </p>
          </div>

          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Error Questions</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Mistakes' },
            { id: 'knowledge_gap', label: 'Knowledge Gap' },
            { id: 'retention_problem', label: 'Retention Problem' },
            { id: 'careless_error', label: 'Careless Error' },
            { id: 'time_pressure', label: 'Time Pressure' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedErrorFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                selectedErrorFilter === f.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Mistakes List */}
        {filteredMistakes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Mistake Notebook is Clear!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto bangla-font">
              আপনার মক টেস্টে কোনো ভুল হলে তা স্বয়ংক্রিয়ভাবে বা ম্যানুয়ালি এখানে যোগ করতে পারবেন।
            </p>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <span>Take a Mock Test</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMistakes.map((m) => {
              const q = m.question;
              const insight = WeaknessAnalysisEngine.getWeaknessInsight(m.errorType);

              return (
                <div
                  key={m.questionId}
                  className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-all ${
                    m.resolved
                      ? 'border-emerald-500/30 bg-emerald-500/5 opacity-80'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {q.subjectCode}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {q.topicTitleBn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Error Type Selector */}
                      <select
                        value={m.errorType}
                        onChange={(e) => handleUpdateErrorType(m.questionId, e.target.value as WeaknessLabel)}
                        className="text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="knowledge_gap">Knowledge Gap</option>
                        <option value="retention_problem">Retention Problem</option>
                        <option value="careless_error">Careless Error</option>
                        <option value="time_pressure">Time Pressure</option>
                        <option value="guessing_risk">Guessing Risk</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => handleToggleResolve(m.questionId)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                          m.resolved
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{m.resolved ? 'Mastered' : 'Mark Resolved'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(m.questionId)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove from notebook"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed bangla-font">
                      {q.stemBn || q.stemEn}
                    </h3>
                    {q.stemBn && q.stemEn && (
                      <p className="text-xs text-slate-500">{q.stemEn}</p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => {
                      const isCorrect = opt.id === q.correctAnswerId;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                            isCorrect
                              ? 'border-emerald-600 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 font-bold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="font-bold">{opt.id}.</span>
                          <span>{opt.textBn || opt.textEn}</span>
                          {isCorrect && <span className="ml-auto text-[10px] text-emerald-600">✓ Correct</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Candidate Study Note */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Personal Correction Note & Retention Mnemonics:
                    </label>
                    <textarea
                      rows={2}
                      defaultValue={m.candidateNotes}
                      onBlur={(e) => handleUpdateNotes(m.questionId, e.target.value)}
                      placeholder="Add personal notes or mnemonic tricks for remembering this concept..."
                      className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bangla-font"
                    />
                  </div>

                  {/* Verified Explanation */}
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-1">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      Authoritative Explanation:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed bangla-font">
                      {q.explanationBn || q.explanationEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
