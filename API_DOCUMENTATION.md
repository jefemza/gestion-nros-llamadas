# 📡 Documentación de API

Esta documentación describe todos los endpoints disponibles en el Sistema de Gestión de Números DNC.

## 🔐 Autenticación

Todas las APIs (excepto las de autenticación) requieren una sesión válida de NextAuth.js.

## 🔐 Permisos por Rol

### **👨‍💼 ADMIN (Acceso Completo)**
- ✅ Todas las APIs del sistema
- ✅ Dashboard con métricas (`/api/dashboard/stats`)
- ✅ Reportes y estadísticas (`/api/reports`)
- ✅ Gestión de usuarios (`/api/users`)
- ✅ Gestión de motivos (`/api/reasons` - POST/DELETE)
- ✅ CRUD completo de números DNC (`/api/dnc`)
- ✅ Exportación y análisis avanzados

### **👨‍💻 USER (Acceso Limitado - Flujo Enfocado)**
- ✅ **Permitido**: 
  - Crear números DNC (`POST /api/dnc`)
  - Consultar números DNC (`GET /api/dnc` - solo lectura)
  - Obtener motivos (`GET /api/reasons` - solo lectura)
- ❌ **Bloqueado**:
  - Dashboard/métricas (`/api/dashboard/stats`) → 403 Forbidden
  - Reportes (`/api/reports`) → 403 Forbidden  
  - Gestión usuarios (`/api/users`) → 403 Forbidden
  - Crear/eliminar motivos (`/api/reasons` POST/DELETE) → 403 Forbidden
  - Editar/eliminar números DNC → Acceso limitado

### Headers Requeridos
```http
Content-Type: application/json
Cookie: next-auth.session-token=<token>
```

### Códigos de Estado
- `200` - Éxito
- `201` - Creado exitosamente
- `400` - Solicitud inválida
- `401` - No autorizado
- `403` - Acceso denegado
- `404` - No encontrado
- `500` - Error interno del servidor

---

## 🔑 Autenticación

### POST `/api/auth/signin`
Iniciar sesión con credenciales.

**Request:**
```json
{
  "username": "jefe-admin",
  "password": "jefe2025+"
}
```

**Response:**
```json
{
  "user": {
    "id": "clxxxxx",
    "username": "jefe-admin",
    "role": "ADMIN"
  }
}
```

### POST `/api/auth/signout`
Cerrar sesión actual.

**Response:**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

### GET `/api/auth/session`
Obtener información de la sesión actual.

**Response:**
```json
{
  "user": {
    "id": "clxxxxx",
    "username": "jefe-admin",
    "role": "ADMIN"
  },
  "expires": "2024-01-27T12:00:00.000Z"
}
```

---

## 📊 Dashboard

### GET `/api/dashboard/stats`
Obtener estadísticas generales del sistema.

**Permisos:** ADMIN únicamente

**Response:**
```json
{
  "totalDNC": 150,
  "totalReasons": 4,
  "totalUsers": 8,
  "recentEntries": 12
}
```

---

## 📞 Gestión DNC

### GET `/api/dnc`
Listar todos los números DNC.

**Permisos:** USER, ADMIN

**Query Parameters:**
- `search` (opcional) - Buscar por número o notas
- `reasonId` (opcional) - Filtrar por motivo
- `limit` (opcional) - Limitar resultados (default: 100)
- `offset` (opcional) - Offset para paginación (default: 0)

**Response:**
```json
[
  {
    "id": "clxxxxx",
    "phone": "+1234567890",
    "notes": "Cliente solicitó no ser contactado",
    "reason": {
      "id": "clxxxxx",
      "name": "QUITAR"
    },
    "createdAt": "2024-12-27T10:00:00.000Z",
    "updatedAt": "2024-12-27T10:00:00.000Z"
  }
]
```

### POST `/api/dnc`
Crear un nuevo número DNC.

**Permisos:** USER, ADMIN

**Request:**
```json
{
  "phone": "+1234567890",
  "reasonId": "clxxxxx",
  "notes": "Notas opcionales"
}
```

**Response:**
```json
{
  "id": "clxxxxx",
  "phone": "+1234567890",
  "notes": "Notas opcionales",
  "reason": {
    "id": "clxxxxx",
    "name": "QUITAR"
  },
  "createdAt": "2024-12-27T10:00:00.000Z",
  "updatedAt": "2024-12-27T10:00:00.000Z"
}
```

**Errores:**
```json
{
  "error": "Este número ya está en la lista DNC"
}
```

### GET `/api/dnc/[id]`
Obtener un número DNC específico.

**Permisos:** USER, ADMIN

**Response:**
```json
{
  "id": "clxxxxx",
  "phone": "+1234567890",
  "notes": "Notas opcionales",
  "reason": {
    "id": "clxxxxx",
    "name": "QUITAR"
  },
  "createdAt": "2024-12-27T10:00:00.000Z",
  "updatedAt": "2024-12-27T10:00:00.000Z"
}
```

### PUT `/api/dnc/[id]`
Actualizar un número DNC existente.

**Permisos:** USER, ADMIN

**Request:**
```json
{
  "phone": "+1234567890",
  "reasonId": "clxxxxx",
  "notes": "Notas actualizadas"
}
```

**Response:**
```json
{
  "id": "clxxxxx",
  "phone": "+1234567890",
  "notes": "Notas actualizadas",
  "reason": {
    "id": "clxxxxx",
    "name": "QUITAR"
  },
  "createdAt": "2024-12-27T10:00:00.000Z",
  "updatedAt": "2024-12-27T11:00:00.000Z"
}
```

### DELETE `/api/dnc/[id]`
Eliminar un número DNC.

**Permisos:** USER, ADMIN

**Response:**
```json
{
  "message": "Número eliminado correctamente"
}
```

---

## 🏷️ Motivos

### GET `/api/reasons`
Listar todos los motivos de bloqueo.

**Permisos:** USER, ADMIN

**Response:**
```json
[
  {
    "id": "clxxxxx",
    "name": "MOVISTAR",
    "_count": {
      "dncEntries": 45
    },
    "createdAt": "2024-12-27T10:00:00.000Z",
    "updatedAt": "2024-12-27T10:00:00.000Z"
  },
  {
    "id": "clxxxxx",
    "name": "MOROSO",
    "_count": {
      "dncEntries": 23
    },
    "createdAt": "2024-12-27T10:00:00.000Z",
    "updatedAt": "2024-12-27T10:00:00.000Z"
  }
]
```

### POST `/api/reasons`
Crear un nuevo motivo de bloqueo.

**Permisos:** ADMIN

**Request:**
```json
{
  "name": "NUEVO_MOTIVO"
}
```

**Response:**
```json
{
  "id": "clxxxxx",
  "name": "NUEVO_MOTIVO",
  "_count": {
    "dncEntries": 0
  },
  "createdAt": "2024-12-27T12:00:00.000Z",
  "updatedAt": "2024-12-27T12:00:00.000Z"
}
```

**Errores:**
```json
{
  "error": "Este motivo ya existe"
}
```

### DELETE `/api/reasons/[id]`
Eliminar un motivo de bloqueo.

**Permisos:** ADMIN

**Response:**
```json
{
  "message": "Motivo eliminado correctamente"
}
```

**Errores:**
```json
{
  "error": "No se puede eliminar. Hay 15 números asociados a este motivo"
}
```

---

## 👥 Usuarios

### GET `/api/users`
Listar todos los usuarios del sistema.

**Permisos:** ADMIN

**Response:**
```json
[
  {
    "id": "clxxxxx",
    "username": "jefe-admin",
    "role": "ADMIN",
    "createdAt": "2024-12-27T10:00:00.000Z",
    "updatedAt": "2024-12-27T10:00:00.000Z"
  },
  {
    "id": "clxxxxx",
    "username": "vendedor1",
    "role": "USER",
    "createdAt": "2024-12-27T11:00:00.000Z",
    "updatedAt": "2024-12-27T11:00:00.000Z"
  }
]
```

### POST `/api/users`
Crear un nuevo usuario.

**Permisos:** ADMIN

**Request:**
```json
{
  "username": "nuevo_vendedor",
  "password": "password123",
  "role": "USER"
}
```

**Response:**
```json
{
  "id": "clxxxxx",
  "username": "nuevo_vendedor",
  "role": "USER",
  "createdAt": "2024-12-27T12:00:00.000Z",
  "updatedAt": "2024-12-27T12:00:00.000Z"
}
```

**Errores:**
```json
{
  "error": "Este nombre de usuario ya existe"
}
```

### DELETE `/api/users/[id]`
Eliminar un usuario.

**Permisos:** ADMIN

**Response:**
```json
{
  "message": "Usuario eliminado correctamente"
}
```

**Errores:**
```json
{
  "error": "No puedes eliminar tu propia cuenta"
}
```

---

## 📈 Reportes

### GET `/api/reports`
Obtener datos para reportes y estadísticas.

**Permisos:** ADMIN únicamente

**Response:**
```json
{
  "totalDNC": 150,
  "totalReasons": 4,
  "totalUsers": 8,
  "dncByReason": [
    {
      "name": "MOVISTAR",
      "count": 45
    },
    {
      "name": "MOROSO",
      "count": 23
    }
  ],
  "dncByDate": [],
  "recentActivity": [
    {
      "action": "Sistema iniciado correctamente",
      "date": "27/12/2024",
      "user": "Sistema"
    }
  ]
}
```

---

## 🔧 Validaciones

### Esquemas de Validación

#### Usuario
```typescript
{
  username: string (3-50 chars, alphanumeric + ._-)
  password: string (min 6 chars)
  role: "USER" | "ADMIN"
}
```

#### Número DNC
```typescript
{
  phone: string (required, phone format)
  reasonId: string (required, valid UUID)
  notes?: string (optional)
}
```

#### Motivo
```typescript
{
  name: string (1-50 chars, uppercase recommended)
}
```

---

## 🚨 Manejo de Errores

### Estructura de Error
```json
{
  "error": "Mensaje de error legible",
  "details": [
    {
      "field": "username",
      "message": "El usuario debe tener al menos 3 caracteres"
    }
  ]
}
```

### Errores Comunes

#### 400 - Bad Request
```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "field": "phone",
      "message": "El número solo puede contener dígitos y caracteres telefónicos"
    }
  ]
}
```

#### 401 - Unauthorized
```json
{
  "error": "No autorizado"
}
```

#### 403 - Forbidden
```json
{
  "error": "Acceso denegado"
}
```

#### 404 - Not Found
```json
{
  "error": "Número no encontrado"
}
```

#### 500 - Internal Server Error
```json
{
  "error": "Error interno del servidor"
}
```

---

## 📝 Ejemplos de Uso

### Flujo Completo: Agregar Número DNC

1. **Autenticarse**
```bash
curl -X POST http://localhost:5501/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "jefe-admin", "password": "jefe2025+"}'
```

2. **Obtener motivos disponibles**
```bash
curl -X GET http://localhost:5501/api/reasons \
  -H "Cookie: next-auth.session-token=<token>"
```

3. **Crear número DNC**
```bash
curl -X POST http://localhost:5501/api/dnc \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=<token>" \
  -d '{
    "phone": "+1234567890",
    "reasonId": "clxxxxx",
    "notes": "Cliente solicitó no ser contactado"
  }'
```

### Flujo Completo: Crear Usuario Vendedor

1. **Autenticarse como Admin**
```bash
curl -X POST http://localhost:5501/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "jefe-admin", "password": "jefe2025+"}'
```

2. **Crear usuario vendedor**
```bash
curl -X POST http://localhost:5501/api/users \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=<token>" \
  -d '{
    "username": "vendedor1",
    "password": "password123",
    "role": "USER"
  }'
```

---

## 🔄 Rate Limiting

Actualmente no hay rate limiting implementado, pero se recomienda:
- Máximo 100 requests por minuto por IP
- Máximo 1000 requests por hora por usuario autenticado

---

## 📊 Paginación

Para endpoints que retornan listas, usar:
- `limit` - Número máximo de resultados (default: 100, max: 1000)
- `offset` - Número de resultados a saltar (default: 0)

**Ejemplo:**
```bash
GET /api/dnc?limit=50&offset=100
```

---

## 🔍 Filtrado y Búsqueda

### Números DNC
- `search` - Busca en phone y notes
- `reasonId` - Filtra por motivo específico

**Ejemplo:**
```bash
GET /api/dnc?search=123456&reasonId=clxxxxx
```

---

## 📅 Versionado

La API actualmente está en versión 1.0. Futuras versiones mantendrán compatibilidad hacia atrás o se indicará claramente en la URL:

- `/api/v1/dnc` (futuro)
- `/api/v2/dnc` (futuro)

---

## 🛠️ Herramientas Recomendadas

- **Postman** - Para testing de APIs
- **Insomnia** - Cliente REST alternativo
- **curl** - Para scripts automatizados
- **HTTPie** - Cliente HTTP user-friendly

---

¿Necesitas más información sobre algún endpoint específico? ¡Consulta el código fuente o crea un issue!
