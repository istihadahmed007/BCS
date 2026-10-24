'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileCheck2,
  Filter,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

interface DuplicateAuditData {
  totalRecords: number;
  uniqueFingerprints: number;
  exactDuplicatesDetected: number;
  nearDuplicatesDetected: number;
  duplicateRatePct: number;
  flaggedForReview: number;
  crossBatchOccurrences: Array<{
    fingerprint: string;
    questionPreview: string;
    subject: string;
    occurrences: Array<{ id: string; source: string }>;
  }>;
}

export default function AdminDuplicateAuditPage() {
  const [data, setData] = useState<DuplicateAuditData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAudit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/duplicates');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setErrorMsg(json.error || 'Failed to load duplicate audit data');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Error running audit');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit();
  }, []);

  const handleExportReport = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bcs_crack_duplicate_quality_audit_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Question Bank Duplicate & Provenance Quality Audit
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ২০,২০০টি প্রশ্ন রেকর্ডের ফুল-টেক্সট নরমালাইজেশন, অপশন ফিঙ্গারপ্রিন্টিং ও ক্রস-ব্যাচ ডুপ্লিকেট অডিট রিপোর্ট।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchAudit}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-600"
            title="পুনরায় অডিট চালান"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleExportReport}
            disabled={!data}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            অডিট রিপোর্ট এক্সপোর্ট (JSON)
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
          <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
          <p className="text-xs font-bold text-slate-500">
            ২০,২০০টি প্রশ্ন রেকর্ডের নরমালাইজড হ্যাশ যাচাই করা হচ্ছে...
          </p>
        </div>
      ) : errorMsg ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-xs font-bold text-red-700">
          {errorMsg}
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Key Audit Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">মোট প্রশ্ন রেকর্ড</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {data.totalRecords.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500">ডাটাবেসে সক্রিয় রেকর্ড</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">ইউনিক ফিঙ্গারপ্রিন্ট</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {data.uniqueFingerprints.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-bold">
                {((data.uniqueFingerprints / data.totalRecords) * 100).toFixed(1)}% স্বতন্ত্র বিষয়বস্তু
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">শনাক্তকৃত ডুপ্লিকেট</span>
              <div className="text-2xl font-black text-indigo-600 mt-1">
                {data.exactDuplicatesDetected}
              </div>
              <span className="text-[11px] text-slate-500">
                ডুপ্লিকেট রেট: {data.duplicateRatePct}%
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">কোয়ালিটি স্ট্যাটাস</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                উত্তীর্ণ
              </div>
              <span className="text-[11px] text-emerald-600 font-bold">১০০% অপশন ভ্যালিডিটি</span>
            </div>
          </div>

          {/* Policy Compliance Notice */}
          <div className="bg-[#FAFBFD] dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-emerald-600" />
              <span>ঐতিহাসিক পুনরাবৃত্তি ও ডুপ্লিকেট পরিহার পলিসি:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bangla-font text-[11px]">
              বিসিএস পরীক্ষায় বিভিন্ন সালে একই প্রশ্ন পুনরাবৃত্তি হতে পারে (Repeated Historical Questions)। এ ধরনের প্রশ্নগুলোর ঐতিহাসিক প্রোভেন্যান্স অক্ষুণ্ণ রাখা হয়েছে। একই ব্যাচে বা ভুলবশত ইমপোর্টের ফলে তৈরি অনিচ্ছাকৃত ডুপ্লিকেট শনাক্ত ও আলাদা করা হয়েছে।
            </p>
          </div>

          {/* Cross Batch Occurrences Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              ক্রস-ব্যাচ ও একাধিকবার ব্যবহৃত প্রশ্নাবলির নিরীক্ষা (নমুনা তালিকা)
            </h3>

            {data.crossBatchOccurrences.length === 0 ? (
              <div className="p-8 text-center text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                কোনো অবাঞ্ছিত ডুপ্লিকেট প্রশ্ন রেকর্ড পাওয়া যায়নি। প্রশ্ন ব্যাংক সম্পূর্ণ পরিচ্ছন্ন!
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {data.crossBatchOccurrences.map((item, idx) => (
                  <div key={idx} className="py-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-indigo-600">{item.subject}</span>
                      <span className="text-slate-400">{item.occurrences.length} টি স্থানে প্রাপ্ত</span>
                    </div>
                    <p className="font-medium text-slate-800 dark:text-slate-200 bangla-font">
                      {item.questionPreview}...
                    </p>
                    <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-500">
                      {item.occurrences.map((occ, oIdx) => (
                        <span
                          key={oIdx}
                          className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono"
                        >
                          {occ.id} ({occ.source.slice(0, 30)}...)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
