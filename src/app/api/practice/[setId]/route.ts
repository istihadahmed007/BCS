import { NextRequest, NextResponse } from 'next/server';
import { DailyPracticeService } from '@/services/daily-practice';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ setId: string }> }
) {
  try {
    const { setId } = await params;
    const practiceSet = DailyPracticeService.getPracticeSet(setId);

    if (!practiceSet) {
      return NextResponse.json(
        { success: false, error: 'Practice set not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: practiceSet,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ setId: string }> }
) {
  try {
    const { setId } = await params;
    const body = await request.json();
    const { action, questionId, selectedOptionId, timeSpentSeconds } = body;

    if (action === 'submit_answer') {
      if (!questionId || !selectedOptionId) {
        return NextResponse.json(
          { success: false, error: 'questionId and selectedOptionId are required' },
          { status: 400 }
        );
      }

      const result = DailyPracticeService.submitQuestionAnswer({
        practiceSetId: setId,
        questionId,
        selectedOptionId,
        timeSpentSeconds,
      });

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    if (action === 'toggle_bookmark') {
      if (!questionId) {
        return NextResponse.json(
          { success: false, error: 'questionId is required' },
          { status: 400 }
        );
      }

      const isBookmarked = DailyPracticeService.toggleBookmark(setId, questionId);
      return NextResponse.json({
        success: true,
        data: { isBookmarked },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action specified' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Operation failed',
      },
      { status: 500 }
    );
  }
}
