import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeAll = searchParams.get('all') === 'true';

    if (includeAll) {
      // Admin check
      const sessionCookie = request.cookies.get('bcs_session')?.value;
      const session = AuthService.verifySessionToken(sessionCookie);
      if (!session || (session.role !== 'super_admin' && session.role !== 'exam_manager')) {
        return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 403 });
      }
      return NextResponse.json({ success: true, packages: SubscriptionService.getAllPackages() });
    }

    return NextResponse.json({ success: true, packages: SubscriptionService.getActivePackages() });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session || (session.role !== 'super_admin' && session.role !== 'exam_manager')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const body = await request.json();
    const newPkg = SubscriptionService.createPackage(body, session.userId, session.email);

    return NextResponse.json({ success: true, package: newPkg });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
