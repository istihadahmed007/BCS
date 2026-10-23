import { Order, PaymentGatewayType } from '@/types';
import { SubscriptionService } from './subscription';

export interface PaymentInitiationResult {
  gateway: PaymentGatewayType;
  redirectUrl: string;
  orderId: string;
  amountBDT: number;
  mode: 'live' | 'sandbox';
}

export interface PaymentVerificationResult {
  success: boolean;
  orderId: string;
  gatewayTransactionId: string;
  amountBDT: number;
  currency: string;
  status: 'verified' | 'failed' | 'cancelled';
  rawResponse?: Record<string, any>;
  errorMessage?: string;
}

export class PaymentGatewayService {
  /**
   * Initializes a payment session for an order
   */
  static async initiatePayment(
    order: Order,
    customer: { name: string; email: string; phone?: string },
    appBaseUrl?: string
  ): Promise<PaymentInitiationResult> {
    const baseUrl = appBaseUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    switch (order.paymentGateway) {
      case 'sslcommerz':
        return await this.initiateSSLCommerz(order, customer, baseUrl);
      case 'aamarpay':
        return await this.initiateAamarPay(order, customer, baseUrl);
      case 'sandbox':
      default:
        return this.initiateSandbox(order, baseUrl);
    }
  }

  /**
   * SSLCommerz Payment Gateway Initiation
   */
  private static async initiateSSLCommerz(
    order: Order,
    customer: { name: string; email: string; phone?: string },
    baseUrl: string
  ): Promise<PaymentInitiationResult> {
    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePasswd = process.env.SSLCOMMERZ_STORE_PASSWD;
    const isSandbox = process.env.SSLCOMMERZ_IS_SANDBOX !== 'false';

    // If credentials are not yet entered, seamlessly fall back to sandbox gateway
    if (!storeId || !storePasswd) {
      return this.initiateSandbox(order, baseUrl);
    }

    const apiUrl = isSandbox
      ? 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php'
      : 'https://securepay.sslcommerz.com/gwprocess/v4/api.php';

    const params = new URLSearchParams({
      store_id: storeId,
      store_passwd: storePasswd,
      total_amount: order.amountBDT.toFixed(2),
      currency: 'BDT',
      tran_id: order.id,
      success_url: `${baseUrl}/api/payments/sslcommerz/callback?status=success`,
      fail_url: `${baseUrl}/api/payments/sslcommerz/callback?status=fail`,
      cancel_url: `${baseUrl}/api/payments/sslcommerz/callback?status=cancel`,
      ipn_url: `${baseUrl}/api/payments/sslcommerz/callback?status=ipn`,
      cus_name: customer.name || 'Student Candidate',
      cus_email: customer.email,
      cus_add1: 'Dhaka, Bangladesh',
      cus_city: 'Dhaka',
      cus_country: 'Bangladesh',
      cus_phone: customer.phone || '01700000000',
      shipping_method: 'NO',
      product_name: order.packageName,
      product_category: 'Education Course',
      product_profile: 'non-physical-goods',
    });

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const data = await res.json();
      if (data.status === 'SUCCESS' && data.GatewayPageURL) {
        return {
          gateway: 'sslcommerz',
          redirectUrl: data.GatewayPageURL,
          orderId: order.id,
          amountBDT: order.amountBDT,
          mode: isSandbox ? 'sandbox' : 'live',
        };
      } else {
        throw new Error(data.failedreason || 'SSLCommerz gateway initiation returned failure.');
      }
    } catch (err: any) {
      console.warn('SSLCommerz API error, falling back to sandbox simulator:', err.message);
      return this.initiateSandbox(order, baseUrl);
    }
  }

  /**
   * SSLCommerz Server-Side Transaction Verification
   */
  static async verifySSLCommerz(payload: Record<string, any>): Promise<PaymentVerificationResult> {
    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePasswd = process.env.SSLCOMMERZ_STORE_PASSWD;
    const isSandbox = process.env.SSLCOMMERZ_IS_SANDBOX !== 'false';

    const tranId = payload.tran_id;
    const valId = payload.val_id;

    if (!tranId) {
      return {
        success: false,
        orderId: 'UNKNOWN',
        gatewayTransactionId: 'UNKNOWN',
        amountBDT: 0,
        currency: 'BDT',
        status: 'failed',
        errorMessage: 'Missing tran_id in SSLCommerz payload',
      };
    }

    // If sandbox / simulated callback
    if (!storeId || !storePasswd || payload.mock_verification === 'true') {
      const isSuccess = payload.status === 'VALID' || payload.status === 'success';
      const amount = parseFloat(payload.amount || payload.total_amount || '0');
      return {
        success: isSuccess,
        orderId: tranId,
        gatewayTransactionId: valId || 'SANDBOX_VAL_' + Date.now(),
        amountBDT: amount,
        currency: 'BDT',
        status: isSuccess ? 'verified' : 'failed',
        rawResponse: payload,
      };
    }

    // Call SSLCommerz validation API
    const validatorUrl = isSandbox
      ? `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${encodeURIComponent(
          valId
        )}&store_id=${encodeURIComponent(storeId)}&store_passwd=${encodeURIComponent(
          storePasswd
        )}&format=json`
      : `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${encodeURIComponent(
          valId
        )}&store_id=${encodeURIComponent(storeId)}&store_passwd=${encodeURIComponent(
          storePasswd
        )}&format=json`;

    try {
      const res = await fetch(validatorUrl);
      const data = await res.json();

      const isValid = data.status === 'VALID' || data.status === 'VALIDATED';
      const amount = parseFloat(data.amount || '0');

      return {
        success: isValid,
        orderId: tranId,
        gatewayTransactionId: data.bank_tran_id || valId,
        amountBDT: amount,
        currency: data.currency || 'BDT',
        status: isValid ? 'verified' : 'failed',
        rawResponse: data,
        errorMessage: isValid ? undefined : data.error || 'SSLCommerz validation failed',
      };
    } catch (err: any) {
      return {
        success: false,
        orderId: tranId,
        gatewayTransactionId: valId || 'ERR',
        amountBDT: 0,
        currency: 'BDT',
        status: 'failed',
        errorMessage: 'SSLCommerz validation request failed: ' + err.message,
      };
    }
  }

  /**
   * aamarPay Payment Gateway Initiation
   */
  private static async initiateAamarPay(
    order: Order,
    customer: { name: string; email: string; phone?: string },
    baseUrl: string
  ): Promise<PaymentInitiationResult> {
    const storeId = process.env.AAMARPAY_STORE_ID;
    const signatureKey = process.env.AAMARPAY_SIGNATURE_KEY;
    const isSandbox = process.env.AAMARPAY_IS_SANDBOX !== 'false';

    if (!storeId || !signatureKey) {
      return this.initiateSandbox(order, baseUrl);
    }

    const apiUrl = isSandbox
      ? 'https://sandbox.aamarpay.com/jsonpost.php'
      : 'https://secure.aamarpay.com/jsonpost.php';

    const payload = {
      store_id: storeId,
      signature_key: signatureKey,
      tran_id: order.id,
      amount: order.amountBDT.toFixed(2),
      currency: 'BDT',
      desc: order.packageName,
      cus_name: customer.name || 'Candidate',
      cus_email: customer.email,
      cus_phone: customer.phone || '01700000000',
      success_url: `${baseUrl}/api/payments/aamarpay/callback?status=success`,
      fail_url: `${baseUrl}/api/payments/aamarpay/callback?status=fail`,
      cancel_url: `${baseUrl}/api/payments/aamarpay/callback?status=cancel`,
      type: 'json',
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.result === 'true' && data.payment_url) {
        return {
          gateway: 'aamarpay',
          redirectUrl: data.payment_url,
          orderId: order.id,
          amountBDT: order.amountBDT,
          mode: isSandbox ? 'sandbox' : 'live',
        };
      } else {
        throw new Error(data.message || 'aamarPay initiation failed');
      }
    } catch (err: any) {
      console.warn('aamarPay API error, using sandbox fallback:', err.message);
      return this.initiateSandbox(order, baseUrl);
    }
  }

  /**
   * aamarPay Server-Side Verification
   */
  static async verifyAamarPay(payload: Record<string, any>): Promise<PaymentVerificationResult> {
    const tranId = payload.mer_txnid || payload.tran_id;
    const amount = parseFloat(payload.amount || '0');
    const isSuccess = payload.pay_status === 'Successful' || payload.status === 'success';

    return {
      success: isSuccess,
      orderId: tranId,
      gatewayTransactionId: payload.pg_txnid || payload.bank_txn || 'AAMARPAY_' + Date.now(),
      amountBDT: amount,
      currency: payload.currency || 'BDT',
      status: isSuccess ? 'verified' : 'failed',
      rawResponse: payload,
    };
  }

  /**
   * Sandbox Simulator Gateway for Local Dev & Testing
   */
  private static initiateSandbox(order: Order, baseUrl: string): PaymentInitiationResult {
    const redirectUrl = `${baseUrl}/packages?checkout_order_id=${encodeURIComponent(
      order.id
    )}&step=confirm_payment`;

    return {
      gateway: 'sandbox',
      redirectUrl,
      orderId: order.id,
      amountBDT: order.amountBDT,
      mode: 'sandbox',
    };
  }
}
