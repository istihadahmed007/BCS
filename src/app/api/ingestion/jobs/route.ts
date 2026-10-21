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
      items = [],
    } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'A non-empty "items" array of questions is required' },
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
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
