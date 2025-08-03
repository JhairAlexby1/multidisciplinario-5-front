# 🚀 Guía de Despliegue en Amazon EC2

Esta guía te ayudará a configurar el despliegue automático de tu aplicación Next.js en Amazon EC2 usando GitHub Actions.

## 📋 Prerrequisitos

1. **Cuenta de AWS** con acceso a EC2
2. **Repositorio en GitHub** con tu código
3. **Instancia EC2** ejecutándose (Ubuntu 20.04 LTS recomendado)
4. **Par de claves SSH** para acceder a EC2

## 🏗️ Configuración de la Instancia EC2

### 1. Crear Instancia EC2

1. Ve a la consola de AWS EC2
2. Lanza una nueva instancia:
   - **AMI**: Ubuntu Server 20.04 LTS
   - **Tipo**: t2.micro (para pruebas) o t3.small (recomendado)
   - **Almacenamiento**: 20 GB mínimo
   - **Grupo de seguridad**: Permitir SSH (22), HTTP (80), HTTPS (443)

### 2. Configurar el Servidor

Conéctate a tu instancia EC2 y ejecuta:

```bash
# Descargar y ejecutar el script de configuración
wget https://raw.githubusercontent.com/tu-usuario/multidisciplinario-5-front/main/scripts/setup-ec2.sh
chmod +x setup-ec2.sh
./setup-ec2.sh
```

O ejecuta manualmente los comandos del script:

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx

# Crear directorios
sudo mkdir -p /var/www/multidisciplinario-5-front
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/www/multidisciplinario-5-front
sudo chown -R $USER:$USER /var/log/pm2
```

### 3. Configurar Nginx

```bash
# Crear configuración de Nginx
sudo nano /etc/nginx/sites-available/multidisciplinario
```

Contenido del archivo:

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar el sitio
sudo ln -sf /etc/nginx/sites-available/multidisciplinario /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 4. Clonar el Repositorio

```bash
cd /var/www
git clone https://github.com/tu-usuario/multidisciplinario-5-front.git
cd multidisciplinario-5-front
npm install
npm run build
```

## 🔧 Configuración de GitHub Actions

### 1. Configurar Secrets en GitHub

Ve a tu repositorio en GitHub → Settings → Secrets and variables → Actions

Agrega estos secrets:

| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `EC2_HOST` | IP pública de tu EC2 | `54.123.456.789` |
| `EC2_USERNAME` | Usuario SSH | `ubuntu` |
| `EC2_SSH_KEY` | Clave privada SSH | Contenido completo del archivo .pem |
| `EC2_SSH_PORT` | Puerto SSH | `22` |

### 2. Obtener la Clave SSH

```bash
# En tu máquina local, mostrar la clave privada
cat ~/.ssh/tu-clave-ec2.pem
```

Copia todo el contenido (incluyendo `-----BEGIN RSA PRIVATE KEY-----` y `-----END RSA PRIVATE KEY-----`) y pégalo en el secret `EC2_SSH_KEY`.

### 3. Configurar PM2 Startup

En tu instancia EC2:

```bash
# Configurar PM2 para inicio automático
pm2 startup
# Ejecuta el comando que aparece en la salida

# Iniciar la aplicación por primera vez
pm2 start ecosystem.config.js
pm2 save
```

## 🚀 Proceso de Despliegue

### Despliegue Automático

1. Haz push a la rama `main`:
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

2. GitHub Actions automáticamente:
   - Ejecutará los tests
   - Construirá la aplicación
   - Desplegará en EC2
   - Reiniciará la aplicación

### Despliegue Manual

Si necesitas desplegar manualmente:

```bash
# En tu instancia EC2
cd /var/www/multidisciplinario-5-front
./scripts/deploy.sh
```

## 📊 Monitoreo y Logs

### Comandos Útiles de PM2

```bash
# Ver estado de las aplicaciones
pm2 status

# Ver logs en tiempo real
pm2 logs multidisciplinario-app

# Reiniciar aplicación
pm2 restart multidisciplinario-app

# Monitoreo en tiempo real
pm2 monit

# Ver información detallada
pm2 show multidisciplinario-app
```

### Logs de Nginx

```bash
# Logs de acceso
sudo tail -f /var/log/nginx/access.log

# Logs de errores
sudo tail -f /var/log/nginx/error.log
```

## 🔒 Configuración de SSL (Opcional)

Para habilitar HTTPS con Let's Encrypt:

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado (reemplaza tu-dominio.com)
sudo certbot --nginx -d tu-dominio.com

# Renovación automática
sudo crontab -e
# Agregar: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🛠️ Solución de Problemas

### La aplicación no inicia

```bash
# Verificar logs de PM2
pm2 logs multidisciplinario-app

# Verificar que Node.js esté instalado
node --version
npm --version

# Verificar que las dependencias estén instaladas
cd /var/www/multidisciplinario-5-front
npm install
```

### Nginx no funciona

```bash
# Verificar estado de Nginx
sudo systemctl status nginx

# Probar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### GitHub Actions falla

1. Verifica que todos los secrets estén configurados correctamente
2. Revisa los logs en la pestaña "Actions" de tu repositorio
3. Asegúrate de que la clave SSH tenga los permisos correctos

### Error de permisos

```bash
# Corregir permisos del directorio
sudo chown -R $USER:$USER /var/www/multidisciplinario-5-front
```

## 📈 Optimizaciones de Producción

### 1. Configurar Variables de Entorno

```bash
# Crear archivo .env.production
cd /var/www/multidisciplinario-5-front
nano .env.production
```

### 2. Configurar Límites de PM2

Edita `ecosystem.config.js` para ajustar:
- `max_memory_restart`: Límite de memoria
- `instances`: Número de instancias (para load balancing)

### 3. Configurar Nginx para Archivos Estáticos

Agrega a la configuración de Nginx:

```nginx
location /_next/static/ {
    alias /var/www/multidisciplinario-5-front/.next/static/;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔄 Actualizaciones

Para actualizar la aplicación:

1. **Automático**: Haz push a `main`
2. **Manual**: Ejecuta `./scripts/deploy.sh` en EC2

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs de PM2 y Nginx
2. Verifica la configuración de GitHub Actions
3. Asegúrate de que todos los servicios estén ejecutándose
4. Consulta la documentación oficial de Next.js y PM2

---

¡Tu aplicación debería estar disponible en `http://[IP-DE-TU-EC2]`! 🎉