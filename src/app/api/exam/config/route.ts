import { NextRequest, NextResponse } from 'next/server';
import { ExamConfigService } from '@/services/exam-config';
import { ExamTrackId, ProfessionalStreamId } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trackId = (searchParams.get('trackId') as ExamTrackId) || 'special_bcs_health_51_2026';
    const stream = (searchParams.get('stream') as ProfessionalStreamId) || 'assistant_surgeon';

    const tracks = ExamConfigService.getTracks();
    const config = ExamConfigService.getPublishedConfig(trackId);
    const subjects = ExamConfigService.getSubjects(trackId, stream);
    const validation = ExamConfigService.validateMarkDistribution(trackId, stream);

    return NextResponse.json({
      success: true,
      data: {
        tracks,
        activeTrack: trackId,
        activeStream: stream,
        config,
        subjects,
        validation,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
