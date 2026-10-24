import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function handleLogout(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    if (sessionCookie) {
      try {
        const parts = sessionCookie.split('.');
        if (parts.length === 2) {
          const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf-8'));
          if (payload.sessionId) {
            AuthService.revokeSession(payload.sessionId);
          }
        }
      } catch {}
    }

    // Determine redirect or JSON
    const redirectParam = request.nextUrl.searchParams.get('redirect') || '/login';
    const isNavigation = request.method === 'GET' || request.headers.get('accept')?.includes('text/html');

    if (isNavigation) {
      const response = NextResponse.redirect(new URL(redirectParam, request.url));
      response.cookies.delete('bcs_session');
      return response;
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    response.cookies.delete('bcs_session');
    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return handleLogout(request);
}

export async function GET(request: NextRequest) {
  return handleLogout(request);
}
