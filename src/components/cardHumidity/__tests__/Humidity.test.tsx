import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Humidity } from '../Humidity';
import Swal from 'sweetalert2';

// Simular dependencias externas
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));
jest.useFakeTimers();

describe('Componente Humidity', () => {

  beforeEach(() => {
    (Swal.fire as jest.Mock).mockClear();
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('V04: Muestra el texto "Cargando..." durante el estado inicial', () => {
    render(<Humidity />);
    expect(screen.getByText(/cargando.../i)).toBeInTheDocument();
  });

  it('V05: Actualiza el estado y muestra el valor de humedad (%)', async () => {
    render(<Humidity />);
    act(() => { jest.advanceTimersByTime(5000); });
    await waitFor(() => {
      const humidityValue = screen.getByText((content) => content.includes('%'));
      expect(humidityValue).toBeInTheDocument();
    });
  });

  it('V06: Llama a Swal.fire si la humedad recibido es mayor a 86', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
    render(<Humidity />);
    act(() => { jest.advanceTimersByTime(5000); });
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('V07: Renderiza el SVG del ícono de "sol" cuando la condición es "soleado"', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
    render(<Humidity />);
    act(() => { jest.advanceTimersByTime(5000); });
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('V08: Renderiza el SVG del ícono de "nube" cuando la condición es "nublado"', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    render(<Humidity />);
    act(() => { jest.advanceTimersByTime(5000); });
    expect(screen.getByTestId('cloud-icon')).toBeInTheDocument();
  });

  it('V09: Renderiza el SVG del ícono de "luna" cuando la condición es "noche"', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
    render(<Humidity />);
    act(() => { jest.advanceTimersByTime(5000); });
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });
});