import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

/**
 * Endpoint for candidates or admins to submit Paymently TrxID and confirm payment
 */
export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Please log in.' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, trxId, senderPhone } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Missing orderId' }, { status: 400 });
    }

    if (!trxId || trxId.trim().length < 4) {
      return NextResponse.json(
        { success: false, error: 'অনুগ্রহ করে সঠিক bKash/Nagad ট্রানজেকশন আইডি (TrxID) প্রদান করুন।' },
        { status: 400 }
      );
    }

    const order = SubscriptionService.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: 'অর্ডার পাওয়া যায়নি।' }, { status: 404 });
    }

    // Verify ownership unless super admin
    if (order.userId !== session.userId && !AuthService.isAdmin(session)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    // Process payment verification with Paymently TrxID
    const updatedOrder = SubscriptionService.processPaymentVerification({
      orderId: order.id,
      gateway: 'paymently',
      gatewayTransactionId: trxId.trim(),
      amountBDT: order.amountBDT,
      status: 'verified',
      gatewayResponseRaw: {
        trxId: trxId.trim(),
        senderPhone: senderPhone || '',
        verifiedBy: session.email,
        paymentlyLink: 'https://vartualtutor.paymently.io/paymentlink/default/BDT',
        submittedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'পেমেন্ট সফলভাবে যাচাই হয়েছে এবং প্যাকেজ সক্রিয় করা হয়েছে!',
      order: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
