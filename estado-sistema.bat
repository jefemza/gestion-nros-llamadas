@echo off
title Sistema DNC - Estado del Sistema
color 0B
echo.
echo ===============================================
echo    📊 SISTEMA DNC - ESTADO DEL SISTEMA 📊
echo ===============================================
echo.

echo 🔍 Verificando estado de los servicios...
echo.

REM Verificar Node.js
echo 📦 Node.js:
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo    ✅ Instalado - Versión: %%i
) else (
    echo    ❌ No instalado o no disponible en PATH
)
echo.

REM Verificar npm
echo 📦 NPM:
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo    ✅ Instalado - Versión: %%i
) else (
    echo    ❌ No disponible
)
echo.

REM Verificar Docker
echo 🐳 Docker:
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('docker --version') do echo    ✅ Instalado - %%i
    
    REM Verificar si Docker está corriendo
    docker ps >nul 2>&1
    if %errorlevel% equ 0 (
        echo    ✅ Docker Engine está corriendo
    ) else (
        echo    ⚠️  Docker está instalado pero no está corriendo
    )
) else (
    echo    ❌ No instalado o no disponible
)
echo.

REM Verificar contenedores Docker
echo 🗄️  Contenedores Docker:
docker ps --format "table {{.Names}}\t{{.Status}}" 2>nul | findstr postgres
if %errorlevel% equ 0 (
    echo    ✅ PostgreSQL container está corriendo
) else (
    echo    ❌ PostgreSQL container no está corriendo
)
echo.

REM Verificar puertos
echo 🌐 Puertos del sistema:
netstat -ano | findstr :5501 >nul
if %errorlevel% equ 0 (
    echo    ✅ Puerto 5501 (Next.js) - EN USO
) else (
    echo    ⚪ Puerto 5501 (Next.js) - LIBRE
)

netstat -ano | findstr :5432 >nul
if %errorlevel% equ 0 (
    echo    ✅ Puerto 5432 (PostgreSQL) - EN USO
) else (
    echo    ⚪ Puerto 5432 (PostgreSQL) - LIBRE
)
echo.

REM Verificar archivos del proyecto
echo 📁 Archivos del proyecto:
if exist "package.json" (
    echo    ✅ package.json - Presente
) else (
    echo    ❌ package.json - Faltante
)

if exist "node_modules" (
    echo    ✅ node_modules - Presente
) else (
    echo    ❌ node_modules - Faltante (ejecutar npm install)
)

if exist "prisma\schema.prisma" (
    echo    ✅ Prisma Schema - Presente
) else (
    echo    ❌ Prisma Schema - Faltante
)

if exist ".next" (
    echo    ✅ Build Next.js - Presente
) else (
    echo    ⚪ Build Next.js - No generado (normal en primera ejecución)
)
echo.

REM Verificar procesos activos
echo 🔄 Procesos activos:
tasklist | findstr node.exe >nul
if %errorlevel% equ 0 (
    echo    ✅ Procesos Node.js detectados:
    tasklist | findstr node.exe
) else (
    echo    ⚪ No hay procesos Node.js activos
)
echo.

echo ===============================================
echo    📋 RESUMEN DEL ESTADO
echo ===============================================
echo.

REM Determinar estado general
set "estado_general=✅ OPERATIVO"
if not exist "package.json" set "estado_general=❌ CONFIGURACIÓN INCOMPLETA"
if not exist "node_modules" set "estado_general=⚠️  REQUIERE INSTALACIÓN"

docker ps >nul 2>&1
if %errorlevel% neq 0 (
    set "estado_general=⚠️  DOCKER NO DISPONIBLE"
)

echo Estado general: %estado_general%
echo.

if "%estado_general%"=="✅ OPERATIVO" (
    echo 🎉 El sistema está listo para usar
    echo    Ejecuta 'iniciar-sistema.bat' para comenzar
) else (
    echo 🔧 El sistema requiere configuración adicional
    echo    Revisa los elementos marcados con ❌ o ⚠️
)

echo.
echo ===============================================
pause
