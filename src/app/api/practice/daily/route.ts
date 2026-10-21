import { NextRequest, NextResponse } from 'next/server';
import { DailyPracticeService } from '@/services/daily-practice';
import { DailyPracticeMode, ExamTrackId, ProfessionalStreamId } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId = 'student_001',
      examTrackId = 'special_bcs_health_51_2026',
      professionalStream = 'assistant_surgeon',
      practiceMode = 'daily_mixed',
      questionCount = 10,
      subjectCode,
      topicId,
      mistakeQuestionIds = [],
      topicMasteries = [],
    } = body;

    const practiceSet = DailyPracticeService.generatePracticeSet({
      userId,
      examTrackId: examTrackId as ExamTrackId,
      professionalStream: professionalStream as ProfessionalStreamId,
      practiceMode: practiceMode as DailyPracticeMode,
      questionCount: Number(questionCount) || 10,
      subjectCode,
      topicId,
      mistakeQuestionIds,
      topicMasteries,
    });

    return NextResponse.json({
      success: true,
      data: practiceSet,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate daily practice set',
      },
      { status: 500 }
    );
  }
}
