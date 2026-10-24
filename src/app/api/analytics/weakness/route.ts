import { NextRequest, NextResponse } from 'next/server';
import { WeaknessAnalysisEngine } from '@/services/weakness';
import { TopicMastery } from '@/types';
import { SYLLABUS_TOPICS } from '@/data/syllabus';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { masteries = [] }: { masteries: TopicMastery[] } = body;

    // Enhance masteries with full topic details and insights
    const enriched = masteries.map((m) => {
      const topic = SYLLABUS_TOPICS.find((t) => t.id === m.topicId);
      const label = WeaknessAnalysisEngine.classifyTopicPerformance({
        totalAttempts: m.totalAttempts,
        correctAttempts: m.correctAttempts,
        avgTimeSeconds: m.avgTimeSeconds,
      });
      const insight = WeaknessAnalysisEngine.getWeaknessInsight(label);

      return {
        ...m,
        titleEn: topic?.titleEn || m.titleEn,
        titleBn: topic?.titleBn || m.titleBn,
        weaknessLabel: label,
        insight,
      };
    });

    const readiness = WeaknessAnalysisEngine.calculateReadiness(enriched);

    return NextResponse.json({
      success: true,
      data: {
        enrichedMasteries: enriched,
        readiness,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'student_current';

    // Baseline topic masteries across core syllabus
    const sampleTopics = SYLLABUS_TOPICS.slice(0, 10);
    const enriched = sampleTopics.map((topic) => {
      const label = WeaknessAnalysisEngine.classifyTopicPerformance({
        totalAttempts: 0,
        correctAttempts: 0,
        avgTimeSeconds: 0,
      });
      const insight = WeaknessAnalysisEngine.getWeaknessInsight(label);

      return {
        topicId: topic.id,
        topicCode: topic.topicCode || topic.id,
        titleEn: topic.titleEn,
        titleBn: topic.titleBn,
        subjectCode: topic.subjectId || 'GENERAL',
        totalAttempts: 0,
        correctAttempts: 0,
        accuracyPct: 0,
        avgTimeSeconds: 0,
        weaknessLabel: label,
        insight,
      };
    });

    const readiness = WeaknessAnalysisEngine.calculateReadiness(enriched);

    return NextResponse.json({
      success: true,
      data: {
        userId,
        enrichedMasteries: enriched,
        readiness,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
