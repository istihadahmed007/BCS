import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userRole = request.headers.get('x-user-role') || 'super_admin';
    if (userRole === 'student') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only administrators can attach question evidence' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const {
      questionId,
      evidenceType = 'factual_reference',
      citationText,
      pageNumber,
      section,
      questionNumber,
      paragraph,
      examinationYear,
      verificationStatus = 'source_attached',
      reviewerNotes,
      verifiedBy = 'Authorized BCS Reviewer',
    } = body;

    if (!questionId || !citationText) {
      return NextResponse.json(
        { success: false, error: 'questionId and citationText are required' },
        { status: 400 }
      );
    }

    const link = SourceIngestionService.linkQuestionToSource({
      questionId,
      sourceRegistryId: id,
      evidenceType,
      citationText,
      pageNumber,
      section,
      questionNumber,
      paragraph,
      examinationYear,
      verificationStatus,
      reviewerNotes,
      verifiedBy,
    });

    return NextResponse.json({
      success: true,
      data: link,
      message: 'Question successfully linked to source with supporting evidence.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
