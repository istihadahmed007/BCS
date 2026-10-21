import { NextRequest, NextResponse } from 'next/server';
import { QuestionBankService } from '@/services/question-bank';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const question = QuestionBankService.getQuestionById(id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: `Question with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
