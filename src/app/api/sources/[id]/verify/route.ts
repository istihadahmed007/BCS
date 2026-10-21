import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';
import { SourceVerificationStatus } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userRole = request.headers.get('x-user-role') || 'super_admin';
    if (userRole === 'student') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only administrators can verify source records' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, verifiedBy = 'Authorized BCS Admin' } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'status is required (verified, needs_review, unverified)' },
        { status: 400 }
      );
    }

    const updated = SourceIngestionService.verifySource(
      id,
      status as SourceVerificationStatus,
      verifiedBy
    );

    return NextResponse.json({
      success: true,
      data: updated,
      message: `Source verification status updated to [${status}].`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
