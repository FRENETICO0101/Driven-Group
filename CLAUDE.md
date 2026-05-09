# CLAUDE.md

# Driven Group — Contexto de Desarrollo IA

## Overview del Proyecto

Driven Group es una:

# Luxury Corporate Real Estate Platform

Enfocada en:
- real estate premium
- oportunidades de inversión
- ecosistema empresarial estratégico
- experiencia editorial luxury
- arquitectura backend escalable

El proyecto está evolucionando de un sitio inmobiliario tradicional hacia una plataforma digital premium orientada a inversión y posicionamiento corporativo.

---

# Objetivos Principales

La plataforma debe transmitir:
- autoridad
- exclusividad
- confianza
- visión estratégica
- posicionamiento de inversión
- experiencia editorial premium

La plataforma NO debe sentirse como:
- template WordPress inmobiliario
- portal genérico de propiedades
- dashboard SaaS
- sitio corporativo tradicional tipo PowerPoint

---

# Fase Actual del Proyecto

## Consolidación de Experiencia Premium

Prioridades actuales:
1. Consolidación de contenido
2. Integración dinámica de propiedades
3. Responsive premium polish
4. Foundation flujo de leads
5. QA final

---

# Stack Tecnológico Actual

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

## Arquitectura Modular

Los componentes deben mantenerse:
- reutilizables
- aislados
- mantenibles

Evitar:
- páginas monolíticas
- UI duplicada
- lógica inline

---

## Arquitectura Server-First

Priorizar:
- server actions
- rendering server-side
- acceso Prisma desde backend

Evitar:
- fetches client-side innecesarios
- exceso de client components

---

## Separación de Responsabilidades

Estructura del proyecto:

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

# Responsabilidades Repositories

Los repositories manejan:
- queries Prisma
- persistencia
- acceso base de datos

Los repositories NO deben contener:
- lógica UI
- formateo frontend
- orquestación compleja

---

# Responsabilidades Services

Los services manejan:
- lógica negocio
- validaciones
- reglas dominio
- preparación responses

Los services deben mantenerse:
- ligeros
- legibles
- orientados dominio

---

# Dirección Actual de Experiencia

La experiencia debe sentirse:
- luxury
- editorial
- cinematográfica
- premium minimal
- orientada a inversión

Inspiración:
- luxury real estate
- investment firms
- private equity aesthetics
- editorial luxury brands

Evitar:
- UI saturada
- CTAs agresivos
- exceso animaciones
- estética template
- exceso lenguaje corporativo

---

# Dirección Narrativa

Conceptos preferidos:
- patrimonio
- visión
- legado
- inversión
- expansión
- ecosistema
- acompañamiento estratégico

Evitar abuso de:
- luxury
- premium
- ROI
- corporativo

El lujo debe percibirse mediante:
- whitespace
- tipografía
- jerarquía visual
- moderación narrativa
- imágenes

---

# Estado Actual Proyecto

## Completado
- modularización frontend
- extracción shared UI
- foundation backend
- setup Prisma
- foundation server actions
- refactor narrativo premium

## En Progreso
- consolidación contenido
- experience architecture
- homepage premium
- responsive polish

## Pendiente
- integración dinámica propiedades
- persistencia leads
- admin CRUD
- deployment

---

# Restricciones Actuales Desarrollo

NO priorizar todavía:
- CRM
- analytics
- automatizaciones
- dashboards
- auth avanzada
- microservicios
- abstracciones excesivas

Priorizar:
- experiencia premium
- arquitectura limpia
- foundations escalables
- velocidad ejecución
- mantenibilidad

---

# Reglas Workflow IA

## 1 Prompt = 1 Objetivo

Evitar:
- prompts multidominio
- ejecución descontrolada
- feature stacking

---

# Control de Scope

NO modificar dominios no relacionados.

Ejemplos:
- tareas backend NO deben modificar marketing UI
- tareas contenido NO deben modificar Prisma
- visual polish NO debe refactorizar arquitectura

---

# Uso Recomendado IA

## Usar Sonnet para:
- arquitectura
- backend
- Prisma
- planeación estratégica
- reasoning complejo

## Usar Haiku para:
- implementación UI/content
- updates secciones
- visual polish
- refactors controlados

---

# Workflow Obligatorio

```txt
plan
→ execute
→ validate
→ build
→ commit
→ push
```

---

# Validación Build

Después de implementaciones importantes:

```bash
npm run build
```

Después:

```bash
npm run dev
```

---

# Workflow Git

Nunca trabajar directamente sobre:
```txt
main
```

Usar:
```txt
feature/*
refactor/*
fix/*
```

Ejemplos:
```txt
feature/dynamic-properties
feature/content-consolidation
refactor/premium-homepage
```

---

# Filosofía Commits

Los commits deben ser:
- pequeños
- descriptivos
- específicos dominio

Ejemplos:
```txt
refactor: modularize premium marketing experience
feat: integrate dynamic property data
fix: improve mobile hero spacing
```

Evitar:
```txt
update
changes
fix stuff
```

---

# Filosofía Operativa

Priorizar:
- simplicidad
- percepción premium
- foundations escalables
- mantenibilidad
- velocidad ejecución

Evitar:
- overengineering
- abstracciones innecesarias
- feature bloat
- sobrecarga visual

---

# Objetivo Final

Entregar una:
# plataforma premium luxury corporate real estate

Que se sienta:
- moderna
- cinematográfica
- orientada a inversión
- editorial
- confiable
- escalable

Sin convertirse en:
- demasiado corporativa
- demasiado técnica
- visualmente saturada
- innecesariamente compleja