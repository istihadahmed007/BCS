import { NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metrics = SourceIngestionService.getCoverageMetrics();
    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve coverage metrics',
      },
      { status: 500 }
    );
  }
}
