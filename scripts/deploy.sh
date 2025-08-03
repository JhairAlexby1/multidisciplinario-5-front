#!/bin/bash

# Script de despliegue manual
# Ejecutar desde el directorio de la aplicación en EC2

echo "🚀 Iniciando despliegue manual..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio de la aplicación."
    exit 1
fi

# Hacer backup de la build anterior
echo "💾 Creando backup de la build anterior..."
if [ -d ".next" ]; then
    sudo cp -r .next .next.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ Backup creado"
fi

# Detener la aplicación
echo "🛑 Deteniendo aplicación..."
sudo pm2 stop multidisciplinario-app || echo "⚠️  La aplicación no estaba ejecutándose"

# Actualizar código desde Git
echo "📥 Actualizando código desde Git..."
sudo git pull origin main

# Instalar/actualizar dependencias
echo "📦 Instalando dependencias..."
sudo npm ci --production

# Construir la aplicación
echo "🔨 Construyendo aplicación..."
sudo npm run build

# Verificar que la build fue exitosa
if [ ! -d ".next" ]; then
    echo "❌ Error: La build falló. No se encontró el directorio .next"
    exit 1
fi

# Iniciar/reiniciar la aplicación con PM2
echo "🚀 Iniciando aplicación..."
if sudo pm2 list | grep -q "multidisciplinario-app"; then
    sudo pm2 restart multidisciplinario-app
    echo "🔄 Aplicación reiniciada"
else
    sudo pm2 start ecosystem.config.js
    echo "▶️  Aplicación iniciada"
fi

# Guardar configuración de PM2
sudo pm2 save

# Mostrar estado
echo "📊 Estado de la aplicación:"
sudo pm2 status

# Verificar que Nginx esté funcionando
echo "🔍 Verificando Nginx..."
sudo systemctl status nginx --no-pager -l

echo ""
echo "✅ Despliegue completado!"
echo "🌐 Tu aplicación debería estar disponible en: http://$(curl -s ifconfig.me)"
echo ""
echo "📋 Comandos útiles:"
echo "  - Ver logs: sudo pm2 logs multidisciplinario-app"
echo "  - Reiniciar: sudo pm2 restart multidisciplinario-app"
echo "  - Estado: sudo pm2 status"
echo "  - Monitoreo: sudo pm2 monit"