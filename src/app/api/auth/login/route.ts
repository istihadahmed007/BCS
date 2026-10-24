import { NextRequest, NextResponse } from 'next/server';
import { AuthService, resolveOrigin } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const origin = resolveOrigin(request);
    const body = await request.json();
    const { email, password, rememberMe = false, redirect = '/dashboard' } = body;

    // 1. Validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Password is required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // 2. Authoritative server-side password authentication & RBAC verification
    const authResult = AuthService.authenticateWithPassword(email.trim(), password);
    if (!authResult.success) {
      const status =
        authResult.code === 'UNAUTHORIZED_ADMIN' || authResult.code === 'WRONG_PASSWORD'
          ? 401
          : 400;
      return NextResponse.json(
        { success: false, error: authResult.error, code: authResult.code },
        { status }
      );
    }
    const user = authResult.user;

    // 3. Create Session Token (30 days if rememberMe, else 7 days)
    // Enforces SINGLE ACTIVE DEVICE: invalidates any prior session for this account
    const durationDays = rememberMe ? 30 : 7;
    const sessionToken = AuthService.createSession(user, durationDays);

    // Sanitize redirect target to prevent open redirect attacks
    let safeRedirect = '/dashboard';
    if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
      safeRedirect = redirect;
    }

    // 4. Return success response with HttpOnly session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      redirectUrl: safeRedirect,
    });

    const isProduction = process.env.NODE_ENV === 'production' || origin.startsWith('https://');

    response.cookies.set('bcs_session', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: durationDays * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
