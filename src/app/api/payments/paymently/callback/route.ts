import { NextRequest, NextResponse } from 'next/server';
import { PaymentGatewayService } from '@/services/payment-gateway';
import { SubscriptionService } from '@/services/subscription';
import { resolveOrigin } from '@/services/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const origin = resolveOrigin(request);
  try {
    let payload: Record<string, any> = {};

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      formData.forEach((val, key) => {
        payload[key] = val.toString();
      });
    } else {
      payload = await request.json().catch(() => ({}));
    }

    const verification = await PaymentGatewayService.verifyPaymently(payload);

    if (verification.success && verification.orderId && verification.orderId !== 'UNKNOWN') {
      SubscriptionService.processPaymentVerification({
        orderId: verification.orderId,
        gateway: 'paymently',
        gatewayTransactionId: verification.gatewayTransactionId,
        amountBDT: verification.amountBDT,
        status: 'verified',
        gatewayResponseRaw: verification.rawResponse,
      });

      return NextResponse.redirect(
        new URL(`/packages?payment=success&orderId=${encodeURIComponent(verification.orderId)}`, origin)
      );
    } else {
      return NextResponse.redirect(
        new URL(
          `/packages?payment=failed&orderId=${encodeURIComponent(
            verification.orderId || ''
          )}&reason=${encodeURIComponent(verification.errorMessage || 'Verification pending')}`,
          origin
        )
      );
    }
  } catch (error: any) {
    return NextResponse.redirect(
      new URL(`/packages?payment=error&reason=${encodeURIComponent(error.message)}`, origin)
    );
  }
}

export async function GET(request: NextRequest) {
  const origin = resolveOrigin(request);
  const searchParams = request.nextUrl.searchParams;
  const payload: Record<string, any> = {};
  searchParams.forEach((val, key) => {
    payload[key] = val;
  });

  const verification = await PaymentGatewayService.verifyPaymently(payload);

  if (verification.success && verification.orderId && verification.orderId !== 'UNKNOWN') {
    SubscriptionService.processPaymentVerification({
      orderId: verification.orderId,
      gateway: 'paymently',
      gatewayTransactionId: verification.gatewayTransactionId,
      amountBDT: verification.amountBDT,
      status: 'verified',
      gatewayResponseRaw: verification.rawResponse,
    });

    return NextResponse.redirect(
      new URL(`/packages?payment=success&orderId=${encodeURIComponent(verification.orderId)}`, origin)
    );
  }

  return NextResponse.redirect(
    new URL(`/packages?payment=success&orderId=${encodeURIComponent(payload.order_id || payload.orderId || '')}`, origin)
  );
}
