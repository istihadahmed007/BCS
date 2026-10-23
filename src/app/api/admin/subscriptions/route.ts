import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session || (session.role !== 'super_admin' && session.role !== 'exam_manager')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const users = AuthService.listUsers();
    const data = users.map((user) => {
      const activeSub = SubscriptionService.getUserActiveSubscription(user.id);
      const remainingDays = SubscriptionService.calculateRemainingDays(activeSub.expiresAt);
      const freeUsage = SubscriptionService.getFreeUsageStats(user.id);

      return {
        user,
        subscription: {
          ...activeSub,
          remainingDays,
        },
        freeUsage,
      };
    });

    return NextResponse.json({ success: true, users: data });
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
    const { action, userId, packageId, durationDays = 90, subscriptionId, reason } = body;

    if (!reason || reason.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'A valid reason is required for administrative subscription actions.' },
        { status: 400 }
      );
    }

    if (action === 'grant' || action === 'extend') {
      if (!userId || !packageId) {
        return NextResponse.json({ success: false, error: 'Missing userId or packageId' }, { status: 400 });
      }

      const sub = SubscriptionService.grantManualSubscription({
        userId,
        packageId,
        durationDays: Number(durationDays),
        reason,
        adminUserId: session.userId,
        adminEmail: session.email,
      });

      return NextResponse.json({ success: true, subscription: sub });
    } else if (action === 'revoke') {
      if (!subscriptionId) {
        return NextResponse.json({ success: false, error: 'Missing subscriptionId to revoke' }, { status: 400 });
      }

      SubscriptionService.revokeSubscription(subscriptionId, reason, session.userId, session.email);
      return NextResponse.json({ success: true, message: 'Subscription revoked successfully.' });
    } else {
      return NextResponse.json({ success: false, error: 'Unknown action: ' + action }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
