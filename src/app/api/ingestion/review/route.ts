import { NextRequest, NextResponse } from 'next/server';
import { SourceIngestionService } from '@/services/source-ingestion';
import { IngestionStatus } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = (searchParams.get('status') as IngestionStatus | 'all') || 'all';
    const trackId = searchParams.get('trackId') || undefined;

    const items = SourceIngestionService.getReviewQueue({ status, trackId });

    return NextResponse.json({
      success: true,
      data: {
        total: items.length,
        items,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId, action, reviewerId, updates, feedback } = body;

    if (!itemId || !action) {
      return NextResponse.json(
        { success: false, error: 'itemId and action (approve | reject | update) are required' },
        { status: 400 }
      );
    }

    const result = SourceIngestionService.reviewStagedItem({
      itemId,
      action,
      reviewerId,
      updates,
      feedback,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
