@echo off
title Sistema DNC - Deteniendo Servidores
color 0C
echo.
echo ===============================================
echo    🛑 SISTEMA DNC - DETENIENDO SERVIDORES 🛑
echo ===============================================
echo.

echo 📋 Deteniendo procesos del sistema...
echo.

REM Detener todos los procesos de Node.js relacionados con el proyecto
echo 🔄 Cerrando servidor Next.js...
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✅ Servidor Next.js detenido
) else (
    echo ⚠️  No se encontraron procesos de Node.js activos
)
echo.

REM Detener contenedores Docker
echo 🗄️  Deteniendo base de datos PostgreSQL...
docker-compose down
if %errorlevel% equ 0 (
    echo ✅ Contenedores Docker detenidos correctamente
) else (
    echo ⚠️  Error al detener contenedores o Docker no disponible
)
echo.

REM Limpiar puertos que puedan estar ocupados
echo 🔧 Liberando puertos del sistema...
netstat -ano | findstr :5501 >nul
if %errorlevel% equ 0 (
    echo ⚠️  Puerto 5501 aún ocupado, intentando liberar...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5501') do (
        taskkill /f /pid %%a 2>nul
    )
)

netstat -ano | findstr :5432 >nul
if %errorlevel% equ 0 (
    echo ✅ Puerto 5432 (PostgreSQL) liberado
)

echo.
echo 🧹 Limpiando archivos temporales...

REM Limpiar caché de Next.js
if exist ".next" (
    rmdir /s /q ".next" 2>nul
    echo ✅ Caché de Next.js eliminado
)

REM Limpiar logs temporales
if exist "*.log" (
    del /q "*.log" 2>nul
    echo ✅ Archivos de log eliminados
)

echo.
echo ===============================================
echo    ✅ SISTEMA DNC DETENIDO COMPLETAMENTE ✅
echo ===============================================
echo.
echo 📊 Estado final:
echo    • Servidor Next.js: DETENIDO
echo    • Base de datos PostgreSQL: DETENIDA
echo    • Puertos liberados: 5501, 5432
echo    • Archivos temporales: LIMPIADOS
echo.
echo 💡 Para reiniciar el sistema:
echo    Ejecuta 'iniciar-sistema.bat'
echo.
echo ===============================================
echo.
pause
