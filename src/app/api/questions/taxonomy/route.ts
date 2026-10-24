import { NextRequest, NextResponse } from 'next/server';
import { QuestionBankService } from '@/services/question-bank';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = (searchParams.get('track') as ExamTrackId) || undefined;
    const stream = (searchParams.get('stream') as ProfessionalStreamId) || undefined;

    const taxonomy = QuestionBankService.getTaxonomyTree(track, stream);

    return NextResponse.json({
      success: true,
      totalSubjects: taxonomy.length,
      data: taxonomy,
    });
  } catch (error: any) {
    console.error('Error fetching taxonomy tree:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch taxonomy tree' },
      { status: 500 }
    );
  }
}
