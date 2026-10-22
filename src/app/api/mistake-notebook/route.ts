import { NextRequest, NextResponse } from 'next/server';
import { MistakeNotebookService } from '@/services/mistake-notebook';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || request.headers.get('x-user-id') || 'student_current';

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required for mistake notebook operations' },
        { status: 400 }
      );
    }

    const subject = searchParams.get('subject') || undefined;
    const topic = searchParams.get('topic') || undefined;
    const trackId = searchParams.get('trackId') || undefined;
    const errorType = searchParams.get('errorType') || undefined;
    const reviewStatus = searchParams.get('reviewStatus') || undefined;
    const search = searchParams.get('search') || undefined;
    const resolved =
      searchParams.get('resolved') !== null
        ? searchParams.get('resolved') === 'true'
        : undefined;

    const result = MistakeNotebookService.getMistakes({
      userId,
      subject,
      topic,
      trackId,
      errorType,
      reviewStatus,
      search,
      resolved,
    });

    return NextResponse.json({
      success: true,
      data: result.items,
      total: result.total,
      stats: result.stats,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId || request.headers.get('x-user-id') || 'student_current';
    const { questionId, userSelectedOption, testSessionId, errorType, candidateNotes } = body;

    if (!questionId) {
      return NextResponse.json(
        { success: false, error: 'questionId is required' },
        { status: 400 }
      );
    }

    const entry = MistakeNotebookService.recordMistake({
      userId,
      questionId,
      userSelectedOption,
      testSessionId,
      errorType,
      candidateNotes,
    });

    return NextResponse.json({
      success: true,
      data: entry,
      message: 'Question saved to Mistake Notebook successfully.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
