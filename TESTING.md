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

### Casos de Prueba Implementados
Casos de Prueba #1-9: Componentes de Autenticación (LoginForm)
Archivo: __tests__/login.test.tsx

Descripción: Verifica el correcto funcionamiento del formulario de inicio de sesión, incluyendo la renderización de campos, la actualización de estado, y el manejo de respuestas de login exitosas y fallidas.

Pruebas Incluidas:

✅ ID 1: Renderiza correctamente el campo de entrada para el email.

✅ ID 2: Renderiza correctamente el campo de entrada para la contraseña.

✅ ID 3: El estado del email se actualiza cuando el usuario escribe.

✅ ID 4: El estado de la contraseña se actualiza cuando el usuario escribe.

✅ ID 5: Llama a la lógica de login al hacer clic en el botón "Iniciar sesión".

✅ ID 6: Verifica la lógica de autenticación con credenciales correctas.

✅ ID 7: Llama a Swal.fire con un mensaje de éxito si el login es correcto.

✅ ID 8: Llama a router.push con '/homePage' si el login es exitoso.

✅ ID 9: Llama a Swal.fire con un mensaje de error si el login falla.

Casos de Prueba #10-13: Componente de Estructura (Header)
Archivo: __tests__/header.test.tsx

Descripción: Verifica la correcta renderización y funcionalidad del encabezado de la aplicación.

Pruebas Incluidas:

✅ ID 10: Renderiza el componente sin errores.

✅ ID 11: El componente Link de "Inicio" tiene el href correcto (/homePage).

✅ ID 12: El componente Link de "Informacion" tiene el href correcto (/settings).

✅ ID 13: Renderiza el componente Image con el src y alt correctos para el logo.

Caso de Prueba #14: Componente de Estructura (Footer)
Archivo: __tests__/footer.test.tsx

Descripción: Verifica que el pie de página renderice la información de copyright.

Pruebas Incluidas:

✅ ID 14: Renderiza el texto de copyright "© 2024 Avii".

Caso de Prueba #15: Componente de Estructura (LoadingComp)
Archivo: __tests__/loading.test.tsx

Descripción: Verifica la correcta renderización del componente de animación de carga.

Pruebas Incluidas:

⏳ ID 15: Renderiza tres div para la animación de carga. (Pendiente)

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
# Para las pruebas del Login
npm test login.test.tsx

# Para las pruebas del Header
npm test header.test.tsx

# Para las pruebas del Footer
npm test footer.test.tsx

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
- **next/image**: Mock para el componente de imágenes de Next.js
- **sweetalert2**: Mock para la librería de alertas


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