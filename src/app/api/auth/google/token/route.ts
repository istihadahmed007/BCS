import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, credential } = body;

    const token = idToken || credential;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Missing ID token/credential' }, { status: 400 });
    }

    const googleProfile = await AuthService.verifyGoogleIdToken(token);
    const { user, isNewUser } = AuthService.findOrCreateGoogleUser(googleProfile);
    const sessionToken = AuthService.createSession(user);

    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({
      success: true,
      isNewUser,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    });

    response.cookies.set('bcs_session', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 401 });
  }
}
