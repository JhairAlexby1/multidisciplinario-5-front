import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Settings from '../src/app/settings/page'
import { PageSettings } from '../src/components/pageSettings/PageSettings'

// Mock del hook useAuth
jest.mock('../src/utils/auth', () => ({
  useAuth: jest.fn(),
}))

// Mock de los componentes Header y Footer para aislar la prueba
jest.mock('../src/components/header/Header', () => ({
  Header: () => <div data-testid="header">Header Mock</div>,
}))

jest.mock('../src/components/footer/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer Mock</div>,
}))

describe.skip('Caso de Prueba #46: Visualización de la página de Información', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks()
  })

  test('Debe mostrar el título "Informacion" y las tarjetas de "Ajustes de Temperatura" y "Notificaciones de Discord"', () => {
    // Paso 1: Navegar a /settings (simulado mediante render del componente)
    render(<Settings />)

    // Verificar que se muestra el título "Informacion"
    const titulo = screen.getByRole('heading', { name: /informacion/i })
    expect(titulo).toBeInTheDocument()
    expect(titulo).toHaveTextContent('Informacion')

    // Verificar que se muestra la tarjeta "Ajustes de Temperatura"
    const tarjetaTemperatura = screen.getByRole('heading', { name: /ajustes de temperatura/i })
    expect(tarjetaTemperatura).toBeInTheDocument()
    expect(tarjetaTemperatura).toHaveTextContent('Ajustes de Temperatura')

    // Verificar que se muestra la tarjeta "Notificaciones de Discord"
    const tarjetaDiscord = screen.getByRole('heading', { name: /notificaciones de discord/i })
    expect(tarjetaDiscord).toBeInTheDocument()
    expect(tarjetaDiscord).toHaveTextContent('Notificaciones de Discord')

    // Verificar contenido adicional de la tarjeta de temperatura
    const contenidoTemperatura = screen.getByText(/las medidas predefinidas para el control del sistema son:/i)
    expect(contenidoTemperatura).toBeInTheDocument()
    
    const temperaturaMinima = screen.getByText(/25°c/i)
    const temperaturaMaxima = screen.getByText(/38°c/i)
    expect(temperaturaMinima).toBeInTheDocument()
    expect(temperaturaMaxima).toBeInTheDocument()

    // Verificar contenido de la tarjeta de Discord
    const contenidoDiscord = screen.getByText(/puedo ver tus notificaciones en discord/i)
    expect(contenidoDiscord).toBeInTheDocument()
  })

  test('Debe renderizar correctamente el componente PageSettings de forma aislada', () => {
    // Prueba adicional para verificar el componente PageSettings directamente
    render(<PageSettings />)

    // Verificaciones similares pero enfocadas en el componente específico
    expect(screen.getByRole('heading', { name: /informacion/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ajustes de temperatura/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /notificaciones de discord/i })).toBeInTheDocument()
  })

  test('Debe tener la estructura HTML correcta para las tarjetas', () => {
    render(<PageSettings />)

    // Verificar que las tarjetas tienen las clases CSS correctas
    const tarjetas = screen.getAllByText(/ajustes de temperatura|notificaciones de discord/i)
    
    tarjetas.forEach(tarjeta => {
      const tarjetaContainer = tarjeta.closest('div')
      expect(tarjetaContainer).toHaveClass('rounded-xl', 'bg-white', 'p-10', 'shadow-lg')
    })
  })

  test('Debe mostrar el ícono de Discord en la tarjeta correspondiente', () => {
    render(<PageSettings />)

    // Verificar que existe un SVG (ícono de Discord) usando querySelector
    const { container } = render(<PageSettings />)
    const iconoDiscord = container.querySelector('svg')
    expect(iconoDiscord).toBeInTheDocument()
    
    // Verificar que el SVG tiene los atributos correctos
    expect(iconoDiscord).toHaveAttribute('viewBox', '0 0 256 199')
    expect(iconoDiscord).toHaveAttribute('width', '100')
    expect(iconoDiscord).toHaveAttribute('height', '100')
  })
})