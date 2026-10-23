import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sourceRegistryId,
      jobType = 'file_import',
      fileName,
      fileFormat = 'json',
    } = body;
    const items = body.items || body.rawItems || [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'A non-empty "items" or "rawItems" array of questions is required' },
        { status: 400 }
      );
    }

    const result = SourceIngestionService.ingestQuestionBatch({
      sourceRegistryId,
      jobType,
      fileName,
      fileFormat,
      items,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        jobId: result.job.id,
        extractedCount: result.stagedItemsCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
