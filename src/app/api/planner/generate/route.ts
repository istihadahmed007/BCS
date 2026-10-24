import { NextRequest, NextResponse } from 'next/server';
import { PersonalizationEngine } from '@/services/personalization';
import { AuthService } from '@/services/auth';
import { ExamTrackId, ProfessionalStreamId, TopicMastery } from '@/types';

const VALID_TRACKS: ReadonlySet<string> = new Set([
  'general_bcs',
  'special_bcs_health_51_2026',
]);

const VALID_STREAMS: ReadonlySet<string> = new Set([
  'general',
  'assistant_surgeon',
  'assistant_dental_surgeon',
]);

export async function POST(request: NextRequest) {
  try {
    const auth = AuthService.checkAuth(request);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, code: auth.code, error: auth.error },
        { status: auth.status }
      );
    }

    const authenticatedUserId = auth.session.userId;
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Body may be empty or omitted
    }

    // 1. Cross-user access check: Prevent BOLA / IDOR.
    // Never allow a client to specify or modify a plan for a different user.
    if (body.userId && body.userId !== authenticatedUserId) {
      return NextResponse.json(
        {
          success: false,
          code: 'FORBIDDEN_CROSS_USER',
          error: 'Access denied: You cannot generate or modify a study plan for another user account.',
        },
        { status: 403 }
      );
    }

    // 2. Validate examTrackId
    const examTrackId: ExamTrackId = body.examTrackId || 'special_bcs_health_51_2026';
    if (!VALID_TRACKS.has(examTrackId)) {
      return NextResponse.json(
        {
          success: false,
          code: 'INVALID_EXAM_TRACK',
          error: `Invalid exam track: '${examTrackId}'. Valid options: ${Array.from(VALID_TRACKS).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // 3. Validate professionalStream
    const professionalStream: ProfessionalStreamId =
      body.professionalStream || (examTrackId === 'general_bcs' ? 'general' : 'assistant_surgeon');
    if (!VALID_STREAMS.has(professionalStream)) {
      return NextResponse.json(
        {
          success: false,
          code: 'INVALID_PROFESSIONAL_STREAM',
          error: `Invalid professional stream: '${professionalStream}'. Valid options: ${Array.from(VALID_STREAMS).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate track & stream compatibility
    if (examTrackId === 'general_bcs' && professionalStream !== 'general') {
      return NextResponse.json(
        {
          success: false,
          code: 'INCOMPATIBLE_TRACK_STREAM',
          error: "General BCS track requires professional stream 'general'.",
        },
        { status: 400 }
      );
    }
    if (examTrackId === 'special_bcs_health_51_2026' && professionalStream === 'general') {
      return NextResponse.json(
        {
          success: false,
          code: 'INCOMPATIBLE_TRACK_STREAM',
          error: "Special BCS Health track requires 'assistant_surgeon' or 'assistant_dental_surgeon'.",
        },
        { status: 400 }
      );
    }

    // 4. Validate dailyMinutesBudget (between 15 and 720 minutes)
    const rawBudget = body.dailyMinutesBudget !== undefined ? Number(body.dailyMinutesBudget) : 120;
    if (isNaN(rawBudget) || rawBudget < 15 || rawBudget > 720) {
      return NextResponse.json(
        {
          success: false,
          code: 'INVALID_BUDGET',
          error: 'Daily study minutes budget must be a number between 15 and 720 minutes.',
        },
        { status: 400 }
      );
    }
    const dailyMinutesBudget = Math.round(rawBudget);

    // 5. Validate topicMasteries (if provided, must be an array)
    let topicMasteries: TopicMastery[] | undefined = undefined;
    if (body.topicMasteries !== undefined) {
      if (!Array.isArray(body.topicMasteries)) {
        return NextResponse.json(
          {
            success: false,
            code: 'INVALID_TOPIC_MASTERIES',
            error: 'topicMasteries must be an array of topic mastery items.',
          },
          { status: 400 }
        );
      }
      topicMasteries = body.topicMasteries;
    }

    // 6. Validate targetExamDate (if provided, must be a valid date)
    let targetExamDate: string | undefined = undefined;
    if (body.targetExamDate) {
      const parsedDate = new Date(body.targetExamDate);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            code: 'INVALID_TARGET_DATE',
            error: 'targetExamDate must be a valid date string (e.g. ISO 8601).',
          },
          { status: 400 }
        );
      }
      targetExamDate = parsedDate.toISOString();
    }

    // Authoritatively generate plan for authenticated session userId ONLY
    const plan = PersonalizationEngine.generatePlan({
      userId: authenticatedUserId, // Server-derived session identity
      examTrackId,
      professionalStream,
      dailyMinutesBudget,
      topicMasteries,
      targetExamDate,
    });

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate study plan.', detail: error.message },
      { status: 500 }
    );
  }
}
