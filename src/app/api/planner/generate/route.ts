import { NextRequest, NextResponse } from 'next/server';
import { PersonalizationEngine } from '@/services/personalization';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId = 'candidate-user-1',
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
