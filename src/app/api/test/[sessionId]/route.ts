import { NextRequest, NextResponse } from 'next/server';
import { AssessmentEngine } from '@/services/assessment';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const session = AssessmentEngine.getSession(sessionId);

    if (!session) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
    }

    // Do not expose correct answers or explanations if session is still in progress!
    const sanitizedQuestions = session.questions.map((q) => {
      if (session.status === 'in_progress') {
        const { correctAnswerId, explanationEn, explanationBn, ...rest } = q;
        return rest;
      }
      return q;
    });

    return NextResponse.json({
      success: true,
      data: {
        ...session,
        questions: sanitizedQuestions,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const body = await request.json();
    const { questionId, selectedOptionId, isMarkedForReview, timeSpentSeconds } = body;

    const updated = AssessmentEngine.saveResponse(
      sessionId,
      questionId,
      selectedOptionId,
      isMarkedForReview,
      timeSpentSeconds
    );

    return NextResponse.json({
      success: true,
      data: {
        status: updated.status,
        responseCount: Object.keys(updated.responses).length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const body = await request.json().catch(() => ({}));
    const { responses, idempotencyKey } = body;

    const result = AssessmentEngine.evaluateSubmission(sessionId, responses, idempotencyKey);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
