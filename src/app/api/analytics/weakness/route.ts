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
