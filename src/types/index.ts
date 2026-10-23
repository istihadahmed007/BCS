// ====================================================================
// BCS CRACK — CORE TYPES & DATA MODELS
// ====================================================================

export type ExamTrackId = 'special_bcs_health_51_2026' | 'general_bcs';

export type ProfessionalStreamId = 'assistant_surgeon' | 'assistant_dental_surgeon' | 'general';

export type UserRole =
  | 'student'
  | 'content_editor'
  | 'content_reviewer'
  | 'exam_manager'
  | 'support_operator'
  | 'super_admin';

export type ContentOrigin = 'official_bpsc' | 'licensed_book' | 'expert_authored' | 'ai_generated';

export type RightsStatus = 'public_official' | 'copyrighted_metadata_only' | 'licensed' | 'restricted';

export type ReviewStatus = 'draft' | 'unverified_ai' | 'under_review' | 'approved' | 'rejected' | 'retired';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type WeaknessLabel =
  | 'knowledge_gap'
  | 'retention_problem'
  | 'careless_error'
  | 'time_pressure'
  | 'guessing_risk'
  | 'unassessed'
  | 'mastered';

export type TestType = 'full_mock' | 'subject_test' | 'topic_quiz' | 'diagnostic';

export type TestStatus = 'in_progress' | 'completed' | 'expired' | 'abandoned';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  bmdcRegNumber?: string; // For doctors
  institution?: string;
}

export interface UserEnrollment {
  userId: string;
  examTrackId: ExamTrackId;
  professionalStream: ProfessionalStreamId;
  dailyStudyMinutes: number;
  targetExamDate?: string;
  preferredLanguage: 'bn' | 'en' | 'bilingual';
}

export interface ExamTrack {
  id: ExamTrackId;
  title: string;
  titleBn: string;
  description: string;
  cadreCategory: 'health' | 'general';
  isActive: boolean;
}

export interface ExamConfigVersion {
  id: string;
  examTrackId: ExamTrackId;
  versionTag: string;
  status: 'draft' | 'published' | 'archived';
  effectiveDate: string;
  totalQuestions: number;
  totalMarks: number;
  durationSeconds: number; // 7200 for Special BCS Health (120 min)
  correctMark: number; // 1.0
  wrongPenalty: number; // 0.50
  unansweredMark: number; // 0.0
  vivaMarks: number; // 100
  vivaPassMark: number; // 50
  officialSourceUrl: string;
  reviewedBy?: string;
  notes?: string;
}

export interface ExamSubject {
  id: string;
  examTrackId: ExamTrackId;
  code: string;
  nameEn: string;
  nameBn: string;
  marks: number;
  questionCount: number;
  isProfessional: boolean;
  professionalStream: 'all' | 'assistant_surgeon' | 'assistant_dental_surgeon';
  displayOrder: number;
}

export interface SyllabusTopic {
  id: string;
  subjectId: string;
  parentId?: string;
  topicCode: string;
  titleEn: string;
  titleBn: string;
  description?: string;
  officialSyllabusPage?: string;
  weightageLevel: 'low' | 'medium' | 'high' | 'critical';
  displayOrder: number;
}

export interface CatalogResource {
  id: string;
  code: string; // 'B01'-'B19' or 'S01'-'S03'
  type: 'book' | 'official_source';
  category: string;
  title: string;
  authorEditor?: string;
  publisher?: string;
  editionDate?: string;
  language?: string;
  pageCount?: string;
  coverage?: string;
  recommendedUse: string;
  priority: string;
  caveat?: string;
  rightsStatus: RightsStatus;
  sourceUrl?: string;
  retailPriceObs?: string;
  metadataConfidence: 'High' | 'Medium' | 'Needs inspection';
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  textEn: string;
  textBn: string;
}

export interface Question {
  id: string;
  examTrackId: ExamTrackId;
  professionalStream: 'all' | 'assistant_surgeon' | 'assistant_dental_surgeon';
  subjectId: string;
  subjectCode: string;
  topicId: string;
  topicTitleEn: string;
  topicTitleBn: string;
  stemEn: string;
  stemBn: string;
  options: QuestionOption[];
  correctAnswerId: 'A' | 'B' | 'C' | 'D';
  explanationEn: string;
  explanationBn: string;
  difficulty: DifficultyLevel;
  contentOrigin: ContentOrigin;
  rightsStatus: 'public_official' | 'licensed' | 'original' | 'restricted';
  reviewStatus: ReviewStatus;
  sourceBookCode?: string;
  sourceReference?: string;
  sourceCitation?: string;
  examinationYear?: string;
  duplicateHash?: string;
  revisionNumber: number;
  sourceEvidence?: QuestionSourceLink[];
  verificationState?: 'unverified' | 'source_attached' | 'verified' | 'needs_review';
}

export interface TestSessionQuestion {
  questionId: string;
  sequenceOrder: number;
  stemEn: string;
  stemBn: string;
  options: QuestionOption[];
  correctAnswerId: 'A' | 'B' | 'C' | 'D';
  marks: number;
  negativePenalty: number;
  subjectCode: string;
  topicId: string;
  explanationEn: string;
  explanationBn: string;
}

export interface CandidateResponse {
  questionId: string;
  selectedOptionId?: 'A' | 'B' | 'C' | 'D' | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
  isCorrect?: boolean;
  marksAwarded?: number;
}

export interface TestSession {
  id: string;
  userId: string;
  examTrackId: ExamTrackId;
  professionalStream: ProfessionalStreamId;
  testType: TestType;
  title: string;
  status: TestStatus;
  startTime: string;
  expiresAt: string;
  submittedAt?: string;
  durationSeconds: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  finalScore: number;
  percentage: number;
  idempotencyKey?: string;
  questions: TestSessionQuestion[];
  responses: Record<string, CandidateResponse>;
  subjectBreakdown?: Record<string, { total: number; correct: number; wrong: number; marks: number }>;
  sectionBreakdown?: {
    general: { total: number; correct: number; wrong: number; unanswered: number; marks: number };
    professional: { total: number; correct: number; wrong: number; unanswered: number; marks: number };
  };
}

export interface StudyTask {
  id: string;
  studyPlanId: string;
  topicId: string;
  topicTitleBn: string;
  topicTitleEn: string;
  subjectNameBn: string;
  taskType: 'learn_concept' | 'topic_practice' | 'spaced_revision' | 'mock_exam' | 'mistake_drill';
  title: string;
  reason: string;
  estimatedMinutes: number;
  scheduledDate: string; // YYYY-MM-DD
  status: 'pending' | 'completed' | 'skipped' | 'rescheduled';
  completedAt?: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  examTrackId: ExamTrackId;
  versionNumber: number;
  status: 'active' | 'completed' | 'superseded';
  dailyMinutesBudget: number;
  strategicOverview: string;
  tasks: StudyTask[];
  createdAt: string;
}

export interface TopicMastery {
  topicId: string;
  topicCode: string;
  titleEn: string;
  titleBn: string;
  subjectCode: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracyPct: number;
  avgTimeSeconds: number;
  weaknessLabel: WeaknessLabel;
  lastAttemptAt?: string;
}

export interface MistakeNotebookItem {
  id: string;
  userId: string;
  questionId: string;
  testSessionId?: string;
  userSelectedOptionId?: 'A' | 'B' | 'C' | 'D' | null;
  errorType: WeaknessLabel;
  candidateNotes: string;
  scheduledReviewAt: string;
  retryCount: number;
  resolved: boolean;
  question: Question;
  createdAt: string;
}

export interface AIExplanationRequest {
  questionId: string;
  userSelectedOptionId?: 'A' | 'B' | 'C' | 'D' | null;
  language: 'bn' | 'en' | 'bilingual';
  candidateContext?: string;
}

export interface AIExplanationResponse {
  explanationText: string;
  citedSources: Array<{
    title: string;
    reference: string;
    sourceType: string;
    url?: string;
  }>;
  isEvidenceCertain: boolean;
  uncertaintyDisclaimer?: string;
  modelUsed: string;
}

export type IngestionStatus =
  | 'imported'
  | 'needs_extraction_review'
  | 'needs_answer_verification'
  | 'needs_syllabus_mapping'
  | 'pending_content_review'
  | 'approved'
  | 'rejected'
  | 'retired';

export type DailyPracticeMode =
  | 'mixed'
  | 'subject_wise'
  | 'topic_wise'
  | 'past_papers'
  | 'special_health_common'
  | 'assistant_surgeon_prof'
  | 'assistant_dental_surgeon_prof'
  | 'mistake_notebook'
  | 'revision_due'
  | 'current_affairs';

export type SourceType =
  | 'official_bpsc_document'
  | 'previous_exam_paper'
  | 'official_gazette'
  | 'approved_reference_book'
  | 'other';

export type SourceVerificationStatus = 'unverified' | 'source_attached' | 'verified' | 'needs_review';

export interface SourceRegistryItem {
  id: string;
  sourceCode: string;
  name: string;
  sourceType: SourceType;
  priority: 1 | 2 | 3 | 4;
  category: 'official_bpsc' | 'previous_year_archive' | 'authorized_book' | 'expert_authored';
  examinationName?: string;
  publicationYear?: string;
  author?: string;
  publisher?: string;
  edition?: string;
  volume?: string;
  pageNumber?: string;
  baseUrl: string;
  documentReference?: string;
  termsSummary?: string;
  rightsStatus: 'public_domain' | 'metadata_only' | 'licensed' | 'restricted';
  syncSchedule: 'manual' | 'daily' | 'weekly';
  lastCheckedAt?: string;
  lastSyncStatus: 'pending' | 'synced' | 'failed' | 'blocked_terms';
  verificationStatus: SourceVerificationStatus;
  verifiedAt?: string;
  verifiedBy?: string;
  errorLog?: string;
  isActive: boolean;
  isArchived?: boolean;
  notes?: string;
  linkedQuestionsCount?: number;
}

export interface IngestionJob {
  id: string;
  sourceRegistryId?: string;
  jobType: 'scheduled_sync' | 'manual_upload' | 'file_import';
  fileName?: string;
  fileFormat?: 'pdf' | 'docx' | 'csv' | 'json' | 'web_html';
  fileChecksum?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  itemsExtracted: number;
  itemsApproved: number;
  errorMessage?: string;
  createdAt: string;
}

export interface IngestionItem {
  id: string;
  jobId: string;
  rawText: string;
  parsedPayload: Partial<Question>;
  extractionConfidence: number;
  duplicateHash?: string;
  mappingStatus: 'unmapped' | 'auto_mapped' | 'verified';
  status: IngestionStatus;
  reviewerFeedback?: string;
  createdAt: string;
}

export type EvidenceType =
  | 'exact_question_match'
  | 'syllabus_objective'
  | 'factual_reference'
  | 'circular_rule';

export interface QuestionSourceLink {
  id: string;
  questionId: string;
  sourceRegistryId: string;
  sourceType: SourceType | 'official_circular' | 'past_paper' | 'reference_book' | 'online_archive';
  evidenceType: EvidenceType;
  citationText: string;
  pageNumber?: string;
  section?: string;
  questionNumber?: string;
  paragraph?: string;
  examinationYear?: string;
  verificationStatus: SourceVerificationStatus | 'disputed';
  verificationDate?: string;
  verifiedBy?: string;
  reviewerNotes?: string;
}

export type MistakeClassificationType =
  | 'conceptual_misunderstanding'
  | 'forgotten_fact'
  | 'confused_options'
  | 'misread_question'
  | 'calculation_error'
  | 'guessing_or_low_confidence'
  | 'knowledge_gap'
  | 'retention_problem'
  | 'careless_error'
  | 'time_pressure'
  | 'guessing_risk';

export interface MistakeNotebookEntry {
  id: string;
  userId: string;
  questionId: string;
  question: Question;
  testSessionId?: string;
  userSelectedOption: 'A' | 'B' | 'C' | 'D' | null;
  correctOption: 'A' | 'B' | 'C' | 'D';
  errorType: MistakeClassificationType;
  candidateNotes: string;
  retryCount: number;
  resolved: boolean;
  resolvedAt?: string;
  scheduledReviewAt: string;
  reviewStatus: 'due_today' | 'upcoming' | 'recently_added' | 'frequently_repeated' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface DailyPracticeSet {
  id: string;
  userId: string;
  examTrackId: ExamTrackId;
  professionalStream: ProfessionalStreamId;
  practiceMode: DailyPracticeMode;
  questionCount: number;
  completedCount: number;
  correctCount: number;
  wrongCount: number;
  accuracyPct: number;
  timeSpentSeconds: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  questions: DailyPracticeQuestion[];
  createdAt: string;
}

export interface DailyPracticeQuestion {
  id: string;
  practiceSetId: string;
  question: Question;
  sequenceOrder: number;
  userSelectedOption?: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect?: boolean;
  timeSpentSeconds: number;
  isBookmarked: boolean;
  flaggedForReview: boolean;
  addedToMistakeNotebook: boolean;
}

export interface CurrentAffairsItem {
  id: string;
  headline: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  publicationDate: string;
  verifiedAt: string;
  isPublished: boolean;
}
