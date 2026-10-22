'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Layers,
  Sparkles,
  Stethoscope,
  Target,
} from 'lucide-react';
import { GENERAL_BCS_SUBJECTS, SPECIAL_BCS_HEALTH_SUBJECTS } from '@/data/exam-configs';
import { SYLLABUS_TOPICS } from '@/data/syllabus';
import { OFFICIAL_SOURCES } from '@/data/catalog';

export default function SyllabusPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'shared' | 'medical' | 'dental'>('general');

  const filteredSubjects =
    activeTab === 'general'
      ? GENERAL_BCS_SUBJECTS
      : SPECIAL_BCS_HEALTH_SUBJECTS.filter((sub) => {
          if (activeTab === 'shared') return !sub.isProfessional;
          if (activeTab === 'medical') return sub.isProfessional && sub.professionalStream === 'assistant_surgeon';
          if (activeTab === 'dental') return sub.isProfessional && sub.professionalStream === 'assistant_dental_surgeon';
          return true;
        });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-2">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Official BPSC Syllabus Curriculum & Subject Breakdown</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Curriculum & Syllabus Explorer
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 bangla-font mt-1">
              বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) প্রিলিমিনারি ও স্পেশাল বিসিএস অফিসিয়াল সিলেবাসের প্রতিটি বিষয়, টপিক কোড, মার্কস ও রেফারেন্স।
            </p>
          </div>

          <a
            href={OFFICIAL_SOURCES[1]?.sourceUrl || 'https://bpsc.gov.bd'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all"
          >
            <span>Download Official BPSC PDF</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'general'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>General BCS Preliminary (10 Subjects • 200 Marks)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shared')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'shared'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Special BCS Shared Subjects (100 Marks)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('medical')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'medical'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            <span>Medical Science — Assistant Surgeon (100 Marks)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dental')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'dental'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Dental Science — Dental Surgeon (100 Marks)</span>
          </button>
        </div>

        {/* Subjects & Topics List */}
        <div className="space-y-8">
          {filteredSubjects.map((sub) => {
            const subjectTopics = SYLLABUS_TOPICS.filter((t) => {
              if (t.subjectId === sub.id) return true;
              const sharedMap: Record<string, string> = {
                'sub-gbcs-bangla': 'sub-sbcs-bangla',
                'sub-gbcs-english': 'sub-sbcs-english',
                'sub-gbcs-bdaffairs': 'sub-sbcs-bdaffairs',
                'sub-gbcs-intaffairs': 'sub-sbcs-intaffairs',
                'sub-gbcs-math': 'sub-sbcs-math',
                'sub-gbcs-mental-ability': 'sub-sbcs-mental-ability',
              };
              return sharedMap[sub.id] === t.subjectId;
            });
            return (
              <div
                key={sub.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
              >
                {/* Subject Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        {sub.code}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white bangla-font">
                        {sub.nameBn}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{sub.nameEn}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl">
                      {sub.marks} Marks ({sub.questionCount} MCQs)
                    </span>
                    <Link
                      href={`/test?subject=${sub.code}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90"
                    >
                      <Target className="h-3.5 w-3.5" />
                      <span>Practice Subject</span>
                    </Link>
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjectTopics.map((top) => (
                    <div
                      key={top.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] font-bold text-slate-500">
                            {top.topicCode}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              top.weightageLevel === 'critical'
                                ? 'bg-rose-500/10 text-rose-600'
                                : 'bg-emerald-500/10 text-emerald-600'
                            }`}
                          >
                            {top.weightageLevel}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-slate-900 dark:text-white bangla-font">
                          {top.titleBn}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {top.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{top.officialSyllabusPage}</span>
                        <Link
                          href={`/test?topic=${top.id}`}
                          className="font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1"
                        >
                          <span>Drill 5 MCQs</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
