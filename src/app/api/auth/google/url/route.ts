import { NextRequest, NextResponse } from 'next/server';
import { AuthService, resolveOrigin } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const returnUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard';
    const origin = resolveOrigin(request);
    const isConfigured = Boolean(
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      !process.env.GOOGLE_CLIENT_ID.includes('dummy')
    );
    const authUrl = AuthService.getGoogleAuthUrl(origin, undefined, returnUrl);

    return NextResponse.json({
      success: true,
      url: authUrl,
      configured: isConfigured,
      clientId: process.env.GOOGLE_CLIENT_ID || null,
      origin,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
