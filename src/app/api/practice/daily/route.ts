import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { DailyPracticeService } from '@/services/daily-practice';
import { EntitlementService } from '@/services/entitlement';
import { SubscriptionService } from '@/services/subscription';
import { DailyPracticeMode, ExamTrackId, ProfessionalStreamId } from '@/types';

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
      practiceMode = 'daily_mixed',
      questionCount = 10,
      subjectCode,
      topicId,
      mistakeQuestionIds = [],
      topicMasteries = [],
    } = body;

    const effectiveUserId = session?.userId || userId;
    const count = Number(questionCount) || 10;

    // Check entitlement access
    const check = EntitlementService.canAccessDailyPractice(effectiveUserId, {
      examTrackId: examTrackId as ExamTrackId,
      professionalStream: professionalStream as ProfessionalStreamId,
      practiceMode,
      questionCount: count,
    });

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

    const practiceSet = DailyPracticeService.generatePracticeSet({
      userId: effectiveUserId,
      examTrackId: examTrackId as ExamTrackId,
      professionalStream: professionalStream as ProfessionalStreamId,
      practiceMode: practiceMode as DailyPracticeMode,
      questionCount: count,
      subjectCode,
      topicId,
      mistakeQuestionIds,
      topicMasteries,
    });

    // Record usage for free users
    if (check.isFreePreview) {
      SubscriptionService.recordFreeQuestionsAttempted(effectiveUserId, count);
    }

    return NextResponse.json({
      success: true,
      data: practiceSet,
      questions: practiceSet.questions,
      entitlement: {
        tier: check.currentTier,
        isFreePreview: check.isFreePreview,
        remainingDailyFreeQuestions: check.remainingDailyFreeQuestions,
      },
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
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    const searchParams = request.nextUrl.searchParams;
    const userId = session?.userId || searchParams.get('userId') || 'student_current';
    const examTrackId = (searchParams.get('examTrackId') || 'general_bcs_preli') as ExamTrackId;
    const professionalStream = (searchParams.get('professionalStream') || 'general') as ProfessionalStreamId;
    const practiceMode = (searchParams.get('practiceMode') || 'daily_mixed') as DailyPracticeMode;
    const questionCount = Number(searchParams.get('questionCount')) || 10;
    const subjectCode = searchParams.get('subjectCode') || undefined;
    const topicId = searchParams.get('topicId') || undefined;

    const check = EntitlementService.canAccessDailyPractice(userId, {
      examTrackId,
      professionalStream,
      practiceMode,
      questionCount,
    });

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
      entitlement: {
        tier: check.currentTier,
        isFreePreview: check.isFreePreview,
        remainingDailyFreeQuestions: check.remainingDailyFreeQuestions,
      },
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
