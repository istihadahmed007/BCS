import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pkg = SubscriptionService.getPackageById(id);
    if (!pkg) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, package: pkg });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session || (session.role !== 'super_admin' && session.role !== 'exam_manager')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const updated = SubscriptionService.updatePackage(id, body, session.userId, session.email);

    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session || (session.role !== 'super_admin' && session.role !== 'exam_manager')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const { id } = await params;
    SubscriptionService.deletePackage(id, session.userId, session.email);

    return NextResponse.json({ success: true, message: 'Package removed or deactivated successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
