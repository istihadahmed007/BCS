import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookCheck,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  GraduationCap,
  Library,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Target,
  Users,
} from 'lucide-react';
import { OFFICIAL_SOURCES, REFERENCE_CATALOG } from '@/data/catalog';
import { EXAM_CONFIG_VERSIONS, EXAM_TRACKS } from '@/data/exam-configs';

export default function HomePage() {
  const specialConfig = EXAM_CONFIG_VERSIONS['special_bcs_health_51_2026'];
  const generalConfig = EXAM_CONFIG_VERSIONS['general_bcs'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-gradient-to-b from-emerald-950/20 via-slate-50 to-slate-50 dark:from-emerald-950/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Official BPSC 51st Special Health & General BCS Ready</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Pass BCS with{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 bg-clip-text text-transparent">
                Adaptive AI Precision
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed bangla-font">
              শুধু গতানুগতিক প্রশ্ন মুখস্থ নয়—অফিসিয়াল সার্কুলার অনুযায়ী নির্দিষ্ট নেগেটিভ মার্কিং (-০.৫০), সময় ব্যবস্থাপনা, দুর্বলতা শনাক্তকরণ ও বাস্তব সিলেবাসভিত্তিক প্রস্তুতি।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/question-bank"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <BookCheck className="h-5 w-5" />
                <span>Question Bank (২০,০০০ প্রশ্ন)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/onboarding"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <GraduationCap className="h-5 w-5" />
                <span>Start Diagnostic Test</span>
              </Link>
              <Link
                href="/test"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Target className="h-5 w-5 text-emerald-600" />
                <span>Mock Tests</span>
              </Link>
            </div>

            {/* Quick Stats Badges */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto text-left">
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-500/30 backdrop-blur-sm shadow-sm ring-1 ring-emerald-500/20">
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">20,000</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified MCQs Bank</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">5,000</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">51st Health Vacancies</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">-0.50</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Official Penalty Mark</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">120 Min</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">200 MCQs Timed</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Deterministic Scoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Isolated Exam Tracks Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              Isolated Examination Engines
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Choose Your Dedicated Cadre Track
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 bangla-font">
              সাধারণ বিসিএস ও বিশেষ বিসিএস (স্বাস্থ্য)-এর আলাদা সিলেবাস ও নিয়মাবলি কঠোরভাবে পৃথক রাখা হয়েছে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Track 1: 51st Special BCS Health */}
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent p-6 sm:p-8 relative flex flex-col justify-between hover:border-emerald-500 transition-all shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                    <Stethoscope className="h-4 w-4" />
                    <span>Special BCS Health Cadre 2026</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                    5,000 Posts
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  51st Special BCS Examination 2026
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bangla-font">
                  সহকারী সার্জন (MBBS - ৪,৭০০ পদ) এবং সহকারী ডেন্টাল সার্জন (BDS - ৩০০ পদ)-এর জন্য বিশেষ পরীক্ষা। সাধারণ বিষয় ১০০ নম্বর + প্রফেশনাল বিষয় ১০০ নম্বর (১ম ও ২য় পত্র)।
                </p>

                <div className="space-y-2.5 pt-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Written MCQ Structure:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">200 MCQs / 200 Marks / 120 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Wrong Answer Penalty:</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">-0.50 Mark per error</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Shared General Subjects (100m):</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Bangla(20), Eng(20), BD(20), Int(20), Math(10), Mental(10)</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-500">Professional Subject (100m):</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Separate Medical Science vs. Dental Science</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/dashboard?track=special_bcs_health_51_2026&stream=assistant_surgeon"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  <span>Launch Assistant Surgeon Prep</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard?track=special_bcs_health_51_2026&stream=assistant_dental_surgeon"
                  className="text-xs text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  Dental Surgeon &rarr;
                </Link>
              </div>
            </div>

            {/* Track 2: General BCS */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 sm:p-8 relative flex flex-col justify-between hover:border-sky-500/50 transition-all shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-400 text-xs font-semibold">
                    <GraduationCap className="h-4 w-4" />
                    <span>General & Technical Cadres</span>
                  </div>
                  <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold bg-sky-100 dark:bg-sky-950 px-2 py-0.5 rounded">
                    10 Subjects
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  General BCS Preliminary Examination
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bangla-font">
                  প্রশাসন, পুলিশ, পররাষ্ট্র, করসহ সাধারণ ও টেকনিক্যাল ক্যাডারের ২০০ নম্বরের পূর্ণাঙ্গ প্রিলিমিনারি পরীক্ষা। সাধারণ বিজ্ঞান, তথ্যপ্রযুক্তি ও ভূগোলসহ ১০টি বিষয়।
                </p>

                <div className="space-y-2.5 pt-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Preliminary Structure:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">200 MCQs / 200 Marks / 120 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Negative Penalty:</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">-0.50 Mark per error</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Subject Coverage:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Bangla(35), Eng(35), BD(30), Int(20), Math(15), Mental(15)...</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-500">Rule Boundary:</span>
                    <span className="font-semibold text-sky-600 dark:text-sky-400">Strictly isolated from medical/dental subjects</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/dashboard?track=general_bcs"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-500 transition-colors"
                >
                  <span>Launch General BCS Prep</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/syllabus"
                  className="text-xs text-slate-500 hover:text-sky-600 transition-colors"
                >
                  Browse Syllabus &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official BPSC Sources & Research Registry */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <FileCheck className="h-4 w-4" />
                <span>BPSC Official System of Record</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Primary Government Circulars & Syllabi
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              <span>View Full Bibliographic Catalog (B01–B19)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICIAL_SOURCES.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold">
                      {doc.code}
                    </span>
                    <span className="text-slate-500">{doc.editionDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {doc.recommendedUse}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Verified High Confidence
                  </span>
                  {doc.sourceUrl ? (
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1"
                    >
                      <span>Direct BPSC PDF</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Strict Provenance & Zero Piracy Callout */}
          <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Strict Intellectual Property & Provenance Policy:</span>
              <p className="leading-relaxed">
                BCS Crack indexes bibliographic metadata and external retailer links for secondary study aids (e.g. Assurance, Manual, Matrix, Professor&apos;s, Lecture, Gazi Mizanur Rahman). No commercial book is scanned, digitised, or ingested without written publisher licence agreements. All official scoring rules are derived solely from verified BPSC documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured 20,000 Verified Question Bank Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-emerald-950 text-white border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <BookCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified MCQ Repository (২০,০০০ প্রশ্ন)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                সম্পূর্ণ ১০টি বিষয়ের সিলেবাস-ভিত্তিক প্রশ্ন ব্যাংক
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base bangla-font leading-relaxed">
                প্রতিটি প্রশ্নের সঠিক উত্তর, বাংলা ও ইংরেজিতে প্রশ্ন এবং প্রতিটি উত্তরের পেছনে প্রমাণভিত্তিক বিশদ ব্যাখ্যা অন্তর্ভুক্ত।
              </p>
            </div>

            <div>
              <Link
                href="/question-bank"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <BookCheck className="h-5 w-5" />
                <span>প্রশ্ন ব্যাংক ওপেন করুন (Explore All 20k)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 10 Subject Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {[
              { name: 'Bangla', bn: 'বাংলা', count: '৩,৫৯৮', color: 'from-rose-500/20 to-pink-500/10' },
              { name: 'English', bn: 'English', count: '৩,৫৯৮', color: 'from-blue-500/20 to-indigo-500/10' },
              { name: 'Bangladesh Affairs', bn: 'বাংলাদেশ বিষয়াবলী', count: '৩,১৯৭', color: 'from-emerald-500/20 to-teal-500/10' },
              { name: 'International Affairs', bn: 'আন্তর্জাতিক বিষয়াবলী', count: '২,৩৯৮', color: 'from-purple-500/20 to-violet-500/10' },
              { name: 'Science', bn: 'সাধারণ বিজ্ঞান', count: '১,৯৯৮', color: 'from-amber-500/20 to-orange-500/10' },
              { name: 'Computer and Information Technology', bn: 'কম্পিউটার ও আইসিটি', count: '১,৯৯৮', color: 'from-cyan-500/20 to-blue-500/10' },
              { name: 'Mathematics', bn: 'গাণিতিক যুক্তি', count: '১,৬০০', color: 'from-indigo-500/20 to-sky-500/10' },
              { name: 'Mental Ability', bn: 'মানসিক দক্ষতা', count: '৮০৮', color: 'from-fuchsia-500/20 to-pink-500/10' },
              { name: 'Geography and Environment', bn: 'ভূগোল ও পরিবেশ', count: '৫৬৩', color: 'from-teal-500/20 to-emerald-500/10' },
              { name: 'Ethics, Values and Good Governance', bn: 'নৈতিকতা ও সুশাসন', count: '২৪২', color: 'from-sky-500/20 to-teal-500/10' },
            ].map((s) => (
              <Link
                key={s.name}
                href={`/question-bank?subject=${encodeURIComponent(s.name)}`}
                className={`p-4 rounded-2xl bg-gradient-to-br ${s.color} border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="text-xs text-emerald-300 font-semibold mb-1">{s.name}</div>
                  <h4 className="font-bold text-base text-white bangla-font group-hover:text-emerald-300 transition-colors">
                    {s.bn}
                  </h4>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">{s.count} প্রশ্ন</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-300 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Step Adaptive Learning Loop */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              The Evidence-Based Approach
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
              The BCS Crack Learning Loop
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 bangla-font">
              অন্ধের মতো শত শত প্রশ্ন সমাধান নয়—ভুলের কারণ নির্ণয় ও নিয়মিত রিটেনশন বৃদ্ধির বৈজ্ঞানিক পদ্ধতি।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Diagnostic Assessment
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
                ১০ মিনিটের দ্রুত ডায়াগনস্টিক পরীক্ষার মাধ্যমে আপনার বর্তমান প্রস্তুতি ও সিলেবাস কভারেজের প্রারম্ভিক ভিত্তি (Baseline) নির্ধারণ।
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-600/10 text-sky-600 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Bounded Daily Plan
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
                আপনার ঘোষিত দৈনিক পড়ার সময় (যেমন ৯০ মিনিট) কখনোই অতিক্রম করবে না এমন সুনির্দিষ্ট টাস্ক ও স্পেসড রিভিশন রুটিন।
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Accurate Mock Engine
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
                ১২০ মিনিটের পূর্ণাঙ্গ ২০০ নম্বরের মক পরীক্ষা। নির্ভুল টাইমার, ফ্ল্যাগিং ও সার্ভার-সাইড -০.৫০ নেগেটিভ মার্কিং।
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-600/10 text-rose-600 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Weakness Classification
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bangla-font">
                ভুলের কারণ স্পষ্ট শ্রেণীকরণ—Knowledge Gap, Retention Problem, Careless Error বা Time Pressure এবং মিস্টেক নোটবুক।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Prepare with Verified BPSC Standards?
          </h2>
          <p className="text-emerald-200 text-sm sm:text-base max-w-xl mx-auto bangla-font leading-relaxed">
            কোনো কাল্পনিক পরিসংখ্যান বা ফেক গ্যারান্টি নয়—বাস্তব সিলেবাস, সার্ভার-নিয়ন্ত্রিত মার্কিং এবং এআই স্টাডি কোচের সাথে প্রস্তুতি শুরু করুন।
          </p>
          <div className="pt-2">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-emerald-950 font-bold text-base shadow-xl transition-all hover:scale-105"
            >
              <GraduationCap className="h-5 w-5 text-emerald-700" />
              <span>Begin Onboarding & Diagnostic Assessment</span>
              <ArrowRight className="h-4 w-4 text-emerald-700" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
