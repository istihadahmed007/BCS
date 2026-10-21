# BCS Crack — Implementation Status

Last Updated: 2026-10-21 (Sprint 2: Source-Backed Daily Question Bank Complete)

## Current Status Summary
| Module / Phase | Status | Completion % | Notes |
|---|---|---|---|
| **Phase 0: Environment & Architecture** | Complete | 100% | Environment inspected, architecture plans created, catalogs extracted |
| **Phase 1: Project Setup & Database Layer** | Complete | 100% | Next.js App Router, Tailwind CSS, PostgreSQL/Supabase schema with RLS & migration `20261021000001` |
| **Phase 2: Auth, Onboarding & Track Selection** | Complete | 100% | Strict isolation between General BCS & 51st Special Health (Assistant Surgeon vs Dental Surgeon) |
| **Phase 3: Assessment & Scoring Engine** | Complete | 100% | Server-side deterministic scoring (+1.0 / -0.50 negative marking, 120m timer, idempotency) |
| **Phase 4: Personalized Study Engine** | Complete | 100% | Daily time budget ceiling validator, spaced repetition, recovery mode for missed days |
| **Phase 5: Resource Catalog & Admin Pipeline** | Complete | 100% | Complete B01–B19 books and S01–S03 official documents with rights tracking & admin review |
| **Phase 6: Grounded AI Tutor & Study Coach** | Complete | 100% | Context-grounded explanation engine citing official syllabus & authentic past papers |
| **Phase 7: Testing & Security Verification** | Complete | 100% | Unit tests (`tests/core-services.test.ts`) & HTTP integration suite (`tests/integration_test.py`) passing 100% |
| **Phase 8: Source Registry & Daily Practice** | Complete | 100% | Priorities 1–4 registry, Stage A-G ingestion pipeline, /study/today queue, and admin audit dashboard |

---

## Detailed Deliverable Checklist

### 1. Project Documents
- [x] `BUILD_PLAN.md`: Strategic roadmap and delivery architecture.
- [x] `QUESTION_BANK_SOURCE_PLAN.md`: Source registry, stage A-G pipeline, daily queue ratios (40/30/20/10), and review workflow.
- [x] `IMPLEMENTATION_STATUS.md`: Live phase-by-phase tracker.
- [x] `ARCHITECTURE.md`: High-level system design, data flow, security model, and API boundaries.
- [x] `DATA_AND_CONTENT_POLICY.md`: Rigorous IP guidelines, catalog vs. content policy, provenance standards.
- [x] `DEPLOYMENT_GUIDE.md`: Production deployment instructions, environment variables, Supabase setup.

### 2. Database & Data Models
- [x] PostgreSQL Schema Migrations:
  - [x] `supabase/migrations/20261021000000_init_bcs_crack_schema.sql` (Core tables, identities, exams, study plans)
  - [x] `supabase/migrations/20261021000001_source_pipeline_and_daily_practice.sql`:
    - `source_registry` (P1-P4 tracking, rightsStatus, syncSchedule, errorLogs)
    - `source_ingestion_jobs` (Checksums, fileFormat, itemsExtracted)
    - `source_ingestion_items` (duplicateHash, extractionConfidence, mappingStatus)
    - `question_source_links` (Many-to-many source citations and past paper provenance)
    - `daily_practice_sets` and `daily_practice_questions` (40/30/20/10 queue, feedback, bookmarks, auto-tag to mistake notebook)
- [x] Seed Data & Source Registry:
  - [x] Priority 1: Official BPSC portal, notices archive, and 51st Special BCS 30-Page syllabus PDF.
  - [x] Priority 2: GenMCQ, Somadhan, and BCSPrep archives (`metadata_only`, copyright and terms compliant).
  - [x] Priority 3: B01–B19 reference books from research spreadsheet catalog.
  - [x] Priority 4: Expert-reviewed, syllabus-derived practice questions.

### 3. Application Interfaces & Flows
- [x] Student Daily Practice (`/study/today`):
  - [x] Real dynamic queue generation based on 40% due revision, 30% weak topics, 20% past papers, 10% new topics.
  - [x] Configurable question counts: 10, 20, 30, 50 questions.
  - [x] Interactive card UI: answers hidden before submission, immediate feedback, -0.50 penalty indicator, verified explanations in Bengali and English.
  - [x] Interactive bookmark toggle and automatic mistake notebook tagging on incorrect responses.
  - [x] Session completion summary with net score, accuracy, time elapsed, and mistake review list.
- [x] Administrative Source Manager (`/admin/sources`):
  - [x] Multi-priority registry view (P1, P2, P3, P4).
  - [x] Terms of service and content rights inspection (`public_domain`, `metadata_only`, `licensed`, `restricted`).
  - [x] Real-time source synchronization and checksum health checks.
  - [x] Modal form to register new authorized sources.
- [x] Document Ingestion Pipeline (`/admin/question-bank/imports`):
  - [x] Support for JSON, CSV, PDF, and DOCX formats.
  - [x] Automated text normalization and SHA-256 duplicate fingerprint generation.
  - [x] Extraction history log with status, checksum, and items extracted.
- [x] Question Review Queue (`/admin/question-bank/review`):
  - [x] Human-in-the-loop review interface with split list/inspector view.
  - [x] Approve, reject, or flag questions for verification.
  - [x] Bulk approval action for eligible questions.
  - [x] Strict rule: unreviewed questions never enter the verified pool.
- [x] Question Bank Coverage & Audit Dashboard (`/admin/question-bank/coverage`):
  - [x] Real database metrics computed directly from active question pool (zero fake numbers).
  - [x] Track isolation breakdown: 51st Special BCS Health vs. General BCS.
  - [x] Stream isolation breakdown: Assistant Surgeon (MBBS) vs. Assistant Dental Surgeon (BDS).
  - [x] Content origin breakdown: Genuine Official BPSC past papers vs. Expert-reviewed practice.
  - [x] Exportable audit report (JSON).

### 4. Quality & Acceptance Gates
- [x] No hardcoded mock metrics or fake test statistics.
- [x] Strict isolation between General BCS and Special BCS Health.
- [x] Zero cross-contamination between Assistant Surgeon (MBBS) and Assistant Dental Surgeon (BDS) question banks.
- [x] Deterministic scoring and -0.50 wrong answer deduction verified by automated unit tests.
- [x] Automated test suites:
  - `tests/core-services.test.ts`: 5/5 passing.
  - `tests/source-pipeline-daily-practice.test.ts`: 6/6 passing.
  - `tests/verify_source_pipeline.py`: HTTP 200 on all routes and end-to-end API evaluation.
- [x] TypeScript type checking (`npx tsc --noEmit`) passes with 0 errors.
- [x] Production build (`npm run build`) builds all 27 static/dynamic routes cleanly in ~15s.
