import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth';
import { EntitlementService } from '@/services/entitlement';
import { QuestionBankService } from '@/services/question-bank';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Identify user from session cookie or query param
    const sessionCookie = request.cookies.get('bcs_session')?.value;
    const session = AuthService.verifySessionToken(sessionCookie);
    const userId = session?.userId || searchParams.get('userId') || 'student_current';

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const subject = searchParams.get('subject') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const topic = searchParams.get('topic') || undefined;
    const search = searchParams.get('search') || undefined;
    const batch = searchParams.get('batch') || undefined;
    const track = (searchParams.get('track') as any) || undefined;
    const stream = (searchParams.get('stream') as any) || undefined;
    const reviewStatus = searchParams.get('review_status') || searchParams.get('reviewStatus') || undefined;
    const accessFilter = searchParams.get('access') || undefined; // 'free' | 'all'

    const result = QuestionBankService.queryQuestions({
      page,
      limit,
      subject,
      difficulty,
      topic,
      search,
      batch,
      track,
      stream,
      reviewStatus,
    });

    const manifest = QuestionBankService.getManifest();

    // Apply backend entitlement filtering & redaction to protect premium question content
    const protectedQuestions = result.questions.map((q) => {
      // Map RawQuestionBankItem to partial Question for entitlement check
      const mappedQ = {
        id: q.id,
        examTrackId: (track || 'general_bcs') as any,
        professionalStream: (stream || 'general') as any,
        subjectCode: q.subject,
        stemEn: q.question_en,
        stemBn: q.question_bn,
        options: [
          { id: 'A' as const, textEn: q.options.A, textBn: q.options.A },
          { id: 'B' as const, textEn: q.options.B, textBn: q.options.B },
          { id: 'C' as const, textEn: q.options.C, textBn: q.options.C },
          { id: 'D' as const, textEn: q.options.D, textBn: q.options.D },
        ],
        correctAnswerId: q.correct_option,
        explanationEn: q.explanation_en,
        explanationBn: q.explanation_bn,
      };

      const accessTier = EntitlementService.getQuestionAccessTier(mappedQ);
      const access = EntitlementService.canAccessQuestion(userId, mappedQ);

      if (!access.allowed) {
        return {
          ...q,
          access_tier: accessTier,
          is_locked: true,
          question_bn: q.question_bn.slice(0, 80) + '... [প্রিমিয়াম প্যাকেজ আনলক করুন]',
          question_en: q.question_en.slice(0, 80) + '... [Unlock Premium Package]',
          options: {
            A: 'প্রিমিয়াম অপশন',
            B: 'প্রিমিয়াম অপশন',
            C: 'প্রিমিয়াম অপশন',
            D: 'প্রিমিয়াম অপশন',
          },
          correct_option: null, // Redacted
          explanation_bn: 'এই প্রশ্নের সঠিক উত্তর এবং বিস্তারিত রেফারেন্স ব্যাখ্যা প্রিমিয়াম প্যাকেজের অন্তর্ভুক্ত।',
          explanation_en: 'Answer and detailed explanation are locked. Upgrade to BCSCrack Premium to view.',
        };
      }

      return {
        ...q,
        access_tier: accessTier,
        is_locked: false,
      };
    });

    return NextResponse.json({
      success: true,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      data: protectedQuestions,
      manifest: {
        totalQuestions: manifest.totalQuestions,
        subjectStats: manifest.subjectStats,
        difficultyStats: manifest.difficultyStats,
        totalBatches: manifest.totalBatches,
      },
    });
  } catch (error: any) {
    console.error('Error fetching questions from question bank:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch questions',
      },
      { status: 500 }
    );
  }
}
