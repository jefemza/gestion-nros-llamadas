@echo off
title Sistema DNC - Iniciando Servidores
color 0A
echo.
echo ===============================================
echo    🚀 SISTEMA DNC - INICIANDO SERVIDORES 🚀
echo ===============================================
echo.

echo 📋 Verificando requisitos del sistema...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js no está instalado o no está en el PATH
    echo    Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si Docker está corriendo
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  ADVERTENCIA: Docker no está disponible
    echo    El sistema funcionará sin base de datos local
    echo.
) else (
    echo ✅ Docker detectado - Verificando contenedores...
    docker ps >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Docker no está corriendo. Iniciando Docker Desktop...
        start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
        echo ⏳ Esperando 30 segundos para que Docker inicie...
        timeout /t 30 /nobreak >nul
    )
)

echo.
echo 🗄️  Iniciando base de datos PostgreSQL...
echo.

REM Iniciar contenedor de PostgreSQL
docker-compose up -d
if %errorlevel% neq 0 (
    echo ❌ Error al iniciar la base de datos
    echo    Continuando sin base de datos local...
    echo.
) else (
    echo ✅ Base de datos PostgreSQL iniciada correctamente
    echo ⏳ Esperando 10 segundos para que la DB esté lista...
    timeout /t 10 /nobreak >nul
    echo.
)

echo 📦 Verificando dependencias de Node.js...
echo.

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo ⚠️  Dependencias no encontradas. Instalando...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Error al instalar dependencias
        pause
        exit /b 1
    )
    echo ✅ Dependencias instaladas correctamente
    echo.
)

echo 🔄 Configurando base de datos (Prisma)...
echo.

REM Generar cliente de Prisma
npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Error al generar cliente de Prisma
    pause
    exit /b 1
)

REM Ejecutar migraciones
npx prisma db push
if %errorlevel% neq 0 (
    echo ⚠️  Error en migraciones de base de datos
    echo    El sistema puede no funcionar correctamente
    echo.
)

REM Ejecutar seed de datos iniciales
npx prisma db seed
if %errorlevel% neq 0 (
    echo ⚠️  Error al cargar datos iniciales
    echo    Los datos de ejemplo no se cargaron
    echo.
)

echo.
echo 🌐 Iniciando servidor de desarrollo Next.js...
echo.
echo ===============================================
echo    ✨ SISTEMA DNC INICIADO EXITOSAMENTE ✨
echo ===============================================
echo.
echo 🔗 Accesos disponibles:
echo    • Aplicación: http://localhost:5501
echo    • Base de datos: localhost:5432
echo.
echo 👨‍💼 Credenciales de administrador:
echo    • Usuario: jefe-admin
echo    • Contraseña: jefe2025+
echo.
echo ⚡ El servidor se iniciará en modo desarrollo...
echo    Presiona Ctrl+C para detener el servidor
echo.
echo ===============================================

REM Iniciar servidor en puerto 5501
npm run dev

REM Si llegamos aquí, el servidor se detuvo
echo.
echo 🛑 Servidor detenido.
echo    Los contenedores Docker siguen ejecutándose.
echo    Usa 'detener-sistema.bat' para detener todo.
echo.
pause
