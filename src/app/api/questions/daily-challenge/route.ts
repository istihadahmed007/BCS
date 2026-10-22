import { NextRequest, NextResponse } from 'next/server';
import { QuestionBankService } from '@/services/question-bank';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || undefined;
    const challenge = QuestionBankService.getDailyChallenge(date, 5);

    return NextResponse.json({
      success: true,
      ...challenge,
    });
  } catch (error: any) {
    console.error('Error fetching daily challenge:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch daily challenge',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, answers } = body as {
      date?: string;
      answers?: Record<string, 'A' | 'B' | 'C' | 'D'>;
    };

    const challenge = QuestionBankService.getDailyChallenge(date, 5);
    const safeAnswers = answers || {};

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const results = challenge.questions.map((q) => {
      const userAnswer = safeAnswers[q.id];
      const isAnswered = Boolean(userAnswer);
      const isCorrect = userAnswer === q.correct_option;

      if (isCorrect) {
        correctCount++;
      } else if (isAnswered) {
        wrongCount++;
      } else {
        unansweredCount++;
      }

      return {
        questionId: q.id,
        userAnswer: userAnswer || null,
        correctAnswer: q.correct_option,
        isCorrect,
        explanation_bn: q.explanation_bn,
        explanation_en: q.explanation_en,
        source_title: q.source_title,
      };
    });

    // BCS standard: 1 mark per correct answer, -0.50 per wrong answer
    const rawScore = correctCount - wrongCount * 0.5;
    const score = Math.max(0, Math.round(rawScore * 100) / 100);
    const percentage = Math.round((correctCount / challenge.totalQuestions) * 100);

    return NextResponse.json({
      success: true,
      date: challenge.date,
      challengeId: challenge.challengeId,
      totalQuestions: challenge.totalQuestions,
      correctCount,
      wrongCount,
      unansweredCount,
      score,
      percentage,
      results,
    });
  } catch (error: any) {
    console.error('Error submitting daily challenge:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit daily challenge',
      },
      { status: 500 }
    );
  }
}
