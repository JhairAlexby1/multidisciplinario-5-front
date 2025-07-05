// __tests__/login.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LoginForm } from '../src/components/loginForm/LoginForm';
import Swal from 'sweetalert2';

// Mock del router de Next.js
const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock de SweetAlert2 para manejar la importación por defecto
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: {
    fire: jest.fn(),
  },
}));

// Mock del componente Image de Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('Casos de Prueba: Componente LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Caso de Prueba #1
  test('ID 1: Renderiza correctamente el campo de entrada para el email', () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    expect(emailInput).toBeInTheDocument();
  });

  // Caso de Prueba #2
  test('ID 2: Renderiza correctamente el campo de entrada para la contraseña', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    expect(passwordInput).toBeInTheDocument();
  });

  // Caso de Prueba #3
  test('ID 3: El estado del email se actualiza cuando el usuario escribe', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText<HTMLInputElement>(/correo electrónico/i);
    await user.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');
  });

  // Caso de Prueba #4
  test('ID 4: El estado de la contraseña se actualiza cuando el usuario escribe', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText<HTMLInputElement>(/contraseña/i);
    await user.type(passwordInput, 'password123');
    expect(passwordInput.value).toBe('password123');
  });

  // Caso de Prueba #5 y #6 (Verificación de lógica de login)
  test('ID 5 & 6: Llama a la lógica de login al enviar el formulario', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText(/correo electrónico/i), 'admin@granja.com');
    await user.type(screen.getByPlaceholderText(/contraseña/i), 'admin123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });
  });

  // Caso de Prueba #7
  test('ID 7: Llama a Swal.fire con un mensaje de éxito si el login es correcto', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText(/correo electrónico/i), 'admin@granja.com');
    await user.type(screen.getByPlaceholderText(/contraseña/i), 'admin123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: 'success',
        })
      );
    });
  });

  // Caso de Prueba #8
  test("ID 8: Llama a router.push con '/homePage' si el login es exitoso", async () => {
    const user = userEvent.setup({ delay: null });
    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText(/correo electrónico/i), 'admin@granja.com');
    await user.type(screen.getByPlaceholderText(/contraseña/i), 'admin123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    jest.advanceTimersByTime(500);
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/homePage');
    });
  });

  // Caso de Prueba #9
  test('ID 9: Llama a Swal.fire con un mensaje de error si el login falla', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText(/correo electrónico/i), 'error@test.com');
    await user.type(screen.getByPlaceholderText(/contraseña/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: 'error',
        })
      );
    });
  });
});