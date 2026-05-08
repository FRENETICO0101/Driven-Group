# Driven Group — Workflow de Equipo

## Modelo Operativo

Este proyecto utiliza:
## desarrollo asistido por IA con ejecución controlada

La IA se usa para:
- acelerar arquitectura
- reducir deuda técnica
- generar foundations estructuradas
- apoyar implementaciones complejas

Los desarrolladores humanos son responsables de:
- validación
- refinamiento UX
- visual polish
- alineación negocio
- calidad final

---

# Roles del Equipo

## Lead Developer
Responsable de:
- arquitectura
- foundation backend
- integraciones
- orquestación
- control de scope
- dirección técnica

---

## Developer 2
Responsable de:
- integración contenido
- visual polish
- refinamiento responsive
- jerarquía editorial
- consistencia luxury

---

# Uso de IA

## Sonnet
Usar para:
- arquitectura
- backend
- Prisma
- reasoning complejo
- experience strategy

---

## Haiku
Usar para:
- refactors UI
- integración contenido
- updates visuales
- polish layout
- implementaciones controladas

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

# Reglas Desarrollo

## Scope Control
1 prompt = 1 objetivo.

Evitar:
- prompts multidominio
- ejecución descontrolada
- feature stacking

---

## Validación Build
Después de cada bloque importante:

```bash
npm run build
```

Después:

```bash
npm run dev
```

---

## Reglas Git

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

# Estrategia Commits

Los commits deben ser:
- pequeños
- descriptivos
- específicos dominio

Evitar:
- "update"
- "changes"
- "fix stuff"

Ejemplos:
```txt
refactor: modularize premium marketing experience
feat: integrate dynamic property data
fix: improve mobile hero spacing
```

---

# Prioridades Actuales

1. Consolidación contenido premium
2. Integración dinámica propiedades
3. Foundation flujo leads
4. Responsive polish
5. QA y deployment

---

# Restricciones Actuales

NO priorizar todavía:
- CRM
- automatizaciones
- analytics
- dashboards
- auth avanzada

---

# Principios de Experiencia

La plataforma debe sentirse como:
- ecosistema inversión premium
- experiencia editorial luxury
- corporate minimalism

La plataforma NO debe sentirse como:
- portal propiedades tradicional
- template WordPress
- dashboard SaaS genérico

---

# Filosofía Operativa

Priorizar:
- simplicidad
- velocidad ejecución
- percepción premium
- foundations escalables

Evitar:
- overengineering
- abstracciones innecesarias
- feature bloat
- sobrecarga visual