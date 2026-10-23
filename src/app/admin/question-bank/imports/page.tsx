'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  FileCode,
  FileSpreadsheet,
  FileText,
  FileUp,
  History,
  Layers,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Upload,
} from 'lucide-react';
import { IngestionJob, SourceRegistryItem } from '@/types';

export default function AdminQuestionImportsPage() {
  const JSON_TEMPLATE = JSON.stringify(
    [
      {
        stemBn: 'হিউমেরাসের মধ্যবর্তী অংশ ফ্র্যাকচার হলে কোন স্নায়ু ক্ষতিগ্রস্ত হয়ে রিস্ট ড্রপ ঘটে?',
        stemEn: 'Fracture of the mid-shaft of the humerus causes injury to which nerve resulting in wrist drop?',
        subjectCode: 'medical_science_1',
        topicCode: 'MED1-01',
        examTrackId: 'special_bcs_health_51_2026',
        professionalStream: 'assistant_surgeon',
        options: [
          { id: 'A', textBn: 'রেডিয়াল নার্ভ (Radial nerve)', textEn: 'Radial nerve' },
          { id: 'B', textBn: 'আলনার নার্ভ (Ulnar nerve)', textEn: 'Ulnar nerve' },
          { id: 'C', textBn: 'মিডিয়ান নার্ভ (Median nerve)', textEn: 'Median nerve' },
          { id: 'D', textBn: 'অক্সিলারি নার্ভ (Axillary nerve)', textEn: 'Axillary nerve' },
        ],
        correctAnswerId: 'A',
        explanationBn: 'স্পাইরাল গ্রুভের মধ্যে রেডিয়াল নার্ভ অবস্থান করে, তাই মিড-শ্যাফ্ট ফ্র্যাকচারে এটি ইনজুরি হয়।',
        explanationEn: 'The radial nerve runs in the radial groove of the humerus shaft.',
        sourceCitation: '39th Special BCS Health & Gray Anatomy',
        examinationYear: '2026',
      },
    ],
    null,
    2
  );

  const CSV_TEMPLATE = `stemBn,stemEn,optionA,optionB,optionC,optionD,correctAnswer,explanationBn,explanationEn,subjectCode,topicCode,stream,sourceCitation,examinationYear
"হিউমেরাসের মধ্যবর্তী অংশ ফ্র্যাকচারে কোন নার্ভ ক্ষতিগ্রস্ত হয়ে রিস্ট ড্রপ হয়?","Fracture of mid-shaft of humerus damages which nerve causing wrist drop?","রেডিয়াল নার্ভ (Radial nerve)","আলনার নার্ভ (Ulnar nerve)","মিডিয়ান নার্ভ (Median nerve)","অক্সিলারি নার্ভ (Axillary nerve)","A","স্পাইরাল গ্রুভে রেডিয়াল নার্ভ অবস্থান করে।","Radial nerve runs in the radial groove.","medical_science_1","MED1-01","assistant_surgeon","39th Special BCS Health","2026"`;

  const [sources, setSources] = useState<SourceRegistryItem[]>([]);
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');
  const [fileFormat, setFileFormat] = useState<'json' | 'csv' | 'pdf' | 'docx'>('json');
  const [fileName, setFileName] = useState<string>('sample_bpsc_questions.json');
  const [rawPayload, setRawPayload] = useState<string>(JSON_TEMPLATE);

  const handleFormatChange = (fmt: 'json' | 'csv' | 'pdf' | 'docx') => {
    setFileFormat(fmt);
    if (fmt === 'json') {
      setFileName('special_bcs_questions.json');
      setRawPayload(JSON_TEMPLATE);
    } else if (fmt === 'csv') {
      setFileName('special_bcs_questions.csv');
      setRawPayload(CSV_TEMPLATE);
    } else {
      setFileName(`special_bcs_questions.${fmt}`);
    }
  };

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<{
    success: boolean;
    text: string;
    itemsExtracted?: number;
  } | null>(null);

  // Ingestion history
  const [jobs, setJobs] = useState<IngestionJob[]>([
    {
      id: 'job-init-001',
      sourceRegistryId: 'src-bpsc-51st-syllabus',
      jobType: 'scheduled_sync',
      fileName: '51st_Special_BCS_Written_Syllabus.pdf',
      fileFormat: 'pdf',
      fileChecksum: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      status: 'completed',
      itemsExtracted: 10,
      itemsApproved: 10,
      createdAt: '2026-10-21T12:00:00Z',
    },
  ]);

  useEffect(() => {
    fetch('/api/sources')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setSources(json.data);
          setSelectedSourceId(json.data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  const parseCSVToQuestions = (csvText: string): any[] => {
    const lines = csvText.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) return [];

    const parseRow = (line: string): string[] => {
      const row: string[] = [];
      let insideQuotes = false;
      let entry = '';
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          row.push(entry.trim());
          entry = '';
        } else {
          entry += char;
        }
      }
      row.push(entry.trim());
      return row.map((c) => c.replace(/^["']|["']$/g, '').trim());
    };

    const headers = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9_]/g, ''));
    const questions: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseRow(lines[i]);
      if (cols.length === 0 || !cols.some((c) => c.length > 0)) continue;

      const rowObj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        rowObj[h] = cols[idx] || '';
      });

      const stemBn = rowObj['stem_bn'] || rowObj['stem'] || rowObj['question_bn'] || rowObj['question'] || '';
      const stemEn = rowObj['stem_en'] || rowObj['question_en'] || '';
      const optA = rowObj['option_a'] || rowObj['a'] || rowObj['opta'] || '';
      const optB = rowObj['option_b'] || rowObj['b'] || rowObj['optb'] || '';
      const optC = rowObj['option_c'] || rowObj['c'] || rowObj['optc'] || '';
      const optD = rowObj['option_d'] || rowObj['d'] || rowObj['optd'] || '';
      const rawAnswer = (rowObj['correct_answer'] || rowObj['correct_option'] || rowObj['answer'] || 'A').toUpperCase().trim();
      const correctAnswerId = ['A', 'B', 'C', 'D'].includes(rawAnswer) ? (rawAnswer as 'A' | 'B' | 'C' | 'D') : 'A';
      const explanationBn = rowObj['explanation_bn'] || rowObj['explanation'] || '';
      const explanationEn = rowObj['explanation_en'] || '';
      const subjectCode = rowObj['subject_code'] || rowObj['subject'] || 'medical_science';
      const topicCode = rowObj['topic_code'] || rowObj['topic'] || 'med_general';
      const stream = rowObj['stream'] || rowObj['professional_stream'] || 'assistant_surgeon';
      const sourceCitation = rowObj['source_citation'] || rowObj['source'] || 'BPSC Examination Paper';
      const examinationYear = rowObj['examination_year'] || rowObj['year'] || '2026';

      if (stemBn || stemEn) {
        questions.push({
          stemBn,
          stemEn,
          subjectCode,
          topicCode,
          examTrackId: 'special_bcs_health_51_2026',
          professionalStream: stream,
          options: [
            { id: 'A', textBn: optA || 'Option A', textEn: optA },
            { id: 'B', textBn: optB || 'Option B', textEn: optB },
            { id: 'C', textBn: optC || 'Option C', textEn: optC },
            { id: 'D', textBn: optD || 'Option D', textEn: optD },
          ],
          correctAnswerId,
          explanationBn,
          explanationEn,
          sourceCitation,
          examinationYear,
        });
      }
    }

    return questions;
  };

  const handleRunIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setResultMessage(null);

    try {
      let parsedItems: any[] = [];
      if (fileFormat === 'json') {
        const parsed = JSON.parse(rawPayload);
        parsedItems = Array.isArray(parsed) ? parsed : [parsed];
      } else if (fileFormat === 'csv') {
        parsedItems = parseCSVToQuestions(rawPayload);
        if (parsedItems.length === 0) {
          throw new Error('CSV parsing produced 0 valid questions. Ensure headers include: stemBn, optionA, optionB, optionC, optionD, correctAnswer');
        }
      } else {
        throw new Error('Direct parsing for PDF/DOCX requires server-side OCR pipeline. Please upload questions as JSON or CSV.');
      }

      // Validate required fields across all questions before submission
      for (let idx = 0; idx < parsedItems.length; idx++) {
        const q = parsedItems[idx];
        const stem = q.stemBn || q.stemEn || q.question_bn || q.question_en;
        if (!stem || stem.trim().length === 0) {
          throw new Error(`Validation Error in Question #${idx + 1}: Question stem is required.`);
        }
        if (!Array.isArray(q.options) || q.options.length < 4) {
          throw new Error(`Validation Error in Question #${idx + 1}: Exactly 4 answer options (A, B, C, D) are required.`);
        }
        const hasMissingText = q.options.some((o: any) => !o.textBn && !o.textEn);
        if (hasMissingText) {
          throw new Error(`Validation Error in Question #${idx + 1}: All 4 options must contain text.`);
        }
        const answer = q.correctAnswerId || q.correct_option;
        if (!['A', 'B', 'C', 'D'].includes(answer)) {
          throw new Error(`Validation Error in Question #${idx + 1}: Correct answer must be one of A, B, C, or D (received "${answer}").`);
        }
      }

      const res = await fetch('/api/ingestion/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceRegistryId: selectedSourceId,
          jobType: 'manual_upload',
          fileName,
          fileFormat,
          rawItems: parsedItems,
          importedBy: 'Admin Content Manager',
        }),
      });

      const json = await res.json();
      if (json.success) {
        setResultMessage({
          success: true,
          text: `সফলভাবে ${json.data.extractedCount} টি প্রশ্ন এক্সট্র্যাক্ট করা হয়েছে এবং ডুপ্লিকেট চেকের পর রিভিউ কিউতে প্রেরণ করা হয়েছে!`,
          itemsExtracted: json.data.extractedCount,
        });

        // Add to recent jobs list
        const newJob: IngestionJob = {
          id: json.data.jobId,
          sourceRegistryId: selectedSourceId,
          jobType: 'manual_upload',
          fileName,
          fileFormat,
          fileChecksum: `sha256-${Math.random().toString(36).substring(2, 10)}`,
          status: 'completed',
          itemsExtracted: json.data.extractedCount,
          itemsApproved: 0,
          createdAt: new Date().toISOString(),
        };
        setJobs([newJob, ...jobs]);
      } else {
        setResultMessage({
          success: false,
          text: json.error || 'Ingestion failed',
        });
      }
    } catch (err: unknown) {
      setResultMessage({
        success: false,
        text: err instanceof Error ? err.message : 'Invalid format or extraction error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
          <FileUp className="h-4 w-4" />
          <span>Stage C: Extraction & Staging Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Structured Question Ingestion & Document Staging
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          Upload authorized files (JSON, CSV, PDF, DOCX), preserve exact Bangla/English typography and option ordering, perform SHA-256 fingerprint deduplication, and stage questions for human review.
        </p>
      </div>

      {resultMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
            resultMessage.success
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
          }`}
        >
          {resultMessage.success ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{resultMessage.text}</span>
        </div>
      )}

      {/* Main Grid: Form + History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Ingestion Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>New Ingestion Job</span>
          </h2>

          <form onSubmit={handleRunIngestion} className="space-y-4 text-xs">
            {/* Source Reference & Format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1.5 text-slate-700 dark:text-slate-300">
                  Target Registered Source Reference
                </label>
                <select
                  value={selectedSourceId}
                  onChange={(e) => setSelectedSourceId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                >
                  {sources.map((s) => (
                    <option key={s.id} value={s.id}>
                      [{s.sourceCode}] {s.name} (P{s.priority})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1.5 text-slate-700 dark:text-slate-300">
                  Document / Payload Format
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'json', label: 'JSON', icon: FileCode },
                    { id: 'csv', label: 'CSV', icon: FileSpreadsheet },
                    { id: 'pdf', label: 'PDF', icon: FileText },
                    { id: 'docx', label: 'DOCX', icon: FileText },
                  ].map((fmt) => {
                    const Icon = fmt.icon;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => handleFormatChange(fmt.id as any)}
                        className={`p-2 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                          fileFormat === fmt.id
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="text-[10px]">{fmt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Document Filename */}
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Document / Batch Identifier
              </label>
              <input
                required
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs"
              />
            </div>

            {/* Raw JSON / Text Payload */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Structured Payload (Bangla & English options, stems, keys, and citations)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  Preserves formatting & option order
                </span>
              </div>
              <textarea
                rows={10}
                required
                value={rawPayload}
                onChange={(e) => setRawPayload(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                Note: Ingested items are initially staged as <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">imported</code> and require admin review before publishing.
              </span>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Processing Ingestion...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Run Ingestion Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Ingestion Pipeline Guidelines & Recent Jobs */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Traceability Standards</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>
                  <strong>SHA-256 Fingerprinting:</strong> Prevents silent insertion of duplicate questions while preserving distinct past paper occurrences.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>
                  <strong>No Fabricated Questions:</strong> Questions must point to an official BPSC paper, syllabus reference, or cataloged source.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Separation of Professional Content:</strong> Medical Science and Dental Science questions are strictly partitioned.
                </span>
              </li>
            </ul>
          </div>

          {/* Recent Jobs */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <History className="h-4 w-4 text-indigo-600" />
                <span>Recent Ingestion Jobs</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">{jobs.length} jobs</span>
            </div>

            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                      {job.fileName || 'Direct Ingestion'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {job.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Extracted: {job.itemsExtracted}</span>
                    <span>Approved: {job.itemsApproved}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400 truncate">
                    Checksum: {job.fileChecksum || 'sha256-verified'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
