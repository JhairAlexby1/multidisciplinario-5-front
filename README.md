# Granja Avii - Dashboard de Monitoreo (Versión Demo)

Este es un frontend demo para el sistema de monitoreo de una granja avícola, construido con [Next.js](https://nextjs.org/) y TypeScript.

## 🚀 Características

- **Monitoreo en tiempo real** (simulado)
  - Temperatura
  - Humedad
  - Condiciones de luminosidad
- **Gráficas estadísticas** con Chart.js
- **Sistema de autenticación** simulado con localStorage
- **Alertas automáticas** para valores críticos
- **Diseño responsivo** con Tailwind CSS

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone [URL-del-repositorio]
cd multidisciplinario-5-front
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecutar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 👤 Credenciales de Demo

Usa cualquiera de estas credenciales para acceder al sistema:

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@granja.com | admin123 | Administrador |
| user@granja.com | user123 | Usuario |
| test@test.com | test | Usuario de Prueba |

**Tip:** Hay botones de acceso rápido en la página de login para llenar las credenciales automáticamente.

## 📁 Estructura del Proyecto

```
src/
├── app/                  # Pages de Next.js 13+ (App Router)
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página de inicio (redirige a login)
│   ├── graphics/        # Página de gráficas
│   ├── homePage/        # Dashboard principal
│   ├── login/           # Página de login
│   └── settings/        # Página de configuración
├── components/           # Componentes reutilizables
│   ├── cardGraphic/     # Tarjeta de gráficas
│   ├── cardHumidity/    # Tarjeta de humedad
│   ├── cardTemperature/ # Tarjeta de temperatura
│   ├── footer/          # Footer
│   ├── header/          # Header
│   ├── loading/         # Componente de carga
│   ├── loginForm/       # Formulario de login
│   ├── main/            # Contenido principal
│   └── pageSettings/    # Página de configuración
└── utils/               # Utilidades
    └── auth.ts          # Utilitario de autenticación
```

## 🔧 Tecnologías Utilizadas

- **Frontend:**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  
- **Visualización:**
  - Chart.js
  - React Chart.js 2
  
- **UI/UX:**
  - SweetAlert2 para notificaciones
  - Diseño responsivo

## 🎯 Funcionalidades Demo

1. **Autenticación Simulada:** 
   - Usuarios predefinidos almacenados en array local
   - Sesión guardada en localStorage
   - Botones de acceso rápido para credenciales de demo

2. **Datos Simulados:** Los sensores generan datos aleatorios dentro de rangos realistas:
   - Temperatura: 20°C - 40°C
   - Humedad: 45% - 85%
   - Luminosidad: 0 - 30 lux

3. **Alertas Automáticas:**
   - Temperatura < 25°C: Alerta para prender calefacción
   - Humedad > 86%: Alerta de humedad alta

4. **Protección de Rutas:** Todas las páginas requieren autenticación

5. **Dashboard Interactivo:**
   - Actualización automática cada 5 segundos
   - Gráficas en tiempo real
   - Indicadores de condiciones ambientales

## 📊 Datos Simulados

Los datos de los sensores se generan automáticamente y se actualizan cada 5 segundos. Los valores están diseñados para mostrar variaciones realistas y ocasionalmente generar alertas para demostrar el sistema de notificaciones.

Las gráficas muestran los promedios acumulados de temperatura y humedad, actualizándose cada 3 segundos.

## 🚫 Limitaciones de la Demo

- No hay persistencia real de datos
- No hay conexión a backend
- Los usuarios son estáticos
- Las sesiones solo persisten en localStorage
- Los datos no se almacenan históricamente

## 📝 Notas de Implementación

Este proyecto es una demostración frontend completamente autocontenida. Para una implementación completa, se necesitaría:

1. Backend para autenticación real
2. Base de datos para almacenar usuarios y lecturas
3. API REST o WebSockets para datos en tiempo real
4. Sistema de sensores real

## 🔜 Próximos Pasos

Para convertir esto en un sistema completo, considera:

1. Implementar un backend con Node.js/Express
2. Agregar una base de datos (MongoDB, PostgreSQL)
3. Implementar WebSockets reales para datos en tiempo real
4. Agregar más funcionalidades como:
   - Historial de datos
   - Reportes exportables
   - Configuración de alertas personalizadas
   - Panel de administración
   - Dashboard de análisis

## 🚀 Inicio Rápido

1. `npm install`
2. `npm run dev`
3. Visitar `http://localhost:3000`
4. Usar credenciales: `test@test.com` / `test`

## 📄 Licencia

MIT
