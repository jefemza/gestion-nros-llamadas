@echo off
title Sistema DNC - Reiniciando Sistema
color 0E
echo.
echo ===============================================
echo    🔄 SISTEMA DNC - REINICIANDO SISTEMA 🔄
echo ===============================================
echo.

echo 🛑 Paso 1: Deteniendo servicios actuales...
echo.
call detener-sistema.bat

echo.
echo ⏳ Esperando 5 segundos antes de reiniciar...
timeout /t 5 /nobreak >nul

echo.
echo 🚀 Paso 2: Iniciando servicios nuevamente...
echo.
call iniciar-sistema.bat
