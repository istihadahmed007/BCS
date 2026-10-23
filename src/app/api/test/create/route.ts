import { NextRequest, NextResponse } from 'next/server';
import { AssessmentEngine } from '@/services/assessment';
import { AuthService } from '@/services/auth';
import { EntitlementService } from '@/services/entitlement';
import { ExamTrackId, ProfessionalStreamId, TestType } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    const body = await request.json();
    const {
      userId = 'student_current',
      examTrackId = 'special_bcs_health_51_2026',
      professionalStream = 'assistant_surgeon',
      testType = 'diagnostic',
      durationMinutes,
      title,
    } = body;

    const effectiveUserId = session?.userId || userId;

    // Check entitlement access for test creation
    const check = EntitlementService.canAccessMockTest(
      effectiveUserId,
      testType as TestType,
      examTrackId as ExamTrackId
    );

    if (!check.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: check.reason,
          code: 'LOCKED_PREMIUM_CONTENT',
          requiredTier: check.requiredTier,
          currentTier: check.currentTier,
        },
        { status: 403 }
      );
    }

    const testSession = AssessmentEngine.createSession({
      userId: effectiveUserId,
      examTrackId: examTrackId as ExamTrackId,
      professionalStream: professionalStream as ProfessionalStreamId,
      testType: testType as TestType,
      durationMinutes,
      title,
    });

    return NextResponse.json({
      success: true,
      data: testSession,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
