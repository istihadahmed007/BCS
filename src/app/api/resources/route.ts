import { NextRequest, NextResponse } from 'next/server';
import { ALL_RESOURCES, OFFICIAL_SOURCES, REFERENCE_CATALOG } from '@/data/catalog';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'book' | 'official_source' | null
    const search = searchParams.get('q')?.toLowerCase();

    let items = ALL_RESOURCES;

    if (type === 'book') {
      items = REFERENCE_CATALOG;
    } else if (type === 'official_source') {
      items = OFFICIAL_SOURCES;
    }

    if (search) {
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(search) ||
          i.code.toLowerCase().includes(search) ||
          (i.authorEditor && i.authorEditor.toLowerCase().includes(search)) ||
          (i.publisher && i.publisher.toLowerCase().includes(search)) ||
          (i.coverage && i.coverage.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        total: items.length,
        officialSourcesCount: OFFICIAL_SOURCES.length,
        catalogBooksCount: REFERENCE_CATALOG.length,
        resources: items,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
