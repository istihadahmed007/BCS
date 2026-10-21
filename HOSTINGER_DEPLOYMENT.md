# Hostinger Deployment Guide for `bcs.vartualtutor.com`

This comprehensive guide explains how to deploy **BCS Crack** to Hostinger for the subdomain **`bcs.vartualtutor.com`**.

---

## 🧭 Which Hostinger Option are You Using?

Choose the method that matches your Hostinger setup:
- [Method 1: Hostinger VPS (Recommended for Full Control)](#method-1-hostinger-vps-docker-or-pm2--nginx)
- [Method 2: Hostinger Cloud / Web Hosting (hPanel Node.js Application)](#method-2-hostinger-cloud--web-hosting-hpanel-nodejs)
- [Method 3: Hostinger DNS + Vercel (Easiest, Free Hosting, Zero-Maintenance)](#method-3-hostinger-dns--vercel-fastest--recommended-for-simplicity)

---

## Step 0: Hostinger DNS Configuration for `bcs.vartualtutor.com`

Before deploying, configure your DNS record in Hostinger hPanel:

1. Log into your **Hostinger hPanel**.
2. Go to **Domains** -> click on **`vartualtutor.com`** -> **DNS / Nameservers**.
3. Add the DNS record according to your hosting target:

| Hosting Target | Record Type | Name / Subdomain | Target / Value | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **Hostinger VPS** | `A` | `bcs` | `YOUR_VPS_IP_ADDRESS` | 14400 (Default) |
| **Hostinger Web Hosting** | Subdomain automatically creates record | `bcs` | Automatic | Default |
| **Vercel** | `CNAME` | `bcs` | `cname.vercel-dns.com` | 14400 (Default) |

---

## Method 1: Hostinger VPS (Docker or PM2 + Nginx)

Hostinger VPS provides a dedicated Ubuntu/Debian environment. This is the most reliable way to run Next.js with complete process control.

### Option A: 1-Command Docker Deployment (Fastest on VPS)

1. **SSH into your Hostinger VPS**:
   ```bash
   ssh root@YOUR_VPS_IP
   ```

2. **Clone your repository**:
   ```bash
   git clone <YOUR_GIT_REPO_URL> /var/www/bcs
   cd /var/www/bcs
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.production.example .env.production
   nano .env.production
   ```
   *Fill in your Supabase connection strings, keys, and Gemini AI API key.*

4. **Build and Run with Docker Compose**:
   ```bash
   docker compose up -d --build
   ```
   Your app will start on port `3000`.

5. **Configure Nginx and SSL**:
   Copy the pre-configured Nginx file:
   ```bash
   cp nginx-bcs.conf /etc/nginx/sites-available/bcs.vartualtutor.com
   ln -s /etc/nginx/sites-available/bcs.vartualtutor.com /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

   Issue a free Let's Encrypt SSL certificate:
   ```bash
   certbot --nginx -d bcs.vartualtutor.com
   ```

---

### Option B: PM2 + Node.js (Direct on VPS)

1. **Install Node.js 20+ & PM2 on VPS**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs nginx certbot python3-certbot-nginx
   npm install -g pm2
   ```

2. **Clone & Build**:
   ```bash
   cd /var/www/bcs
   npm ci
   cp .env.production.example .env.local
   nano .env.local   # fill in your keys
   npm run package:standalone
   ```

3. **Launch with PM2**:
   ```bash
   cd .next/standalone
   cp ../../ecosystem.config.cjs .
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx reverse proxy**:
   Use `nginx-bcs.conf` as described in Step 5 above.

---

## Method 2: Hostinger Cloud / Web Hosting (hPanel Node.js)

> [!WARNING]
> **Why uploading raw source code to Hostinger's build runner fails:**
> Hostinger's automatic build container runs an older Linux kernel lacking `GLIBC_2.29` and has low memory limits. Next.js 16 native SWC and TypeScript config transpilation (`next.config.ts`) will fail with `GLIBC_2.29 not found` and `Cannot find module ... next.config`.
>
> **The Solution:** We configured `next.config.mjs` and automated local packaging. Build once locally with `npm run package:standalone` and upload the generated **`deploy-hostinger.zip`** (or use **Method 3: Vercel + Hostinger DNS**). Hostinger will only run Node.js without needing to compile anything!

If you have a Hostinger Business or Cloud hosting plan with the built-in **Node.js Application** feature:

### Step 1: Create the Subdomain in hPanel
1. In hPanel, go to **Websites** -> select `vartualtutor.com` -> **Manage**.
2. In the left sidebar, click **Domains** -> **Subdomains**.
3. Create subdomain:
   - Subdomain name: `bcs`
   - Custom folder: check the box and name it `public_html/bcs` (or your preferred directory).
   - Click **Create**.

### Step 2: Prepare the Standalone Bundle Locally
On your local machine, run:
```bash
npm run package:standalone
```
This builds your Next.js application, bundles all static and public assets, and automatically generates a ready-to-upload archive:
`deploy-hostinger.zip` (located in your project root, ~6 MB).

### Step 3: Upload and Extract in Hostinger
1. In Hostinger hPanel, open **File Manager**.
2. Navigate to your subdomain directory (e.g., `public_html/bcs/` or `domains/bcs.vartualtutor.com/public_html/`).
3. Upload `deploy-hostinger.zip`.
4. Right-click `deploy-hostinger.zip` -> click **Extract** (extracts `server.js`, `node_modules`, `.next`, and `public` directly into the directory).
5. Delete `deploy-hostinger.zip` after extracting.
6. Create or upload your `.env` file in this directory with your production keys (copy from `.env.production.example`).

### Step 4: Configure Node.js in hPanel
1. In hPanel, go to **Advanced** -> **Node.js** (or search "Node.js").
2. Click **Create Application**:
   - **Node.js version**: `20.x` or `22.x`
   - **Application root**: `public_html/bcs` (or your subdomain directory)
   - **Application startup file**: `server.js`
   - **Application URL**: `bcs.vartualtutor.com`
3. Click **Save** and click **Start Application** / **Restart**.

### Step 5: Enable SSL in hPanel
1. Go to **Security** -> **SSL**.
2. Select `bcs.vartualtutor.com` and click **Install SSL** (free Let's Encrypt).

---

## Method 3: Hostinger DNS + Vercel (Fastest & Recommended for Simplicity)

If you want the easiest, free, high-speed edge deployment without server management:

1. **Deploy your Next.js repository to Vercel** (connect GitHub repo to [vercel.com](https://vercel.com)).
2. Add your production environment variables in Vercel project settings.
3. In Vercel -> Project **Settings** -> **Domains**:
   - Add `bcs.vartualtutor.com`.
4. In Hostinger hPanel -> **Domains** -> `vartualtutor.com` -> **DNS / Nameservers**:
   - Add a `CNAME` record:
     - **Name**: `bcs`
     - **Target / Value**: `cname.vercel-dns.com`
     - **TTL**: `14400`
5. Vercel will instantly verify the domain and provision SSL automatically.

---

## 🔒 Production Environment Variables Checklist

Ensure these variables are filled in your production environment:

```ini
NEXT_PUBLIC_APP_URL=https://bcs.vartualtutor.com
NEXT_PUBLIC_APP_NAME="BCS Crack"
NEXT_PUBLIC_APP_ENV=production

DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres

NEXT_PUBLIC_SUPABASE_URL=https://[REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

AI_PROVIDER=gemini
AI_API_KEY=your_gemini_api_key_here
AI_MODEL_NAME=gemini-1.5-flash

NEXTAUTH_SECRET=your_secret_hex_key
NEXTAUTH_URL=https://bcs.vartualtutor.com
```

---

## Verification & Post-Deployment Checklist

- [ ] Visit `https://bcs.vartualtutor.com` in your browser.
- [ ] Check SSL padlock in the address bar.
- [ ] Verify Supabase database connectivity by navigating to `/onboarding` or `/test`.
- [ ] Test an AI question explanation at `/api/ai/explain`.
- [ ] Check responsive design on mobile and desktop viewports.
