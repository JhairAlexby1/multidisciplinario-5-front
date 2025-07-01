# Guía de Pruebas Automatizadas

## Configuración de Testing

Este proyecto utiliza **Jest** y **React Testing Library** para las pruebas automatizadas, siguiendo las mejores prácticas de testing en aplicaciones Next.js.

### Dependencias de Testing Instaladas

- `@testing-library/react`: Para renderizar y interactuar con componentes React
- `@testing-library/jest-dom`: Matchers personalizados para Jest
- `@testing-library/user-event`: Para simular interacciones del usuario
- `jest`: Framework de testing
- `jest-environment-jsdom`: Entorno de testing para aplicaciones web
- `@types/jest`: Tipos de TypeScript para Jest

### Configuración

- **jest.config.js**: Configuración principal de Jest con soporte para Next.js
- **jest.setup.js**: Configuración inicial y mocks globales
- **__tests__/**: Directorio que contiene todas las pruebas

## Casos de Prueba Implementados

### Caso de Prueba #46: Visualización de la página de Información

**Archivo**: `__tests__/settings.test.tsx`

**Descripción**: Verifica que la página de configuraciones (`/settings`) muestre correctamente:
- El título "Información"
- La tarjeta "Ajustes de Temperatura"
- La tarjeta "Notificaciones de Discord"

**Pasos de la Prueba**:
1. Navegar a /settings (simulado mediante render del componente)
2. Verificar presencia del título "Información"
3. Verificar presencia de las tarjetas requeridas
4. Validar contenido específico de cada tarjeta

**Pruebas Incluidas**:
1. ✅ **Prueba Principal**: Verificación completa del caso de prueba #46
2. ✅ **Prueba de Componente Aislado**: Renderizado del componente PageSettings
3. ✅ **Prueba de Estructura HTML**: Verificación de clases CSS correctas
4. ✅ **Prueba de Ícono Discord**: Verificación del SVG de Discord

## Comandos de Testing

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch (re-ejecuta al cambiar archivos)
```bash
npm run test:watch
```

### Ejecutar una prueba específica
```bash
npm test settings.test.tsx
```

### Ejecutar pruebas con cobertura
```bash
npm test -- --coverage
```

## Estructura de Archivos de Testing

```
__tests__/
├── settings.test.tsx          # Caso de prueba #46
└── [futuros tests]            # Otros casos de prueba

jest.config.js                 # Configuración de Jest
jest.setup.js                  # Setup y mocks globales
```

## Mocks Configurados

### Mocks Globales (jest.setup.js)
- **next/navigation**: Mock del router de Next.js
- **localStorage**: Mock del almacenamiento local
- **window.location**: Mock de la ubicación de la ventana

### Mocks Específicos por Prueba
- **useAuth**: Mock del hook de autenticación
- **Header/Footer**: Mocks de componentes para aislar pruebas



### Verificaciones Implementadas
- **Presencia de elementos**: `toBeInTheDocument()`
- **Contenido de texto**: `toHaveTextContent()`
- **Atributos HTML**: `toHaveAttribute()`
- **Clases CSS**: `toHaveClass()`

## Resultados de Ejecución

```
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        ~2.5s
```

### Comandos de Diagnóstico

```bash
# Verificar configuración de Jest
npm test -- --showConfig

# Ejecutar con información detallada
npm test -- --verbose

# Limpiar caché de Jest
npm test -- --clearCache
```