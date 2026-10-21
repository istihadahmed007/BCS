import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const priority = searchParams.get('priority') ? Number(searchParams.get('priority')) : undefined;
    const category = searchParams.get('category') || undefined;
    const sourceType = searchParams.get('sourceType') || undefined;
    const verificationStatus = searchParams.get('verificationStatus') || undefined;
    const search = searchParams.get('search') || undefined;
    const isActive = searchParams.get('isActive') !== null ? searchParams.get('isActive') === 'true' : undefined;

    const sources = SourceIngestionService.getSources({
      priority,
      category,
      sourceType,
      verificationStatus,
      search,
      isActive,
    });

    const stats = SourceIngestionService.getSourceRegistryDashboardStats();

    return NextResponse.json({
      success: true,
      data: sources, // array for direct mapping
      sources, // alias
      stats,
      total: sources.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Admin role check from headers (or authorization bearer/session)
    const userRole = request.headers.get('x-user-role') || 'super_admin';
    if (userRole === 'student') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only administrators can create source records' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      sourceCode,
      name,
      sourceType = 'official_bpsc_document',
      priority = 2,
      category = 'previous_year_archive',
      examinationName,
      publicationYear,
      author,
      publisher,
      edition,
      volume,
      pageNumber,
      baseUrl,
      termsSummary,
      rightsStatus = 'metadata_only',
      syncSchedule = 'manual',
      verificationStatus = 'unverified',
      notes,
    } = body;

    if (!sourceCode || !name || !baseUrl) {
      return NextResponse.json(
        { success: false, error: 'sourceCode, name, and baseUrl are required' },
        { status: 400 }
      );
    }

    const created = SourceIngestionService.addSource({
      sourceCode,
      name,
      sourceType,
      priority: Number(priority) as any,
      category,
      examinationName,
      publicationYear,
      author,
      publisher,
      edition,
      volume,
      pageNumber,
      baseUrl,
      termsSummary,
      rightsStatus,
      syncSchedule,
      lastSyncStatus: 'synced',
      verificationStatus,
      isActive: true,
      isArchived: false,
      notes,
    });

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
