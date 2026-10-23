import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (session) {
      AuthService.revokeSession(session.sessionId);
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    response.cookies.delete('bcs_session');

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
