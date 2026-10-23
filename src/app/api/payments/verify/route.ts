import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, simulatePaymentSuccess, gatewayTransactionId } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Missing orderId' }, { status: 400 });
    }

    const order = SubscriptionService.getOrder(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== session.userId && session.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized to verify this order' }, { status: 403 });
    }

    // In sandbox mode or when simulating payment in dev
    if (order.paymentGateway === 'sandbox' || simulatePaymentSuccess) {
      const txId = gatewayTransactionId || 'SNDBX_VAL_' + Date.now();
      const result = SubscriptionService.processPaymentVerification({
        orderId: order.id,
        gateway: order.paymentGateway,
        gatewayTransactionId: txId,
        amountBDT: order.amountBDT,
        status: 'verified',
        gatewayResponseRaw: { verifiedVia: 'sandbox_test_verification', verifiedBy: session.email },
      });

      return NextResponse.json({
        success: true,
        order: result.order,
        subscription: result.subscription,
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Direct verification is only supported for sandbox or authorized gateway webhooks.',
    }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
