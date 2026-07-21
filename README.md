# Driven Group — Luxury Corporate Real Estate Platform

Plataforma premium de real estate corporativo: experiencia editorial de inversión,
propiedades dinámicas, galería interactiva y captura de leads.

> 📖 **Para entender el proyecto a fondo** (visión, arquitectura, modelo de datos, estado,
> convenciones y deployment), leer **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** — la fuente
> de verdad del proyecto.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-intl ·
Prisma + PostgreSQL (Neon) · NextAuth · Zod.

---

## Setup local

**Requisitos:** Node.js 18+, una base PostgreSQL (Neon recomendado).

```bash
# 1. Dependencias
npm install

# 2. Variables de entorno
cp .env.example .env.local
#   Editar DATABASE_URL (Neon) y NEXTAUTH_SECRET / NEXTAUTH_URL

# 3. Prisma
npx prisma generate
npx prisma migrate dev        # primera vez (aplica migraciones)

# 4. (Opcional) datos de ejemplo
npm run seed

# 5. Servidor de desarrollo
npm run dev                   # http://localhost:3000
```

Sin conexión a base de datos, el sitio renderiza propiedades de ejemplo
(`src/lib/mock/properties.ts`) como fallback para desarrollo local.

---

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm run seed` | Poblar la base con datos de ejemplo |
| `npm run test:e2e` | Tests E2E (Playwright) |

Comandos Prisma habituales: `npx prisma studio`, `npx prisma migrate dev`,
`npx prisma migrate deploy`.

---

## Estructura

```
src/app/[locale]/   Rutas (marketing público / platform admin) con i18n
src/components/      UI modular por dominio
src/server/          actions · services · repositories
src/lib/             types, validación, utils, auth, mock data
prisma/              schema, migraciones, seed
messages/            traducciones i18n
```

Detalle completo en [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

---

© Driven Group · Desarrollado por Babel Solutions · Comercial — todos los derechos reservados.
