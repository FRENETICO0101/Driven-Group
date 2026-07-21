# CLAUDE.md — Guía operativa para IA

Reglas de trabajo para asistentes de IA en el proyecto **Driven Group**.

> 📖 **Contexto del proyecto** (visión, stack, arquitectura, modelo de datos, estado,
> deployment): **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** es la fuente de verdad. Leerlo
> antes de trabajar. Este archivo solo contiene cómo trabajar, no qué es el proyecto.

---

## Modelo de trabajo

Desarrollo asistido por IA con **ejecución controlada**.

- **IA:** acelerar arquitectura, reducir deuda técnica, foundations estructuradas, apoyar
  implementaciones complejas.
- **Humanos:** validación, refinamiento UX, visual polish, alineación de negocio, calidad final.

Flujo obligatorio: **`plan → execute → validate → build → commit → push`**.
Validar con `npm run build` + `npm run dev` después de bloques importantes.

---

## Scope control

**1 prompt = 1 objetivo.**

Evitar prompts multidominio, ejecución descontrolada y feature stacking. No modificar dominios
no relacionados con la tarea:

- Backend ≠ marketing UI
- Contenido ≠ Prisma schema
- Visual polish ≠ arquitectura

---

## Git

**Nunca trabajar en `main`.** Usar ramas:

- `feature/*` — nuevas features
- `fix/*` — bugfixes
- `refactor/*` — refactors
- `docs/*` — documentación

**Commits** pequeños, descriptivos y específicos por dominio:

- ✅ `feat: integrate dynamic property data`
- ✅ `refactor: modularize premium marketing experience`
- ✅ `fix: improve mobile hero spacing`
- ❌ `update`, `changes`, `fix stuff`

---

## Principios de arquitectura (resumen)

Respetar el data flow y la separación de capas. Detalle en
[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

```
UI Component → Server Action → Service → Repository → Prisma/PostgreSQL
```

- **Modular:** componentes reutilizables; sin páginas monolíticas ni UI duplicada.
- **Server-first:** priorizar server actions y rendering server-side; minimizar client
  components y fetches innecesarios.
- **Separación:** repositories (DB) · services (negocio) · actions (orquestación) ·
  components (UI sin lógica).

---

## Filosofía

Priorizar: simplicidad sobre abstracción prematura · percepción premium mediante diseño, no
feature count · foundations escalables · velocidad de ejecución sin sacrificar calidad ·
mantenibilidad.

Evitar: overengineering · abstracciones innecesarias · feature bloat · sobrecarga visual ·
comentarios innecesarios en código.

---

## Dirección de experiencia

La plataforma debe sentirse como un **ecosistema de inversión premium** y una experiencia
**editorial luxury** — nunca como un portal genérico, template WordPress inmobiliario o
dashboard SaaS. Transmitir lujo mediante whitespace, tipografía, jerarquía visual y moderación
narrativa.

**Narrativa preferida:** patrimonio, visión, legado, inversión, expansión, ecosistema,
acompañamiento estratégico. **Evitar abuso de:** luxury, premium, ROI, corporativo.
