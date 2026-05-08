# Driven Group — Arquitectura

## Principios Base de Arquitectura

El proyecto sigue una:
## arquitectura modular, escalable y server-first

Enfocada en:
- mantenibilidad
- experiencia premium
- foundation backend escalable
- separación limpia de responsabilidades

---

# Stack Tecnológico

## Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Backend
- Prisma ORM
- PostgreSQL

---

# Principios Arquitectónicos

## 1. Componentes Modulares

Los componentes deben mantenerse:
- reutilizables
- aislados
- mantenibles

Evitar:
- páginas monolíticas
- UI duplicada
- lógica inline

---

## 2. Arquitectura Server-First

Priorizar:
- server actions
- rendering server-side
- queries Prisma en backend

Evitar:
- fetches client-side innecesarios
- exceso de client components

---

## 3. Separación de Responsabilidades

La estructura separa:
- UI
- services
- repositories
- server actions
- lógica dominio

---

# Estructura Actual

```txt
src/
├── app/
├── components/
├── lib/
├── server/
│   ├── actions/
│   ├── repositories/
│   └── services/
```

---

# Repository Layer

Los repositories son responsables de:
- acceso Prisma
- queries DB
- persistencia

Los repositories NO deben:
- contener lógica UI
- contener formateo frontend
- contener lógica negocio compleja

---

# Service Layer

Los services son responsables de:
- lógica negocio
- validaciones
- reglas dominio
- preparación responses

Los services deben mantenerse:
- simples
- legibles
- orientados dominio

---

# Server Actions

Las server actions se usan para:
- obtención propiedades
- creación leads
- operaciones server-side

Evitar:
- REST APIs innecesarias
- capas fetch complejas

---

# Principios UI/UX

La experiencia debe sentirse:
- luxury
- editorial
- cinematográfica
- premium minimal

Evitar:
- estética template
- exceso de UI noise
- CTAs agresivos
- secciones saturadas

---

# Dirección Visual

Inspiración:
- luxury real estate
- investment firms
- editorial brands
- corporate minimalism

---

# Arquitectura de Datos

Entidades principales:
- User
- Property
- PropertyImage
- Inquiry
- CRMInteraction

---

# Foco Actual

El foco actual del desarrollo es:
## consolidación premium + integración dinámica real estate

NO:
- CRM
- automatizaciones
- dashboards avanzados
- auth enterprise