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
  ShieldAlert,
  ShieldCheck,
  Check,
  Award,
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

  // Section filter for question palette (pill tabs)
  const [activeSubjectTab, setActiveSubjectTab] = useState<string>('all');

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
      ...responses,
      [currentQ.questionId]: {
        ...prevResponse,
        selectedOptionId: newSelected,
      },
    };

    setResponses(updated);

    // Debounced or direct background autosave
    try {
      await fetch(`/api/test/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.questionId,
          selectedOptionId: newSelected,
          isMarkedForReview: prevResponse.isMarkedForReview,
        }),
      });
    } catch (e) {
      // Local state is preserved even if network hiccups
    }
  };

  // Toggle Flag for Review
  const handleToggleFlag = async () => {
    if (!session || session.status !== 'in_progress') return;

    const currentQ = session.questions[currentIndex];
    const prevResponse = responses[currentQ.questionId] || {
      questionId: currentQ.questionId,
      selectedOptionId: null,
      isMarkedForReview: false,
      timeSpentSeconds: 0,
    };

    const newFlagState = !prevResponse.isMarkedForReview;

    const updated = {
      ...responses,
      [currentQ.questionId]: {
        ...prevResponse,
        isMarkedForReview: newFlagState,
      },
    };

    setResponses(updated);

    try {
      await fetch(`/api/test/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.questionId,
          selectedOptionId: prevResponse.selectedOptionId,
          isMarkedForReview: newFlagState,
        }),
      });
    } catch (e) {}
  };

  // Final Submit
  const handleSubmitTest = async () => {
    if (!session || session.status !== 'in_progress') return;
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
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F5F7FC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-3 border-[#6538F5] border-t-transparent animate-spin" />
          <p className="text-sm font-semibold text-[#66748B] bangla-font">
            পরীক্ষার সেশন ও প্রশ্নসমূহ লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#F5F7FC]">
        <div className="max-w-md w-full bg-white border border-[#E3E8F2] rounded-3xl p-8 text-center space-y-5 shadow-sm">
          <div className="h-12 w-12 rounded-2xl bg-[#FEF0F0] text-[#DC2626] flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-[#17233F]">Exam Session Error</h2>
          <p className="text-xs text-[#66748B]">{error || 'Session not available'}</p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6538F5] text-white text-xs font-bold shadow-sm"
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

  // Distinct subjects in this session for pill navigation tabs
  const distinctSubjects = Array.from(new Set(session.questions.map((q) => q.subjectCode)));

  // Filtered questions based on pill tab
  const filteredQuestionIndices = session.questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => activeSubjectTab === 'all' || q.subjectCode === activeSubjectTab);

  // =========================================================================
  // VIEW A: LIVE EXAMINATION INTERFACE (Bright Light Theme inspired by Reference)
  // =========================================================================
  if (session.status === 'in_progress') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F7FC] text-[#17233F]">
        {/* Top Control Bar Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-[#E3E8F2] px-4 sm:px-6 py-3.5 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Title & Track Badges */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#F0EBFF] text-[#6538F5] flex items-center justify-center font-bold text-xs border border-purple-200">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#17233F] tracking-tight leading-tight">
                    {session.title}
                  </h2>
                  <div className="flex items-center gap-2 text-[10px] text-[#66748B] mt-0.5">
                    <span className="font-semibold px-1.5 py-0.5 rounded bg-[#EDF3FF] text-[#2563EB]">
                      {session.examTrackId === 'special_bcs_health_51_2026' ? '51st Special Health' : 'General BCS'}
                    </span>
                    <span>&bull;</span>
                    <span>Question {currentIndex + 1} of {session.totalQuestions}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Timer & Submit Action */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {/* Countdown Clock */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs sm:text-sm font-bold border transition-colors ${
                  secondsRemaining < 120
                    ? 'bg-[#FEF0F0] text-[#DC2626] border-red-300 animate-pulse'
                    : 'bg-[#F0EBFF] text-[#6538F5] border-purple-200'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => setIsConfirmSubmitOpen(true)}
                className="px-5 py-2 rounded-full bg-[#6538F5] hover:bg-[#8055F7] text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>

        {/* Section Pill Tabs (Directly inspired by Reference Screenshot's Pill Navigation Bar) */}
        <div className="bg-white border-b border-[#E3E8F2] px-4 sm:px-6 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
            <button
              type="button"
              onClick={() => setActiveSubjectTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeSubjectTab === 'all'
                  ? 'bg-[#6538F5] text-white shadow-xs'
                  : 'text-[#66748B] hover:text-[#17233F] hover:bg-[#F0EBFF]'
              }`}
            >
              All Sections ({session.totalQuestions})
            </button>

            {distinctSubjects.map((subCode) => {
              const count = session.questions.filter((q) => q.subjectCode === subCode).length;
              const subName = SUBJECT_NAME_MAP[subCode]?.bn || subCode;
              const isActive = activeSubjectTab === subCode;

              return (
                <button
                  key={subCode}
                  type="button"
                  onClick={() => setActiveSubjectTab(subCode)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all bangla-font ${
                    isActive
                      ? 'bg-[#6538F5] text-white shadow-xs'
                      : 'text-[#66748B] hover:text-[#17233F] hover:bg-[#F0EBFF]'
                  }`}
                >
                  {subName} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Examination Workspace */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Primary Question Card */}
            <div className="bg-white border border-[#E3E8F2] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Question Header & Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E3E8F2] text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-xl bg-[#6538F5] text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {currentIndex + 1}
                  </span>
                  <span className="font-bold text-[#17233F] bangla-font">
                    {SUBJECT_NAME_MAP[currentQuestion.subjectCode]?.bn || currentQuestion.subjectCode}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#F8FAFF] border border-[#E3E8F2] text-[#66748B] font-mono text-[11px]">
                    +{currentQuestion.marks} / -{currentQuestion.negativePenalty}
                  </span>

                  <button
                    type="button"
                    onClick={handleToggleFlag}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      currentResponse?.isMarkedForReview
                        ? 'bg-[#FFF5E6] text-[#D97706] border-[#D97706]/40'
                        : 'border-[#E3E8F2] text-[#66748B] hover:bg-[#F8FAFF]'
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    <span>{currentResponse?.isMarkedForReview ? 'Flagged' : 'Flag for Review'}</span>
                  </button>
                </div>
              </div>

              {/* Question Stem */}
              <div className="space-y-2.5">
                {currentQuestion.stemBn && (
                  <h2 className="text-lg sm:text-xl font-bold text-[#17233F] leading-relaxed bangla-font">
                    {currentQuestion.stemBn}
                  </h2>
                )}
                {currentQuestion.stemEn && (
                  <p className="text-xs sm:text-sm text-[#66748B] font-medium leading-relaxed">
                    {currentQuestion.stemEn}
                  </p>
                )}
              </div>

              {/* MCQ Options with clear visual state */}
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
                          ? 'border-[#6538F5] bg-[#F0EBFF] shadow-xs'
                          : 'border-[#E3E8F2] hover:border-[#6538F5]/40 hover:bg-[#F8FAFF] bg-white'
                      }`}
                    >
                      <span
                        className={`h-7 w-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#6538F5] text-white shadow-xs'
                            : 'bg-[#F5F7FC] text-[#66748B] border border-[#E3E8F2]'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <div className="flex-1 space-y-0.5">
                        <div className="font-semibold text-sm text-[#17233F] bangla-font">
                          {opt.textBn || opt.textEn}
                        </div>
                        {opt.textBn && opt.textEn && (
                          <div className="text-xs text-[#8792A5]">
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
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#E3E8F2] bg-white text-xs font-bold text-[#66748B] hover:text-[#17233F] hover:bg-[#F8FAFF] disabled:opacity-40 shadow-xs"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Question</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(session.questions.length - 1, prev + 1))}
                disabled={currentIndex === session.questions.length - 1}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#17233F] text-white text-xs font-bold hover:bg-[#11112C] disabled:opacity-40 shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Alert / Notice Card directly matching Reference Screenshot */}
            <div className="bg-[#FFFDF7] border border-[#FDE68A] rounded-2xl p-4 sm:p-5 space-y-3 text-xs shadow-xs">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-[#FFF5E6] text-[#D97706] shrink-0 mt-0.5">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-bold text-[#17233F] text-xs">
                    Examination Integrity & Negative Marking Notice
                  </h4>
                  <p className="text-[#66748B] leading-relaxed text-[11px]">
                    প্রতিটি ভুল উত্তরের জন্য নির্ধারিত -০.৫০ নম্বর কাটা যাবে। উত্তর নিশ্চিত না হলে প্রশ্নটি ফাঁকা রাখুন বা পর্যালোচনার জন্য চিহ্নিত (Flag) করুন। আপনার উত্তর স্বয়ংক্রিয়ভাবে সার্ভারে সংরক্ষিত হচ্ছে।
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/50">
                <button
                  type="button"
                  onClick={() => handleToggleFlag()}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E3E8F2] text-[#66748B] hover:text-[#17233F] font-semibold text-[11px]"
                >
                  Flag for Review
                </button>
                <button
                  type="button"
                  onClick={() => handleAskAITutor(currentQuestion)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#F0EBFF] text-[#6538F5] border border-purple-200 font-bold text-[11px] flex items-center gap-1"
                >
                  <BrainCircuit className="h-3.5 w-3.5" />
                  <span>Ask AI Tutor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Question Navigator Palette (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E3E8F2] rounded-3xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#E3E8F2]">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#17233F]">
                  Question Palette
                </h3>
                <span className="text-[11px] font-bold text-[#6538F5]">
                  {answeredCount}/{session.totalQuestions} Done
                </span>
              </div>

              {/* 5-Column Question Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
                {filteredQuestionIndices.map(({ q, idx }) => {
                  const resp = responses[q.questionId];
                  const isAnswered = !!resp?.selectedOptionId;
                  const isFlagged = !!resp?.isMarkedForReview;
                  const isCurrent = idx === currentIndex;

                  let colorClass = 'bg-[#F5F7FC] text-[#66748B] hover:bg-[#E3E8F2]';
                  if (isAnswered) {
                    colorClass = 'bg-[#059669] text-white font-bold shadow-xs';
                  } else if (isFlagged) {
                    colorClass = 'bg-[#D97706] text-white font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={q.questionId}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 w-full rounded-xl text-xs flex items-center justify-center transition-all ${colorClass} ${
                        isCurrent ? 'ring-2 ring-[#6538F5] ring-offset-2 scale-105 font-black' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="space-y-2 pt-4 border-t border-[#E3E8F2] text-[11px] text-[#66748B]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#059669]" />
                    <span>Answered:</span>
                  </span>
                  <span className="font-bold text-[#17233F]">{answeredCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D97706]" />
                    <span>Flagged for Review:</span>
                  </span>
                  <span className="font-bold text-[#17233F]">{flaggedCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#E3E8F2]" />
                    <span>Unanswered:</span>
                  </span>
                  <span className="font-bold text-[#8792A5]">{unansweredCount}</span>
                </div>
              </div>
            </div>

            {/* Quick Rules Card */}
            <div className="bg-white border border-[#E3E8F2] rounded-3xl p-5 space-y-3 shadow-sm text-xs">
              <span className="font-bold text-xs uppercase tracking-wider text-[#17233F] block">
                Official Exam Rules
              </span>
              <ul className="space-y-1.5 text-[11px] text-[#66748B]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#059669] shrink-0" />
                  <span>Correct Answer: +1.00 Mark</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 text-[#DC2626] shrink-0" />
                  <span>Wrong Answer: -0.50 Negative Mark</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                  <span>Total Duration: {Math.round(session.durationSeconds / 60)} Minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {isConfirmSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white border border-[#E3E8F2] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-center">
              <div className="h-12 w-12 rounded-2xl bg-[#FFF5E6] text-[#D97706] flex items-center justify-center mx-auto">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#17233F]">Confirm Exam Submission</h3>
              <p className="text-xs text-[#66748B] leading-relaxed">
                আপনি {answeredCount}টি প্রশ্নের উত্তর দিয়েছেন এবং {unansweredCount}টি প্রশ্ন অনুত্তরিত রয়েছে। আপনি কি এখনই পরীক্ষা জমা দিতে চান?
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConfirmSubmitOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-full border border-[#E3E8F2] text-xs font-bold text-[#66748B] hover:bg-[#F8FAFF]"
                >
                  Cancel / Return
                </button>
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#6538F5] hover:bg-[#8055F7] text-white text-xs font-bold shadow-md shadow-purple-600/30 disabled:opacity-60"
                >
                  {isSubmitting ? 'Evaluating...' : 'Yes, Submit Test'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: EXAM RESULTS & PERFORMANCE ANALYSIS (Bright Light Theme)
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Result Header Banner */}
      <div className="bg-white border border-[#E3E8F2] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8F2]">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#E8F8F0] text-[#059669] text-xs font-bold">
              Deterministic Server Scoring Snapshot
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233F] mt-2">
              Exam Performance Analysis
            </h1>
            <p className="text-xs text-[#66748B] mt-1">
              Completed on {session.submittedAt ? new Date(session.submittedAt).toLocaleString() : 'Just now'} &bull; {session.title}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E3E8F2] text-xs font-semibold text-[#66748B] hover:text-[#17233F] hover:bg-[#F8FAFF]"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6538F5] hover:bg-[#8055F7] text-white text-xs font-bold shadow-md shadow-purple-600/20"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake / New Test</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Score Metric Cards matching Reference Style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#F0EBFF] border border-purple-200">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6538F5]">
              Final Net Score
            </span>
            <div className="text-3xl font-extrabold text-[#6538F5] mt-1">
              {session.finalScore}
            </div>
            <span className="text-[11px] text-[#66748B]">
              Out of {session.totalQuestions} Marks
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#E8F8F0] border border-emerald-200">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
              Correct (+1.0)
            </span>
            <div className="text-3xl font-extrabold text-[#059669] mt-1">
              {session.correctCount}
            </div>
            <span className="text-[11px] text-[#66748B]">
              +{session.correctCount * 1.0} Marks
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FEF0F0] border border-red-200">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Wrong (-0.50)
            </span>
            <div className="text-3xl font-extrabold text-[#DC2626] mt-1">
              {session.wrongCount}
            </div>
            <span className="text-[11px] text-[#DC2626] font-medium">
              -{(session.wrongCount * 0.5).toFixed(2)} Penalty Marks
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#E3E8F2]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8792A5]">
              Unanswered (0)
            </span>
            <div className="text-3xl font-extrabold text-[#17233F] mt-1">
              {session.unansweredCount}
            </div>
            <span className="text-[11px] text-[#8792A5]">0 Penalty Marks</span>
          </div>
        </div>

        {/* Section-Wise Breakdown (General vs Professional) */}
        {session.sectionBreakdown && (
          <div className="space-y-3 pt-4 border-t border-[#E3E8F2]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#17233F] uppercase tracking-wider flex items-center gap-2">
                <Target className="h-4 w-4 text-[#6538F5]" />
                <span>অংশভিত্তিক ফলাফল (Section-Wise Score Breakdown)</span>
              </h3>
              <span className="text-xs text-[#66748B] bangla-font">
                সাধারণ ও প্রফেশনাল অংশের স্বতন্ত্র ফলাফল
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* General Part */}
              <div className="p-4 rounded-2xl bg-[#EDF3FF] border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2563EB]">
                    সাধারণ অংশ (General Part — 100 Marks)
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#2563EB] text-white font-mono">
                    নেট মার্ক: {session.sectionBreakdown.general.marks.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-[#8792A5] block">মোট প্রশ্ন</span>
                    <span className="font-bold text-[#17233F] font-mono">
                      {session.sectionBreakdown.general.total}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-[#059669] block">সঠিক (+১)</span>
                    <span className="font-bold text-[#059669] font-mono">
                      {session.sectionBreakdown.general.correct}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-[#DC2626] block">ভুল (-০.৫)</span>
                    <span className="font-bold text-[#DC2626] font-mono">
                      {session.sectionBreakdown.general.wrong}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-[#8792A5] block">অনুত্তরিত</span>
                    <span className="font-bold text-[#8792A5] font-mono">
                      {session.sectionBreakdown.general.unanswered}
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Part */}
              <div className="p-4 rounded-2xl bg-[#E8F8F0] border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#059669]">
                    প্রফেশনাল অংশ (Professional Part — 100 Marks)
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#059669] text-white font-mono">
                    নেট মার্ক: {session.sectionBreakdown.professional.marks.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-[#8792A5] block">মোট প্রশ্ন</span>
                    <span className="font-bold text-[#17233F] font-mono">
                      {session.sectionBreakdown.professional.total}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-[#059669] block">সঠিক (+১)</span>
                    <span className="font-bold text-[#059669] font-mono">
                      {session.sectionBreakdown.professional.correct}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-[#DC2626] block">ভুল (-০.৫)</span>
                    <span className="font-bold text-[#DC2626] font-mono">
                      {session.sectionBreakdown.professional.wrong}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-[#8792A5] block">অনুত্তরিত</span>
                    <span className="font-bold text-[#8792A5] font-mono">
                      {session.sectionBreakdown.professional.unanswered}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Question-By-Question Detailed Review */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#17233F] flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#6538F5]" />
          <span>Detailed Question Review & Explanations</span>
        </h2>

        <div className="space-y-4">
          {session.questions.map((q, idx) => {
            const userResp = responses[q.questionId];
            const isCorrect = userResp?.selectedOptionId === q.correctAnswerId;
            const isUnanswered = !userResp?.selectedOptionId;

            let cardBorder = 'border-[#E3E8F2]';
            let badgeBg = 'bg-[#F8FAFF] text-[#8792A5]';
            let badgeText = 'Unanswered';

            if (isCorrect) {
              cardBorder = 'border-emerald-300 bg-white';
              badgeBg = 'bg-[#E8F8F0] text-[#059669]';
              badgeText = 'Correct (+1.0)';
            } else if (!isUnanswered) {
              cardBorder = 'border-rose-300 bg-white';
              badgeBg = 'bg-[#FEF0F0] text-[#DC2626]';
              badgeText = 'Incorrect (-0.50)';
            }

            return (
              <div
                key={q.questionId}
                className={`bg-white border ${cardBorder} rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E3E8F2]">
                  <div className="flex items-center gap-2">
                    <span className="h-7 w-7 rounded-xl bg-[#F0EBFF] text-[#6538F5] font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#17233F] bangla-font">
                      {SUBJECT_NAME_MAP[q.subjectCode]?.bn || q.subjectCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badgeBg}`}>
                      {badgeText}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSaveToMistakeNotebook(q.questionId)}
                      className="px-3 py-1 rounded-full bg-[#F5F7FC] hover:bg-[#F0EBFF] text-xs font-semibold text-[#66748B] hover:text-[#6538F5] transition-colors"
                    >
                      {savedMistakes.has(q.questionId) ? 'Saved in Mistake Notebook' : '+ Save to Mistake Notebook'}
                    </button>
                  </div>
                </div>

                {/* Stem */}
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#17233F] bangla-font">
                    {q.stemBn || q.stemEn}
                  </h3>
                  {q.stemBn && q.stemEn && (
                    <p className="text-xs text-[#8792A5]">{q.stemEn}</p>
                  )}
                </div>

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt) => {
                    const isUserPick = userResp?.selectedOptionId === opt.id;
                    const isOfficialCorrect = q.correctAnswerId === opt.id;

                    let optStyle = 'border-[#E3E8F2] bg-[#F8FAFF] text-[#17233F]';
                    if (isOfficialCorrect) {
                      optStyle = 'border-emerald-500 bg-[#E8F8F0] text-[#059669] font-bold';
                    } else if (isUserPick && !isOfficialCorrect) {
                      optStyle = 'border-rose-500 bg-[#FEF0F0] text-[#DC2626]';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3.5 rounded-2xl border flex items-start gap-3 ${optStyle}`}
                      >
                        <span className="font-mono font-bold text-xs">{opt.id}.</span>
                        <div className="flex-1 text-xs bangla-font">
                          {opt.textBn || opt.textEn}
                        </div>
                        {isOfficialCorrect && <Check className="h-4 w-4 text-[#059669] shrink-0 mt-0.5" />}
                        {isUserPick && !isOfficialCorrect && <XCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" />}
                      </div>
                    );
                  })}
                </div>

                {/* Verified Citation & Explanation */}
                <div className="p-4 rounded-2xl bg-[#F0EBFF]/60 border border-purple-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#6538F5] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Verified Citation & Explanation:</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAskAITutor(q)}
                      className="text-[11px] font-bold text-[#6538F5] hover:underline flex items-center gap-1"
                    >
                      <BrainCircuit className="h-3 w-3" />
                      <span>Deep AI Analysis</span>
                    </button>
                  </div>
                  <p className="text-[#17233F] bangla-font leading-relaxed">
                    {q.explanationBn || 'সঠিক উত্তর যাচাইকৃত।' }
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tutor Modal */}
      {aiModalQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#E3E8F2] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8F2]">
              <span className="font-bold text-sm text-[#17233F] flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-[#6538F5]" />
                <span>BCS AI Tutor Explanation</span>
              </span>
              <button
                type="button"
                onClick={() => setAiModalQuestion(null)}
                className="text-xs text-[#8792A5] hover:text-[#17233F]"
              >
                Close
              </button>
            </div>

            {aiLoading ? (
              <div className="py-8 text-center space-y-2">
                <div className="h-8 w-8 rounded-full border-2 border-[#6538F5] border-t-transparent animate-spin mx-auto" />
                <p className="text-xs text-[#66748B]">BPSC সিলেবাস অনুযায়ী ব্যাখ্যা প্রস্তুত হচ্ছে...</p>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed bangla-font">
                <p className="text-[#17233F] bg-[#F8FAFF] p-4 rounded-2xl border border-[#E3E8F2]">
                  {aiExplanation?.explanationText}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
