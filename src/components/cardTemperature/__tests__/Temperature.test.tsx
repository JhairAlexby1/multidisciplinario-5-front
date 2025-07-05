import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Temperature } from '../Temperature';
import Swal from 'sweetalert2';
import React from 'react';

// 1. Simular (mock) las dependencias externas como SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.useFakeTimers();

describe('Componente Temperature', () => {

  beforeEach(() => {
    (Swal.fire as jest.Mock).mockClear();
  });

  it('V01: Muestra el texto "Cargando..." durante el estado inicial', () => {
    const useEffectMock = jest.spyOn(React, 'useEffect').mockImplementationOnce(f => {});
    
    render(<Temperature />);
    
    expect(screen.getByText(/cargando.../i)).toBeInTheDocument();

    useEffectMock.mockRestore();
  });

  it('V02: Actualiza el estado y muestra el valor de temperatura al recibir un evento', async () => {
    render(<Temperature />);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      const tempValue = screen.getByText((content) => content.includes('°C'));
      expect(tempValue).toBeInTheDocument();
    });
  });

  it('V03: Llama a Swal.fire si el valor de temperatura recibido es menor a 25', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.1; 
    global.Math = mockMath;

    render(<Temperature />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(Swal.fire).toHaveBeenCalled();
  });
});