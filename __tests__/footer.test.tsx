// __tests__/footer.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../src/components/footer/Footer';

describe.skip('Casos de Prueba: Componente Footer', () => {
  // Caso de Prueba #14
  test('ID 14: Renderiza el texto de copyright "© 2024 Avii"', () => {
    render(<Footer />);

    // Buscamos un elemento que contenga el texto de copyright.
    // Usamos una expresión regular /© 2024 Avii/i para que no importen las mayúsculas/minúsculas.
    const copyrightText = screen.getByText(/© 2024 Avii/i);

    // Verificamos que el texto esté en el documento.
    expect(copyrightText).toBeInTheDocument();
  });
});