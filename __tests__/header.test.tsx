// __tests__/header.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../src/components/header/Header'; // Asegúrate que la ruta sea correcta
import { useAuth } from '@/utils/auth';

// Mock del hook useAuth
jest.mock('@/utils/auth');

// Mock del componente Image de Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Hacemos un type assertion para poder manipular el mock
const mockUseAuth = useAuth as jest.Mock;

describe.skip('Casos de Prueba: Componente Header', () => {
  beforeEach(() => {
    // Reiniciar el mock antes de cada prueba
    mockUseAuth.mockClear();
  });

  // Caso de Prueba #10
  test('ID 10: Renderiza el componente sin errores', () => {
    // Simulamos un usuario logueado para la prueba
    mockUseAuth.mockReturnValue({
      getCurrentUser: () => ({ name: 'Josep' }),
      logout: () => {},
    });

    render(<Header />);

    // Verificamos que el título principal y el saludo de bienvenida se muestren
    expect(screen.getByText('Granja Avii')).toBeInTheDocument();
    expect(screen.getByText('Bienvenido, Josep')).toBeInTheDocument();
  });

  // Caso de Prueba #11
  test('ID 11: El componente Link de "Inicio" tiene el href correcto', () => {
    mockUseAuth.mockReturnValue({ getCurrentUser: () => null });
    render(<Header />);

    const linkInicio = screen.getByRole('link', { name: /inicio/i });
    expect(linkInicio).toHaveAttribute('href', '/homePage');
  });

  // Caso de Prueba #12
  test('ID 12: El componente Link de "Informacion" tiene el href correcto', () => {
    mockUseAuth.mockReturnValue({ getCurrentUser: () => null });
    render(<Header />);

    const linkInformacion = screen.getByRole('link', { name: /información/i });
    expect(linkInformacion).toHaveAttribute('href', '/settings');
  });

  // Caso de Prueba #13
  test('ID 13: Renderiza el componente Image con el src y alt correctos para el logo', () => {
    mockUseAuth.mockReturnValue({ getCurrentUser: () => null });
    render(<Header />);

    const logo = screen.getByAltText('Avii logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo-avii.png');
  });
});