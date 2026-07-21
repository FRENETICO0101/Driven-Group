# PROJECT_CONTEXT.md — Driven Group

> **Documento canónico.** Esta es la única fuente de verdad para entender el proyecto:
> visión, stack, arquitectura, modelo de datos, estado y convenciones. El resto de
> archivos (`README.md`, `CLAUDE.md`) son operativos y referencian este documento.

---

## 1. Qué es

**Driven Group** es una plataforma premium de real estate corporativo, enfocada en una
**experiencia editorial de inversión**. No es un portal genérico de propiedades: integra
propiedades dinámicas, galería interactiva, contenido editorial luxury y captura de leads.

La plataforma debe sentirse como un **ecosistema de inversión premium** y una **experiencia
editorial luxury**, transmitiendo lujo mediante whitespace, tipografía, jerarquía visual y
moderación narrativa — nunca como un template WordPress inmobiliario, un portal genérico o
un dashboard SaaS.

**Narrativa:** priorizar conceptos de patrimonio, visión, legado, inversión, expansión,
ecosistema y acompañamiento estratégico. Evitar el abuso de "luxury", "premium", "ROI",
"corporativo".

---

## 2. Estado actual

**Progreso global: ~85%.**

| Área | Estado |
|------|--------|
| Arquitectura modular frontend + shared UI | ✅ Completo |
| Backend: Prisma + PostgreSQL (Neon) | ✅ Completo |
| Repositories + Services + Actions pattern | ✅ Completo |
| Server actions (properties, leads) | ✅ Completo |
| Property detail dinámico (SSR) | ✅ Completo |
| Catálogo universal de propiedades (`assets/properties`) | ✅ Completo |
| Lead persistence (form → action → PostgreSQL) | ✅ Completo |
| Production hardening (SEO, error boundaries, loading, a11y) | ✅ Completo |
| i18n (next-intl, rutas con `[locale]`) | ✅ Operativo |
| Mock data fallback (degradación si la DB no responde) | ✅ Operativo |
| Property listing page (`/real-estate`) con filtros y mapa | 🟡 ~90% |
| Mapas interactivos de propiedades (Leaflet + OpenStreetMap) | ✅ Completo |
| Admin panel (auth NextAuth + bcrypt, CRUD de propiedades DB y consultas) | ✅ Completo |
| Email notifications | ⏳ Pendiente |
| QA E2E pública | ✅ 60 pruebas pasan; 6 de persistencia requieren DB E2E |
| Deployment | ⏳ Pendiente |

**Roadmap inmediato (en orden):**
1. Provisionar una DB PostgreSQL de E2E y ejecutar los seis escenarios de persistencia de leads con `E2E_DATABASE_AVAILABLE=true`.
2. Configurar un proveedor y credenciales para notificaciones de email a agentes en `createLeadAction`.
3. Deployment a Vercel y verificar que los assets de `assets/properties` estén incluidos en el runtime Node.

---

## 3. Stack tecnológico

**Frontend:** Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS v4.
**i18n:** next-intl con routing por `[locale]`.
**Mapas:** Leaflet + React Leaflet, tiles de OpenStreetMap sin clave de proveedor.
**Backend:** Server Actions, Prisma ORM.
**Base de datos:** PostgreSQL (Neon cloud).
**Auth:** NextAuth (Credentials + JWT), bcrypt para hashing.
**Validación:** Zod.

---

## 4. Principios de arquitectura

**Modular** — componentes reutilizables, aislados, mantenibles. No páginas monolíticas, no
UI duplicada, no lógica inline.

**Server-first** — priorizar server actions y rendering server-side; queries Prisma desde el
backend. Minimizar client components y fetches innecesarios.

**Separación de responsabilidades:**

```
UI Component → Server Action → Service → Repository → Prisma/PostgreSQL
```

- **Repositories** — queries Prisma, persistencia, acceso a DB. Sin lógica UI ni de negocio.
- **Services** — lógica de negocio, validaciones, reglas de dominio. Simples y orientados a
  dominio. Aquí vive el fallback a mock data cuando la DB no responde.
- **Actions** — orquestación server-side, error handling.
- **Components** — UI; sin lógica de negocio.

---

## 5. Estructura del repositorio

```
src/
├── app/[locale]/              # Rutas con prefijo de idioma (next-intl)
│   ├── (marketing)/           # Público: home, real-estate, about, contact, business, academy
│   │   └── real-estate/[slug] # Detalle de propiedad (SSR)
│   └── (platform)/            # Privado: admin (dashboard, properties, leads), login, inquiries
│   └── api/                   # auth/[...nextauth], health
├── components/                # UI modular por dominio
│   ├── marketing/ real-estate/ about/ business/ contact/ academy/
│   ├── admin/ layout/ ui/                     # ui/ = componentes base reutilizables
│   └── empty/ errors/ loading/                # estados transversales
├── i18n/                      # Configuración next-intl (locales, request)
├── lib/                       # types.ts, validation.ts, property-utils.ts, prisma.ts,
│   │                          # auth.ts, auth.config.ts, auth.types.ts, errors.ts
│   └── mock/properties.ts     # Datos de ejemplo para fallback / preview local
├── server/
│   ├── actions/               # Server actions (orquestación)
│   ├── repositories/          # Queries Prisma
│   └── services/              # Lógica de negocio + fallback
└── proxy.ts                   # Protección de /admin + intl proxy

prisma/        schema.prisma, migrations/, seed.ts
messages/      Traducciones i18n (es, en)
e2e/           Tests Playwright
assets/        Contenido y media de propiedades (por property, no tocar)
docs/          Assets del cliente: brand book, logos, Academy, floor plans/renderings
public/        Assets servidos estáticamente
```

---

## 6. Modelo de datos (Prisma)

**User** — `role: VIEWER | AGENT | ADMIN`, `hashedPassword?` (auth). Relaciona a Property
(agent), Inquiry (agente asignado) y CRMInteraction.

**Property** — info básica (title, slug único, description, price), ubicación (address, city,
state, zipCode, lat/long), detalles (bedrooms, bathrooms, squareFeet, lotSize, yearBuilt),
`amenities: String[]`, `features?`. Índices en `agentId`, `city`, `status`.
- `type: RESIDENTIAL | COMMERCIAL | LAND | MIXED_USE`
- `status: ACTIVE | SOLD | PENDING | INACTIVE`

**PropertyImage** — `url`, `alt?`, `order`; FK a Property con `onDelete: Cascade`.

**Inquiry** — captura de leads: `name`, `email`, `phone`, `message?`, `propertyId?` (opcional),
`agentId?`, `notes?`.
- `source: WEBSITE | PHONE | WHATSAPP | FORM_POPUP | EMAIL`
- `status: NEW | CONTACTED | QUALIFIED | NEGOTIATING | CLOSED | LOST`

**CRMInteraction** (base para CRM futuro) — historial por inquiry.
- `type: CALL | EMAIL | WHATSAPP | MEETING | PROPOSAL`

---

## 7. Server actions operacionales

- `getFeaturedPropertiesAction(limit)` — propiedades destacadas (home).
- `getPropertiesAction({ type?, city?, status? })` — listado filtrado.
- `getAvailableCitiesAction()` — ciudades disponibles para filtros.
- `getPropertyBySlugAction(slug)` — detalle dinámico (SSR).
- `createLeadAction(data)` — crea Inquiry con validación Zod.

**Degradación elegante:** la capa de services devuelve `src/lib/mock/properties.ts` cuando la
DB no está disponible o no retorna resultados, de modo que el sitio renderiza propiedades de
ejemplo en local sin conexión a Neon.

**Catálogo de assets:** cuando existen propiedades en `assets/properties`, esa fuente es la
prioritaria para el listado, destacadas y detalle. `src/lib/property-catalog.ts` normaliza los
`property.json` de variantes heredadas, contenido Markdown, galerías, floorplans y brochures
sin modificar los assets originales. Los media se sirven mediante
`/api/properties/[slug]/assets/[...assetPath]` con validación de ruta.
Cuando una galería solo contiene renderings PDF, el visor de galería los presenta embebidos y
permite alternar entre documentos, sin convertir ni modificar los originales.

**Galerias:** las imagenes de `assets/properties/**/gallery` se sirven preferentemente en WebP.
Los JPG, JPEG y PNG originales se conservan como respaldo; `property-catalog.ts` omite esas
variantes cuando existe un WebP con el mismo nombre base.
Los 22 renderings PDF de Mandarin Oriental cuentan tambien con preview WebP de su primera
pagina; la galeria los muestra como imagenes y conserva el PDF original enlazado.

**Mapas de propiedades:** `InteractivePropertyMap` es el componente cliente reutilizable para
la vista general y el detalle. Solo representa marcadores cuando `latitude` y `longitude`
están declaradas en la fuente; si faltan, el detalle conserva dirección y enlaza a una búsqueda
de OpenStreetMap sin inventar coordenadas. En el estado actual, las siete propiedades de
`assets/properties` tienen coordenadas verificadas; los mapas se restringen al area de Miami y
pueden abrirse en un modal de pantalla completa para explorar su entorno.

---

## 8. Setup local

Detalle de comandos en [README.md](README.md). Resumen:

```bash
npm install
cp .env.example .env.local      # configurar DATABASE_URL (Neon) y NEXTAUTH_*
npx prisma generate
npx prisma migrate dev          # primera vez
npm run seed                    # opcional: poblar datos
npm run dev                     # http://localhost:3000
```

**Variables de entorno:** `DATABASE_URL` (Neon, `sslmode=require`), `NEXTAUTH_SECRET`
(`openssl rand -base64 32`), `NEXTAUTH_URL`, `NEXT_PUBLIC_API_URL`. Nunca commitear
`.env.local`; `.env.example` es la plantilla segura.

---

## 9. Deployment (referencia)

**Target:** Vercel + Neon PostgreSQL. Rendering `force-dynamic` (sin SSG/ISR), por lo que el
build no requiere DB; las queries son solo en runtime.

**Configurar en Vercel** (Project → Environment Variables): `DATABASE_URL` (endpoint pooled de
Neon), `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_API_URL`.

**Notas / riesgos conocidos:**
- `next.config.js` debe whitelistear el dominio de imágenes externas (`images.unsplash.com`).
- Usar el endpoint **pooled** de Neon (Prisma maneja el pooling).
- Ejecutar `npx prisma migrate deploy` antes de promover a producción.
- Sitemap es estático mientras la DB no esté disponible en build time.

**Rollback:** Vercel conserva los últimos despliegues (promover uno previo); Neon conserva
snapshots de la base.

---

## 10. Workflow y convenciones

**Git — nunca trabajar en `main`.** Usar `feature/*`, `fix/*`, `refactor/*`, `docs/*`.

**Commits** pequeños, descriptivos, por dominio (`feat:`, `fix:`, `refactor:`, `docs:`).
Evitar `update`, `changes`, `fix stuff`.

**Validación** tras bloques importantes: `npm run build` y `npm run dev`.

**Scope control — 1 prompt = 1 objetivo.** No mezclar dominios (backend ≠ marketing UI;
contenido ≠ schema; visual polish ≠ arquitectura).

**Filosofía:** simplicidad sobre abstracción prematura; percepción premium mediante diseño,
no feature count; foundations escalables; mantenibilidad. Evitar overengineering, feature
bloat, sobrecarga visual y comentarios innecesarios.

---

## 11. Modelo de trabajo IA

Desarrollo asistido por IA con **ejecución controlada**. La IA acelera arquitectura,
foundations y reduce deuda técnica; los humanos validan, refinan UX, hacen visual polish y
aseguran alineación de negocio y calidad final. Flujo: `plan → execute → validate → build →
commit → push`.
