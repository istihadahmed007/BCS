import { NextRequest, NextResponse } from 'next/server';
import { AITutorService } from '@/services/ai-tutor';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, userSelectedOptionId, language = 'bn' } = body;

    if (!questionId) {
      return NextResponse.json({ success: false, error: 'Question ID is required' }, { status: 400 });
    }

    const explanation = await AITutorService.explainQuestion({
      questionId,
      userSelectedOptionId,
      language,
    });

    return NextResponse.json({
      success: true,
      data: explanation,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
