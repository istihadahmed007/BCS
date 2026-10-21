import fs from 'fs';
import path from 'path';
import { DifficultyLevel, ExamTrackId, Question, QuestionOption } from '@/types';
import manifestData from '@/data/question_bank_manifest.json';

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
}

// In-memory global singleton cache for Next.js hot reload safety
const globalForQB = globalThis as unknown as {
  __bcs_qb_cache__?: RawQuestionBankItem[];
  __bcs_qb_id_map__?: Map<string, RawQuestionBankItem>;
  __bcs_platform_questions__?: Question[];
};

export class QuestionBankService {
  private static getQuestionBankDir(): string {
    return path.join(process.cwd(), 'src', 'data', 'question_bank');
  }

  /**
   * Lazily loads and caches all 20,000 questions in memory
   */
  static getAllQuestions(): RawQuestionBankItem[] {
    if (globalForQB.__bcs_qb_cache__) {
      return globalForQB.__bcs_qb_cache__;
    }

    const qbDir = this.getQuestionBankDir();
    if (!fs.existsSync(qbDir)) {
      console.warn(`[QuestionBankService] Directory not found: ${qbDir}`);
      return [];
    }

    const files = fs
      .readdirSync(qbDir)
      .filter((f) => f.endsWith('.jsonl'))
      .sort();

    const allQuestions: RawQuestionBankItem[] = [];
    const idMap = new Map<string, RawQuestionBankItem>();

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
          } catch (parseErr) {
            // Skip corrupted line if any
          }
        }
      } catch (fileErr) {
        console.error(`[QuestionBankService] Failed to read ${file}:`, fileErr);
      }
    }

    globalForQB.__bcs_qb_cache__ = allQuestions;
    globalForQB.__bcs_qb_id_map__ = idMap;
    console.log(`[QuestionBankService] Cached ${allQuestions.length} MCQs in memory`);
    return allQuestions;
  }

  /**
   * Fast lookup of a single question by its unique ID (e.g., BCS-QB-B01-001)
   */
  static getQuestionById(id: string): RawQuestionBankItem | undefined {
    if (!globalForQB.__bcs_qb_id_map__) {
      this.getAllQuestions();
    }
    return globalForQB.__bcs_qb_id_map__?.get(id);
  }

  /**
   * Filter and paginate questions
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
    } = filter;

    const safeLimit = Math.min(Math.max(1, limit), 100);
    const safePage = Math.max(1, page);

    let filtered = all;

    // Filter by Batch (e.g., '001' or 'batch_001.jsonl' or '1')
    if (batch) {
      const normalizedBatch = batch.replace(/\.jsonl$/, '').replace(/^batch_/, '');
      const padded = normalizedBatch.padStart(3, '0');
      const prefix = `BCS-QB-B${padded.slice(1)}`; // B01..B81
      filtered = filtered.filter((q) => q.id.startsWith(prefix) || q.id.includes(`-B${padded.slice(1)}-`));
    }

    // Filter by Subject
    if (subject && subject.toLowerCase() !== 'all') {
      const targetSubj = subject.toLowerCase().trim();
      filtered = filtered.filter((q) => q.subject.toLowerCase() === targetSubj);
    }

    // Filter by Difficulty
    if (difficulty && difficulty.toLowerCase() !== 'all') {
      const targetDiff = difficulty.toLowerCase().trim();
      filtered = filtered.filter((q) => q.difficulty.toLowerCase() === targetDiff);
    }

    // Filter by Topic
    if (topic && topic.toLowerCase() !== 'all') {
      const targetTopic = topic.toLowerCase().trim();
      filtered = filtered.filter((q) => q.topic.toLowerCase().includes(targetTopic));
    }

    // Keyword Search (case-insensitive across Bengali and English text)
    if (search && search.trim().length > 0) {
      const query = search.toLowerCase().trim();
      filtered = filtered.filter((q) => {
        return (
          q.question_bn.toLowerCase().includes(query) ||
          q.question_en.toLowerCase().includes(query) ||
          q.topic.toLowerCase().includes(query) ||
          q.subtopic.toLowerCase().includes(query) ||
          q.explanation_bn.toLowerCase().includes(query) ||
          q.explanation_en.toLowerCase().includes(query) ||
          q.id.toLowerCase().includes(query)
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
   * Get cached manifest with stats
   */
  static getManifest() {
    return manifestData;
  }

  /**
   * Maps a RawQuestionBankItem to the platform's Question type
   */
  static toPlatformQuestion(
    raw: RawQuestionBankItem,
    preferredTrack: ExamTrackId = 'general_bcs'
  ): Question {
    const subjectCodeMap: Record<string, { code: string; subjectId: string }> = {
      Bangla: { code: 'BANGLA', subjectId: 'sub-sbcs-bangla' },
      English: { code: 'ENGLISH', subjectId: 'sub-sbcs-english' },
      'Bangladesh Affairs': { code: 'BD_AFFAIRS', subjectId: 'sub-sbcs-bdaffairs' },
      'International Affairs': { code: 'INT_AFFAIRS', subjectId: 'sub-sbcs-intaffairs' },
      Mathematics: { code: 'MATH', subjectId: 'sub-sbcs-math' },
      'Mental Ability': { code: 'MENTAL_ABILITY', subjectId: 'sub-sbcs-mental-ability' },
      Science: { code: 'G_SCIENCE', subjectId: 'sub-gbcs-science' },
      'Computer and Information Technology': { code: 'G_COMPUTER', subjectId: 'sub-gbcs-computer' },
      'Geography and Environment': { code: 'G_GEOGRAPHY', subjectId: 'sub-gbcs-geography' },
      'Ethics, Values and Good Governance': { code: 'G_ETHICS', subjectId: 'sub-gbcs-ethics' },
    };

    const subjInfo = subjectCodeMap[raw.subject] || {
      code: raw.subject.toUpperCase().replace(/\s+/g, '_'),
      subjectId: `sub-${raw.subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    };

    const options: QuestionOption[] = [
      { id: 'A', textEn: raw.options.A || '', textBn: raw.options.A || '' },
      { id: 'B', textEn: raw.options.B || '', textBn: raw.options.B || '' },
      { id: 'C', textEn: raw.options.C || '', textBn: raw.options.C || '' },
      { id: 'D', textEn: raw.options.D || '', textBn: raw.options.D || '' },
    ];

    return {
      id: raw.id,
      examTrackId: preferredTrack,
      professionalStream: 'all',
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
   * Returns all platform questions, caching the converted instances
   */
  static getPlatformQuestions(track?: ExamTrackId): Question[] {
    if (!globalForQB.__bcs_platform_questions__) {
      const raw = this.getAllQuestions();
      globalForQB.__bcs_platform_questions__ = raw.map((item) =>
        this.toPlatformQuestion(item, 'general_bcs')
      );
    }

    if (!track) {
      return globalForQB.__bcs_platform_questions__;
    }

    // If track is special_bcs_health_51_2026, return questions whose subjects are part of Special BCS
    const specialSubjects = ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'];
    if (track === 'special_bcs_health_51_2026') {
      return globalForQB.__bcs_platform_questions__.filter((q) =>
        specialSubjects.includes(q.subjectCode)
      );
    }

    return globalForQB.__bcs_platform_questions__;
  }
}
