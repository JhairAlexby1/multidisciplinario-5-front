#!/bin/bash

# Script de configuración inicial para EC2
# Ejecutar como usuario con privilegios sudo

echo "🚀 Iniciando configuración del servidor EC2..."

# Actualizar el sistema
echo "📦 Actualizando paquetes del sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18.x
echo "📦 Instalando Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación de Node.js y npm
echo "✅ Verificando instalación de Node.js..."
node --version
npm --version

# Instalar PM2 globalmente
echo "📦 Instalando PM2..."
sudo npm install -g pm2

# Instalar Nginx
echo "📦 Instalando Nginx..."
sudo apt install -y nginx

# Crear directorio para la aplicación
echo "📁 Creando directorio de la aplicación..."
sudo mkdir -p /var/www/multidisciplinario-5-front
sudo chown -R $USER:$USER /var/www/multidisciplinario-5-front

# Crear directorio para logs de PM2
echo "📁 Creando directorio de logs..."
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Configurar Nginx
echo "🔧 Configurando Nginx..."
sudo tee /etc/nginx/sites-available/multidisciplinario > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Habilitar el sitio
sudo ln -sf /etc/nginx/sites-available/multidisciplinario /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Probar configuración de Nginx
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# Configurar firewall
echo "🔒 Configurando firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Clonar el repositorio (reemplaza con tu URL)
echo "📥 Clonando repositorio..."
cd /var/www
# sudo git clone https://github.com/tu-usuario/multidisciplinario-5-front.git
echo "⚠️  IMPORTANTE: Clona manualmente tu repositorio en /var/www/multidisciplinario-5-front"

# Configurar PM2 para iniciar automáticamente
echo "🔧 Configurando PM2 para inicio automático..."
pm2 startup
echo "⚠️  IMPORTANTE: Ejecuta el comando que aparece arriba para configurar PM2 startup"

echo "✅ Configuración básica completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Clona tu repositorio en /var/www/multidisciplinario-5-front"
echo "2. Configura los secrets en GitHub:"
echo "   - EC2_HOST: IP pública de tu instancia EC2"
echo "   - EC2_USERNAME: ubuntu (o el usuario de tu instancia)"
echo "   - EC2_SSH_KEY: Tu clave privada SSH"
echo "   - EC2_SSH_PORT: 22 (puerto SSH)"
echo "3. Haz push a la rama main para activar el despliegue automático"
echo ""
echo "🔗 Tu aplicación estará disponible en: http://[IP-DE-TU-EC2]"