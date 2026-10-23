import { NextRequest, NextResponse } from 'next/server';

interface FlaggedQuestionReport {
  id: string;
  questionId: string;
  reason: 'wrong_answer' | 'stem_typo' | 'explanation_inaccurate' | 'syllabus_mismatch' | 'other';
  comment?: string;
  reportedBy?: string;
  reportedAt: string;
  status: 'pending_review' | 'resolved' | 'dismissed';
}

// In-memory reports store
const FLAGGED_REPORTS_STORE: FlaggedQuestionReport[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, reason = 'wrong_answer', comment = '', reportedBy = 'candidate-student' } = body;

    if (!questionId) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required to flag an error.' },
        { status: 400 }
      );
    }

    const report: FlaggedQuestionReport = {
      id: `flag-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      questionId,
      reason,
      comment,
      reportedBy,
      reportedAt: new Date().toISOString(),
      status: 'pending_review',
    };

    FLAGGED_REPORTS_STORE.push(report);

    return NextResponse.json({
      success: true,
      message: 'প্রশ্নটির ত্রুটি বা অসঙ্গতি পর্যালোচনার জন্য জমা দেওয়া হয়েছে। ধন্যবাদ!',
      reportId: report.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit flag report' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    total: FLAGGED_REPORTS_STORE.length,
    data: FLAGGED_REPORTS_STORE,
  });
}
