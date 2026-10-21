'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  Sparkles,
  Stethoscope,
  Target,
} from 'lucide-react';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();

  // Onboarding state
  const [selectedTrack, setSelectedTrack] = useState<ExamTrackId>('special_bcs_health_51_2026');
  const [selectedStream, setSelectedStream] = useState<ProfessionalStreamId>('assistant_surgeon');
  const [dailyMinutes, setDailyMinutes] = useState<number>(120);
  const [preferredLang, setPreferredLang] = useState<'bn' | 'en' | 'bilingual'>('bn');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartDiagnostic = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/test/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'candidate-user-1',
          examTrackId: selectedTrack,
          professionalStream: selectedTrack === 'general_bcs' ? 'general' : selectedStream,
          testType: 'diagnostic',
          title: `${selectedTrack === 'general_bcs' ? 'General BCS' : selectedStream === 'assistant_surgeon' ? 'Assistant Surgeon (MBBS)' : 'Assistant Dental Surgeon (BDS)'} Diagnostic Test`,
        }),
      });

      const json = await res.json();
      if (json.success && json.data?.id) {
        // Save initial enrollment preferences to localStorage
        localStorage.setItem(
          'bcs_enrollment',
          JSON.stringify({
            trackId: selectedTrack,
            stream: selectedStream,
            dailyMinutes,
            lang: preferredLang,
          })
        );
        router.push(`/test/${json.data.id}`);
      } else {
        alert(json.error || 'Failed to start diagnostic test');
      }
    } catch (e: any) {
      alert('Error creating assessment session: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Candidate Onboarding & Diagnostic Initialization</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Configure Your BCS Target Track
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 bangla-font max-w-xl mx-auto">
            আপনার লক্ষ্যভুক্ত বিসিএস ক্যাডার, প্রফেশনাল স্ট্রিম এবং দৈনিক পড়ার সময় নির্ধারণ করে ডায়াগনস্টিক পরীক্ষার মাধ্যমে শুরু করুন।
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Step 1: Select Examination Track */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <span className="flex h-6 w-6 rounded-full bg-emerald-600 text-white items-center justify-center text-xs">
                1
              </span>
              <span>Select Examination Track</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedTrack('special_bcs_health_51_2026')}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedTrack === 'special_bcs_health_51_2026'
                    ? 'border-emerald-600 bg-emerald-500/5 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  {selectedTrack === 'special_bcs_health_51_2026' && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  )}
                </div>
                <div className="font-bold text-slate-900 dark:text-white">
                  51st Special BCS 2026
                </div>
                <div className="text-xs text-emerald-600 font-semibold mt-0.5">
                  Health Cadre (5,000 Posts)
                </div>
                <p className="text-xs text-slate-500 mt-2 bangla-font">
                  ২০০ প্রশ্ন, ১২০ মিনিট, -০.৫০ নেগেটিভ মার্ক। সাধারণ ১০০ + প্রফেশনাল ১০০।
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTrack('general_bcs')}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedTrack === 'general_bcs'
                    ? 'border-sky-600 bg-sky-500/5 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  {selectedTrack === 'general_bcs' && (
                    <CheckCircle2 className="h-5 w-5 text-sky-600" />
                  )}
                </div>
                <div className="font-bold text-slate-900 dark:text-white">
                  General BCS
                </div>
                <div className="text-xs text-sky-600 font-semibold mt-0.5">
                  General & Technical Cadres
                </div>
                <p className="text-xs text-slate-500 mt-2 bangla-font">
                  ১০টি সাধারণ বিষয়ের ওপর ২০০ নম্বরের প্রিলিমিনারি পরীক্ষা।
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: If Special Health, Select Professional Stream */}
          {selectedTrack === 'special_bcs_health_51_2026' && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                <span className="flex h-6 w-6 rounded-full bg-emerald-600 text-white items-center justify-center text-xs">
                  2
                </span>
                <span>Select Professional Stream (BPSC Cadre Post)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedStream('assistant_surgeon')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedStream === 'assistant_surgeon'
                      ? 'border-emerald-600 bg-emerald-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      Assistant Surgeon (সহকারী সার্জন)
                    </div>
                    {selectedStream === 'assistant_surgeon' && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">
                    MBBS | 4,700 Vacancies
                  </div>
                  <p className="text-xs text-slate-500 mt-1 bangla-font">
                    মেডিকেল সায়েন্স ১ম ও ২য় পত্র (প্রাক, প্যারা ও ক্লিনিক্যাল মেডিসিন/সার্জারি/গাইনি)।
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('assistant_dental_surgeon')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedStream === 'assistant_dental_surgeon'
                      ? 'border-emerald-600 bg-emerald-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      Assistant Dental Surgeon (সহকারী ডেন্টাল সার্জন)
                    </div>
                    {selectedStream === 'assistant_dental_surgeon' && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">
                    BDS | 300 Vacancies
                  </div>
                  <p className="text-xs text-slate-500 mt-1 bangla-font">
                    ডেন্টাল সায়েন্স ১ম ও ২য় পত্র (ডেন্টাল অ্যানাটমি, মেটেরিয়ালস ও ওরাল সার্জারি)।
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Daily Available Study Minutes */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                <span className="flex h-6 w-6 rounded-full bg-emerald-600 text-white items-center justify-center text-xs">
                  {selectedTrack === 'special_bcs_health_51_2026' ? '3' : '2'}
                </span>
                <span>Daily Available Study Time</span>
              </div>
              <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">
                {dailyMinutes} Minutes / Day
              </span>
            </div>

            <p className="text-xs text-slate-500 bangla-font">
              প্ল্যানিং ইঞ্জিন কখনোই আপনার এই ঘোষিত দৈনিক সময়সীমার বেশি টাস্ক শিডিউল করবে না।
            </p>

            <div className="grid grid-cols-4 gap-3">
              {[60, 90, 120, 180].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDailyMinutes(mins)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                    dailyMinutes === mins
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {mins >= 60 ? `${mins / 60}h` : `${mins}m`} ({mins} min)
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Language Preference */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <span className="flex h-6 w-6 rounded-full bg-emerald-600 text-white items-center justify-center text-xs">
                {selectedTrack === 'special_bcs_health_51_2026' ? '4' : '3'}
              </span>
              <span>Preferred Explanation Language</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'bn', label: 'বাংলা (Bangla)' },
                { id: 'en', label: 'English' },
                { id: 'bilingual', label: 'দ্বিভাষিক (Bilingual)' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setPreferredLang(lang.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                    preferredLang === lang.id
                      ? 'border-emerald-600 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleStartDiagnostic}
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Diagnostic Session...</span>
              ) : (
                <>
                  <GraduationCap className="h-5 w-5" />
                  <span>Start 10-Minute Diagnostic Baseline</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
