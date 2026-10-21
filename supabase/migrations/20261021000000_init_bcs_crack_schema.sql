-- ====================================================================
-- BCS CRACK — DATABASE SCHEMA MIGRATION
-- Production-Ready PostgreSQL / Supabase Schema with RLS
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. Identity & Profiles
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE, -- references auth.users(id) in Supabase
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  bmdc_reg_number TEXT, -- For Medical/Dental Doctors
  institution TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('student', 'content_editor', 'content_reviewer', 'exam_manager', 'support_operator', 'super_admin')),
  granted_by UUID REFERENCES profiles(id),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- --------------------------------------------------------------------
-- 2. Exam Tracks & Versioned Configurations
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exam_tracks (
  id TEXT PRIMARY KEY, -- 'general_bcs', 'special_bcs_health_51_2026'
  title TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  description TEXT,
  cadre_category TEXT NOT NULL, -- 'general', 'health', 'education'
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exam_config_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  version_tag TEXT NOT NULL, -- e.g. 'v1.0-official-circular'
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
  effective_date DATE NOT NULL,
  total_questions INT NOT NULL DEFAULT 200,
  total_marks NUMERIC(6,2) NOT NULL DEFAULT 200.00,
  duration_seconds INT NOT NULL DEFAULT 7200, -- 120 minutes
  correct_mark NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  wrong_penalty NUMERIC(4,2) NOT NULL DEFAULT 0.50,
  unanswered_mark NUMERIC(4,2) NOT NULL DEFAULT 0.00,
  viva_marks NUMERIC(6,2) DEFAULT 100.00,
  viva_pass_mark NUMERIC(6,2) DEFAULT 50.00,
  official_source_url TEXT,
  notes TEXT,
  reviewed_by UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(exam_track_id, version_tag)
);

CREATE TABLE IF NOT EXISTS exam_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  config_version_id UUID NOT NULL REFERENCES exam_config_versions(id) ON DELETE CASCADE,
  rule_key TEXT NOT NULL,
  rule_value_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(config_version_id, rule_key)
);

-- --------------------------------------------------------------------
-- 3. Exam Subjects & Syllabus Topics Hierarchy
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exam_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  code TEXT NOT NULL, -- e.g. 'BANGLA', 'ENGLISH', 'MED_SCI_1'
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  marks NUMERIC(5,2) NOT NULL,
  question_count INT NOT NULL,
  is_professional BOOLEAN NOT NULL DEFAULT FALSE,
  professional_stream TEXT NOT NULL DEFAULT 'all' CHECK (professional_stream IN ('all', 'assistant_surgeon', 'assistant_dental_surgeon')),
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(exam_track_id, code, professional_stream)
);

CREATE TABLE IF NOT EXISTS syllabus_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES exam_subjects(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES syllabus_topics(id) ON DELETE SET NULL,
  topic_code TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  description TEXT,
  official_syllabus_page TEXT,
  weightage_level TEXT NOT NULL DEFAULT 'medium' CHECK (weightage_level IN ('low', 'medium', 'high', 'critical')),
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subject_id, topic_code)
);

-- --------------------------------------------------------------------
-- 4. Sources, Catalog & Provenance Registry
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS source_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_code TEXT UNIQUE NOT NULL, -- 'S01', 'S02', 'S03'
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  publish_date TEXT,
  authority_class TEXT NOT NULL, -- 'Primary official source'
  use_in_app TEXT NOT NULL,
  format TEXT NOT NULL,
  confidence TEXT NOT NULL, -- 'High'
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS book_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_code TEXT UNIQUE NOT NULL, -- 'B01' through 'B19'
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  author_editor TEXT,
  publisher TEXT,
  edition_date TEXT,
  language TEXT,
  page_count TEXT,
  coverage TEXT,
  recommended_use TEXT,
  priority TEXT,
  caveat TEXT,
  rights_status TEXT NOT NULL DEFAULT 'copyrighted_metadata_only' CHECK (rights_status IN ('public_official', 'copyrighted_metadata_only', 'licensed', 'restricted')),
  source_url TEXT,
  retail_price_obs TEXT,
  metadata_confidence TEXT NOT NULL DEFAULT 'Medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS source_rights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('document', 'book')),
  rights_status TEXT NOT NULL CHECK (rights_status IN ('public_official', 'copyrighted_metadata_only', 'licensed', 'restricted')),
  license_grantee TEXT,
  license_notes TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. Question Bank, Revisions & Editorial Review
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  professional_stream TEXT NOT NULL DEFAULT 'all' CHECK (professional_stream IN ('all', 'assistant_surgeon', 'assistant_dental_surgeon')),
  subject_id UUID NOT NULL REFERENCES exam_subjects(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES syllabus_topics(id) ON DELETE SET NULL,
  stem TEXT NOT NULL,
  stem_bn TEXT,
  options JSONB NOT NULL, -- [{"id": "A", "text": "...", "text_bn": "..."}, ...]
  correct_answer_id TEXT NOT NULL, -- 'A', 'B', 'C', or 'D'
  explanation_en TEXT,
  explanation_bn TEXT,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  content_origin TEXT NOT NULL DEFAULT 'expert_authored' CHECK (content_origin IN ('official_bpsc', 'licensed_book', 'expert_authored', 'ai_generated')),
  rights_status TEXT NOT NULL DEFAULT 'approved_for_study' CHECK (rights_status IN ('public_official', 'licensed', 'original', 'restricted')),
  review_status TEXT NOT NULL DEFAULT 'approved' CHECK (review_status IN ('draft', 'unverified_ai', 'under_review', 'approved', 'rejected', 'retired')),
  reviewer_id UUID REFERENCES profiles(id),
  source_book_id UUID REFERENCES book_sources(id),
  source_doc_id UUID REFERENCES source_documents(id),
  source_page_or_year TEXT,
  duplicate_hash TEXT,
  revision_number INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS question_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  revision_number INT NOT NULL,
  snapshot_json JSONB NOT NULL,
  changed_by UUID REFERENCES profiles(id),
  change_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  action TEXT NOT NULL CHECK (action IN ('approve', 'reject', 'return_with_notes')),
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 6. User Enrollments & Goals
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_exam_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  professional_stream TEXT NOT NULL DEFAULT 'general' CHECK (professional_stream IN ('general', 'assistant_surgeon', 'assistant_dental_surgeon')),
  daily_study_minutes INT NOT NULL DEFAULT 120,
  target_exam_date DATE,
  preferred_language TEXT NOT NULL DEFAULT 'bn' CHECK (preferred_language IN ('bn', 'en', 'bilingual')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, exam_track_id)
);

CREATE TABLE IF NOT EXISTS study_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  target_score NUMERIC(5,2) DEFAULT 140.00,
  target_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 7. Test Sessions, Attempts & Server-Side Scoring
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS test_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  config_version_id UUID REFERENCES exam_config_versions(id),
  professional_stream TEXT NOT NULL CHECK (professional_stream IN ('general', 'assistant_surgeon', 'assistant_dental_surgeon')),
  test_type TEXT NOT NULL CHECK (test_type IN ('full_mock', 'subject_test', 'topic_quiz', 'diagnostic')),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'expired', 'abandoned')),
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  submitted_at TIMESTAMPTZ,
  duration_seconds INT NOT NULL, -- Allowed test duration in seconds
  total_questions INT NOT NULL,
  correct_count INT NOT NULL DEFAULT 0,
  wrong_count INT NOT NULL DEFAULT 0,
  unanswered_count INT NOT NULL DEFAULT 0,
  final_score NUMERIC(6,2) NOT NULL DEFAULT 0.00,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  snapshot_hash TEXT,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_session_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_session_id UUID NOT NULL REFERENCES test_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id),
  sequence_order INT NOT NULL,
  frozen_stem TEXT NOT NULL,
  frozen_options_json JSONB NOT NULL,
  frozen_correct_answer_id TEXT NOT NULL,
  frozen_marks NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  frozen_negative_penalty NUMERIC(4,2) NOT NULL DEFAULT 0.50,
  UNIQUE(test_session_id, sequence_order)
);

CREATE TABLE IF NOT EXISTS question_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_session_id UUID NOT NULL REFERENCES test_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id),
  selected_option_id TEXT, -- 'A', 'B', 'C', 'D' or null
  is_marked_for_review BOOLEAN NOT NULL DEFAULT FALSE,
  time_spent_seconds INT NOT NULL DEFAULT 0,
  is_correct BOOLEAN,
  marks_awarded NUMERIC(4,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(test_session_id, question_id)
);

-- --------------------------------------------------------------------
-- 8. Personalization, Study Plans & Weakness Engine
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS study_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  version_number INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'superseded')),
  daily_minutes_budget INT NOT NULL DEFAULT 120,
  strategic_overview TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  study_plan_id UUID NOT NULL REFERENCES study_plans(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES syllabus_topics(id) ON DELETE SET NULL,
  task_type TEXT NOT NULL CHECK (task_type IN ('learn_concept', 'topic_practice', 'spaced_revision', 'mock_exam', 'mistake_drill')),
  title TEXT NOT NULL,
  reason TEXT NOT NULL,
  estimated_minutes INT NOT NULL DEFAULT 30,
  scheduled_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'skipped', 'rescheduled')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topic_mastery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES syllabus_topics(id) ON DELETE CASCADE,
  total_attempts INT NOT NULL DEFAULT 0,
  correct_attempts INT NOT NULL DEFAULT 0,
  accuracy_pct NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  avg_time_per_question NUMERIC(5,1) NOT NULL DEFAULT 0.0,
  last_attempt_at TIMESTAMPTZ,
  mastery_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  weakness_label TEXT NOT NULL DEFAULT 'unassessed' CHECK (weakness_label IN ('knowledge_gap', 'retention_problem', 'careless_error', 'time_pressure', 'guessing_risk', 'unassessed', 'mastered')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS revision_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES syllabus_topics(id) ON DELETE CASCADE,
  repetition_level INT NOT NULL DEFAULT 1, -- 1st, 2nd, 3rd, 4th review
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'missed')),
  last_reviewed_at TIMESTAMPTZ,
  UNIQUE(user_id, topic_id, repetition_level)
);

CREATE TABLE IF NOT EXISTS mistake_notebook (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  test_session_id UUID REFERENCES test_sessions(id) ON DELETE SET NULL,
  user_selected_option_id TEXT,
  error_type TEXT NOT NULL DEFAULT 'knowledge_gap' CHECK (error_type IN ('knowledge_gap', 'retention_problem', 'careless_error', 'time_pressure', 'guessing_risk')),
  candidate_notes TEXT,
  scheduled_review_at TIMESTAMPTZ,
  retry_count INT NOT NULL DEFAULT 0,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- --------------------------------------------------------------------
-- 9. AI Interactions, Telemetry & Audit Logs
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_id TEXT,
  topic_id UUID REFERENCES syllabus_topics(id) ON DELETE SET NULL,
  question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  prompt_tokens INT DEFAULT 0,
  completion_tokens INT DEFAULT 0,
  model_name TEXT NOT NULL,
  user_query TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  cited_sources_json JSONB,
  was_reported BOOLEAN NOT NULL DEFAULT FALSE,
  report_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details_json JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_track_id TEXT REFERENCES exam_tracks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  body TEXT NOT NULL,
  body_bn TEXT,
  source_url TEXT,
  is_urgent BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 10. Indexes for High-Performance Queries
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_questions_track_stream ON questions(exam_track_id, professional_stream, review_status);
CREATE INDEX IF NOT EXISTS idx_questions_subject_topic ON questions(subject_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_user ON test_sessions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_test_responses_session ON question_responses(test_session_id);
CREATE INDEX IF NOT EXISTS idx_topic_mastery_user ON topic_mastery(user_id, weakness_label);
CREATE INDEX IF NOT EXISTS idx_study_tasks_plan_date ON study_tasks(study_plan_id, scheduled_date, status);
CREATE INDEX IF NOT EXISTS idx_mistake_notebook_user ON mistake_notebook(user_id, resolved);

-- --------------------------------------------------------------------
-- 11. Row-Level Security (RLS) Policies
-- --------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exam_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_session_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistake_notebook ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users see and update only their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Enrollments: Users manage own enrollment
CREATE POLICY "Users can manage own enrollments" ON user_exam_enrollments FOR ALL USING (
  user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Test Sessions: Users access only their own sessions
CREATE POLICY "Users can access own test sessions" ON test_sessions FOR ALL USING (
  user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Test Responses: Users access only their own responses
CREATE POLICY "Users can access own responses" ON question_responses FOR ALL USING (
  test_session_id IN (
    SELECT id FROM test_sessions WHERE user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  )
);

-- Study Plans & Tasks: Users access only their own
CREATE POLICY "Users can view own study plans" ON study_plans FOR ALL USING (
  user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Users can manage own study tasks" ON study_tasks FOR ALL USING (
  study_plan_id IN (
    SELECT id FROM study_plans WHERE user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  )
);

-- Mistake Notebook: Users manage their own mistake notebook
CREATE POLICY "Users can manage own mistake notebook" ON mistake_notebook FOR ALL USING (
  user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Questions: Approved questions visible to all authenticated users; drafts only to editors/reviewers/admins
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students see approved questions" ON questions FOR SELECT USING (
  review_status = 'approved'
);
