import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { PaymentGatewayService } from '@/services/payment-gateway';
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
    const { orderId, phone } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Missing orderId' }, { status: 400 });
    }

    const order = SubscriptionService.getOrder(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== session.userId) {
      return NextResponse.json({ success: false, error: 'Order does not belong to current user' }, { status: 403 });
    }

    if (order.status === 'paid') {
      return NextResponse.json({ success: false, error: 'Order is already paid.' }, { status: 400 });
    }

    const initiation = await PaymentGatewayService.initiatePayment(
      order,
      {
        name: session.fullName,
        email: session.email,
        phone,
      },
      request.nextUrl.origin
    );

    return NextResponse.json({
      success: true,
      initiation,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
