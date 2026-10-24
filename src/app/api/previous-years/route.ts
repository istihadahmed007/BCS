import { NextRequest, NextResponse } from 'next/server';
import { QuestionBankService } from '@/services/question-bank';
import { ExamTrackId } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = (searchParams.get('track') as ExamTrackId) || undefined;
    const paperId = searchParams.get('paperId') || undefined;
    const subject = searchParams.get('subject') || undefined;

    if (paperId) {
      const data = QuestionBankService.getPreviousYearPaperQuestions(paperId, subject);
      return NextResponse.json({
        success: true,
        data,
      });
    }

    const papers = QuestionBankService.getPreviousYearPapers(track);
    return NextResponse.json({
      success: true,
      total: papers.length,
      data: papers,
    });
  } catch (error: any) {
    console.error('Error fetching previous year papers:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch previous year papers' },
      { status: 500 }
    );
  }
}
