import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const source = SourceIngestionService.getSourceById(id);

    if (!source) {
      return NextResponse.json(
        { success: false, error: `Source with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: source,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userRole = request.headers.get('x-user-role') || 'super_admin';
    if (userRole === 'student') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only administrators can edit source records' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const updated = SourceIngestionService.updateSource(id, body);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userRole = request.headers.get('x-user-role') || 'super_admin';
    if (userRole === 'student') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only administrators can archive or delete sources' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const forceArchive = searchParams.get('action') === 'archive';

    if (forceArchive) {
      const result = SourceIngestionService.archiveSource(id);
      return NextResponse.json(result);
    }

    // Attempt deletion with safeguards
    const result = SourceIngestionService.deleteSource(id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
