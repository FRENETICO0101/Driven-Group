# Takashi - Driven Academy Project

![Driven Academy](https://img.shields.io/badge/Driven_Academy-Executive_Training-0a0a0a?style=for-the-badge&logoColor=f5f5f7)
![Project Status](https://img.shields.io/badge/Status-Fase_1_Completada-success?style=for-the-badge)

**Plataforma interactiva** para la formación ejecutiva, el desarrollo de liderazgo y mentoring estratégico con integración de inteligencia artificial ("Tutor IA").

---

## 🏗️ Stack Tecnológico

El ecosistema principal del proyecto está construido utilizando las siguientes herramientas de vanguardia:

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4.
- **Base de Datos:** PostgreSQL.
- **ORM:** Prisma.
- **Diseño & UI:** Glassmorphism, Material Symbols, Tipografía Inter. Estética Dark Mode Ejecutiva (Tonos carbón, obsidiana y acentos dorados/ámbar).
- **IA (Próximamente):** Gemini / LangChain / Pinecone (Base Vectorial) para el Tutor de Inteligencia Artificial ("Driven Tutor").

## 📂 Arquitectura de UI Inicial

La Fase 1 abarca el traslado del diseño (`Mockups`) a código nativo en Next.js con Tailwind CSS:

1. `src/app/page.tsx`: **Landing Page Principal.** Catálogo público de programas de Liderazgo y Finanzas con efecto interactivo.
2. `src/app/dashboard/page.tsx`: **Portal del Estudiante.** Seguimiento de insignias de progreso, cursos y XP.
3. `src/app/course/page.tsx`: **Plataforma Educativa Interactive.** Visualizador del curso con índice lateral y panel de chat flotante del IA Tutor Integrado.

## 🚀 Instalación y Despliegue Local

Para levantar el nodo de desarrollo frontal del proyecto localmente:

```bash
# Navegar a la carpeta fuente del proyecto
cd source/

# Instalar dependencias mediante NPM
npm install

# Iniciar servidor de pruebas y desarrollo
npm run dev
```

Una vez que el servidor se esté ejecutando en local, la plataforma estará disponible en el puerto 3000 de tu red: [http://localhost:3000](http://localhost:3000)

## 🗄️ Esquema Base Próximo (Fase 2)

Se requiere inicializar y levantar correctamente el esquema `.env` con las variables de base de datos (`DATABASE_URL`) apuntando al servidor relacional con PostgreSQL.

```bash
# Generar migraciones del esquema
npx prisma migrate dev --name init

# Interfaz gráfica de administración
npx prisma studio
```

---

## 📈 Release Notes: Resumen Fase 1 (v0.1.0-alpha)
* **Objetivo:** Prototipado inicial, inyección de diseño, entorno Next.js y ecosistema de variables.
* **Logros:**
  - Inicialización de Next.js v15 y Tailwind CSS v4.
  - Implementación del sistema Dark Mode / Glassmorphism de la academia.
  - Migración a React de las 3 pantallas clave: Landing, Dashboard de Estudiantes y Plataforma de Cursos.
  - Inserción de imágenes de cobertura de curso generadas por IA.
  - Esquema preliminar de `Prisma` activado.
  - Repositorio limpio (`.gitignore`) de dependencias pesadas de diseño.

---

```text
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
           B A B E L
           SOLUTIONS
   
     @project Takashi - Driven Academy
     @engineered_by Babel Solutions Team
```

*Desarrollado bajo licencia comercial exclusiva.*
*Copyright © 2026. Todos los derechos reservados.*
