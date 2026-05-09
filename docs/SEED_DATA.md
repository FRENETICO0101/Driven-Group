# Seed Data — Propiedades Premium

## Resumen

El seed inicial (`prisma/seed.ts`) popula la base de datos con 3 propiedades luxury corporate que sirven como demo de la plataforma.

---

## Propiedades Incluidas

### 1. Torre Corporativa Miami
**Tipo:** COMMERCIAL  
**Precio:** $8,500,000  
**Ubicación:** Miami, Florida

**Descripción Narrativa:**
> Punto de convergencia estratégica en el corazón financiero de Miami. Arquitectura de vanguardia que consolida operaciones globales. Diseño de espacios que expande visión empresarial hacia ecosistemas emergentes. 42 pisos de oportunidad inversora.

**Características:**
- 180,000 sqft
- Construida: 2022
- Trading floor
- Executive suites
- Private elevators
- Rooftop terrace
- 24/7 secure parking

**Imágenes:** 4
- Exterior/torre
- Lobby ejecutivo
- Trading floor
- Vista skyline

---

### 2. Quinta Inversión Viña del Mar
**Tipo:** RESIDENTIAL  
**Precio:** $5,200,000  
**Ubicación:** Viña del Mar, Valparaíso

**Descripción Narrativa:**
> Refugio patrimonial frente al Pacífico. Privacidad absoluta en enclave de dos hectáreas. Arquitectura que honra el legado generacional. Espacio donde la visión familiar se expande sin límites. Inversión en permanencia.

**Características:**
- 5 bedrooms
- 6 bathrooms
- 12,000 sqft
- 2 hectáreas (87,120 sqft)
- Construida: 2019
- Acceso privado océano
- Piscina temperada
- Wine cellar
- Helipad infrastructure

**Imágenes:** 5
- Fachada con vista océano
- Living minimalista
- Vista panorámica
- Jardines
- Piscina

---

### 3. Loft Urbano São Paulo
**Tipo:** RESIDENTIAL  
**Precio:** $3,800,000  
**Ubicación:** São Paulo, SP

**Descripción Narrativa:**
> Expansión urbana. Materialidad minimal que conversa con el pulso de la ciudad. Ecosistema creativo consolidado en Vila Mariana. Espacios donde la arquitectura acompaña pensamiento estratégico. Inversión en presencia contemporánea.

**Características:**
- 3 bedrooms
- 4 bathrooms
- 6,500 sqft
- Construida: 2021
- Open space design
- Pé-direito duplo
- Terraza panorámica
- Smart home system
- Concierge service

**Imágenes:** 4
- Entrada minimalista
- Open space
- Living con detalles
- Terraza urbana

---

## Narrativa Editorial

El seed mantiene los principios narrativos de la plataforma:

- **Léxico preferido:** patrimonio, visión, legado, inversión, expansión
- **Evitar abuso:** luxury, premium, ROI, corporativo
- **Transmitir lujo mediante:** whitespace, tipografía, jerarquía visual, moderación narrativa, imágenes

Cada descripción enfatiza:
- Visión estratégica (no features)
- Posicionamiento inversión (no transaccional)
- Narrativa generacional (no venta corto plazo)

---

## Imágenes

Las imágenes utilizan URLs de **Unsplash** (públicas, de libre uso):
- Todas optimizadas: `?w=1200&h=800&fit=crop`
- Fotografía editorial premium
- Coherentes con narrativa luxury corporate

**Formato URL:**
```
https://images.unsplash.com/photo-[ID]?w=1200&h=800&fit=crop
```

---

## Agente Asignado

Todas las propiedades se asignan al agente:
- **Email:** `properties@drivengroup.com`
- **Nombre:** Driven Properties
- **Rol:** AGENT

Este agente es el propietario administrativo del seed data.

---

## Ejecución del Seed

**Comando:**
```bash
npm run seed
```

**Comportamiento:**
- Usa `upsert` para idempotencia (seguro ejecutar múltiples veces)
- Crea agente si no existe
- Actualiza propiedades existentes (por slug)
- Añade imágenes sin duplicar

**Output esperado:**
```
✓ Agente creado: properties@drivengroup.com
✓ Propiedad 1 creada: Torre Corporativa Miami
✓ Propiedad 2 creada: Quinta Inversión Viña del Mar
✓ Propiedad 3 creada: Loft Urbano São Paulo

✅ Seed completado exitosamente
📊 Resumen:
- Agent: Driven Properties
- Propiedades: 3
- Imágenes: 13
```

---

## Estructura Seed File

```typescript
// prisma/seed.ts
import { PrismaClient, PropertyType, PropertyStatus, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Crear agente (upsert para idempotencia)
  const agent = await prisma.user.upsert({...})
  
  // 2. Crear Propiedad 1 (Torre Corporativa)
  const property1 = await prisma.property.upsert({...})
  await prisma.propertyImage.createMany({...})
  
  // 3. Crear Propiedad 2 (Quinta)
  const property2 = await prisma.property.upsert({...})
  await prisma.propertyImage.createMany({...})
  
  // 4. Crear Propiedad 3 (Loft)
  const property3 = await prisma.property.upsert({...})
  await prisma.propertyImage.createMany({...})
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## Próximos Pasos

### Corto plazo:
- ✅ Seed inicial funcional
- [ ] Crear server action para listar propiedades
- [ ] Renderizar propiedades dinámicas en homepage

### Mediano plazo:
- [ ] Integrar imágenes reales (no placeholder)
- [ ] Expandir seed a 8-10 propiedades
- [ ] Agregar más detalles (videos, documentos)

### Largo plazo:
- [ ] Admin CRUD para propiedades
- [ ] Upload de imágenes
- [ ] Gestión de amenities dinámicos

---

## Referencias

- **Seed file:** [prisma/seed.ts](../prisma/seed.ts)
- **Package script:** `npm run seed` (definido en package.json)
- **Schema:** [prisma/schema.prisma](../prisma/schema.prisma)
- **Principios narrativos:** [EXPERIENCE_PRINCIPLES.md](./EXPERIENCE_PRINCIPLES.md)
