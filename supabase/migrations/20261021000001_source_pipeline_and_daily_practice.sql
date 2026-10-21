-- ====================================================================
-- BCS CRACK — SOURCE PIPELINE & DAILY PRACTICE SCHEMA
-- Migration: 20261021000001_source_pipeline_and_daily_practice.sql
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. Source Registry (Priority 1: BPSC, Priority 2: Archives, Priority 3: Books, Priority 4: Expert)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS source_registry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_code TEXT UNIQUE NOT NULL, -- e.g. 'SRC-BPSC-OFFICIAL', 'SRC-GENMCQ', 'SRC-SOMADHAN', 'SRC-BCSPREP'
  name TEXT NOT NULL,
  priority INT NOT NULL CHECK (priority IN (1, 2, 3, 4)),
  category TEXT NOT NULL CHECK (category IN ('official_bpsc', 'previous_year_archive', 'authorized_book', 'expert_authored')),
  base_url TEXT NOT NULL,
  terms_summary TEXT,
  rights_status TEXT NOT NULL DEFAULT 'metadata_only' CHECK (rights_status IN ('public_domain', 'metadata_only', 'licensed', 'restricted')),
  sync_schedule TEXT DEFAULT 'manual', -- 'manual', 'daily', 'weekly'
  last_checked_at TIMESTAMPTZ,
  last_sync_status TEXT DEFAULT 'pending' CHECK (last_sync_status IN ('pending', 'synced', 'failed', 'blocked_terms')),
  error_log TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. Ingestion Jobs & Staged Items
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS source_ingestion_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_registry_id UUID REFERENCES source_registry(id) ON DELETE SET NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('scheduled_sync', 'manual_upload', 'file_import')),
  file_name TEXT,
  file_format TEXT CHECK (file_format IN ('pdf', 'docx', 'csv', 'json', 'web_html')),
  file_checksum TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  items_extracted INT NOT NULL DEFAULT 0,
  items_approved INT NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS source_ingestion_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES source_ingestion_jobs(id) ON DELETE CASCADE,
  raw_text TEXT NOT NULL,
  parsed_payload JSONB NOT NULL,
  extraction_confidence NUMERIC(4,2) DEFAULT 1.00,
  duplicate_hash TEXT,
  mapping_status TEXT NOT NULL DEFAULT 'unmapped' CHECK (mapping_status IN ('unmapped', 'auto_mapped', 'verified')),
  status TEXT NOT NULL DEFAULT 'imported' CHECK (status IN (
    'imported',
    'needs_extraction_review',
    'needs_answer_verification',
    'needs_syllabus_mapping',
    'pending_content_review',
    'approved',
    'rejected',
    'retired'
  )),
  reviewer_feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 3. Traceability Links & Verifications
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS question_source_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  source_registry_id UUID REFERENCES source_registry(id) ON DELETE SET NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('official_circular', 'past_paper', 'reference_book', 'online_archive')),
  page_number TEXT,
  year TEXT,
  examination_name TEXT,
  citation_text TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('unverified', 'verified', 'disputed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS question_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  verified_by UUID REFERENCES profiles(id),
  verification_tier TEXT NOT NULL CHECK (verification_tier IN ('bpsc_official_key', 'expert_medical_reviewer', 'expert_dental_reviewer', 'cadre_general_reviewer')),
  source_cited TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. Daily Practice Sets & Attempts Persistence
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS daily_practice_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_track_id TEXT NOT NULL REFERENCES exam_tracks(id) ON DELETE CASCADE,
  professional_stream TEXT NOT NULL DEFAULT 'general',
  practice_mode TEXT NOT NULL CHECK (practice_mode IN (
    'mixed',
    'subject_wise',
    'topic_wise',
    'past_papers',
    'special_health_common',
    'assistant_surgeon_prof',
    'assistant_dental_surgeon_prof',
    'mistake_notebook',
    'revision_due',
    'current_affairs'
  )),
  question_count INT NOT NULL DEFAULT 20,
  completed_count INT NOT NULL DEFAULT 0,
  correct_count INT NOT NULL DEFAULT 0,
  wrong_count INT NOT NULL DEFAULT 0,
  accuracy_pct NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  time_spent_seconds INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_practice_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_set_id UUID NOT NULL REFERENCES daily_practice_sets(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id),
  sequence_order INT NOT NULL,
  user_selected_option TEXT, -- 'A', 'B', 'C', 'D' or null
  is_correct BOOLEAN,
  time_spent_seconds INT NOT NULL DEFAULT 0,
  is_bookmarked BOOLEAN NOT NULL DEFAULT FALSE,
  flagged_for_review BOOLEAN NOT NULL DEFAULT FALSE,
  added_to_mistake_notebook BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(practice_set_id, sequence_order)
);

CREATE TABLE IF NOT EXISTS user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- --------------------------------------------------------------------
-- 5. Current Affairs Workflow
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS current_affairs_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  publication_date DATE NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_source_registry_cat ON source_registry(category, priority);
CREATE INDEX IF NOT EXISTS idx_ingestion_jobs_status ON source_ingestion_jobs(status);
CREATE INDEX IF NOT EXISTS idx_ingestion_items_status ON source_ingestion_items(status);
CREATE INDEX IF NOT EXISTS idx_daily_practice_user ON daily_practice_sets(user_id, practice_mode, status);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user ON user_bookmarks(user_id);
