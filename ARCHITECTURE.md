# BCS Crack — System Architecture Document

## 1. Architectural Philosophy & Design Tenets

BCS Crack is engineered with a strict separation between **deterministic domain logic** and **probabilistic AI intelligence**:
1. **The Server is Authoritative:** Test timings, answer evaluations, score calculations, negative mark deductions, and syllabus prerequisites are 100% deterministic code executed server-side.
2. **Immutable Test Snapshots:** When a candidate starts a test, the questions, options order, marks, and scoring rules are frozen into a session snapshot. Future question edits or rule modifications never alter historic results.
3. **Strict Track Isolation:** General BCS and 51st Special BCS Health configurations, syllabi, questions, and scoring parameters are strictly partitioned. Inside Special Health, Assistant Surgeon (Medical Science) and Assistant Dental Surgeon (Dental Science) operate on separate professional subject trees.
4. **Source Provenance & Content Transparency:** Every resource in the catalog and question in the bank maintains a provenance record (source type, edition, page/year, rights status, review status).
5. **AI with Guardrails:** The AI Tutor acts as an explanatory coach grounded exclusively in verified syllabus topics and approved excerpts. It never invents official rules, answers, or dates, and admits missing evidence cleanly.

---

## 2. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|  Next.js App Router (React 19 / TypeScript / Tailwind CSS / SolaimanLipi Font)    |
|  - Public Landing & Track Selector         - Interactive Mock Test Player         |
|  - Student Onboarding & Diagnostics        - Weakness Radar & Result Analytics    |
|  - Adaptive Study Plan & Tasks             - AI Study Coach Chat Interface        |
|  - Mistake Notebook & Spaced Revisions     - Admin Management & Review Portal     |
+-----------------------------------------------------------------------------------+
                                       |
                           HTTPS / Server Actions / REST API
                                       |
+-----------------------------------------------------------------------------------+
|                                 SERVER LAYER                                      |
|  Next.js Route Handlers & Server Domain Services (Stateless, Validated via Zod)   |
|                                                                                   |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  | ExamConfigService  |  | AssessmentEngine   |  | PersonalizationEngine       |  |
|  | - Track isolation  |  | - Snapshot freezing|  | - Daily time budget check   |  |
|  | - Versioned rules  |  | - Timer & expiry   |  | - Spaced repetition queue   |  |
|  | - Syllabus tree    |  | - Idempotent score |  | - Recovery planner          |  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|                                                                                   |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  | WeaknessService    |  | ContentRegistry    |  | AITutorService (Grounded)   |  |
|  | - Topic mastery    |  | - B01-B19 catalog  |  | - Provider adapter (Gemini) |  |
|  | - Error taxonomy   |  | - Rights tracking  |  | - Approved context retrieval|  |
|  | - Time per item    |  | - Two-stage review |  | - Strict hallucination block|  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
+-----------------------------------------------------------------------------------+
                                       |
                  Typed Database Driver / Supabase Client
                                       |
+-----------------------------------------------------------------------------------+
|                                PERSISTENCE LAYER                                  |
|  PostgreSQL Database (Supabase compatible) with Strict Row-Level Security (RLS)  |
|  - Profiles & Roles (`profiles`, `user_roles`, `user_exam_enrollments`)           |
|  - Configs & Rules (`exam_tracks`, `exam_config_versions`, `exam_rules`)          |
|  - Syllabus & Topics (`exam_subjects`, `syllabus_topics`)                         |
|  - Sources & Books (`source_documents`, `book_sources`, `source_rights`)          |
|  - Questions & Reviews (`questions`, `question_revisions`, `content_reviews`)     |
|  - Attempts & Scoring (`test_sessions`, `test_session_questions`, `responses`)   |
|  - Study Plans & Mastery (`study_plans`, `study_tasks`, `topic_mastery`)          |
|  - Mistake Notebook & Spaced Repetition (`mistake_notebook`, `revision_schedule`) |
|  - Audit & Telemetry (`audit_logs`, `ai_interactions`, `user_reports`)            |
+-----------------------------------------------------------------------------------+
```

---

## 3. Core Domain Services

### 3.1 ExamConfigService
- Encapsulates track configurations:
  - `special_bcs_health_51_2026`: 200 questions, 120 minutes, correct +1.0, wrong -0.50, unanswered 0.
    - General subjects: Bangla (20), English (20), Bangladesh Affairs (20), International Affairs (20), Mental Ability (10), Mathematical Reasoning (10).
    - Professional streams: Assistant Surgeon (Medical Science Part I: 50, Part II: 50) vs. Assistant Dental Surgeon (Dental Science Part I: 50, Part II: 50).
  - `general_bcs_standard`: 200 questions, 120 minutes, 10 distinct non-medical subjects.
- Versioning support: configurations are immutable once published. Updates create a new version with audit notes.

### 3.2 AssessmentEngine
- **Session Initialization:** When a test begins, questions are selected based on track and stream criteria. A frozen snapshot of each question (stem, options, correct answer, mark weight) is recorded into `test_session_questions`.
- **Timer & Expiry:** Start time and maximum duration are stored server-side. Submissions exceeding duration + grace period (15 seconds for network latency) are marked as expired.
- **Scoring Algorithm:**
  $$\text{Score} = \sum (\text{Correct} \times 1.0) - \sum (\text{Incorrect} \times 0.50)$$
- **Idempotency:** Submission uses an idempotent hash/token. Retrying a submission returns the exact existing score record without duplicate calculations.

### 3.3 PersonalizationEngine
- **Time Budget Enforcement:** Reads candidate's available daily minutes (e.g., 90 mins). Never generates a schedule exceeding this ceiling without candidate's explicit approval.
- **Adaptive Task Generation:**
  - Priority 1: Overdue spaced-repetition revisions.
  - Priority 2: High-error topics from recent assessments.
  - Priority 3: Unassessed syllabus topics.
- **Recovery Mode:** If a candidate misses 3+ days, rather than an impossible accumulating backlog, it compresses unstarted tasks and reschedules based on proximity to exam date.

### 3.4 WeaknessAnalysisEngine
- Classifies candidate errors into distinct categories:
  - **Knowledge Gap:** Repeated errors in a specific topic regardless of time spent.
  - **Retention Problem:** Topic answered correctly in the past but missed after a 7+ day delay.
  - **Careless Error:** High-mastery topic missed while answered in <20 seconds.
  - **Time Pressure:** Items answered incorrectly near the end of a timed test session or taking >90s.
  - **Guessing Risk:** Low-confidence response with incorrect outcome.
  - **Unassessed:** Topic with fewer than 3 question attempts.

### 3.5 AITutorService (Grounded Retrieval)
- Adapts to LLM providers (Google Gemini, OpenAI, Claude, or local mock).
- Grounding: When student asks for explanation on a question, the service queries approved syllabus excerpts, official guidelines, and verified rationale.
- System prompt enforces:
  - Explain in clear Bangla and English.
  - Cite the official syllabus topic.
  - If reasoning is uncertain, explicitly state "Evidence not found in verified corpus".
  - Never fabricate cut-off marks, official exam dates, or circular rules.

---

## 4. Security & Data Protection Architecture

1. **Role-Based Access Control (RBAC):**
   - Roles: `student`, `content_editor`, `content_reviewer`, `exam_manager`, `support_operator`, `super_admin`.
   - Admin routes (`/admin/*`) require server-side session checks and role validation.
2. **Row-Level Security (RLS):**
   - Students can only SELECT, INSERT, and UPDATE their own `profiles`, `test_sessions`, `study_plans`, `mistake_notebook` records.
   - Question bank items with `review_status != 'approved'` are invisible to students.
   - Resource files with restricted rights (`rights_status = 'restricted'`) are accessible only via signed short-lived URLs to authorized roles.
3. **Input Sanitization & Validation:**
   - All server API payloads validated via Zod schemas.
   - Prevents injection attacks, malformed JSON, and client tampering with exam scores or timers.
4. **Audit Trail:**
   - Critical operations (rule changes, role escalation, question approval, user suspension) write immutable records to `audit_logs`.
