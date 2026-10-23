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
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  DailyPracticeMode,
  DailyPracticeQuestion,
  DailyPracticeSet,
  ExamTrackId,
  ProfessionalStreamId,
} from '@/types';
import { GENERAL_BCS_SUBJECTS, SPECIAL_BCS_HEALTH_SUBJECTS } from '@/data/exam-configs';
import PremiumLockScreen from '@/components/portal/PremiumLockScreen';

function formatBengaliDate(date: Date = new Date()): string {
  try {
    const monthsBn = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ];
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    const toBnDigits = (n: number) =>
      n.toString().replace(/\d/g, (ch) => '০১২৩৪৫৬৭৮৯'[parseInt(ch, 10)]);

    return `${toBnDigits(d)} ${monthsBn[m]}, ${toBnDigits(y)}`;
  } catch {
    return date.toLocaleDateString();
  }
}

function toBnDigits(num: number | string): string {
  return num.toString().replace(/\d/g, (ch) => '০১২৩৪৫৬৭৮৯'[parseInt(ch, 10)]);
}

export default function DailyStudyPage() {
  // Session Configuration State
  const [examTrack, setExamTrack] = useState<ExamTrackId>('special_bcs_health_51_2026');
  const [professionalStream, setProfessionalStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [practiceMode, setPracticeMode] = useState<DailyPracticeMode>('mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [showAlgorithmExplainer, setShowAlgorithmExplainer] = useState<boolean>(false);

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
  const [lockNotice, setLockNotice] = useState<{ message: string; requiredTier?: any } | null>(null);

  // Timer state for current session
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Load saved enrollment preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bcs_enrollment');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.trackId) setExamTrack(parsed.trackId);
        if (parsed.stream) setProfessionalStream(parsed.stream);
      }
    } catch {}
  }, []);

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
    setLockNotice(null);
    try {
      let activeUid = 'student_current';
      try {
        const savedUser = localStorage.getItem('bcs_active_user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed.id) activeUid = parsed.id;
        }
      } catch (e) {}

      const res = await fetch('/api/practice/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUid,
          examTrackId: examTrack,
          professionalStream: examTrack === 'general_bcs' ? 'general' : professionalStream,
          practiceMode,
          questionCount,
          subjectCode: selectedSubject !== 'all' ? selectedSubject : undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        if (json.code === 'LOCKED_PREMIUM_CONTENT') {
          setLockNotice({
            message: json.error || 'এই কনটেন্টটি প্রিমিয়াম প্যাকেজের অন্তর্ভুক্ত।',
            requiredTier: json.requiredTier || 'standard',
          });
          return;
        }
        throw new Error(json.error || 'Failed to initialize daily session');
      }

      const newSet: DailyPracticeSet = json.data;
      if (!newSet.questions || newSet.questions.length === 0) {
        throw new Error('এই কনফিগারেশনের জন্য কোনো প্রশ্ন পাওয়া যায়নি। অন্য বিষয় বা মোড নির্বাচন করুন।');
      }

      setActiveSet(newSet);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setSubmissionFeedback(null);
      setSecondsElapsed(0);
      setIsTimerRunning(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'অনুশীলন সেশন শুরু করতে সমস্যা হয়েছে।');
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

        // Sync answer into localStorage for real dashboard analytics
        try {
          const savedAnswers = JSON.parse(localStorage.getItem('bcs_user_answers') || '[]');
          savedAnswers.push({
            questionId: currentQ.question.id,
            subjectCode: currentQ.question.subjectCode,
            topicId: currentQ.question.topicId,
            isCorrect: json.data.isCorrect,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('bcs_user_answers', JSON.stringify(savedAnswers));

          if (!json.data.isCorrect) {
            const mistakes = JSON.parse(localStorage.getItem('bcs_mistake_notebook') || '[]');
            if (!mistakes.some((m: any) => m.questionId === currentQ.question.id)) {
              mistakes.unshift({
                id: `mistake-${Date.now()}`,
                questionId: currentQ.question.id,
                subject: currentQ.question.subjectCode,
                topic: currentQ.question.topicTitleBn,
                question_bn: currentQ.question.stemBn,
                question_en: currentQ.question.stemEn,
                correct_option: json.data.correctAnswerId,
                explanation_bn: json.data.explanationBn,
                savedAt: new Date().toISOString(),
              });
              localStorage.setItem('bcs_mistake_notebook', JSON.stringify(mistakes));
            }
          }
        } catch (e) {}
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
    const netScore = Math.max(0, correct * 1.0 - wrong * 0.50);
    const wrongQuestions = activeSet.questions.filter((q) => q.isCorrect === false);

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3">
              <Award className="h-4 w-4 text-amber-300" />
              <span>Daily Practice Set Completed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bangla-font">
              অভিনন্দন! আজকের অনুশীলন সমাপ্ত
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto bangla-font leading-relaxed">
              আপনার ফলাফল স্বয়ংক্রিয়ভাবে দুর্বলতা বিশ্লেষণ ও মিস্টেক নোটবুকে সংরক্ষণ করা হয়েছে।
            </p>
          </div>

          {/* Key Metrics */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[11px] uppercase font-bold text-slate-500">মোট প্রশ্ন</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {toBnDigits(totalQ)}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-[11px] uppercase font-bold text-emerald-700 dark:text-emerald-400">সঠিক (+১.০)</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {toBnDigits(correct)}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
                <span className="text-[11px] uppercase font-bold text-rose-700 dark:text-rose-400">ভুল (-০.৫০)</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
                  {toBnDigits(wrong)}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
                <span className="text-[11px] uppercase font-bold text-blue-700 dark:text-blue-400">অর্জিত নম্বর</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {netScore.toFixed(2)}
                  <span className="text-xs text-slate-500 font-normal"> / {toBnDigits(totalQ)}</span>
                </p>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white bangla-font">
                    সঠিকতার হার ও সময় ব্যয়
                  </h3>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500">
                  ব্যয়িত সময়: {formatTimer(secondsElapsed)}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span>Accuracy Rate</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{accuracy}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mistake Notebook Sync Status */}
            {wrongQuestions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                    <BookMarked className="h-4 w-4" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white bangla-font">
                      ভুল হওয়া প্রশ্ন ({toBnDigits(wrongQuestions.length)}টি) — মিস্টেক নোটবুকে সংরক্ষিত
                    </h3>
                  </div>
                  <Link
                    href="/mistake-notebook"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>মিস্টেক নোটবুক দেখুন</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {wrongQuestions.map((wq, i) => (
                    <div
                      key={wq.id}
                      className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 text-xs sm:text-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-rose-700 dark:text-rose-400">
                          #{i + 1} • {wq.question.subjectCode.toUpperCase()}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          সঠিক উত্তর: ({wq.question.correctAnswerId})
                        </span>
                      </div>
                      <p className="mt-1 font-medium text-slate-900 dark:text-slate-100 bangla-font">
                        {wq.question.stemBn}
                      </p>
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-lg border border-rose-100 dark:border-rose-950 bangla-font">
                        <strong className="text-emerald-700 dark:text-emerald-400">ব্যাখ্যা:</strong> {wq.question.explanationBn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setActiveSet(null);
                  setCurrentIndex(0);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>নতুন অনুশীলন কনফিগার করুন</span>
              </button>

              <Link
                href="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-2"
              >
                <span>ড্যাশবোর্ডে ফিরে যান</span>
                <ArrowRight className="h-3.5 w-3.5" />
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
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-4">
        {/* Session Top Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono">
              প্রশ্ন {toBnDigits(currentIndex + 1)} / {toBnDigits(activeSet.questionCount)}
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              সম্পন্ন: {toBnDigits(activeSet.completedCount)} / {toBnDigits(activeSet.questionCount)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>

            <button
              onClick={handleToggleBookmark}
              className={`p-1.5 px-3 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                currentQ.isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-700 dark:text-amber-400 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bookmark Question"
            >
              <BookMarked className="h-3.5 w-3.5" />
              <span>{currentQ.isBookmarked ? 'বুকমার্কড' : 'বুকমার্ক'}</span>
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[11px] border border-blue-200 dark:border-blue-800">
                {qData.subjectCode.toUpperCase()}
              </span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                {qData.topicTitleBn || qData.topicTitleEn || 'সিলেবাস টপিক'}
              </span>
            </div>
            <span className="text-slate-400 text-[11px] font-mono">
              ID: {qData.id}
            </span>
          </div>

          {/* Stems */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed bangla-font">
              {qData.stemBn}
            </h2>
            {qData.stemEn && qData.stemEn.trim() !== qData.stemBn.trim() && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                {qData.stemEn}
              </p>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {qData.options.map((opt) => {
              const optKey = opt.id as 'A' | 'B' | 'C' | 'D';
              const isSelected = selectedOption === optKey;
              const isSubmitted = isAnswerSubmitted;
              const isCorrectAnswer = optKey === submissionFeedback?.correctAnswerId;

              let btnClasses =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-blue-400 hover:bg-blue-50/20';

              if (isSelected && !isSubmitted) {
                btnClasses =
                  'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/30';
              } else if (isSubmitted) {
                if (isCorrectAnswer) {
                  btnClasses =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30';
                } else if (isSelected && !isCorrectAnswer) {
                  btnClasses =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/30';
                } else {
                  btnClasses = 'border-slate-200 dark:border-slate-800 opacity-60 text-slate-500';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(optKey)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${btnClasses}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-lg bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {optKey}
                    </span>
                    <span className="text-xs sm:text-sm font-medium bangla-font leading-relaxed">
                      {opt.textBn || opt.textEn}
                    </span>
                  </div>

                  {isSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-1" />
                  )}
                  {isSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submission and Feedback Area */}
          {!isAnswerSubmitted ? (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">
                {selectedOption ? 'অপশন নির্বাচন করা হয়েছে' : 'একটি অপশন নির্বাচন করুন'}
              </span>
              <button
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs transition-all shadow-sm"
              >
                উত্তর জমা দিন
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              {/* Feedback Alert */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  submissionFeedback?.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
                }`}
              >
                {submissionFeedback?.isCorrect ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-sm">
                    {submissionFeedback?.isCorrect
                      ? 'সঠিক উত্তর! (+১.০ নম্বর)'
                      : `ভুল উত্তর! সঠিক উত্তর: (${submissionFeedback?.correctAnswerId}) ${isSpecialHealth ? '[-০.৫০ নম্বর পেনাল্টি]' : ''}`}
                  </h4>
                  <p className="leading-relaxed bangla-font text-slate-700 dark:text-slate-200">
                    {submissionFeedback?.explanationBn}
                  </p>
                  {submissionFeedback?.explanationEn && (
                    <p className="text-[11px] text-slate-500 italic">
                      {submissionFeedback.explanationEn}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
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
                        activeSet.status = 'completed';
                        setActiveSet({ ...activeSet });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      অনুশীলন সমাপ্ত করুন
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>পরবর্তী প্রশ্ন</span>
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
  // RENDER: LAUNCH & CONFIGURATION DASHBOARD (CLEAN & REDESIGNED)
  // =========================================================================
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* 5.B: Compact Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              BCSCrack Daily Practice
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{formatBengaliDate()}</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight bangla-font">
            দৈনিক অনুশীলন
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed bangla-font">
            আপনার প্রস্তুতি অনুযায়ী প্রশ্ন অনুশীলন করুন, ভুল সংশোধন করুন এবং নিয়মিত রিভিশন করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/question-bank"
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            <span>প্রশ্ন ব্যাংক (২০k)</span>
          </Link>
          <Link
            href="/mistake-notebook"
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <BookMarked className="h-3.5 w-3.5 text-rose-600" />
            <span>মিস্টেক নোটবুক</span>
          </Link>
        </div>
      </div>

      {lockNotice && (
        <PremiumLockScreen
          title="এই কনটেন্টটি প্রিমিয়াম প্যাকেজের অন্তর্ভুক্ত"
          description={lockNotice.message}
          requiredTier={lockNotice.requiredTier}
        />
      )}

      {errorMsg && !lockNotice && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Setup Flow in Single Cohesive Flow */}
      <div className="space-y-6 sm:space-y-8">
        {/* ========================================================================= */}
        {/* 5.C: STEP 1 — SELECT EXAMINATION AND TRACK                                */}
        {/* ========================================================================= */}
        <section aria-labelledby="step-1-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="step-1-heading" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 bangla-font">
              <span className="h-6 w-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold flex items-center justify-center">
                ১
              </span>
              <span>পরীক্ষার ধরন নির্বাচন করুন</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">BPSC সিলেবাস অনুসারী</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Option 1: 51st Special BCS Health */}
            <div
              onClick={() => setExamTrack('special_bcs_health_51_2026')}
              className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                examTrack === 'special_bcs_health_51_2026'
                  ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-600/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      স্বাস্থ্য ক্যাডার
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">৫০তম/৫১তম স্পেশাল</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white bangla-font">
                    ৫১তম বিশেষ বিসিএস (স্বাস্থ্য)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ২০০ নম্বর • ২০০ প্রশ্ন • ১২০ মিনিট • নেগেটিভ মার্কিং -০.৫০
                  </p>
                </div>

                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                    examTrack === 'special_bcs_health_51_2026'
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {examTrack === 'special_bcs_health_51_2026' && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </div>

              {/* Cadre Stream Switcher */}
              {examTrack === 'special_bcs_health_51_2026' && (
                <div className="mt-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/60">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                    ক্যাডার স্ট্রিম নির্বাচন করুন:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfessionalStream('assistant_surgeon');
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        professionalStream === 'assistant_surgeon'
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Stethoscope className="h-3.5 w-3.5" />
                      <span>সহকারী সার্জন (MBBS)</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfessionalStream('assistant_dental_surgeon');
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        professionalStream === 'assistant_dental_surgeon'
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>🦷</span>
                      <span>সহকারী ডেন্টাল সার্জন (BDS)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Option 2: General BCS */}
            <div
              onClick={() => setExamTrack('general_bcs')}
              className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                examTrack === 'general_bcs'
                  ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-600/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      সাধারণ ক্যাডার
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">৪৬তম/৪৭তম প্রিলিমিনারি</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white bangla-font">
                    সাধারণ বিসিএস প্রিলিমিনারি
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ১০টি সাধারণ বিষয় • ২০০ নম্বর • ২০০ প্রশ্ন • ১২০ মিনিট
                  </p>
                </div>

                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                    examTrack === 'general_bcs'
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {examTrack === 'general_bcs' && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                বাংলা, ইংরেজি, বাংলাদেশ, আন্তর্জাতিক, গণিত, বিজ্ঞান ও অন্যান্য আবশ্যিক সাধারণ বিষয়সমূহ।
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5.D: STEP 2 — SELECT PRACTICE MODE                                        */}
        {/* ========================================================================= */}
        <section aria-labelledby="step-2-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="step-2-heading" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 bangla-font">
              <span className="h-6 w-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold flex items-center justify-center">
                ২
              </span>
              <span>অনুশীলনের ধরন নির্বাচন করুন</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">৪টি স্মার্ট প্র্যাকটিস মোড</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'mixed',
                title: 'দৈনিক মিক্সড প্র্যাকটিস',
                desc: 'রিভিশন, দুর্বল টপিক, বিগত প্রশ্ন ও নতুন সিলেবাসের সমন্বিত সেট',
                badge: 'AI Mix (সুপারিশকৃত)',
                icon: Sparkles,
              },
              {
                id: 'past_papers',
                title: 'বিগত বিসিএস প্রশ্নপত্র',
                desc: 'বিপিএসসি কর্তৃক গৃহীত বাস্তব পূর্ববর্তী পরীক্ষার প্রশ্নাবলি',
                badge: null,
                icon: BookOpen,
              },
              {
                id: 'subject_wise',
                title: 'বিষয়ভিত্তিক অনুশীলন',
                desc: 'সিলেবাসের নির্দিষ্ট যেকোনো একটি বিষয়ের উপর পূর্ণ প্রস্তুতি',
                badge: null,
                icon: Layers,
              },
              {
                id: 'mistake_notebook',
                title: 'মিস্টেক নোটবুক ড্রিল',
                desc: 'পূর্বে ভুল হওয়া প্রশ্নাবলির তাৎক্ষণিক নিয়মিত রিভিশন ও সংশোধন',
                badge: null,
                icon: BookMarked,
              },
            ].map((m) => {
              const isSelected = practiceMode === m.id;
              const IconComp = m.icon;

              return (
                <div
                  key={m.id}
                  onClick={() => setPracticeMode(m.id as DailyPracticeMode)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-600/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        <IconComp className="h-4 w-4" />
                      </div>
                      {m.badge && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                          {m.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white bangla-font">
                      {m.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 bangla-font leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                    <span className={`text-[11px] font-bold ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                      {isSelected ? '✓ নির্বাচিত' : 'নির্বাচন করুন'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subject Selector when Subject-Wise is selected */}
          {practiceMode === 'subject_wise' && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                <span>অনুশীলনের বিষয় নির্বাচন করুন:</span>
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-2xs"
              >
                <option value="all">সকল বিষয় (All Subjects)</option>
                {(examTrack === 'general_bcs' ? GENERAL_BCS_SUBJECTS : SPECIAL_BCS_HEALTH_SUBJECTS).map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.nameBn} ({s.marks} Marks)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 6. Simplified Expandable Explanation: দৈনিক মিক্স কীভাবে কাজ করে? */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAlgorithmExplainer(!showAlgorithmExplainer)}
              className="w-full p-3.5 px-4 flex items-center justify-between text-left hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span>দৈনিক মিক্স কীভাবে কাজ করে? (How Daily Mix Works)</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span>{showAlgorithmExplainer ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত দেখুন'}</span>
                {showAlgorithmExplainer ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>

            {showAlgorithmExplainer && (
              <div className="p-4 pt-1 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 bangla-font leading-relaxed">
                  দৈনিক মিক্সড সেশনে প্রশ্নের অনুপাত একটি বৈজ্ঞানিক স্পেসড রিপিটেশন অ্যালগরিদম মেনে তৈরি হয়। এটি কোনো শিক্ষার্থীর অর্জিত নম্বর নয়, বরং দৈনিক প্রশ্ন সেটের কাঠামো:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm mb-0.5">৪০%</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">স্পেসড রিভিশন</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">পূর্বে পড়া টপিক নিয়মিত মনে রাখা</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="text-rose-600 dark:text-rose-400 font-extrabold text-sm mb-0.5">৩০%</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">দুর্বল টপিক</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">ভুল হওয়া অংশে বাড়তি অনুশীলন</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="text-amber-600 dark:text-amber-400 font-extrabold text-sm mb-0.5">২০%</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">বিগত প্রশ্নাবলি</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">যাচাইকৃত বিপিএসসি পরীক্ষার প্রশ্ন</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm mb-0.5">১০%</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">নতুন টপিক</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">সিলেবাসের অবশিষ্ট বিষয়ের প্রশ্ন</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>প্রতিটি প্রশ্নের বাংলা ও ইংরেজি ব্যাখ্যা সরকারি কর্ম কমিশনের সিলেবাস রেফারেন্সসহ যাচাইকৃত।</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5.E: STEP 3 — CHOOSE NUMBER OF QUESTIONS                                  */}
        {/* ========================================================================= */}
        <section aria-labelledby="step-3-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="step-3-heading" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 bangla-font">
              <span className="h-6 w-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold flex items-center justify-center">
                ৩
              </span>
              <span>প্রশ্নের সংখ্যা নির্বাচন করুন</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">সময় ও গভীরতা অনুসারে</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { count: 10, label: '১০টি প্রশ্ন', time: '~১০ মিনিট' },
              { count: 20, label: '২০টি প্রশ্ন', time: '~২০ মিনিট' },
              { count: 30, label: '৩০টি প্রশ্ন', time: '~৩০ মিনিট' },
              { count: 50, label: '৫০টি প্রশ্ন', time: '~৫০ মিনিট' },
            ].map((item) => {
              const isSelected = questionCount === item.count;

              return (
                <button
                  key={item.count}
                  type="button"
                  onClick={() => setQuestionCount(item.count)}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-lg sm:text-xl font-extrabold block">
                    {toBnDigits(item.count)}টি
                  </span>
                  <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {item.time}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5.F: PRACTICE SUMMARY AND MAIN ACTION                                      */}
        {/* ========================================================================= */}
        <section aria-labelledby="summary-heading" className="pt-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 id="summary-heading" className="text-sm font-bold text-slate-900 dark:text-white bangla-font">
                  অনুশীলন সেশন সারসংক্ষেপ (Session Summary)
                </h3>
                <p className="text-xs text-slate-500">আপনার নির্বাচিত সেটিংস অনুযায়ী সেশন তৈরি হবে</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-fit">
                নেগেটিভ মার্কিং: প্রতি ভুলে -০.৫০ নম্বর
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">নির্বাচিত পরীক্ষা</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
                  {examTrack === 'special_bcs_health_51_2026'
                    ? `৫১তম বিশেষ বিসিএস (${professionalStream === 'assistant_surgeon' ? 'MBBS' : 'BDS'})`
                    : 'সাধারণ বিসিএস প্রিলিমিনারি'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">অনুশীলন মোড</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
                  {practiceMode === 'mixed'
                    ? 'দৈনিক মিক্সড প্র্যাকটিস'
                    : practiceMode === 'past_papers'
                    ? 'বিগত বিসিএস প্রশ্নপত্র'
                    : practiceMode === 'subject_wise'
                    ? 'বিষয়ভিত্তিক অনুশীলন'
                    : 'মিস্টেক নোটবুক ড্রিল'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">মোট প্রশ্ন ও পূর্ণমান</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">
                  {toBnDigits(questionCount)}টি MCQ ({toBnDigits(questionCount)} নম্বর)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block text-[11px]">স্কোরিং নিয়ম</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  +১.০০ / -০.৫০
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleStartPractice}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-extrabold text-sm sm:text-base transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-white" />
                    <span>আজকের প্রশ্ন সেট তৈরি হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>আজকের প্র্যাকটিস শুরু করুন</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
