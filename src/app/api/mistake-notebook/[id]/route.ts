import { NextRequest, NextResponse } from 'next/server';
import { MistakeNotebookService } from '@/services/mistake-notebook';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const userId = body.userId || request.headers.get('x-user-id') || 'student_dr_rahim';

    const { candidateNotes, errorType, resolved, scheduledReviewAt } = body;

    const updated = MistakeNotebookService.updateMistake({
      id,
      userId,
      candidateNotes,
      errorType,
      resolved,
      scheduledReviewAt,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Mistake notebook entry updated successfully.',
    });
  } catch (error: any) {
    const status = error.message.includes('Unauthorized') ? 403 : 400;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || request.headers.get('x-user-id') || 'student_dr_rahim';

    const deleted = MistakeNotebookService.deleteMistake(id, userId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Mistake entry not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Mistake removed from notebook.',
    });
  } catch (error: any) {
    const status = error.message.includes('Unauthorized') ? 403 : 400;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}
