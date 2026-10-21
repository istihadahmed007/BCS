import { NextRequest, NextResponse } from 'next/server';
import { PersonalizationEngine } from '@/services/personalization';
import { StudyPlan } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPlan, missedDaysCount = 2 } = body;

    if (!currentPlan) {
      return NextResponse.json({ success: false, error: 'Current plan is required' }, { status: 400 });
    }

    const recoveredPlan = PersonalizationEngine.generateRecoveryPlan(currentPlan as StudyPlan, Number(missedDaysCount));

    return NextResponse.json({
      success: true,
      data: recoveredPlan,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
