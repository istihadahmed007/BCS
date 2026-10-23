-- ====================================================================
-- BCS CRACK — PACKAGES, SUBSCRIPTIONS & PAYMENT SYSTEM SCHEMA
-- Migration: 20261023000000_subscription_and_payment_system.sql
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. Question Access Tier (Free Preview vs Premium vs Restricted)
-- --------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questions' AND column_name = 'access_tier'
  ) THEN
    ALTER TABLE questions 
    ADD COLUMN access_tier TEXT NOT NULL DEFAULT 'premium' 
    CHECK (access_tier IN ('free_preview', 'premium', 'package_restricted'));
    
    CREATE INDEX IF NOT EXISTS idx_questions_access_tier ON questions(access_tier);
  END IF;
END $$;

-- --------------------------------------------------------------------
-- 2. Packages Catalog Table
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY, -- 'pkg_free_preview', 'pkg_bcs_standard', 'pkg_bcs_complete', 'pkg_bcs_medical'
  name TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  description TEXT NOT NULL,
  description_bn TEXT NOT NULL,
  price_bdt NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  original_price_bdt NUMERIC(10, 2),
  duration_days INT NOT NULL DEFAULT 0, -- 0 for lifetime/free
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'inactive')),
  tier TEXT NOT NULL CHECK (tier IN ('free', 'standard', 'complete', 'medical')),
  eligible_tracks JSONB NOT NULL DEFAULT '["general_bcs"]',
  eligible_streams JSONB NOT NULL DEFAULT '["general"]',
  eligible_subjects JSONB,
  included_practice_modes JSONB NOT NULL DEFAULT '["daily_mixed"]',
  included_mock_tests JSONB NOT NULL DEFAULT '[]',
  features JSONB NOT NULL DEFAULT '[]',
  features_bn JSONB NOT NULL DEFAULT '[]',
  free_daily_limit INT DEFAULT 20,
  is_popular BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default initial packages
INSERT INTO packages (
  id, name, name_bn, description, description_bn, price_bdt, original_price_bdt, duration_days, status, tier,
  eligible_tracks, eligible_streams, included_practice_modes, included_mock_tests, features, features_bn, free_daily_limit, is_popular
) VALUES
(
  'pkg_free_preview',
  'Free Preview',
  'ফ্রি ট্রায়াল প্ল্যান',
  'Access designated free questions, diagnostic test, and experience BCSCrack precision prep.',
  'বিনামূল্যে ফ্রি প্রশ্ন ব্যাংক ও ডায়াগনস্টিক পরীক্ষার সুবিধা।',
  0.00,
  NULL,
  0,
  'active',
  'free',
  '["general_bcs", "special_bcs_health_51_2026"]',
  '["general", "assistant_surgeon", "assistant_dental_surgeon"]',
  '["daily_mixed"]',
  '["diagnostic"]',
  '["Access to verified free question preview", "Up to 20 daily practice questions", "Basic answer explanations", "Free diagnostic test evaluation"]',
  '["বাছাইকৃত ফ্রি প্রশ্ন অনুশীলনের সুযোগ", "দৈনিক সর্বোচ্চ ২০টি প্রশ্ন সমাধান", "মৌলিক ব্যাখ্যা ও নির্ভুল উত্তর", "ফ্রি ডায়াগনস্টিক টেস্ট ও প্রাথমিক মূল্যায়ন"]',
  20,
  FALSE
),
(
  'pkg_bcs_standard',
  'BCS Preparation',
  'সাধারণ বিসিএস প্রিপারেশন',
  'Full access to all 10 general BCS preliminary subjects, daily practice, topic drills, and question bank.',
  '১০টি সাধারণ বিসিএস প্রিলিমিনারি বিষয়ের পূর্ণাঙ্গ প্রশ্ন ব্যাংক ও বিষয়ভিত্তিক অনুশীলন।',
  500.00,
  750.00,
  90,
  'active',
  'standard',
  '["general_bcs"]',
  '["general"]',
  '["daily_mixed", "previous_exams", "subject_wise", "mistake_notebook"]',
  '["diagnostic", "subject_test", "full_mock"]',
  '["Full access to 10 General BCS subjects", "Unlimited daily mixed practice", "Previous 10-46th BCS question papers", "Subject-wise targeted drilling", "Mistake Notebook revision tracker"]',
  '["১০টি সাধারণ বিসিএস বিষয়ের পূর্ণাঙ্গ প্রশ্ন ব্যাংক", "আনলিমিটেড দৈনিক সক্রিয় স্মরণ প্র্যাকটিস", "১০ম-৪৬তম বিসিএস বিগত প্রশ্ন সমাধান", "বিষয়ভিত্তিক অধ্যায়ভিত্তিক নিবিড় প্রস্তুতি", "ভুল খাতা ও দুর্বলতা ট্র্যাকার"]',
  NULL,
  TRUE
),
(
  'pkg_bcs_complete',
  'Complete BCS Preparation',
  'কমপ্লিট বিসিএস মাস্টার প্ল্যান',
  'Everything in Standard plus AI explanations, full 200-mark mock exams with negative marking, and extended validity.',
  'সব সাধারণ বিসিএস বিষয়, ২০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট, এআই টিউটর ও দীর্ঘমেয়াদী মেয়াদ।',
  990.00,
  1500.00,
  180,
  'active',
  'complete',
  '["general_bcs"]',
  '["general"]',
  '["daily_mixed", "previous_exams", "subject_wise", "mistake_notebook"]',
  '["diagnostic", "subject_test", "full_mock"]',
  '["All Standard package features", "Unlimited 200-mark full mock exams", "Official -0.50 negative marking simulation", "Deep AI conceptual explanations", "Priority access to newly updated circulars"]',
  '["স্ট্যান্ডার্ড প্যাকেজের সব সুবিধা", "২০০ নম্বরের আনলিমিটেড পূর্ণাঙ্গ মডেল টেস্ট", "অফিসিয়াল -০.৫০ নেগেটিভ মার্কিং অ্যানালাইসিস", "বিস্তারিত এআই কনসেপ্ট ব্যাখ্যা", "নতুন সার্কুলার ও আপডেটেড তথ্যে অগ্রাধিকার"]',
  NULL,
  FALSE
),
(
  'pkg_bcs_medical',
  'Medical BCS Preparation (51st Special)',
  '৫১তম বিশেষ বিসিএস (স্বাস্থ্য) স্পেশাল',
  'Dedicated 100-mark professional medical syllabus for Assistant Surgeon (MBBS) & Assistant Dental Surgeon (BDS).',
  'সহকারী সার্জন ও ডেন্টাল সার্জন পদের ১০০ নম্বরের প্রফেশনাল পার্ট ও ১০০ নম্বরের সাধারণ পার্টের সম্পূর্ণ প্যাকেজ।',
  1200.00,
  1800.00,
  180,
  'active',
  'medical',
  '["special_bcs_health_51_2026", "general_bcs"]',
  '["assistant_surgeon", "assistant_dental_surgeon", "general"]',
  '["daily_mixed", "previous_exams", "subject_wise", "mistake_notebook"]',
  '["diagnostic", "subject_test", "full_mock"]',
  '["100-Mark Professional Medical Bank (Anatomy, Physio, Patho, Pharma, Med, Surg, Gynae)", "Separate stream isolation for MBBS vs BDS", "100-Mark General BCS portion included", "Full 200-Mark 51st Special BCS Simulation", "Clinical case MCQs & explanations"]',
  '["১০০ নম্বরের প্রফেশনাল মেডিকেল প্রশ্ন ব্যাংক (অ্যানাটমি, ফিজিও, প্যাথো, সার্জারি ইত্যাদি)", "সহকারী সার্জন (MBBS) ও ডেন্টাল সার্জন (BDS) আলাদা ট্র্যাক", "১০০ নম্বরের সাধারণ বিষয়ের প্রস্তুতি অন্তর্ভুক্ত", "২০০ নম্বরের ৫১তম বিশেষ বিসিএস ফুল সিমুলেশন", "ক্লিনিক্যাল কেস ভিত্তিক এমসিকিউ ও ব্যাখ্যা"]',
  NULL,
  TRUE
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  description = EXCLUDED.description,
  description_bn = EXCLUDED.description_bn,
  price_bdt = EXCLUDED.price_bdt,
  original_price_bdt = EXCLUDED.original_price_bdt,
  duration_days = EXCLUDED.duration_days,
  tier = EXCLUDED.tier,
  features = EXCLUDED.features,
  features_bn = EXCLUDED.features_bn;

-- --------------------------------------------------------------------
-- 3. Orders Table
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, -- e.g. 'ORD-20261023-XXXX'
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  package_id TEXT NOT NULL REFERENCES packages(id) ON DELETE RESTRICT,
  package_name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'standard', 'complete', 'medical')),
  amount_bdt NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BDT',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'cancelled')),
  payment_gateway TEXT NOT NULL CHECK (payment_gateway IN ('sslcommerz', 'aamarpay', 'sandbox')),
  gateway_transaction_id TEXT,
  metadata JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_gateway_tx ON orders(gateway_transaction_id);

-- --------------------------------------------------------------------
-- 4. Payment Transactions Table
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  gateway TEXT NOT NULL CHECK (gateway IN ('sslcommerz', 'aamarpay', 'sandbox')),
  gateway_transaction_id TEXT NOT NULL,
  amount_bdt NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BDT',
  status TEXT NOT NULL CHECK (status IN ('initiated', 'verified', 'failed', 'cancelled')),
  gateway_response_raw JSONB,
  verified_at TIMESTAMPTZ,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_tx_order ON payment_transactions(order_id);

-- --------------------------------------------------------------------
-- 5. User Subscriptions / Entitlements Table
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  package_id TEXT NOT NULL REFERENCES packages(id) ON DELETE RESTRICT,
  package_name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'standard', 'complete', 'medical')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
  granted_by TEXT NOT NULL DEFAULT 'system', -- 'system' | 'payment' | 'admin:<id>'
  grant_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user ON user_subscriptions(user_id, status, expires_at);

-- --------------------------------------------------------------------
-- 6. Free Plan Usage Tracking
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS free_plan_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  questions_attempted INT NOT NULL DEFAULT 0,
  daily_limit INT NOT NULL DEFAULT 20,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);

CREATE INDEX IF NOT EXISTS idx_free_plan_usage_user_date ON free_plan_usage(user_id, usage_date);

-- --------------------------------------------------------------------
-- 7. Subscription & Payment Audit Logs
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscription_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN (
    'grant_subscription',
    'revoke_subscription',
    'extend_subscription',
    'create_package',
    'update_package',
    'toggle_question_access',
    'verify_payment'
  )),
  target_type TEXT NOT NULL CHECK (target_type IN ('user', 'subscription', 'package', 'question', 'order')),
  target_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 8. Row-Level Security
-- --------------------------------------------------------------------
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_plan_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_audit_logs ENABLE ROW LEVEL SECURITY;

-- Packages: Anyone can view active packages
CREATE POLICY "Public can view active packages" ON packages FOR SELECT USING (status = 'active');

-- Orders: Users view their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
  user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- User Subscriptions: Users view their own active and historical entitlements
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions FOR SELECT USING (
  user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Free Plan Usage: Users view their own daily usage
CREATE POLICY "Users can view own usage" ON free_plan_usage FOR SELECT USING (
  user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
