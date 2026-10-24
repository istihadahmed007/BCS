import { NextRequest, NextResponse } from 'next/server';
import { PersonalizationEngine } from '@/services/personalization';
import { AuthService } from '@/services/auth';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const auth = AuthService.checkAuth(request);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, code: auth.code, error: auth.error },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const {
      userId = auth.session.userId,
      examTrackId = 'special_bcs_health_51_2026',
      professionalStream = 'assistant_surgeon',
      dailyMinutesBudget = 120,
      topicMasteries,
      targetExamDate,
    } = body;

    const plan = PersonalizationEngine.generatePlan({
      userId,
      examTrackId: examTrackId as ExamTrackId,
      professionalStream: professionalStream as ProfessionalStreamId,
      dailyMinutesBudget: Number(dailyMinutesBudget),
      topicMasteries,
      targetExamDate,
    });

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
