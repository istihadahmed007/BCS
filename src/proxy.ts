import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';

/**
 * Next.js 16 Proxy Convention (replaces middleware.ts)
 * Enforces:
 * 1. Unauthenticated visitors cannot access dashboard or dashboard API routes.
 * 2. Unauthenticated visitors are redirected to /login?redirect=<intended_path>.
 * 3. Role-Based Access Control: strictly protects /admin and /api/admin.
 *    Non-super-admins are denied and redirected to /access-denied (or 403 on API).
 * 4. Single active device per account: superseded sessions are detected,
 *    cookies cleared, and redirected to /login?reason=session_superseded (or 401 on API).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const fullPath = `${pathname}${search}`;

  const isApiRoute = pathname.startsWith('/api/');
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  // Read session cookie
  const sessionCookie = request.cookies.get('bcs_session')?.value;
  const validation = AuthService.validateActiveSession(sessionCookie);

  // 1. Check if session was superseded by a sign-in on another device
  if (validation.status === 'superseded') {
    if (isApiRoute) {
      const response = NextResponse.json(
        {
          success: false,
          authenticated: false,
          code: 'SESSION_SUPERSEDED',
          error:
            'Your session has ended because this account signed in on another device. Each account is limited to one active device at a time.',
        },
        { status: 401 }
      );
      response.cookies.delete('bcs_session');
      return response;
    } else {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('reason', 'session_superseded');
      loginUrl.searchParams.set('redirect', fullPath);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('bcs_session');
      return response;
    }
  }

  // 2. Check if user is unauthenticated (missing, invalid, or expired session)
  if (validation.status !== 'valid' || !validation.session) {
    if (isApiRoute) {
      const response = NextResponse.json(
        {
          success: false,
          authenticated: false,
          code: 'UNAUTHORIZED',
          error: 'Authentication required. Please log in to access this resource.',
        },
        { status: 401 }
      );
      if (sessionCookie) {
        response.cookies.delete('bcs_session');
      }
      return response;
    } else {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', fullPath);
      const response = NextResponse.redirect(loginUrl);
      if (sessionCookie) {
        response.cookies.delete('bcs_session');
      }
      return response;
    }
  }

  const session = validation.session;

  // 3. Role-Based Access Control for Administrative Routes (/admin and /api/admin)
  // Super Admin role required (with server-side email verification for istihadahmed1163@gmail.com)
  if (isAdminRoute) {
    const isSuperAdmin = AuthService.isSuperAdmin(session);
    if (!isSuperAdmin) {
      if (isApiRoute) {
        return NextResponse.json(
          {
            success: false,
            code: 'FORBIDDEN',
            error: 'Access denied: Super Admin permissions required.',
          },
          { status: 403 }
        );
      } else {
        const deniedUrl = new URL('/access-denied', request.url);
        deniedUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(deniedUrl);
      }
    }
  }

  // 4. Request is authenticated and authorized; pass user info in request headers for downstream components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', session.userId);
  requestHeaders.set('x-user-email', session.email);
  requestHeaders.set('x-user-role', session.role);
  requestHeaders.set('x-session-id', session.sessionId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('x-user-id', session.userId);
  response.headers.set('x-user-email', session.email);
  response.headers.set('x-user-role', session.role);
  response.headers.set('x-session-id', session.sessionId);

  return response;
}

export const config = {
  matcher: [
    // Protected student/user pages
    '/dashboard/:path*',
    '/mistake-notebook/:path*',
    // Protected admin pages
    '/admin/:path*',
    // Protected dashboard API routes
    '/api/planner/:path*',
    '/api/mistake-notebook/:path*',
    '/api/analytics/:path*',
    // Protected admin API routes
    '/api/admin/:path*',
  ],
};
