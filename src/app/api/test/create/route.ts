import { NextRequest, NextResponse } from 'next/server';
import { AssessmentEngine } from '@/services/assessment';
import { ExamTrackId, ProfessionalStreamId, TestType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId = 'candidate-user-1',
      examTrackId = 'special_bcs_health_51_2026',
      professionalStream = 'assistant_surgeon',
      testType = 'diagnostic',
      durationMinutes,
      title,
    } = body;

    const session = AssessmentEngine.createSession({
      userId,
      examTrackId: examTrackId as ExamTrackId,
      professionalStream: professionalStream as ProfessionalStreamId,
      testType: testType as TestType,
      durationMinutes,
      title,
    });

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
