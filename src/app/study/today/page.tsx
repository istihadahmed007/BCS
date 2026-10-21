'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  HelpCircle,
  Layers,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  XCircle,
} from 'lucide-react';
import {
  DailyPracticeMode,
  DailyPracticeQuestion,
  DailyPracticeSet,
  ExamTrackId,
  ProfessionalStreamId,
} from '@/types';
import { SPECIAL_BCS_HEALTH_SUBJECTS } from '@/data/exam-configs';

export default function DailyStudyPage() {
  // Session Configuration State
  const [examTrack, setExamTrack] = useState<ExamTrackId>('special_bcs_health_51_2026');
  const [professionalStream, setProfessionalStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [practiceMode, setPracticeMode] = useState<DailyPracticeMode>('mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Active Session State
  const [activeSet, setActiveSet] = useState<DailyPracticeSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    isCorrect: boolean;
    correctAnswerId: 'A' | 'B' | 'C' | 'D';
    explanationBn: string;
    explanationEn: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Timer state for current session
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && activeSet && activeSet.status === 'in_progress') {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, activeSet]);

  const handleStartPractice = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/practice/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'student_current',
          examTrackId: examTrack,
          professionalStream,
          practiceMode,
          questionCount,
          subjectCode: selectedSubject !== 'all' ? selectedSubject : undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to initialize daily session');
      }

      const newSet: DailyPracticeSet = json.data;
      if (!newSet.questions || newSet.questions.length === 0) {
        throw new Error('No eligible questions found in verified database for this configuration.');
      }

      setActiveSet(newSet);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setSubmissionFeedback(null);
      setSecondsElapsed(0);
      setIsTimerRunning(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error generating daily session');
    } finally {
      setIsLoading(false);
    }
  };

  const currentQ: DailyPracticeQuestion | undefined = activeSet?.questions[currentIndex];

  const handleSubmitAnswer = async () => {
    if (!activeSet || !currentQ || !selectedOption || isAnswerSubmitted) return;

    try {
      const res = await fetch(`/api/practice/${activeSet.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_answer',
          questionId: currentQ.question.id,
          selectedOptionId: selectedOption,
          timeSpentSeconds: 15,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setIsAnswerSubmitted(true);
        setSubmissionFeedback({
          isCorrect: json.data.isCorrect,
          correctAnswerId: json.data.correctAnswerId,
          explanationBn: json.data.explanationBn,
          explanationEn: json.data.explanationEn,
        });
        setActiveSet(json.data.practiceSet);
      }
    } catch (err: unknown) {
      console.error('Answer submission failed', err);
    }
  };

  const handleToggleBookmark = async () => {
    if (!activeSet || !currentQ) return;
    try {
      const res = await fetch(`/api/practice/${activeSet.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_bookmark',
          questionId: currentQ.question.id,
        }),
      });
      const json = await res.json();
      if (json.success) {
        currentQ.isBookmarked = json.data.isBookmarked;
        setActiveSet({ ...activeSet });
      }
    } catch (err: unknown) {
      console.error('Bookmark toggle failed', err);
    }
  };

  const handleNextQuestion = () => {
    if (!activeSet) return;
    if (currentIndex < activeSet.questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const nextQ = activeSet.questions[nextIdx];
      setSelectedOption(nextQ.userSelectedOption || null);
      setIsAnswerSubmitted(nextQ.userSelectedOption !== null && nextQ.userSelectedOption !== undefined);
      if (nextQ.userSelectedOption) {
        setSubmissionFeedback({
          isCorrect: nextQ.isCorrect ?? false,
          correctAnswerId: nextQ.question.correctAnswerId,
          explanationBn: nextQ.question.explanationBn,
          explanationEn: nextQ.question.explanationEn,
        });
      } else {
        setSubmissionFeedback(null);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (!activeSet || currentIndex === 0) return;
    const prevIdx = currentIndex - 1;
    setCurrentIndex(prevIdx);
    const prevQ = activeSet.questions[prevIdx];
    setSelectedOption(prevQ.userSelectedOption || null);
    setIsAnswerSubmitted(prevQ.userSelectedOption !== null && prevQ.userSelectedOption !== undefined);
    if (prevQ.userSelectedOption) {
      setSubmissionFeedback({
        isCorrect: prevQ.isCorrect ?? false,
        correctAnswerId: prevQ.question.correctAnswerId,
        explanationBn: prevQ.question.explanationBn,
        explanationEn: prevQ.question.explanationEn,
      });
    } else {
      setSubmissionFeedback(null);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // =========================================================================
  // RENDER: SESSION COMPLETED SUMMARY
  // =========================================================================
  if (activeSet && activeSet.status === 'completed') {
    const totalQ = activeSet.questionCount;
    const correct = activeSet.correctCount;
    const wrong = activeSet.wrongCount;
    const accuracy = activeSet.accuracyPct;
    // Special BCS Health calculation: 1.0 mark per correct, -0.50 penalty per wrong
    const netScore = examTrack === 'special_bcs_health_51_2026'
      ? Math.max(0, correct * 1.0 - wrong * 0.50)
      : Math.max(0, correct * 1.0 - wrong * 0.50);

    const wrongQuestions = activeSet.questions.filter((q) => q.isCorrect === false);

    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-8 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Award className="h-4 w-4 text-amber-300" />
              <span>Daily Practice Set Completed</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">অভিনন্দন! আজকের অনুশীলন সমাপ্ত</h1>
            <p className="mt-2 text-sm text-emerald-100 max-w-xl mx-auto bangla-font">
              আপনার ফলাফল স্বয়ংক্রিয়ভাবে দুর্বলতা বিশ্লেষণ অ্যালগরিদম ও মিস্টেক নোটবুকে সংরক্ষণ করা হয়েছে।
            </p>
          </div>

          {/* Key Metrics */}
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400">Total Questions</span>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{totalQ}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400">Correct (+1.0)</span>
                <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{correct}</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
                <span className="text-xs uppercase font-bold text-rose-700 dark:text-rose-400">Incorrect (-0.50)</span>
                <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{wrong}</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-center">
                <span className="text-xs uppercase font-bold text-sky-700 dark:text-sky-400">Net Marks</span>
                <p className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                  {netScore.toFixed(2)}
                  <span className="text-xs text-slate-500 font-normal"> / {totalQ}</span>
                </p>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-amber-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">Accuracy & Time Performance</h3>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Total Time: {formatTimer(secondsElapsed)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span>Accuracy Rate</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mistake Notebook Sync Status */}
            {wrongQuestions.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                    <BookMarked className="h-5 w-5" />
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      ভুল হওয়া প্রশ্ন ({wrongQuestions.length}) — মিস্টেক নোটবুকে যুক্ত হয়েছে
                    </h3>
                  </div>
                  <Link
                    href="/mistake-notebook"
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Mistake Notebook</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {wrongQuestions.map((wq, i) => (
                    <div
                      key={wq.id}
                      className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-rose-700 dark:text-rose-400">
                          #{i + 1} • {wq.question.subjectCode.toUpperCase()}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Correct: ({wq.question.correctAnswerId})
                        </span>
                      </div>
                      <p className="mt-1 font-medium text-slate-900 dark:text-slate-100 bangla-font">
                        {wq.question.stemBn}
                      </p>
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-rose-100 dark:border-rose-950 bangla-font">
                        <strong className="text-emerald-700 dark:text-emerald-400">ব্যাখ্যা:</strong> {wq.question.explanationBn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setActiveSet(null);
                  setCurrentIndex(0);
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>নতুন অনুশীলন শুরু করুন</span>
              </button>

              <Link
                href="/dashboard"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                <span>ড্যাশবোর্ডে ফিরে যান</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: ACTIVE QUESTION SOLVING SESSION
  // =========================================================================
  if (activeSet && currentQ) {
    const qData = currentQ.question;
    const isSpecialHealth = activeSet.examTrackId === 'special_bcs_health_51_2026';

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Session Top Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Question {currentIndex + 1} of {activeSet.questionCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Completed: {activeSet.completedCount} / {activeSet.questionCount}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-300">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>

            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                currentQ.isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bookmark Question"
            >
              <BookMarked className="h-4 w-4" />
              <span className="hidden sm:inline">
                {currentQ.isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </span>
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {qData.subjectCode}
            </span>

            {/* Traceable Source Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>{qData.sourceCitation || 'BPSC Verified Source'}</span>
              {qData.examinationYear && <span>({qData.examinationYear})</span>}
            </div>

            {/* Content Origin Pill */}
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                qData.contentOrigin === 'official_bpsc'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                  : 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
              }`}
            >
              {qData.contentOrigin === 'official_bpsc'
                ? 'Official Past Question'
                : 'Expert-Reviewed Practice'}
            </span>

            {isSpecialHealth && (
              <span className="text-[11px] text-rose-600 dark:text-rose-400 font-mono ml-auto">
                Wrong: -0.50 Mark
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed bangla-font">
              {qData.stemBn}
            </h2>
            {qData.stemEn && qData.stemEn !== qData.stemBn && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium italic">
                {qData.stemEn}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {qData.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isSubmitted = isAnswerSubmitted;
              const isCorrectAnswer = opt.id === qData.correctAnswerId;

              let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-900';

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/20';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/20';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-800 opacity-60 bg-white dark:bg-slate-900';
                }
              } else if (isSelected) {
                optionStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-white font-medium ring-2 ring-emerald-600/20';
              }

              return (
                <button
                  key={opt.id}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(opt.id as 'A' | 'B' | 'C' | 'D')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${optionStyle}`}
                >
                  <span
                    className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSubmitted && isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : isSubmitted && isSelected && !isCorrectAnswer
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <div className="flex-1">
                    <span className="text-base text-slate-900 dark:text-slate-100 bangla-font leading-relaxed">
                      {opt.textBn}
                    </span>
                    {opt.textEn && opt.textEn !== opt.textBn && (
                      <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {opt.textEn}
                      </span>
                    )}
                  </div>

                  {isSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-1" />
                  )}
                  {isSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submission and Feedback Area */}
          {!isAnswerSubmitted ? (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500">
                {selectedOption ? 'অপশন নির্বাচন করা হয়েছে' : 'একটি অপশন নির্বাচন করুন'}
              </div>
              <button
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
              >
                উত্তর জমা দিন
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              {/* Feedback Alert */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  submissionFeedback?.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
                }`}
              >
                {submissionFeedback?.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm">
                    {submissionFeedback?.isCorrect
                      ? 'সঠিক উত্তর! (+১.০ নম্বর)'
                      : `ভুল উত্তর! সঠিক উত্তর: (${submissionFeedback?.correctAnswerId}) ${isSpecialHealth ? '[-০.৫০ নম্বর পেনাল্টি]' : ''}`}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed bangla-font">
                    {submissionFeedback?.explanationBn}
                  </p>
                  {submissionFeedback?.explanationEn && (
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 italic">
                      {submissionFeedback.explanationEn}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  disabled={currentIndex === 0}
                  onClick={handlePreviousQuestion}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentIndex === activeSet.questions.length - 1 ? (
                    <button
                      onClick={() => {
                        // Mark as completed
                        activeSet.status = 'completed';
                        setActiveSet({ ...activeSet });
                      }}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                    >
                      অনুশীলন সমাপ্ত করুন (Complete)
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <span>পরবর্তী প্রশ্ন (Next)</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: LAUNCH & CONFIGURATION DASHBOARD
  // =========================================================================
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Banner */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
          <Calendar className="h-4 w-4" />
          <span>Daily Source-Backed Practice Queue</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          দৈনিক বিসিএস প্রশ্ন ব্যাংক ও অনুশীলন
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed bangla-font">
          বিপিএসসি-র অফিশিয়াল সিলেবাস ও যাচাইকৃত পূর্ববর্তী বছরের প্রশ্নপত্রের উপর ভিত্তি করে তৈরি ব্যক্তিগতকৃত দৈনিক প্রশ্ন সেট। প্রতিটি প্রশ্নের রয়েছে নির্ভুল সোর্স রেফারেন্স ও বিশদ ব্যাখ্যা।
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Configuration Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Examination Track & Stream */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-600" />
              <span>১. পরীক্ষার ট্র্যাক ও ক্যাডার নির্বাচন করুন</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setExamTrack('special_bcs_health_51_2026')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  examTrack === 'special_bcs_health_51_2026'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-600/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    ৫১তম বিশেষ বিসিএস (স্বাস্থ্য)
                  </span>
                  <Stethoscope className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500">
                  ২০০ নম্বর | ২০০ প্রশ্ন | ১২০ মিনিট | নেগেটিভ মার্কিং -০.৫০
                </p>
              </button>

              <button
                type="button"
                onClick={() => setExamTrack('general_bcs')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  examTrack === 'general_bcs'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-600/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    সাধারণ বিসিএস প্রিলিমিনারি
                  </span>
                  <BookOpen className="h-4 w-4 text-sky-600" />
                </div>
                <p className="text-xs text-slate-500">
                  সাধারণ ১০টি বিষয় | ২০০ নম্বর | ২০০ প্রশ্ন | ১২০ মিনিট
                </p>
              </button>
            </div>

            {/* Stream Selector for Special BCS */}
            {examTrack === 'special_bcs_health_51_2026' && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  পেশাগত বিষয় (Professional Science Stream):
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProfessionalStream('assistant_surgeon')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      professionalStream === 'assistant_surgeon'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    সহকারী সার্জন (MBBS)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfessionalStream('assistant_dental_surgeon')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      professionalStream === 'assistant_dental_surgeon'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    সহকারী ডেন্টাল সার্জন (BDS)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Practice Mode */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-600" />
              <span>২. অনুশীলনের ধরণ (Practice Mode)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'mixed',
                  title: 'দৈনিক মিক্সড প্র্যাকটিস (Recommended)',
                  desc: '৪০% রিভিশন + ৩০% দুর্বল টপিক + ২০% বিগত প্রশ্ন + ১০% নতুন টপিক',
                  recommended: true,
                },
                {
                  id: 'past_papers',
                  title: 'বিগত বিসিএস প্রশ্নপত্র',
                  desc: 'বিপিএসসি কর্তৃক গৃহীত বাস্তব পূর্ববর্তী পরীক্ষার প্রশ্নাবলি',
                },
                {
                  id: 'subject_wise',
                  title: 'বিষয়ভিত্তিক অনুশীলন',
                  desc: 'সিলেবাসের নির্দিষ্ট যেকোনো একটি বিষয়ের উপর পূর্ণ প্রস্তুতি',
                },
                {
                  id: 'mistake_notebook',
                  title: 'মিস্টেক নোটবুক ড্রিল',
                  desc: 'পূর্বে ভুল হওয়া প্রশ্নাবলির তাৎক্ষণিক নিয়মিত রিভিশন',
                },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPracticeMode(m.id as DailyPracticeMode)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    practiceMode === m.id
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {m.recommended && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                      AI Mix
                    </span>
                  )}
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white bangla-font">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 bangla-font leading-relaxed">
                    {m.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Subject Selector for Subject-Wise */}
            {practiceMode === 'subject_wise' && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  বিষয় নির্বাচন করুন:
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="all">সকল বিষয় (All Subjects)</option>
                  {SPECIAL_BCS_HEALTH_SUBJECTS.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.nameBn} ({s.marks} Marks)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Step 3: Question Count */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-600" />
              <span>৩. প্রশ্নের সংখ্যা নির্বাচন করুন</span>
            </h3>

            <div className="grid grid-cols-4 gap-3">
              {[10, 20, 30, 50].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`py-3 rounded-2xl border text-center transition-all ${
                    questionCount === count
                      ? 'border-emerald-600 bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-lg block">{count}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                    Questions
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Strategy & Launch */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-emerald-800">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Deterministic Queue Engine</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2">
                বৈজ্ঞানিক অনুশীলন অ্যালগরিদম
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed bangla-font mb-4">
                দৈনিক মিক্সড সেশনে প্রশ্নের অনুপাত স্বয়ংক্রিয়ভাবে বিপিএসসি সিলেবাস ও স্পেসড রিপিটেশন নিয়ম মেনে নির্ধারণ করা হয়:
              </p>

              <div className="space-y-2 text-xs font-medium mb-6">
                <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-xl">
                  <span>স্পেসড রিভিশন (Due Revision)</span>
                  <span className="font-bold text-amber-300">৪০%</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-xl">
                  <span>দুর্বল টপিক রিইনফোর্সমেন্ট</span>
                  <span className="font-bold text-rose-300">৩০%</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-xl">
                  <span>যাচাইকৃত বিগত বছরের প্রশ্ন</span>
                  <span className="font-bold text-sky-300">২০%</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-xl">
                  <span>নতুন ও অপ্রস্তুত সিলেবাস টপিক</span>
                  <span className="font-bold text-emerald-300">১০%</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={handleStartPractice}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-emerald-700" />
                    <span>জেনারেট হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>আজকের প্র্যাকটিস শুরু করুন</span>
                    <ArrowRight className="h-4 w-4 text-emerald-700" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Source Traceability Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>১০০% সোর্স-ব্যাকড নিশ্চিতকরণ</span>
            </div>
            <p className="leading-relaxed bangla-font mb-3">
              প্রতিটি প্রশ্ন বিপিএসসি-র অফিশিয়াল গেজেট, বিগত পরীক্ষার প্রশ্নপত্র বা অনুমোদিত রেফারেন্স বইয়ের সূচিপত্রের সাথে ট্যাগ করা।
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/admin/sources"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>সোর্স রেজিস্ট্রি দেখুন</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Link
                href="/mistake-notebook"
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                মিস্টেক নোটবুক
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
