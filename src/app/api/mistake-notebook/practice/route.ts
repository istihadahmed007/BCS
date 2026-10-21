import { NextRequest, NextResponse } from 'next/server';
import { MistakeNotebookService } from '@/services/mistake-notebook';
import { DailyPracticeService } from '@/services/daily-practice';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId || request.headers.get('x-user-id') || 'student_dr_rahim';
    const {
      examTrackId = 'special_bcs_health_51_2026',
      professionalStream = 'assistant_surgeon',
      subject,
      questionCount = 10,
    } = body;

    // Fetch user's unresolved mistakes
    const { items } = MistakeNotebookService.getMistakes({
      userId,
      subject,
      resolved: false,
    });

    if (items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No unresolved mistakes available for practice drill.' },
        { status: 400 }
      );
    }

    const mistakeQuestionIds = items.map((m) => m.questionId);

    const practiceSet = DailyPracticeService.generatePracticeSet({
      userId,
      examTrackId: examTrackId as ExamTrackId,
      professionalStream: professionalStream as ProfessionalStreamId,
      practiceMode: 'mistake_notebook',
      questionCount: Math.min(questionCount, items.length),
      mistakeQuestionIds,
      subjectCode: subject !== 'all' ? subject : undefined,
    });

    return NextResponse.json({
      success: true,
      data: practiceSet,
      message: `Practice set generated with ${practiceSet.questions.length} questions from your mistake notebook.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
