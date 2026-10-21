import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';
import { SourceVerificationStatus } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role') || 'super_admin';
    if (userRole === 'student') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only administrators can verify question evidence' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { questionId, linkId, status, verifiedBy = 'Authorized BCS Reviewer', reviewerNotes } = body;

    if (!questionId || !status) {
      return NextResponse.json(
        { success: false, error: 'questionId and status are required' },
        { status: 400 }
      );
    }

    const question = SourceIngestionService.verifyQuestionEvidence({
      questionId,
      linkId,
      status: status as SourceVerificationStatus,
      verifiedBy,
      reviewerNotes,
    });

    return NextResponse.json({
      success: true,
      data: question,
      message: `Question evidence verification status updated to [${status}].`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
