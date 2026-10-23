import { NextRequest, NextResponse } from 'next/server';
import { PaymentGatewayService } from '@/services/payment-gateway';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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

    const verification = await PaymentGatewayService.verifySSLCommerz(payload);

    if (verification.success && verification.orderId) {
      SubscriptionService.processPaymentVerification({
        orderId: verification.orderId,
        gateway: 'sslcommerz',
        gatewayTransactionId: verification.gatewayTransactionId,
        amountBDT: verification.amountBDT,
        status: 'verified',
        gatewayResponseRaw: verification.rawResponse,
      });

      return NextResponse.redirect(
        new URL(`/packages?payment=success&orderId=${encodeURIComponent(verification.orderId)}`, request.nextUrl.origin)
      );
    } else {
      if (verification.orderId && verification.orderId !== 'UNKNOWN') {
        SubscriptionService.processPaymentVerification({
          orderId: verification.orderId,
          gateway: 'sslcommerz',
          gatewayTransactionId: verification.gatewayTransactionId,
          amountBDT: verification.amountBDT,
          status: 'failed',
          gatewayResponseRaw: verification.rawResponse,
        });
      }

      return NextResponse.redirect(
        new URL(
          `/packages?payment=failed&orderId=${encodeURIComponent(
            verification.orderId || ''
          )}&reason=${encodeURIComponent(verification.errorMessage || 'Verification failed')}`,
          request.nextUrl.origin
        )
      );
    }
  } catch (error: any) {
    return NextResponse.redirect(
      new URL(`/packages?payment=error&reason=${encodeURIComponent(error.message)}`, request.nextUrl.origin)
    );
  }
}

export async function GET(request: NextRequest) {
  // Pass query params to POST handler logic
  const searchParams = request.nextUrl.searchParams;
  const payload: Record<string, any> = {};
  searchParams.forEach((val, key) => {
    payload[key] = val;
  });

  const verification = await PaymentGatewayService.verifySSLCommerz(payload);
  if (verification.success && verification.orderId) {
    SubscriptionService.processPaymentVerification({
      orderId: verification.orderId,
      gateway: 'sslcommerz',
      gatewayTransactionId: verification.gatewayTransactionId,
      amountBDT: verification.amountBDT,
      status: 'verified',
      gatewayResponseRaw: verification.rawResponse,
    });
    return NextResponse.redirect(
      new URL(`/packages?payment=success&orderId=${encodeURIComponent(verification.orderId)}`, request.nextUrl.origin)
    );
  }

  return NextResponse.redirect(
    new URL(`/packages?payment=failed&reason=${encodeURIComponent(verification.errorMessage || 'Failed')}`, request.nextUrl.origin)
  );
}
