import { NextRequest, NextResponse } from 'next/server';
import { AuthService, resolveOrigin } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const returnUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard';
    const origin = resolveOrigin(request);
    const authUrl = AuthService.getGoogleAuthUrl(origin, undefined, returnUrl);

    return NextResponse.json({
      success: true,
      url: authUrl,
      configured: true,
      origin,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
