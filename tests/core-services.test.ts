import assert from 'node:assert';
import test from 'node:test';
import { AssessmentEngine } from '../src/services/assessment';
import { ExamConfigService } from '../src/services/exam-config';
import { PersonalizationEngine } from '../src/services/personalization';
import { WeaknessAnalysisEngine } from '../src/services/weakness';
import { AITutorService } from '../src/services/ai-tutor';

test('1. Special BCS Health 51st Rule & Scoring Engine', () => {
  // Create an Assistant Surgeon diagnostic session
  const session = AssessmentEngine.createSession({
    userId: 'user-doc-123',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'diagnostic',
    title: 'Assistant Surgeon Diagnostic Evaluation',
  });

  assert.ok(session.id, 'Session must have a valid ID');
  assert.strictEqual(session.examTrackId, 'special_bcs_health_51_2026');
  assert.strictEqual(session.professionalStream, 'assistant_surgeon');
  assert.strictEqual(session.status, 'in_progress');

  // Verify questions belong to shared or assistant_surgeon stream ONLY (no dental)
  for (const q of session.questions) {
    assert.notStrictEqual(q.subjectCode, 'DENTAL_SCI_1', 'Assistant Surgeon must not receive Dental Science Part I');
    assert.notStrictEqual(q.subjectCode, 'DENTAL_SCI_2', 'Assistant Surgeon must not receive Dental Science Part II');
  }

  // Simulate responses:
  // Total questions in diagnostic: session.questions.length (e.g. 8)
  // Let's answer 2 correctly, 2 incorrectly, and leave the rest unanswered
  const responses: Record<string, { selectedOptionId: 'A' | 'B' | 'C' | 'D' | null; timeSpentSeconds: number }> = {};
  const q0 = session.questions[0];
  const q1 = session.questions[1];
  const q2 = session.questions[2];
  const q3 = session.questions[3];

  // 2 Correct
  responses[q0.questionId] = { selectedOptionId: q0.correctAnswerId, timeSpentSeconds: 30 };
  responses[q1.questionId] = { selectedOptionId: q1.correctAnswerId, timeSpentSeconds: 40 };

  // 2 Wrong (Pick wrong option)
  const wrongOptForQ2 = q2.options.find((o) => o.id !== q2.correctAnswerId)?.id as 'A' | 'B' | 'C' | 'D';
  const wrongOptForQ3 = q3.options.find((o) => o.id !== q3.correctAnswerId)?.id as 'A' | 'B' | 'C' | 'D';
  responses[q2.questionId] = { selectedOptionId: wrongOptForQ2, timeSpentSeconds: 25 };
  responses[q3.questionId] = { selectedOptionId: wrongOptForQ3, timeSpentSeconds: 50 };

  const idempotencyKey = 'submission-token-xyz-123';
  const evaluated = AssessmentEngine.evaluateSubmission(session.id, responses, idempotencyKey);

  assert.strictEqual(evaluated.status, 'completed');
  assert.strictEqual(evaluated.correctCount, 2, 'Must have exactly 2 correct');
  assert.strictEqual(evaluated.wrongCount, 2, 'Must have exactly 2 wrong');
  assert.strictEqual(evaluated.unansweredCount, session.questions.length - 4, 'Remainder must be unanswered');

  // 2 correct * 1.0 - 2 wrong * 0.50 = 2.0 - 1.0 = 1.00 marks
  assert.strictEqual(evaluated.finalScore, 1.0, 'Final score must accurately apply 0.50 negative marking');

  // Verify Idempotency: re-submitting with the same key returns the exact same evaluated session
  const resubmitted = AssessmentEngine.evaluateSubmission(session.id, responses, idempotencyKey);
  assert.strictEqual(resubmitted.finalScore, 1.0);
  assert.strictEqual(resubmitted.idempotencyKey, idempotencyKey);
});

test('2. Track and Stream Separation (Dental vs Surgeon)', () => {
  const dentalSession = AssessmentEngine.createSession({
    userId: 'user-dentist-456',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_dental_surgeon',
    testType: 'topic_quiz',
    title: 'Dental Science Evaluation',
  });

  for (const q of dentalSession.questions) {
    assert.notStrictEqual(q.subjectCode, 'MED_SCI_1', 'Assistant Dental Surgeon must not receive Medical Science Part I');
    assert.notStrictEqual(q.subjectCode, 'MED_SCI_2', 'Assistant Dental Surgeon must not receive Medical Science Part II');
  }
});

test('3. Personalization Engine Strict Daily Budget Constraint', () => {
  const declaredDailyBudget = 75; // minutes
  const plan = PersonalizationEngine.generatePlan({
    userId: 'user-doc-123',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    dailyMinutesBudget: declaredDailyBudget,
  });

  assert.strictEqual(plan.dailyMinutesBudget, declaredDailyBudget);
  assert.ok(plan.tasks.length > 0, 'Must generate tasks');

  // Group tasks by scheduled date
  const minutesByDate: Record<string, number> = {};
  for (const task of plan.tasks) {
    minutesByDate[task.scheduledDate] = (minutesByDate[task.scheduledDate] || 0) + task.estimatedMinutes;
    assert.ok(task.reason, 'Every task must have an explicit educational reason');
  }

  // Ensure no single day exceeds the candidate stated budget
  for (const [date, totalMin] of Object.entries(minutesByDate)) {
    assert.ok(
      totalMin <= declaredDailyBudget,
      `Day ${date} total duration ${totalMin}m exceeds candidate daily budget ${declaredDailyBudget}m`
    );
  }
});

test('4. Weakness Classification Engine & Transparency', () => {
  // Knowledge gap test
  const kgLabel = WeaknessAnalysisEngine.classifyTopicPerformance({
    totalAttempts: 5,
    correctAttempts: 1,
    avgTimeSeconds: 45,
  });
  assert.strictEqual(kgLabel, 'knowledge_gap');

  // Careless error test
  const carelessLabel = WeaknessAnalysisEngine.classifyTopicPerformance({
    totalAttempts: 4,
    correctAttempts: 3,
    avgTimeSeconds: 15,
    isSpeedMistake: true,
  });
  assert.strictEqual(carelessLabel, 'careless_error');

  // Time pressure test
  const tpLabel = WeaknessAnalysisEngine.classifyTopicPerformance({
    totalAttempts: 4,
    correctAttempts: 1,
    avgTimeSeconds: 95,
  });
  assert.strictEqual(tpLabel, 'time_pressure');

  // Mastered test
  const masteredLabel = WeaknessAnalysisEngine.classifyTopicPerformance({
    totalAttempts: 10,
    correctAttempts: 9,
    avgTimeSeconds: 40,
  });
  assert.strictEqual(masteredLabel, 'mastered');
});

test('5. AI Tutor Grounded Explanation & Citations', async () => {
  const response = await AITutorService.explainQuestion({
    questionId: 'q-med1-001',
    userSelectedOptionId: 'B', // selected Ulnar nerve instead of Radial nerve
    language: 'bn',
  });

  assert.ok(response.explanationText.includes('রেডিয়াল নার্ভ'), 'Explanation must mention correct answer');
  assert.ok(response.explanationText.includes('ভুলের কারণ বিশ্লেষণ'), 'Explanation must provide error analysis');
  assert.ok(response.citedSources.length > 0, 'Explanation must include authentic citations');
  assert.strictEqual(response.isEvidenceCertain, true);
});
