import { NextResponse } from 'next/server';
import { QuestionBankService } from '@/services/question-bank';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const report = QuestionBankService.runDuplicateAudit();
    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    console.error('Error running duplicate audit:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to run duplicate audit' },
      { status: 500 }
    );
  }
}
