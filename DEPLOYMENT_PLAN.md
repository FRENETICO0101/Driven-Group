# DEPLOYMENT PLAN — Driven Group Production Release

**Status:** Ready for Staging Deployment  
**Branch:** `hardening/production-readiness` → merge to `main` → deploy  
**Date:** 2026-05-09  
**Target:** Vercel (Next.js optimized), Neon PostgreSQL

---

## 🏗️ DEPLOYMENT ARCHITECTURE

### Current State
```
Development (local)
    ↓
Git: hardening/production-readiness branch
    ↓
Staging (Vercel preview deployment)
    ↓
Production (Vercel main domain)
    
Database: Neon PostgreSQL (pooled connection)
Images: Unsplash (free), future: Cloudinary/R2
```

### Components to Deploy
1. **Next.js 16.1.6 App Router** — Full SSR + dynamic rendering
2. **Prisma ORM** — Type-safe database queries
3. **PostgreSQL (Neon)** — Managed cloud database
4. **Server Actions** — Property, lead, inquiry operations
5. **Environment Config** — DATABASE_URL, NEXT_PUBLIC_API_URL

---

## 📋 ENVIRONMENT VARIABLES REQUIRED

### Production Environment (.env.production in Vercel)

```
# DATABASE — Neon PostgreSQL (pooled connection string)
DATABASE_URL="postgresql://user:password@ep-[region]-[pool].c.[region].aws.neon.tech:5432/driven_group?sslmode=require"

# Site Configuration
NEXT_PUBLIC_API_URL="https://drivengroup.com"

# NextAuth (for future admin auth)
NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"
NEXTAUTH_URL="https://drivengroup.com"
```

### Staging Environment (.env.staging in Vercel)

```
DATABASE_URL="[same Neon connection, same DB or separate staging DB]"
NEXT_PUBLIC_API_URL="https://staging-drivengroup.vercel.app"
NEXTAUTH_SECRET="[same or different, test value]"
NEXTAUTH_URL="https://staging-drivengroup.vercel.app"
```

### Local Development (.env.local — NOT committed)

```
DATABASE_URL="postgresql://user:password@localhost:5432/driven_group"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

## ⚠️ RISKS DETECTED & MITIGATION

### 1. **Database Connection at Build Time**
**Risk:** Vercel builds on their servers; if DB unavailable, build fails.  
**Current:** Force-dynamic rendering (always SSR, no static generation)  
**Mitigation:**
- Neon connection pooled (handles connection limits)
- Build completes without DB queries (no ISR/SSG)
- Runtime queries only (safe)
- **Action:** Ensure DATABASE_URL valid before deploy

### 2. **Neon Connection Pooling**
**Risk:** Pooler endpoint vs direct endpoint have different connection limits.  
**Current:** Using `?sslmode=require` for security  
**Mitigation:**
- Use Neon pooling endpoint (ep-[project]-[pool].c.[region].aws.neon.tech:5432)
- Prisma handles connection pooling internally
- **Action:** Verify endpoint URL in Neon dashboard before deploying

### 3. **Image Optimization**
**Risk:** Unsplash images free but rate-limited; Vercel Image Optimization works with external domains.  
**Current:** Next.js Image component, Unsplash placeholder when missing property images  
**Mitigation:**
- Add Unsplash domain to `next.config.js` (or wildcard images.unsplash.com)
- **Action:** Configure Image domains in next.config.js

### 4. **Vercel Build Time**
**Risk:** Timeouts if build too slow.  
**Current:** No heavy computations, lightweight dependencies  
**Mitigation:**
- Build completes in <5min locally
- Turbopack optimized
- **Action:** Monitor build logs in Vercel dashboard

### 5. **Hydration Issues**
**Risk:** Server-side rendered HTML differs from client React on initial load.  
**Current:** Using `"use client"` only where needed (PropertyFilters), rest server-side  
**Mitigation:**
- Avoid dynamic content in initial render without proper Suspense
- **Action:** Monitor console for hydration errors in production

### 6. **Prisma Migrations at Runtime**
**Risk:** Production DB schema changes.  
**Current:** No pending migrations, schema stable  
**Mitigation:**
- Run `npx prisma migrate deploy` during CI/CD (manual for now)
- **Action:** Execute before deploy to production

---

## ✅ DEPLOYMENT CHECKLIST

### Pre-Deployment (Before merging to main)

- [ ] **Merge hardening/production-readiness → main**
  ```bash
  git checkout main
  git pull origin main
  git merge hardening/production-readiness
  git push origin main
  ```

- [ ] **Verify Neon PostgreSQL**
  - [ ] Database exists and accessible
  - [ ] Connection string copied (pooled endpoint)
  - [ ] SSL certificates valid
  - [ ] Seed data present (3 properties + agents)

- [ ] **Test Locally with Production-Like Config**
  ```bash
  npm run build          # Full production build
  npm run start          # Start production server
  # Visit http://localhost:3000
  # Test: /, /real-estate, /real-estate/[slug]
  # Test: inquiry form submission
  ```

- [ ] **Run Full Test Suite**
  ```bash
  npm run test:e2e       # Playwright E2E tests (requires DB)
  npx tsc --noEmit      # TypeScript strict check
  ```

### Staging Deployment (Vercel Preview)

- [ ] **Create Vercel Project**
  - Connect GitHub repo
  - Select `main` branch
  - Configure environment variables (staging values)
  - **Important:** DATABASE_URL must point to Neon (same or staging DB)

- [ ] **Deploy Staging Build**
  - Vercel automatically builds on push to main
  - Monitor build logs for errors
  - Expected build time: 2-4 minutes

- [ ] **Validate Staging Site**
  ```
  1. Visit https://staging-drivengroup.vercel.app
  2. Check homepage SSR + metadata
  3. Navigate to /real-estate (listing loads)
  4. Click property → /real-estate/[slug] (detail loads)
  5. Test inquiry form → check DB (Neon console)
  6. Verify error page (/real-estate/error)
  7. Check mobile responsive (DevTools)
  8. Inspect OpenGraph tags (social preview)
  9. Check robots.txt → /robots.txt accessible
  10. Check sitemap → /sitemap.xml accessible
  ```

### Production Deployment (Production Domain)

- [ ] **Configure Production Domain**
  - Add custom domain to Vercel project
  - Update DNS records (CNAME to Vercel)
  - SSL certificate auto-generated by Vercel

- [ ] **Deploy to Production**
  - Manually promote staging build or auto-deploy from main
  - Verify build succeeded in Vercel dashboard

- [ ] **Smoke Test Production**
  ```
  1. Visit https://drivengroup.com (or your domain)
  2. Full visual inspection
  3. Test all routes: /, /real-estate, /real-estate/[slug]
  4. Submit inquiry form
  5. Check database persistence
  6. Monitor Vercel logs for errors
  7. Check PageSpeed Insights
  ```

### Post-Deployment Monitoring

- [ ] **Monitor for 24 Hours**
  - Check Vercel logs for runtime errors
  - Monitor database connections in Neon console
  - Check error rate (expected: 0%)

- [ ] **Verify SEO & Social**
  - Test OpenGraph preview (Twitter, LinkedIn, Facebook)
  - Check Google Search Console (if set up)
  - Verify robots.txt allows indexing

---

## 🛠️ REQUIRED CONFIGURATIONS

### 1. **next.config.js** — Image Domains

Create or update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
```

**Why:** Vercel Image Optimization needs explicit permission for external image domains.

### 2. **Prisma Connection Pool**

Verify `prisma/schema.prisma` has correct datasource:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Note:** Neon's pooler automatically handles connection pooling.

### 3. **Vercel Environment Variables**

Set in Vercel dashboard → Project Settings → Environment Variables:

| Variable | Staging | Production |
|----------|---------|-----------|
| DATABASE_URL | Neon pooled endpoint | Neon pooled endpoint |
| NEXTAUTH_SECRET | test-secret | real-secret (openssl generated) |
| NEXTAUTH_URL | https://staging.vercel.app | https://drivengroup.com |
| NEXT_PUBLIC_API_URL | https://staging.vercel.app | https://drivengroup.com |

---

## 📊 NEON DATABASE STRATEGY

### Current: Direct Neon Connection
- **Pros:** Simple, direct, low latency
- **Cons:** Pooler endpoint has connection limits (100 concurrent)
- **For 50-100 concurrent users:** Sufficient

### Future: Supabase Migration
- **Option:** Switch to Supabase (Postgres + Auth + Storage)
- **Timeline:** After initial go-live (not critical)
- **Migration effort:** 1-2 days (schema export/import via pgAdmin)
- **Benefits:** Built-in auth, row-level security, realtime (future)

**For now:** Stick with Neon + implement Supabase only if scaling issues arise.

---

## 🚀 PRODUCTION VALIDATION CHECKLIST

### Routes & Pages
- [ ] `/` (homepage) — SSR metadata, no hydration errors
- [ ] `/real-estate` (listing) — Loads properties, filters work, pagination stable
- [ ] `/real-estate/[slug]` (detail) — Dynamic metadata per property, gallery interactive
- [ ] Error states — `/real-estate/error`, `/real-estate/[slug]/error` trigger correctly

### Forms & Persistence
- [ ] Inquiry form — Submit works, data persists in Neon DB
- [ ] Form validation — Zod errors display correctly
- [ ] Success state — User sees confirmation message

### SEO & Meta
- [ ] OpenGraph tags — Verify via social preview tools
- [ ] Twitter Card — Image + title + description correct
- [ ] robots.txt — Disallows /api, /admin; allows /
- [ ] sitemap.xml — Lists / and /real-estate (static)
- [ ] Canonical URLs — Each page has correct canonical

### Performance
- [ ] Lighthouse score — Target: 80+ (Core Web Vitals)
- [ ] Image optimization — WebP format, lazy loading works
- [ ] No console errors — Zero errors in browser DevTools
- [ ] Network tab — Images under 100KB, no large bundles

### Mobile & Responsive
- [ ] iOS Safari — Full functionality
- [ ] Android Chrome — Full functionality
- [ ] iPhone SE (375px) — Layout correct, readable
- [ ] iPad (768px) — Two-column layout works
- [ ] Desktop (1920px) — Three-column layout works

### Accessibility
- [ ] Keyboard navigation — Tab through all interactive elements
- [ ] Focus visible — Clear focus outline on all buttons
- [ ] Screen reader — Basic labels announced (aria-labels work)
- [ ] Color contrast — Text readable on dark background

### Database & Runtime
- [ ] Prisma schema — No errors, types valid
- [ ] Database connection — Steady, no pool exhaustion
- [ ] Server actions — Properties, leads, cities all respond
- [ ] Error handling — Graceful fallbacks when issues occur

---

## 📝 ROLLBACK PLAN (Basic)

If production deployment fails:

1. **Immediate Rollback (Git)**
   ```bash
   git revert HEAD                    # Revert latest commit
   git push origin main               # Push revert
   # Vercel auto-redeploys from main
   ```

2. **Vercel Rollback Dashboard**
   - Vercel keeps last 10 deployments
   - Click "Promote to Production" on previous stable build

3. **Database Rollback**
   - **If schema migration broke:** Neon has snapshots (check dashboard)
   - **If data corrupted:** Restore from Neon backup

4. **Monitoring Timeline**
   - Monitor for first 2 hours continuously
   - Then every 15 min for next 6 hours
   - Then hourly for 24 hours

---

## 🎯 SUCCESS CRITERIA

✅ Deployment is successful when:

1. **Build completes** without errors in Vercel
2. **All routes load** (/, /real-estate, /real-estate/[slug])
3. **No console errors** in production (DevTools)
4. **Inquiry form works** — data persists in DB
5. **OpenGraph renders** correctly for social sharing
6. **Mobile responsive** — no layout breaks
7. **Zero critical errors** for 24 hours post-deploy
8. **PageSpeed Insights** > 80 for mobile/desktop

---

## 🚀 DEPLOYMENT SEQUENCE

```
1. ✅ Pre-Deployment Validation (local)
   └─ npm run build
   └─ npm run start (test locally)
   
2. ✅ Merge to Main
   └─ git merge hardening/production-readiness
   └─ git push origin main
   
3. ✅ Staging Deployment (Vercel preview)
   └─ Monitor build logs
   └─ Smoke test all routes
   └─ Test inquiry persistence
   
4. ✅ Production Configuration
   └─ Custom domain setup
   └─ DNS verification
   └─ SSL auto-generated
   
5. ✅ Production Deployment
   └─ Promote staging to production
   └─ Monitor for 24 hours
   └─ Verify all success criteria
   
6. ✅ Post-Launch
   └─ Monitor error rates
   └─ Check Neon DB performance
   └─ Setup basic uptime monitoring (PingOps or similar)
```

---

## 📞 CONTACT & SUPPORT

If issues arise:

1. **Build fails:** Check Vercel logs → GitHub Actions → Local validation
2. **Database issues:** Check Neon console → Connection logs → Pool status
3. **Runtime errors:** Check Vercel Function logs → Look for error patterns
4. **Performance:** Check Lighthouse → Prioritize Core Web Vitals

---

**Status:** Ready for Staging Deployment  
**Next Step:** Merge `hardening/production-readiness` to `main` and deploy to Vercel staging
