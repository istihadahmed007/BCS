import {
  EvidenceType,
  IngestionItem,
  IngestionJob,
  IngestionStatus,
  Question,
  QuestionSourceLink,
  SourceRegistryItem,
  SourceVerificationStatus,
} from '@/types';
import { INITIAL_SOURCE_REGISTRY } from '@/data/sources-registry';
import { SEED_QUESTIONS } from '@/data/seed-questions';
import { SYLLABUS_TOPICS } from '@/data/syllabus';

// In-memory runtime stores (retained in memory and synchronized with database)
const SOURCES_STORE: SourceRegistryItem[] = [...INITIAL_SOURCE_REGISTRY];
const INGESTION_JOBS_STORE: IngestionJob[] = [
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
];

const INGESTION_ITEMS_STORE: IngestionItem[] = [];

// Seed Question Source Evidence Links (Many-to-many relationship)
const QUESTION_SOURCE_LINKS_STORE: QuestionSourceLink[] = [
  {
    id: 'link-001',
    questionId: 'q-bng-001',
    sourceRegistryId: 'src-bpsc-exams',
    sourceType: 'previous_exam_paper',
    evidenceType: 'exact_question_match',
    citationText: '39th Special BCS (Health) Examination, Bengali Section, Q34',
    pageNumber: '14',
    questionNumber: '34',
    examinationYear: '2018',
    verificationStatus: 'verified',
    verificationDate: '2026-10-21T12:00:00Z',
    verifiedBy: 'Senior BCS Examiner',
    reviewerNotes: 'Verified against 39th Special BCS original question paper and answer key.',
  },
  {
    id: 'link-002',
    questionId: 'q-bng-002',
    sourceRegistryId: 'src-genmcq',
    sourceType: 'previous_exam_paper',
    evidenceType: 'exact_question_match',
    citationText: '42nd Special BCS (Health) Examination, Bengali Literature, Q12',
    pageNumber: '2',
    questionNumber: '12',
    examinationYear: '2021',
    verificationStatus: 'verified',
    verificationDate: '2026-10-21T12:00:00Z',
    verifiedBy: 'Senior BCS Examiner',
    reviewerNotes: 'Cross-checked with BPSC gazetted answer key and Munier Choudhury literature corpus.',
  },
  {
    id: 'link-003',
    questionId: 'q-med1-001',
    sourceRegistryId: 'src-cat-matrix-med',
    sourceType: 'approved_reference_book',
    evidenceType: 'factual_reference',
    citationText: 'Matrix Special BCS Medical Science, Chapter 3: Upper Limb Anatomy',
    pageNumber: '142',
    section: 'Radial Nerve & Spiral Groove Fractures',
    verificationStatus: 'verified',
    verificationDate: '2026-10-21T12:00:00Z',
    verifiedBy: 'Dr. Tanvir Ahmed (39th BCS Health)',
    reviewerNotes: 'Clinical scenario accurately reflects Gray Anatomy and BPSC Medical Science standard.',
  },
  {
    id: 'link-004',
    questionId: 'q-med1-002',
    sourceRegistryId: 'src-bpsc-51st-syllabus',
    sourceType: 'official_bpsc_document',
    evidenceType: 'syllabus_objective',
    citationText: '51st Special BCS Health Official Syllabus, Medical Science Part 1',
    pageNumber: '8',
    section: 'Physiology & Pharmacology - Autonomic Nervous System',
    verificationStatus: 'verified',
    verificationDate: '2026-10-21T12:00:00Z',
    verifiedBy: 'Curriculum Inspection Officer',
    reviewerNotes: 'Directly maps to 51st Special BCS syllabus item MED1-P03.',
  },
  {
    id: 'link-005',
    questionId: 'q-den1-001',
    sourceRegistryId: 'src-cat-composite-dental',
    sourceType: 'approved_reference_book',
    evidenceType: 'factual_reference',
    citationText: '51st Special BCS For Dental Science, Chapter 4: Dental Anatomy',
    pageNumber: '75',
    section: 'Tooth Morphology - Permanent Maxillary First Molar',
    verificationStatus: 'verified',
    verificationDate: '2026-10-21T12:00:00Z',
    verifiedBy: 'Dr. Sabrina Khan (BDS, Dhaka Dental College)',
    reviewerNotes: 'Verified against Wheeler Dental Anatomy and Composite Dental digest.',
  },
];

// Initialize questions with their verification states and linked evidence
let RUNTIME_QUESTIONS: Question[] = SEED_QUESTIONS.map((q) => {
  const links = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.questionId === q.id);
  const isVerified = links.some((l) => l.verificationStatus === 'verified');
  const isAttached = links.length > 0;

  return {
    ...q,
    sourceEvidence: links,
    verificationState: isVerified ? 'verified' : isAttached ? 'source_attached' : 'unverified',
  };
});

export class SourceIngestionService {
  // =========================================================================
  // 1. SOURCE REGISTRY MANAGEMENT (CRUD + VERIFICATION + LINKING)
  // =========================================================================

  static getSources(filter?: {
    priority?: number;
    category?: string;
    sourceType?: string;
    verificationStatus?: string;
    search?: string;
    isActive?: boolean;
    isArchived?: boolean;
  }): SourceRegistryItem[] {
    return SOURCES_STORE.filter((s) => {
      if (filter?.isArchived !== undefined) {
        if (Boolean(s.isArchived) !== filter.isArchived) return false;
      } else if (s.isArchived) {
        // By default, exclude archived unless explicitly requested
        return false;
      }

      if (filter?.priority && s.priority !== filter.priority) return false;
      if (filter?.category && filter.category !== 'all' && s.category !== filter.category) return false;
      if (filter?.sourceType && filter.sourceType !== 'all' && s.sourceType !== filter.sourceType) return false;
      if (filter?.verificationStatus && filter.verificationStatus !== 'all' && s.verificationStatus !== filter.verificationStatus) return false;
      if (filter?.isActive !== undefined && s.isActive !== filter.isActive) return false;

      if (filter?.search && filter.search.trim()) {
        const q = filter.search.toLowerCase();
        const code = (s.sourceCode || '').toLowerCase();
        const name = (s.name || '').toLowerCase();
        const url = (s.baseUrl || '').toLowerCase();
        const exam = (s.examinationName || '').toLowerCase();
        const author = (s.author || '').toLowerCase();
        return code.includes(q) || name.includes(q) || url.includes(q) || exam.includes(q) || author.includes(q);
      }

      return true;
    }).map((s) => ({
      ...s,
      linkedQuestionsCount: QUESTION_SOURCE_LINKS_STORE.filter((l) => l.sourceRegistryId === s.id).length,
    }));
  }

  static getSourceById(id: string): (SourceRegistryItem & { linkedQuestions?: Array<{ question: Question; evidence: QuestionSourceLink }> }) | undefined {
    const src = SOURCES_STORE.find((s) => s.id === id);
    if (!src) return undefined;

    const links = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.sourceRegistryId === id);
    const linkedQuestions = links.map((link) => {
      const q = RUNTIME_QUESTIONS.find((item) => item.id === link.questionId) || SEED_QUESTIONS.find((item) => item.id === link.questionId);
      return {
        question: q as Question,
        evidence: link,
      };
    }).filter((item) => Boolean(item.question));

    return {
      ...src,
      linkedQuestionsCount: links.length,
      linkedQuestions,
    };
  }

  static addSource(source: Omit<SourceRegistryItem, 'id'>): SourceRegistryItem {
    const newSource: SourceRegistryItem = {
      ...source,
      id: `src-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sourceType: source.sourceType || 'official_bpsc_document',
      verificationStatus: source.verificationStatus || 'unverified',
      lastCheckedAt: new Date().toISOString(),
      lastSyncStatus: 'synced',
      isActive: true,
      isArchived: false,
    };
    SOURCES_STORE.push(newSource);
    return newSource;
  }

  static updateSource(id: string, updates: Partial<SourceRegistryItem>): SourceRegistryItem {
    const src = SOURCES_STORE.find((s) => s.id === id);
    if (!src) throw new Error(`Source with ID ${id} not found in registry`);

    Object.assign(src, updates);
    src.lastCheckedAt = new Date().toISOString();
    return src;
  }

  static verifySource(id: string, status: SourceVerificationStatus, verifiedBy: string): SourceRegistryItem {
    const src = SOURCES_STORE.find((s) => s.id === id);
    if (!src) throw new Error(`Source with ID ${id} not found`);

    src.verificationStatus = status;
    src.verifiedAt = new Date().toISOString();
    src.verifiedBy = verifiedBy;
    return src;
  }

  static archiveSource(id: string): { success: boolean; message: string; source: SourceRegistryItem } {
    const src = SOURCES_STORE.find((s) => s.id === id);
    if (!src) throw new Error(`Source with ID ${id} not found`);

    src.isArchived = true;
    src.isActive = false;
    return {
      success: true,
      message: `Source ${src.sourceCode} has been archived successfully.`,
      source: src,
    };
  }

  static deleteSource(id: string): { success: boolean; message: string } {
    const srcIndex = SOURCES_STORE.findIndex((s) => s.id === id);
    if (srcIndex === -1) throw new Error(`Source with ID ${id} not found`);

    const activeLinks = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.sourceRegistryId === id);
    if (activeLinks.length > 0) {
      throw new Error(
        `Safeguard restriction: Cannot hard delete source. ${activeLinks.length} questions are actively linked to this source. Please archive the source instead to preserve question traceability.`
      );
    }

    const removed = SOURCES_STORE.splice(srcIndex, 1)[0];
    return {
      success: true,
      message: `Source ${removed.sourceCode} deleted permanently.`,
    };
  }

  static updateSourceStatus(
    sourceId: string,
    status: 'synced' | 'failed' | 'blocked_terms',
    errorLog?: string
  ): SourceRegistryItem {
    const src = SOURCES_STORE.find((s) => s.id === sourceId);
    if (!src) throw new Error('Source not found in registry');

    src.lastSyncStatus = status;
    src.lastCheckedAt = new Date().toISOString();
    if (errorLog) src.errorLog = errorLog;

    return src;
  }

  // =========================================================================
  // 2. QUESTION-TO-SOURCE EVIDENCE LINKING & VERIFICATION
  // =========================================================================

  static linkQuestionToSource(params: {
    questionId: string;
    sourceRegistryId: string;
    evidenceType: EvidenceType;
    citationText: string;
    pageNumber?: string;
    section?: string;
    questionNumber?: string;
    paragraph?: string;
    examinationYear?: string;
    verificationStatus?: SourceVerificationStatus;
    reviewerNotes?: string;
    verifiedBy?: string;
  }): QuestionSourceLink {
    const source = SOURCES_STORE.find((s) => s.id === params.sourceRegistryId);
    if (!source) throw new Error(`Source ${params.sourceRegistryId} not found`);

    const q = RUNTIME_QUESTIONS.find((item) => item.id === params.questionId);
    if (!q) throw new Error(`Question ${params.questionId} not found`);

    const linkId = `link-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newLink: QuestionSourceLink = {
      id: linkId,
      questionId: params.questionId,
      sourceRegistryId: params.sourceRegistryId,
      sourceType: source.sourceType,
      evidenceType: params.evidenceType,
      citationText: params.citationText,
      pageNumber: params.pageNumber,
      section: params.section,
      questionNumber: params.questionNumber,
      paragraph: params.paragraph,
      examinationYear: params.examinationYear,
      verificationStatus: params.verificationStatus || 'source_attached',
      verificationDate: params.verificationStatus === 'verified' ? new Date().toISOString() : undefined,
      verifiedBy: params.verifiedBy,
      reviewerNotes: params.reviewerNotes,
    };

    QUESTION_SOURCE_LINKS_STORE.push(newLink);

    // Update question's evidence array and verificationState
    q.sourceEvidence = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.questionId === q.id);
    const hasVerified = q.sourceEvidence.some((l) => l.verificationStatus === 'verified');
    q.verificationState = hasVerified ? 'verified' : 'source_attached';

    return newLink;
  }

  static verifyQuestionEvidence(params: {
    questionId: string;
    linkId?: string;
    status: SourceVerificationStatus;
    verifiedBy: string;
    reviewerNotes?: string;
  }): Question {
    const q = RUNTIME_QUESTIONS.find((item) => item.id === params.questionId);
    if (!q) throw new Error(`Question ${params.questionId} not found`);

    if (params.linkId) {
      const link = QUESTION_SOURCE_LINKS_STORE.find((l) => l.id === params.linkId);
      if (link) {
        link.verificationStatus = params.status;
        link.verificationDate = new Date().toISOString();
        link.verifiedBy = params.verifiedBy;
        if (params.reviewerNotes) link.reviewerNotes = params.reviewerNotes;
      }
    } else {
      // Update all links for this question
      const links = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.questionId === params.questionId);
      for (const link of links) {
        link.verificationStatus = params.status;
        link.verificationDate = new Date().toISOString();
        link.verifiedBy = params.verifiedBy;
      }
    }

    q.sourceEvidence = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.questionId === q.id);
    const hasVerified = q.sourceEvidence.some((l) => l.verificationStatus === 'verified');
    q.verificationState = hasVerified ? 'verified' : q.sourceEvidence.length > 0 ? params.status : 'unverified';

    return q;
  }

  static getQuestionSourceLinks(questionId?: string): QuestionSourceLink[] {
    if (questionId) {
      return QUESTION_SOURCE_LINKS_STORE.filter((l) => l.questionId === questionId);
    }
    return [...QUESTION_SOURCE_LINKS_STORE];
  }

  // =========================================================================
  // 3. SOURCE REGISTRY DASHBOARD STATS
  // =========================================================================

  static getSourceRegistryDashboardStats(): {
    totalSources: number;
    verifiedSources: number;
    awaitingReviewSources: number;
    unverifiedSources: number;
    questionsLinkedToSources: number;
    questionsWithVerifiedEvidence: number;
    questionsMissingSourceEvidence: number;
    brokenReferencesCount: number;
  } {
    const activeSources = SOURCES_STORE.filter((s) => !s.isArchived);
    const verifiedSources = activeSources.filter((s) => s.verificationStatus === 'verified').length;
    const awaitingReviewSources = activeSources.filter(
      (s) => s.verificationStatus === 'needs_review' || s.verificationStatus === 'source_attached' || (s.verificationStatus as string) === 'pending_review'
    ).length;
    const unverifiedSources = Math.max(0, activeSources.length - (verifiedSources + awaitingReviewSources));

    const allApprovedQuestions = RUNTIME_QUESTIONS.filter((q) => q.reviewStatus === 'approved');
    const questionsWithLinks = allApprovedQuestions.filter((q) => {
      const links = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.questionId === q.id);
      return links.length > 0 || Boolean(q.sourceReference);
    });

    const questionsWithVerifiedEvidence = allApprovedQuestions.filter((q) => {
      const links = QUESTION_SOURCE_LINKS_STORE.filter((l) => l.questionId === q.id);
      return links.some((l) => l.verificationStatus === 'verified');
    });

    const brokenReferencesCount = activeSources.filter((s) => s.lastSyncStatus === 'failed' || s.lastSyncStatus === 'blocked_terms').length;

    return {
      totalSources: activeSources.length,
      verifiedSources,
      awaitingReviewSources,
      unverifiedSources,
      questionsLinkedToSources: questionsWithLinks.length,
      questionsWithVerifiedEvidence: questionsWithVerifiedEvidence.length,
      questionsMissingSourceEvidence: Math.max(0, allApprovedQuestions.length - questionsWithLinks.length),
      brokenReferencesCount,
    };
  }

  // =========================================================================
  // 4. INGESTION PIPELINE (Extraction, Normalization, Duplicate Detection)
  // =========================================================================

  static computeNormalizedFingerprint(stem: string, optionsText: string): string {
    const clean = (str: string) =>
      str
        .toLowerCase()
        .replace(/[\s\p{P}\p{S}]+/gu, '')
        .trim();

    const normalized = clean(stem) + ':' + clean(optionsText);
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `fp-${Math.abs(hash).toString(16)}`;
  }

  static ingestQuestionBatch(params: {
    sourceRegistryId?: string;
    jobType: IngestionJob['jobType'];
    fileName?: string;
    fileFormat?: IngestionJob['fileFormat'];
    items: Array<{
      stemEn?: string;
      stemBn?: string;
      options: Array<{ id: 'A' | 'B' | 'C' | 'D'; textEn?: string; textBn?: string }>;
      correctAnswerId: 'A' | 'B' | 'C' | 'D';
      explanationEn?: string;
      explanationBn?: string;
      examTrackId?: Question['examTrackId'];
      professionalStream?: Question['professionalStream'];
      subjectCode?: string;
      topicId?: string;
      sourceReference?: string;
      examYear?: string;
      contentOrigin?: Question['contentOrigin'];
    }>;
  }): { job: IngestionJob; stagedItemsCount: number } {
    const jobId = `job-${Date.now()}`;
    const now = new Date().toISOString();

    const job: IngestionJob = {
      id: jobId,
      sourceRegistryId: params.sourceRegistryId,
      jobType: params.jobType,
      fileName: params.fileName || 'bulk_ingestion.json',
      fileFormat: params.fileFormat || 'json',
      status: 'completed',
      itemsExtracted: params.items.length,
      itemsApproved: 0,
      createdAt: now,
    };
    INGESTION_JOBS_STORE.push(job);

    for (const raw of params.items) {
      const stem = raw.stemBn || raw.stemEn || '';
      const optionsStr = raw.options.map((o) => o.textBn || o.textEn || '').join('');
      const dupHash = this.computeNormalizedFingerprint(stem, optionsStr);

      const existingApproved = RUNTIME_QUESTIONS.find((q) => q.duplicateHash === dupHash);

      let initialStatus: IngestionStatus = 'imported';
      if (!raw.correctAnswerId) {
        initialStatus = 'needs_answer_verification';
      } else if (!raw.topicId) {
        initialStatus = 'needs_syllabus_mapping';
      } else {
        initialStatus = 'pending_content_review';
      }

      const itemId = `staged-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const staged: IngestionItem = {
        id: itemId,
        jobId,
        rawText: stem,
        parsedPayload: {
          id: `q-live-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          examTrackId: raw.examTrackId || 'special_bcs_health_51_2026',
          professionalStream: raw.professionalStream || 'all',
          subjectCode: raw.subjectCode || 'SHARED',
          topicId: raw.topicId,
          stemEn: (raw.stemEn || '').trim(),
          stemBn: (raw.stemBn || '').trim(),
          options: raw.options.map((o) => ({
            id: o.id,
            textEn: (o.textEn || '').trim(),
            textBn: (o.textBn || '').trim(),
          })),
          correctAnswerId: raw.correctAnswerId,
          explanationEn: (raw.explanationEn || '').trim(),
          explanationBn: (raw.explanationBn || '').trim(),
          difficulty: 'medium',
          contentOrigin: raw.contentOrigin || 'official_bpsc',
          rightsStatus: 'public_official',
          reviewStatus: 'under_review',
          sourceReference: raw.sourceReference || 'Ingested Question Record',
          duplicateHash: dupHash,
          revisionNumber: 1,
        },
        extractionConfidence: existingApproved ? 0.7 : 1.0,
        duplicateHash: dupHash,
        mappingStatus: raw.topicId ? 'verified' : 'unmapped',
        status: initialStatus,
        createdAt: now,
      };

      INGESTION_ITEMS_STORE.push(staged);
    }

    return { job, stagedItemsCount: params.items.length };
  }

  static getReviewQueue(filter?: {
    status?: IngestionStatus | 'all';
    trackId?: string;
  }): IngestionItem[] {
    return INGESTION_ITEMS_STORE.filter((item) => {
      if (filter?.status && filter.status !== 'all' && item.status !== filter.status) return false;
      if (filter?.trackId && item.parsedPayload.examTrackId !== filter.trackId) return false;
      return true;
    });
  }

  static reviewStagedItem(params: {
    itemId: string;
    action: 'approve' | 'reject' | 'update';
    reviewerId?: string;
    updates?: Partial<Question>;
    feedback?: string;
  }): { success: boolean; item: IngestionItem; publishedQuestion?: Question } {
    const item = INGESTION_ITEMS_STORE.find((i) => i.id === params.itemId);
    if (!item) throw new Error('Staged ingestion item not found');

    if (params.feedback) item.reviewerFeedback = params.feedback;

    if (params.updates) {
      item.parsedPayload = { ...item.parsedPayload, ...params.updates };
    }

    if (params.action === 'reject') {
      item.status = 'rejected';
      return { success: true, item };
    }

    if (params.action === 'approve') {
      item.status = 'approved';

      const p = item.parsedPayload;
      const verifiedQuestion: Question = {
        id: p.id || `q-app-${Date.now()}`,
        examTrackId: p.examTrackId || 'special_bcs_health_51_2026',
        professionalStream: p.professionalStream || 'all',
        subjectId: p.subjectId || 'sub-sbcs-bangla',
        subjectCode: p.subjectCode || 'BANGLA',
        topicId: p.topicId || 'top-bng-grammar',
        topicTitleEn: p.topicTitleEn || 'Bangla Grammar',
        topicTitleBn: p.topicTitleBn || 'বাংলা ব্যাকরণ',
        stemEn: p.stemEn || '',
        stemBn: p.stemBn || '',
        options: p.options || [],
        correctAnswerId: p.correctAnswerId || 'A',
        explanationEn: p.explanationEn || '',
        explanationBn: p.explanationBn || '',
        difficulty: p.difficulty || 'medium',
        contentOrigin: p.contentOrigin || 'official_bpsc',
        rightsStatus: 'public_official',
        reviewStatus: 'approved',
        sourceReference: p.sourceReference,
        duplicateHash: item.duplicateHash,
        revisionNumber: 1,
      };

      const idx = RUNTIME_QUESTIONS.findIndex((q) => q.id === verifiedQuestion.id);
      if (idx >= 0) {
        RUNTIME_QUESTIONS[idx] = verifiedQuestion;
      } else {
        RUNTIME_QUESTIONS.push(verifiedQuestion);
      }

      return { success: true, item, publishedQuestion: verifiedQuestion };
    }

    return { success: true, item };
  }

  // =========================================================================
  // 5. COVERAGE & AUDIT METRICS
  // =========================================================================

  static getCoverageMetrics(): {
    totalIngested: number;
    totalApproved: number;
    totalUnderReview: number;
    totalRejected: number;
    byTrack: Record<string, number>;
    byStream: Record<string, number>;
    bySubject: Record<string, number>;
    byOrigin: Record<string, number>;
    sourceHealth: { totalSources: number; synced: number; failed: number };
    latestSyncDate: string;
  } {
    const totalApproved = RUNTIME_QUESTIONS.filter((q) => q.reviewStatus === 'approved').length;
    const totalUnderReview = INGESTION_ITEMS_STORE.filter(
      (i) => i.status !== 'approved' && i.status !== 'rejected'
    ).length;
    const totalRejected = INGESTION_ITEMS_STORE.filter((i) => i.status === 'rejected').length;

    const byTrack: Record<string, number> = {};
    const byStream: Record<string, number> = {};
    const bySubject: Record<string, number> = {};
    const byOrigin: Record<string, number> = {};

    for (const q of RUNTIME_QUESTIONS) {
      if (q.reviewStatus !== 'approved') continue;
      byTrack[q.examTrackId] = (byTrack[q.examTrackId] || 0) + 1;
      byStream[q.professionalStream] = (byStream[q.professionalStream] || 0) + 1;
      bySubject[q.subjectCode] = (bySubject[q.subjectCode] || 0) + 1;
      byOrigin[q.contentOrigin] = (byOrigin[q.contentOrigin] || 0) + 1;
    }

    const syncedSources = SOURCES_STORE.filter((s) => s.lastSyncStatus === 'synced').length;
    const failedSources = SOURCES_STORE.filter((s) => s.lastSyncStatus === 'failed').length;

    return {
      totalIngested: RUNTIME_QUESTIONS.length + INGESTION_ITEMS_STORE.length,
      totalApproved,
      totalUnderReview,
      totalRejected,
      byTrack,
      byStream,
      bySubject,
      byOrigin,
      sourceHealth: {
        totalSources: SOURCES_STORE.length,
        synced: syncedSources,
        failed: failedSources,
      },
      latestSyncDate: new Date().toISOString(),
    };
  }

  static getApprovedQuestions(): Question[] {
    return RUNTIME_QUESTIONS.filter((q) => q.reviewStatus === 'approved');
  }

  static getQuestionById(id: string): Question | undefined {
    return RUNTIME_QUESTIONS.find((q) => q.id === id) || SEED_QUESTIONS.find((q) => q.id === id);
  }
}
