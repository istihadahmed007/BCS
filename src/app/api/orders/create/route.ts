import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';
import { PaymentGatewayType } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in with Google to purchase a package.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { packageId, paymentGateway = 'sslcommerz', metadata } = body;

    if (!packageId) {
      return NextResponse.json({ success: false, error: 'Missing packageId' }, { status: 400 });
    }

    const pkg = SubscriptionService.getPackageById(packageId);
    if (!pkg) {
      return NextResponse.json({ success: false, error: 'Selected package does not exist' }, { status: 404 });
    }

    // Check if user already has an active subscription to this exact tier
    const activeSub = SubscriptionService.getUserActiveSubscription(session.userId);
    if (activeSub.status === 'active' && activeSub.packageId === packageId) {
      const remainingDays = SubscriptionService.calculateRemainingDays(activeSub.expiresAt);
      return NextResponse.json(
        {
          success: false,
          error: `You already have an active subscription to ${activeSub.packageName} with ${remainingDays} days remaining.`,
          alreadyActive: true,
          subscription: activeSub,
        },
        { status: 400 }
      );
    }

    const order = SubscriptionService.createOrder({
      userId: session.userId,
      packageId,
      paymentGateway: paymentGateway as PaymentGatewayType,
      metadata: {
        ...metadata,
        userEmail: session.email,
        userName: session.fullName,
      },
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
