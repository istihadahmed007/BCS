import { NextRequest, NextResponse } from 'next/server';
import { QuestionBankService } from '@/services/question-bank';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const subject = searchParams.get('subject') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const topic = searchParams.get('topic') || undefined;
    const search = searchParams.get('search') || undefined;
    const batch = searchParams.get('batch') || undefined;

    const result = QuestionBankService.queryQuestions({
      page,
      limit,
      subject,
      difficulty,
      topic,
      search,
      batch,
    });

    const manifest = QuestionBankService.getManifest();

    return NextResponse.json({
      success: true,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      data: result.questions,
      manifest: {
        totalQuestions: manifest.totalQuestions,
        subjectStats: manifest.subjectStats,
        difficultyStats: manifest.difficultyStats,
        totalBatches: manifest.totalBatches,
      },
    });
  } catch (error: any) {
    console.error('Error fetching questions from question bank:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch questions',
      },
      { status: 500 }
    );
  }
}
