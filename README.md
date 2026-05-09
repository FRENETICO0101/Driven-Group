# Driven Group - Luxury Corporate Real Estate Platform

![Driven Group](https://img.shields.io/badge/Driven_Group-Real_Estate_Premium-0a0a0a?style=for-the-badge&logoColor=f5f5f7)
![Project Status](https://img.shields.io/badge/Status-Fase_1_Dynamic_Integration-blue?style=for-the-badge)
![Progress](https://img.shields.io/badge/Progress-65%25-green?style=for-the-badge)

**Plataforma premium de real estate** enfocada en experiencia editorial de inversión corporativa, con integración dinámica de propiedades, galería interactiva premium y captura de leads de calidad.

---

## 🏗️ Stack Tecnológico

El ecosistema del proyecto está construido con herramientas modernas y escalables:

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend:** Server Actions, Prisma ORM, PostgreSQL (Neon)
- **Base de Datos:** PostgreSQL con Neon
- **ORM:** Prisma con tipo-seguridad completa
- **Validación:** Zod para schemas y formularios
- **Architecture:** Server-first, modular, repositories + services pattern
- **Deployment:** Ready for Vercel

---

## 📂 Arquitectura de Rutas

Estructura moderna con grouping de rutas por dominio:

### Marketing (Público)
- `(marketing)/` - Sección pública del sitio
  - `/` - Landing page premium
  - `/real-estate` - Listado de propiedades
  - `/real-estate/[slug]` - Detalle de propiedad
  - `/about` - Quiénes somos
  - `/contact` - Formulario de contacto
  - `/academy` - Redirect a Hotmart (próximo)

### Platform (Autenticado)
- `(platform)/` - Sección privada / admin
  - `/admin` - Dashboard administrativo
  - `/admin/properties` - Gestión de propiedades CRUD
  - `/inquiries` - Gestión de leads y consultas

### API
- `/api/health` - Health check
- `/api/properties` - CRUD de propiedades (próximo)
- `/api/inquiries` - Crear/listar consultas (próximo)
- `/api/auth/[...nextauth]` - Autenticación (próximo)

---

## 🚀 Instalación y Despliegue Local

### Requisitos
- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/FRENETICO0101/Driven-Group.git
cd Driven-Group

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu DATABASE_URL

# 4. Generar cliente Prisma
npx prisma generate

# 5. Ejecutar migraciones (primera vez)
npx prisma migrate dev --name init_real_estate_schema

# 6. (Opcional) Abrir Prisma Studio para ver datos
npx prisma studio

# 7. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Base de Datos

### Schema Prisma
El modelo de datos incluye:

**Modelos principales:**
- `User` - Usuarios (Admin, Agente, Viewer)
- `Property` - Propiedades inmobiliarias
- `PropertyImage` - Galería de imágenes
- `Inquiry` - Consultas/Leads de clientes
- `CRMInteraction` - Historial de interacciones (future CRM)

**Migraciones:**
```bash
# Ver todas las migraciones
ls prisma/migrations/

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Resetear BD (⚠️ solo desarrollo)
npx prisma migrate reset
```

### Variables de Entorno (.env.local)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/driven_group_dev"

# Authentication (Next Phase)
NEXTAUTH_SECRET="generate-a-strong-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

---

## 📊 Estructura de Carpetas

```
src/
├── app/                           # Next.js App Router
│   ├── (marketing)/              # Rutas públicas
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Landing
│   │   ├── real-estate/
│   │   ├── about/
│   │   └── contact/
│   ├── (platform)/               # Rutas privadas
│   │   ├── layout.tsx
│   │   ├── admin/
│   │   └── inquiries/
│   ├── api/                      # API Routes
│   │   ├── health/route.ts
│   │   ├── properties/route.ts
│   │   └── inquiries/route.ts
│   └── layout.tsx
│
├── components/                    # Componentes React
│   ├── marketing/                # Landing components
│   ├── real-estate/              # RE components
│   ├── leads/                    # Lead capture
│   ├── admin/                    # Admin UI
│   ├── layout/                   # Layout compartido
│   ├── ui/                       # Base UI (sin lógica)
│   └── shared/                   # Compartidos
│
├── lib/                          # Utilidades
│   ├── types.ts                  # TypeScript types
│   ├── validation.ts             # Zod schemas
│   ├── utils.ts                  # Helpers
│   ├── api.ts                    # API client
│   └── prisma.ts                 # Prisma singleton
│
├── server/                       # Server-side logic
│   ├── actions/                  # Server actions
│   └── services/                 # Business logic
│
├── hooks/                        # Custom React hooks
├── styles/                       # CSS global
└── middleware.ts                 # Next.js middleware
```

---

## 🔄 Fases de Desarrollo

### ✅ Fase 1 (Actual): Integración Dinámica Premium
- [x] Refactorización Academy → Real Estate
- [x] Rutas agrupadas (marketing)/(platform)
- [x] Schema Prisma completo con Neon
- [x] Repositories + Services pattern
- [x] Server actions funcionales (properties, leads)
- [x] Premium seed data (3 propiedades luxury corporate)
- [x] Componentes base UI extraídos
- [x] Integración Prisma ↔ Backend
- [ ] Rendering dinámico frontend (featured properties)
- [ ] Property detail dinámico

### ⏳ Fase 2: Lead Capture & Polish
- [ ] Lead persistence workflow
- [ ] Formulario de consultas con validación
- [ ] Email integration
- [ ] Responsive polish final
- [ ] Notificaciones a agentes

### ⏳ Fase 3: Admin & Advanced Features
- [ ] Admin CRUD para propiedades
- [ ] Upload de imágenes
- [ ] Gestión amenities dinámicos
- [ ] CRM interactions

### ⏳ Fase 4: QA & Deploy
- [ ] Testing completo
- [ ] Performance optimization
- [ ] QA final
- [ ] Deploy a producción

---

## 🛠️ Desarrollo

### Scripts

```bash
# Desarrollo
npm run dev                    # Start dev server

# Build & Deploy
npm run build                  # Build para producción
npm run start                  # Start production server

# Database
npm run prisma:generate       # Generate Prisma client
npm run prisma:migrate        # Run migrations
npm run prisma:studio         # Open Prisma Studio

# Linting
npm run lint                  # Run ESLint
```

### Estándares de Código

- **TypeScript:** Strict mode obligatorio
- **Componentes:** Functional + Hooks
- **Naming:** camelCase para JS, kebab-case para CSS
- **Tipos:** Usar Zod para validación de schemas
- **API:** RESTful routes en `/api`

---

## 📝 API Endpoints (Próximo)

### Properties
```
GET    /api/properties              # Listar propiedades
POST   /api/properties              # Crear propiedad
GET    /api/properties/[id]         # Obtener detalle
PUT    /api/properties/[id]         # Actualizar
DELETE /api/properties/[id]         # Eliminar
```

### Inquiries
```
POST   /api/inquiries               # Crear consulta
GET    /api/inquiries               # Listar (admin)
PUT    /api/inquiries/[id]          # Actualizar estado
```

### Health
```
GET    /api/health                  # Estado de la app
```

---

## 🔐 Seguridad

- [x] TypeScript strict mode
- [x] Environment variables (.env.local)
- [x] SQL injection prevention (Prisma)
- [ ] CSRF protection (Next Auth)
- [ ] Rate limiting
- [ ] Content Security Policy

---

## 📚 Tecnologías & Librerías

| Categoría | Librería | Versión |
|-----------|----------|---------|
| Framework | Next.js | 16.1.6 |
| React | React | 19.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| ORM | Prisma | 7.8.0 |
| Validation | Zod | ^3.22.0 |
| Forms | React Hook Form | ^7.48.0 |

---

## 🚨 Status Actual

**Nivel:** 65% - Integración dinámica + Foundation backend completadas  
**Focus:** Premium seed data + Server actions operacionales ✅  
**Próximo:** Rendering dinámico frontend y persistencia de leads  

---

## 👥 Equipo & Contribución

Desarrollado por **Babel Solutions** para **Driven Group**

---

## 📄 Licencia

Comercial - Todos los derechos reservados © 2026 Driven Group

---

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: tech@drivengroup.com
- Documentación: [Docs](https://docs.drivengroup.com)

```
               _ 
              / \ 
             (   )
            / \_/ \
           (   |   )
          / \_/ \_/ \
         (   |   |   )
        / \_/ \_/ \_/ \
       (   |   |   |   )
      /_\_/_\_/_\_/_\_/_\
     =====================
        DRIVEN GROUP
       Real Estate Platform
```
