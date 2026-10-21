import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const priority = searchParams.get('priority') ? Number(searchParams.get('priority')) : undefined;
    const category = searchParams.get('category') || undefined;
    const isActive = searchParams.get('isActive') !== null ? searchParams.get('isActive') === 'true' : undefined;

    const sources = SourceIngestionService.getSources({ priority, category, isActive });

    return NextResponse.json({
      success: true,
      data: {
        total: sources.length,
        sources,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sourceCode,
      name,
      priority = 2,
      category = 'previous_year_archive',
      baseUrl,
      termsSummary,
      rightsStatus = 'metadata_only',
      syncSchedule = 'manual',
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
      priority: Number(priority) as any,
      category,
      baseUrl,
      termsSummary,
      rightsStatus,
      syncSchedule,
      lastSyncStatus: 'pending',
      isActive: true,
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
