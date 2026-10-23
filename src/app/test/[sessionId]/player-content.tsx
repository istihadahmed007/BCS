'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Flag,
  HelpCircle,
  Home,
  MessageSquare,
  Plus,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react';
import { CandidateResponse, TestSession, TestSessionQuestion } from '@/types';

const SUBJECT_NAME_MAP: Record<string, { bn: string; en: string }> = {
  BANGLA: { bn: 'বাংলা ভাষা ও সাহিত্য', en: 'Bangla Language & Literature' },
  ENGLISH: { bn: 'ইংরেজি ভাষা ও সাহিত্য', en: 'English Language & Literature' },
  BD_AFFAIRS: { bn: 'বাংলাদেশ বিষয়াবলী', en: 'Bangladesh Affairs' },
  INT_AFFAIRS: { bn: 'আন্তর্জাতিক বিষয়াবলী', en: 'International Affairs' },
  MATH: { bn: 'গাণিতিক যুক্তি', en: 'Mathematical Reasoning' },
  MENTAL_ABILITY: { bn: 'মানসিক দক্ষতা', en: 'Mental Ability' },
  G_SCIENCE: { bn: 'সাধারণ বিজ্ঞান', en: 'General Science' },
  G_COMPUTER: { bn: 'কম্পিউটার ও তথ্যপ্রযুক্তি', en: 'Computer & IT' },
  G_GEOGRAPHY: { bn: 'ভূগোল ও পরিবেশ', en: 'Geography & Environment' },
  G_ETHICS: { bn: 'নৈতিকতা ও সুশাসন', en: 'Ethics & Good Governance' },
  MED_SCI_1: { bn: 'মেডিক্যাল সায়েন্স ১ম পত্র (Basic Medical Science)', en: 'Medical Science Part I' },
  MED_SCI_2: { bn: 'মেডিক্যাল সায়েন্স ২য় পত্র (Clinical Medical Science)', en: 'Medical Science Part II' },
  DENTAL_SCI_1: { bn: 'ডেন্টাল সায়েন্স ১ম পত্র (Basic Dental Science)', en: 'Dental Science Part I' },
  DENTAL_SCI_2: { bn: 'ডেন্টাল সায়েন্স ২য় পত্র (Clinical Dental Science)', en: 'Dental Science Part II' },
};

export default function TestPlayerContent({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);

  const [session, setSession] = useState<TestSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Local response state
  const [responses, setResponses] = useState<Record<string, CandidateResponse>>({});

  // Countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  // Submission state
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI Tutor explanation modal state
  const [aiModalQuestion, setAiModalQuestion] = useState<TestSessionQuestion | null>(null);
  const [aiExplanation, setAiExplanation] = useState<any | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Mistake Notebook save feedback
  const [savedMistakes, setSavedMistakes] = useState<Set<string>>(new Set());

  // Fetch session on load
  useEffect(() => {
    async function loadSession() {
      try {
        const res = await fetch(`/api/test/${sessionId}`);
        const json = await res.json();
        if (!json.success || !json.data) {
          setError(json.error || 'Failed to load test session');
          setLoading(false);
          return;
        }

        const data: TestSession = json.data;
        setSession(data);
        setResponses(data.responses || {});

        if (data.status === 'in_progress') {
          const expiryTime = new Date(data.expiresAt).getTime();
          const now = Date.now();
          const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
          setSecondsRemaining(diff);
        }

        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }
    loadSession();
  }, [sessionId]);

  // Countdown ticker
  useEffect(() => {
    if (!session || session.status !== 'in_progress' || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest(); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [session, secondsRemaining]);

  // Select Option & Autosave
  const handleSelectOption = async (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (!session || session.status !== 'in_progress') return;

    const currentQ = session.questions[currentIndex];
    const prevResponse = responses[currentQ.questionId] || {
      questionId: currentQ.questionId,
      selectedOptionId: null,
      isMarkedForReview: false,
      timeSpentSeconds: 0,
    };

    const newSelected = prevResponse.selectedOptionId === optionId ? null : optionId; // Toggle off if clicked again

    const updated = {
      ...prevResponse,
      selectedOptionId: newSelected,
    };

    setResponses((prev) => ({
      ...prev,
      [currentQ.questionId]: updated,
    }));

    // Autosave to server
    fetch(`/api/test/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: currentQ.questionId,
        selectedOptionId: newSelected,
        isMarkedForReview: updated.isMarkedForReview,
      }),
    }).catch(() => {});
  };

  // Toggle Flag for Review
  const handleToggleFlag = () => {
    if (!session || session.status !== 'in_progress') return;

    const currentQ = session.questions[currentIndex];
    const prevResponse = responses[currentQ.questionId] || {
      questionId: currentQ.questionId,
      selectedOptionId: null,
      isMarkedForReview: false,
      timeSpentSeconds: 0,
    };

    const updated = {
      ...prevResponse,
      isMarkedForReview: !prevResponse.isMarkedForReview,
    };

    setResponses((prev) => ({
      ...prev,
      [currentQ.questionId]: updated,
    }));

    fetch(`/api/test/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: currentQ.questionId,
        selectedOptionId: updated.selectedOptionId,
        isMarkedForReview: updated.isMarkedForReview,
      }),
    }).catch(() => {});
  };

  // Submit test
  const handleSubmitTest = async () => {
    if (!session || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const idempotencyKey = `sub-${sessionId}-${Date.now()}`;
      const res = await fetch(`/api/test/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responses,
          idempotencyKey,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setSession(json.data);
        setIsConfirmSubmitOpen(false);
      } else {
        alert(json.error || 'Submission failed');
      }
    } catch (e: any) {
      alert('Error during submission: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger AI Tutor Explanation
  const handleAskAITutor = async (q: TestSessionQuestion) => {
    setAiModalQuestion(q);
    setAiLoading(true);
    setAiExplanation(null);

    try {
      const resp = responses[q.questionId];
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.questionId,
          userSelectedOptionId: resp?.selectedOptionId || null,
          language: 'bn',
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAiExplanation(json.data);
      } else {
        setAiExplanation({
          explanationText: 'AI tutor service temporarily unavailable.',
          citedSources: [],
          isEvidenceCertain: false,
        });
      }
    } catch (e: any) {
      setAiExplanation({
        explanationText: 'Error fetching AI explanation: ' + e.message,
        citedSources: [],
        isEvidenceCertain: false,
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Save to Mistake Notebook
  const handleSaveToMistakeNotebook = (questionId: string) => {
    // Record in local storage and set state
    const existing = JSON.parse(localStorage.getItem('bcs_mistake_notebook') || '[]');
    if (!existing.includes(questionId)) {
      existing.push(questionId);
      localStorage.setItem('bcs_mistake_notebook', JSON.stringify(existing));
    }
    setSavedMistakes((prev) => new Set(prev).add(questionId));
  };

  // Format timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 text-emerald-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 bangla-font">
            পরীক্ষার সেশন ও প্রশ্নসমূহ লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Exam Session Error</h2>
          <p className="text-xs text-slate-500">{error || 'Session not available'}</p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Test Center</span>
          </Link>
        </div>
      </div>
    );
  }

  // Active question
  const currentQuestion = session.questions[currentIndex];
  const currentResponse = responses[currentQuestion.questionId];

  // Answered counts
  const answeredCount = Object.values(responses).filter((r) => r.selectedOptionId).length;
  const flaggedCount = Object.values(responses).filter((r) => r.isMarkedForReview).length;
  const unansweredCount = session.totalQuestions - answeredCount;

  // =========================================================================
  // VIEW A: TEST IN PROGRESS (Live exam taking)
  // =========================================================================
  if (session.status === 'in_progress') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                {session.title}
              </span>
              <span className="hidden sm:inline text-xs text-slate-400">
                Question {currentIndex + 1} of {session.totalQuestions}
              </span>
            </div>

            {/* Countdown Clock */}
            <div
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono text-sm font-bold border transition-colors ${
                secondsRemaining < 120
                  ? 'bg-rose-500/10 text-rose-600 border-rose-500/30 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={() => setIsConfirmSubmitOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all hover:scale-105"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Exam Body */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Question Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Question Header & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center">
                    {currentIndex + 1}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {SUBJECT_NAME_MAP[currentQuestion.subjectCode]?.bn || currentQuestion.subjectCode}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                    Correct: +{currentQuestion.marks} | Wrong: -{currentQuestion.negativePenalty}
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleFlag}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border font-medium transition-colors ${
                      currentResponse?.isMarkedForReview
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    <span>{currentResponse?.isMarkedForReview ? 'Flagged' : 'Flag for Review'}</span>
                  </button>
                </div>
              </div>

              {/* Question Stem (Bilingual) */}
              <div className="space-y-3">
                {currentQuestion.stemBn && (
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed bangla-font">
                    {currentQuestion.stemBn}
                  </h2>
                )}
                {currentQuestion.stemEn && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {currentQuestion.stemEn}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentResponse?.selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-500/10 dark:bg-emerald-950/30 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <span
                        className={`h-7 w-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <div className="flex-1 space-y-0.5">
                        <div className="font-semibold text-sm text-slate-900 dark:text-white bangla-font">
                          {opt.textBn || opt.textEn}
                        </div>
                        {opt.textBn && opt.textEn && (
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {opt.textEn}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Question</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(session.questions.length - 1, prev + 1))}
                disabled={currentIndex === session.questions.length - 1}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 disabled:opacity-40"
              >
                <span>Next Question</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Question Palette */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Question Navigator
              </h3>

              <div className="grid grid-cols-5 gap-2">
                {session.questions.map((q, idx) => {
                  const resp = responses[q.questionId];
                  const isAnswered = !!resp?.selectedOptionId;
                  const isFlagged = !!resp?.isMarkedForReview;
                  const isCurrent = idx === currentIndex;

                  let colorClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                  if (isAnswered) {
                    colorClass = 'bg-emerald-600 text-white font-bold';
                  } else if (isFlagged) {
                    colorClass = 'bg-amber-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.questionId}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 w-full rounded-xl text-xs flex items-center justify-center transition-all ${colorClass} ${
                        isCurrent ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    <span>Answered:</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{answeredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span>Flagged for Review:</span>
                  </span>
                  <span className="font-bold text-amber-600">{flaggedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span>Unanswered:</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{unansweredCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {isConfirmSubmitOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
              <div className="text-center space-y-2">
                <HelpCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Confirm Test Submission?
                </h3>
                <p className="text-xs text-slate-500 bangla-font">
                  পরীক্ষা সমাপ্ত করলে সার্ভারে আপনার স্কোর ও নেগেটিভ মার্কিং হিসাব করে চূড়ান্ত ফলাফল প্রদর্শিত হবে।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Answered Questions:</span>
                  <span className="font-bold text-emerald-600">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flagged Questions:</span>
                  <span className="font-bold text-amber-600">{flaggedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unanswered Questions:</span>
                  <span className="font-bold text-rose-500">{unansweredCount}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsConfirmSubmitOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                >
                  Continue Test
                </button>
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Evaluating...' : 'Yes, Submit Now'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: POST-SUBMISSION RESULTS & FULL ANALYSIS
  // =========================================================================
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Result Header Banner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                Deterministic Server Scoring Snapshot
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                Exam Performance Analysis
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Completed on {session.submittedAt ? new Date(session.submittedAt).toLocaleString() : 'Just now'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/test"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake / New Test</span>
              </Link>
            </div>
          </div>

          {/* Core Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Final Net Score
              </span>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                {session.finalScore}
              </div>
              <span className="text-[11px] text-slate-500">
                Out of {session.totalQuestions} Marks
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Correct (+1.0)
              </span>
              <div className="text-3xl font-extrabold text-sky-600 mt-1">
                {session.correctCount}
              </div>
              <span className="text-[11px] text-slate-500">
                +{session.correctCount * 1.0} Marks
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Wrong (-0.50)
              </span>
              <div className="text-3xl font-extrabold text-rose-600 mt-1">
                {session.wrongCount}
              </div>
              <span className="text-[11px] text-rose-500 font-medium">
                -{(session.wrongCount * 0.5).toFixed(2)} Penalty Marks
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Unanswered (0)
              </span>
              <div className="text-3xl font-extrabold text-slate-700 dark:text-slate-300 mt-1">
                {session.unansweredCount}
              </div>
              <span className="text-[11px] text-slate-500">0 Penalty</span>
            </div>
          </div>

          {/* Section-Wise Breakdown (General vs Professional) */}
          {session.sectionBreakdown && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-600" />
                  <span>অংশভিত্তিক ফলাফল (Section-Wise Score Breakdown)</span>
                </h3>
                <span className="text-xs text-slate-500 bangla-font">
                  সাধারণ ও প্রফেশনাল অংশের স্বতন্ত্র ফলাফল
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* General Part */}
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                      সাধারণ অংশ (General Part — 100 Marks)
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono">
                      নেট মার্ক: {session.sectionBreakdown.general.marks.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <span className="text-[10px] text-slate-400 block">মোট প্রশ্ন</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                        {session.sectionBreakdown.general.total}
                      </span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <span className="text-[10px] text-emerald-600 block">সঠিক (+১)</span>
                      <span className="font-bold text-emerald-600 font-mono">
                        {session.sectionBreakdown.general.correct}
                      </span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <span className="text-[10px] text-rose-500 block">ভুল (-০.৫)</span>
                      <span className="font-bold text-rose-500 font-mono">
                        {session.sectionBreakdown.general.wrong}
                      </span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <span className="text-[10px] text-slate-400 block">অনুত্তরিত</span>
                      <span className="font-bold text-slate-500 font-mono">
                        {session.sectionBreakdown.general.unanswered}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Part */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                      প্রফেশনাল অংশ (Professional Part — 100 Marks)
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono">
                      নেট মার্ক: {session.sectionBreakdown.professional.marks.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                      <span className="text-[10px] text-slate-400 block">মোট প্রশ্ন</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                        {session.sectionBreakdown.professional.total}
                      </span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                      <span className="text-[10px] text-emerald-600 block">সঠিক (+১)</span>
                      <span className="font-bold text-emerald-600 font-mono">
                        {session.sectionBreakdown.professional.correct}
                      </span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                      <span className="text-[10px] text-rose-500 block">ভুল (-০.৫)</span>
                      <span className="font-bold text-rose-500 font-mono">
                        {session.sectionBreakdown.professional.wrong}
                      </span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                      <span className="text-[10px] text-slate-400 block">অনুত্তরিত</span>
                      <span className="font-bold text-slate-500 font-mono">
                        {session.sectionBreakdown.professional.unanswered}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subject Breakdown Table */}
          {session.subjectBreakdown && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                বিষয়ভিত্তিক স্কোর ও বিশ্লেষণ (Subject-Wise Performance Distribution)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-bold">
                    <tr>
                      <th className="py-2.5 px-3 rounded-l-lg">বিষয় (Subject)</th>
                      <th className="py-2.5 px-3">মোট প্রশ্ন</th>
                      <th className="py-2.5 px-3">সঠিক (+১)</th>
                      <th className="py-2.5 px-3">ভুল (-০.৫)</th>
                      <th className="py-2.5 px-3 rounded-r-lg">অর্জিত মার্ক</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {Object.entries(session.subjectBreakdown).map(([code, data]) => {
                      const meta = SUBJECT_NAME_MAP[code];
                      return (
                        <tr key={code} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                          <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                            <span className="block font-bold">{meta?.bn || code}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-normal">
                              {meta?.en || code}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono">{data.total}</td>
                          <td className="py-2.5 px-3 text-emerald-600 font-bold font-mono">{data.correct}</td>
                          <td className="py-2.5 px-3 text-rose-500 font-bold font-mono">{data.wrong}</td>
                          <td className="py-2.5 px-3 font-mono font-bold">
                            {data.marks.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Item-by-Item Question Review */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Item-Level Detailed Review
            </h2>
            <span className="text-xs text-slate-500 bangla-font">
              সঠিক উত্তর, ব্যাখ্যা ও এআই কোচের নির্দেশনা
            </span>
          </div>

          {session.questions.map((q, idx) => {
            const resp = responses[q.questionId];
            const selected = resp?.selectedOptionId;
            const isCorrect = selected === q.correctAnswerId;
            const isUnanswered = !selected;
            const isMistakeSaved = savedMistakes.has(q.questionId);

            return (
              <div
                key={q.questionId}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-all ${
                  isCorrect
                    ? 'border-emerald-500/30'
                    : isUnanswered
                    ? 'border-slate-200 dark:border-slate-800'
                    : 'border-rose-500/30'
                }`}
              >
                {/* Item Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-7 w-7 rounded-lg text-white font-bold flex items-center justify-center ${
                        isCorrect
                          ? 'bg-emerald-600'
                          : isUnanswered
                          ? 'bg-slate-500'
                          : 'bg-rose-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {SUBJECT_NAME_MAP[q.subjectCode]?.bn || q.subjectCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Correct (+{q.marks})</span>
                      </span>
                    ) : isUnanswered ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        <span>Unanswered (0)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Wrong (-{q.negativePenalty})</span>
                      </span>
                    )}

                    {!isCorrect && (
                      <button
                        type="button"
                        onClick={() => handleSaveToMistakeNotebook(q.questionId)}
                        disabled={isMistakeSaved}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                          isMistakeSaved
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isMistakeSaved ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Saved to Notebook</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            <span>Save to Mistake Notebook</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Stems */}
                <div className="space-y-2">
                  {q.stemBn && (
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed bangla-font">
                      {q.stemBn}
                    </h3>
                  )}
                  {q.stemEn && (
                    <p className="text-xs text-slate-500 font-medium">{q.stemEn}</p>
                  )}
                </div>

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    const isTheCorrect = opt.id === q.correctAnswerId;
                    const isTheSelected = selected === opt.id;

                    let optBorder = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
                    if (isTheCorrect) {
                      optBorder = 'border-emerald-600 bg-emerald-500/10 dark:bg-emerald-950/40';
                    } else if (isTheSelected && !isTheCorrect) {
                      optBorder = 'border-rose-500 bg-rose-500/10 dark:bg-rose-950/40';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3.5 rounded-2xl border-2 text-xs flex items-start gap-2.5 ${optBorder}`}
                      >
                        <span
                          className={`h-6 w-6 rounded-lg font-bold flex items-center justify-center shrink-0 ${
                            isTheCorrect
                              ? 'bg-emerald-600 text-white'
                              : isTheSelected
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 dark:text-white bangla-font">
                            {opt.textBn || opt.textEn}
                          </span>
                          {opt.textBn && opt.textEn && (
                            <div className="text-[11px] text-slate-500">{opt.textEn}</div>
                          )}
                          {isTheCorrect && (
                            <span className="block mt-1 font-bold text-[10px] text-emerald-600">
                              ✓ Correct Answer Key
                            </span>
                          )}
                          {isTheSelected && !isTheCorrect && (
                            <span className="block mt-1 font-bold text-[10px] text-rose-500">
                              ✗ Your Selected Option
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Verified Answer Explanation
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAskAITutor(q)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-colors shadow-sm"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Ask AI Study Coach</span>
                    </button>
                  </div>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300 bangla-font">
                    {q.explanationBn || q.explanationEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Tutor Drawer / Modal */}
        {aiModalQuestion && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      AI Study Coach — Grounded Explanation
                    </h3>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      BPSC Official Syllabus Grounded
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAiModalQuestion(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1"
                >
                  Close
                </button>
              </div>

              {aiLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="h-8 w-8 text-emerald-600 animate-spin" />
                  <p className="text-xs text-slate-500 bangla-font">
                    অফিসিয়াল সিলেবাস ও রেফারেন্স থেকে বিশ্লেষণ তৈরি করা হচ্ছে...
                  </p>
                </div>
              ) : aiExplanation ? (
                <div className="space-y-5">
                  <div className="prose dark:prose-invert text-xs leading-relaxed bangla-font whitespace-pre-wrap">
                    {aiExplanation.explanationText}
                  </div>

                  {/* Grounded Citations */}
                  {aiExplanation.citedSources?.length > 0 && (
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                        Verified Source Citations:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {aiExplanation.citedSources.map((c: any, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <div>
                              <span className="font-semibold">{c.title}</span> —{' '}
                              <span className="text-slate-500">{c.reference}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 italic">
                    AI tutor outputs are generated exclusively from verified curriculum excerpts. If you suspect an inaccuracy, you may report it for editorial review.
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
