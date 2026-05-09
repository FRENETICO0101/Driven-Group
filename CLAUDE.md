# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📋 Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start Next.js dev server (localhost:3000)
npm run build            # Production build
npm run start            # Run production server

# Database & ORM
npx prisma generate     # Regenerate Prisma client
npx prisma migrate dev --name <name>  # Create and run migration
npx prisma studio      # Open Prisma Studio (GUI for database)
npx prisma migrate reset  # ⚠️ Full database reset (dev only)

# Linting
npm run lint            # Run ESLint
```

**Testing**: No test suite yet (Vitest planned for Phase 4)

---

## 🏗️ Architecture Overview

### Route Structure (Grouped by Domain)

The app uses Next.js 16 with route grouping to organize code by business domain:

- **`(marketing)/`** — Public/SEO pages (landing, real-estate listing, about, contact)
  - Layout in [src/app/(marketing)/layout.tsx](src/app/(marketing)/layout.tsx)
  - Marketing-specific components in [src/components/marketing/](src/components/marketing/)

- **`(platform)/`** — Authenticated admin/agent pages (dashboard, property CRUD, lead management)
  - Layout in [src/app/(platform)/layout.tsx](src/app/(platform)/layout.tsx)
  - Admin components in [src/components/admin/](src/components/admin/)

- **`/api`** — Backend API routes (RESTful endpoints)
  - Health check at `/api/health`
  - Property/inquiry endpoints coming in Phase 2

**Why this structure?**: Grouping by domain (marketing vs platform) keeps related pages, components, and layouts together. The parentheses make route groups invisible in the URL while organizing the file tree semantically.

### Data Flow Pattern

```
UI Components (Client)
    ↓
Server Actions (src/server/actions/)
    ↓
Service Layer (src/server/services/)  [Business Logic]
    ↓
Repository Layer (src/server/repositories/)  [Data Access]
    ↓
Prisma Client → PostgreSQL
```

- **Actions** ([src/server/actions/](src/server/actions/)): Server-side entry points that wrap service calls with error handling. Exported with `"use server"`.
- **Services** ([src/server/services/](src/server/services/)): Pure business logic. Calls repositories, applies validation, orchestrates workflows.
- **Repositories** ([src/server/repositories/](src/server/repositories/)): Data access layer. Prisma queries live here. Know about database schema; services don't.

This 3-layer pattern keeps concerns separated and makes testing/refactoring easier.

---

## 🗄️ Database & Schema

### Key Models

- **User** — Roles: VIEWER (public), AGENT (realtor), ADMIN (platform admin)
- **Property** — Core real estate listings with images, location, details, amenities
- **PropertyImage** — Gallery for each property (ordered)
- **Inquiry** — Lead capture from property listings (future CRM integration)
- **CRMInteraction** — Audit trail of agent-lead interactions (email, call, etc.)

See the full schema in [prisma/schema.prisma](prisma/schema.prisma).

### First-Time Setup

```bash
# 1. Create .env.local (or update existing)
# Must have: DATABASE_URL="postgresql://user:password@host:5432/driven_group_dev"

# 2. Generate Prisma client
npx prisma generate

# 3. Run initial migration
npx prisma migrate dev --name init

# 4. (Optional) Seed data via Prisma Studio
npx prisma studio
```

### Key DB Decisions

- **Cascade deletes**: PropertyImage and CRMInteraction cascade-delete when their parent is deleted (safe cleanup).
- **Indexes**: Placed on foreign keys (agentId, propertyId), status fields (for filtering), and email (lead lookup).
- **Enums**: PostgreSQL enums (Role, PropertyType, PropertyStatus, etc.) for type safety and reduced storage.

---

## 💻 Code Patterns & Conventions

### TypeScript

- **Strict mode enforced** — No `any` unless unavoidable.
- **Type files** in [src/lib/types.ts](src/lib/types.ts) — Domain types (User, Property, Inquiry). Update here when schema changes.
- **API types** — Use `ApiResponse<T>` wrapper for all server actions/API routes (includes `success`, `data`, `error`).

### Validation

All user input validated with Zod schemas in [src/lib/validation.ts](src/lib/validation.ts):
- Property forms, inquiry forms, search filters
- Error messages in Spanish (for user-facing validation)
- Use `z.infer<typeof SomeSchema>` to get TypeScript types from schemas

### Components

- **Location**: [src/components/](src/components/) organized by domain (marketing/, real-estate/, admin/, ui/, layout/, shared/)
- **Base UI** in [src/components/ui/](src/components/ui/) — Reusable, stateless components (Button, Input, Select, etc.). No business logic.
- **Domain components** inherit from UI components and add layout/state (PropertyCard, HeroSection, AdminSidebar, etc.).
- **Styling**: Tailwind CSS v4 with a dark theme. Check [src/app/globals.css](src/app/globals.css) for theme custom properties.
- **Design system**: Glassmorphism aesthetic, Material Symbols for icons, premium feel.

### Server Actions

Example from [src/server/actions/property.actions.ts](src/server/actions/property.actions.ts):
- Always wrap in `"use server"` directive
- Call service layer, handle errors, return `ApiResponse<T>`
- Imported by client components via `'use client'` boundary

### Prisma Singleton

[src/lib/prisma.ts](src/lib/prisma.ts) ensures a single Prisma instance even in dev reloads (prevents connection pool exhaustion).

---

## 📂 Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Public routes
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing
│   │   ├── real-estate/        # Property list/detail
│   │   ├── about/, contact/    # Static pages
│   ├── (platform)/             # Admin/Agent routes (auth needed)
│   │   ├── layout.tsx
│   │   ├── admin/             # Dashboard, property CRUD
│   │   ├── inquiries/         # Lead management
│   ├── api/                   # API routes
│   │   ├── health/route.ts
│   │   ├── properties/, inquiries/  # Coming Phase 2
│   ├── layout.tsx             # Root layout (dark theme setup)
│   └── globals.css            # Global Tailwind styles
│
├── components/
│   ├── ui/                     # Base UI (Button, Input, Select)
│   ├── marketing/              # Landing page components
│   ├── real-estate/            # Property display (PropertyCard, etc.)
│   ├── admin/                  # Admin dashboard UI
│   ├── layout/                 # Shared layout (Navbar, Footer, Sidebar)
│   └── shared/                 # Shared across domains
│
├── server/
│   ├── actions/                # Server actions (entry points)
│   ├── services/               # Business logic
│   └── repositories/           # Data access (Prisma queries)
│
├── lib/
│   ├── types.ts               # TypeScript type definitions
│   ├── validation.ts          # Zod schemas
│   ├── prisma.ts              # Prisma singleton
│   └── utils.ts               # Helper functions
│
├── hooks/                     # Custom React hooks (currently empty)
└── styles/                    # Additional CSS if needed
```

---

## 🔑 Key Files to Know

| File | Purpose |
|------|---------|
| [src/lib/types.ts](src/lib/types.ts) | All domain types; update when schema changes |
| [src/lib/validation.ts](src/lib/validation.ts) | Zod schemas for all forms/filters |
| [src/lib/prisma.ts](src/lib/prisma.ts) | Prisma singleton (don't touch unless adding logging) |
| [prisma/schema.prisma](prisma/schema.prisma) | Database schema; source of truth |
| [src/app/layout.tsx](src/app/layout.tsx) | Root layout; dark theme setup, fonts, globals |
| [src/app/globals.css](src/app/globals.css) | Tailwind config, CSS variables, theme colors |
| [next.config.js](next.config.js) | Next.js config (check if it exists; not in repo yet) |

---

## 🚀 Development Workflow

### Running the App Locally

1. **Setup database** (first time only):
   ```bash
   cp .env.local .env.local  # Update DATABASE_URL
   npx prisma generate
   npx prisma migrate dev --name init
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   ```
   App runs on [http://localhost:3000](http://localhost:3000)

3. **Making schema changes**:
   ```bash
   # Edit prisma/schema.prisma
   npx prisma migrate dev --name describe_change
   # Then update src/lib/types.ts to match
   ```

4. **Inspect database**:
   ```bash
   npx prisma studio
   ```
   Opens [http://localhost:5555](http://localhost:5555) with a GUI

### Common Tasks

**Add a new property page section?** 
- Create component in [src/components/real-estate/](src/components/real-estate/), export from page component

**Add a new form?**
- Create Zod schema in [src/lib/validation.ts](src/lib/validation.ts)
- Create server action in [src/server/actions/](src/server/actions/)
- Use React Hook Form in the UI component with the schema

**Query the database?**
- Add query to [src/server/repositories/](src/server/repositories/)
- Wrap in service ([src/server/services/](src/server/services/)) if there's logic
- Export server action from [src/server/actions/](src/server/actions/)

**Style a component?**
- Use Tailwind classes; reference theme colors from [src/app/globals.css](src/app/globals.css)
- For reusable styles, add CSS modules or Tailwind `@apply` rules

---

## 🛡️ Important Notes

### TypeScript Strict Mode
All code must pass `tsc --noEmit` with strict settings. No implicit `any`.

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NEXTAUTH_SECRET**, **NEXTAUTH_URL**: Placeholder for Phase 2 auth
- **NEXT_PUBLIC_API_URL**: Client-side API base URL (if needed)

### Prisma Client
- Auto-generated from schema; don't edit [.prisma/client/](node_modules/.prisma/client/) directly
- Run `npx prisma generate` after schema changes
- Singleton pattern in [src/lib/prisma.ts](src/lib/prisma.ts) prevents connection leaks

### Deployment
- Built for **Vercel** (zero-config Next.js)
- Adaptable to other platforms; check [next.config.js](next.config.js) for settings
- Ensure `DATABASE_URL` is set in production env vars

---

## 📊 Development Phases

**Phase 1 (Current)**: Architecture base + Real Estate rebrand ✅  
**Phase 2**: Landing + Property listing/detail + lead capture form  
**Phase 3**: Email integration, CRM features  
**Phase 4**: Testing, Polish, Deploy  

The codebase is roughly 25% complete with architecture solidified. Main work ahead is feature implementation.

---

## 🔗 Related Resources

- **README.md**: High-level project overview and tech stack
- **Git commits**: Recent refactors clarify architectural decisions (check `git log`)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs) for ORM patterns
- **Next.js Docs**: [nextjs.org](https://nextjs.org) for App Router, server actions, API routes
