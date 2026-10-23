import { NextRequest, NextResponse } from 'next/server';
import { AuthService, resolveOrigin } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const origin = resolveOrigin(request);
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error)}`, origin)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/login?error=missing_auth_code', origin)
      );
    }

    const googleProfile = await AuthService.verifyGoogleAuthorizationCode(code, origin);

    // Create or link account and auto-provision Free Preview
    const { user } = AuthService.findOrCreateGoogleUser(googleProfile);

    // Create session token
    const sessionToken = AuthService.createSession(user);

    // Extract return destination from state
    let destination = '/dashboard';
    const stateParam = searchParams.get('state');
    if (stateParam) {
      try {
        const decoded = JSON.parse(Buffer.from(stateParam, 'base64url').toString('utf-8'));
        if (decoded.returnUrl && decoded.returnUrl.startsWith('/') && !decoded.returnUrl.startsWith('//')) {
          destination = decoded.returnUrl;
        }
      } catch {
        // Fallback if state was not JSON
      }
    }

    // Redirect to destination with secure HttpOnly session cookie
    const response = NextResponse.redirect(new URL(destination, origin));

    const isProduction = process.env.NODE_ENV === 'production' || origin.startsWith('https://');

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
      new URL(`/login?error=${encodeURIComponent(err.message)}`, origin)
    );
  }
}
