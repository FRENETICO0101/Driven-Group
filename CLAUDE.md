# CLAUDE.md — Master Context File

# Driven Group — Luxury Corporate Real Estate Platform

Plataforma premium de real estate enfocada en **experiencia editorial de inversión corporativa**, con integración dinámica de propiedades, galería interactiva y captura de leads.

Evoluciona de sitio inmobiliario tradicional hacia **ecosistema estratégico de inversión premium**.

---

# Estado Actual

**Progreso:** 75%

**Completado:**
- Arquitectura modular frontend + shared UI
- Foundation backend: Prisma + PostgreSQL (Neon)
- Repositories + Services pattern operacional
- Server actions funcionales (properties, leads)
- Premium seed data: 3 propiedades luxury corporate
- Dynamic property detail page con SSR
- Lead persistence workflow: PropertyCTA → createLeadAction → PostgreSQL
- Validación Zod + error handling en formularios

**En Progreso:**
- Consolidación contenido premium
- Visual polish responsive
- Property listing page (/real-estate)

**Pendiente:**
- Admin CRUD
- Email notifications
- Analytics
- Deployment

**Próxima fase:** Polish visual + Admin panel + Deployment

---

# Stack Tecnológico

**Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
**Backend:** Server Actions, Prisma ORM con tipo-seguridad
**Base de Datos:** PostgreSQL (Neon cloud)
**Validación:** Zod para schemas

**Estructura:**
```
src/
├── app/              # Next.js routes
├── components/       # Modular UI
├── lib/             # Types, utils, validation
├── server/
│   ├── actions/     # Server actions
│   ├── repositories/ # Prisma queries
│   └── services/    # Business logic
```

---

# Principios Arquitectónicos

## Modular
- Componentes reutilizables, aislados, mantenibles
- NO: páginas monolíticas, UI duplicada, lógica inline

## Server-First
- Priorizar server actions + rendering server-side
- Queries Prisma desde backend, no client-side fetches
- NO: exceso de client components, fetches innecesarios

## Separación de Responsabilidades
- **Repositories:** queries Prisma, persistencia, DB access
- **Services:** lógica negocio, validaciones, reglas dominio
- **Actions:** orquestación server-side, error handling
- **Components:** UI, no lógica negocio

## Data Flow Pattern
```
UI Component → Server Action → Service → Repository → Prisma/PostgreSQL
```

---

# Arquitectura de Datos

**Entidades principales:**
- **User:** admin, agent, viewer
- **Property:** RESIDENTIAL | COMMERCIAL | LAND | MIXED_USE
- **PropertyImage:** galería multimedia
- **Inquiry:** captura y tracking de leads (NEW → CLOSED/LOST)
- **CRMInteraction:** historial interacciones (future)

**Server Actions operacionales:**
- `getFeaturedPropertiesAction(limit)` - Obtener destacadas ✅
- `getPropertyBySlugAction(slug)` - Detalle dinámico ✅
- `createLeadAction(data)` - Crear inquiry con Zod validation ✅

---

# Experience Direction

La plataforma debe sentirse como:
- **Ecosistema de inversión premium**
- **Experiencia editorial luxury**
- **Corporate minimalism** (no tradicional)

La plataforma NO debe sentirse como:
- Portal de propiedades genérico
- Template WordPress inmobiliario
- Dashboard SaaS
- Presentación corporativa PowerPoint

## Narrativa Editorial

**Conceptos preferidos:** patrimonio, visión, legado, inversión, expansión, ecosistema, acompañamiento estratégico

**Evitar abuso de:** luxury, premium, ROI, corporativo

**Transmitir lujo mediante:** whitespace, tipografía, jerarquía visual, moderación narrativa, imágenes de calidad

**Atributos:** moderna, cinematográfica, orientada inversión, confiable, escalable

---

# Workflow IA Operativo

## Modelo
Este proyecto usa **desarrollo asistido por IA con ejecución controlada**.

IA: acelerar arquitectura, reducir deuda técnica, foundations estructuradas, apoyar implementaciones complejas
Humanos: validación, refinamiento UX, visual polish, alineación negocio, calidad final

## Scope Control
**1 prompt = 1 objetivo**

Evitar:
- Prompts multidominio
- Ejecución descontrolada
- Feature stacking

NO modificar dominios no relacionados:
- Backend ≠ marketing UI
- Contenido ≠ Prisma schema
- Visual polish ≠ arquitectura

## Workflow Obligatorio
```
plan → execute → validate → build → commit → push
```

**Validación:** `npm run build` + `npm run dev` después de bloques importantes

---

# Reglas Desarrollo

## Git Workflow
**Nunca en `main`.** Usar:
- `feature/*` - nuevas features
- `refactor/*` - refactors
- `fix/*` - bugfixes

Ejemplo: `feature/dynamic-properties`, `refactor/premium-homepage`

## Commits
Pequeños, descriptivos, específicos por dominio:
- ✅ `feat: integrate dynamic property data`
- ✅ `refactor: modularize premium marketing experience`
- ✅ `fix: improve mobile hero spacing`
- ❌ `update`, `changes`, `fix stuff`

---

# Restricciones & Prioridades

## NO priorizar todavía
- CRM avanzado
- Analytics
- Automatizaciones complejas
- Dashboards
- Auth enterprise
- Microservicios
- Abstracciones excesivas

## Priorizar
- Experiencia premium
- Arquitectura limpia
- Foundations escalables
- Velocidad ejecución
- Mantenibilidad

## Prioridades inmediatas (próximos sprints)
1. **Property listing page** - /real-estate con filtros básicos
2. **Visual polish** - Responsive refinement y consistencia
3. **Admin CRUD** - Gestión de propiedades
4. **Email notifications** - Notificaciones a agentes
5. **QA & deployment** - Testing y go-live

---

# Filosofía Operativa

Priorizar:
- **Simplicidad** sobre abstracción prematura
- **Percepción premium** mediante diseño, no feature count
- **Foundations escalables** que soporten crecimiento
- **Velocidad ejecución** sin sacrificar calidad
- **Mantenibilidad** como atributo de arquitectura

Evitar:
- Overengineering
- Abstracciones innecesarias
- Feature bloat
- Sobrecarga visual
- Comentarios innecesarios en código

---

# Referencias Documentación Complementaria

- **ARCHITECTURE.md** — Detalles arquitectura, rutas, endpoints
- **PROJECT_STATUS.md** — Estado detallado, breakdown por fase
- **TEAM_WORKFLOW.md** — Roles, responsabilidades, workflow detallado
- **SEED_DATA.md** — Propiedades premium, seed structure
- **EXPERIENCE_PRINCIPLES.md** — Luxury direction, CTA rules, UX philosophy
- **README.md** — Setup, instalación, scripts, stack completo
