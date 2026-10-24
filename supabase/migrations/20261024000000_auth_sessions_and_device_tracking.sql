-- ====================================================================
-- BCS CRACK — PERSISTENT AUTHENTICATION & SINGLE-DEVICE SESSION SCHEMA
-- Migration: 20261024000000_auth_sessions_and_device_tracking.sql
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. Persistent Auth Users (Accounts & Credentials)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'content_editor', 'content_reviewer', 'exam_manager', 'support_operator', 'super_admin')),
  auth_provider TEXT NOT NULL DEFAULT 'credentials' CHECK (auth_provider IN ('google', 'credentials', 'anonymous')),
  google_id TEXT,
  password_hash TEXT,
  password_salt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth_users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_auth_users_google_id ON auth_users(google_id);

-- --------------------------------------------------------------------
-- 2. Persistent Auth Sessions & Single Concurrent Device Enforcement
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth_sessions (
  session_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  issued_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  superseded_at BIGINT,
  superseded_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partial unique index guarantees that at database level,
-- NO user can ever have more than ONE active session concurrently.
CREATE UNIQUE INDEX IF NOT EXISTS idx_single_active_session_per_user 
  ON auth_sessions(user_id) 
  WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_auth_sessions_lookup ON auth_sessions(session_id, is_active);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_expiry ON auth_sessions(expires_at);

-- --------------------------------------------------------------------
-- 3. Row-Level Security (RLS) Policies
-- --------------------------------------------------------------------
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;

-- Service role has full access; anonymous/authenticated cannot directly query session tokens
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'auth_sessions' AND policyname = 'Service role manages auth sessions'
  ) THEN
    CREATE POLICY "Service role manages auth sessions" ON auth_sessions
      FOR ALL
      USING (auth.jwt() ->> 'role' = 'service_role');
  END IF;
END $$;
