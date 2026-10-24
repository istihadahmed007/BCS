import { NextRequest, NextResponse } from 'next/server';
import { resolveOrigin } from '@/services/auth';

export const dynamic = 'force-dynamic';

/**
 * Compatibility handler for NextAuth default callback path: /api/auth/callback/google
 * Forwards code and state to canonical /api/auth/google/callback handler
 */
export async function GET(request: NextRequest) {
  const origin = resolveOrigin(request);
  const targetUrl = new URL('/api/auth/google/callback', origin);
  
  // Forward all query parameters (code, state, error, etc.)
  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(targetUrl);
}
