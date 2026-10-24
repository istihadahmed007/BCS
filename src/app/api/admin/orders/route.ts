import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { SubscriptionService } from '@/services/subscription';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = AuthService.checkSuperAdmin(request);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, code: auth.code, error: auth.error },
        { status: auth.status }
      );
    }

    const orders = SubscriptionService.listAllOrders();
    const auditLogs = SubscriptionService.getAuditLogs();

    return NextResponse.json({
      success: true,
      orders,
      auditLogs,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
