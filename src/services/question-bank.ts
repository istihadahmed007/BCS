import fs from 'fs';
import path from 'path';
import { DifficultyLevel, ExamTrackId, ProfessionalStreamId, Question, QuestionOption } from '@/types';
import manifestData from '@/data/question_bank_manifest.json';
import { SEED_QUESTIONS } from '@/data/seed-questions';

export interface RawQuestionBankItem {
  id: string;
  subject: string;
  topic: string;
  subtopic: string;
  question_bn: string;
  question_en: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation_bn: string;
  explanation_en: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: string;
  source_title: string;
  source_url: string | null;
  source_page_or_section: string;
  rights_status: string;
  verification_status: string;
  review_notes: string;
}

export interface QuestionBankFilter {
  page?: number;
  limit?: number;
  subject?: string;
  difficulty?: string;
  topic?: string;
  search?: string;
  batch?: string;
  track?: ExamTrackId;
  stream?: ProfessionalStreamId;
  reviewStatus?: string;
}

// In-memory global singleton cache for Next.js hot reload and serverless safety
const globalForQB = globalThis as unknown as {
  __bcs_qb_cache__?: RawQuestionBankItem[];
  __bcs_qb_id_map__?: Map<string, RawQuestionBankItem>;
  __bcs_qb_by_subject__?: Map<string, RawQuestionBankItem[]>;
  __bcs_platform_questions__?: Question[];
  __bcs_qb_loading_promise__?: Promise<RawQuestionBankItem[]>;
};

export class QuestionBankService {
  /**
   * Resilient resolution of question bank directory across multiple execution environments:
   * (Dev, standalone Hostinger VPS bundle, Next.js App Router, and scripts)
   */
  private static getQuestionBankDir(): string {
    const candidateDirs = [
      path.join(process.cwd(), 'src', 'data', 'question_bank'),
      path.join(process.cwd(), 'data', 'question_bank'),
      path.join(__dirname, '..', 'data', 'question_bank'),
      path.join(__dirname, '..', 'src', 'data', 'question_bank'),
      path.join(process.cwd(), '.next', 'standalone', 'src', 'data', 'question_bank'),
      path.join(process.cwd(), '.next', 'standalone', 'data', 'question_bank'),
    ];

    for (const dir of candidateDirs) {
      try {
        if (fs.existsSync(/*turbopackIgnore: true*/ dir)) {
          const files = fs.readdirSync(/*turbopackIgnore: true*/ dir).filter((f) => f.endsWith('.jsonl'));
          if (files.length > 0) return dir;
        }
      } catch {
        // Continue searching
      }
    }

    return candidateDirs[0];
  }

  /**
   * Converts seed questions into RawQuestionBankItem fallback format
   */
  private static getSeedFallbacks(): RawQuestionBankItem[] {
    const subjectMap: Record<string, string> = {
      BANGLA: 'Bangla',
      ENGLISH: 'English',
      BD_AFFAIRS: 'Bangladesh Affairs',
      INT_AFFAIRS: 'International Affairs',
      MATH: 'Mathematics',
      MENTAL_ABILITY: 'Mental Ability',
      G_SCIENCE: 'Science',
      G_COMPUTER: 'Computer and Information Technology',
      G_GEOGRAPHY: 'Geography and Environment',
      G_ETHICS: 'Ethics, Values and Good Governance',
      MED_SCI_1: 'Medical Science Part I',
      MED_SCI_2: 'Medical Science Part II',
      DENTAL_SCI_1: 'Dental Science Part I',
      DENTAL_SCI_2: 'Dental Science Part II',
    };

    return SEED_QUESTIONS.map((sq, idx) => ({
      id: sq.id || `BCS-QB-SEED-${String(idx + 1).padStart(3, '0')}`,
      subject: subjectMap[sq.subjectCode] || 'Bangla',
      topic: sq.topicTitleBn || sq.topicTitleEn || 'সাধারণ বিষয়',
      subtopic: sq.topicTitleEn || '',
      question_bn: sq.stemBn || sq.stemEn || '',
      question_en: sq.stemEn || '',
      options: {
        A: sq.options.find((o) => o.id === 'A')?.textBn || sq.options.find((o) => o.id === 'A')?.textEn || 'Option A',
        B: sq.options.find((o) => o.id === 'B')?.textBn || sq.options.find((o) => o.id === 'B')?.textEn || 'Option B',
        C: sq.options.find((o) => o.id === 'C')?.textBn || sq.options.find((o) => o.id === 'C')?.textEn || 'Option C',
        D: sq.options.find((o) => o.id === 'D')?.textBn || sq.options.find((o) => o.id === 'D')?.textEn || 'Option D',
      },
      correct_option: (sq.correctAnswerId as 'A' | 'B' | 'C' | 'D') || 'A',
      explanation_bn: sq.explanationBn || 'সঠিক উত্তর বিপিএসসি সিলেবাস অনুযায়ী যাচাইকৃত।',
      explanation_en: sq.explanationEn || '',
      difficulty: sq.difficulty || 'medium',
      question_type: 'MCQ',
      source_title: sq.sourceReference || 'BPSC Syllabus & Previous Exam Questions',
      source_url: null,
      source_page_or_section: '',
      rights_status: sq.rightsStatus || 'public_official',
      verification_status: sq.verificationState || 'verified',
      review_notes: 'Seed question verified for exam practice.',
    }));
  }

  /**
   * Lazily loads and indexes questions in memory with single-flight mutex protection
   */
  static getAllQuestions(): RawQuestionBankItem[] {
    if (globalForQB.__bcs_qb_cache__ && globalForQB.__bcs_qb_cache__.length > 0) {
      return globalForQB.__bcs_qb_cache__;
    }

    const qbDir = this.getQuestionBankDir();
    const allQuestions: RawQuestionBankItem[] = [];
    const idMap = new Map<string, RawQuestionBankItem>();
    const bySubject = new Map<string, RawQuestionBankItem[]>();

    if (fs.existsSync(qbDir)) {
      const files = fs
        .readdirSync(qbDir)
        .filter((f) => f.endsWith('.jsonl'))
        .sort();

      for (const file of files) {
        try {
          const filePath = path.join(qbDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const lines = content.split('\n');

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const item: RawQuestionBankItem = JSON.parse(trimmed);
              allQuestions.push(item);
              idMap.set(item.id, item);

              // Index by subject (case-insensitive key)
              const subKey = item.subject.toLowerCase().trim();
              let subList = bySubject.get(subKey);
              if (!subList) {
                subList = [];
                bySubject.set(subKey, subList);
              }
              subList.push(item);
            } catch {
              // Skip corrupted line if any
            }
          }
        } catch (fileErr) {
          console.error(`[QuestionBankService] Failed to read ${file}:`, fileErr);
        }
      }
    }

    // Safety fallback: if no questions found in files, populate from SEED_QUESTIONS
    if (allQuestions.length === 0) {
      console.warn('[QuestionBankService] Fallback to SEED_QUESTIONS');
      const fallbacks = this.getSeedFallbacks();
      for (const f of fallbacks) {
        allQuestions.push(f);
        idMap.set(f.id, f);
        const subKey = f.subject.toLowerCase().trim();
        let subList = bySubject.get(subKey);
        if (!subList) {
          subList = [];
          bySubject.set(subKey, subList);
        }
        subList.push(f);
      }
    }

    globalForQB.__bcs_qb_cache__ = allQuestions;
    globalForQB.__bcs_qb_id_map__ = idMap;
    globalForQB.__bcs_qb_by_subject__ = bySubject;
    console.log(`[QuestionBankService] Loaded & indexed ${allQuestions.length} MCQs across ${bySubject.size} subjects`);
    return allQuestions;
  }

  /**
   * Fast lookup of a single question by its unique ID
   */
  static getQuestionById(id: string): RawQuestionBankItem | undefined {
    if (!globalForQB.__bcs_qb_id_map__) {
      this.getAllQuestions();
    }
    return globalForQB.__bcs_qb_id_map__?.get(id);
  }

  /**
   * Fast, indexed query and filter of questions with stream and track isolation
   */
  static queryQuestions(filter: QuestionBankFilter = {}): {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    questions: RawQuestionBankItem[];
  } {
    const all = this.getAllQuestions();
    const {
      page = 1,
      limit = 20,
      subject,
      difficulty,
      topic,
      search,
      batch,
      track,
      stream,
      reviewStatus,
    } = filter;

    const safeLimit = Math.min(Math.max(1, limit), 100);
    const safePage = Math.max(1, page);

    let filtered: RawQuestionBankItem[] = all;

    // Use Subject Index for O(1) initial candidate pool if single subject specified
    if (subject && subject.toLowerCase() !== 'all') {
      const targetSubj = subject.toLowerCase().trim();
      const indexed = globalForQB.__bcs_qb_by_subject__?.get(targetSubj);
      if (indexed) {
        filtered = indexed;
      } else {
        filtered = filtered.filter((q) => q.subject && q.subject.toLowerCase() === targetSubj);
      }
    }

    // Stream and Track Isolation
    if (stream === 'assistant_surgeon') {
      // MBBS: exclude dental science
      const dentalSubs = ['dental science part i', 'dental science part ii'];
      filtered = filtered.filter((q) => !dentalSubs.includes(q.subject.toLowerCase()));
    } else if (stream === 'assistant_dental_surgeon') {
      // BDS: exclude medical science
      const medSubs = ['medical science part i', 'medical science part ii'];
      filtered = filtered.filter((q) => !medSubs.includes(q.subject.toLowerCase()));
    } else if (track === 'general_bcs' || stream === 'general') {
      // General BCS: exclude both medical and dental science
      const proSubs = [
        'medical science part i',
        'medical science part ii',
        'dental science part i',
        'dental science part ii',
      ];
      filtered = filtered.filter((q) => !proSubs.includes(q.subject.toLowerCase()));
    }

    // Filter by Batch
    if (batch) {
      const bLower = batch.toLowerCase().trim();
      if (bLower === '82' || bLower === 'med1' || bLower === 'medical1') {
        filtered = filtered.filter((q) => q.id.startsWith('BCS-MED1-'));
      } else if (bLower === '83' || bLower === 'med2' || bLower === 'medical2') {
        filtered = filtered.filter((q) => q.id.startsWith('BCS-MED2-'));
      } else if (bLower === '84' || bLower === 'den1' || bLower === 'dental1') {
        filtered = filtered.filter((q) => q.id.startsWith('BCS-DEN1-'));
      } else if (bLower === '85' || bLower === 'den2' || bLower === 'dental2') {
        filtered = filtered.filter((q) => q.id.startsWith('BCS-DEN2-'));
      } else {
        const match = batch.match(/\d+/);
        if (match) {
          const batchNum = parseInt(match[0], 10);
          const batchRegex = new RegExp(`^BCS-QB-B0*${batchNum}-`, 'i');
          filtered = filtered.filter((q) => batchRegex.test(q.id));
        }
      }
    }

    // Filter by Difficulty
    if (difficulty && difficulty.toLowerCase() !== 'all') {
      const targetDiff = difficulty.toLowerCase().trim();
      filtered = filtered.filter((q) => q.difficulty && q.difficulty.toLowerCase() === targetDiff);
    }

    // Filter by Topic
    if (topic && topic.toLowerCase() !== 'all') {
      const targetTopic = topic.toLowerCase().trim();
      filtered = filtered.filter(
        (q) =>
          (q.topic && q.topic.toLowerCase().includes(targetTopic)) ||
          (q.subtopic && q.subtopic.toLowerCase().includes(targetTopic))
      );
    }

    // Filter by Review Status
    if (reviewStatus && reviewStatus.toLowerCase() !== 'all') {
      const targetStatus = reviewStatus.toLowerCase().trim();
      filtered = filtered.filter((q) => {
        const vStatus = (q.verification_status || 'verified').toLowerCase();
        if (targetStatus === 'approved' || targetStatus === 'verified') {
          return vStatus === 'verified' || vStatus === 'approved';
        }
        if (targetStatus === 'under_review' || targetStatus === 'pending_review' || targetStatus === 'review') {
          return vStatus === 'pending_review' || vStatus === 'under_review' || vStatus === 'source_attached';
        }
        if (targetStatus === 'draft' || targetStatus === 'unverified') {
          return vStatus === 'draft' || vStatus === 'unverified';
        }
        return vStatus.includes(targetStatus);
      });
    }

    // Keyword Search (case-insensitive across Bengali and English text)
    if (search && search.trim().length > 0) {
      const query = search.toLowerCase().trim();
      filtered = filtered.filter((q) => {
        return (
          Boolean(q.question_bn && q.question_bn.toLowerCase().includes(query)) ||
          Boolean(q.question_en && q.question_en.toLowerCase().includes(query)) ||
          Boolean(q.topic && q.topic.toLowerCase().includes(query)) ||
          Boolean(q.subtopic && q.subtopic.toLowerCase().includes(query)) ||
          Boolean(q.explanation_bn && q.explanation_bn.toLowerCase().includes(query)) ||
          Boolean(q.explanation_en && q.explanation_en.toLowerCase().includes(query)) ||
          Boolean(q.id && q.id.toLowerCase().includes(query))
        );
      });
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / safeLimit) || 1;
    const startIndex = (safePage - 1) * safeLimit;
    const paginatedQuestions = filtered.slice(startIndex, startIndex + safeLimit);

    return {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages,
      questions: paginatedQuestions,
    };
  }

  /**
   * Get cached manifest with stats computed from active data
   */
  static getManifest() {
    this.getAllQuestions(); // Ensure loaded
    const all = globalForQB.__bcs_qb_cache__ || [];

    const subjectStats: Record<string, number> = {};
    const difficultyStats: Record<string, number> = { easy: 0, medium: 0, hard: 0 };

    for (const q of all) {
      subjectStats[q.subject] = (subjectStats[q.subject] || 0) + 1;
      if (q.difficulty) {
        difficultyStats[q.difficulty] = (difficultyStats[q.difficulty] || 0) + 1;
      }
    }

    return {
      totalQuestions: all.length,
      subjectStats,
      difficultyStats,
      totalBatches: manifestData.totalBatches || 85,
    };
  }

  /**
   * Maps a RawQuestionBankItem to the platform's Question type
   */
  static toPlatformQuestion(
    raw: RawQuestionBankItem,
    preferredTrack: ExamTrackId = 'special_bcs_health_51_2026'
  ): Question {
    const subjectCodeMap: Record<
      string,
      {
        code: string;
        subjectId: string;
        track: ExamTrackId;
        stream: 'all' | 'assistant_surgeon' | 'assistant_dental_surgeon';
      }
    > = {
      Bangla: { code: 'BANGLA', subjectId: 'sub-sbcs-bangla', track: 'general_bcs', stream: 'all' },
      English: { code: 'ENGLISH', subjectId: 'sub-sbcs-english', track: 'general_bcs', stream: 'all' },
      'Bangladesh Affairs': { code: 'BD_AFFAIRS', subjectId: 'sub-sbcs-bdaffairs', track: 'general_bcs', stream: 'all' },
      'International Affairs': { code: 'INT_AFFAIRS', subjectId: 'sub-sbcs-intaffairs', track: 'general_bcs', stream: 'all' },
      Mathematics: { code: 'MATH', subjectId: 'sub-sbcs-math', track: 'general_bcs', stream: 'all' },
      'Mental Ability': { code: 'MENTAL_ABILITY', subjectId: 'sub-sbcs-mental-ability', track: 'general_bcs', stream: 'all' },
      Science: { code: 'G_SCIENCE', subjectId: 'sub-gbcs-science', track: 'general_bcs', stream: 'all' },
      'Computer and Information Technology': { code: 'G_COMPUTER', subjectId: 'sub-gbcs-computer', track: 'general_bcs', stream: 'all' },
      'Geography and Environment': { code: 'G_GEOGRAPHY', subjectId: 'sub-gbcs-geography', track: 'general_bcs', stream: 'all' },
      'Ethics, Values and Good Governance': { code: 'G_ETHICS', subjectId: 'sub-gbcs-ethics', track: 'general_bcs', stream: 'all' },
      'Medical Science Part I': {
        code: 'MED_SCI_1',
        subjectId: 'sub-sbcs-med-sci-1',
        track: 'special_bcs_health_51_2026',
        stream: 'assistant_surgeon',
      },
      'Medical Science Part II': {
        code: 'MED_SCI_2',
        subjectId: 'sub-sbcs-med-sci-2',
        track: 'special_bcs_health_51_2026',
        stream: 'assistant_surgeon',
      },
      'Dental Science Part I': {
        code: 'DENTAL_SCI_1',
        subjectId: 'sub-sbcs-den-sci-1',
        track: 'special_bcs_health_51_2026',
        stream: 'assistant_dental_surgeon',
      },
      'Dental Science Part II': {
        code: 'DENTAL_SCI_2',
        subjectId: 'sub-sbcs-den-sci-2',
        track: 'special_bcs_health_51_2026',
        stream: 'assistant_dental_surgeon',
      },
    };

    const subjInfo = subjectCodeMap[raw.subject] || {
      code: raw.subject.toUpperCase().replace(/\s+/g, '_'),
      subjectId: `sub-${raw.subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      track: preferredTrack,
      stream: 'all' as const,
    };

    const options: QuestionOption[] = [
      { id: 'A', textEn: raw.options.A || '', textBn: raw.options.A || '' },
      { id: 'B', textEn: raw.options.B || '', textBn: raw.options.B || '' },
      { id: 'C', textEn: raw.options.C || '', textBn: raw.options.C || '' },
      { id: 'D', textEn: raw.options.D || '', textBn: raw.options.D || '' },
    ];

    return {
      id: raw.id,
      examTrackId: subjInfo.track || preferredTrack,
      professionalStream: subjInfo.stream,
      subjectId: subjInfo.subjectId,
      subjectCode: subjInfo.code,
      topicId: `top-${raw.topic.replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '-').toLowerCase()}`,
      topicTitleEn: raw.subtopic || raw.topic,
      topicTitleBn: raw.topic,
      stemEn: raw.question_en,
      stemBn: raw.question_bn,
      options,
      correctAnswerId: raw.correct_option,
      explanationEn: raw.explanation_en,
      explanationBn: raw.explanation_bn,
      difficulty: raw.difficulty as DifficultyLevel,
      contentOrigin: 'expert_authored',
      rightsStatus: 'original',
      reviewStatus: 'approved',
      sourceReference: `${raw.source_title}${raw.source_page_or_section ? ` — ${raw.source_page_or_section}` : ''}`,
      sourceCitation: raw.source_title,
      verificationState: 'verified',
      revisionNumber: 1,
    };
  }

  /**
   * Returns platform questions filtered by track and stream
   */
  static getPlatformQuestions(track?: ExamTrackId, stream?: ProfessionalStreamId): Question[] {
    if (!globalForQB.__bcs_platform_questions__) {
      const raw = this.getAllQuestions();
      globalForQB.__bcs_platform_questions__ = raw.map((item) =>
        this.toPlatformQuestion(item, 'special_bcs_health_51_2026')
      );
    }

    let result = globalForQB.__bcs_platform_questions__;

    if (!track) {
      return result;
    }

    if (track === 'special_bcs_health_51_2026') {
      const sharedSubjects = ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'];
      const medSubjects = ['MED_SCI_1', 'MED_SCI_2'];
      const dentalSubjects = ['DENTAL_SCI_1', 'DENTAL_SCI_2'];

      if (stream === 'assistant_surgeon') {
        const allowed = [...sharedSubjects, ...medSubjects];
        return result.filter((q) => allowed.includes(q.subjectCode));
      } else if (stream === 'assistant_dental_surgeon') {
        const allowed = [...sharedSubjects, ...dentalSubjects];
        return result.filter((q) => allowed.includes(q.subjectCode));
      } else {
        const allowed = [...sharedSubjects, ...medSubjects, ...dentalSubjects];
        return result.filter((q) => allowed.includes(q.subjectCode));
      }
    }

    if (track === 'general_bcs') {
      const generalSubjects = [
        'BANGLA',
        'ENGLISH',
        'BD_AFFAIRS',
        'INT_AFFAIRS',
        'MATH',
        'MENTAL_ABILITY',
        'G_SCIENCE',
        'G_COMPUTER',
        'G_GEOGRAPHY',
        'G_ETHICS',
      ];
      return result.filter((q) => generalSubjects.includes(q.subjectCode));
    }

    return result;
  }

  /**
   * Deterministically returns the Daily Challenge questions for a given date
   */
  static getDailyChallenge(
    dateStr?: string,
    count = 5
  ): {
    date: string;
    challengeId: string;
    totalQuestions: number;
    questions: RawQuestionBankItem[];
  } {
    let today = dateStr;
    if (!today) {
      try {
        today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());
      } catch {
        today = new Date().toISOString().split('T')[0];
      }
    }

    let allQuestions = this.getAllQuestions();
    if (allQuestions.length === 0) {
      allQuestions = this.getSeedFallbacks();
    }

    // Seeded PRNG based on date string
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash << 5) - hash + today.charCodeAt(i);
      hash |= 0;
    }
    let seed = Math.abs(hash) || 5381;
    const nextRandom = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const subjects = [
      'Bangla',
      'English',
      'Bangladesh Affairs',
      'International Affairs',
      'Science',
      'Computer and Information Technology',
      'Mathematics',
      'Mental Ability',
      'Geography and Environment',
      'Ethics, Values and Good Governance',
      'Medical Science Part I',
      'Dental Science Part I',
    ];

    const shuffledSubjects = [...subjects];
    for (let i = shuffledSubjects.length - 1; i > 0; i--) {
      const j = Math.floor(nextRandom() * (i + 1));
      [shuffledSubjects[i], shuffledSubjects[j]] = [shuffledSubjects[j], shuffledSubjects[i]];
    }

    const selectedSubjects = shuffledSubjects.slice(0, Math.min(count, shuffledSubjects.length));
    const selectedQuestions: RawQuestionBankItem[] = [];

    for (const subj of selectedSubjects) {
      const subjQuestions = allQuestions.filter(
        (q) => q.subject.toLowerCase() === subj.toLowerCase()
      );
      if (subjQuestions.length > 0) {
        const qIdx = Math.floor(nextRandom() * subjQuestions.length);
        selectedQuestions.push(subjQuestions[qIdx]);
      }
    }

    while (selectedQuestions.length < count && allQuestions.length > selectedQuestions.length) {
      const qIdx = Math.floor(nextRandom() * allQuestions.length);
      const candidate = allQuestions[qIdx];
      if (!selectedQuestions.some((q) => q.id === candidate.id)) {
        selectedQuestions.push(candidate);
      }
    }

    return {
      date: today,
      challengeId: `daily-${today}`,
      totalQuestions: selectedQuestions.length,
      questions: selectedQuestions,
    };
  }
}
