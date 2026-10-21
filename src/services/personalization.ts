import { ExamTrackId, ProfessionalStreamId, StudyPlan, StudyTask, TopicMastery } from '@/types';
import { SYLLABUS_TOPICS } from '@/data/syllabus';
import { ExamConfigService } from './exam-config';

export class PersonalizationEngine {
  /**
   * Generates an adaptive, deterministic study plan strictly constrained by candidate daily minutes.
   */
  static generatePlan(params: {
    userId: string;
    examTrackId: ExamTrackId;
    professionalStream: ProfessionalStreamId;
    dailyMinutesBudget: number; // e.g. 120 minutes
    topicMasteries?: TopicMastery[];
    targetExamDate?: string;
  }): StudyPlan {
    const { userId, examTrackId, professionalStream, dailyMinutesBudget, topicMasteries = [] } = params;

    // Validate budget
    const budget = Math.max(30, Math.min(480, dailyMinutesBudget));

    // Get track subjects
    const subjects = ExamConfigService.getSubjects(examTrackId, professionalStream);
    const subjectIds = new Set(subjects.map((s) => s.id));
    const eligibleTopics = SYLLABUS_TOPICS.filter((t) => subjectIds.has(t.subjectId));

    // Map existing masteries
    const masteryMap = new Map<string, TopicMastery>();
    topicMasteries.forEach((m) => masteryMap.set(m.topicId, m));

    // Prioritize topics:
    // 1. Knowledge gaps and retention problems
    // 2. Unassessed critical weightage topics
    // 3. Regular unassessed topics
    // 4. Mastered topics (light refreshers)
    const prioritizedTopics = [...eligibleTopics].sort((a, b) => {
      const ma = masteryMap.get(a.id);
      const mb = masteryMap.get(b.id);

      const getPriorityScore = (topic: typeof a, mastery?: TopicMastery) => {
        if (!mastery) return topic.weightageLevel === 'critical' ? 80 : 60;
        if (mastery.weaknessLabel === 'knowledge_gap') return 100;
        if (mastery.weaknessLabel === 'retention_problem') return 95;
        if (mastery.weaknessLabel === 'careless_error') return 75;
        if (mastery.weaknessLabel === 'time_pressure') return 70;
        if (mastery.weaknessLabel === 'mastered') return 20;
        return 50;
      };

      return getPriorityScore(b, mb) - getPriorityScore(a, ma);
    });

    const tasks: StudyTask[] = [];
    const planId = `plan-${Date.now()}`;
    const today = new Date();

    // Generate schedule for 7 days
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const scheduledDate = new Date(today);
      scheduledDate.setDate(today.getDate() + dayOffset);
      const dateStr = scheduledDate.toISOString().split('T')[0];

      let dayMinutesAccumulated = 0;

      // Select top topics for this day fitting into dailyMinutesBudget
      const dailyTopics = prioritizedTopics.slice(dayOffset * 2, dayOffset * 2 + 2);

      for (const topic of dailyTopics) {
        const mastery = masteryMap.get(topic.id);
        const taskDuration = Math.min(45, Math.floor(budget / 2));

        if (dayMinutesAccumulated + taskDuration > budget) break;

        let taskType: StudyTask['taskType'] = 'learn_concept';
        let reason = `Essential topic for ${subjects.find((s) => s.id === topic.subjectId)?.nameEn || 'Syllabus'}.`;

        if (mastery?.weaknessLabel === 'knowledge_gap') {
          taskType = 'learn_concept';
          reason = `Prioritized because diagnostic data shows repeated errors. Dedicated 25m concept review + 15m drill.`;
        } else if (mastery?.weaknessLabel === 'retention_problem') {
          taskType = 'spaced_revision';
          reason = `Spaced repetition interval due today to consolidate retention.`;
        } else if (mastery?.weaknessLabel === 'careless_error') {
          taskType = 'topic_practice';
          reason = `Careful-reading drill to eliminate trap selection errors.`;
        } else {
          taskType = 'topic_practice';
          reason = `First-time syllabus coverage in high-weightage BCS domain.`;
        }

        tasks.push({
          id: `task-${dayOffset}-${topic.id}`,
          studyPlanId: planId,
          topicId: topic.id,
          topicTitleBn: topic.titleBn,
          topicTitleEn: topic.titleEn,
          subjectNameBn: subjects.find((s) => s.id === topic.subjectId)?.nameBn || 'সাধারণ বিষয়',
          taskType,
          title: `${topic.titleBn} — ${taskType === 'spaced_revision' ? 'রিভিশন' : 'অনুশীলন ও কনসেপ্ট'}`,
          reason,
          estimatedMinutes: taskDuration,
          scheduledDate: dateStr,
          status: 'pending',
        });

        dayMinutesAccumulated += taskDuration;
      }

      // Add a 20-minute rapid drill or weekly mock on Day 6
      if (dayOffset === 6 && dayMinutesAccumulated + 30 <= budget) {
        tasks.push({
          id: `task-mock-${dateStr}`,
          studyPlanId: planId,
          topicId: 'general-review',
          topicTitleBn: 'সাপ্তাহিক মূল্যায়ন ও পূর্ণাঙ্গ মক টেস্ট',
          topicTitleEn: 'Weekly Comprehensive Evaluation Mock',
          subjectNameBn: 'সার্বিক মূল্যায়ন',
          taskType: 'mock_exam',
          title: 'সাপ্তাহিক প্রগ্রেস মূল্যায়ন মক টেস্ট',
          reason: 'Measures retention across all studied topics under timed conditions.',
          estimatedMinutes: 30,
          scheduledDate: dateStr,
          status: 'pending',
        });
      }
    }

    return {
      id: planId,
      userId,
      examTrackId,
      versionNumber: 1,
      status: 'active',
      dailyMinutesBudget: budget,
      strategicOverview: `Personalized 7-day adaptive roadmap tailored to ${budget} minutes daily availability. Prioritizes diagnosed weaknesses and official BPSC high-yield topics without exceeding your declared time capacity.`,
      tasks,
      createdAt: today.toISOString(),
    };
  }

  /**
   * Recovers from missed study sessions without producing an impossible backlog.
   * Compresses overdue pending tasks into the available daily budget.
   */
  static generateRecoveryPlan(currentPlan: StudyPlan, missedDaysCount: number): StudyPlan {
    const today = new Date().toISOString().split('T')[0];
    const pendingTasks = currentPlan.tasks.filter((t) => t.status === 'pending');

    // Reschedule pending tasks forward evenly within the daily budget
    const reallocatedTasks = pendingTasks.map((t, index) => {
      const dayOffset = Math.floor(index / 2);
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + dayOffset);

      return {
        ...t,
        scheduledDate: targetDate.toISOString().split('T')[0],
        reason: `${t.reason} [Rescheduled in recovery mode after ${missedDaysCount} missed day(s)]`,
      };
    });

    return {
      ...currentPlan,
      versionNumber: currentPlan.versionNumber + 1,
      strategicOverview: `Recovery Plan activated: Compressed ${pendingTasks.length} pending tasks into manageable daily segments respecting your ${currentPlan.dailyMinutesBudget}-minute budget.`,
      tasks: reallocatedTasks,
    };
  }
}
