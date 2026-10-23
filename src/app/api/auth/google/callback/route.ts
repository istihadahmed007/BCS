import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error)}`, request.nextUrl.origin)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/login?error=missing_auth_code', request.nextUrl.origin)
      );
    }

    const origin = request.nextUrl.origin;
    const googleProfile = await AuthService.verifyGoogleAuthorizationCode(code, origin);

    // Create or link account and auto-provision Free Preview
    const { user } = AuthService.findOrCreateGoogleUser(googleProfile);

    // Create session token
    const sessionToken = AuthService.createSession(user);

    // Redirect to dashboard with secure HttpOnly session cookie
    const response = NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));

    const isProduction = process.env.NODE_ENV === 'production';

    response.cookies.set('bcs_session', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(err.message)}`, request.nextUrl.origin)
    );
  }
}
