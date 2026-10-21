# BCS Crack — Master Build Plan

## 1. Project Overview & Mission
**BCS Crack** is a production-grade, AI-personalized Bangladesh Civil Service (BCS) preparation web platform. Unlike generic quiz repositories or static mock test apps, BCS Crack operates on a fundamental principle: **one deterministic learning & assessment engine, isolated examination configurations, and one strictly verified source of truth.**

The platform delivers:
1. Strict separation of examination tracks: **General BCS** vs. **51st Special BCS Health 2026** (with distinct professional streams: **Assistant Surgeon / Medical Science** vs. **Assistant Dental Surgeon / Dental Science**).
2. Server-authoritative test execution, answer validation, time enforcement, and immutable scoring snapshots.
3. Personalized, adaptive study planner honoring candidate daily time budgets, revision intervals (spaced repetition), and evidence-based weakness classification.
4. Comprehensive resource catalog and source registry tracking official BPSC circulars/syllabi and curated reference books with strict intellectual property and provenance compliance.
5. Grounded AI Tutor & Study Coach utilizing approved source excerpts with bilingual (Bangla + English) explanations, uncertainty admissions, and zero unverified hallucination of official rules or answers.
6. Role-based administration for question curation, syllabus mapping, configuration versioning, and audit logging.

---

## 2. Research Assets & System-of-Record Sources

### 2.1 Research Inputs
- **Document 1: `BCS_Crack_Research_Backup_Product_Blueprint.docx`**  
  Product blueprint detailing the complete learning loop, data schemas, exam configurations, weakness taxonomy, and delivery phases.
- **Document 2: `BCS_51st_Special_Health_Book_and_Question_Bank_Catalog.xlsx`**  
  5-sheet inventory (`Read Me`, `Book Catalog` with 19 items B01–B19, `Official Sources` S01–S03, `Syllabus Map` with 10 sections, and `Rights & Quality` matrix).

### 2.2 System of Record & Verified Examination Rules
- **51st Special BCS (Health Cadre) 2026:**
  - **Vacancies:** 5,000 total (4,700 Assistant Surgeon [MBBS] + 300 Assistant Dental Surgeon [BDS]).
  - **Written MCQ Structure:** 200 questions, 200 marks, 120 minutes (7,200 seconds).
  - **Scoring Rules:** +1.0 per correct answer, -0.50 per wrong answer, 0.0 for unanswered.
  - **General Subjects (100 marks total):**
    - Bangla: 20 marks (20 MCQs)
    - English: 20 marks (20 MCQs)
    - Bangladesh Affairs: 20 marks (20 MCQs)
    - International Affairs: 20 marks (20 MCQs)
    - Mental Ability: 10 marks (10 MCQs)
    - Mathematical Reasoning: 10 marks (10 MCQs)
  - **Professional Subjects (100 marks total):**
    - *Assistant Surgeon:* Medical Science Part I (50 marks - Pre & Para Clinical: Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, Microbiology, Forensic Medicine, Community Medicine) + Medical Science Part II (50 marks - Clinical: Medicine & Allied, Surgery & Allied, Gynae & Obs, Pediatrics, etc.).
    - *Assistant Dental Surgeon:* Dental Science Part I (50 marks - Basic Sciences & Dental Anatomy/Materials) + Dental Science Part II (50 marks - Clinical Dental Specialties: Oral & Maxillofacial Surgery, Prosthodontics, Conservative Dentistry & Endodontics, Orthodontics, Periodontology, Pedodontics).
  - **Viva Voce:** 100 marks (Pass mark: 50).
  - **Timeline:** Application window: 1 Oct 2026 (10:00 AM) to 25 Oct 2026 (6:00 PM); fee payment deadline: 28 Oct 2026 (6:00 PM); Written exam expected November 2026 (subject to BPSC official notices).
  - **Eligibility:** Age 21–32 as of 1 September 2026. Bangladesh citizenship.

- **General BCS Track:**
  - Isolated track configuration. Standard preliminary structure (200 MCQs, 200 marks, 120 minutes, 10 subjects including General Science, Computer/IT, Geography/Disaster Management, Ethics/Values/Good Governance).
  - Negative marking: -0.50. No professional medical/dental section.

---

## 3. Technology Stack & Architecture

- **Framework:** Next.js (App Router) + TypeScript (strict mode).
- **Styling & UI:** Tailwind CSS, Lucide icons, accessible components, beautiful Bangla typography (SolaimanLipi / Hind Siliguri / Tiro Bangla font integration), dark/light responsive aesthetics.
- **Data Layer:** PostgreSQL (Supabase compatible) with full migration scripts, Row-Level Security (RLS) policies, and typed repositories.
- **Authentication & Authorization:** Role-based access control (`student`, `content_editor`, `content_reviewer`, `exam_manager`, `support_operator`, `super_admin`).
- **Domain Services:**
  - `ExamConfigService`: Versioned configurations, rules, marks distribution, subject hierarchy.
  - `AssessmentService`: Test session management, timer calculation, question freezing, idempotent submission, deterministic server scoring.
  - `PersonalizationEngine`: Time budget validation, syllabus topic tree, spaced-repetition revision scheduling, recovery planning for missed days.
  - `WeaknessAnalysisEngine`: Topic mastery scoring, confidence correlation, error categorization (Knowledge Gap, Retention Problem, Careless Error, Time Pressure, Guessing Risk, Unassessed).
  - `ResourceCatalogService`: Catalog metadata, verification states, rights tracking, preview/approval workflow.
  - `AITutorService`: Provider-agnostic server adapter (Gemini / Claude / OpenAI / Local fallback), grounded context injection, citation generator, uncertainty reporting.

---

## 4. Prioritized Implementation Phases

### Phase 0: System Inspection, Standards & Core Architecture Setup (Completed / In-Progress)
- Inspect environment, toolchain, and research assets.
- Produce core architecture documents: `BUILD_PLAN.md`, `IMPLEMENTATION_STATUS.md`, `ARCHITECTURE.md`, `DATA_AND_CONTENT_POLICY.md`, `DEPLOYMENT_GUIDE.md`.

### Phase 1: Application Skeleton, Theme & Database Foundations
- Initialize Next.js project with App Router, TypeScript, and Tailwind CSS.
- Establish database schema migration scripts:
  - Users, profiles, roles, and enrollments.
  - Exam tracks, config versions, exam rules, subjects, and syllabus topics.
  - Source documents, book catalog, rights, questions, and content reviews.
  - Test sessions, questions snapshots, responses, and scores.
  - Study goals, plans, daily tasks, topic mastery, and mistake notebook.
  - AI interactions, audit logs, and announcements.
- Setup seed data for 51st Special BCS Health (Medical & Dental) and General BCS configurations, official sources (S01–S03), and catalog items (B01–B19).

### Phase 2: Core Vertical Slice — Authentication, Track Selection & Exam Configuration
- Student authentication & role switching.
- Onboarding flow: track selection (General BCS vs. 51st Special Health), professional stream selection (Assistant Surgeon vs. Assistant Dental Surgeon), study hours per day, preferred language.
- Dynamic Exam Rules Engine: loads verified configuration for chosen track.

### Phase 3: Test Engine & Deterministic Scoring
- Test session creation with frozen question snapshots and exact time limits.
- Client test-taking interface: timer countdown, question navigator, flag for review, auto-save answers, full Bengali rendering.
- Server-side submit endpoint: idempotent score calculation, negative marks computation, snapshot persistence, and anti-cheat validation.
- Test result breakdown: score, accuracy, time per question, subject-wise breakdown, and answer key review.

### Phase 4: Personalized Study & Weakness Analytics Engine
- Diagnostic assessment baseline calculation.
- Study planner generating daily tasks, weekly milestones, and revision intervals fitting user's stated daily minutes.
- Evidence-based weakness detector identifying Knowledge Gaps, Retention Issues, Careless Errors, and Time Pressure.
- Mistake Notebook allowing students to review errors, tag mistakes, add personal notes, and schedule spaced retries.

### Phase 5: Resource Catalog, Official Sources & Admin Review Pipeline
- Public and authenticated Resource Library: filtered by track, stream, subject, source type, and rights status.
- Admin portal for:
  - Catalog preview, editing, and approval.
  - Exam configuration versioning and 2-person review sign-off.
  - Question authoring, bulk CSV/JSON import, syllabus mapping, and review workflow.
  - Audit logs viewer.

### Phase 6: Grounded AI Tutor & Study Coach
- Server-side LLM adapter with fallback mode.
- Context-grounded explanations citing verified syllabus references.
- Transparent indication of uncertainty and strict refusal to fabricate exam rules or answers.
- Flagging and reporting incorrect AI answers for human editor review.

### Phase 7: Verification, Automated Testing & Launch Readiness
- Automated unit and integration tests: scoring logic, penalty calculation, idempotency, time budget validation, and track isolation.
- Security audit: verify RLS rules, private API route protection, input sanitization, and secret protection.
