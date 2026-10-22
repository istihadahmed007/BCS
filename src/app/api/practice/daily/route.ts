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
      questions: practiceSet.questions,
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'student_001';
    const examTrackId = (searchParams.get('examTrackId') || 'general_bcs_preli') as ExamTrackId;
    const professionalStream = (searchParams.get('professionalStream') || 'general') as ProfessionalStreamId;
    const practiceMode = (searchParams.get('practiceMode') || 'daily_mixed') as DailyPracticeMode;
    const questionCount = Number(searchParams.get('questionCount')) || 10;
    const subjectCode = searchParams.get('subjectCode') || undefined;
    const topicId = searchParams.get('topicId') || undefined;

    const practiceSet = DailyPracticeService.generatePracticeSet({
      userId,
      examTrackId,
      professionalStream,
      practiceMode,
      questionCount,
      subjectCode,
      topicId,
      mistakeQuestionIds: [],
      topicMasteries: [],
    });

    return NextResponse.json({
      success: true,
      data: practiceSet,
      questions: practiceSet.questions,
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

