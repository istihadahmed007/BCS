import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { MockTestService } from '@/services/mock-tests';
import { ExamTrackId, MockTestCategory, ProfessionalStreamId } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = (searchParams.get('track') as ExamTrackId) || undefined;
    const stream = (searchParams.get('stream') as ProfessionalStreamId) || undefined;
    const category = (searchParams.get('category') as MockTestCategory | 'all') || 'all';

    const tests = MockTestService.getMockTests({ track, stream, category });

    return NextResponse.json({
      success: true,
      total: tests.length,
      data: tests,
    });
  } catch (error: any) {
    console.error('Error fetching mock tests:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch mock tests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);
    const body = await request.json();

    const userId = session?.userId || body.userId || 'candidate-student-1';
    const testId = body.testId;

    if (!testId) {
      return NextResponse.json(
        { success: false, error: 'testId is required' },
        { status: 400 }
      );
    }

    const testSession = MockTestService.startAttempt(testId, userId);

    return NextResponse.json({
      success: true,
      data: testSession,
    });
  } catch (error: any) {
    console.error('Error starting mock test attempt:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to start mock test attempt' },
      { status: 500 }
    );
  }
}
