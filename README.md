# 🚀 Sistema de Gestión de Números de Llamadas DNC

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black.svg)
![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Sistema profesional para administrar números DNC (Do Not Call) con interfaz moderna y funcionalidades avanzadas**

[🌟 Demo](#-demo) • [📋 Características](#-características) • [🚀 Instalación](#-instalación) • [📖 Documentación](#-documentación)

</div>

---

## 📋 Características Principales

### 🎨 **Interfaz Moderna y Profesional**
- ✨ **Diseño Premium**: Gradientes, glassmorphism y micro-interacciones
- 🎯 **UX Optimizada**: Animaciones fluidas y feedback visual inmediato
- 📱 **Responsive Design**: Adaptable a todos los dispositivos
- 🌙 **Tema Profesional**: Colores corporativos y tipografía moderna

### 🔐 **Sistema de Autenticación Robusto**
- 🛡️ **NextAuth.js**: Autenticación JWT segura
- 👥 **Roles de Usuario**: Administradores y Vendedores
- 🔒 **Protección de Rutas**: Middleware de seguridad
- 🔑 **Gestión de Sesiones**: Control completo de acceso

### 📊 **Dashboard Avanzado**
- 📈 **Métricas en Tiempo Real**: Estadísticas actualizadas automáticamente
- 🎨 **Tarjetas Interactivas**: Efectos hover y animaciones
- 📊 **Indicadores de Tendencia**: Métricas de crecimiento
- ⚡ **Acciones Rápidas**: Acceso directo a funciones principales

### 🔧 **Gestión Completa de DNC**
- ➕ **CRUD Completo**: Crear, leer, actualizar, eliminar números
- 🔍 **Búsqueda Avanzada**: Filtros por número, motivo y notas
- 🏷️ **Categorización**: Organización por motivos personalizables
- 📋 **Validación**: Verificación de formato y duplicados

### 👥 **Administración de Usuarios**
- 🆕 **Crear Vendedores**: Sistema completo de gestión de usuarios
- 🔐 **Roles y Permisos**: Control granular de acceso
- 👤 **Perfiles de Usuario**: Información detallada y configuración
- 🚫 **Eliminación Segura**: Protección contra auto-eliminación

### 📈 **Reportes y Análisis**
- 📊 **Estadísticas Detalladas**: Métricas por motivo y fecha
- 📥 **Exportación CSV**: Descarga de reportes
- 📅 **Análisis Temporal**: Tendencias y comparaciones
- 🎯 **Insights Empresariales**: Información valiosa para toma de decisiones

---

## 🛠️ Stack Tecnológico

### **Frontend**
- **Next.js 15.5.4** - Framework React con App Router
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.0** - Tipado estático
- **Tailwind CSS 4.0** - Framework de estilos utility-first
- **Shadcn/ui** - Componentes UI modernos y accesibles

### **Backend**
- **Next.js API Routes** - Endpoints RESTful
- **NextAuth.js** - Autenticación y autorización
- **Prisma ORM** - Object-Relational Mapping
- **PostgreSQL** - Base de datos relacional

### **Validación y Formularios**
- **Zod** - Validación de esquemas TypeScript-first
- **React Hook Form** - Manejo eficiente de formularios
- **@hookform/resolvers** - Integración Zod + React Hook Form

### **UI/UX**
- **Lucide React** - Iconos modernos y consistentes
- **Sonner** - Notificaciones toast elegantes
- **Class Variance Authority** - Utilidades de clases CSS
- **Tailwind Merge** - Fusión inteligente de clases

### **Desarrollo**
- **ESLint** - Linting de código
- **TypeScript** - Desarrollo tipado
- **Docker** - Containerización de base de datos

---

## 🚀 Instalación y Configuración

### **📋 Requisitos Previos**
- Node.js 18+ 
- PostgreSQL 13+
- npm o yarn
- Docker (opcional)

### **⚡ Instalación Rápida**

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd gestion_nros_llamadas

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos (Docker)
docker-compose up -d

# 4. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# 5. Configurar base de datos
npx prisma generate
npx prisma db push
npm run prisma:seed

# 6. Iniciar servidor de desarrollo
npm run dev
```

### **🔧 Variables de Entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Base de Datos
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

# Autenticación
NEXTAUTH_URL="http://localhost:5501"
NEXTAUTH_SECRET="tu-clave-secreta-super-segura"

# Configuración
NODE_ENV="development"
```

### **🐳 Docker Compose**

El proyecto incluye configuración Docker para PostgreSQL:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:13
    restart: always
    environment:
      POSTGRES_USER: johndoe
      POSTGRES_PASSWORD: randompassword
      POSTGRES_DB: mydb
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

---

## 🎯 Uso del Sistema

### **🔐 Acceso Inicial**

- **URL**: http://localhost:5501

#### **👨‍💼 Cuenta Administrador**
- **Usuario**: `jefe-admin`
- **Contraseña**: `jefe2025+`
- **Redirección**: `/dashboard` (panel completo)

#### **👨‍💻 Cuentas Vendedor**
- **Creadas por**: Administrador desde `/dashboard/users`
- **Redirección**: `/capturar-numero` (pantalla enfocada)
- **Acceso limitado**: Solo captura y consulta simple

### **👥 Roles y Permisos**

#### **🔹 Administrador (ADMIN)**
- ✅ Dashboard completo con métricas y estadísticas
- ✅ Gestión completa de números DNC
- ✅ Crear y administrar usuarios vendedores
- ✅ Configurar motivos de bloqueo
- ✅ Acceso a todos los reportes y exportación CSV
- ✅ Configuración del sistema
- ✅ Métricas avanzadas y análisis

#### **🔹 Vendedor (USER) - Flujo Ultra-Enfocado**
- ✅ **Pantalla principal**: Capturar números DNC (10 dígitos)
- ✅ **Consulta simple**: Buscar números registrados
- ✅ **Flujo optimizado**: Sin distracciones ni métricas
- ✅ **Redirección automática**: Directo a captura tras login
- ❌ **Bloqueado**: Dashboard, reportes, métricas, gestión de usuarios/motivos

### **📱 Funcionalidades por Página**

#### **🏠 Dashboard** *(Solo ADMIN)*
- Métricas en tiempo real
- Tarjetas interactivas con estadísticas
- Acciones rápidas para funciones comunes
- Estado del sistema en tiempo real

#### **📞 Capturar Número** *(Pantalla Principal USER)*
- **Interfaz ultra-enfocada** para vendedores
- **Validación automática** de 10 dígitos
- **Selección rápida** de motivos (Movistar/Moroso/Quitar/Otros)
- **Notas opcionales** para contexto adicional
- **Auto-reset** tras cada captura exitosa
- **Contador** de números capturados por día

#### **🔍 Consultar DNC** *(USER - Opcional)*
- **Búsqueda simple** por número (mínimo 3 dígitos)
- **Resultados inmediatos** sin paginación compleja
- **Vista simplificada** sin opciones de edición
- **Acceso rápido** desde pantalla de captura

#### **📞 Gestión DNC Completa** *(Solo ADMIN)*
- Lista completa de números bloqueados
- Búsqueda y filtrado avanzado
- Agregar, editar y eliminar números
- Exportación y gestión masiva

#### **👤 Gestión de Usuarios** *(Solo ADMIN)*
- Crear cuentas de vendedores
- Asignar roles y permisos
- Eliminar usuarios (con protecciones)
- Vista general de usuarios activos

#### **📊 Reportes y Métricas** *(Solo ADMIN)*
- Estadísticas por motivo de bloqueo
- Métricas temporales y tendencias
- Exportación a CSV
- Análisis empresariales avanzados

---

## 🗃️ Estructura de Base de Datos

```sql
-- Usuarios del sistema
User {
  id: String (cuid)           -- ID único
  username: String (unique)   -- Nombre de usuario
  password: String (hashed)   -- Contraseña encriptada
  role: Role (USER/ADMIN)     -- Rol del usuario
  createdAt: DateTime         -- Fecha de creación
  updatedAt: DateTime         -- Última actualización
}

-- Motivos de bloqueo
Reason {
  id: String (cuid)           -- ID único
  name: String (unique)       -- Nombre del motivo
  dncEntries: DNC[]          -- Relación con números DNC
  createdAt: DateTime         -- Fecha de creación
  updatedAt: DateTime         -- Última actualización
}

-- Números DNC (Do Not Call)
DNC {
  id: String (cuid)           -- ID único
  phone: String (unique)      -- Número de teléfono
  notes: String (optional)    -- Notas adicionales
  reasonId: String           -- ID del motivo (FK)
  reason: Reason             -- Relación con motivo
  createdAt: DateTime         -- Fecha de creación
  updatedAt: DateTime         -- Última actualización
}
```

---

## 🔌 API Endpoints

### **🔐 Autenticación**
```http
POST /api/auth/signin          # Iniciar sesión
POST /api/auth/signout         # Cerrar sesión
GET  /api/auth/session         # Obtener sesión actual
```

### **📊 Dashboard**
```http
GET /api/dashboard/stats       # Estadísticas generales
```

### **📞 Gestión DNC**
```http
GET    /api/dnc               # Listar números DNC
POST   /api/dnc               # Crear número DNC
GET    /api/dnc/[id]          # Obtener número específico
PUT    /api/dnc/[id]          # Actualizar número
DELETE /api/dnc/[id]          # Eliminar número
```

### **🏷️ Motivos**
```http
GET    /api/reasons           # Listar motivos
POST   /api/reasons           # Crear motivo (Admin)
DELETE /api/reasons/[id]      # Eliminar motivo (Admin)
```

### **👥 Usuarios**
```http
GET    /api/users             # Listar usuarios (Admin)
POST   /api/users             # Crear usuario (Admin)
DELETE /api/users/[id]        # Eliminar usuario (Admin)
```

### **📈 Reportes**
```http
GET /api/reports              # Obtener datos de reportes
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/                      # App Router de Next.js
│   ├── api/                 # API Routes
│   │   ├── auth/           # Endpoints de autenticación
│   │   ├── dashboard/      # APIs del dashboard
│   │   ├── dnc/            # APIs de gestión DNC
│   │   ├── reasons/        # APIs de motivos
│   │   ├── reports/        # APIs de reportes
│   │   └── users/          # APIs de usuarios
│   ├── auth/               # Páginas de autenticación
│   │   └── signin/         # Página de login
│   ├── dashboard/          # Páginas del dashboard
│   │   ├── dnc/           # Gestión de números DNC
│   │   ├── reasons/       # Gestión de motivos
│   │   ├── users/         # Gestión de usuarios
│   │   ├── reports/       # Reportes y estadísticas
│   │   └── settings/      # Configuración
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── providers.tsx      # Proveedores de contexto
├── components/             # Componentes reutilizables
│   ├── layout/            # Componentes de layout
│   │   ├── navbar.tsx     # Barra de navegación
│   │   └── sidebar.tsx    # Menú lateral
│   └── ui/                # Componentes UI (Shadcn)
├── lib/                   # Utilidades y configuración
│   ├── auth.ts           # Configuración NextAuth
│   └── utils.ts          # Utilidades generales
└── types/                 # Definiciones de TypeScript
    └── next-auth.d.ts     # Tipos de NextAuth
```

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (puerto 5501)
npm run build           # Build para producción
npm run start           # Servidor de producción
npm run lint            # Ejecutar ESLint

# Base de datos
npm run prisma:seed     # Poblar datos iniciales
npx prisma studio       # Interface gráfica de BD
npx prisma generate     # Generar cliente Prisma
npx prisma db push      # Aplicar cambios al esquema
npx prisma migrate dev  # Crear y aplicar migraciones
```

---

## 🎨 Características de Diseño

### **🌈 Paleta de Colores**
- **Primario**: Gradientes azul-índigo (#3B82F6 → #6366F1)
- **Secundario**: Grises modernos (#F8FAFC → #1E293B)
- **Acentos**: Verde (#10B981), Rojo (#EF4444), Púrpura (#8B5CF6)

### **✨ Efectos Visuales**
- **Glassmorphism**: Fondos translúcidos con backdrop-blur
- **Gradientes**: Transiciones de color suaves
- **Sombras**: Elevación y profundidad visual
- **Animaciones**: Micro-interacciones fluidas

### **📱 Responsive Design**
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm, md, lg, xl para diferentes pantallas
- **Navegación**: Menú adaptativo según dispositivo

---

## 🔒 Seguridad

### **🛡️ Medidas Implementadas**
- **Autenticación JWT**: Tokens seguros con NextAuth.js
- **Encriptación**: Contraseñas hasheadas con bcrypt
- **Validación**: Esquemas Zod en frontend y backend
- **Middleware**: Protección de rutas sensibles
- **CORS**: Configuración de origen cruzado
- **Rate Limiting**: Protección contra ataques de fuerza bruta

### **🔐 Mejores Prácticas**
- Variables de entorno para configuración sensible
- Validación de entrada en todas las APIs
- Sanitización de datos de usuario
- Logs de seguridad y auditoría
- Sesiones con expiración automática

---

## 🚀 Despliegue

### **🌐 Vercel (Recomendado)**
```bash
# 1. Conectar repositorio a Vercel
# 2. Configurar variables de entorno
# 3. Conectar base de datos PostgreSQL (Neon/Supabase)
# 4. Deploy automático
```

### **🐳 Docker**
```bash
# Build imagen
docker build -t dnc-manager .

# Ejecutar contenedor
docker run -p 5501:5501 dnc-manager
```

### **☁️ Otras Plataformas**
- **Netlify**: Para sitios estáticos
- **Railway**: Para aplicaciones full-stack
- **Heroku**: Con PostgreSQL add-on

---

## 🔧 Configuración Avanzada

### **⚡ Optimizaciones de Rendimiento**
- **Next.js 15**: App Router con streaming
- **React 19**: Concurrent features
- **Prisma**: Query optimization
- **Tailwind**: Purging CSS no utilizado

### **📊 Monitoreo**
- **Logs**: Sistema de logging estructurado
- **Métricas**: Tiempo de respuesta de APIs
- **Errores**: Tracking de errores en producción

---

## 🤝 Contribución

### **🔄 Proceso de Contribución**
1. Fork del proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### **📝 Estándares de Código**
- **TypeScript**: Tipado estricto
- **ESLint**: Configuración Next.js
- **Prettier**: Formateo automático
- **Conventional Commits**: Mensajes estructurados

---

## 📞 Soporte

### **🆘 Obtener Ayuda**
- **Issues**: Reportar bugs o solicitar features
- **Documentación**: Consultar este README
- **Email**: Contactar al equipo de desarrollo

### **🔍 Troubleshooting**
- **Puerto ocupado**: Cambiar puerto en package.json
- **Base de datos**: Verificar conexión PostgreSQL
- **Dependencias**: Ejecutar `npm install` nuevamente

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **Next.js Team** - Framework excepcional
- **Vercel** - Plataforma de despliegue
- **Shadcn** - Sistema de componentes UI
- **Tailwind CSS** - Framework de estilos
- **Prisma Team** - ORM moderno y eficiente

---

<div align="center">

**⭐ Si este proyecto te resulta útil, considera darle una estrella ⭐**

**Desarrollado con ❤️ para mejorar la gestión de comunicaciones telefónicas**

[🔝 Volver arriba](#-sistema-de-gestión-de-números-de-llamadas-dnc)

</div>