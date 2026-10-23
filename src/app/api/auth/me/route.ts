import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session) {
      // Unauthenticated / Anonymous user preview
      return NextResponse.json({
        authenticated: false,
        user: null,
        subscription: null,
        freeUsage: null,
      });
    }

    const user = AuthService.getUserById(session.userId);
    const subscription = SubscriptionService.getUserActiveSubscription(session.userId);
    const freeUsage = SubscriptionService.getFreeUsageStats(session.userId);
    const remainingDays = SubscriptionService.calculateRemainingDays(subscription.expiresAt);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user?.id || session.userId,
        email: user?.email || session.email,
        fullName: user?.fullName || session.fullName,
        avatarUrl: user?.avatarUrl || session.avatarUrl,
        role: user?.role || session.role,
        authProvider: user?.authProvider || 'google',
      },
      subscription: {
        ...subscription,
        remainingDays,
      },
      freeUsage,
    });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}
