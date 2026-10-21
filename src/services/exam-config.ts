import { ExamConfigVersion, ExamSubject, ExamTrack, ExamTrackId, ProfessionalStreamId } from '@/types';
import { EXAM_CONFIG_VERSIONS, EXAM_TRACKS, GENERAL_BCS_SUBJECTS, SPECIAL_BCS_HEALTH_SUBJECTS } from '@/data/exam-configs';
import { SYLLABUS_TOPICS } from '@/data/syllabus';

export class ExamConfigService {
  /**
   * Retrieves all available examination tracks.
   */
  static getTracks(): ExamTrack[] {
    return EXAM_TRACKS.filter((t) => t.isActive);
  }

  /**
   * Retrieves a specific examination track by ID.
   */
  static getTrack(trackId: ExamTrackId): ExamTrack | undefined {
    return EXAM_TRACKS.find((t) => t.id === trackId);
  }

  /**
   * Retrieves the active published configuration for an exam track.
   */
  static getPublishedConfig(trackId: ExamTrackId): ExamConfigVersion {
    const config = EXAM_CONFIG_VERSIONS[trackId];
    if (!config) {
      throw new Error(`No published configuration found for exam track: ${trackId}`);
    }
    return config;
  }

  /**
   * Retrieves applicable subjects for the track and professional stream.
   * Special BCS Health enforces strict separation between Assistant Surgeon and Dental Surgeon.
   */
  static getSubjects(trackId: ExamTrackId, stream: ProfessionalStreamId = 'general'): ExamSubject[] {
    if (trackId === 'special_bcs_health_51_2026') {
      return SPECIAL_BCS_HEALTH_SUBJECTS.filter((subject) => {
        if (!subject.isProfessional) return true; // Shared subjects (Bangla, English, BD, Int, Math, Mental)
        return subject.professionalStream === stream;
      }).sort((a, b) => a.displayOrder - b.displayOrder);
    }

    if (trackId === 'general_bcs') {
      return GENERAL_BCS_SUBJECTS.sort((a, b) => a.displayOrder - b.displayOrder);
    }

    return [];
  }

  /**
   * Retrieves syllabus topics, optionally filtered by subject ID.
   */
  static getSyllabusTopics(subjectId?: string) {
    if (!subjectId) return SYLLABUS_TOPICS;
    return SYLLABUS_TOPICS.filter((t) => t.subjectId === subjectId).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * Validates that subject marks equal the configuration's total marks.
   */
  static validateMarkDistribution(trackId: ExamTrackId, stream: ProfessionalStreamId): { isValid: boolean; totalMarks: number; expectedMarks: number } {
    const config = this.getPublishedConfig(trackId);
    const subjects = this.getSubjects(trackId, stream);
    const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);

    return {
      isValid: totalMarks === config.totalMarks,
      totalMarks,
      expectedMarks: config.totalMarks,
    };
  }
}
