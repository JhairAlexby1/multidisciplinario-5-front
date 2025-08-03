import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Temperature } from '../Temperature';
import Swal from 'sweetalert2';

// Mock SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.useFakeTimers();

describe('Componente Temperature', () => {

  beforeEach(() => {
    (Swal.fire as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('V01: Renderiza el componente correctamente', () => {
    render(<Temperature />);
    expect(screen.getByText('Temperatura')).toBeInTheDocument();
  });

  it('V02: Muestra un valor de temperatura con °C', async () => {
    render(<Temperature />);
    
    await waitFor(() => {
      const tempValue = screen.getByText((content) => content.includes('°C'));
      expect(tempValue).toBeInTheDocument();
    });
  });

  it('V03: Llama a Swal.fire si el valor de temperatura es menor a 25', async () => {
    // Mock Math.random para generar temperatura baja
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0; // Esto generará temperatura = 30 + (-0.5 * 10) = 25
    global.Math = mockMath;

    render(<Temperature />);

    // Avanzar el tiempo para que se ejecute el interval
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    // Restaurar Math.random
    global.Math = Math;
  });
});