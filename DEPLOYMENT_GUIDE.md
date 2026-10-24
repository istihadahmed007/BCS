# BCS Crack — Deployment & Operations Guide

## 1. Prerequisites & Environment Setup

- **Runtime:** Node.js v20+ (tested on Node v24 LTS), npm v10+.
- **Database:** PostgreSQL v15+ or managed Supabase instance with Row-Level Security (RLS) enabled.
- **AI Provider (Optional / Pluggable):** Google Gemini API, OpenAI API, Anthropic Claude API, or offline built-in rule-based fallback.

---

## 2. Environment Configuration

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### Required Configuration Keys:
```ini
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="BCS Crack"
NEXT_PUBLIC_APP_ENV=development

# Database (PostgreSQL / Supabase)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Supabase Auth & Storage
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Provider Configuration (Server-Side Only - NEVER expose to client)
AI_PROVIDER=gemini # options: gemini | openai | claude | mock
AI_API_KEY=your_server_side_api_key_here
AI_MODEL_NAME=gemini-1.5-flash
AI_REQUEST_TIMEOUT_MS=15000

# Security & Session Secrets (CRITICAL: Minimum 32 characters, fail-closed in production)
SESSION_SECRET=generate_a_random_cryptographically_strong_32_byte_secret_here
NEXTAUTH_SECRET=generate_a_random_cryptographically_strong_32_byte_secret_here
NEXTAUTH_URL=https://bcs.vartualtutor.com

# Authoritative Administrator Bootstrap Credentials
# Required for production password-based administrator authentication.
# In production, the system fails closed if this is not securely configured.
SUPER_ADMIN_PASSWORD=your_secure_unique_admin_bootstrap_password_here
SUPER_ADMIN_EMAILS=istihadahmed1163@gmail.com,istihadahmed007@gmail.com,admin@bcs.vartualtutor.com

> [!CAUTION]
> **COMPROMISED CREDENTIALS NOTICE & MANDATORY ROTATION:**
> Previously exposed default passwords (`Istihad@Admin2026!`, `student123456`) and the hardcoded secret (`bcs_crack_prod_session_secret_change_in_production_2026`) are blacklisted and permanently rejected by the server. If any production environment was previously deployed with these credentials, they must be rotated immediately.


---

## 3. Database Migration & Seeding

1. Execute the initial schema migration located in `supabase/migrations/20261021_init_bcs_crack_schema.sql` against your PostgreSQL/Supabase database.
2. Run the verified seed script to populate:
   - Official 51st Special BCS 2026 Health Configuration (Assistant Surgeon & Dental Surgeon streams).
   - General BCS Examination baseline configuration.
   - 30-Page BPSC syllabus topics hierarchy.
   - Resource Catalog entries B01–B19 and Official Source Documents S01–S03.
   - Initial verified questions for diagnostic and mock testing.

```bash
# Using npm script:
npm run db:migrate
npm run db:seed
```

---

## 4. Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open in browser:
http://localhost:3000
```

---

## 5. Production Build & Deployment (Vercel + Supabase)

### Vercel Deployment:
1. Connect your Git repository to Vercel.
2. Select Framework: **Next.js**.
3. Configure the environment variables in Vercel project settings matching `.env.example`.
4. Deploy:
```bash
npm run build
```

### Hostinger Deployment (bcs.vartualtutor.com):
For detailed, step-by-step instructions to deploy to Hostinger (VPS, hPanel Node.js Application, or DNS to Vercel), see [HOSTINGER_DEPLOYMENT.md](file:///c:/Users/Tonmoy/Downloads/bcs/HOSTINGER_DEPLOYMENT.md).

### Pre-Launch Production Acceptance Checklist:
- [ ] All database RLS policies verified: Students cannot query other candidates' records or private admin logs.
- [ ] Server scoring verified against 51st Special BCS Health specification (+1.0 correct, -0.50 wrong, 0 unanswered, 120 minutes for 200 questions).
- [ ] No private API keys or service role secrets leaked in client-side bundles (`NEXT_PUBLIC_*`).
- [ ] Resource catalog displays correct provenance, and unverified AI questions are quarantined from official mock tests.
- [ ] Responsive UI verified on mobile, tablet, and desktop viewports with proper Bengali font rendering.
