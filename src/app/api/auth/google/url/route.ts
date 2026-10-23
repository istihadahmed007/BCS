import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const origin = request.nextUrl.origin;
    const authUrl = AuthService.getGoogleAuthUrl(origin);

    return NextResponse.json({
      success: true,
      url: authUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
