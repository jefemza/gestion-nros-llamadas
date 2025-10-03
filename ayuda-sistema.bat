@echo off
title Sistema DNC - Ayuda y Documentación
color 0F
echo.
echo ===============================================
echo    📚 SISTEMA DNC - AYUDA Y DOCUMENTACIÓN 📚
echo ===============================================
echo.

echo 🚀 ARCHIVOS DISPONIBLES:
echo.
echo    1️⃣  iniciar-sistema.bat
echo        • Inicia todos los servicios del sistema
echo        • Verifica dependencias automáticamente
echo        • Configura base de datos
echo        • Lanza servidor en http://localhost:5501
echo.
echo    2️⃣  detener-sistema.bat
echo        • Detiene servidor Next.js
echo        • Para contenedores Docker
echo        • Libera puertos ocupados
echo        • Limpia archivos temporales
echo.
echo    3️⃣  reiniciar-sistema.bat
echo        • Detiene y reinicia todo el sistema
echo        • Útil para aplicar cambios
echo.
echo    4️⃣  estado-sistema.bat
echo        • Muestra estado de todos los servicios
echo        • Verifica dependencias
echo        • Diagnóstica problemas comunes
echo.
echo    5️⃣  ayuda-sistema.bat
echo        • Esta ayuda que estás viendo
echo.

echo ===============================================
echo    🔧 SOLUCIÓN DE PROBLEMAS COMUNES
echo ===============================================
echo.

echo ❓ PROBLEMA: "Node.js no está instalado"
echo    💡 SOLUCIÓN: 
echo       • Descargar desde https://nodejs.org/
echo       • Instalar versión LTS recomendada
echo       • Reiniciar terminal después de instalar
echo.

echo ❓ PROBLEMA: "Docker no está disponible"
echo    💡 SOLUCIÓN:
echo       • Instalar Docker Desktop
echo       • Asegurarse de que esté corriendo
echo       • Verificar que el usuario tenga permisos
echo.

echo ❓ PROBLEMA: "Puerto 5501 ya está en uso"
echo    💡 SOLUCIÓN:
echo       • Ejecutar 'detener-sistema.bat'
echo       • O cambiar puerto en package.json
echo       • Verificar con 'estado-sistema.bat'
echo.

echo ❓ PROBLEMA: "Error de base de datos"
echo    💡 SOLUCIÓN:
echo       • Verificar que Docker esté corriendo
echo       • Ejecutar: docker-compose down
echo       • Luego: docker-compose up -d
echo       • Esperar 30 segundos e intentar de nuevo
echo.

echo ❓ PROBLEMA: "Dependencias faltantes"
echo    💡 SOLUCIÓN:
echo       • Ejecutar: npm install
echo       • Si falla: npm cache clean --force
echo       • Luego: npm install nuevamente
echo.

echo ===============================================
echo    🔗 ACCESOS Y CREDENCIALES
echo ===============================================
echo.

echo 🌐 URLs del Sistema:
echo    • Aplicación Principal: http://localhost:5501
echo    • Base de Datos: localhost:5432
echo.

echo 👨‍💼 Credenciales Administrador:
echo    • Usuario: jefe-admin
echo    • Contraseña: jefe2025+
echo    • Acceso: Dashboard completo
echo.

echo 👨‍💻 Crear Vendedores:
echo    • Login como administrador
echo    • Ir a Gestión de Usuarios
echo    • Crear nuevos usuarios tipo "USER"
echo    • Los vendedores solo ven captura de números
echo.

echo ===============================================
echo    📁 ESTRUCTURA DEL PROYECTO
echo ===============================================
echo.

echo 📂 Archivos importantes:
echo    • package.json - Configuración del proyecto
echo    • docker-compose.yml - Configuración de base de datos
echo    • prisma/ - Esquemas y migraciones de DB
echo    • src/ - Código fuente de la aplicación
echo    • .env - Variables de entorno (crear si no existe)
echo.

echo 🔄 Comandos manuales útiles:
echo    • npm run dev - Iniciar servidor de desarrollo
echo    • npm run build - Compilar para producción
echo    • npx prisma studio - Interfaz visual de base de datos
echo    • docker-compose logs - Ver logs de contenedores
echo.

echo ===============================================
echo    ⚡ CONSEJOS DE RENDIMIENTO
echo ===============================================
echo.

echo 🚀 Para mejor rendimiento:
echo    • Cerrar aplicaciones innecesarias
echo    • Tener al menos 4GB RAM disponible
echo    • Usar SSD si es posible
echo    • Mantener Docker actualizado
echo.

echo 🔒 Para mayor seguridad:
echo    • Cambiar credenciales por defecto
echo    • Usar HTTPS en producción
echo    • Configurar firewall apropiadamente
echo    • Hacer backups regulares de la base de datos
echo.

echo ===============================================
echo    📞 SOPORTE TÉCNICO
echo ===============================================
echo.

echo 🆘 Si necesitas ayuda adicional:
echo    • Revisa los logs en la consola
echo    • Ejecuta 'estado-sistema.bat' para diagnóstico
echo    • Verifica que todos los requisitos estén instalados
echo    • Documenta el error exacto que aparece
echo.

echo ===============================================
echo.
echo ¿Qué quieres hacer ahora?
echo.
echo    [1] Volver al menú principal
echo    [2] Verificar estado del sistema
echo    [3] Iniciar sistema
echo    [4] Cerrar ayuda
echo.
set /p opcion="Selecciona una opción (1-4): "

if "%opcion%"=="1" goto menu
if "%opcion%"=="2" call estado-sistema.bat
if "%opcion%"=="3" call iniciar-sistema.bat
if "%opcion%"=="4" exit
goto end

:menu
echo.
echo Archivos disponibles en esta carpeta:
dir *.bat /b
echo.
echo Ejecuta cualquiera de estos archivos para continuar.

:end
echo.
pause
