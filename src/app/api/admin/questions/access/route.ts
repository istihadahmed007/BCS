import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { EntitlementService } from '@/services/entitlement';
import { QuestionBankService } from '@/services/question-bank';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session || (session.role !== 'super_admin' && session.role !== 'exam_manager')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const manifest = QuestionBankService.getManifest();
    const totalQuestions = manifest.totalQuestions || 20200;
    // Estimated free preview questions (~20%)
    const freeCount = Math.floor(totalQuestions * 0.2);
    const premiumCount = totalQuestions - freeCount;

    return NextResponse.json({
      success: true,
      stats: {
        totalQuestions,
        freePreviewCount: freeCount,
        premiumCount,
        freeRatioPercentage: 20,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session || (session.role !== 'super_admin' && session.role !== 'exam_manager')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const body = await request.json();
    const { questionIds, accessTier, reason = 'Admin bulk access classification update' } = body;

    if (!questionIds || !Array.isArray(questionIds) || !accessTier) {
      return NextResponse.json(
        { success: false, error: 'Invalid parameters: questionIds (array) and accessTier required' },
        { status: 400 }
      );
    }

    const updatedCount = EntitlementService.bulkSetQuestionAccessTier(questionIds, accessTier);

    SubscriptionService.logAudit({
      adminUserId: session.userId,
      adminEmail: session.email,
      action: 'toggle_question_access',
      targetType: 'question',
      targetId: `${updatedCount}_questions`,
      reason,
      details: { accessTier, questionIdsCount: updatedCount },
    });

    return NextResponse.json({
      success: true,
      updatedCount,
      accessTier,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
