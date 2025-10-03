# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Gestión de Números DNC! Esta guía te ayudará a entender cómo puedes participar en el desarrollo del proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## 📜 Código de Conducta

Este proyecto adhiere al [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Al participar, se espera que mantengas este código.

## 🚀 ¿Cómo puedo contribuir?

### 🐛 Reportando Bugs
- Usa la plantilla de issue para bugs
- Incluye pasos para reproducir el problema
- Proporciona información del entorno
- Adjunta capturas de pantalla si es relevante

### ✨ Sugiriendo Features
- Usa la plantilla de issue para features
- Explica el problema que resuelve
- Describe la solución propuesta
- Considera alternativas

### 💻 Contribuyendo Código
- Fix de bugs
- Nuevas funcionalidades
- Mejoras de rendimiento
- Refactoring de código
- Documentación

### 📚 Mejorando Documentación
- Correcciones en README
- Ejemplos de código
- Guías de uso
- Comentarios en código

## 🛠️ Configuración del Entorno

### Prerrequisitos
```bash
# Node.js 18+
node --version

# npm o yarn
npm --version

# Git
git --version

# Docker (opcional)
docker --version
```

### Configuración Local
```bash
# 1. Fork y clonar el repositorio
git clone https://github.com/tu-usuario/gestion_nros_llamadas.git
cd gestion_nros_llamadas

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# 4. Configurar base de datos
docker-compose up -d
npx prisma generate
npx prisma db push
npm run prisma:seed

# 5. Iniciar desarrollo
npm run dev
```

### Verificar Configuración
- ✅ Servidor en http://localhost:5501
- ✅ Base de datos conectada
- ✅ Login con `jefe-admin` / `jefe2025+`
- ✅ Sin errores en consola

## 🔄 Proceso de Desarrollo

### 1. Crear Branch
```bash
# Desde main/master
git checkout main
git pull origin main

# Crear branch descriptivo
git checkout -b feature/nueva-funcionalidad
git checkout -b fix/corregir-bug
git checkout -b docs/actualizar-readme
```

### 2. Desarrollar
```bash
# Hacer cambios
# Ejecutar tests (cuando estén disponibles)
npm run test

# Verificar linting
npm run lint

# Verificar build
npm run build
```

### 3. Commit
```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar validación de números telefónicos"
```

### 4. Push y PR
```bash
# Push al fork
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

## 📏 Estándares de Código

### 🎨 Estilo de Código
```typescript
// ✅ Bueno
interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
}

const createUser = async (userData: User): Promise<User> => {
  // Validar datos
  const validatedData = userSchema.parse(userData);
  
  // Crear usuario
  return await prisma.user.create({
    data: validatedData,
  });
};

// ❌ Malo
function createuser(data: any) {
  return prisma.user.create({data})
}
```

### 📝 Convenciones de Nombres
- **Archivos**: `kebab-case.tsx`
- **Componentes**: `PascalCase`
- **Variables**: `camelCase`
- **Constantes**: `UPPER_CASE`
- **Tipos**: `PascalCase`

### 🏗️ Estructura de Componentes
```typescript
// components/ui/button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "base-button-classes",
        variant === 'primary' && "primary-classes",
        size === 'lg' && "large-classes",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 🔧 APIs
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { userSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar autenticación
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" }, 
        { status: 401 }
      );
    }

    // 2. Validar entrada
    const body = await request.json();
    const validatedData = userSchema.parse(body);

    // 3. Lógica de negocio
    const result = await createUser(validatedData);

    // 4. Respuesta
    return NextResponse.json(result, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
```

### 🎨 Estilos
```tsx
// ✅ Usar Tailwind con clases utilitarias
<div className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4">
  <Icon className="h-6 w-6 text-blue-600" />
  <span className="text-lg font-semibold text-gray-900">Título</span>
</div>

// ✅ Usar cn() para clases condicionales
<button 
  className={cn(
    "px-4 py-2 rounded-md transition-colors",
    isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
    disabled && "opacity-50 cursor-not-allowed"
  )}
>
```

## 🔄 Proceso de Pull Request

### ✅ Checklist antes de PR
- [ ] Código sigue las convenciones del proyecto
- [ ] Tests pasan (cuando estén disponibles)
- [ ] Build exitoso (`npm run build`)
- [ ] Linting sin errores (`npm run lint`)
- [ ] Documentación actualizada si es necesario
- [ ] Commit messages siguen convención

### 📋 Template de PR
```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo ha sido probado?
Describe las pruebas realizadas.

## Checklist
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Los tests pasan
```

### 🔍 Proceso de Review
1. **Automated checks** - CI/CD verifica build y tests
2. **Code review** - Maintainer revisa el código
3. **Feedback** - Cambios solicitados si es necesario
4. **Approval** - Aprobación del maintainer
5. **Merge** - Integración al branch principal

## 🐛 Reportar Bugs

### 📋 Template de Bug Report
```markdown
**Descripción del Bug**
Descripción clara y concisa del bug.

**Pasos para Reproducir**
1. Ir a '...'
2. Hacer clic en '....'
3. Scrollear hacia '....'
4. Ver error

**Comportamiento Esperado**
Descripción clara de lo que esperabas que pasara.

**Capturas de Pantalla**
Si aplica, agregar capturas para explicar el problema.

**Información del Entorno:**
- OS: [ej. Windows 10]
- Navegador: [ej. Chrome 91]
- Versión: [ej. 1.0.0]

**Contexto Adicional**
Cualquier otra información relevante.
```

## ✨ Solicitar Features

### 📋 Template de Feature Request
```markdown
**¿Tu feature request está relacionado con un problema?**
Descripción clara del problema. Ej. "Siempre me frustra cuando [...]"

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas consideradas**
Descripción de soluciones alternativas consideradas.

**Contexto Adicional**
Cualquier otro contexto o capturas sobre el feature request.
```

## 📞 Contacto

- **Issues**: Para bugs y feature requests
- **Discussions**: Para preguntas generales
- **Email**: Para asuntos sensibles

## 🙏 Reconocimiento

Todos los contribuidores serán reconocidos en:
- README principal
- Página de créditos
- Release notes

¡Gracias por contribuir! 🎉
