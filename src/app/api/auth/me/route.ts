import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const validation = AuthService.validateActiveSession(sessionCookie);

    if (validation.status === 'superseded') {
      const response = NextResponse.json(
        {
          authenticated: false,
          superseded: true,
          code: 'SESSION_SUPERSEDED',
          error:
            'Your session has ended because this account signed in on another device. Each account is limited to one active device at a time.',
          user: null,
          subscription: null,
        },
        { status: 401 }
      );
      response.cookies.delete('bcs_session');
      return response;
    }

    if (validation.status !== 'valid' || !validation.session) {
      // Unauthenticated / Anonymous user preview
      return NextResponse.json({
        authenticated: false,
        superseded: false,
        user: null,
        subscription: null,
        freeUsage: null,
      });
    }

    const session = validation.session;

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
